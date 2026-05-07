// // // src/features/quotations/QuotationItemsTable.jsx

// // import { Plus, Trash2 } from "lucide-react";
// // import { formatINR } from "./quotationUtils";

// // export default function QuotationItemsTable({
// //   totals,
// //   itemsList,
// //   updateItem,
// //   addItem,
// //   removeItem,
// // }) {
// //   return (
// //     <div className="rounded-2xl border bg-white overflow-hidden">

// //       <div className="flex justify-between p-4 border-b">
// //         <h2 className="font-semibold">Line Items</h2>

// //         <button
// //           onClick={addItem}
// //           className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-xl text-sm"
// //         >
// //           <Plus className="w-4 h-4" />
// //           Add Item
// //         </button>
// //       </div>

// //       <table className="w-full text-sm">
// //         <thead className="bg-slate-50">
// //           <tr>
// //             <th className="p-3 text-left">Item</th>
// //             <th>Qty</th>
// //             <th>Price</th>
// //             <th>Discount</th>
// //             <th>Total</th>
// //             <th></th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {totals.rows.map((row, index) => (
// //             <tr key={index} className="border-t">

// //               {/* ITEM */}
// //               <td className="p-3">
// //                 <select
// //                   value={row.itemId}
// //                   onChange={(e) =>
// //                     updateItem(index, "itemId", e.target.value)
// //                   }
// //                   className="w-full rounded-xl border px-2 py-1"
// //                 >
// //                   <option value="">Select</option>
// //                   {itemsList.map((i) => (
// //                     <option key={i.id} value={i.id}>
// //                       {i.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </td>

// //               {/* QTY */}
// //               <td>
// //                 <input
// //                   type="number"
// //                   value={row.qty}
// //                   onChange={(e) =>
// //                     updateItem(index, "qty", e.target.value)
// //                   }
// //                   className="w-full rounded-xl border px-2 py-1 text-right"
// //                 />
// //               </td>

// //               {/* PRICE */}
// //               <td>
// //                 <input
// //                   type="number"
// //                   value={row.price}
// //                   onChange={(e) =>
// //                     updateItem(index, "price", e.target.value)
// //                   }
// //                   className="w-full rounded-xl border px-2 py-1 text-right"
// //                 />
// //               </td>

// //               {/* DISCOUNT */}
// //               <td>
// //                 <input
// //                   type="number"
// //                   value={row.discount}
// //                   onChange={(e) =>
// //                     updateItem(index, "discount", e.target.value)
// //                   }
// //                   className="w-full rounded-xl border px-2 py-1 text-right"
// //                 />
// //               </td>

// //               {/* TOTAL */}
// //               <td className="font-semibold text-right pr-2">
// //                 {formatINR(row.net)}
// //               </td>

// //               {/* DELETE */}
// //               <td className="text-center">
// //                 <button onClick={() => removeItem(index)}>
// //                   <Trash2 className="w-4 h-4 text-red-500" />
// //                 </button>
// //               </td>

// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // // src/features/quotations/QuotationItemsTable.jsx

// // import {
// //   Plus,
// //   Trash2,
// //   PackageSearch,
// //   Sparkles,
// //   Calculator,
// // } from "lucide-react";
// // import { formatINR } from "./quotationUtils";

// // function Metric({ label, value }) {
// //   return (
// //     <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
// //       <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
// //         {label}
// //       </div>
// //       <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
// //     </div>
// //   );
// // }

// // function CellLabel({ children }) {
// //   return (
// //     <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:hidden">
// //       {children}
// //     </div>
// //   );
// // }

// // export default function QuotationItemsTable({
// //   totals,
// //   itemsList,
// //   updateItem,
// //   addItem,
// //   removeItem,
// //   formItems,
// //   toggleSubItem,
// //   updateSubItem,
// //   autoSave, // ✅ ADD THIS
// // }) {
// //   const rowCount = totals?.rows?.length || 0;
// //   const filledCount =
// //     totals?.rows?.filter(
// //       (row) => row.itemId || row.description || row.qty || row.price,
// //     )?.length || 0;

// //   return (
// //     <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
// //       <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 px-5 py-4 sm:px-6">
// //         <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
// //           <div>
// //             <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
// //               <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
// //               Line Items
// //             </div>
// //             <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
// //               Item breakdown
// //             </h2>
// //             <p className="mt-1 text-sm text-slate-500">
// //               Select products from master data and fine-tune quantity, pricing,
// //               and discount per row.
// //             </p>
// //           </div>

// //           <div className="flex flex-wrap gap-3">
// //             <Metric label="Rows" value={`${rowCount} total`} />
// //             <Metric label="Filled" value={`${filledCount} active`} />
// //             <Metric label="Subtotal" value={formatINR(totals?.subtotal || 0)} />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
// //         <button
// //           onClick={addItem}
// //           className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
// //         >
// //           <Plus className="h-4 w-4" />
// //           Add Item Row
// //         </button>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="min-w-[1400px] w-full border-separate border-spacing-0 text-sm">
// //           <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
// //             <tr className="text-slate-600">
// //               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
// //                 Item
// //               </th>

// //               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
// //                 SKU
// //               </th>
// //               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
// //                 Category
// //               </th>
// //               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
// //                 Description
// //               </th>
// //               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
// //                 Qty
// //               </th>
// //               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
// //                 Price
// //               </th>
// //               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
// //                 Discount
// //               </th>
// //               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
// //                 Line Total
// //               </th>
// //               <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
// //                 Action
// //               </th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {totals.rows.map((row, index) => {
// //               const formRow = formItems[index];
// //               const selectedItem = itemsList.find((i) => i.id === row.itemId);

// //               return (
// //                 <>
// //                   {/* ================= MAIN ROW ================= */}
// //                   <tr
// //                     key={index}
// //                     className="group border-b border-slate-100 transition hover:bg-slate-50/70"
// //                   >
// //                     {/* ITEM */}
// //                     <td className="px-4 py-4 align-top">
// //                       <CellLabel>Item</CellLabel>
// //                       <div className="space-y-2">
// //                         <div className="relative">
// //                           <select
// //                             value={row.itemId}
// //                             onChange={(e) =>
// //                               updateItem(index, "itemId", e.target.value)
// //                             }
// //                             className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                           >
// //                             <option value="">Select item</option>
// //                             {itemsList.map((i) => (
// //                               <option key={i.id} value={i.id}>
// //                                 {i.name}
// //                                 {i.sku ? ` • ${i.sku}` : ""}
// //                               </option>
// //                             ))}
// //                           </select>
// //                           <PackageSearch className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
// //                         </div>

// //                         <div className="text-xs text-slate-500">
// //                           {selectedItem ? (
// //                             <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 font-medium text-indigo-700">
// //                               {selectedItem.sku || "SKU not set"}
// //                               {selectedItem.category
// //                                 ? ` · ${selectedItem.category}`
// //                                 : ""}
// //                             </span>
// //                           ) : (
// //                             <span className="text-slate-400">
// //                               Choose from master data
// //                             </span>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </td>

// //                     {/* SKU */}
// //                     <td className="px-4 py-4 align-top">
// //                       <CellLabel>SKU</CellLabel>
// //                       <div className="text-sm text-slate-700">
// //                         {selectedItem?.sku || "-"}
// //                       </div>
// //                     </td>

// //                     {/* CATEGORY */}
// //                     <td className="px-4 py-4 align-top">
// //                       <CellLabel>Category</CellLabel>
// //                       <div className="text-sm text-slate-700">
// //                         {selectedItem?.category || "-"}
// //                       </div>
// //                     </td>

// //                     {/* DESCRIPTION */}
// //                     <td className="px-4 py-4 align-top">
// //                       <CellLabel>Description</CellLabel>
// //                       <input
// //                         value={row.description}
// //                         onChange={(e) =>
// //                           updateItem(index, "description", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm"
// //                       />
// //                     </td>

// //                     {/* QTY */}
// //                     <td className="px-4 py-4 align-top">
// //                       <CellLabel>Qty</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="1"
// //                         value={row.qty === 0 ? "" : row.qty}
// //                         onChange={(e) =>
// //                           updateItem(index, "qty", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className="w-28 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                       />
// //                     </td>

// //                     {/* PRICE */}
// //                     {/* PRICE */}
// //                     <td className="px-4 py-4 align-top">
// //                       <CellLabel>Price</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="0"
// //                         disabled={
// //                           formItems[index]?.selectedSubItems?.length > 0
// //                         }
// //                         value={row.price === 0 ? "" : row.price}
// //                         onChange={(e) =>
// //                           updateItem(index, "price", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         placeholder={
// //                           formItems[index]?.selectedSubItems?.length > 0
// //                             ? "Auto from sub-items"
// //                             : ""
// //                         }
// //                         className="w-32 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
// //                       />
// //                     </td>

// //                     {/* DISCOUNT */}
// //                     <td className="px-4 py-4 align-top">
// //                       <CellLabel>Discount</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="0"
// //                         value={row.discount === 0 ? "" : row.discount}
// //                         onChange={(e) =>
// //                           updateItem(index, "discount", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className="w-32 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                       />
// //                     </td>

// //                     {/* TOTAL */}
// //                     <td className="px-4 py-4 align-top">
// //                       <CellLabel>Line Total</CellLabel>
// //                       <div className="inline-flex min-w-32 items-center rounded-2xl bg-emerald-50 px-3 py-2.5 text-right text-sm font-semibold text-emerald-700">
// //                         {formatINR(row.net)}
// //                       </div>
// //                     </td>

// //                     {/* ACTION */}
// //                     <td className="px-4 py-4 align-top">
// //                       <CellLabel>Action</CellLabel>
// //                       <button
// //                         onClick={() => removeItem(index)}
// //                         className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-100 hover:text-rose-700"
// //                         aria-label="Remove row"
// //                       >
// //                         <Trash2 className="h-4 w-4" />
// //                       </button>
// //                     </td>
// //                   </tr>

// //                   {/* ================= SUB ITEMS AS ROWS (ENHANCED UX) ================= */}
// //                   {formItems[index]?.subItems?.length > 0 &&
// //                     formItems[index].subItems.map((sub) => {
// //                       const selected = formItems[index].selectedSubItems.find(
// //                         (s) => s.id === sub.id,
// //                       );

// //                       const checked = !!selected;

// //                       const qty = selected?.qty || 1;
// //                       const price = selected?.price ?? sub.basePrice ?? 0;
// //                       const discount = selected?.discount || 0;

// //                       const lineTotal = qty * price - discount;

// //                       return (
// //                         <tr
// //                           key={sub.id}
// //                           className={`border-b transition ${
// //                             checked
// //                               ? "bg-emerald-50/60"
// //                               : "bg-slate-50 hover:bg-slate-100"
// //                           }`}
// //                         >
// //                           {/* ITEM + CHECKBOX */}
// //                           <td className="px-4 py-3">
// //                             <div className="flex items-start gap-2 ml-8">
// //                               <input
// //                                 type="checkbox"
// //                                 checked={checked}
// //                                 onChange={() => toggleSubItem(index, sub)}
// //                                 className="mt-1 accent-indigo-600"
// //                               />

// //                               <div className="flex flex-col">
// //                                 <span className="text-sm font-semibold text-slate-800">
// //                                   {sub.name}
// //                                 </span>

// //                                 {sub.uom && (
// //                                   <span className="text-xs text-slate-400">
// //                                     {sub.uom}
// //                                   </span>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </td>

// //                           {/* SKU */}
// //                           <td className="px-4 py-3">
// //                             <div className="text-sm text-slate-700">
// //                               {sub.sku || "-"}
// //                             </div>
// //                           </td>

// //                           {/* CATEGORY */}
// //                           <td className="px-4 py-3">
// //                             <div className="text-sm text-slate-700">
// //                               {sub.category || "-"}
// //                             </div>
// //                           </td>

// //                           {/* DESCRIPTION (EDITABLE) */}
// //                           <td className="px-4 py-3">
// //                             <input
// //                               value={
// //                                 selected?.description ?? sub.description ?? ""
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "description",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full rounded-xl border px-2 py-1 text-sm ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white"
// //                                   : "border-slate-100 bg-slate-100 cursor-not-allowed"
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* QTY */}
// //                           <td className="px-4 py-3">
// //                             <input
// //                               type="number"
// //                               min="1"
// //                               value={
// //                                 checked
// //                                   ? qty === 0
// //                                     ? ""
// //                                     : qty
// //                                   : sub.baseQty || 1
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "qty",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-20 rounded-xl border px-2 py-1 text-right text-sm ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white"
// //                                   : "border-slate-100 bg-slate-100 cursor-not-allowed"
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* PRICE */}
// //                           <td className="px-4 py-3">
// //                             <input
// //                               type="number"
// //                               min="0"
// //                               value={
// //                                 checked
// //                                   ? price === 0
// //                                     ? ""
// //                                     : price
// //                                   : sub.basePrice || 0
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "price",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-24 rounded-xl border px-2 py-1 text-right text-sm ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white"
// //                                   : "border-slate-100 bg-slate-100 cursor-not-allowed"
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* DISCOUNT */}
// //                           <td className="px-4 py-3">
// //                             <input
// //                               type="number"
// //                               min="0"
// //                               value={
// //                                 checked ? (discount === 0 ? "" : discount) : 0
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "discount",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-24 rounded-xl border px-2 py-1 text-right text-sm ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white"
// //                                   : "border-slate-100 bg-slate-100 cursor-not-allowed"
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* TOTAL */}
// //                           <td className="px-4 py-3 text-right">
// //                             <div
// //                               className={`inline-flex min-w-28 justify-end rounded-xl px-3 py-1.5 text-sm font-semibold ${
// //                                 checked
// //                                   ? "bg-emerald-100 text-emerald-700"
// //                                   : "bg-slate-200 text-slate-500"
// //                               }`}
// //                             >
// //                               ₹{checked ? lineTotal : 0}
// //                             </div>
// //                           </td>

// //                           {/* ACTION */}
// //                           <td className="px-4 py-3 text-center">
// //                             {checked && (
// //                               <button
// //                                 onClick={() => toggleSubItem(index, sub)}
// //                                 className="text-xs text-rose-500 hover:text-rose-600"
// //                               >
// //                                 Remove
// //                               </button>
// //                             )}
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                 </>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>

// //       <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6">
// //         <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //           <Metric
// //             label="Taxable Value"
// //             value={formatINR(totals?.taxable || 0)}
// //           />
// //           <Metric
// //             label="GST Total"
// //             value={formatINR((totals?.cgst || 0) + (totals?.sgst || 0))}
// //           />
// //           <Metric
// //             label="Grand Total"
// //             value={formatINR(totals?.grandTotal || 0)}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // src/features/quotations/QuotationItemsTable.jsx

// // import { Plus, Trash2, PackageSearch, Sparkles } from "lucide-react";
// // import { formatINR } from "./quotationUtils";

// // function Metric({ label, value }) {
// //   return (
// //     <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
// //       <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
// //         {label}
// //       </div>
// //       <div className="mt-0.5 text-sm font-semibold text-slate-900">{value}</div>
// //     </div>
// //   );
// // }

// // function CellLabel({ children }) {
// //   return (
// //     <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:hidden">
// //       {children}
// //     </div>
// //   );
// // }

// // export default function QuotationItemsTable({
// //   totals,
// //   itemsList,
// //   updateItem,
// //   addItem,
// //   removeItem,
// //   formItems,
// //   toggleSubItem,
// //   updateSubItem,
// //   autoSave,
// // }) {
// //   const rowCount = totals?.rows?.length || 0;
// //   const filledCount =
// //     totals?.rows?.filter(
// //       (row) => row.itemId || row.description || row.qty || row.price,
// //     )?.length || 0;

// //   return (
// //     <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
// //       {/* ── HEADER ── */}
// //       <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 px-5 py-4 sm:px-6">
// //         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
// //           <div>
// //             <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
// //               <Sparkles className="h-3 w-3 text-indigo-400" />
// //               Line Items
// //             </div>
// //             <h2 className="mt-1.5 text-base font-semibold tracking-tight text-slate-900">
// //               Item breakdown
// //             </h2>
// //             <p className="mt-0.5 text-xs text-slate-400">
// //               Select products from master data and fine-tune quantity, pricing,
// //               and discount per row.
// //             </p>
// //           </div>

// //           <div className="flex flex-wrap gap-2">
// //             <Metric label="Rows" value={`${rowCount} total`} />
// //             <Metric label="Filled" value={`${filledCount} active`} />
// //             <Metric label="Subtotal" value={formatINR(totals?.subtotal || 0)} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── TOOLBAR ── */}
// //       <div className="border-b border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6">
// //         <button
// //           onClick={addItem}
// //           className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700"
// //         >
// //           <Plus className="h-3.5 w-3.5" />
// //           Add Item Row
// //         </button>
// //       </div>

// //       {/* ── TABLE ── */}
// //       <div className="overflow-x-auto">
// //         <table className="min-w-[1400px] w-full border-separate border-spacing-0 text-sm">
// //           {/* THEAD */}
// //           <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
// //             <tr>
// //               {[
// //                 "Item",
// //                 "SKU",
// //                 "Category",
// //                 "Description",
// //                 "Qty",
// //                 "Price",
// //                 "Discount",
// //                 "Line Total",
// //                 "",
// //               ].map((h) => (
// //                 <th
// //                   key={h}
// //                   className="border-b border-slate-100 px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 whitespace-nowrap"
// //                 >
// //                   {h}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {totals.rows.map((row, index) => {
// //               const selectedItem = itemsList.find((i) => i.id === row.itemId);

// //               return (
// //                 <>
// //                   {/* ── MAIN ROW ── */}
// //                   <tr
// //                     key={index}
// //                     className="group border-b border-slate-100 transition hover:bg-slate-50/50"
// //                   >
// //                     {/* ITEM */}
// //                     <td className="px-4 py-3 align-top">
// //                       <CellLabel>Item</CellLabel>
// //                       <div className="relative">
// //                         <select
// //                           value={row.itemId}
// //                           onChange={(e) => {
// //                             const selectedId = e.target.value;
// //                             const selectedItem = itemsList.find(
// //                               (i) => i.id === selectedId,
// //                             );

// //                             // 1. Set main item
// //                             // 1. Set main item + auto fill values
// //                             updateItem(index, "itemId", selectedId);
// //                             updateItem(
// //                               index,
// //                               "price",
// //                               selectedItem?.basePrice || 0,
// //                             );
// //                             updateItem(
// //                               index,
// //                               "discount",
// //                               selectedItem?.discount || 0,
// //                             );
// //                             updateItem(
// //                               index,
// //                               "description",
// //                               selectedItem?.description || "",
// //                             );

// //                             if (selectedItem?.children?.length) {
// //                               // 2. Auto attach subItems
// //                               updateItem(
// //                                 index,
// //                                 "subItems",
// //                                 selectedItem.children,
// //                               );

// //                               // 3. Auto select ALL subItems
// //                               updateItem(
// //                                 index,
// //                                 "selectedSubItems",
// //                                 selectedItem.children.map((child) => ({
// //                                   id: child.id,
// //                                   itemId: child.id,
// //                                   name: child.name,
// //                                   qty: child.baseQty || 1,
// //                                   price: child.basePrice || 0,
// //                                   discount: child.discount || 0,
// //                                   description: child.description || "",
// //                                 })),
// //                               );

// //                               // 4. OPTIONAL: set parent price = 0 (since children drive total)
// //                               //   updateItem(index, "price", 0);
// //                             } else {
// //                               // if no children → clear subItems
// //                               updateItem(index, "subItems", []);
// //                               updateItem(index, "selectedSubItems", []);
// //                             }
// //                           }}
// //                           className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 pr-9 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                         >
// //                           <option value="">Select item</option>
// //                           {itemsList.map((i) => (
// //                             <option key={i.id} value={i.id}>
// //                               {i.name}
// //                               {i.sku ? ` • ${i.sku}` : ""}
// //                             </option>
// //                           ))}
// //                         </select>
// //                         <PackageSearch className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
// //                       </div>
// //                       {selectedItem && (
// //                         <div className="mt-1.5 text-[11px] text-slate-400">
// //                           {selectedItem.sku || "No SKU"}
// //                           {selectedItem.category
// //                             ? ` · ${selectedItem.category}`
// //                             : ""}
// //                         </div>
// //                       )}
// //                     </td>

// //                     {/* SKU */}
// //                     <td className="px-4 py-3 align-top">
// //                       <CellLabel>SKU</CellLabel>
// //                       <div className="text-sm text-slate-500">
// //                         {selectedItem?.sku || (
// //                           <span className="text-slate-300">—</span>
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* CATEGORY */}
// //                     <td className="px-4 py-3 align-top">
// //                       <CellLabel>Category</CellLabel>
// //                       <div className="text-sm text-slate-500">
// //                         {selectedItem?.category || (
// //                           <span className="text-slate-300">—</span>
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* DESCRIPTION */}
// //                     <td className="px-4 py-3 align-top">
// //                       <CellLabel>Description</CellLabel>
// //                       <input
// //                         value={row.description}
// //                         onChange={(e) =>
// //                           updateItem(index, "description", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                       />
// //                     </td>

// //                     {/* QTY */}
// //                     <td className="px-4 py-3 align-top">
// //                       <CellLabel>Qty</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="1"
// //                         value={row.qty === 0 ? "" : row.qty}
// //                         onChange={(e) =>
// //                           updateItem(index, "qty", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-2 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                       />
// //                     </td>

// //                     {/* PRICE */}
// //                     <td className="px-4 py-3 align-top">
// //                       <CellLabel>Price</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="0"
// //                         disabled={false}
// //                         value={row.price === 0 ? "" : row.price}
// //                         onChange={(e) =>
// //                           updateItem(index, "price", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         placeholder=""
// //                         className="w-28 rounded-xl border border-slate-200 bg-white px-3 py-2 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed"
// //                       />
// //                     </td>

// //                     {/* DISCOUNT */}
// //                     <td className="px-4 py-3 align-top">
// //                       <CellLabel>Discount</CellLabel>

// //                       <div className="relative w-28">
// //                         <input
// //                           type="number"
// //                           min="0"
// //                           max="100"
// //                           value={row.discount === 0 ? "" : row.discount}
// //                           onChange={(e) =>
// //                             updateItem(index, "discount", e.target.value)
// //                           }
// //                           onBlur={() => autoSave(formItems)}
// //                           className="w-full rounded-xl border border-slate-200 bg-white px-3 pr-8 py-2 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                         />

// //                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
// //                           %
// //                         </span>
// //                       </div>
// //                     </td>

// //                     {/* LINE TOTAL */}
// //                     <td className="px-4 py-3 align-top">
// //                       <CellLabel>Line Total</CellLabel>
// //                       <div className="inline-flex min-w-28 items-center justify-end rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
// //                         {formatINR(
// //                           Number(row.qty || 1) *
// //                             Number(row.price || 0) *
// //                             (1 - Number(row.discount || 0) / 100),
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* ACTION */}
// //                     <td className="px-4 py-3 align-top">
// //                       <button
// //                         onClick={() => removeItem(index)}
// //                         className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-500 transition hover:bg-rose-100 hover:text-rose-700"
// //                         aria-label="Remove row"
// //                       >
// //                         <Trash2 className="h-3.5 w-3.5" />
// //                       </button>
// //                     </td>
// //                   </tr>

// //                   {/* ── SUB-ITEM ROWS ── */}
// //                   {formItems[index]?.subItems?.length > 0 &&
// //                     formItems[index].subItems.map((sub) => {
// //                       const selected = formItems[index].selectedSubItems.find(
// //                         (s) => s.id === (sub.id || sub.itemId),
// //                       );

// //                       const checked = !!selected;
// //                       const qty = selected?.qty || 1;
// //                       const price = selected?.price ?? sub.basePrice ?? 0;
// //                       const discount = selected?.discount || 0;
// //                       const lineTotal = qty * price * (1 - discount / 100);

// //                       return (
// //                         <tr
// //                           key={sub.id}
// //                           className={`border-b border-slate-100 transition ${
// //                             checked
// //                               ? "bg-indigo-50/30 hover:bg-indigo-50/50"
// //                               : "bg-slate-50/60 hover:bg-slate-100/60"
// //                           }`}
// //                         >
// //                           {/* ITEM + CHECKBOX */}
// //                           <td className="px-4 py-2.5">
// //                             <div className="flex items-center gap-2.5 pl-6">
// //                               <div
// //                                 className={`h-4 w-0.5 rounded-full ${checked ? "bg-indigo-300" : "bg-slate-200"}`}
// //                               />
// //                               <input
// //                                 type="checkbox"
// //                                 checked={formItems[index].selectedSubItems.some(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )}
// //                                 onChange={() => toggleSubItem(index, sub)}
// //                               />
// //                               <div className="flex flex-col">
// //                                 <span
// //                                   className={`text-xs font-medium ${checked ? "text-slate-800" : "text-slate-500"}`}
// //                                 >
// //                                   {sub.name}
// //                                 </span>
// //                                 {sub.uom && (
// //                                   <span className="text-[10px] text-slate-400">
// //                                     {sub.uom}
// //                                   </span>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </td>

// //                           {/* SKU */}
// //                           <td className="px-4 py-2.5">
// //                             <span className="text-xs text-slate-400">
// //                               {sub.sku || "—"}
// //                             </span>
// //                           </td>

// //                           {/* CATEGORY */}
// //                           <td className="px-4 py-2.5">
// //                             <span className="text-xs text-slate-400">
// //                               {sub.category || "—"}
// //                             </span>
// //                           </td>

// //                           {/* DESCRIPTION */}
// //                           <td className="px-4 py-2.5">
// //                             <input
// //                               value={
// //                                 selected?.description ?? sub.description ?? ""
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "description",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full rounded-lg border px-2.5 py-1.5 text-xs transition ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
// //                                   : "border-transparent bg-transparent text-slate-400 cursor-not-allowed"
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* QTY */}
// //                           <td className="px-4 py-2.5">
// //                             <input
// //                               type="number"
// //                               min="1"
// //                               value={
// //                                 checked
// //                                   ? qty === 0
// //                                     ? ""
// //                                     : qty
// //                                   : sub.baseQty || 1
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "qty",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-20 rounded-lg border px-2.5 py-1.5 text-right text-xs transition ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
// //                                   : "border-transparent bg-transparent text-slate-400 cursor-not-allowed"
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* PRICE */}
// //                           <td className="px-4 py-2.5">
// //                             <input
// //                               type="number"
// //                               min="0"
// //                               value={
// //                                 checked
// //                                   ? price === 0
// //                                     ? ""
// //                                     : price
// //                                   : sub.basePrice || 0
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "price",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-24 rounded-lg border px-2.5 py-1.5 text-right text-xs transition ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
// //                                   : "border-transparent bg-transparent text-slate-400 cursor-not-allowed"
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* DISCOUNT */}
// //                           <td className="px-4 py-2.5">
// //                             <div className="relative w-24">
// //                               <input
// //                                 type="number"
// //                                 min="0"
// //                                 max="100"
// //                                 value={
// //                                   checked ? (discount === 0 ? "" : discount) : 0
// //                                 }
// //                                 disabled={!checked}
// //                                 onChange={(e) =>
// //                                   updateSubItem(
// //                                     index,
// //                                     sub.id,
// //                                     "discount",
// //                                     e.target.value,
// //                                   )
// //                                 }
// //                                 onBlur={() => autoSave(formItems)}
// //                                 className={`w-full rounded-lg border px-2.5 pr-6 py-1.5 text-right text-xs transition ${
// //                                   checked
// //                                     ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
// //                                     : "border-transparent bg-transparent text-slate-400 cursor-not-allowed"
// //                                 }`}
// //                               />

// //                               <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
// //                                 %
// //                               </span>
// //                             </div>
// //                           </td>
// //                           {/* TOTAL */}
// //                           <td className="px-4 py-2.5 text-right">
// //                             <div
// //                               className={`inline-flex min-w-24 justify-end rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
// //                                 checked
// //                                   ? "bg-emerald-50 text-emerald-700"
// //                                   : "bg-transparent text-slate-300"
// //                               }`}
// //                             >
// //                               ₹{checked ? lineTotal : 0}
// //                             </div>
// //                           </td>

// //                           {/* ACTION */}
// //                           <td className="px-4 py-2.5 text-center">
// //                             {checked && (
// //                               <button
// //                                 onClick={() => toggleSubItem(index, sub)}
// //                                 className="text-[11px] font-medium text-rose-400 hover:text-rose-600 transition"
// //                               >
// //                                 Remove
// //                               </button>
// //                             )}
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   {/* ── GROUP TOTAL ROW ── */}
// //                   {formItems[index]?.selectedSubItems?.length > 0 && (
// //                     <tr className="bg-indigo-50/40 border-b border-slate-200">
// //                       <td colSpan={6}></td>

// //                       <td className="px-4 py-2.5 text-right text-xs font-semibold text-slate-600">
// //                         Total
// //                       </td>

// //                       <td className="px-4 py-2.5 text-right">
// //                         <div className="inline-flex min-w-28 justify-end rounded-lg bg-indigo-100 px-3 py-1.5 text-sm font-semibold text-indigo-700">
// //                           {formatINR(
// //                             (() => {
// //                               const parentTotal =
// //                                 Number(row.qty || 1) *
// //                                 Number(row.price || 0) *
// //                                 (1 - Number(row.discount || 0) / 100);

// //                               const subTotal = formItems[
// //                                 index
// //                               ].selectedSubItems.reduce((sum, sub) => {
// //                                 const qty = Number(sub.qty || 1);
// //                                 const price = Number(sub.price || 0);
// //                                 const discount = Number(sub.discount || 0);

// //                                 return sum + qty * price * (1 - discount / 100);
// //                               }, 0);

// //                               return parentTotal + subTotal;
// //                             })(),
// //                           )}
// //                         </div>
// //                       </td>

// //                       <td></td>
// //                     </tr>
// //                   )}
// //                 </>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* ── FOOTER ── */}
// //       <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6">
// //         <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
// //           <Metric
// //             label="Taxable Value"
// //             value={formatINR(totals?.taxable || 0)}
// //           />
// //           <Metric
// //             label="GST Total"
// //             value={formatINR((totals?.cgst || 0) + (totals?.sgst || 0))}
// //           />
// //           <Metric
// //             label="Grand Total"
// //             value={formatINR(totals?.grandTotal || 0)}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // src/features/quotations/QuotationItemsTable.jsx

// // import {
// //   Plus,
// //   Trash2,
// //   PackageSearch,
// //   Sparkles,
// //   ChevronDown,
// // } from "lucide-react";
// // import { formatINR } from "./quotationUtils";

// // function Metric({ label, value }) {
// //   return (
// //     <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
// //       <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
// //         {label}
// //       </div>
// //       <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
// //     </div>
// //   );
// // }

// // function CellLabel({ children }) {
// //   return (
// //     <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:hidden">
// //       {children}
// //     </div>
// //   );
// // }

// // function RowBadge({ children, tone = "slate" }) {
// //   const classes = {
// //     slate: "bg-slate-100 text-slate-700",
// //     indigo: "bg-indigo-100 text-indigo-700",
// //     emerald: "bg-emerald-100 text-emerald-700",
// //     rose: "bg-rose-100 text-rose-700",
// //   };

// //   return (
// //     <span
// //       className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${classes[tone] || classes.slate}`}
// //     >
// //       {children}
// //     </span>
// //   );
// // }

// // export default function QuotationItemsTable({
// //   totals,
// //   itemsList,
// //   updateItem,
// //   addItem,
// //   removeItem,
// //   formItems,
// //   toggleSubItem,
// //   updateSubItem,
// //   autoSave,
// // }) {
// //   const rowCount = totals?.rows?.length || 0;
// //   const filledCount =
// //     totals?.rows?.filter(
// //       (row) => row.itemId || row.description || row.qty || row.price,
// //     )?.length || 0;

// //   return (
// //     <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.05)]">
// //       {/* HEADER */}
// //       <div className="border-b border-slate-100 bg-[linear-gradient(135deg,rgba(248,250,252,0.95),rgba(255,255,255,0.95),rgba(238,242,255,0.75))] px-5 py-5 sm:px-6">
// //         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
// //           <div>
// //             <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
// //               <Sparkles className="h-3 w-3 text-indigo-400" />
// //               Line Items
// //             </div>
// //             <h2 className="mt-1.5 text-base font-semibold tracking-tight text-slate-900">
// //               Item breakdown
// //             </h2>
// //             <p className="mt-0.5 text-xs leading-5 text-slate-400">
// //               Select products from master data and fine-tune quantity, pricing,
// //               and discount per row.
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
// //             <Metric label="Rows" value={`${rowCount} total`} />
// //             <Metric label="Filled" value={`${filledCount} active`} />
// //             <Metric label="Subtotal" value={formatINR(totals?.subtotal || 0)} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* TOOLBAR */}
// //       <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50/80 px-5 py-4 sm:px-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
// //         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
// //           <div className="flex items-center gap-2">
// //             <RowBadge tone="indigo">{totals?.rows?.length || 0} rows</RowBadge>
// //             <RowBadge tone="emerald">
// //               {formItems?.filter((item) => item.selectedSubItems?.length > 0)
// //                 ?.length || 0}{" "}
// //               grouped
// //             </RowBadge>
// //           </div>

// //           <button
// //             onClick={addItem}
// //             className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_22px_rgba(79,70,229,0.18)] transition hover:bg-indigo-700"
// //           >
// //             <Plus className="h-3.5 w-3.5" />
// //             Add Item Row
// //           </button>
// //         </div>
// //       </div>

// //       {/* TABLE */}
// //       <div className="overflow-auto max-h-[420px] sm:max-h-[480px] lg:max-h-[560px] rounded-b-[28px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
// //         <table
// //           className="min-w-[1750px] w-full border-separate text-sm"
// //           style={{ borderSpacing: "0 4px" }}
// //         >
// //           <thead className="sticky top-0 z-10 bg-gradient-to-r from-slate-50 via-slate-50/95 to-indigo-50/80 backdrop-blur-md shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
// //             <tr>
// //               {[
// //                 "Item",
// //                 "SKU",
// //                 "Category",
// //                 "Description",
// //                 "Qty",
// //                 "Price",
// //                 "Discount",
// //                 "Line Total",
// //                 "Remarks",
// //                 "",
// //               ].map((h, index) => (
// //                 <th
// //                   key={h}
// //                   className={`border-b-2 border-indigo-100 px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 whitespace-nowrap first:pl-6 last:pr-6 ${
// //                     index === 7 ? "text-right" : ""
// //                   }`}
// //                 >
// //                   {h}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {totals.rows.map((row, index) => {
// //               const selectedItem = itemsList.find((i) => i.id === row.itemId);

// //               return (
// //                 <FragmentWrapper key={`row-${index}`}>
// //                   {/* MAIN ROW */}
// //                   <tr
// //                     className={`group transition-all duration-200 hover:shadow-[0_2px_12px_rgba(15,23,42,0.06)] ${
// //                       Number(row.discount || 0) > 0
// //                         ? "bg-gradient-to-r from-amber-50/40 to-amber-50/20 hover:from-amber-50/60 hover:to-amber-50/30"
// //                         : "bg-white hover:bg-slate-50/50"
// //                     }`}
// //                   >
// //                     {/* ITEM */}
// //                     <td className="px-6 py-4 align-top w-[340px]">
// //                       <CellLabel>Item</CellLabel>
// //                       <div className="relative pr-3">
// //                         <select
// //                           value={row.itemId}
// //                           onChange={(e) => {
// //                             const selectedId = e.target.value;
// //                             const selectedItem = itemsList.find(
// //                               (i) => i.id === selectedId,
// //                             );

// //                             updateItem(index, "itemId", selectedId);
// //                             updateItem(
// //                               index,
// //                               "discount",
// //                               selectedItem?.discount || 0,
// //                             );
// //                             updateItem(
// //                               index,
// //                               "description",
// //                               selectedItem?.description || "",
// //                             );

// //                             if (selectedItem?.children?.length) {
// //                               updateItem(
// //                                 index,
// //                                 "subItems",
// //                                 selectedItem.children,
// //                               );
// //                               updateItem(
// //                                 index,
// //                                 "selectedSubItems",
// //                                 selectedItem.children.map((child) => ({
// //                                   id: child.id,
// //                                   itemId: child.id,
// //                                   name: child.name,
// //                                   qty: child.baseQty || 1,
// //                                   price: child.basePrice || 0,
// //                                   discount: child.discount || 0,
// //                                   description: child.description || "",
// //                                   remarks: "",
// //                                 })),
// //                               );
// //                             } else {
// //                               updateItem(index, "subItems", []);
// //                               updateItem(index, "selectedSubItems", []);
// //                             }
// //                           }}
// //                           className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 pr-10 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15 focus:shadow-md"
// //                         >
// //                           <option value="">Select item</option>
// //                           {itemsList.map((i) => (
// //                             <option key={i.id} value={i.id}>
// //                               {i.name}
// //                               {i.sku ? ` • ${i.sku}` : ""}
// //                             </option>
// //                           ))}
// //                         </select>
// //                         <PackageSearch className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
// //                       </div>

// //                       {selectedItem && (
// //                         <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
// //                           {selectedItem.sku && (
// //                             <RowBadge>{selectedItem.sku}</RowBadge>
// //                           )}
// //                           {selectedItem.category && (
// //                             <RowBadge tone="indigo">
// //                               {selectedItem.category}
// //                             </RowBadge>
// //                           )}
// //                         </div>
// //                       )}
// //                     </td>

// //                     {/* SKU */}
// //                     <td className="px-6 py-4 align-top w-[170px]">
// //                       <CellLabel>SKU</CellLabel>
// //                       <div className="pl-2 border-l border-slate-100 text-sm text-slate-500">
// //                         {selectedItem?.sku || (
// //                           <span className="text-slate-300">—</span>
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* CATEGORY */}
// //                     <td className="px-6 py-4 align-top w-[180px]">
// //                       <CellLabel>Category</CellLabel>
// //                       <div className="pl-2 text-sm text-slate-500">
// //                         {selectedItem?.category || (
// //                           <span className="text-slate-300">—</span>
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* DESCRIPTION */}
// //                     <td className="px-6 py-4 align-top w-[480px]">
// //                       <CellLabel>Description</CellLabel>
// //                       <textarea
// //                         value={row.description ?? ""}
// //                         rows={3}
// //                         onChange={(e) =>
// //                           updateItem(index, "description", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className="w-full resize-none rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm outline-none transition-all duration-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15 focus:shadow-md"
// //                         placeholder="Add description"
// //                       />
// //                     </td>

// //                     {/* QTY */}
// //                     <td className="px-6 py-4 align-top w-[110px]">
// //                       <CellLabel>Qty</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="1"
// //                         value={Number.isFinite(row.qty) ? row.qty : ""}
// //                         onChange={(e) =>
// //                           updateItem(index, "qty", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className="w-24 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                       />
// //                     </td>

// //                     {/* PRICE */}
// //                     <td className="px-6 py-4 align-top w-[150px]">
// //                       <CellLabel>Price</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="0"
// //                         value={Number.isFinite(row.price) ? row.price : ""}
// //                         onChange={(e) =>
// //                           updateItem(index, "price", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className="w-28 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                       />
// //                     </td>

// //                     {/* DISCOUNT */}
// //                     <td className="px-6 py-4 align-top w-[140px]">
// //                       <CellLabel>Discount</CellLabel>
// //                       <div className="relative w-28">
// //                         <input
// //                           type="number"
// //                           min="0"
// //                           max="100"
// //                           value={Number.isFinite(row.discount) ? row.discount : ""}
// //                           onChange={(e) =>
// //                             updateItem(index, "discount", e.target.value)
// //                           }
// //                           onBlur={() => autoSave(formItems)}
// //                           className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 pr-8 text-right text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
// //                         />
// //                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
// //                           %
// //                         </span>
// //                       </div>
// //                     </td>

// //                     {/* LINE TOTAL */}
// //                     <td className="px-6 py-4 align-top w-[180px]">
// //                       <CellLabel>Line Total</CellLabel>
// //                       <div className="inline-flex min-w-32 items-center justify-end rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 px-4 py-3.5 text-sm font-bold text-emerald-700 shadow-sm ring-1 ring-emerald-200/50">
// //                         {formatINR(
// //                           Number(row.qty || 1) *
// //                             Number(row.price || 0) *
// //                             (1 - Number(row.discount || 0) / 100),
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* NOTES */}
// //                     <td className="px-6 py-4 align-top w-[260px]">
// //                       <CellLabel>Remarks</CellLabel>

// //                       <textarea
// //                         rows={3}
// //                         value={row.remarks ?? ""}
// //                         onChange={(e) =>
// //                           updateItem(index, "remarks", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5"
// //                         placeholder="Add notes"
// //                       />

// //                       {Number(row.discount || 0) > 0 &&
// //                         !row.remarks?.trim() && (
// //                           <span className="text-[10px] text-rose-500">
// //                             Required
// //                           </span>
// //                         )}
// //                     </td>

// //                     {/* ACTION */}
// //                     <td className="px-6 py-4 align-top w-[80px]">
// //                       <button
// //                         onClick={() => removeItem(index)}
// //                         className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-200/60 bg-gradient-to-br from-rose-50 to-rose-100/50 text-rose-600 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 hover:from-rose-100 hover:to-rose-200/50 hover:text-rose-700 active:scale-95"
// //                         aria-label="Remove row"
// //                       >
// //                         <Trash2 className="h-4 w-4" />
// //                       </button>
// //                     </td>
// //                   </tr>

// //                   {/* SUB-ITEM ROWS */}
// //                   {formItems[index]?.subItems?.length > 0 &&
// //                     formItems[index].subItems.map((sub) => {
// //                       const selected = formItems[index].selectedSubItems.find(
// //                         (s) => s.id === (sub.id || sub.itemId),
// //                       );

// //                       const checked = !!selected;
// //                       const qty = selected?.qty || 1;
// //                       const price = selected?.price ?? sub.basePrice ?? 0;
// //                       const discount = selected?.discount || 0;
// //                       const lineTotal = qty * price * (1 - discount / 100);

// //                       return (
// //                         <tr
// //                           key={sub.id}
// //                           className={`transition-all duration-200 ${
// //                             checked
// //                               ? "bg-gradient-to-r from-indigo-50/50 to-indigo-50/30 hover:from-indigo-50/70 hover:to-indigo-50/40 shadow-[inset_0_1px_0_rgba(99,102,241,0.1)]"
// //                               : "bg-slate-50/40 hover:bg-slate-50/70"
// //                           }`}
// //                         >
// //                           {/* ITEM + CHECKBOX */}
// //                           <td className="px-6 py-3 align-top w-[340px]">
// //                             <div className="flex items-center gap-3 pl-6">
// //                               <div
// //                                 className={`h-4 w-1 rounded-full ${
// //                                   checked ? "bg-indigo-300" : "bg-slate-200"
// //                                 }`}
// //                               />
// //                               <input
// //                                 type="checkbox"
// //                                 checked={formItems[index].selectedSubItems.some(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )}
// //                                 onChange={() => toggleSubItem(index, sub)}
// //                                 className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
// //                               />
// //                               <div className="flex min-w-0 flex-col">
// //                                 <span
// //                                   className={`text-xs font-medium leading-5 whitespace-normal break-words ${
// //                                     checked
// //                                       ? "text-slate-800"
// //                                       : "text-slate-500"
// //                                   }`}
// //                                 >
// //                                   {sub.name}
// //                                 </span>
// //                                 <span className="text-[10px] text-slate-400">
// //                                   {sub.uom || "Sub item"}
// //                                 </span>
// //                               </div>
// //                             </div>
// //                           </td>
// //                           {/* SKU */}
// //                           <td className="px-6 py-3 align-top w-[170px]">
// //                             <span className="pl-2 border-l border-slate-100 text-xs text-slate-400">
// //                               {sub.sku || "—"}
// //                             </span>
// //                           </td>
// //                           {/* CATEGORY */}
// //                           <td className="px-6 py-3 align-top w-[180px]">
// //                             <span className="pl-2 text-xs text-slate-400">
// //                               {sub.category || "—"}
// //                             </span>
// //                           </td>
// //                           {/* DESCRIPTION */}
// //                           <td className="px-6 py-3 align-top w-[480px]">
// //                             <textarea
// //                               rows={4} // Increased from 2 to 3 for more space
// //                               value={
// //                                 formItems[index].selectedSubItems.find(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )?.description ??
// //                                 sub.description ??
// //                                 ""
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "description",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full resize-none rounded-xl border px-3 py-2 text-xs leading-5 transition-all duration-200 ${
// //                                 // Updated class for premium look
// //                                 checked
// //                                   ? "border-slate-200/80 bg-white text-slate-800 shadow-sm outline-none hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/15 focus:shadow-md"
// //                                   : "cursor-not-allowed border-transparent bg-transparent text-slate-400"
// //                               }`}
// //                               placeholder="Description"
// //                             />
// //                           </td>
// //                           {/* QTY */}
// //                           <td className="px-6 py-3 align-top w-[110px]">
// //                             <input
// //                               type="number"
// //                               min="1"
// //                               value={
// //                                 checked
// //                                   ? qty === 0
// //                                     ? ""
// //                                     : qty
// //                                   : sub.baseQty || 1
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "qty",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-20 rounded-xl border px-2.5 py-1.5 text-right text-xs transition ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
// //                                   : "cursor-not-allowed border-transparent bg-transparent text-slate-400"
// //                               }`}
// //                             />
// //                           </td>
// //                           {/* PRICE */}
// //                           <td className="px-6 py-3 align-top w-[150px]">
// //                             <input
// //                               type="number"
// //                               min="0"
// //                               value={
// //                                 checked
// //                                   ? price === 0
// //                                     ? ""
// //                                     : price
// //                                   : sub.basePrice || 0
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "price",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-24 rounded-xl border px-2.5 py-1.5 text-right text-xs transition ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
// //                                   : "cursor-not-allowed border-transparent bg-transparent text-slate-400"
// //                               }`}
// //                             />
// //                           </td>
// //                           {/* DISCOUNT */}
// //                           <td className="px-6 py-3 align-top w-[140px]">
// //                             <div className="relative w-24">
// //                               <input
// //                                 type="number"
// //                                 min="0"
// //                                 max="100"
// //                                 value={
// //                                   checked ? (Number.isFinite(discount) ? discount : "") : 0
// //                                 }
// //                                 disabled={!checked}
// //                                 onChange={(e) =>
// //                                   updateSubItem(
// //                                     index,
// //                                     sub.id,
// //                                     "discount",
// //                                     e.target.value,
// //                                   )
// //                                 }
// //                                 onBlur={() => autoSave(formItems)}
// //                                 className={`w-full rounded-xl border px-2.5 py-1.5 pr-6 text-right text-xs transition ${
// //                                   checked
// //                                     ? "border-slate-200 bg-white text-slate-800 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
// //                                     : "cursor-not-allowed border-transparent bg-transparent text-slate-400"
// //                                 }`}
// //                               />
// //                               <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
// //                                 %
// //                               </span>
// //                             </div>
// //                           </td>
// //                           {/* TOTAL */}
// //                           <td className="px-6 py-3 align-top w-[180px] text-right">
// //                             <div
// //                               className={`inline-flex min-w-24 justify-end rounded-xl px-2.5 py-1.5 text-xs font-semibold ${
// //                                 checked
// //                                   ? "bg-emerald-50 text-emerald-700"
// //                                   : "bg-transparent text-slate-300"
// //                               }`}
// //                             >
// //                               {checked ? formatINR(lineTotal) : formatINR(0)}
// //                             </div>
// //                           </td>
// //                           {/* NOTES (SUB ITEM) */}
// //                           <td className="px-6 py-3 align-top w-[260px]">
// //                             <textarea
// //                               rows={3}
// //                               value={
// //                                 formItems[index].selectedSubItems.find(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )?.remarks ?? ""
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "remarks",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full resize-none rounded-xl border px-2.5 py-1.5 text-xs transition ${
// //                                 checked
// //                                   ? "border-slate-200 bg-white text-slate-800 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10"
// //                                   : "cursor-not-allowed border-transparent bg-transparent text-slate-400"
// //                               }`}
// //                               placeholder="Notes"
// //                             />
// //                           </td>
// //                           {/* ACTION */}
// //                           <td className="px-6 py-3 align-top w-[80px] text-center">
// //                             {checked && (
// //                               <button
// //                                 onClick={() => toggleSubItem(index, sub)}
// //                                 className="text-[11px] font-medium text-rose-500 transition hover:text-rose-700"
// //                               >
// //                                 Remove
// //                               </button>
// //                             )}
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}

// //                   {/* GROUP TOTAL ROW */}
// //                   {formItems[index]?.selectedSubItems?.length > 0 && (
// //                     <tr className="bg-gradient-to-r from-indigo-50/60 via-indigo-50/40 to-indigo-50/30 shadow-[inset_0_1px_0_rgba(99,102,241,0.2)]">
// //                       <td colSpan={6} />
// //                       <td className="px-6 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-700">
// //                         Group Total
// //                       </td>
// //                       <td className="px-6 py-3.5 text-right">
// //                         <div className="inline-flex min-w-32 justify-end rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200/60 px-4 py-2.5 text-sm font-bold text-indigo-800 shadow-sm ring-1 ring-indigo-300/50">
// //                           {formatINR(
// //                             (() => {
// //                               const parentTotal =
// //                                 Number(row.qty || 1) *
// //                                 Number(row.price || 0) *
// //                                 (1 - Number(row.discount || 0) / 100);

// //                               const subTotal = formItems[
// //                                 index
// //                               ].selectedSubItems.reduce((sum, sub) => {
// //                                 const qty = Number(sub.qty || 1);
// //                                 const price = Number(sub.price || 0);
// //                                 const discount = Number(sub.discount || 0);

// //                                 return sum + qty * price * (1 - discount / 100);
// //                               }, 0);

// //                               return parentTotal + subTotal;
// //                             })(),
// //                           )}
// //                         </div>
// //                       </td>
// //                       <td />
// //                     </tr>
// //                   )}
// //                 </FragmentWrapper>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* FOOTER */}
// //       <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
// //         <div className="grid grid-cols-1 gap-3 sm:grid-cols-3"></div>
// //       </div>
// //     </div>
// //   );
// // }

// // function FragmentWrapper({ children, ...props }) {
// //   return <>{children}</>;
// // }

// // // src/features/quotations/QuotationItemsTable.jsx

// // import { Plus, Trash2, PackageSearch, Sparkles } from "lucide-react";
// // import { formatINR } from "./quotationUtils";
// // import API from "../../api/axios";

// // function Metric({ label, value, accent }) {
// //   const accents = {
// //     default: "from-slate-50 to-white border-slate-200/60 shadow-slate-100/80",
// //     indigo:
// //       "from-indigo-50/90 to-white border-indigo-200/50 shadow-indigo-100/60",
// //     emerald:
// //       "from-emerald-50/90 to-white border-emerald-200/50 shadow-emerald-100/60",
// //   };
// //   const valueColors = {
// //     default: "text-slate-800",
// //     indigo: "text-indigo-700",
// //     emerald: "text-emerald-700",
// //   };
// //   return (
// //     <div
// //       className={`flex flex-col gap-1 rounded-2xl border bg-gradient-to-br ${accents[accent] || accents.default} px-5 py-3.5 shadow-md backdrop-blur-sm`}
// //     >
// //       <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-400">
// //         {label}
// //       </div>
// //       <div
// //         className={`text-sm font-bold tabular-nums ${valueColors[accent] || valueColors.default}`}
// //       >
// //         {value}
// //       </div>
// //     </div>
// //   );
// // }

// // function CellLabel({ children }) {
// //   return (
// //     <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:hidden">
// //       {children}
// //     </div>
// //   );
// // }

// // function RowBadge({ children, tone = "slate" }) {
// //   const classes = {
// //     slate: "bg-slate-100 text-slate-500 ring-1 ring-slate-200/80",
// //     indigo: "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/70",
// //     emerald: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/70",
// //     rose: "bg-rose-50 text-rose-500 ring-1 ring-rose-200/70",
// //   };
// //   return (
// //     <span
// //       className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${classes[tone] || classes.slate}`}
// //     >
// //       {children}
// //     </span>
// //   );
// // }

// // const inputBase =
// //   "w-full rounded-xl border border-slate-200/70 bg-white/60 text-sm text-slate-800 shadow-[0_1px_4px_rgba(15,23,42,0.05)] outline-none backdrop-blur-sm transition-all duration-200 placeholder:text-slate-300 hover:border-indigo-200 hover:bg-white/90 hover:shadow-[0_2px_10px_rgba(99,102,241,0.1)] focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1),0_4px_12px_rgba(99,102,241,0.12)]";

// // const subInputEnabled =
// //   "border-slate-200/70 bg-white/60 text-slate-700 shadow-[0_1px_4px_rgba(15,23,42,0.05)] backdrop-blur-sm outline-none hover:border-indigo-200 hover:bg-white/90 hover:shadow-[0_2px_10px_rgba(99,102,241,0.1)] focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

// // const disabledInput =
// //   "cursor-not-allowed border-transparent bg-transparent text-slate-300 shadow-none";

// // export default function QuotationItemsTable({
// //   totals,
// //   itemsList,
// //   updateItem,
// //   addItem,
// //   removeItem,
// //   formItems,
// //   toggleSubItem,
// //   updateSubItem,
// //   autoSave,
// //   onSkuSearch,
// // }) {
// //   const rowCount = totals?.rows?.length || 0;
// //   const filledCount =
// //     totals?.rows?.filter(
// //       (row) => row.itemId || row.description || row.qty || row.price,
// //     )?.length || 0;

// //   // const handleSkuSearch = async (sku, rowIndex) => {
// //   //   if (!sku) return;

// //   //   try {
// //   //     const res = await API.get(`/items/by-sku/${sku}`);

// //   //     const { parent, children } = res.data;

// //   //     // ✅ update parent row
// //   //     updateItem(rowIndex, "itemId", parent.id);
// //   //     updateItem(rowIndex, "description", parent.description || "");
// //   //     updateItem(rowIndex, "price", parent.basePrice || 0);

// //   //     // ✅ inject subItems (children)
// //   //     if (children?.length) {
// //   //       updateItem(rowIndex, "subItems", children);
// //   //     }
// //   //   } catch (err) {
// //   //     console.error("SKU search failed", err);
// //   //   }
// //   // };

// //   return (
// //     <div className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-gradient-to-b from-white via-slate-50/20 to-white shadow-[0_32px_80px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.04)]">
// //       {/* ── HEADER ── */}
// //       <div className="relative overflow-hidden border-b border-slate-100/80 px-8 py-6">
// //         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_75%_-10%,rgba(199,210,254,0.35),transparent_70%),radial-gradient(ellipse_50%_50%_at_5%_110%,rgba(224,231,255,0.25),transparent)]" />
// //         <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-50/20 to-transparent" />

// //         <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
// //           <div>
// //             <div className="flex items-center gap-2">
// //               <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 ring-1 ring-indigo-200/60">
// //                 <Sparkles className="h-3 w-3 text-indigo-500" />
// //               </div>
// //               <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-indigo-400">
// //                 Line Items
// //               </span>
// //             </div>
// //             <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
// //               Item Breakdown
// //             </h2>
// //             <p className="mt-0.5 text-[12px] leading-5 text-slate-400">
// //               Select products from master data and fine-tune quantity, pricing,
// //               and discount per row.
// //             </p>
// //           </div>
// //           <div className="flex flex-wrap gap-3 sm:flex-nowrap">
// //             <Metric label="Rows" value={`${rowCount} total`} accent="default" />
// //             <Metric
// //               label="Filled"
// //               value={`${filledCount} active`}
// //               accent="indigo"
// //             />
// //             <Metric
// //               label="Subtotal"
// //               value={formatINR(totals?.subtotal || 0)}
// //               accent="emerald"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── TOOLBAR ── */}
// //       <div className="flex flex-col gap-3 border-b border-slate-100/80 bg-gradient-to-r from-slate-50/80 via-white/60 to-slate-50/40 px-8 py-3.5 sm:flex-row sm:items-center sm:justify-between">
// //         {/* LEFT SIDE (UNCHANGED) */}
// //         <div className="flex items-center gap-2">
// //           <RowBadge tone="indigo">{totals?.rows?.length || 0} rows</RowBadge>
// //           <RowBadge tone="emerald">
// //             {formItems?.filter((item) => item.selectedSubItems?.length > 0)
// //               ?.length || 0}{" "}
// //             grouped
// //           </RowBadge>
// //         </div>

// //         {/* RIGHT SIDE (NEW SKU + BUTTON) */}
// //         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
// //           {/* 🔥 SKU SEARCH INPUT */}
// //           <input
// //             type="text"
// //             placeholder="Enter SKU & press Enter"
// //             onKeyDown={async (e) => {
// //               if (e.key === "Enter") {
// //                 e.preventDefault();

// //                 const value = e.target.value.trim();
// //                 if (!value) return;

// //                 try {
// //                   const res = await API.get(`/items/by-sku/${value}`);

// //                   console.log("SKU RESPONSE:", res.data);

// //                   // ✅ FIX: parent is the response itself
// //                   const parent = res.data;
// //                   const children = res.data.children || [];

// //                   let rowIndex = totals?.rows?.length - 1;

// //                   if (!totals?.rows?.length) {
// //                     addItem();
// //                     rowIndex = 0;
// //                   }

// //                   // ✅ set parent
// //                   updateItem(rowIndex, "itemId", parent.id);

// //                   // ✅ inject children
// //                   if (children.length > 0) {
// //                     updateItem(rowIndex, "subItems", children);

// //                     updateItem(
// //                       rowIndex,
// //                       "selectedSubItems",
// //                       children.map((child) => ({
// //                         id: child.id,
// //                         itemId: child.id,
// //                         name: child.name,
// //                         qty: child.baseQty || 1,
// //                         price: child.basePrice || 0,
// //                         discount: child.discount || 0,
// //                         description: child.description || "",
// //                         remarks: "",
// //                       })),
// //                     );
// //                   } else {
// //                     updateItem(rowIndex, "subItems", []);
// //                     updateItem(rowIndex, "selectedSubItems", []);
// //                   }

// //                   // ✅ auto-fill parent fields
// //                   updateItem(rowIndex, "description", parent.description || "");
// //                   updateItem(rowIndex, "price", parent.basePrice || 0);
// //                   updateItem(rowIndex, "discount", parent.discount || 0);

// //                   e.target.value = "";
// //                 } catch (err) {
// //                   console.error("❌ SKU search failed:", err);
// //                 }
// //               }
// //             }}
// //             className="w-full sm:w-56 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
// //           />

// //           {/* EXISTING BUTTON (UNCHANGED DESIGN) */}
// //           <button
// //             onClick={addItem}
// //             className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 px-5 py-2.5 text-[12px] font-bold tracking-wide text-white shadow-[0_6px_18px_rgba(79,70,229,0.28),0_2px_6px_rgba(79,70,229,0.16)] transition-all duration-200 hover:from-indigo-600 hover:to-indigo-800 hover:shadow-[0_10px_28px_rgba(79,70,229,0.36)] active:scale-[0.97]"
// //           >
// //             <Plus className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90" />
// //             Add Item Row
// //           </button>
// //         </div>
// //       </div>

// //       {/* ── TABLE ── */}
// //       <div className="overflow-auto max-h-[440px] sm:max-h-[500px] lg:max-h-[600px] rounded-b-[32px] scrollbar-thin scrollbar-thumb-indigo-100 scrollbar-track-transparent">
// //         <table
// //           className="min-w-[1800px] w-full text-sm"
// //           style={{ borderCollapse: "separate", borderSpacing: "0" }}
// //         >
// //           <thead className="sticky top-0 z-10">
// //             <tr>
// //               {[
// //                 { label: "Item", cls: "pl-8 w-[300px]" },
// //                 { label: "SKU", cls: "w-[145px]" },
// //                 { label: "Category", cls: "w-[155px]" },
// //                 { label: "Description", cls: "w-[420px]" },
// //                 { label: "Qty", cls: "w-[105px] text-right" },
// //                 { label: "Price", cls: "w-[135px] text-right" },
// //                 { label: "Discount", cls: "w-[125px] text-right" },
// //                 { label: "Line Total", cls: "w-[175px] text-right" },
// //                 { label: "Remarks", cls: "w-[230px]" },
// //                 { label: "", cls: "w-[68px] pr-8" },
// //               ].map(({ label, cls }) => (
// //                 <th
// //                   key={label}
// //                   className={`border-b border-slate-100 bg-white/85 backdrop-blur-md px-4 py-4 text-left text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400 whitespace-nowrap ${cls}`}
// //                 >
// //                   {label}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {totals.rows.map((row, index) => {
// //               const selectedItem = itemsList.find((i) => i.id === row.itemId);
// //               const hasDiscount = Number(row.discount || 0) > 0;

// //               return (
// //                 <FragmentWrapper key={`row-${index}`}>
// //                   {/* ── MAIN ROW ── */}
// //                   <tr
// //                     className={`group border-b border-slate-100/60 transition-all duration-200 ${
// //                       hasDiscount
// //                         ? "bg-gradient-to-r from-amber-50/50 via-amber-50/20 to-transparent hover:from-amber-50/80 hover:via-amber-50/40"
// //                         : "bg-white hover:bg-gradient-to-r hover:from-indigo-50/20 hover:via-slate-50/30 hover:to-transparent"
// //                     }`}
// //                   >
// //                     {/* ITEM */}
// //                     <td className="px-4 pl-8 py-5 align-top">
// //                       <CellLabel>Item</CellLabel>
// //                       <div className="relative">
// //                         <select
// //                           value={row.itemId}
// //                           onChange={(e) => {
// //                             const selectedId = e.target.value;
// //                             const selectedItem = itemsList.find(
// //                               (i) => i.id === selectedId,
// //                             );
// //                             updateItem(index, "itemId", selectedId);
// //                             updateItem(
// //                               index,
// //                               "discount",
// //                               selectedItem?.discount || 0,
// //                             );
// //                             updateItem(
// //                               index,
// //                               "description",
// //                               selectedItem?.description || "",
// //                             );
// //                             if (selectedItem?.children?.length) {
// //                               updateItem(
// //                                 index,
// //                                 "subItems",
// //                                 selectedItem.children,
// //                               );
// //                               updateItem(
// //                                 index,
// //                                 "selectedSubItems",
// //                                 selectedItem.children.map((child) => ({
// //                                   id: child.id,
// //                                   itemId: child.id,
// //                                   name: child.name,
// //                                   qty: child.baseQty || 1,
// //                                   price: child.basePrice || 0,
// //                                   discount: child.discount || 0,
// //                                   description: child.description || "",
// //                                   remarks: "",
// //                                 })),
// //                               );
// //                             } else {
// //                               updateItem(index, "subItems", []);
// //                               updateItem(index, "selectedSubItems", []);
// //                             }
// //                           }}
// //                           className={`${inputBase} appearance-none py-3 pl-3.5 pr-9 font-medium`}
// //                         >
// //                           <option value="">Select item…</option>
// //                           {itemsList.map((i) => (
// //                             <option key={i.id} value={i.id}>
// //                               {i.name}
// //                               {i.sku ? ` • ${i.sku}` : ""}
// //                             </option>
// //                           ))}
// //                         </select>
// //                         <PackageSearch className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
// //                       </div>
// //                       {selectedItem && (
// //                         <div className="mt-2 flex flex-wrap items-center gap-1.5">
// //                           {selectedItem.sku && (
// //                             <RowBadge>{selectedItem.sku}</RowBadge>
// //                           )}
// //                           {selectedItem.category && (
// //                             <RowBadge tone="indigo">
// //                               {selectedItem.category}
// //                             </RowBadge>
// //                           )}
// //                         </div>
// //                       )}
// //                     </td>

// //                     {/* SKU */}
// //                     <td className="px-4 py-5 align-top">
// //                       <CellLabel>SKU</CellLabel>
// //                       <div className="flex h-[46px] items-center gap-3">
// //                         <div className="h-8 w-[2px] rounded-full bg-gradient-to-b from-indigo-200 to-slate-100" />
// //                         <span className="text-[12px] font-mono font-semibold text-slate-500">
// //                           {selectedItem?.sku || (
// //                             <span className="font-sans font-normal text-slate-300">
// //                               —
// //                             </span>
// //                           )}
// //                         </span>
// //                       </div>
// //                     </td>

// //                     {/* CATEGORY */}
// //                     <td className="px-4 py-5 align-top">
// //                       <CellLabel>Category</CellLabel>
// //                       <div className="flex h-[46px] items-center text-[12px] text-slate-500">
// //                         {selectedItem?.category || (
// //                           <span className="text-slate-300">—</span>
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* DESCRIPTION */}
// //                     <td className="px-4 py-5 align-top">
// //                       <CellLabel>Description</CellLabel>
// //                       <textarea
// //                         value={row.description ?? ""}
// //                         rows={3}
// //                         onChange={(e) =>
// //                           updateItem(index, "description", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className={`${inputBase} resize-none px-3.5 py-3 leading-6`}
// //                         placeholder="Add description…"
// //                       />
// //                     </td>

// //                     {/* QTY */}
// //                     <td className="px-4 py-5 align-top">
// //                       <CellLabel>Qty</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="1"
// //                         value={Number.isFinite(row.qty) ? row.qty : ""}
// //                         onChange={(e) =>
// //                           updateItem(index, "qty", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className={`${inputBase} px-3.5 py-3 text-right tabular-nums`}
// //                       />
// //                     </td>

// //                     {/* PRICE */}
// //                     <td className="px-4 py-5 align-top">
// //                       <CellLabel>Price</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="0"
// //                         value={Number.isFinite(row.price) ? row.price : ""}
// //                         onChange={(e) =>
// //                           updateItem(index, "price", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className={`${inputBase} px-3.5 py-3 text-right tabular-nums`}
// //                       />
// //                     </td>

// //                     {/* DISCOUNT */}
// //                     <td className="px-4 py-5 align-top">
// //                       <CellLabel>Discount</CellLabel>
// //                       <div className="relative">
// //                         <input
// //                           type="number"
// //                           min="0"
// //                           max="100"
// //                           value={
// //                             Number.isFinite(row.discount) ? row.discount : ""
// //                           }
// //                           onChange={(e) =>
// //                             updateItem(index, "discount", e.target.value)
// //                           }
// //                           onBlur={() => autoSave(formItems)}
// //                           className={`${inputBase} py-3 pl-3.5 pr-7 text-right tabular-nums`}
// //                         />
// //                         <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400">
// //                           %
// //                         </span>
// //                       </div>
// //                     </td>

// //                     {/* LINE TOTAL */}
// //                     <td className="px-4 py-5 align-top">
// //                       <CellLabel>Line Total</CellLabel>
// //                       <div className="flex h-[46px] items-center justify-end rounded-xl bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-50/40 px-4 text-sm font-bold tabular-nums text-emerald-700 ring-1 ring-emerald-200/70 shadow-[0_2px_8px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
// //                         {formatINR(
// //                           Number(row.qty || 1) *
// //                             Number(row.price || 0) *
// //                             (1 - Number(row.discount || 0) / 100),
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* REMARKS */}
// //                     <td className="px-4 py-5 align-top">
// //                       <CellLabel>Remarks</CellLabel>
// //                       <textarea
// //                         rows={3}
// //                         value={row.remarks ?? ""}
// //                         onChange={(e) =>
// //                           updateItem(index, "remarks", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className={`${inputBase} resize-none px-3.5 py-3 text-[12px] leading-5`}
// //                         placeholder="Add notes…"
// //                       />
// //                       {Number(row.discount || 0) > 0 &&
// //                         !row.remarks?.trim() && (
// //                           <span className="mt-1.5 flex items-center gap-1.5 text-[10px] font-bold text-rose-500">
// //                             <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
// //                             Required
// //                           </span>
// //                         )}
// //                     </td>

// //                     {/* ACTION */}
// //                     <td className="px-4 pr-8 py-5 align-top">
// //                       <button
// //                         onClick={() => removeItem(index)}
// //                         className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100/50 text-rose-400 shadow-sm transition-all duration-200 hover:border-rose-200 hover:from-rose-100 hover:to-rose-200/60 hover:text-rose-600 hover:shadow-[0_4px_12px_rgba(239,68,68,0.15)] active:scale-95"
// //                         aria-label="Remove row"
// //                       >
// //                         <Trash2 className="h-3.5 w-3.5" />
// //                       </button>
// //                     </td>
// //                   </tr>

// //                   {/* ── SUB-ITEM ROWS ── */}
// //                   {formItems[index]?.subItems?.length > 0 &&
// //                     formItems[index].subItems.map((sub) => {
// //                       const selected = formItems[index].selectedSubItems.find(
// //                         (s) => s.id === (sub.id || sub.itemId),
// //                       );
// //                       const checked = !!selected;
// //                       const qty = selected?.qty || 1;
// //                       const price = selected?.price ?? sub.basePrice ?? 0;
// //                       const discount = selected?.discount || 0;
// //                       const lineTotal = qty * price * (1 - discount / 100);

// //                       return (
// //                         <tr
// //                           key={sub.id}
// //                           className={`border-b border-slate-100/40 transition-all duration-200 ${
// //                             checked
// //                               ? "bg-gradient-to-r from-indigo-50/60 via-indigo-50/25 to-transparent hover:from-indigo-100/50 hover:via-indigo-50/35"
// //                               : "bg-slate-50/30 hover:bg-slate-50/60"
// //                           }`}
// //                         >
// //                           {/* ITEM + CHECKBOX */}
// //                           <td className="px-4 pl-8 py-4 align-top">
// //                             <div className="flex items-start gap-3 pl-4">
// //                               <div className="mt-1 flex flex-col items-center">
// //                                 <div
// //                                   className={`w-[2px] h-3 rounded-full ${checked ? "bg-indigo-300" : "bg-slate-200"}`}
// //                                 />
// //                                 <div
// //                                   className={`w-[2px] h-1.5 rounded-full mt-0.5 ${checked ? "bg-indigo-200" : "bg-slate-150"}`}
// //                                 />
// //                               </div>
// //                               <input
// //                                 type="checkbox"
// //                                 checked={formItems[index].selectedSubItems.some(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )}
// //                                 onChange={() => toggleSubItem(index, sub)}
// //                                 className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600 cursor-pointer focus:ring-indigo-500 focus:ring-offset-0"
// //                               />
// //                               <div className="flex min-w-0 flex-col">
// //                                 <span
// //                                   className={`text-[12px] font-semibold leading-5 ${checked ? "text-slate-800" : "text-slate-400"}`}
// //                                 >
// //                                   {sub.name}
// //                                 </span>
// //                                 <span
// //                                   className={`text-[10px] mt-0.5 ${checked ? "text-indigo-400" : "text-slate-350"}`}
// //                                 >
// //                                   {sub.uom || "Sub item"}
// //                                 </span>
// //                               </div>
// //                             </div>
// //                           </td>

// //                           {/* SKU */}
// //                           <td className="px-4 py-4 align-top">
// //                             <div className="flex items-center gap-2">
// //                               <div
// //                                 className={`h-5 w-[2px] rounded-full ${checked ? "bg-indigo-200" : "bg-slate-150"}`}
// //                               />
// //                               <span
// //                                 className={`text-[11px] font-mono ${checked ? "text-slate-400" : "text-slate-300"}`}
// //                               >
// //                                 {sub.sku || "—"}
// //                               </span>
// //                             </div>
// //                           </td>

// //                           {/* CATEGORY */}
// //                           <td className="px-4 py-4 align-top">
// //                             <span
// //                               className={`text-[11px] ${checked ? "text-slate-400" : "text-slate-300"}`}
// //                             >
// //                               {sub.category || "—"}
// //                             </span>
// //                           </td>

// //                           {/* DESCRIPTION */}
// //                           <td className="px-4 py-4 align-top">
// //                             <textarea
// //                               rows={3}
// //                               value={
// //                                 formItems[index].selectedSubItems.find(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )?.description ??
// //                                 sub.description ??
// //                                 ""
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "description",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full resize-none rounded-xl border px-3.5 py-2.5 text-[12px] leading-5 outline-none transition-all duration-200 ${
// //                                 checked ? subInputEnabled : disabledInput
// //                               }`}
// //                               placeholder="Description…"
// //                             />
// //                           </td>

// //                           {/* QTY */}
// //                           <td className="px-4 py-4 align-top">
// //                             <input
// //                               type="number"
// //                               min="1"
// //                               value={
// //                                 checked
// //                                   ? qty === 0
// //                                     ? ""
// //                                     : qty
// //                                   : sub.baseQty || 1
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "qty",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full rounded-xl border px-3 py-2.5 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
// //                                 checked ? subInputEnabled : disabledInput
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* PRICE */}
// //                           <td className="px-4 py-4 align-top">
// //                             <input
// //                               type="number"
// //                               min="0"
// //                               value={
// //                                 checked
// //                                   ? price === 0
// //                                     ? ""
// //                                     : price
// //                                   : sub.basePrice || 0
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "price",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full rounded-xl border px-3 py-2.5 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
// //                                 checked ? subInputEnabled : disabledInput
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* DISCOUNT */}
// //                           <td className="px-4 py-4 align-top">
// //                             <div className="relative">
// //                               <input
// //                                 type="number"
// //                                 min="0"
// //                                 max="100"
// //                                 value={
// //                                   checked
// //                                     ? Number.isFinite(discount)
// //                                       ? discount
// //                                       : ""
// //                                     : 0
// //                                 }
// //                                 disabled={!checked}
// //                                 onChange={(e) =>
// //                                   updateSubItem(
// //                                     index,
// //                                     sub.id,
// //                                     "discount",
// //                                     e.target.value,
// //                                   )
// //                                 }
// //                                 onBlur={() => autoSave(formItems)}
// //                                 className={`w-full rounded-xl border py-2.5 pl-3 pr-6 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
// //                                   checked ? subInputEnabled : disabledInput
// //                                 }`}
// //                               />
// //                               {checked && (
// //                                 <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400">
// //                                   %
// //                                 </span>
// //                               )}
// //                             </div>
// //                           </td>

// //                           {/* TOTAL */}
// //                           <td className="px-4 py-4 align-top">
// //                             <div
// //                               className={`flex h-[38px] items-center justify-end rounded-xl px-3 text-[12px] font-bold tabular-nums transition-all duration-200 ${
// //                                 checked
// //                                   ? "bg-gradient-to-br from-emerald-50 to-teal-50/50 text-emerald-700 ring-1 ring-emerald-200/60 shadow-[0_2px_6px_rgba(16,185,129,0.08)]"
// //                                   : "bg-transparent text-slate-200"
// //                               }`}
// //                             >
// //                               {checked ? formatINR(lineTotal) : formatINR(0)}
// //                             </div>
// //                           </td>

// //                           {/* REMARKS */}
// //                           <td className="px-4 py-4 align-top">
// //                             <textarea
// //                               rows={3}
// //                               value={
// //                                 formItems[index].selectedSubItems.find(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )?.remarks ?? ""
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "remarks",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full resize-none rounded-xl border px-3 py-2.5 text-[12px] outline-none transition-all duration-200 ${
// //                                 checked ? subInputEnabled : disabledInput
// //                               }`}
// //                               placeholder="Notes…"
// //                             />
// //                           </td>

// //                           {/* ACTION */}
// //                           <td className="px-4 pr-8 py-4 align-top text-center">
// //                             {checked && (
// //                               <button
// //                                 onClick={() => toggleSubItem(index, sub)}
// //                                 className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-rose-400 transition-all duration-150 hover:bg-rose-50 hover:text-rose-600 hover:shadow-sm"
// //                               >
// //                                 Remove
// //                               </button>
// //                             )}
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}

// //                   {/* ── GROUP TOTAL ROW ── */}
// //                   {formItems[index]?.selectedSubItems?.length > 0 && (
// //                     <tr className="border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/80 via-indigo-50/40 to-slate-50/20">
// //                       <td colSpan={6} />
// //                       <td className="px-4 py-4 text-right text-[9px] font-bold uppercase tracking-[0.24em] text-indigo-500">
// //                         Group Total
// //                       </td>
// //                       <td className="px-4 py-4">
// //                         <div className="flex items-center justify-end rounded-xl bg-gradient-to-br from-indigo-100/90 via-indigo-100/70 to-violet-100/50 px-4 py-2.5 text-sm font-bold tabular-nums text-indigo-800 ring-1 ring-indigo-200/70 shadow-[0_4px_12px_rgba(99,102,241,0.14),inset_0_1px_0_rgba(255,255,255,0.6)]">
// //                           {formatINR(
// //                             (() => {
// //                               const parentTotal =
// //                                 Number(row.qty || 1) *
// //                                 Number(row.price || 0) *
// //                                 (1 - Number(row.discount || 0) / 100);
// //                               const subTotal = formItems[
// //                                 index
// //                               ].selectedSubItems.reduce(
// //                                 (sum, sub) =>
// //                                   sum +
// //                                   Number(sub.qty || 1) *
// //                                     Number(sub.price || 0) *
// //                                     (1 - Number(sub.discount || 0) / 100),
// //                                 0,
// //                               );
// //                               return parentTotal + subTotal;
// //                             })(),
// //                           )}
// //                         </div>
// //                       </td>
// //                       <td colSpan={2} />
// //                     </tr>
// //                   )}
// //                 </FragmentWrapper>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* ── FOOTER ── */}
// //       <div className="border-t border-slate-100/80 bg-gradient-to-r from-slate-50/60 via-white/40 to-slate-50/30 px-8 py-4">
// //         <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" />
// //       </div>
// //     </div>
// //   );
// // }

// // function FragmentWrapper({ children }) {
// //   return <>{children}</>;
// // }

// // // src/features/quotations/QuotationItemsTable.jsx

// // import { Fragment, useState } from "react";
// // import { Plus, Trash2, PackageSearch, Sparkles } from "lucide-react";
// // import { formatINR } from "./quotationUtils";
// // import API from "../../api/axios";

// // function Metric({ label, value, accent }) {
// //   const accents = {
// //     default: "from-slate-50 to-white border-slate-200/60 shadow-slate-100/80",
// //     indigo:
// //       "from-indigo-50/90 to-white border-indigo-200/50 shadow-indigo-100/60",
// //     emerald:
// //       "from-emerald-50/90 to-white border-emerald-200/50 shadow-emerald-100/60",
// //   };

// //   const valueColors = {
// //     default: "text-slate-800",
// //     indigo: "text-indigo-700",
// //     emerald: "text-emerald-700",
// //   };

// //   return (
// //     <div
// //       className={`flex min-w-[118px] flex-col gap-0.5 rounded-2xl border bg-gradient-to-br ${accents[accent] || accents.default} px-4 py-3 shadow-sm backdrop-blur-sm`}
// //     >
// //       <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-400">
// //         {label}
// //       </div>
// //       <div
// //         className={`text-sm font-black tabular-nums ${valueColors[accent] || valueColors.default}`}
// //       >
// //         {typeof value === "string" ? value.replace(".00", "") : value}
// //       </div>
// //     </div>
// //   );
// // }

// // function CellLabel({ children }) {
// //   return (
// //     <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:hidden">
// //       {children}
// //     </div>
// //   );
// // }

// // function RowBadge({ children, tone = "slate" }) {
// //   const classes = {
// //     slate: "bg-slate-100 text-slate-500 ring-1 ring-slate-200/80",
// //     indigo: "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/70",
// //     emerald: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/70",
// //     rose: "bg-rose-50 text-rose-500 ring-1 ring-rose-200/70",
// //   };

// //   return (
// //     <span
// //       className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${classes[tone] || classes.slate}`}
// //     >
// //       {children}
// //     </span>
// //   );
// // }

// // const inputBase =
// //   "w-full rounded-xl border border-slate-200/70 bg-white text-[12px] text-slate-800 shadow-[0_1px_4px_rgba(15,23,42,0.05)] outline-none transition-all duration-200 placeholder:text-slate-300 hover:border-indigo-200 hover:bg-white hover:shadow-[0_2px_10px_rgba(99,102,241,0.08)] focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.08),0_4px_12px_rgba(99,102,241,0.10)]";

// // const subInputEnabled =
// //   "border-slate-200/70 bg-white text-slate-700 shadow-[0_1px_4px_rgba(15,23,42,0.05)] outline-none hover:border-indigo-200 hover:bg-white hover:shadow-[0_2px_10px_rgba(99,102,241,0.08)] focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

// // const disabledInput =
// //   "cursor-not-allowed border-transparent bg-transparent text-slate-300 shadow-none";

// // export default function QuotationItemsTable({
// //   totals,
// //   itemsList,
// //   updateItem,
// //   addItem,
// //   removeItem,
// //   formItems,
// //   toggleSubItem,
// //   updateSubItem,
// //   autoSave,
// //   onSkuSearch,
// //   resetItems,
// // }) {
// //   const rowCount = totals?.rows?.length || 0;
// //   const filledCount =
// //     totals?.rows?.filter(
// //       (row) => row.itemId || row.description || row.qty || row.price,
// //     )?.length || 0;

// //   const [skuQuery, setSkuQuery] = useState("");
// //   const [skuResults, setSkuResults] = useState([]);
// //   const [showSkuDropdown, setShowSkuDropdown] = useState(false);

// //   const formatAmount = (value) => {
// //     const amount = Number(value || 0);

// //     return formatINR(Math.round(amount)).replace(".00", "");
// //   };

// //   return (
// //     <div className="overflow-visible rounded-[28px] border border-slate-200/70 bg-gradient-to-b from-white via-slate-50/20 to-white shadow-[0_24px_70px_rgba(15,23,42,0.08),0_6px_18px_rgba(15,23,42,0.04)]">
// //       {/* HEADER */}
// //       <div className="relative overflow-hidden border-b border-slate-100/80 px-5 py-5 sm:px-6 lg:px-7">
// //         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_80%_-10%,rgba(199,210,254,0.35),transparent_70%),radial-gradient(ellipse_50%_50%_at_5%_110%,rgba(224,231,255,0.25),transparent)]" />
// //         <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
// //           <div className="min-w-0">
// //             <div className="flex items-center gap-2">
// //               <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 ring-1 ring-indigo-200/60">
// //                 <Sparkles className="h-3 w-3 text-indigo-500" />
// //               </div>
// //               <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-indigo-400">
// //                 Line Items
// //               </span>
// //             </div>

// //             <h2 className="mt-2 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
// //               Item Breakdown
// //             </h2>

// //             <p className="mt-0.5 max-w-2xl text-[12px] leading-5 text-slate-400">
// //               Select products from master data and fine-tune quantity, pricing,
// //               and discount per row.
// //             </p>
// //           </div>

// //           <div className="flex flex-wrap gap-2.5">
// //             <Metric label="Rows" value={`${rowCount} total`} accent="default" />
// //             <Metric
// //               label="Filled"
// //               value={`${filledCount} active`}
// //               accent="indigo"
// //             />
// //             <Metric
// //               label="Subtotal"
// //               value={formatAmount(totals?.subtotal || 0)}
// //               accent="emerald"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* TOOLBAR */}
// //       <div className="relative z-[400] flex flex-col gap-3 overflow-visible border-b border-slate-100/80 bg-gradient-to-r from-slate-50/70 via-white to-slate-50/40 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-7">
// //         <div className="flex items-center gap-2">
// //           <RowBadge tone="indigo">{totals?.rows?.length || 0} rows</RowBadge>
// //           <RowBadge tone="emerald">
// //             {formItems?.filter((item) => item.selectedSubItems?.length > 0)
// //               ?.length || 0}{" "}
// //             grouped
// //           </RowBadge>
// //         </div>

// //         <div className="relative z-[500] flex flex-1 justify-center overflow-visible">
// //           {/* SKU SEARCH SECTION */}
// //           <div className="relative z-[600] flex w-full max-w-[760px] items-center gap-3 overflow-visible rounded-3xl border border-slate-200/70 bg-white/95 p-2 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl">
// //             {/* SEARCH */}
// //             <div className="relative flex-1">
// //               <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 to-white px-4 py-3 shadow-inner">
// //                 {/* ICON */}
// //                 <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
// //                   <PackageSearch className="h-4.5 w-4.5 text-indigo-600" />
// //                 </div>

// //                 {/* INPUT */}
// //                 <div className="flex min-w-0 flex-1 flex-col">
// //                   <span className="text-[9px] font-black uppercase tracking-[0.24em] text-slate-400">
// //                     Global Item Search
// //                   </span>

// //                   <input
// //                     type="text"
// //                     value={skuQuery}
// //                     placeholder="Search SKU, item name, make, category..."
// //                     onChange={async (e) => {
// //                       const value = e.target.value;

// //                       setSkuQuery(value);

// //                       if (!value.trim()) {
// //                         setSkuResults([]);
// //                         setShowSkuDropdown(false);
// //                         return;
// //                       }

// //                       try {
// //                         const res = await API.get("/items/search", {
// //                           params: { q: value },
// //                         });

// //                         setSkuResults(res.data || []);
// //                         setShowSkuDropdown(true);
// //                       } catch (err) {
// //                         console.error("❌ SKU search failed:", err);
// //                       }
// //                     }}
// //                     className="mt-0.5 w-full border-0 bg-transparent p-0 text-[13px] font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
// //                   />
// //                 </div>
// //               </div>

// //               {/* DROPDOWN */}
// //               {showSkuDropdown && skuResults.length > 0 && (
// //                 <div
// //                   className="
// //     absolute
// //     left-0
// //     top-[calc(100%+14px)]
// //     z-[9999]
// //     w-full
// //     min-w-0
// //     overflow-hidden
// //     rounded-3xl
// //     border
// //     border-slate-200/80
// //     bg-white
// //     shadow-[0_25px_60px_rgba(15,23,42,0.18)]
// //     backdrop-blur-xl
// //   "
// //                   style={{
// //                     maxHeight: "70vh",
// //                   }}
// //                 >
// //                   {/* HEADER */}
// //                   <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
// //                     <div>
// //                       <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
// //                         Search Results
// //                       </div>

// //                       <div className="mt-1 text-[11px] text-slate-500">
// //                         Select item to auto-fill quotation row
// //                       </div>
// //                     </div>

// //                     <div className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold text-indigo-600 ring-1 ring-indigo-100">
// //                       {skuResults.length} items
// //                     </div>
// //                   </div>

// //                   {/* RESULTS */}
// //                   <div
// //                     className="
// //     overflow-y-auto
// //     overflow-x-hidden
// //     p-2
// //     scrollbar-thin
// //     scrollbar-thumb-slate-300
// //     scrollbar-track-transparent
// //   "
// //                     style={{
// //                       maxHeight: "calc(70vh - 72px)",
// //                     }}
// //                   >
// //                     {skuResults.map((item) => (
// //                       <button
// //                         key={item.id}
// //                         type="button"
// //                         onClick={() => {
// //                           const children = item.children || [];

// //                           const newRow = {
// //                             itemId: item.id,

// //                             sku: item.sku || "",
// //                             category: item.category || "",

// //                             description: item.description || "",

// //                             make: item.make || "",
// //                             mfgPartNo: item.mfgPartNo || "",
// //                             uom: item.uom || "",

// //                             remarks: "",

// //                             qty: 1,

// //                             price:
// //                               children.length > 0
// //                                 ? children.reduce(
// //                                     (sum, child) =>
// //                                       sum +
// //                                       Number(child.baseQty || 1) *
// //                                         Number(child.basePrice || 0),
// //                                     0,
// //                                   )
// //                                 : Number(item.basePrice || 0),

// //                             discount: Number(item.discount || 0),

// //                             subItems: children,

// //                             selectedSubItems: children.map((child) => ({
// //                               id: child.id,
// //                               itemId: child.id,

// //                               name: child.name,

// //                               sku: child.sku || "",
// //                               category: child.category || "",

// //                               make: child.make || "",
// //                               mfgPartNo: child.mfgPartNo || "",
// //                               uom: child.uom || "",

// //                               qty: Number(child.baseQty || 1),
// //                               price: Number(child.basePrice || 0),
// //                               discount: Number(child.discount || 0),

// //                               description: child.description || "",
// //                               remarks: "",
// //                             })),
// //                           };

// //                           const emptyRowIndex = formItems.findIndex(
// //                             (r) =>
// //                               !r.itemId &&
// //                               !r.description &&
// //                               (!r.qty || Number(r.qty) === 1) &&
// //                               (!r.price || Number(r.price) === 0),
// //                           );

// //                           if (emptyRowIndex !== -1) {
// //                             Object.entries(newRow).forEach(([key, value]) => {
// //                               updateItem(emptyRowIndex, key, value);
// //                             });
// //                           } else {
// //                             addItem(newRow);
// //                           }

// //                           setSkuQuery("");
// //                           setSkuResults([]);
// //                           setShowSkuDropdown(false);
// //                         }}
// //                         className="group flex w-full items-start gap-4 rounded-2xl border border-transparent px-4 py-3 text-left transition-all duration-200 hover:border-indigo-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-slate-50"
// //                       >
// //                         {/* LEFT SIDE */}
// //                         <div className="flex min-w-0 flex-1 flex-col">
// //                           <div className="flex flex-wrap items-center gap-2">
// //                             <span className="font-mono text-[12px] font-black tracking-wide text-indigo-700">
// //                               {item.sku || "NO-SKU"}
// //                             </span>

// //                             {item.children?.length > 0 && (
// //                               <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 ring-1 ring-emerald-100">
// //                                 Grouped
// //                               </span>
// //                             )}
// //                           </div>

// //                           <div className="mt-1 line-clamp-2 text-[12px] leading-5 text-slate-700 group-hover:text-slate-900">
// //                             {item.name}
// //                           </div>

// //                           {(item.make || item.mfgPartNo) && (
// //                             <div className="mt-2 flex flex-wrap items-center gap-2">
// //                               {item.make && (
// //                                 <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
// //                                   {item.make}
// //                                 </span>
// //                               )}

// //                               {item.mfgPartNo && (
// //                                 <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500">
// //                                   {item.mfgPartNo}
// //                                 </span>
// //                               )}
// //                             </div>
// //                           )}
// //                         </div>

// //                         {/* RIGHT SIDE */}
// //                         <div className="flex shrink-0 flex-col items-end gap-2">
// //                           <div className="max-w-[160px] truncate rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-slate-200">
// //                             {item.category || "Item"}
// //                           </div>

// //                           <div className="text-[11px] font-black text-emerald-600">
// //                             {formatAmount(
// //                               Math.round(Number(item.basePrice || 0)),
// //                             ).replace(".00", "")}
// //                           </div>
// //                         </div>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* RESET */}
// //             <button
// //               onClick={resetItems}
// //               className="group inline-flex h-[58px] shrink-0 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-5 text-[11px] font-black uppercase tracking-[0.14em] text-rose-600 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 hover:shadow-[0_8px_20px_rgba(244,63,94,0.15)]"
// //             >
// //               <Trash2 className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-12" />
// //               Reset
// //             </button>
// //           </div>

// //           {/* ADD ROW BUTTON */}
// //           {/* <button
// //             onClick={addItem}
// //             className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 px-5 text-[12px] font-bold tracking-wide text-white shadow-[0_6px_18px_rgba(79,70,229,0.28),0_2px_6px_rgba(79,70,229,0.16)] transition-all duration-200 hover:from-indigo-600 hover:to-indigo-800 hover:shadow-[0_10px_28px_rgba(79,70,229,0.36)] active:scale-[0.97]"
// //           >
// //             <Plus className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90" />
// //             Add Item Row
// //           </button> */}
// //         </div>
// //       </div>

// //       {/* TABLE */}
// //       <div
// //         className="
// //     relative
// //     z-[1]
// //     overflow-x-auto
// //     overflow-y-auto
// //     rounded-b-[28px]
// //     border-t
// //     border-slate-100/70
// //     bg-white
// //     max-h-[440px]
// //     sm:max-h-[520px]
// //     lg:max-h-[650px]

// //     scrollbar-thin
// //     scrollbar-thumb-slate-300
// //     scrollbar-track-slate-100
// //     hover:scrollbar-thumb-slate-400
// //   "
// //         style={{
// //           scrollbarWidth: "thin",
// //           scrollbarColor: "#94a3b8 #e2e8f0",
// //         }}
// //       >
// //         <table
// //           className="
// //     w-max
// //     min-w-full
// //     table-auto
// //     border-separate
// //     border-spacing-0
// //     text-sm
// //   "
// //           style={{
// //             borderCollapse: "separate",
// //             borderSpacing: "0",
// //             minWidth: "1700px",
// //           }}
// //         >
// //           <colgroup>
// //             <col style={{ width: "160px" }} />
// //             <col style={{ width: "160px" }} />
// //             <col style={{ width: "520px" }} />
// //             <col style={{ width: "110px" }} />
// //             <col style={{ width: "140px" }} />
// //             <col style={{ width: "120px" }} />
// //             <col style={{ width: "170px" }} />
// //             <col style={{ width: "260px" }} />
// //             <col style={{ width: "80px" }} />
// //           </colgroup>

// //           <thead className="sticky top-0 z-[20] bg-slate-50/95 backdrop-blur-xl">
// //             <tr>
// //               {[
// //                 { label: "Category" },
// //                 { label: "SKU" },
// //                 { label: "Description" },
// //                 { label: "Quantity", cls: "text-right" },
// //                 { label: "Price", cls: "text-right" },
// //                 { label: "Discount", cls: "text-right" },
// //                 { label: "Line Total", cls: "text-right" },
// //                 { label: "Remarks" },
// //                 { label: "Delete", cls: "text-center" },
// //               ].map(({ label, cls = "" }) => (
// //                 <th
// //                   key={label}
// //                   className={`border-b border-r border-slate-200/70 bg-slate-50/95 px-4 py-3 text-left text-[9px] font-black uppercase tracking-[0.22em] text-slate-500 backdrop-blur-md whitespace-nowrap ${cls} last:border-r-0`}
// //                 >
// //                   {label}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>

// //           <tbody className="[&_tr:last-child_td]:border-b-0">
// //             {totals.rows.map((row, index) => {
// //               const selectedItem = itemsList.find((i) => i.id === row.itemId);
// //               const hasDiscount = Number(row.discount || 0) > 0;

// //               return (
// //                 <FragmentWrapper key={`row-${index}`}>
// //                   {/* MAIN ROW */}
// //                   <tr
// //                     className={`group border-b border-slate-100/70 transition-all duration-200 ${
// //                       hasDiscount
// //                         ? "bg-gradient-to-r from-amber-50/50 via-amber-50/20 to-transparent hover:from-amber-50/80 hover:via-amber-50/35"
// //                         : "bg-white hover:bg-gradient-to-r hover:from-indigo-50/20 hover:via-slate-50/30 hover:to-transparent"
// //                     }`}
// //                   >
// //                     {/* CATEGORY */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 align-top">
// //                       <CellLabel>Category</CellLabel>
// //                       <div className="flex min-h-[40px] items-center text-[12px] text-slate-500">
// //                         {selectedItem?.category || (
// //                           <span className="text-slate-300">—</span>
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* SKU */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 align-top">
// //                       <CellLabel>SKU</CellLabel>
// //                       <div className="flex min-h-[40px] items-center gap-2">
// //                         <div className="h-7 w-[2px] rounded-full bg-gradient-to-b from-indigo-200 to-slate-100" />
// //                         <span className="font-mono text-[12px] font-semibold text-slate-500 whitespace-nowrap">
// //                           {selectedItem?.sku || (
// //                             <span className="font-sans font-normal text-slate-300">
// //                               —
// //                             </span>
// //                           )}
// //                         </span>
// //                       </div>
// //                     </td>

// //                     {/* CATEGORY */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 align-top">
// //                       <CellLabel>Category</CellLabel>
// //                       <div className="flex min-h-[40px] items-center text-[12px] text-slate-500">
// //                         {selectedItem?.category || (
// //                           <span className="text-slate-300">—</span>
// //                         )}
// //                       </div>
// //                     </td>

// //                     {/* DESCRIPTION */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 align-top">
// //                       <CellLabel>Description</CellLabel>
// //                       <textarea
// //                         value={row.description ?? ""}
// //                         rows={3}
// //                         onChange={(e) =>
// //                           updateItem(index, "description", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className={`${inputBase} min-h-[84px] resize-y px-3 py-2.5 leading-5`}
// //                         placeholder="Add description…"
// //                       />
// //                     </td>

// //                     {/* QTY */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 align-top">
// //                       <CellLabel>Qty</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="1"
// //                         value={Number.isFinite(row.qty) ? row.qty : ""}
// //                         onChange={(e) =>
// //                           updateItem(index, "qty", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className={`${inputBase} min-w-0 px-3 py-2.5 text-right tabular-nums`}
// //                       />
// //                     </td>

// //                     {/* PRICE */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 align-top">
// //                       <CellLabel>Price</CellLabel>
// //                       <input
// //                         type="number"
// //                         min="0"
// //                         value={Number.isFinite(row.price) ? row.price : ""}
// //                         onChange={(e) =>
// //                           updateItem(index, "price", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className={`${inputBase} min-w-0 px-3 py-2.5 text-right tabular-nums`}
// //                       />
// //                     </td>

// //                     {/* DISCOUNT */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 align-top">
// //                       <CellLabel>Discount</CellLabel>
// //                       <div className="relative">
// //                         <input
// //                           type="number"
// //                           min="0"
// //                           max="100"
// //                           value={
// //                             Number.isFinite(row.discount) ? row.discount : ""
// //                           }
// //                           onChange={(e) =>
// //                             updateItem(index, "discount", e.target.value)
// //                           }
// //                           onBlur={() => autoSave(formItems)}
// //                           className={`${inputBase} py-2.5 pl-3 pr-6 text-right tabular-nums`}
// //                         />
// //                         <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400">
// //                           %
// //                         </span>
// //                       </div>
// //                     </td>

// //                     {/* LINE TOTAL */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 align-top">
// //                       <CellLabel>Line Total</CellLabel>
// //                       <div className="flex min-h-[40px] items-center justify-end rounded-xl bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-50/40 px-3 text-[12px] font-bold tabular-nums text-emerald-700 ring-1 ring-emerald-200/70 shadow-[0_2px_8px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
// //                         {formatAmount(
// //                           Math.round(
// //                             Number(row.qty || 1) *
// //                               Number(row.price || 0) *
// //                               (1 - Number(row.discount || 0) / 100),
// //                           ),
// //                         ).replace(".00", "")}
// //                       </div>
// //                     </td>

// //                     {/* REMARKS */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 align-top">
// //                       <CellLabel>Remarks</CellLabel>
// //                       <textarea
// //                         rows={3}
// //                         value={row.remarks ?? ""}
// //                         onChange={(e) =>
// //                           updateItem(index, "remarks", e.target.value)
// //                         }
// //                         onBlur={() => autoSave(formItems)}
// //                         className={`${inputBase} min-h-[84px] resize-y px-3 py-2.5 text-[12px] leading-5`}
// //                         placeholder="Add notes…"
// //                       />
// //                       {Number(row.discount || 0) > 0 &&
// //                         !row.remarks?.trim() && (
// //                           <span className="mt-1.5 flex items-center gap-1.5 text-[10px] font-bold text-rose-500">
// //                             <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
// //                             Required
// //                           </span>
// //                         )}
// //                     </td>

// //                     {/* ACTION */}
// //                     <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-4 pr-6 align-top last:border-r-0">
// //                       <button
// //                         onClick={() => removeItem(index)}
// //                         className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100/50 text-rose-400 shadow-sm transition-all duration-200 hover:border-rose-200 hover:from-rose-100 hover:to-rose-200/60 hover:text-rose-600 hover:shadow-[0_4px_12px_rgba(239,68,68,0.15)] active:scale-95"
// //                         aria-label="Remove row"
// //                       >
// //                         <Trash2 className="h-3.5 w-3.5" />
// //                       </button>
// //                     </td>
// //                   </tr>

// //                   {/* SUB-ITEM ROWS */}
// //                   {formItems[index]?.subItems?.length > 0 &&
// //                     formItems[index].subItems.map((sub) => {
// //                       const selected = formItems[index].selectedSubItems.find(
// //                         (s) => s.id === (sub.id || sub.itemId),
// //                       );
// //                       const checked = !!selected;
// //                       const qty = selected?.qty || 1;
// //                       const price = selected?.price ?? sub.basePrice ?? 0;
// //                       const discount = selected?.discount || 0;
// //                       const lineTotal = qty * price * (1 - discount / 100);

// //                       return (
// //                         <tr
// //                           key={sub.id}
// //                           className={`border-b border-slate-100/60 transition-all duration-200 ${
// //                             checked
// //                               ? "bg-gradient-to-r from-indigo-50/60 via-indigo-50/25 to-transparent hover:from-indigo-100/50 hover:via-indigo-50/35"
// //                               : "bg-slate-50/30 hover:bg-slate-50/60"
// //                           }`}
// //                         >
// //                           {/* CATEGORY + CHECKBOX */}
// //                           <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-3 align-top">
// //                             <div className="flex items-start gap-3">
// //                               <input
// //                                 type="checkbox"
// //                                 checked={formItems[index].selectedSubItems.some(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )}
// //                                 onChange={() => toggleSubItem(index, sub)}
// //                                 className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
// //                               />

// //                               <div className="min-w-0">
// //                                 <div
// //                                   className={`text-[11px] font-medium uppercase tracking-wide ${
// //                                     checked
// //                                       ? "text-slate-600"
// //                                       : "text-slate-300"
// //                                   }`}
// //                                 >
// //                                   {sub.category || "—"}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </td>

// //                           {/* SKU */}
// //                           <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-3 align-top">
// //                             <div className="flex items-center gap-2">
// //                               <div
// //                                 className={`h-5 w-[2px] rounded-full ${
// //                                   checked ? "bg-indigo-200" : "bg-slate-150"
// //                                 }`}
// //                               />
// //                               <span
// //                                 className={`font-mono text-[11px] whitespace-nowrap ${
// //                                   checked ? "text-slate-400" : "text-slate-300"
// //                                 }`}
// //                               >
// //                                 {sub.sku || "—"}
// //                               </span>
// //                             </div>
// //                           </td>

// //                           {/* DESCRIPTION */}
// //                           <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-3 align-top">
// //                             <textarea
// //                               rows={3}
// //                               value={
// //                                 formItems[index].selectedSubItems.find(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )?.description ??
// //                                 sub.description ??
// //                                 ""
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "description",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full min-h-[84px] resize-y rounded-xl border px-3 py-2.5 text-[12px] leading-5 outline-none transition-all duration-200 ${
// //                                 checked ? subInputEnabled : disabledInput
// //                               }`}
// //                               placeholder="Description…"
// //                             />
// //                           </td>

// //                           {/* QTY */}
// //                           <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-3 align-top">
// //                             <input
// //                               type="number"
// //                               min="1"
// //                               value={
// //                                 checked
// //                                   ? qty === 0
// //                                     ? ""
// //                                     : qty
// //                                   : sub.baseQty || 1
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "qty",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full rounded-xl border  px-3 py-2.5 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
// //                                 checked ? subInputEnabled : disabledInput
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* PRICE */}
// //                           <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-3 align-top">
// //                             <input
// //                               type="number"
// //                               min="0"
// //                               value={
// //                                 checked
// //                                   ? price === 0
// //                                     ? ""
// //                                     : price
// //                                   : sub.basePrice || 0
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "price",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full rounded-xl border px-3 py-2.5 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
// //                                 checked ? subInputEnabled : disabledInput
// //                               }`}
// //                             />
// //                           </td>

// //                           {/* DISCOUNT */}
// //                           <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-3 align-top">
// //                             <div className="relative">
// //                               <input
// //                                 type="number"
// //                                 min="0"
// //                                 max="100"
// //                                 value={
// //                                   checked
// //                                     ? Number.isFinite(discount)
// //                                       ? discount
// //                                       : ""
// //                                     : 0
// //                                 }
// //                                 disabled={!checked}
// //                                 onChange={(e) =>
// //                                   updateSubItem(
// //                                     index,
// //                                     sub.id,
// //                                     "discount",
// //                                     e.target.value,
// //                                   )
// //                                 }
// //                                 onBlur={() => autoSave(formItems)}
// //                                 className={`w-full rounded-xl border py-2.5 pl-3 pr-6 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
// //                                   checked ? subInputEnabled : disabledInput
// //                                 }`}
// //                               />
// //                               {checked && (
// //                                 <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400">
// //                                   %
// //                                 </span>
// //                               )}
// //                             </div>
// //                           </td>

// //                           {/* TOTAL */}
// //                           <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-3 align-top">
// //                             <div
// //                               className={`flex min-h-[38px] items-center justify-end rounded-xl px-3 text-[12px] font-bold tabular-nums transition-all duration-200 ${
// //                                 checked
// //                                   ? "bg-gradient-to-br from-emerald-50 to-teal-50/50 text-emerald-700 ring-1 ring-emerald-200/60 shadow-[0_2px_6px_rgba(16,185,129,0.08)]"
// //                                   : "bg-transparent text-slate-200"
// //                               }`}
// //                             >
// //                               {checked
// //                                 ? formatAmount(lineTotal)
// //                                 : formatAmount(0)}
// //                             </div>
// //                           </td>

// //                           {/* REMARKS */}
// //                           <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-3 align-top">
// //                             <textarea
// //                               rows={3}
// //                               value={
// //                                 formItems[index].selectedSubItems.find(
// //                                   (s) => s.id === (sub.id || sub.itemId),
// //                                 )?.remarks ?? ""
// //                               }
// //                               disabled={!checked}
// //                               onChange={(e) =>
// //                                 updateSubItem(
// //                                   index,
// //                                   sub.id,
// //                                   "remarks",
// //                                   e.target.value,
// //                                 )
// //                               }
// //                               onBlur={() => autoSave(formItems)}
// //                               className={`w-full min-h-[84px] resize-y rounded-xl border px-3 py-2.5 text-[12px] outline-none transition-all duration-200 ${
// //                                 checked ? subInputEnabled : disabledInput
// //                               }`}
// //                               placeholder="Notes…"
// //                             />
// //                           </td>

// //                           {/* ACTION */}
// //                           <td className="whitespace-normal break-words border-b border-r border-slate-100/70 px-4 py-3 pr-6 align-top text-center last:border-r-0">
// //                             {checked && (
// //                               <button
// //                                 onClick={() => toggleSubItem(index, sub)}
// //                                 className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-rose-400 transition-all duration-150 hover:bg-rose-50 hover:text-rose-600 hover:shadow-sm"
// //                               >
// //                                 Remove
// //                               </button>
// //                             )}
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}

// //                   {/* GROUP TOTAL ROW */}
// //                   {formItems[index]?.selectedSubItems?.length > 0 && (
// //                     <tr className="border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/80 via-indigo-50/40 to-slate-50/20">
// //                       <td colSpan={9} className="px-6 py-4">
// //                         <div className="flex items-center justify-center gap-4">
// //                           {/* LABEL */}
// //                           <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-indigo-500 whitespace-nowrap">
// //                             GROUP TOTAL
// //                           </div>

// //                           {/* TOTAL */}
// //                           <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100/90 via-indigo-100/70 to-violet-100/50 px-5 py-2 text-sm font-bold tabular-nums text-indigo-800 ring-1 ring-indigo-200/70 shadow-[0_4px_12px_rgba(99,102,241,0.14),inset_0_1px_0_rgba(255,255,255,0.6)]">
// //                             {formatAmount(
// //                               (() => {
// //                                 const parentTotal =
// //                                   Number(row.qty || 1) *
// //                                   Number(row.price || 0) *
// //                                   (1 - Number(row.discount || 0) / 100);

// //                                 const subTotal = formItems[
// //                                   index
// //                                 ].selectedSubItems.reduce(
// //                                   (sum, sub) =>
// //                                     sum +
// //                                     Number(sub.qty || 1) *
// //                                       Number(sub.price || 0) *
// //                                       (1 - Number(sub.discount || 0) / 100),
// //                                   0,
// //                                 );

// //                                 return parentTotal + subTotal;
// //                               })(),
// //                             )}
// //                           </div>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </FragmentWrapper>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* FOOTER */}
// //       <div className="border-t border-slate-100/80 bg-gradient-to-r from-slate-50/70 via-white/50 to-slate-50/30 px-5 py-3 sm:px-6 lg:px-7">
// //         <div className="flex items-center justify-between gap-3 text-[11px] text-slate-400">
// //           <span>All values update automatically as you edit the rows.</span>
// //           <span className="hidden sm:inline">
// //             Only selected sub-items are editable.
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function FragmentWrapper({ children }) {
// //   return <>{children}</>;
// // }

// // src/features/quotations/QuotationItemsTable.jsx

// import { Fragment, useState } from "react";
// import { Trash2, PackageSearch, Sparkles } from "lucide-react";
// import { formatINR } from "./quotationUtils";
// import API from "../../api/axios";

// function Metric({ label, value, accent }) {
//   const accents = {
//     default: "from-slate-50 to-white border-slate-200/60 shadow-slate-100/80",
//     indigo:
//       "from-indigo-50/90 to-white border-indigo-200/50 shadow-indigo-100/60",
//     emerald:
//       "from-emerald-50/90 to-white border-emerald-200/50 shadow-emerald-100/60",
//   };

//   const valueColors = {
//     default: "text-slate-800",
//     indigo: "text-indigo-700",
//     emerald: "text-emerald-700",
//   };

//   return (
//     <div
//       className={`flex min-w-[112px] flex-col gap-0.5 rounded-2xl border bg-gradient-to-br px-4 py-3 shadow-sm backdrop-blur-sm ${
//         accents[accent] || accents.default
//       }`}
//     >
//       <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-400">
//         {label}
//       </div>
//       <div
//         className={`text-sm font-black tabular-nums ${
//           valueColors[accent] || valueColors.default
//         }`}
//       >
//         {typeof value === "string" ? value.replace(".00", "") : value}
//       </div>
//     </div>
//   );
// }

// function CellLabel({ children }) {
//   return (
//     <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:hidden">
//       {children}
//     </div>
//   );
// }

// function RowBadge({ children, tone = "slate" }) {
//   const classes = {
//     slate: "bg-slate-100 text-slate-500 ring-1 ring-slate-200/80",
//     indigo: "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/70",
//     emerald: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/70",
//     rose: "bg-rose-50 text-rose-500 ring-1 ring-rose-200/70",
//   };

//   return (
//     <span
//       className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${
//         classes[tone] || classes.slate
//       }`}
//     >
//       {children}
//     </span>
//   );
// }

// const inputBase =
//   "w-full rounded-xl border border-slate-200/70 bg-white text-[12px] text-slate-800 shadow-[0_1px_4px_rgba(15,23,42,0.05)] outline-none transition-all duration-200 placeholder:text-slate-300 hover:border-indigo-200 hover:shadow-[0_2px_10px_rgba(99,102,241,0.08)] focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10";

// const subInputEnabled =
//   "border-slate-200/70 bg-white text-slate-700 shadow-[0_1px_4px_rgba(15,23,42,0.05)] outline-none hover:border-indigo-200 hover:shadow-[0_2px_10px_rgba(99,102,241,0.08)] focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10";

// const disabledInput =
//   "cursor-not-allowed border-transparent bg-transparent text-slate-300 shadow-none";

// export default function QuotationItemsTable({
//   totals,
//   itemsList,
//   updateItem,
//   addItem,
//   removeItem,
//   formItems,
//   toggleSubItem,
//   updateSubItem,
//   autoSave,
//   onSkuSearch,
//   resetItems,
// }) {
//   const rowCount = totals?.rows?.length || 0;
//   const filledCount =
//     totals?.rows?.filter(
//       (row) => row.itemId || row.description || row.qty || row.price,
//     )?.length || 0;

//   const [skuQuery, setSkuQuery] = useState("");
//   const [skuResults, setSkuResults] = useState([]);
//   const [showSkuDropdown, setShowSkuDropdown] = useState(false);

//   const formatAmount = (value) => {
//     const amount = Number(value || 0);
//     return formatINR(Math.round(amount)).replace(".00", "");
//   };

//   return (
//     <div className="overflow-visible rounded-[28px] border border-slate-200/70 bg-gradient-to-b from-white via-slate-50/20 to-white shadow-[0_24px_70px_rgba(15,23,42,0.08),0_6px_18px_rgba(15,23,42,0.04)]">
//       {/* HEADER */}
//       <div className="relative overflow-hidden border-b border-slate-100/80 px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
//         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_80%_-10%,rgba(199,210,254,0.35),transparent_70%),radial-gradient(ellipse_50%_50%_at_5%_110%,rgba(224,231,255,0.25),transparent)]" />
//         <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//           <div className="min-w-0">
//             <div className="flex items-center gap-2">
//               <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 ring-1 ring-indigo-200/60">
//                 <Sparkles className="h-3 w-3 text-indigo-500" />
//               </div>
//               <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-indigo-400">
//                 Line Items
//               </span>
//             </div>

//             <h2 className="mt-2 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
//               Item Breakdown
//             </h2>

//             <p className="mt-0.5 max-w-2xl text-[12px] leading-5 text-slate-400">
//               Select products from master data and fine-tune quantity, pricing,
//               and discount per row.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2.5">
//             <Metric label="Rows" value={`${rowCount} total`} accent="default" />
//             <Metric
//               label="Filled"
//               value={`${filledCount} active`}
//               accent="indigo"
//             />
//             <Metric
//               label="Subtotal"
//               value={formatAmount(totals?.subtotal || 0)}
//               accent="emerald"
//             />
//           </div>
//         </div>
//       </div>

//       {/* TOOLBAR */}
//       <div className="relative z-[400] flex flex-col gap-3 overflow-visible border-b border-slate-100/80 bg-gradient-to-r from-slate-50/70 via-white to-slate-50/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-6">
//         <div className="flex items-center gap-2">
//           <RowBadge tone="indigo">{totals?.rows?.length || 0} rows</RowBadge>
//           <RowBadge tone="emerald">
//             {formItems?.filter((item) => item.selectedSubItems?.length > 0)
//               ?.length || 0}{" "}
//             grouped
//           </RowBadge>
//         </div>

//         <div className="relative z-[500] flex flex-1 justify-center overflow-visible">
//           <div className="relative z-[600] flex w-full max-w-[760px] items-center gap-3 overflow-visible rounded-3xl border border-slate-200/70 bg-white/95 p-1.5 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl">
//             <div className="relative flex-1">
//               <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 to-white px-3.5 py-2.5 shadow-inner">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
//                   <PackageSearch className="h-4 w-4 text-indigo-600" />
//                 </div>

//                 <div className="flex min-w-0 flex-1 flex-col">
//                   <span className="text-[9px] font-black uppercase tracking-[0.24em] text-slate-400">
//                     Global Item Search
//                   </span>

//                   <input
//                     type="text"
//                     value={skuQuery}
//                     placeholder="Search SKU, item name, make, category..."
//                     onChange={async (e) => {
//                       const value = e.target.value;
//                       setSkuQuery(value);

//                       if (!value.trim()) {
//                         setSkuResults([]);
//                         setShowSkuDropdown(false);
//                         return;
//                       }

//                       try {
//                         const res = await API.get("/items/search", {
//                           params: { q: value },
//                         });

//                         setSkuResults(
//                           (res.data || []).filter((item) => !item.parentId),
//                         );
//                         setShowSkuDropdown(true);
//                       } catch (err) {
//                         console.error("❌ SKU search failed:", err);
//                       }
//                     }}
//                     className="mt-0.5 w-full border-0 bg-transparent p-0 text-[13px] font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
//                   />
//                 </div>
//               </div>

//               {showSkuDropdown && skuResults.length > 0 && (
//                 <div
//                   className="absolute left-0 top-[calc(100%+12px)] z-[9999] w-full min-w-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl"
//                   style={{ maxHeight: "70vh" }}
//                 >
//                   <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
//                     <div>
//                       <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
//                         Search Results
//                       </div>
//                       <div className="mt-1 text-[11px] text-slate-500">
//                         Select item to auto-fill quotation row
//                       </div>
//                     </div>

//                     <div className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold text-indigo-600 ring-1 ring-indigo-100">
//                       {skuResults.length} items
//                     </div>
//                   </div>

//                   <div
//                     className="overflow-y-auto overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
//                     style={{ maxHeight: "calc(70vh - 72px)" }}
//                   >
//                     {skuResults.map((item) => (
//                       <button
//                         key={item.id}
//                         type="button"
//                         onClick={() => {
//                           const children = item.children || [];
//                           const newRow = {
//                             itemId: item.id,
//                             sku: item.sku || "",
//                             category: item.category || "",
//                             description: item.description || "",
//                             make: item.make || "",
//                             mfgPartNo: item.mfgPartNo || "",
//                             uom: item.uom || "",
//                             remarks: "",
//                             qty: 1,

//                             // ✅ FIXED
//                             price: Number(item.basePrice || item.price || 0),

//                             discount: Number(item.discount || 0),

//                             subItems: children,

//                             selectedSubItems: children.map((child) => ({
//                               id: child.id,
//                               itemId: child.id,
//                               name: child.name,
//                               sku: child.sku || "",
//                               category: child.category || "",
//                               make: child.make || "",
//                               mfgPartNo: child.mfgPartNo || "",
//                               uom: child.uom || "",
//                               qty: Number(child.baseQty || child.qty || 1),
//                               price: Number(
//                                 child.basePrice || child.price || 0,
//                               ),
//                               discount: Number(child.discount || 0),
//                               description: child.description || "",
//                               remarks: "",
//                             })),
//                           };

//                           const emptyRowIndex = formItems.findIndex(
//                             (r) =>
//                               !r.itemId &&
//                               !r.description &&
//                               (!r.qty || Number(r.qty) === 1) &&
//                               (!r.price || Number(r.price) === 0),
//                           );

//                           if (emptyRowIndex !== -1) {
//                             Object.entries(newRow).forEach(([key, value]) => {
//                               updateItem(emptyRowIndex, key, value);
//                             });
//                           } else {
//                             addItem(newRow);
//                           }

//                           setSkuQuery("");
//                           setSkuResults([]);
//                           setShowSkuDropdown(false);
//                         }}
//                         className="group flex w-full items-start gap-3 rounded-2xl border border-transparent px-4 py-3 text-left transition-all duration-200 hover:border-indigo-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-slate-50"
//                       >
//                         <div className="flex min-w-0 flex-1 flex-col">
//                           <div className="flex flex-wrap items-center gap-2">
//                             <span className="font-mono text-[12px] font-black tracking-wide text-indigo-700">
//                               {item.sku || "NO-SKU"}
//                             </span>
//                             {item.children?.length > 0 && (
//                               <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 ring-1 ring-emerald-100">
//                                 Grouped
//                               </span>
//                             )}
//                           </div>

//                           <div className="mt-1 line-clamp-2 text-[12px] leading-5 text-slate-700 group-hover:text-slate-900">
//                             {item.name}
//                           </div>

//                           {(item.make || item.mfgPartNo) && (
//                             <div className="mt-2 flex flex-wrap items-center gap-2">
//                               {item.make && (
//                                 <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
//                                   {item.make}
//                                 </span>
//                               )}
//                               {item.mfgPartNo && (
//                                 <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500">
//                                   {item.mfgPartNo}
//                                 </span>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex shrink-0 flex-col items-end gap-2">
//                           <div className="max-w-[160px] truncate rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-slate-200">
//                             {item.category || "Item"}
//                           </div>
//                           <div className="text-[11px] font-black text-emerald-600">
//                             {formatAmount(
//                               Math.round(Number(item.basePrice || 0)),
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={resetItems}
//               className="group inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-4.5 text-[11px] font-black uppercase tracking-[0.14em] text-rose-600 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 hover:shadow-[0_8px_20px_rgba(244,63,94,0.15)]"
//             >
//               <Trash2 className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-12" />
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* TABLE */}
//       {/* TABLE */}
//       <div className="relative z-[1] rounded-b-[28px] border-t border-slate-100/70 bg-white">
//         <div
//           className="
//       overflow-x-auto
//       overflow-y-auto
//       max-h-[520px]
//       lg:max-h-[680px]

//       scrollbar-thin
//       scrollbar-thumb-slate-300
//       scrollbar-track-slate-100
//       hover:scrollbar-thumb-slate-400
//     "
//           style={{
//             scrollbarWidth: "thin",
//             scrollbarColor: "#94a3b8 #e2e8f0",
//           }}
//         >
//           <table
//             className="w-full table-fixed border-separate border-spacing-0 text-sm"
//             style={{
//               borderCollapse: "separate",
//               borderSpacing: "0",
//               minWidth: "1460px",
//             }}
//           >
//             <colgroup>
//               <col style={{ width: "150px" }} />
//               <col style={{ width: "150px" }} />
//               <col style={{ width: "520px" }} />
//               <col style={{ width: "100px" }} />
//               <col style={{ width: "120px" }} />
//               <col style={{ width: "110px" }} />
//               <col style={{ width: "150px" }} />
//               <col style={{ width: "240px" }} />
//               <col style={{ width: "72px" }} />
//             </colgroup>

//             <thead className="sticky top-0 z-[20] bg-slate-50/95 backdrop-blur-xl">
//               <tr>
//                 {[
//                   { label: "Category" },
//                   { label: "SKU" },
//                   { label: "Description" },
//                   { label: "Quantity", cls: "text-right" },
//                   { label: "Price", cls: "text-right" },
//                   { label: "Discount", cls: "text-right" },
//                   { label: "Line Total", cls: "text-right" },
//                   { label: "Remarks" },
//                   { label: "Delete", cls: "text-center" },
//                 ].map(({ label, cls = "" }) => (
//                   <th
//                     key={label}
//                     className={`border-b border-r border-slate-200/70 bg-slate-50/95 px-3 py-2.5 text-left text-[9px] font-black uppercase tracking-[0.22em] text-slate-500 backdrop-blur-md whitespace-nowrap last:border-r-0 ${cls}`}
//                   >
//                     {label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody className="[&_tr:last-child_td]:border-b-0">
//               {totals.rows.map((row, index) => {
//                 const selectedItem = itemsList.find(
//                   (i) => String(i.id) === String(row.itemId),
//                 );
//                 const hasDiscount = Number(row.discount || 0) > 0;

//                 return (
//                   <FragmentWrapper key={`row-${index}`}>
//                     {/* MAIN ROW */}
//                     <tr
//                       className={`group border-b border-slate-100/70 transition-all duration-200 ${
//                         hasDiscount
//                           ? "bg-gradient-to-r from-amber-50/50 via-amber-50/20 to-transparent hover:from-amber-50/80 hover:via-amber-50/35"
//                           : "bg-white hover:bg-gradient-to-r hover:from-indigo-50/20 hover:via-slate-50/30 hover:to-transparent"
//                       }`}
//                     >
//                       {/* CATEGORY */}
//                       <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                         <CellLabel>Category</CellLabel>
//                         <div className="flex min-h-[34px] items-center text-[12px] font-medium text-slate-600">
//                           {selectedItem?.category || (
//                             <span className="text-slate-300">—</span>
//                           )}
//                         </div>
//                       </td>

//                       {/* SKU */}
//                       <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                         <CellLabel>SKU</CellLabel>
//                         <div className="flex min-h-[34px] items-center gap-2">
//                           <div className="h-5 w-[2px] rounded-full bg-gradient-to-b from-indigo-200 to-slate-100" />
//                           <span className="whitespace-nowrap font-mono text-[12px] font-semibold text-slate-500">
//                             {selectedItem?.sku || (
//                               <span className="font-sans font-normal text-slate-300">
//                                 —
//                               </span>
//                             )}
//                           </span>
//                         </div>
//                       </td>

//                       {/* DESCRIPTION */}
//                       <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                         <CellLabel>Description</CellLabel>
//                         <textarea
//                           value={row.description ?? ""}
//                           rows={2}
//                           onChange={(e) =>
//                             updateItem(index, "description", e.target.value)
//                           }
//                           onBlur={() => autoSave(formItems)}
//                           className={`${inputBase} min-h-[84px] resize-y px-3 py-2.5 leading-6`}
//                           placeholder="Add description…"
//                         />
//                       </td>

//                       {/* QTY */}
//                       <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                         <CellLabel>Quantity</CellLabel>
//                         <input
//                           type="number"
//                           min="1"
//                           value={
//                             Number.isFinite(Number(row.qty)) ? row.qty : ""
//                           }
//                           onChange={(e) =>
//                             updateItem(index, "qty", e.target.value)
//                           }
//                           onBlur={() => autoSave(formItems)}
//                           className={`${inputBase} h-9 px-2.5 text-right tabular-nums`}
//                         />
//                       </td>

//                       {/* PRICE */}
//                       <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                         <CellLabel>Price</CellLabel>
//                         <input
//                           type="number"
//                           min="0"
//                           value={
//                             Number.isFinite(Number(row.price)) ? row.price : ""
//                           }
//                           readOnly
//                           tabIndex={-1}
//                           className="h-9 w-full cursor-not-allowed rounded-xl border border-slate-200/70 bg-slate-100/80 px-2.5 text-right text-[12px] font-medium tabular-nums text-slate-500 shadow-inner outline-none"
//                         />
//                       </td>

//                       {/* DISCOUNT */}
//                       <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                         <CellLabel>Discount</CellLabel>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             min="0"
//                             max="100"
//                             value={
//                               Number.isFinite(Number(row.discount))
//                                 ? row.discount
//                                 : ""
//                             }
//                             onChange={(e) =>
//                               updateItem(index, "discount", e.target.value)
//                             }
//                             onBlur={() => autoSave(formItems)}
//                             className={`${inputBase} h-9 py-2.5 pl-2.5 pr-6 text-right tabular-nums`}
//                           />
//                           <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400">
//                             %
//                           </span>
//                         </div>
//                       </td>

//                       {/* LINE TOTAL */}
//                       <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                         <CellLabel>Line Total</CellLabel>
//                         <div className="flex h-9 items-center justify-end rounded-xl bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-50/40 px-3 text-[12px] font-bold tabular-nums text-emerald-700 ring-1 ring-emerald-200/70 shadow-[0_2px_8px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
//                           {formatAmount(
//                             Math.round(
//                               Number(row.qty || 1) *
//                                 Number(row.price || 0) *
//                                 (1 - Number(row.discount || 0) / 100),
//                             ),
//                           )}
//                         </div>
//                       </td>

//                       {/* REMARKS */}
//                       <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                         <CellLabel>Remarks</CellLabel>
//                         <textarea
//                           rows={2}
//                           value={row.remarks ?? ""}
//                           onChange={(e) =>
//                             updateItem(index, "remarks", e.target.value)
//                           }
//                           onBlur={() => autoSave(formItems)}
//                           className={`${inputBase} min-h-[58px] resize-y px-2.5 py-2 text-[12px] leading-5`}
//                           placeholder="Add notes…"
//                         />
//                         {Number(row.discount || 0) > 0 &&
//                           !row.remarks?.trim() && (
//                             <span className="mt-1.5 flex items-center gap-1.5 text-[10px] font-bold text-rose-500">
//                               <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
//                               Required
//                             </span>
//                           )}
//                       </td>

//                       {/* DELETE */}
//                       <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5 text-center last:border-r-0">
//                         <button
//                           onClick={() => removeItem(index)}
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100/50 text-rose-400 shadow-sm transition-all duration-200 hover:border-rose-200 hover:from-rose-100 hover:to-rose-200/60 hover:text-rose-600 hover:shadow-[0_4px_12px_rgba(239,68,68,0.15)] active:scale-95"
//                           aria-label="Remove row"
//                         >
//                           <Trash2 className="h-3.5 w-3.5" />
//                         </button>
//                       </td>
//                     </tr>

//                     {/* SUB-ITEM ROWS */}
//                     {formItems[index]?.subItems?.length > 0 &&
//                       formItems[index].subItems.map((sub) => {
//                         const selected = formItems[index].selectedSubItems.find(
//                           (s) => s.id === (sub.id || sub.itemId),
//                         );
//                         const checked = !!selected;
//                         const qty = selected?.qty || 1;
//                         const price =
//                           selected?.price ?? sub.basePrice ?? sub.price ?? 0;
//                         const discount = selected?.discount || 0;
//                         const lineTotal = qty * price * (1 - discount / 100);

//                         return (
//                           <tr
//                             key={sub.id}
//                             className={`border-b border-slate-100/60 transition-all duration-200 ${
//                               checked
//                                 ? "bg-gradient-to-r from-indigo-50/60 via-indigo-50/25 to-transparent hover:from-indigo-100/50 hover:via-indigo-50/35"
//                                 : "bg-slate-50/30 hover:bg-slate-50/60"
//                             }`}
//                           >
//                             {/* CATEGORY + CHECKBOX */}
//                             <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                               <div className="flex items-start gap-2.5">
//                                 <input
//                                   type="checkbox"
//                                   checked={checked}
//                                   onChange={() => toggleSubItem(index, sub)}
//                                   className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
//                                 />

//                                 <div className="min-w-0 pt-0.5">
//                                   <div
//                                     className={`text-[11px] font-semibold uppercase tracking-wide ${
//                                       checked
//                                         ? "text-slate-600"
//                                         : "text-slate-300"
//                                     }`}
//                                   >
//                                     {sub.category || "—"}
//                                   </div>
//                                   <div
//                                     className={`mt-0.5 text-[10px] ${
//                                       checked
//                                         ? "text-indigo-400"
//                                         : "text-slate-300"
//                                     }`}
//                                   >
//                                     {sub.uom || "Sub item"}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>

//                             {/* SKU */}
//                             <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                               <div className="flex min-h-[34px] items-center gap-2">
//                                 <div
//                                   className={`h-5 w-[2px] rounded-full ${
//                                     checked ? "bg-indigo-200" : "bg-slate-150"
//                                   }`}
//                                 />
//                                 <span
//                                   className={`whitespace-nowrap font-mono text-[11px] ${
//                                     checked
//                                       ? "text-slate-400"
//                                       : "text-slate-300"
//                                   }`}
//                                 >
//                                   {sub.sku || "—"}
//                                 </span>
//                               </div>
//                             </td>

//                             {/* DESCRIPTION */}
//                             <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                               <textarea
//                                 rows={2}
//                                 value={
//                                   formItems[index].selectedSubItems.find(
//                                     (s) => s.id === (sub.id || sub.itemId),
//                                   )?.description ??
//                                   sub.description ??
//                                   ""
//                                 }
//                                 disabled={!checked}
//                                 onChange={(e) =>
//                                   updateSubItem(
//                                     index,
//                                     sub.id,
//                                     "description",
//                                     e.target.value,
//                                   )
//                                 }
//                                 onBlur={() => autoSave(formItems)}
//                                 className={`min-h-[84px] w-full resize-y rounded-xl border px-3 py-2.5 text-[12px] leading-6 outline-none transition-all duration-200 ${
//                                   checked ? subInputEnabled : disabledInput
//                                 }`}
//                                 placeholder="Description…"
//                               />
//                             </td>

//                             {/* QTY */}
//                             <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                               <input
//                                 type="number"
//                                 min="1"
//                                 value={
//                                   checked
//                                     ? qty === 0
//                                       ? ""
//                                       : qty
//                                     : sub.baseQty || 1
//                                 }
//                                 disabled={!checked}
//                                 onChange={(e) =>
//                                   updateSubItem(
//                                     index,
//                                     sub.id,
//                                     "qty",
//                                     e.target.value,
//                                   )
//                                 }
//                                 onBlur={() => autoSave(formItems)}
//                                 className={`h-9 w-full rounded-xl border px-2.5 py-2.5 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
//                                   checked ? subInputEnabled : disabledInput
//                                 }`}
//                               />
//                             </td>

//                             {/* PRICE */}
//                             <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                               <input
//                                 type="number"
//                                 min="0"
//                                 value={
//                                   checked
//                                     ? price === 0
//                                       ? ""
//                                       : price
//                                     : sub.basePrice || 0
//                                 }
//                                 readOnly
//                                 tabIndex={-1}
//                                 className={`h-9 w-full rounded-xl border px-2.5 py-2.5 text-right text-[12px] font-medium tabular-nums outline-none ${
//                                   checked
//                                     ? "cursor-not-allowed border-slate-200/70 bg-slate-100/80 text-slate-500 shadow-inner"
//                                     : disabledInput
//                                 }`}
//                               />
//                             </td>

//                             {/* DISCOUNT */}
//                             <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                               <div className="relative">
//                                 <input
//                                   type="number"
//                                   min="0"
//                                   max="100"
//                                   value={
//                                     checked
//                                       ? Number.isFinite(discount)
//                                         ? discount
//                                         : ""
//                                       : 0
//                                   }
//                                   disabled={!checked}
//                                   onChange={(e) =>
//                                     updateSubItem(
//                                       index,
//                                       sub.id,
//                                       "discount",
//                                       e.target.value,
//                                     )
//                                   }
//                                   onBlur={() => autoSave(formItems)}
//                                   className={`h-9 w-full rounded-xl border py-2.5 pl-2.5 pr-6 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
//                                     checked ? subInputEnabled : disabledInput
//                                   }`}
//                                 />
//                                 {checked && (
//                                   <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400">
//                                     %
//                                   </span>
//                                 )}
//                               </div>
//                             </td>

//                             {/* LINE TOTAL */}
//                             <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                               <div
//                                 className={`flex h-9 items-center justify-end rounded-xl px-3 text-[12px] font-bold tabular-nums transition-all duration-200 ${
//                                   checked
//                                     ? "bg-gradient-to-br from-emerald-50 to-teal-50/50 text-emerald-700 ring-1 ring-emerald-200/60 shadow-[0_2px_6px_rgba(16,185,129,0.08)]"
//                                     : "bg-transparent text-slate-200"
//                                 }`}
//                               >
//                                 {checked
//                                   ? formatAmount(lineTotal)
//                                   : formatAmount(0)}
//                               </div>
//                             </td>

//                             {/* REMARKS */}
//                             <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5">
//                               <textarea
//                                 rows={2}
//                                 value={
//                                   formItems[index].selectedSubItems.find(
//                                     (s) => s.id === (sub.id || sub.itemId),
//                                   )?.remarks ?? ""
//                                 }
//                                 disabled={!checked}
//                                 onChange={(e) =>
//                                   updateSubItem(
//                                     index,
//                                     sub.id,
//                                     "remarks",
//                                     e.target.value,
//                                   )
//                                 }
//                                 onBlur={() => autoSave(formItems)}
//                                 className={`min-h-[58px] w-full resize-y rounded-xl border px-2.5 py-2 text-[12px] outline-none transition-all duration-200 ${
//                                   checked ? subInputEnabled : disabledInput
//                                 }`}
//                                 placeholder="Notes…"
//                               />
//                             </td>

//                             {/* DELETE */}
//                             <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-3 py-2.5 text-center last:border-r-0">
//                               {checked ? (
//                                 <button
//                                   onClick={() => toggleSubItem(index, sub)}
//                                   className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100/50 text-rose-400 shadow-sm transition-all duration-150 hover:border-rose-200 hover:from-rose-100 hover:to-rose-200/60 hover:text-rose-600 hover:shadow-[0_4px_12px_rgba(239,68,68,0.15)] active:scale-95"
//                                   aria-label="Remove sub item"
//                                 >
//                                   <Trash2 className="h-3.5 w-3.5" />
//                                 </button>
//                               ) : (
//                                 <span className="text-[10px] text-slate-200">
//                                   —
//                                 </span>
//                               )}
//                             </td>
//                           </tr>
//                         );
//                       })}

//                     {/* GROUP TOTAL ROW */}
//                     {formItems[index]?.selectedSubItems?.length > 0 && (
//                       <tr className="border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/80 via-indigo-50/40 to-slate-50/20">
//                         <td colSpan={9} className="px-4 py-3.5">
//                           <div className="flex items-center justify-center gap-4">
//                             <div className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.32em] text-indigo-500">
//                               GROUP TOTAL
//                             </div>

//                             <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100/90 via-indigo-100/70 to-violet-100/50 px-4 py-2 text-sm font-bold tabular-nums text-indigo-800 ring-1 ring-indigo-200/70 shadow-[0_4px_12px_rgba(99,102,241,0.14),inset_0_1px_0_rgba(255,255,255,0.6)]">
//                               {formatAmount(
//                                 (() => {
//                                   const parentTotal =
//                                     Number(row.qty || 1) *
//                                     Number(row.price || 0) *
//                                     (1 - Number(row.discount || 0) / 100);

//                                   const subTotal = formItems[
//                                     index
//                                   ].selectedSubItems.reduce((sum, sub) => {
//                                     const qty = Number(
//                                       sub.qty || sub.baseQty || 1,
//                                     );

//                                     const price = Number(
//                                       sub.price || sub.basePrice || 0,
//                                     );

//                                     const discount = Number(sub.discount || 0);

//                                     return (
//                                       sum + qty * price * (1 - discount / 100)
//                                     );
//                                   }, 0);

//                                   return parentTotal + subTotal;
//                                 })(),
//                               )}
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </FragmentWrapper>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <div className="border-t border-slate-100/80 bg-gradient-to-r from-slate-50/70 via-white/50 to-slate-50/30 px-4 py-3 sm:px-5 lg:px-6">
//         <div className="flex items-center justify-between gap-3 text-[11px] text-slate-400">
//           <span>All values update automatically as you edit the rows.</span>
//           <span className="hidden sm:inline">
//             Only selected sub-items are editable.
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FragmentWrapper({ children }) {
//   return <>{children}</>;
// }

// src/features/quotations/QuotationItemsTable.jsx

import { Fragment, useState } from "react";
import { Trash2, PackageSearch, Sparkles } from "lucide-react";
import { formatINR } from "./quotationUtils";
import API from "../../api/axios";

function Metric({ label, value, accent }) {
  const accents = {
    default: "from-slate-50 to-white border-slate-200/60 shadow-slate-100/80",
    indigo:
      "from-indigo-50/90 to-white border-indigo-200/50 shadow-indigo-100/60",
    emerald:
      "from-emerald-50/90 to-white border-emerald-200/50 shadow-emerald-100/60",
  };

  const valueColors = {
    default: "text-slate-800",
    indigo: "text-indigo-700",
    emerald: "text-emerald-700",
  };

  return (
    <div
      className={`flex min-w-[112px] flex-col gap-0.5 rounded-2xl border bg-gradient-to-br px-3 py-2.5 shadow-sm backdrop-blur-sm ${
        accents[accent] || accents.default
      }`}
    >
      <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-400">
        {label}
      </div>
      <div
        className={`text-sm font-black tabular-nums ${
          valueColors[accent] || valueColors.default
        }`}
      >
        {typeof value === "string" ? value.replace(".00", "") : value}
      </div>
    </div>
  );
}

function CellLabel({ children }) {
  return (
    <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:hidden">
      {children}
    </div>
  );
}

function RowBadge({ children, tone = "slate" }) {
  const classes = {
    slate: "bg-slate-100 text-slate-500 ring-1 ring-slate-200/80",
    indigo: "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/70",
    emerald: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/70",
    rose: "bg-rose-50 text-rose-500 ring-1 ring-rose-200/70",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${
        classes[tone] || classes.slate
      }`}
    >
      {children}
    </span>
  );
}

const inputBase =
  "w-full rounded-xl border border-slate-200/70 bg-white text-[12px] text-slate-800 shadow-[0_1px_4px_rgba(15,23,42,0.05)] outline-none transition-all duration-200 placeholder:text-slate-300 hover:border-indigo-200 hover:shadow-[0_2px_10px_rgba(99,102,241,0.08)] focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10";

const subInputEnabled =
  "border-slate-200/70 bg-white text-slate-700 shadow-[0_1px_4px_rgba(15,23,42,0.05)] outline-none hover:border-indigo-200 hover:shadow-[0_2px_10px_rgba(99,102,241,0.08)] focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10";

const disabledInput =
  "cursor-not-allowed border-transparent bg-transparent text-slate-300 shadow-none";

export default function QuotationItemsTable({
  totals,
  itemsList,
  updateItem,
  addItem,
  removeItem,
  formItems,
  toggleSubItem,
  updateSubItem,
  autoSave,
  onSkuSearch,
  resetItems,
}) {
  const rowCount = totals?.rows?.length || 0;
  const filledCount =
    totals?.rows?.filter(
      (row) => row.itemId || row.description || row.qty || row.price,
    )?.length || 0;

  const [skuQuery, setSkuQuery] = useState("");
  const [skuResults, setSkuResults] = useState([]);
  const [showSkuDropdown, setShowSkuDropdown] = useState(false);

  const formatAmount = (value) => {
    const amount = Number(value || 0);
    return formatINR(Math.round(amount)).replace(".00", "");
  };

  return (
    <div className="overflow-visible rounded-[28px] border border-slate-200/70 bg-gradient-to-b from-white via-slate-50/20 to-white shadow-[0_24px_70px_rgba(15,23,42,0.08),0_6px_18px_rgba(15,23,42,0.04)]">
      {/* HEADER */}
      <div className="relative overflow-hidden border-b border-slate-100/80 px-3 py-3 sm:px-5 sm:py-4 lg:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_80%_-10%,rgba(199,210,254,0.35),transparent_70%),radial-gradient(ellipse_50%_50%_at_5%_110%,rgba(224,231,255,0.25),transparent)]" />
        <div className="relative flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 ring-1 ring-indigo-200/60">
                <Sparkles className="h-3 w-3 text-indigo-500" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-indigo-400">
                Line Items
              </span>
            </div>

            <h2 className="mt-2 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Item Breakdown
            </h2>

            <p className="mt-0.5 max-w-2xl text-[12px] leading-5 text-slate-400">
              Select products from master data and fine-tune quantity, pricing,
              and discount per row.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Metric label="Rows" value={`${rowCount} total`} accent="default" />
            <Metric
              label="Filled"
              value={`${filledCount} active`}
              accent="indigo"
            />
            <Metric
              label="Subtotal"
              value={formatAmount(totals?.subtotal || 0)}
              accent="emerald"
            />
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="relative z-[400] flex flex-col gap-2.5 overflow-visible border-b border-slate-100/80 bg-gradient-to-r from-slate-50/70 via-white to-slate-50/40 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-6">
        <div className="flex items-center gap-2">
          <RowBadge tone="indigo">{totals?.rows?.length || 0} rows</RowBadge>
          <RowBadge tone="emerald">
            {formItems?.filter((item) => item.selectedSubItems?.length > 0)
              ?.length || 0}{" "}
            grouped
          </RowBadge>
        </div>

        <div className="relative z-[500] flex flex-1 justify-center overflow-visible">
          <div className="relative z-[600] flex w-full max-w-[760px] items-center gap-2.5 overflow-visible rounded-3xl border border-slate-200/70 bg-white/95 p-1 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="relative flex-1">
              <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 to-white px-3 py-2 shadow-inner">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
                  <PackageSearch className="h-4 w-4 text-indigo-600" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.24em] text-slate-400">
                    Global Item Search
                  </span>

                  <input
                    type="text"
                    value={skuQuery}
                    placeholder="Search SKU, item name, make, category..."
                    onChange={async (e) => {
                      const value = e.target.value;
                      setSkuQuery(value);

                      if (!value.trim()) {
                        setSkuResults([]);
                        setShowSkuDropdown(false);
                        return;
                      }

                      try {
                        const res = await API.get("/items/search", {
                          params: { q: value },
                        });

                        const normalized = (res.data || []).filter(
                          (item) => !item.parentId,
                        );

                        setSkuResults(normalized);
                        setShowSkuDropdown(true);
                      } catch (err) {
                        console.error("❌ SKU search failed:", err);
                      }
                    }}
                    className="mt-0.5 w-full border-0 bg-transparent p-0 text-[13px] font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
                  />
                </div>
              </div>

              {showSkuDropdown && skuResults.length > 0 && (
                <div
                  className="absolute left-0 top-[calc(100%+12px)] z-[9999] w-full min-w-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl"
                  style={{ maxHeight: "70vh" }}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-3 py-2.5">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
                        Search Results
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500">
                        Select item to auto-fill quotation row
                      </div>
                    </div>

                    <div className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold text-indigo-600 ring-1 ring-indigo-100">
                      {skuResults.length} items
                    </div>
                  </div>

                  <div
                    className="overflow-y-auto overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
                    style={{ maxHeight: "calc(70vh - 72px)" }}
                  >
                    {skuResults.map((item) => {
                      const children = item.children || [];
                      const hasParentPrice =
                        Number(item.basePrice || item.price || 0) > 0;
                      const hasBillableChildren = children.some(
                        (child) =>
                          Number(child.basePrice || child.price || 0) > 0,
                      );

                      const pricingMode = hasBillableChildren
                        ? hasParentPrice
                          ? "parent_with_children"
                          : "children_only"
                        : "spec_rows";

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            const selectableChildren =
                              pricingMode === "children_only" ||
                              pricingMode === "parent_with_children";

                            const newRow = {
                              itemId: item.id,
                              sku: item.sku || "",
                              category: item.category || "",
                              description: item.description || "",
                              make: item.make || "",
                              mfgPartNo: item.mfgPartNo || "",
                              uom: item.uom || "",
                              remarks: "",
                              qty: 1,

                              // parent price only if available
                              price: hasParentPrice
                                ? Number(item.basePrice || item.price || 0)
                                : 0,

                              discount: Number(item.discount || 0),
                              pricingMode,
                              subItems: children,

                              // auto-select only for children-only pricing
                              selectedSubItems: selectableChildren
                                ? children.map((child) => ({
                                    id: child.id,
                                    itemId: child.id,

                                    name: child.name || "",
                                    sku: child.sku || "",
                                    category: child.category || "",

                                    description: child.description || "",

                                    make: child.make || "",
                                    mfgPartNo: child.mfgPartNo || "",
                                    uom: child.uom || "",

                                    remarks: child.defaultRemarks || "",

                                    qty: Number(
                                      child.baseQty || child.qty || 1,
                                    ),

                                    price: Number(
                                      child.basePrice || child.price || 0,
                                    ),

                                    discount: Number(child.discount || 0),
                                  }))
                                : [],
                            };

                            const emptyRowIndex = formItems.findIndex(
                              (r) =>
                                !r.itemId &&
                                !r.description &&
                                (!r.qty || Number(r.qty) === 1) &&
                                (!r.price || Number(r.price) === 0),
                            );

                            if (emptyRowIndex !== -1) {
                              Object.entries(newRow).forEach(([key, value]) => {
                                updateItem(emptyRowIndex, key, value);
                              });
                            } else {
                              addItem(newRow);
                            }

                            setSkuQuery("");
                            setSkuResults([]);
                            setShowSkuDropdown(false);
                          }}
                          className="group flex w-full items-start gap-2.5 rounded-2xl border border-transparent px-3 py-2.5 text-left transition-all duration-200 hover:border-indigo-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-slate-50"
                        >
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[12px] font-black tracking-wide text-indigo-700">
                                {item.sku || "NO-SKU"}
                              </span>

                              {children.length > 0 && (
                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 ring-1 ring-emerald-100">
                                  Grouped
                                </span>
                              )}

                              {pricingMode === "children_only" && (
                                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-600 ring-1 ring-amber-100">
                                  Child Pricing
                                </span>
                              )}

                              {pricingMode === "spec_rows" && (
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                                  Fixed Rows
                                </span>
                              )}
                            </div>

                            <div className="mt-1 line-clamp-2 text-[12px] leading-5 text-slate-700 group-hover:text-slate-900">
                              {item.name}
                            </div>

                            {(item.make || item.mfgPartNo) && (
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                {item.make && (
                                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500">
                                    {item.make}
                                  </span>
                                )}

                                {item.mfgPartNo && (
                                  <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500">
                                    {item.mfgPartNo}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex shrink-0 flex-col items-end gap-2">
                            <div className="max-w-[160px] truncate rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-slate-200">
                              {item.category || "Item"}
                            </div>

                            <div className="text-[11px] font-black text-emerald-600">
                              {hasParentPrice
                                ? formatAmount(
                                    Math.round(Number(item.basePrice || 0)),
                                  )
                                : `${children.length} items`}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={resetItems}
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-4.5 text-[11px] font-black uppercase tracking-[0.14em] text-rose-600 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 hover:shadow-[0_8px_20px_rgba(244,63,94,0.15)]"
            >
              <Trash2 className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-12" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="relative z-[1] rounded-b-[28px] border-t border-slate-100/70 bg-white">
        <div
          className="
            overflow-x-auto
            overflow-y-auto
            max-h-[460px]
            lg:max-h-[590px]
            scrollbar-thin
            scrollbar-thumb-slate-300
            scrollbar-track-slate-100
            hover:scrollbar-thumb-slate-400
          "
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#94a3b8 #e2e8f0",
          }}
        >
          <table
            className="w-full table-fixed border-separate border-spacing-0 text-sm"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0",
              minWidth: "1380px",
            }}
          >
            <colgroup>
              <col style={{ width: "130px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "470px" }} />
              <col style={{ width: "90px" }} />
              <col style={{ width: "110px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "200px" }} />
              <col style={{ width: "60px" }} />
            </colgroup>

            <thead className="sticky top-0 z-[20] bg-slate-50/95 backdrop-blur-xl">
              <tr>
                {[
                  { label: "Category" },
                  { label: "SKU" },
                  { label: "Description" },
                  { label: "Quantity", cls: "text-right" },
                  { label: "Price", cls: "text-right" },
                  { label: "Discount", cls: "text-right" },
                  { label: "Line Total", cls: "text-right" },
                  { label: "Remarks" },
                  { label: "Delete", cls: "text-center" },
                ].map(({ label, cls = "" }) => (
                  <th
                    key={label}
                    className={`border-b border-r border-slate-200/70 bg-slate-50/95 px-2 py-1.5 text-left text-[9px] font-black uppercase tracking-[0.22em] text-slate-500 backdrop-blur-md whitespace-nowrap last:border-r-0 ${cls}`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="[&_tr:last-child_td]:border-b-0">
              {totals.rows.map((row, index) => {
                const selectedItem = itemsList.find(
                  (i) => String(i.id) === String(row.itemId),
                );

                const hasDiscount = Number(row.discount || 0) > 0;

                const pricingMode =
                  formItems[index]?.pricingMode ||
                  ((formItems[index]?.subItems || []).some(
                    (sub) => Number(sub.basePrice || sub.price || 0) > 0,
                  )
                    ? Number(row.price || 0) > 0
                      ? "parent_with_children"
                      : "children_only"
                    : "spec_rows");

                const isSelectableGroup =
                  pricingMode === "parent_with_children" ||
                  pricingMode === "children_only";

                return (
                  <FragmentWrapper key={`row-${index}`}>
                    {/* MAIN ROW */}
                    <tr
                      className={`group border-b border-slate-100/70 transition-all duration-200 ${
                        hasDiscount
                          ? "bg-gradient-to-r from-amber-50/50 via-amber-50/20 to-transparent hover:from-amber-50/80 hover:via-amber-50/35"
                          : "bg-white hover:bg-gradient-to-r hover:from-indigo-50/20 hover:via-slate-50/30 hover:to-transparent"
                      }`}
                    >
                      {/* CATEGORY */}
                      <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                        <CellLabel>Category</CellLabel>
                        <div className="flex min-h-[26px] items-center text-[12px] font-medium text-slate-600">
                          {selectedItem?.category || (
                            <span className="text-slate-300">—</span>
                          )}
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                        <CellLabel>SKU</CellLabel>
                        <div className="flex min-h-[26px] items-center gap-2">
                          <div className="h-5 w-[2px] rounded-full bg-gradient-to-b from-indigo-200 to-slate-100" />
                          <span className="whitespace-nowrap font-mono text-[12px] font-semibold text-slate-500">
                            {selectedItem?.sku || (
                              <span className="font-sans font-normal text-slate-300">
                                —
                              </span>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* DESCRIPTION */}
                      <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                        <CellLabel>Description</CellLabel>
                        <textarea
                          value={row.description ?? ""}
                          rows={2}
                          onChange={(e) =>
                            updateItem(index, "description", e.target.value)
                          }
                          onBlur={() => autoSave(formItems)}
                          className={`${inputBase} min-h-[68px] resize-y px-3 py-2 leading-5`}
                          placeholder="Add description…"
                        />
                      </td>

                      {/* QTY */}
                      <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                        <CellLabel>Quantity</CellLabel>
                        <input
                          type="number"
                          min="1"
                          value={
                            Number.isFinite(Number(row.qty)) ? row.qty : ""
                          }
                          onChange={(e) =>
                            updateItem(index, "qty", e.target.value)
                          }
                          onBlur={() => autoSave(formItems)}
                          className={`${inputBase} h-9 px-2 text-right tabular-nums`}
                        />
                      </td>

                      {/* PRICE */}
                      <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                        <CellLabel>Price</CellLabel>
                        <input
                          type="number"
                          min="0"
                          value={
                            Number.isFinite(Number(row.price)) ? row.price : ""
                          }
                          readOnly
                          tabIndex={-1}
                          className="h-9 w-full cursor-not-allowed rounded-xl border border-slate-200/70 bg-slate-100/80 px-2 text-right text-[12px] font-medium tabular-nums text-slate-500 shadow-inner outline-none"
                        />
                      </td>

                      {/* DISCOUNT */}
                      <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                        <CellLabel>Discount</CellLabel>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={
                              Number.isFinite(Number(row.discount))
                                ? row.discount
                                : ""
                            }
                            onChange={(e) =>
                              updateItem(index, "discount", e.target.value)
                            }
                            onBlur={() => autoSave(formItems)}
                            className={`${inputBase} h-9 py-2 pl-2 pr-6 text-right tabular-nums`}
                          />
                          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400">
                            %
                          </span>
                        </div>
                      </td>

                      {/* LINE TOTAL */}
                      <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                        <CellLabel>Line Total</CellLabel>
                        <div className="flex h-9 items-center justify-end rounded-xl bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-50/40 px-3 text-[12px] font-bold tabular-nums text-emerald-700 ring-1 ring-emerald-200/70 shadow-[0_2px_8px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
                          {formatAmount(
                            Math.round(
                              Number(row.qty || 1) *
                                Number(row.price || 0) *
                                (1 - Number(row.discount || 0) / 100),
                            ),
                          )}
                        </div>
                      </td>

                      {/* REMARKS */}
                      <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                        <CellLabel>Remarks</CellLabel>
                        <textarea
                          rows={2}
                          value={row.remarks ?? ""}
                          onChange={(e) =>
                            updateItem(index, "remarks", e.target.value)
                          }
                          onBlur={() => autoSave(formItems)}
                          className={`${inputBase} min-h-[50px] resize-y px-2 py-1.5 text-[12px] leading-5`}
                          placeholder="Add notes…"
                        />
                        {Number(row.discount || 0) > 0 &&
                          !row.remarks?.trim() && (
                            <span className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-rose-500">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                              Required
                            </span>
                          )}
                      </td>

                      {/* DELETE */}
                      <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5 text-center last:border-r-0">
                        <button
                          onClick={() => removeItem(index)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100/50 text-rose-400 shadow-sm transition-all duration-200 hover:border-rose-200 hover:from-rose-100 hover:to-rose-200/60 hover:text-rose-600 hover:shadow-[0_4px_12px_rgba(239,68,68,0.15)] active:scale-95"
                          aria-label="Remove row"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* SUB-ITEM ROWS */}
                    {formItems[index]?.subItems?.length > 0 &&
                      formItems[index].subItems.map((sub) => {
                        const selected = isSelectableGroup
                          ? formItems[index].selectedSubItems.find(
                              (s) => s.id === (sub.id || sub.itemId),
                            )
                          : null;

                        const checked = isSelectableGroup ? !!selected : true;

                        const qty = selected?.qty || 1;
                        const price =
                          selected?.price ?? sub.basePrice ?? sub.price ?? 0;
                        const discount = selected?.discount || 0;
                        const lineTotal = qty * price * (1 - discount / 100);

                        return (
                          <tr
                            key={sub.id}
                            className={`border-b border-slate-100/60 transition-all duration-200 ${
                              checked
                                ? "bg-gradient-to-r from-indigo-50/60 via-indigo-50/25 to-transparent hover:from-indigo-100/50 hover:via-indigo-50/35"
                                : "bg-slate-50/30 hover:bg-slate-50/60"
                            }`}
                          >
                            {/* CATEGORY + CHECKBOX / STATIC */}
                            <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                              <div className="flex items-start gap-2">
                                {isSelectableGroup ? (
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleSubItem(index, sub)}
                                    className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                                  />
                                ) : null}

                                <div className="min-w-0 pt-0.5">
                                  <div
                                    className={`text-[11px] font-semibold uppercase tracking-wide ${
                                      checked || !isSelectableGroup
                                        ? "text-slate-600"
                                        : "text-slate-300"
                                    }`}
                                  >
                                    {sub.category || "—"}
                                  </div>
                                  <div
                                    className={`mt-0.5 text-[10px] ${
                                      checked || !isSelectableGroup
                                        ? "text-indigo-400"
                                        : "text-slate-300"
                                    }`}
                                  >
                                    {sub.uom || "Sub item"}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* SKU */}
                            <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                              <div className="flex min-h-[26px] items-center gap-2">
                                <div
                                  className={`h-5 w-[2px] rounded-full ${
                                    checked || !isSelectableGroup
                                      ? "bg-indigo-200"
                                      : "bg-slate-150"
                                  }`}
                                />
                                <span
                                  className={`whitespace-nowrap font-mono text-[11px] ${
                                    checked || !isSelectableGroup
                                      ? "text-slate-400"
                                      : "text-slate-300"
                                  }`}
                                >
                                  {sub.sku || "—"}
                                </span>
                              </div>
                            </td>

                            {/* DESCRIPTION */}
                            <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                              {isSelectableGroup ? (
                                <textarea
                                  rows={2}
                                  value={
                                    formItems[index].selectedSubItems.find(
                                      (s) => s.id === (sub.id || sub.itemId),
                                    )?.description ??
                                    sub.description ??
                                    ""
                                  }
                                  disabled={!checked}
                                  onChange={(e) =>
                                    updateSubItem(
                                      index,
                                      sub.id,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                  onBlur={() => autoSave(formItems)}
                                  className={`min-h-[68px] w-full resize-y rounded-xl border px-2 py-1.5 text-[12px] leading-5 outline-none transition-all duration-200 ${
                                    checked ? subInputEnabled : disabledInput
                                  }`}
                                  placeholder="Description…"
                                />
                              ) : (
                                <div className="min-h-[68px] whitespace-pre-wrap rounded-xl border border-transparent px-2 py-1.5 text-[12px] leading-5 text-slate-800">
                                  {sub.description || "—"}
                                </div>
                              )}
                            </td>

                            {/* QTY */}
                            <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                              {isSelectableGroup ? (
                                <input
                                  type="number"
                                  min="1"
                                  value={
                                    checked
                                      ? qty === 0
                                        ? ""
                                        : qty
                                      : sub.baseQty || 1
                                  }
                                  disabled={!checked}
                                  onChange={(e) =>
                                    updateSubItem(
                                      index,
                                      sub.id,
                                      "qty",
                                      e.target.value,
                                    )
                                  }
                                  onBlur={() => autoSave(formItems)}
                                  className={`h-9 w-full rounded-xl border px-2 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
                                    checked ? subInputEnabled : disabledInput
                                  }`}
                                />
                              ) : (
                                <div className="flex h-9 items-center justify-center rounded-xl px-2 text-[12px] font-medium text-slate-300">
                                  —
                                </div>
                              )}
                            </td>

                            {/* PRICE */}
                            <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                              {isSelectableGroup ? (
                                <input
                                  type="number"
                                  min="0"
                                  value={
                                    checked
                                      ? price === 0
                                        ? ""
                                        : price
                                      : sub.basePrice || 0
                                  }
                                  readOnly
                                  tabIndex={-1}
                                  className={`h-9 w-full rounded-xl border px-2 text-right text-[12px] font-medium tabular-nums outline-none ${
                                    checked
                                      ? "cursor-not-allowed border-slate-200/70 bg-slate-100/80 text-slate-500 shadow-inner"
                                      : disabledInput
                                  }`}
                                />
                              ) : (
                                <div className="flex h-9 items-center justify-center rounded-xl px-2 text-[12px] font-medium text-slate-300">
                                  —
                                </div>
                              )}
                            </td>

                            {/* DISCOUNT */}
                            <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                              {isSelectableGroup ? (
                                <div className="relative">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={
                                      checked
                                        ? Number.isFinite(discount)
                                          ? discount
                                          : ""
                                        : 0
                                    }
                                    disabled={!checked}
                                    onChange={(e) =>
                                      updateSubItem(
                                        index,
                                        sub.id,
                                        "discount",
                                        e.target.value,
                                      )
                                    }
                                    onBlur={() => autoSave(formItems)}
                                    className={`h-9 w-full rounded-xl border py-2 pl-2 pr-6 text-right text-[12px] tabular-nums outline-none transition-all duration-200 ${
                                      checked ? subInputEnabled : disabledInput
                                    }`}
                                  />
                                  {checked && (
                                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400">
                                      %
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <div className="flex h-9 items-center justify-center rounded-xl px-2 text-[12px] font-medium text-slate-300">
                                  —
                                </div>
                              )}
                            </td>

                            {/* LINE TOTAL */}
                            <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                              {isSelectableGroup ? (
                                <div
                                  className={`flex h-9 items-center justify-end rounded-xl px-3 text-[12px] font-bold tabular-nums transition-all duration-200 ${
                                    checked
                                      ? "bg-gradient-to-br from-emerald-50 to-teal-50/50 text-emerald-700 ring-1 ring-emerald-200/60 shadow-[0_2px_6px_rgba(16,185,129,0.08)]"
                                      : "bg-transparent text-slate-200"
                                  }`}
                                >
                                  {checked
                                    ? formatAmount(lineTotal)
                                    : formatAmount(0)}
                                </div>
                              ) : (
                                <div className="flex h-9 items-center justify-center rounded-xl px-3 text-[12px] font-bold tabular-nums text-slate-300">
                                  —
                                </div>
                              )}
                            </td>

                            {/* REMARKS */}
                            <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5">
                              {isSelectableGroup ? (
                                <textarea
                                  rows={2}
                                  value={
                                    formItems[index].selectedSubItems.find(
                                      (s) => s.id === (sub.id || sub.itemId),
                                    )?.remarks ?? ""
                                  }
                                  disabled={!checked}
                                  onChange={(e) =>
                                    updateSubItem(
                                      index,
                                      sub.id,
                                      "remarks",
                                      e.target.value,
                                    )
                                  }
                                  onBlur={() => autoSave(formItems)}
                                  className={`min-h-[50px] w-full resize-y rounded-xl border px-2 py-1.5 text-[12px] outline-none transition-all duration-200 ${
                                    checked ? subInputEnabled : disabledInput
                                  }`}
                                  placeholder="Notes…"
                                />
                              ) : (
                                <div className="flex min-h-[50px] items-center rounded-xl px-2.5 text-[12px] text-slate-300">
                                  —
                                </div>
                              )}
                            </td>

                            {/* DELETE */}
                            <td className="align-top whitespace-normal break-words border-b border-r border-slate-100/70 px-2 py-1.5 text-center last:border-r-0">
                              {isSelectableGroup && checked ? (
                                <button
                                  onClick={() => toggleSubItem(index, sub)}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100/50 text-rose-400 shadow-sm transition-all duration-150 hover:border-rose-200 hover:from-rose-100 hover:to-rose-200/60 hover:text-rose-600 hover:shadow-[0_4px_12px_rgba(239,68,68,0.15)] active:scale-95"
                                  aria-label="Remove sub item"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-200">
                                  —
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                    {/* GROUP TOTAL ROW */}
                    {isSelectableGroup &&
                      formItems[index]?.selectedSubItems?.length > 0 && (
                        <tr className="border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/80 via-indigo-50/40 to-slate-50/20">
                          <td colSpan={9} className="px-3 py-2.5.5">
                            <div className="flex items-center justify-center gap-4">
                              <div className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.32em] text-indigo-500">
                                GROUP TOTAL
                              </div>

                              <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100/90 via-indigo-100/70 to-violet-100/50 px-4 py-2 text-sm font-bold tabular-nums text-indigo-800 ring-1 ring-indigo-200/70 shadow-[0_4px_12px_rgba(99,102,241,0.14),inset_0_1px_0_rgba(255,255,255,0.6)]">
                                {formatAmount(
                                  (() => {
                                    const parentTotal =
                                      Number(row.qty || 1) *
                                      Number(row.price || 0) *
                                      (1 - Number(row.discount || 0) / 100);

                                    const subTotal = formItems[
                                      index
                                    ].selectedSubItems.reduce((sum, sub) => {
                                      const qty = Number(
                                        sub.qty || sub.baseQty || 1,
                                      );

                                      const price = Number(
                                        sub.price || sub.basePrice || 0,
                                      );

                                      const discount = Number(
                                        sub.discount || 0,
                                      );

                                      return (
                                        sum + qty * price * (1 - discount / 100)
                                      );
                                    }, 0);

                                    return parentTotal + subTotal;
                                  })(),
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                  </FragmentWrapper>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-100/80 bg-gradient-to-r from-slate-50/70 via-white/50 to-slate-50/30 px-3 py-2.5 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between gap-2.5 text-[11px] text-slate-400">
          <span>All values update automatically as you edit the rows.</span>
          <span className="hidden sm:inline">
            Only selected sub-items are editable.
          </span>
        </div>
      </div>
    </div>
  );
}

function FragmentWrapper({ children }) {
  return <>{children}</>;
}
