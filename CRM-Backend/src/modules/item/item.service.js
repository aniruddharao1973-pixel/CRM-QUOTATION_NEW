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

      pricingMode: data.pricingMode || "parent_only",

      parentId: data.parentId || null,

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

      pricingMode:
        data.pricingMode !== undefined ? data.pricingMode : undefined,

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
  // const dataRows = rows.slice(2);

  // ✅ dynamically skip title/header rows
  // keep title/header filtering, but DO NOT drop blank continuation rows
  const dataRows = rows.filter((row) => {
    const c0 = String(row[0] ?? "")
      .trim()
      .toLowerCase();
    const c1 = String(row[1] ?? "")
      .trim()
      .toLowerCase();
    const c2 = String(row[2] ?? "")
      .trim()
      .toLowerCase();
    const c3 = String(row[3] ?? "")
      .trim()
      .toLowerCase();
    const c4 = String(row[4] ?? "")
      .trim()
      .toLowerCase();

    const isTitleRow =
      c0.includes("price configurator") ||
      c0.includes("items catalog") ||
      c0.includes("item breakdown");

    const isHeaderRow =
      c0 === "category" ||
      c1 === "sku #" ||
      c2 === "item description" ||
      c3 === "make" ||
      c4 === "mfg pn" ||
      c4 === "qty" ||
      c4 === "uom" ||
      c4 === "unit price" ||
      c4 === "total price" ||
      c4 === "discount";

    return !(isTitleRow || isHeaderRow);
  });

  console.log("📦 IMPORT START");
  console.log("👉 CATEGORY:", category);
  console.log("👉 IMPORT TYPE:", importType);
  console.log("👉 TOTAL ROWS:", dataRows.length);

  let created = 0;
  let updated = 0;
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

        let existingItem = null;

        if (sku) {
          existingItem = await tx.item.findFirst({
            where: {
              sku: {
                equals: sku.trim(),
                mode: "insensitive",
              },
              category,
            },
          });
        }

        const newBasePrice =
          unitPrice !== null && unitPrice !== "" ? Number(unitPrice) : null;

        if (existingItem) {
          const hasChanges =
            existingItem.name !== description ||
            existingItem.description !== description ||
            Number(existingItem.basePrice || 0) !== Number(newBasePrice || 0) ||
            existingItem.make !== (make || null) ||
            existingItem.mfgPartNo !== (mfgPartNo || null) ||
            existingItem.uom !== (uom || null);

          if (hasChanges) {
            await tx.item.update({
              where: {
                id: existingItem.id,
              },
              data: {
                name: description,
                description,
                basePrice: newBasePrice,
                make: make || null,
                mfgPartNo: mfgPartNo || null,
                uom: uom || null,
              },
            });

            console.log("🟨 UPDATED:", sku);
            updated++;
          } else {
            console.log("⏭️ NO CHANGES:", sku);
            skipped++;
          }

          continue;
        }

        const data = {
          name: description,
          sku: sku ? sku.trim() : null,
          description,
          basePrice: unitPrice !== null ? Number(unitPrice) : null,
          discount: Number(discount) || 0,

          // ✅ NORMAL ITEMS
          pricingMode: "parent_only",

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
    // 🔹 GROUPED IMPORT
    if (importType === "grouped") {
      let currentParent = null;

      for (const row of dataRows) {
        console.log("➡️ ROW:", row);

        const serial = String(row[0] ?? "").trim();
        const categoryCell = String(row[1] ?? "").trim();
        const sku = String(row[2] ?? "").trim();
        const description = String(row[3] ?? "").trim();
        const make = String(row[4] ?? "").trim();
        const mfgPartNo = String(row[5] ?? "").trim();
        const uom = String(row[7] ?? "").trim();

        const unitPrice = row[8] ?? null;
        const totalPrice = row[9] ?? null;

        const discount = row[10] ?? 0;

        const upperSku = sku.toUpperCase();

        const isParent =
          upperSku.startsWith("TC") || // Test Platform parent
          upperSku.startsWith("FX"); // Fixture & Adapter parent

        const isChild =
          upperSku.startsWith("FC") || // Test Platform child
          upperSku.startsWith("INT") || // Test Platform multiline/spec child
          categoryCell.toUpperCase() === "ACCESSORY"; // Fixture child

        // =========================
        // 1. PARENT ROW
        // =========================
        if (isParent) {
          const exists = await tx.item.findFirst({
            where: {
              sku: {
                equals: sku.trim(),
                mode: "insensitive",
              },
            },
          });

          if (exists) {
            const newBasePrice =
              unitPrice !== null && unitPrice !== "" ? Number(unitPrice) : null;

            const hasChanges =
              exists.name !== description ||
              exists.description !== description ||
              Number(exists.basePrice || 0) !== Number(newBasePrice || 0) ||
              exists.make !== (make || null) ||
              exists.mfgPartNo !== (mfgPartNo || null) ||
              exists.uom !== (uom || null);

            if (hasChanges) {
              currentParent = await tx.item.update({
                where: {
                  id: exists.id,
                },
                data: {
                  name: description || "Unnamed Item",
                  description: description || null,
                  basePrice: newBasePrice,
                  make: make || null,
                  mfgPartNo: mfgPartNo || null,
                  uom: uom || null,
                },
              });

              console.log("🟨 UPDATED PARENT:", sku);
              updated++;
            } else {
              console.log("⏭️ NO CHANGES PARENT:", sku);
              skipped++;
              currentParent = exists;
            }

            continue;
          }

          currentParent = await tx.item.create({
            data: {
              name: description || "Unnamed Item",
              sku: sku || null,
              description: description || null,
              basePrice:
                unitPrice !== null && unitPrice !== ""
                  ? Number(unitPrice)
                  : null,
              discount: Number(discount) || 0,
              pricingMode: "parent_with_children",
              category: categoryCell || category,
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

        // =========================
        // 2. CHILD ROW
        // =========================
        if (currentParent && isChild) {
          const exists = await tx.item.findFirst({
            where: {
              sku: {
                equals: sku.trim(),
                mode: "insensitive",
              },
            },
          });

          // const finalBasePrice =
          //   categoryCell.toUpperCase() === "ACCESSORY"
          //     ? totalPrice !== null && totalPrice !== ""
          //       ? Number(totalPrice)
          //       : null
          //     : unitPrice !== null && unitPrice !== ""
          //       ? Number(unitPrice)
          //       : null;

          if (exists) {
            const hasChanges =
              exists.name !== description ||
              Number(exists.basePrice || 0) !== Number(finalBasePrice || 0) ||
              exists.make !== (make || null) ||
              exists.mfgPartNo !== (mfgPartNo || null) ||
              exists.uom !== (uom || null);

            if (hasChanges) {
              await tx.item.update({
                where: {
                  id: exists.id,
                },
                data: {
                  name: description || "Unnamed Child Item",
                  basePrice: finalBasePrice,
                  make: make || null,
                  mfgPartNo: mfgPartNo || null,
                  uom: uom || null,
                },
              });

              console.log("🟨 UPDATED CHILD:", sku);
              updated++;
            } else {
              console.log("⏭️ NO CHANGES CHILD:", sku);
              skipped++;
            }

            continue;
          }

          const finalBasePrice =
            categoryCell.toUpperCase() === "ACCESSORY"
              ? totalPrice !== null && totalPrice !== ""
                ? Number(totalPrice)
                : null
              : unitPrice !== null && unitPrice !== ""
                ? Number(unitPrice)
                : null;

          const child = await tx.item.create({
            data: {
              name: description || "Unnamed Child Item",

              sku: sku || null,

              description: null,

              basePrice: finalBasePrice,

              discount: Number(discount) || 0,

              pricingMode: "parent_only",

              category: currentParent.category || categoryCell || category,

              make: make || null,

              mfgPartNo: mfgPartNo || null,

              uom: uom || null,

              parentId: currentParent.id,
            },
          });

          console.log("🟩 CHILD CREATED:", child.id);
          created++;
          continue;
        }

        // =========================================
        // 3. DESCRIPTION CONTINUATION ROW
        // =========================================
        // =========================================
        // 3. DESCRIPTION CONTINUATION ROW
        // =========================================
        if (currentParent && !sku && description) {
          const latestChild = await tx.item.findFirst({
            where: {
              parentId: currentParent.id,
            },
            orderBy: {
              createdAt: "desc",
            },
          });

          if (latestChild) {
            // ✅ avoid duplicate text append
            const existingDescription = latestChild.description || "";

            // ✅ skip if already exists
            if (existingDescription.includes(description.trim())) {
              console.log("⏭️ DUPLICATE DESCRIPTION SKIPPED");
              continue;
            }

            // ✅ proper multiline append
            const updatedDescription = existingDescription
              ? `${existingDescription}\n${description.trim()}`
              : description.trim();

            await tx.item.update({
              where: {
                id: latestChild.id,
              },
              data: {
                description: updatedDescription,
              },
            });

            console.log("📝 DESCRIPTION APPENDED");

            continue;
          }
        }

        console.log("⏭️ SKIPPED UNKNOWN ROW");
        skipped++;
      }
    }

    console.log("✅ IMPORT DONE:", { created, skipped });

    return {
      created,
      updated,
      skipped,
    };
  });
};
