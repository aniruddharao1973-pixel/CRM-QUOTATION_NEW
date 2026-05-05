// src/modules/item/item.service.js

import prisma from "../../utils/prisma.js";
import * as XLSX from "xlsx";

/* ================= CREATE ================= */
export const createItemService = async (data) => {
  return prisma.item.create({
    data: {
      sku: data.sku ? String(data.sku).trim() : null,
      name: data.name || null,
      description: data.description,
      basePrice: data.basePrice ? Number(data.basePrice) : null,

      parentId: data.parentId || null, // ✅ NEW

      // ✅ NEW FIELD (ADDED)
      category: data.category || null,

      // ✅ EXISTING
      make: data.make || null,
      mfgPartNo: data.mfgPartNo || null,
      uom: data.uom || null,
      defaultRemarks: data.defaultRemarks || null,
    },
  });
};

/* ================= GET ALL ================= */
// export const getItemsService = async () => {
//   return prisma.item.findMany({
//     include: {
//       children: true, // ✅ useful later
//       parent: true,
//     },
//     orderBy: { createdAt: "asc" },
//   });
// };

/* ================= GET ALL ================= */
export const getItemsService = async ({ category } = {}) => {
  return prisma.item.findMany({
    where: {
      ...(category ? { category } : {}),
      parentId: null, // ✅ ONLY ROOT ITEMS
    },
    include: {
      children: {
        include: {
          children: true, // ✅ supports 2-level (your use case)
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

/* ================= GET ONE ================= */
export const getItemByIdService = async (id) => {
  return prisma.item.findUnique({
    where: { id },
  });
};

/* ================= UPDATE ================= */
export const updateItemService = async (id, data) => {
  return prisma.item.update({
    where: { id },
    data: {
      sku: data.sku ? String(data.sku).trim() : null,
      name: data.name || null,
      description: data.description,
      basePrice: data.basePrice ? Number(data.basePrice) : null,

      parentId: data.parentId !== undefined ? data.parentId : undefined,

      // ✅ NEW FIELD (ADDED)
      category: data.category || null,

      // ✅ EXISTING
      make: data.make || null,
      mfgPartNo: data.mfgPartNo || null,
      uom: data.uom || null,
      defaultRemarks: data.defaultRemarks || null,
    },
  });
};

/* ================= DELETE ================= */
/* ================= DELETE ================= */
export const deleteItemService = async (id) => {
  return prisma.$transaction(async (tx) => {
    // ✅ 1. delete all descendants (recursive tree via parentId)
    const allItems = await tx.item.findMany({
      select: { id: true, parentId: true },
    });

    // build map
    const map = {};
    allItems.forEach((i) => {
      if (!map[i.parentId]) map[i.parentId] = [];
      map[i.parentId].push(i.id);
    });

    // collect all child ids
    const collect = (parentId) => {
      const children = map[parentId] || [];
      return children.flatMap((childId) => [childId, ...collect(childId)]);
    };

    const childIds = collect(id);

    // ✅ 2. delete children first
    if (childIds.length > 0) {
      await tx.item.deleteMany({
        where: { id: { in: childIds } },
      });
    }

    // ✅ 3. delete parent
    return tx.item.delete({
      where: { id },
    });
  });
};

/* ================= BULK IMPORT WITH HIERARCHY ================= */
export const bulkCreateItemsWithHierarchy = async (items) => {
  return prisma.$transaction(async (tx) => {
    const createdMap = {}; // parentKey → parentId

    for (const row of items) {
      // 👉 STEP 1: if parent row
      if (!row.parentKey || row.isParent) {
        const parent = await tx.item.create({
          data: {
            sku: row.sku || null,
            name: row.name,
            description: row.description,
            basePrice: row.basePrice ? Number(row.basePrice) : null,
            category: row.category || null,
            make: row.make || null,
            mfgPartNo: row.mfgPartNo || null,
            uom: row.uom || null,
            defaultRemarks: row.defaultRemarks || null,
          },
        });

        if (row.parentKey) {
          createdMap[row.parentKey] = parent.id;
        }

        continue;
      }

      // 👉 STEP 2: child row
      const parentId = createdMap[row.parentKey];

      await tx.item.create({
        data: {
          sku: row.sku || null,
          name: row.name,
          description: row.description,
          basePrice: row.basePrice ? Number(row.basePrice) : null,

          parentId: parentId || null,

          category: row.category || null,
          make: row.make || null,
          mfgPartNo: row.mfgPartNo || null,
          uom: row.uom || null,
          defaultRemarks: row.defaultRemarks || null,
        },
      });
    }

    return { message: "Bulk import completed" };
  });
};

/* ================= IMPORT ================= */

export const importItemsService = async ({ file, category, importType }) => {
  // ✅ read excel buffer
  const workbook = XLSX.read(file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // ✅ read as row arrays so merged/header-like sheets are handled correctly
  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    blankrows: false,
  });

  // ✅ skip first row if it is the report title/header row
  const dataRows = rows.slice(1);

  console.log("📦 IMPORT START");
  console.log("👉 CATEGORY:", category);
  console.log("👉 IMPORT TYPE:", importType);
  console.log("👉 TOTAL ROWS:", dataRows.length);

  let created = 0;
  let skipped = 0;

  return prisma.$transaction(async (tx) => {
    // 🔹 FLAT IMPORT
    if (importType === "flat") {
      for (const row of dataRows) {
        console.log("➡️ ROW:", row);

        const serial = String(row[0] ?? "").trim();
        const excelCategory = String(row[1] ?? "").trim();
        const sku = String(row[2] ?? "").trim();
        const description = String(row[3] ?? "").trim();
        const make = String(row[4] ?? "").trim();
        const mfgPartNo = String(row[5] ?? "").trim();
        const uom = String(row[7] ?? "").trim();
        const unitPrice = row[8] ?? null;
        const discount = row[10] ?? 0;

        if (!description) {
          console.log("⏭️ SKIPPED (NO DESCRIPTION)");
          skipped++;
          continue;
        }

        if (sku) {
          const exists = await tx.item.findFirst({
            where: {
              sku: {
                equals: sku.trim(),
                mode: "insensitive",
              },
              category,
            },
          });

          if (exists) {
            console.log("⏭️ SKIPPED DUPLICATE:", sku);
            skipped++;
            continue;
          }
        }

        const data = {
          name: description,
          sku: sku ? sku.trim() : null,
          description,
          basePrice: unitPrice !== null ? Number(unitPrice) : null,
          discount: Number(discount) || 0,
          category,
          make: make || null,
          mfgPartNo: mfgPartNo || null,
          uom: uom || null,
          parentId: null,
        };

        console.log("✅ CREATING:", data);

        await tx.item.create({ data });
        created++;
      }
    }

    // 🔹 GROUPED IMPORT
    if (importType === "grouped") {
      let currentParent = null;

      for (const row of dataRows) {
        console.log("➡️ ROW:", row);

        const serial = String(row[0] ?? "").trim();
        const sku = String(row[2] ?? "").trim();
        const description = String(row[3] ?? "").trim();
        const make = String(row[4] ?? "").trim();
        const mfgPartNo = String(row[5] ?? "").trim();
        const uom = String(row[7] ?? "").trim();
        const unitPrice = row[8] ?? null;
        const discount = row[10] ?? 0;

        // 👉 parent
        if (serial && !isNaN(serial)) {
          currentParent = await tx.item.create({
            data: {
              name: description || "Unnamed Item",
              sku: sku || null,
              description: description || null,
              basePrice: unitPrice !== null ? Number(unitPrice) : null,
              discount: Number(discount) || 0,
              category,
              make: make || null,
              mfgPartNo: mfgPartNo || null,
              uom: uom || null,
              parentId: null,
            },
          });

          console.log("🟦 PARENT CREATED:", currentParent.id);
          created++;
          continue;
        }

        // 👉 child
        if (currentParent && description) {
          if (sku) {
            const exists = await tx.item.findFirst({
              where: {
                sku: {
                  equals: sku.trim(),
                  mode: "insensitive",
                },
                category,
              },
            });

            if (exists) {
              console.log("⏭️ SKIPPED DUPLICATE CHILD:", sku);
              skipped++;
              continue;
            }
          }

          const data = {
            name: description,
            sku: sku || null,
            description,
            basePrice: unitPrice !== null ? Number(unitPrice) : null,
            discount: Number(discount) || 0,
            category,
            make: make || null,
            mfgPartNo: mfgPartNo || null,
            uom: uom || null,
            parentId: currentParent.id,
          };

          console.log("🟩 CHILD CREATED:", data);

          await tx.item.create({ data });
          created++;
        } else {
          console.log("⏭️ SKIPPED (NO PARENT OR DESCRIPTION)");
          skipped++;
        }
      }
    }

    console.log("✅ IMPORT DONE:", { created, skipped });

    return {
      created,
      skipped,
    };
  });
};
