// // src/modules/quotation/quotation.controller.js

// import prisma from "../../utils/prisma.js";
// import { createQuotation } from "./quotation.service.js";

// /* ================= CREATE ================= */
// export const createQuotationController = async (req, res) => {
//   try {
//     // ✅ normalize payload before sending to service
//     const normalizedBody = {
//       ...req.body,
//       items: (req.body.items || []).map((item) => ({
//         ...item,
//         subItems: item.subItems || item.selectedSubItems || [], // 🔥 FIX
//       })),
//     };

//     const quotation = await createQuotation(normalizedBody);

//     res.status(201).json(quotation);
//   } catch (error) {
//     console.error("❌ Create quotation error:", error);

//     const isClientError =
//       error.message?.includes("required") ||
//       error.message?.includes("not found") ||
//       error.message?.includes("invalid");

//     res.status(isClientError ? 400 : 500).json({
//       message: error.message || "Failed to create quotation",
//     });
//   }
// };

// /* ================= GET ALL ================= */
// export const getQuotationsController = async (req, res) => {
//   try {
//     const data = await prisma.quotation.findMany({
//       include: {
//         account: true,

//         // 🔥 IMPORTANT: include full item snapshot
//         items: {
//           include: {
//             item: true,
//             subItems: true,
//           },
//           orderBy: { createdAt: "asc" }, // ✅ keeps rows stable
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     res.json(data);
//   } catch (error) {
//     console.error("❌ Fetch quotations error:", error);
//     res.status(500).json({ message: "Failed to fetch quotations" });
//   }
// };

// /* ================= GET ONE ================= */
// export const getQuotationByIdController = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const quotation = await prisma.quotation.findUnique({
//       where: { id },
//       include: {
//         account: true,
//         deal: true,
//         items: {
//           include: {
//             item: true,
//             subItems: true,
//           },
//           orderBy: { createdAt: "asc" }, // ✅ ADD THIS
//         },
//       },
//     });

//     if (!quotation) {
//       return res.status(404).json({ message: "Quotation not found" });
//     }

//     res.json(quotation);
//   } catch (error) {
//     console.error("❌ Fetch quotation error:", error);
//     res.status(500).json({ message: "Failed to fetch quotation" });
//   }
// };

// /* ================= DELETE ================= */
// export const deleteQuotationController = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await prisma.quotation.delete({
//       where: { id },
//     });

//     res.json({ message: "Quotation deleted successfully" });
//   } catch (error) {
//     console.error("❌ Delete quotation error:", error);
//     res.status(500).json({ message: "Failed to delete quotation" });
//   }
// };
// /* ================= UPDATE ================= */
// export const updateQuotationController = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       issueDate,
//       validUntil,
//       notes,
//       terms,
//       items,
//       headerDiscount = 0,
//     } = req.body;

//     // ✅ normalize items
//     const normalizedItems = (items || []).map((item) => ({
//       ...item,
//       subItems: item.subItems || item.selectedSubItems || [],
//     }));

//     const result = await prisma.$transaction(async (tx) => {
//       /* 1️⃣ DELETE OLD ITEMS (cascade deletes subItems) */
//       await tx.quotationItem.deleteMany({
//         where: { quotationId: id },
//       });

//       /* 2️⃣ FETCH ITEM MASTER (same as create) */
//       // const itemIds = items.map((i) => i.itemId);

//       const itemIds = [
//         ...items.map((i) => i.itemId),
//         ...items.flatMap((i) =>
//           (i.subItems || []).map((s) => s.itemId).filter(Boolean),
//         ),
//       ];

//       const itemMasters = await tx.item.findMany({
//         where: { id: { in: itemIds } },
//       });

//       const itemMap = {};
//       itemMasters.forEach((i) => {
//         itemMap[i.id] = i;
//       });

//       /* 3️⃣ RECREATE ITEMS */
//       let subtotal = 0;

//       const createdItems = [];

//       for (const item of normalizedItems) {
//         const master = itemMap[item.itemId];
//         if (!master) throw new Error(`Item not found: ${item.itemId}`);

//         const qty = Number(item.quantity || 1);
//         const hasSubItems = item.subItems?.length > 0;

//         const price = hasSubItems
//           ? 0 // ✅ CRITICAL FIX
//           : Number(item.price ?? master.basePrice ?? 0);
//         const discount = Number(item.discount || 0);

//         const lineTotal = Math.max(0, qty * price * (1 - discount / 100));

//         // ✅ calculate sub items total
//         let subTotalSum = 0;

//         if (item.subItems?.length) {
//           subTotalSum = item.subItems.reduce((sum, sub) => {
//             return (
//               sum +
//               Number(sub.quantity || 1) *
//                 Number(sub.price || 0) *
//                 (1 - Number(sub.discount || 0) / 100)
//             );
//           }, 0);
//         }

//         // ✅ FIXED TOTAL
//         const finalLineTotal =
//           item.subItems?.length > 0 ? subTotalSum : lineTotal;

//         subtotal += finalLineTotal;

//         const created = await tx.quotationItem.create({
//           data: {
//             quotationId: id,
//             itemId: item.itemId,

//             // SNAPSHOT
//             sku: master.sku,
//             description: item.description || master.description,
//             category: master.category || null,
//             make: master.make || null,
//             mfgPartNo: master.mfgPartNo || null,
//             uom: master.uom || null,

//             remarks: item.remarks || master.defaultRemarks || null,

//             quantity: qty,
//             price,
//             discount,
//             lineTotal: finalLineTotal,

//             // ✅ SUB ITEMS
//             subItems: {
//               create:
//                 item.subItems?.map((sub) => {
//                   const subMaster = itemMap[sub.itemId]; // ✅ reuse master

//                   return {
//                     itemId: sub.itemId,

//                     name: subMaster?.name || "",
//                     sku: subMaster?.sku || "",
//                     category: subMaster?.category || null,

//                     // 🔥 ADD THESE (CRITICAL)
//                     make: subMaster?.make || null,
//                     mfgPartNo: subMaster?.mfgPartNo || null,
//                     uom: subMaster?.uom || null,

//                     description: sub.description || "",
//                     quantity: Number(sub.quantity || 1),
//                     price: Number(sub.price || 0),
//                     discount: Number(sub.discount || 0),
//                     lineTotal:
//                       Number(sub.quantity || 1) *
//                       Number(sub.price || 0) *
//                       (1 - Number(sub.discount || 0) / 100),
//                   };
//                 }) || [],
//             },
//           },
//         });

//         createdItems.push(created);
//       }

//       /* 4️⃣ TOTALS */
//       const taxable = Math.max(0, subtotal - Number(headerDiscount || 0));
//       const cgst = taxable * 0.09;
//       const sgst = taxable * 0.09;

//       const updated = await tx.quotation.update({
//         where: { id },
//         data: {
//           issueDate: new Date(issueDate),
//           validUntil: validUntil ? new Date(validUntil) : null,
//           notes,
//           terms,
//           subtotal,
//           discountTotal: Number(headerDiscount || 0),
//           taxTotal: cgst + sgst,
//           grandTotal: taxable + cgst + sgst,
//         },
//         include: {
//           account: true,
//           deal: true,
//           items: {
//             include: {
//               item: true,
//               subItems: true,
//             },
//           },
//         },
//       });

//       return updated;
//     });

//     res.json(result);
//   } catch (error) {
//     console.error("❌ Update quotation error:", error);
//     res.status(500).json({
//       message: error.message || "Failed to update quotation",
//     });
//   }
// };

// src/modules/quotation/quotation.controller.js

import prisma from "../../utils/prisma.js";
import {
  createQuotation,
  updateQuotation, // 🔥 NEW
} from "./quotation.service.js";

/* ================= CREATE ================= */
export const createQuotationController = async (req, res) => {
  try {
    const normalizedBody = {
      ...req.body,
      items: (req.body.items || []).map((item) => ({
        ...item,
        subItems: item.subItems || item.selectedSubItems || [],
      })),
    };

    const quotation = await createQuotation({
      ...normalizedBody,

      // 🔥 COMMERCIAL SUMMARY
      packingForwardingCharges: Number(req.body.packingForwardingCharges || 0),

      installationDescription: req.body.installationDescription || "",

      installationQty: Number(req.body.installationQty || 0),

      installationUom: req.body.installationUom || "",

      installationUnitPrice: Number(req.body.installationUnitPrice || 0),

      installationDiscount: Number(req.body.installationDiscount || 0),

      installationRemarks: req.body.installationRemarks || "",

      userId: req.user.id,
      currentUserRole: req.user.role,
    });
    res.status(201).json(quotation);
  } catch (error) {
    console.error("❌ Create quotation error:", error);

    const isClientError =
      error.message?.includes("required") ||
      error.message?.includes("not found") ||
      error.message?.includes("invalid");

    res.status(isClientError ? 400 : 500).json({
      message: error.message || "Failed to create quotation",
    });
  }
};

/* ================= GET ALL ================= */
export const getQuotationsController = async (req, res) => {
  try {
    const data = await prisma.quotation.findMany({
      where: {
        isLatest: true,
      },
      include: {
        account: {
          select: {
            accountName: true,
            phone: true,

            billingStreet: true,
            billingCity: true,
            billingState: true,
            billingPincode: true,
            billingCountry: true,

            contacts: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
              take: 1, // 👈 only primary contact
            },
          },
        },
        deal: true, // 🔥 ADD THIS LINE
        items: {
          include: {
            item: true,
            subItems: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(data);
  } catch (error) {
    console.error("❌ Fetch quotations error:", error);
    res.status(500).json({ message: "Failed to fetch quotations" });
  }
};

/* ================= GET ONE ================= */
export const getQuotationByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const quotation = await prisma.quotation.findUnique({
      where: { id },
      include: {
        account: {
          select: {
            accountName: true,
            phone: true,

            billingStreet: true,
            billingCity: true,
            billingState: true,
            billingPincode: true,
            billingCountry: true,

            contacts: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
              take: 1, // 👈 only primary contact
            },
          },
        },
        deal: true,
        items: {
          include: {
            item: true,
            subItems: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json(quotation);
  } catch (error) {
    console.error("❌ Fetch quotation error:", error);
    res.status(500).json({ message: "Failed to fetch quotation" });
  }
};

/* ================= DELETE ================= */
export const deleteQuotationController = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 DEBUG
    console.log("========== DELETE DEBUG ==========");
    console.log("REQ.USER:", req.user);
    console.log("ROLE:", req.user?.role);
    console.log("==================================");

    // 🔒 RBAC CHECK
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({
        message: "Only admin can delete quotation",
      });
    }

    // ✅ SIMPLE + RELIABLE (CASCADE HANDLES CHILDREN)
    await prisma.quotation.delete({
      where: { id },
    });

    res.json({ message: "Quotation deleted successfully" });
  } catch (error) {
    console.error("❌ Delete quotation error:", error);
    res.status(500).json({ message: "Failed to delete quotation" });
  }
};

/* ================= UPDATE ================= */
export const updateQuotationController = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔒 OPTIONAL OWNERSHIP CHECK
    const existing = await prisma.quotation.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    const {
      issueDate,
      validUntil,
      notes,
      terms,
      items,
      headerDiscount = 0,

      // 🔥 NEW
      // 🔥 COMMERCIAL SUMMARY
      packingForwardingCharges = 0,

      installationDescription = "",
      installationQty = 0,
      installationUom = "",
      installationUnitPrice = 0,
      installationDiscount = 0,
      installationRemarks = "",

      userId,
    } = req.body;

    // ✅ normalize items (keep your existing fix)
    const normalizedItems = (items || []).map((item) => ({
      ...item,
      subItems: item.subItems || item.selectedSubItems || [],
    }));

    // 🔥 REPLACED ENTIRE LOGIC → SERVICE
    const result = await updateQuotation(id, {
      issueDate,
      validUntil,
      notes,
      terms,
      items: normalizedItems,
      headerDiscount,

      // 🔥 NEW
      // 🔥 COMMERCIAL SUMMARY
      packingForwardingCharges,

      installationDescription,
      installationQty,
      installationUom,
      installationUnitPrice,
      installationDiscount,
      installationRemarks,

      userId: req.user.id,

      // 🔥 NEW
      currentUserRole: req.user.role,
    });
    res.json(result);
  } catch (error) {
    console.error("❌ Update quotation error:", error);
    res.status(500).json({
      message: error.message || "Failed to update quotation",
    });
  }
};

/* ================= GET HISTORY ================= */
export const getQuotationHistoryController = async (req, res) => {
  try {
    const { quotationNo } = req.params;

    const data = await prisma.quotation.findMany({
      where: { quotationNo },
      orderBy: { version: "desc" },
      include: {
        account: true,
        items: {
          include: {
            item: true,
            subItems: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    res.json(data);
  } catch (error) {
    console.error("❌ Fetch quotation history error:", error);
    res.status(500).json({
      message: "Failed to fetch quotation history",
    });
  }
};

/* ================= SUBMIT ================= */
export const submitQuotationController = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔒 ONLY SALES REP
    if (req.user?.role !== "SALES_REP") {
      return res.status(403).json({ message: "Only sales rep can submit" });
    }

    const quotation = await prisma.quotation.findUnique({
      where: { id },
    });

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    if (quotation.status !== "DRAFT" && quotation.status !== "REJECTED") {
      return res.status(400).json({
        message: "Only draft/rejected quotations can be submitted",
      });
    }

    await prisma.$transaction(async (tx) => {
      // 1️⃣ update status
      await tx.quotation.update({
        where: { id },
        data: { status: "SUBMITTED" },
      });

      // 2️⃣ approval log
      await tx.quotationApproval.create({
        data: {
          quotationId: id,
          action: quotation.status === "REJECTED" ? "RESUBMITTED" : "SUBMITTED",
          actedById: req.user.id,
        },
      });
    });

    res.json({ message: "Quotation submitted for approval" });
  } catch (error) {
    console.error("❌ Submit quotation error:", error);
    res.status(500).json({ message: "Failed to submit quotation" });
  }
};

/* ================= APPROVE ================= */
export const approveQuotationController = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔒 ONLY ADMIN
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can approve" });
    }

    const quotation = await prisma.quotation.findUnique({
      where: { id },
    });

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    if (quotation.status !== "SUBMITTED") {
      return res.status(400).json({
        message: "Only submitted quotations can be approved",
      });
    }

    await prisma.$transaction(async (tx) => {
      await tx.quotation.update({
        where: { id },
        data: { status: "APPROVED" },
      });

      await tx.quotationApproval.create({
        data: {
          quotationId: id,
          action: "APPROVED",
          actedById: req.user.id,
        },
      });
    });

    res.json({ message: "Quotation approved" });
  } catch (error) {
    console.error("❌ Approve quotation error:", error);
    res.status(500).json({ message: "Failed to approve quotation" });
  }
};

/* ================= REJECT ================= */
export const rejectQuotationController = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    // 🔒 ONLY ADMIN
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can reject" });
    }

    const quotation = await prisma.quotation.findUnique({
      where: { id },
    });

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    if (quotation.status !== "SUBMITTED") {
      return res.status(400).json({
        message: "Only submitted quotations can be rejected",
      });
    }

    await prisma.$transaction(async (tx) => {
      await tx.quotation.update({
        where: { id },
        data: { status: "REJECTED" },
      });

      await tx.quotationApproval.create({
        data: {
          quotationId: id,
          action: "REJECTED",
          comment: comment || null,
          actedById: req.user.id,
        },
      });
    });

    res.json({ message: "Quotation rejected" });
  } catch (error) {
    console.error("❌ Reject quotation error:", error);
    res.status(500).json({ message: "Failed to reject quotation" });
  }
};

/* ================= GET DISCOUNT POLICY ================= */
export const getDiscountPolicyController = async (req, res) => {
  try {
    let policy = await prisma.discountPolicy.findFirst();

    // ✅ auto-create default policy
    if (!policy) {
      policy = await prisma.discountPolicy.create({
        data: {
          salesRepMax: 5,
          managerMax: 20,
          adminMax: 100,
        },
      });
    }

    res.json(policy);
  } catch (error) {
    console.error("❌ Get discount policy error:", error);

    res.status(500).json({
      message: "Failed to fetch discount policy",
    });
  }
};

/* ================= UPDATE DISCOUNT POLICY ================= */
export const updateDiscountPolicyController = async (req, res) => {
  try {
    const { salesRepMax, managerMax, adminMax } = req.body;

    let policy = await prisma.discountPolicy.findFirst();

    // ✅ create if not exists
    if (!policy) {
      policy = await prisma.discountPolicy.create({
        data: {
          salesRepMax: Number(salesRepMax ?? 5),
          managerMax: Number(managerMax ?? 20),
          adminMax: Number(adminMax ?? 100),

          updatedById: req.user.id,
        },
      });

      return res.json(policy);
    }

    // ✅ update existing
    const updated = await prisma.discountPolicy.update({
      where: {
        id: policy.id,
      },
      data: {
        salesRepMax: Number(salesRepMax),
        managerMax: Number(managerMax),
        adminMax: Number(adminMax),

        updatedById: req.user.id,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("❌ Update discount policy error:", error);

    res.status(500).json({
      message: "Failed to update discount policy",
    });
  }
};
