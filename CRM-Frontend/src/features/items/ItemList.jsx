// // src/features/items/ItemList.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchItems, deleteItem } from "./itemSlice";
// import { Package, Plus, Search, Trash2, Pencil, Eye } from "lucide-react";
// import { formatINR } from "../quotations/quotationUtils";

// export default function ItemList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { list, loading } = useSelector((state) => state.items);

//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     dispatch(fetchItems());
//   }, [dispatch]);

//   /* ================= FILTER ================= */
//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     if (!q) return list;

//     return list.filter(
//       (i) =>
//         i.name?.toLowerCase().includes(q) ||
//         i.sku?.toLowerCase().includes(q) ||
//         i.make?.toLowerCase().includes(q) ||
//         i.mfgPartNo?.toLowerCase().includes(q),
//     );
//   }, [list, search]);

//   /* ================= STATS ================= */
//   const stats = useMemo(() => {
//     const total = list.length;

//     const totalValue = list.reduce(
//       (sum, i) => sum + Number(i.basePrice || 0),
//       0,
//     );

//     const avg = total > 0 ? totalValue / total : 0;

//     return { total, totalValue, avg };
//   }, [list]);

//   /* ================= DELETE ================= */
//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this item?")) return;
//     dispatch(deleteItem(id));
//   };

//   return (
//     <div className="p-4 sm:p-6 space-y-5 bg-slate-50 min-h-[calc(100vh-64px)]">
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Items</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Manage your product master data used in quotations.
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* SEARCH */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by name or SKU"
//               className="w-full sm:w-[260px] rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
//             />
//           </div>

//           {/* ADD BUTTON */}
//           <button
//             onClick={() => navigate("/items/new")}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
//           >
//             <Plus size={16} />
//             Add Item
//           </button>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <StatCard label="Total Items" value={stats.total} />
//         <StatCard label="Total Value" value={formatINR(stats.totalValue)} />
//         <StatCard label="Average Price" value={formatINR(stats.avg)} />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="px-5 py-4 border-b border-slate-100">
//           <h2 className="font-semibold text-slate-900">Item List</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-slate-50 text-slate-600">
//               <tr>
//                 <th className="text-left p-4 font-semibold">Item</th>
//                 <th className="text-left p-4 font-semibold">SKU</th>

//                 {/* 🔥 NEW */}
//                 <th className="text-left p-4 font-semibold">Make</th>
//                 <th className="text-left p-4 font-semibold">Mfg PN</th>
//                 <th className="text-left p-4 font-semibold">UOM</th>

//                 <th className="text-right p-4 font-semibold">Price</th>
//                 <th className="text-center p-4 font-semibold">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading && (
//                 <tr>
//                   <td colSpan={7} className="p-6 text-center text-slate-500">
//                     Loading...
//                   </td>
//                 </tr>
//               )}

//               {!loading &&
//                 filtered.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="border-t border-slate-100 hover:bg-indigo-50/40 transition"
//                   >
//                     <td className="p-4">
//                       <div className="font-semibold text-slate-900 flex items-center gap-2">
//                         <Package className="w-4 h-4 text-slate-400" />
//                         {item.name}
//                       </div>
//                       <div className="text-xs text-slate-400 mt-0.5 space-x-2">
//                         {item.description || "-"}
//                         {item.uom && <span>• {item.uom}</span>}
//                       </div>
//                     </td>

//                     <td className="p-4 text-slate-600">{item.sku}</td>

//                     {/* 🔥 NEW */}
//                     <td className="p-4 text-slate-600">{item.make || "-"}</td>
//                     <td className="p-4 text-slate-600">
//                       {item.mfgPartNo || "-"}
//                     </td>
//                     <td className="p-4 text-slate-600">{item.uom || "-"}</td>

//                     <td className="p-4 text-right font-semibold text-slate-900">
//                       {formatINR(item.basePrice || 0)}
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center justify-center gap-3">
//                         <button
//                           onClick={() => navigate(`/items/${item.id}`)}
//                           className="text-indigo-600 hover:underline flex items-center gap-1"
//                         >
//                           <Eye size={14} />
//                           View
//                         </button>

//                         <button
//                           onClick={() => navigate(`/items/${item.id}/edit`)}
//                           className="text-emerald-600 hover:underline flex items-center gap-1"
//                         >
//                           <Pencil size={14} />
//                           Edit
//                         </button>

//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="text-rose-600 hover:underline flex items-center gap-1"
//                         >
//                           <Trash2 size={14} />
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}

//               {!loading && filtered.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="p-12 text-center text-slate-500">
//                     No items found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= HELPERS ================= */

// function StatCard({ label, value }) {
//   return (
//     <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
//       <div className="text-xs text-slate-500">{label}</div>
//       <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
//     </div>
//   );
// }

// // src/features/items/ItemList.jsx

// import { Fragment, useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchItems, deleteItem, createItem, buildItemTree } from "./itemSlice";
// import * as XLSX from "xlsx";
// import {
//   Package,
//   Plus,
//   Search,
//   Trash2,
//   Pencil,
//   Eye,
//   TrendingUp,
//   Layers,
//   DollarSign,
//   Filter,
//   Download,
//   RefreshCw,
//   X,
//   Tag,
//   Wrench,
//   Hash,
//   Ruler,
// } from "lucide-react";
// import { formatINR } from "../quotations/quotationUtils";

// export default function ItemList() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { list, loading } = useSelector((state) => state.items);

//   const [search, setSearch] = useState("");
//   const [viewMode, setViewMode] = useState("table"); // table or grid

//   const [expandedIds, setExpandedIds] = useState({});

//   const toggleRow = (id) => {
//     setExpandedIds((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   useEffect(() => {
//     dispatch(fetchItems());
//   }, [dispatch]);

//   /* ================= FILTER ================= */
//   const filtered = useMemo(() => {
//     // const tree = buildItemTree(list);
//     const tree = list;
//     const q = search.toLowerCase().trim();

//     const matches = (item) =>
//       item.name?.toLowerCase().includes(q) ||
//       item.sku?.toLowerCase().includes(q) ||
//       item.category?.toLowerCase().includes(q) ||
//       item.make?.toLowerCase().includes(q) ||
//       item.mfgPartNo?.toLowerCase().includes(q);

//     const filterTree = (nodes) =>
//       nodes
//         .map((node) => {
//           const children = filterTree(node.children || []);
//           const selfMatch = !q || matches(node);

//           if (selfMatch || children.length) {
//             return {
//               ...node,
//               children,
//             };
//           }
//           return null;
//         })
//         .filter(Boolean);

//     return q ? filterTree(tree) : tree;
//   }, [list, search]);

//   const handleImport = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];

//     // Read as array rows so blank first column is handled correctly
//     const rows = XLSX.utils.sheet_to_json(sheet, {
//       header: 1,
//       defval: "",
//       blankrows: false,
//     });

//     console.log("📄 RAW ROWS:", rows);

//     if (!rows.length) {
//       alert("Excel file is empty");
//       return;
//     }

//     const dataRows = rows.slice(1); // skip header row
//     let currentParentId = null;

//     for (const row of dataRows) {
//       try {
//         const number = String(row[0] ?? "").trim();
//         const category = String(row[1] ?? "").trim();
//         const sku = String(row[2] ?? "").trim();
//         const description = String(row[3] ?? "").trim();
//         const make = String(row[4] ?? "").trim();
//         const mfgPartNo = String(row[5] ?? "").trim();
//         const uom = String(row[7] ?? "").trim();
//         const unitPrice = row[8] ?? row[9] ?? null;

//         if (!number && !category && !sku && !description) continue;

//         if (number) {
//           const created = await dispatch(
//             createItem({
//               name: category || description,
//               sku: sku || null,
//               category: category || null,
//               description: description || null,
//               make: make || null,
//               mfgPartNo: mfgPartNo || null,
//               uom: uom || null,
//               basePrice: unitPrice !== null ? Number(unitPrice) : null,
//             }),
//           ).unwrap();

//           currentParentId = created.id;
//           continue;
//         }

//         if (description && currentParentId) {
//           await dispatch(
//             createItem({
//               name: description,
//               sku: sku || null,
//               category: category || null,
//               parentId: currentParentId,
//               description: description || null,
//               make: make || null,
//               mfgPartNo: mfgPartNo || null,
//               uom: uom || null,
//               basePrice: unitPrice !== null ? Number(unitPrice) : null,
//             }),
//           ).unwrap();
//         }
//       } catch (err) {
//         console.error("Import row failed:", row, err);
//         continue;
//       }
//     }

//     alert("Import completed");
//     dispatch(fetchItems());
//   };

//   /* ================= STATS ================= */
//   const stats = useMemo(() => {
//     const total = list.length;

//     const totalValue = list.reduce(
//       (sum, i) => sum + Number(i.basePrice || 0),
//       0,
//     );

//     const avg = total > 0 ? totalValue / total : 0;

//     return { total, totalValue, avg };
//   }, [list]);

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this item and ALL its children?")) return;

//     await dispatch(deleteItem(id)).unwrap();

//     // ✅ refresh list (ensures tree rebuilds clean)
//     dispatch(fetchItems());

//     // ✅ reset expanded rows (avoid broken UI)
//     setExpandedIds({});
//   };

//   const handleRefresh = () => {
//     dispatch(fetchItems());
//   };

//   const renderRows = (items, level = 0) =>
//     items.map((item) => (
//       <Fragment key={`${item.id}-${level}`}>
//         <tr className="hover:bg-indigo-50/50 transition-colors group">
//           <td className="p-4">
//             <div
//               className="flex items-start gap-3"
//               style={{ paddingLeft: `${level * 24}px` }}
//             >
//               {item.children?.length > 0 ? (
//                 <button
//                   onClick={() => toggleRow(item.id)}
//                   className="mt-1 w-5 h-5 flex items-center justify-center rounded bg-slate-100 text-slate-600 text-xs"
//                   title="Expand / collapse"
//                 >
//                   {expandedIds[item.id] ? "▾" : "▸"}
//                 </button>
//               ) : (
//                 <div className="w-5 h-5 mt-1" />
//               )}

//               <div>
//                 <div className="font-bold text-slate-900 mb-1">{item.name}</div>
//                 {item.description && (
//                   <div className="text-xs text-slate-500 line-clamp-2 max-w-xs">
//                     {item.description}
//                   </div>
//                 )}
//                 {item.category && (
//                   <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs">
//                     <Layers className="w-3 h-3" />
//                     {item.category}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </td>

//           <td className="p-4">
//             {item.sku ? (
//               <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
//                 <Tag className="w-3 h-3" />
//                 {item.sku}
//               </div>
//             ) : (
//               <span className="text-slate-400 text-xs">-</span>
//             )}
//           </td>

//           <td className="p-4">
//             {item.category ? (
//               <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
//                 <Layers className="w-3 h-3" />
//                 {item.category}
//               </div>
//             ) : (
//               <span className="text-slate-400 text-xs">-</span>
//             )}
//           </td>

//           <td className="p-4">
//             {item.make ? (
//               <div className="flex items-center gap-1.5 text-slate-700">
//                 <Wrench className="w-3.5 h-3.5 text-slate-400" />
//                 <span className="font-medium">{item.make}</span>
//               </div>
//             ) : (
//               <span className="text-slate-400 text-xs">-</span>
//             )}
//           </td>

//           <td className="p-4">
//             {item.mfgPartNo ? (
//               <div className="flex items-center gap-1.5 text-slate-700">
//                 <Hash className="w-3.5 h-3.5 text-slate-400" />
//                 <span className="font-medium font-mono text-xs">
//                   {item.mfgPartNo}
//                 </span>
//               </div>
//             ) : (
//               <span className="text-slate-400 text-xs">-</span>
//             )}
//           </td>

//           <td className="p-4">
//             {item.uom ? (
//               <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
//                 <Ruler className="w-3 h-3" />
//                 {item.uom}
//               </div>
//             ) : (
//               <span className="text-slate-400 text-xs">-</span>
//             )}
//           </td>

//           <td className="p-4 text-right">
//             <div className="font-bold text-slate-900 text-base">
//               {formatINR(item.basePrice || 0)}
//             </div>
//           </td>

//           <td className="p-4">
//             <div className="flex items-center justify-center gap-1">
//               <button
//                 onClick={() => navigate(`/items/${item.id}`)}
//                 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 font-medium text-xs transition"
//               >
//                 <Eye className="w-3.5 h-3.5" />
//                 View
//               </button>
//               <button
//                 onClick={() => navigate(`/items/${item.id}/edit`)}
//                 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 font-medium text-xs transition"
//               >
//                 <Pencil className="w-3.5 h-3.5" />
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(item.id)}
//                 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-medium text-xs transition"
//               >
//                 <Trash2 className="w-3.5 h-3.5" />
//                 Delete
//               </button>
//             </div>
//           </td>
//         </tr>

//         {expandedIds[item.id] && item.children?.length > 0
//           ? renderRows(item.children, level + 1)
//           : null}
//       </Fragment>
//     ));

//   return (
//     <div className="p-4 sm:p-6 space-y-6 bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/20 min-h-[calc(100vh-64px)]">
//       {/* HEADER */}
//       <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
//         <div>
//           <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//             <Package className="w-4 h-4" />
//             Inventory Management
//           </div>
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">
//             Item Master
//           </h1>
//           <p className="text-sm text-slate-600 max-w-2xl">
//             Manage your product catalog and master data used across quotations
//             and orders.
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* SEARCH */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search items..."
//               className="w-full sm:w-[280px] rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 shadow-sm transition"
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="flex gap-2">
//             <button
//               onClick={handleRefresh}
//               disabled={loading}
//               className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm disabled:opacity-50 transition-all"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//               />
//               <span className="hidden sm:inline">Refresh</span>
//             </button>

//             <input
//               type="file"
//               accept=".xlsx, .xls"
//               onChange={handleImport}
//               className="hidden"
//               id="excel-upload"
//             />

//             <label
//               htmlFor="excel-upload"
//               className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm cursor-pointer transition-all"
//             >
//               <Download className="w-4 h-4" />
//               Import Excel
//             </label>

//             <button
//               onClick={() => navigate("/items/new")}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-sm font-bold text-white hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
//             >
//               <Plus className="w-4 h-4" />
//               Add Item
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <StatCard
//           icon={<Layers className="w-5 h-5" />}
//           label="Total Items"
//           value={stats.total}
//           color="indigo"
//           subtext={`${filtered.length} shown`}
//         />
//         <StatCard
//           icon={<DollarSign className="w-5 h-5" />}
//           label="Total Inventory Value"
//           value={formatINR(stats.totalValue)}
//           color="emerald"
//           subtext="Combined base prices"
//         />
//         <StatCard
//           icon={<TrendingUp className="w-5 h-5" />}
//           label="Average Price"
//           value={formatINR(stats.avg)}
//           color="amber"
//           subtext="Per item"
//         />
//       </div>

//       {/* TABLE CARD */}
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//         {/* TABLE HEADER */}
//         <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
//           <div>
//             <h2 className="font-bold text-slate-900 text-lg">Items Catalog</h2>
//             <p className="text-sm text-slate-500 mt-0.5">
//               {filtered.length} {filtered.length === 1 ? "item" : "items"}
//               {search && " matching your search"}
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
//               <Filter className="w-3.5 h-3.5" />
//               Filter
//             </button>
//             <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
//               <Download className="w-3.5 h-3.5" />
//               Export
//             </button>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
//               <tr>
//                 <th className="text-left p-4 font-bold text-xs uppercase tracking-wider">
//                   Item Details
//                 </th>
//                 <th className="text-left p-4 font-bold text-xs uppercase tracking-wider">
//                   SKU
//                 </th>
//                 <th className="text-left p-4 font-bold text-xs uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="text-left p-4 font-bold text-xs uppercase tracking-wider">
//                   Make
//                 </th>
//                 <th className="text-left p-4 font-bold text-xs uppercase tracking-wider">
//                   Mfg Part No
//                 </th>
//                 <th className="text-left p-4 font-bold text-xs uppercase tracking-wider">
//                   UOM
//                 </th>
//                 <th className="text-right p-4 font-bold text-xs uppercase tracking-wider">
//                   Base Price
//                 </th>
//                 <th className="text-center p-4 font-bold text-xs uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">
//               {/* LOADING */}
//               {loading && (
//                 <tr>
//                   <td colSpan={8} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
//                       <p className="text-slate-500 font-medium">
//                         Loading items...
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}

//               {/* ✅ TREE RENDER (MAIN FIX) */}
//               {!loading && filtered?.length > 0 && renderRows(filtered)}

//               {/* EMPTY STATE */}
//               {!loading && filtered.length === 0 && (
//                 <tr>
//                   <td colSpan={8} className="p-12">
//                     <div className="flex flex-col items-center gap-4 text-center">
//                       <div className="p-4 rounded-2xl bg-slate-100">
//                         <Package className="w-12 h-12 text-slate-400" />
//                       </div>

//                       <div>
//                         <h3 className="font-bold text-slate-900 text-lg mb-1">
//                           {search ? "No items found" : "No items yet"}
//                         </h3>

//                         <p className="text-slate-500 text-sm mb-4">
//                           {search
//                             ? "Try adjusting your search terms"
//                             : "Get started by creating your first item"}
//                         </p>

//                         {!search && (
//                           <button
//                             onClick={() => navigate("/items/new")}
//                             className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm transition"
//                           >
//                             <Plus className="w-4 h-4" />
//                             Add First Item
//                           </button>
//                         )}

//                         {search && (
//                           <button
//                             onClick={() => setSearch("")}
//                             className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition"
//                           >
//                             <X className="w-4 h-4" />
//                             Clear Search
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* TABLE FOOTER */}
//         {!loading && filtered.length > 0 && (
//           <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
//             <div className="flex items-center justify-between text-sm">
//               <div className="text-slate-600">
//                 Showing{" "}
//                 <span className="font-semibold text-slate-900">
//                   {filtered.length}
//                 </span>{" "}
//                 of{" "}
//                 <span className="font-semibold text-slate-900">
//                   {list.length}
//                 </span>{" "}
//                 items
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-slate-500 text-xs">Per page:</span>
//                 <select className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20">
//                   <option>10</option>
//                   <option>25</option>
//                   <option>50</option>
//                   <option>100</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function StatCard({ icon, label, value, color = "indigo", subtext }) {
//   const colorClasses = {
//     indigo: "from-indigo-500 to-indigo-600 shadow-indigo-500/30",
//     emerald: "from-emerald-500 to-emerald-600 shadow-emerald-500/30",
//     amber: "from-amber-500 to-amber-600 shadow-amber-500/30",
//   };

//   return (
//     <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
//       <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
//         <div
//           className={`w-full h-full bg-gradient-to-br ${colorClasses[color]} blur-2xl`}
//         ></div>
//       </div>

//       <div className="relative p-5">
//         <div className="flex items-start justify-between mb-3">
//           <div
//             className={`p-2.5 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg ${colorClasses[color].split(" ")[1]}`}
//           >
//             {icon}
//           </div>
//         </div>

//         <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
//           {label}
//         </div>
//         <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
//         {subtext && <div className="text-xs text-slate-500">{subtext}</div>}
//       </div>
//     </div>
//   );
// }

// src/features/items/ItemList.jsx

import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchItems, deleteItem, importItems } from "./itemSlice";
import {
  Package,
  Plus,
  Search,
  Trash2,
  Pencil,
  Eye,
  TrendingUp,
  Layers,
  DollarSign,
  Filter,
  Download,
  RefreshCw,
  X,
  Tag,
  Wrench,
  Hash,
  Ruler,
  ChevronRight,
  ChevronDown,
  Upload,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import { formatINR } from "../quotations/quotationUtils";

export default function ItemList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth); // ⚠️ adjust if needed
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [expandedIds, setExpandedIds] = useState({});
  const [showImportModal, setShowImportModal] = useState(false);
  const [importCategory, setImportCategory] = useState("");
  const [importType, setImportType] = useState("flat");
  const [importFile, setImportFile] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (cat) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const toggleRow = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    const tree = list;
    const q = search.toLowerCase().trim();
    const cat = selectedCategory.trim();

    const matchesSearch = (item) =>
      item.name?.toLowerCase().includes(q) ||
      item.sku?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.make?.toLowerCase().includes(q) ||
      item.mfgPartNo?.toLowerCase().includes(q);

    const filterTree = (nodes) =>
      nodes
        .map((node) => {
          const children = filterTree(node.children || []);

          const selfSearchMatch = !q || matchesSearch(node);

          const selfCategoryMatch =
            !cat || cat === "All Categories" || node.category === cat;

          const hasChildMatch = children.length > 0;

          // 🔥 KEY LOGIC
          if (
            (selfSearchMatch && selfCategoryMatch) || // self matches
            hasChildMatch // OR child matches
          ) {
            return {
              ...node,
              // 🔥 if parent matches category → keep ALL children
              children:
                selfCategoryMatch && (!cat || cat === node.category)
                  ? node.children || []
                  : children,
            };
          }

          return null;
        })
        .filter(Boolean);

    return filterTree(tree);
  }, [list, search, selectedCategory]);

  const categoryOptions = useMemo(() => {
    const unique = new Set();

    list.forEach((item) => {
      if (item.category) unique.add(item.category);
    });

    return ["All Categories", ...Array.from(unique).sort()];
  }, [list]);
  /* ================= GROUP BY CATEGORY ================= */
  const groupedByCategory = useMemo(() => {
    const map = {};

    filtered.forEach((item) => {
      const cat = item.category || "Uncategorized";

      if (!map[cat]) {
        map[cat] = [];
      }

      map[cat].push(item);
    });

    return map;
  }, [filtered]);

  /* ================= STATS ================= */
  const stats = useMemo(() => {
    const total = list.length;
    const totalValue = list.reduce(
      (sum, i) => sum + Number(i.basePrice || 0),
      0,
    );
    const avg = total > 0 ? totalValue / total : 0;

    return { total, totalValue, avg };
  }, [list]);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item and ALL its children?")) return;
    await dispatch(deleteItem(id)).unwrap();
    dispatch(fetchItems());
    setExpandedIds({});
  };

  const handleRefresh = () => {
    dispatch(fetchItems());
  };

  // 🔥 ADD THIS
  const getTotalPrice = (item) => {
    const self = Number(item.basePrice || 0);

    if (!item.children || item.children.length === 0) {
      return self;
    }

    return (
      self +
      item.children.reduce((sum, child) => {
        return sum + getTotalPrice(child);
      }, 0)
    );
  };

  const renderRows = (items, level = 0) =>
    items.map((item) => (
      <Fragment key={`${item.id}-${level}`}>
        <tr
          className="group border-b border-slate-50 transition-all duration-150"
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #eef2ff 0%, #f8fafc 100%)";
            e.currentTarget.style.boxShadow = "inset 3px 0 0 #6366f1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <td className="p-4">
            <div
              className="flex items-start gap-3"
              style={{ paddingLeft: `${level * 28}px` }}
            >
              {item.children?.length > 0 ? (
                <button
                  onClick={() => toggleRow(item.id)}
                  className="mt-1 w-6 h-6 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 transition-all duration-200 shadow-sm hover:shadow"
                  title={expandedIds[item.id] ? "Collapse" : "Expand"}
                >
                  {expandedIds[item.id] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <div className="w-6 h-6 mt-1" />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    {item.name}
                  </h3>
                  {/* {level > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-xs font-semibold">
                      Child
                    </span>
                  )} */}
                </div>

                {/* {item.description && (
                  <p className="text-sm text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                    {item.description}
                  </p>
                )} */}

                {item.category && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
                    {/* <Layers className="w-3 h-3" /> */}
                    {item.category}
                  </div>
                )}
              </div>
            </div>
          </td>

          <td className="p-4">
            {item.sku ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-200">
                {/* <Tag className="w-3.5 h-3.5 text-slate-500" /> */}
                {item.sku}
              </div>
            ) : (
              <span className="text-slate-400 text-sm">—</span>
            )}
          </td>

          <td className="p-4">
            {item.category ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                {/* <Layers className="w-3.5 h-3.5" /> */}
                {item.category}
              </div>
            ) : (
              <span className="text-slate-400 text-sm">—</span>
            )}
          </td>

          <td className="p-4">
            {item.make ? (
              <div className="flex items-center gap-2">
                {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200">
                  <Wrench className="w-4 h-4 text-slate-600" />
                </div> */}
                <span className="font-semibold text-slate-900">
                  {item.make}
                </span>
              </div>
            ) : (
              <span className="text-slate-400 text-sm">—</span>
            )}
          </td>

          <td className="p-4">
            {item.mfgPartNo ? (
              <div className="flex items-center gap-2">
                {/* <Hash className="w-4 h-4 text-slate-400" /> */}
                <code className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-900 text-xs font-mono font-bold border border-slate-200">
                  {item.mfgPartNo}
                </code>
              </div>
            ) : (
              <span className="text-slate-400 text-sm">—</span>
            )}
          </td>

          <td className="p-4">
            {item.uom ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                {/* <Ruler className="w-3.5 h-3.5" /> */}
                {item.uom}
              </div>
            ) : (
              <span className="text-slate-400 text-sm">—</span>
            )}
          </td>

          <td className="p-4 text-right">
            <div className="font-bold text-slate-900 text-base">
              {formatINR(item.basePrice || 0)}
            </div>
          </td>

          <td className="p-4 text-right">
            <div className="text-sm font-semibold text-indigo-600">
              {formatINR(
                item.children?.length > 0
                  ? getTotalPrice(item)
                  : item.basePrice || 0,
              )}
            </div>
          </td>

          <td className="p-4">
            <div className="flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => navigate(`/items/${item.id}`)}
                className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate(`/items/${item.id}/edit`)}
                className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-100 transition-colors"
                title="Edit Item"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => isAdmin && handleDelete(item.id)}
                disabled={!isAdmin}
                className={`p-2 rounded-lg transition-colors ${
                  isAdmin
                    ? "text-rose-600 hover:bg-rose-100"
                    : "text-slate-300 cursor-not-allowed"
                }`}
                title={isAdmin ? "Delete Item" : "Only admin can delete"}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>

        {expandedIds[item.id] &&
          item.children?.length > 0 &&
          renderRows(item.children, level + 1)}
      </Fragment>
    ));

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(145deg, #f0f4ff 0%, #f8fafc 40%, #eef2ff 100%)",
      }}
    >
      <div className="max-w-[1800px] mx-auto px-5 py-5 space-y-4">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-[24px] border border-indigo-100 bg-white px-6 py-4 shadow-[0_8px_32px_rgba(99,102,241,0.10)]">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-white flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 6px 16px rgba(99,102,241,0.35)",
              }}
            >
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                Inventory Management
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                Item Master
              </h1>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search items..."
                className="w-full sm:w-[320px] rounded-xl border-2 border-slate-200 bg-white pl-11 pr-11 py-3 text-sm outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 shadow-sm transition-all placeholder:text-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
              {/* ===== IMPORT CONTROLS ===== */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-bold text-white hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all"
                >
                  <Upload className="w-4 h-4" />
                  Import
                </button>

                {/* <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Refresh"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                  <span className="hidden sm:inline">Refresh</span>
                </button> */}

                <button
                  onClick={() => navigate("/items/new")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-sm font-bold text-white hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Item</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatCard
            icon={<Layers className="w-5 h-5" />}
            label="Total Items"
            value={stats.total}
            color="indigo"
            subtext={`${filtered.length} shown`}
          />
          <StatCard
            icon={<DollarSign className="w-5 h-5" />}
            label="Total Inventory Value"
            value={formatINR(stats.totalValue)}
            color="emerald"
            subtext="Combined base prices"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Average Price"
            value={formatINR(stats.avg)}
            color="amber"
            subtext="Per item"
          />
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="flex h-[calc(100vh-280px)] min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(99,102,241,0.08)]">
          {/* TOP BAR */}
          <div
            className="border-b border-indigo-100 px-5 py-4 sm:px-6"
            style={{
              background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
            }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-900 sm:text-[22px]">
                  Items Catalog
                </h2>

                <p className="text-sm text-slate-600">
                  {filtered.length === list.length ? (
                    <>
                      <span className="font-bold text-slate-900">
                        {filtered.length}
                      </span>{" "}
                      total items
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-indigo-600">
                        {filtered.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-slate-900">
                        {list.length}
                      </span>{" "}
                      items{search && " matching your search"}
                    </>
                  )}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 shadow-sm">
                  <Filter className="h-3.5 w-3.5 text-slate-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {categoryOptions.map((cat) => (
                      <option
                        key={cat}
                        value={cat === "All Categories" ? "" : cat}
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear
                  </button>
                )}

                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50">
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* TABLE AREA */}
          <div className="flex-1 overflow-auto">
            <table className="min-w-full border-separate border-spacing-0 text-sm">
              <thead className="sticky top-0 z-20">
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
                  }}
                >
                  <th className="sticky top-0 z-20 w-[28%] border-b border-indigo-100 px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.24em] text-indigo-400">
                    Item Details
                  </th>
                  <th className="sticky top-0 z-20 w-[12%] border-b border-indigo-100 px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.24em] text-indigo-400">
                    SKU
                  </th>
                  <th className="sticky top-0 z-20 w-[14%] border-b border-indigo-100 px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.24em] text-indigo-400">
                    Category
                  </th>
                  <th className="sticky top-0 z-20 w-[12%] border-b border-indigo-100 px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.24em] text-indigo-400">
                    Make
                  </th>
                  <th className="sticky top-0 z-20 w-[14%] border-b border-indigo-100 px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.24em] text-indigo-400">
                    Mfg Part No
                  </th>
                  <th className="sticky top-0 z-20 w-[8%] border-b border-indigo-100 px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.24em] text-indigo-400">
                    UOM
                  </th>
                  <th className="sticky top-0 z-20 w-[10%] border-b border-indigo-100 px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.24em] text-indigo-400">
                    Base Price
                  </th>
                  <th className="sticky top-0 z-20 w-[10%] border-b border-indigo-100 px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.24em] text-indigo-400">
                    Total Price
                  </th>
                  <th className="sticky top-0 z-20 w-[6%] border-b border-indigo-100 px-5 py-4 text-center text-[10px] font-black uppercase tracking-[0.24em] text-indigo-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {/* LOADING */}
                {loading && (
                  <tr>
                    <td colSpan={9} className="px-6 py-20">
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
                          <Package className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-indigo-600" />
                        </div>
                        <p className="text-lg font-semibold text-slate-600">
                          Loading items...
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {/* GROUPED ROWS */}
                {!loading &&
                  Object.entries(groupedByCategory).map(([category, items]) => {
                    const isOpen = expandedCategories[category] ?? true;

                    const totalValue = items.reduce(
                      (sum, i) => sum + getTotalPrice(i),
                      0,
                    );

                    return (
                      <Fragment key={category}>
                        {/* CATEGORY HEADER */}
                        <tr
                          className="group cursor-pointer border-b border-indigo-100 bg-indigo-50/60 transition-colors hover:bg-indigo-100/80"
                          onClick={() => toggleCategory(category)}
                        >
                          <td colSpan={9} className="px-4 py-3 sm:px-5">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-indigo-100">
                                  {isOpen ? (
                                    <ChevronDown className="h-4 w-4 text-indigo-600" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-indigo-600" />
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-indigo-700">
                                    {category}
                                  </span>
                                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200">
                                    {items.length} items
                                  </span>
                                </div>
                              </div>

                              <div className="text-sm font-bold text-indigo-700">
                                {formatINR(totalValue)}
                              </div>
                            </div>
                          </td>
                        </tr>

                        {/* CATEGORY ITEMS */}
                        {isOpen && renderRows(items)}
                      </Fragment>
                    );
                  })}

                {/* EMPTY STATE */}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-20">
                      <div className="flex flex-col items-center gap-6 text-center">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 blur-2xl opacity-40" />
                          <div className="relative rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                            {search ? (
                              <AlertCircle className="h-16 w-16 text-slate-400" />
                            ) : (
                              <Package className="h-16 w-16 text-slate-400" />
                            )}
                          </div>
                        </div>

                        <div className="max-w-md space-y-2">
                          <h3 className="text-2xl font-bold text-slate-900">
                            {search ? "No items found" : "No items yet"}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {search
                              ? "Try adjusting your search terms to find what you're looking for."
                              : "Get started by creating your first item in the catalog."}
                          </p>
                        </div>

                        {!search ? (
                          <button
                            onClick={() => navigate("/items/new")}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-700 hover:to-indigo-800 hover:shadow-xl"
                          >
                            <Plus className="h-5 w-5" />
                            Add First Item
                          </button>
                        ) : (
                          <button
                            onClick={() => setSearch("")}
                            className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow"
                          >
                            <X className="h-4 w-4" />
                            Clear Search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          {!loading && filtered.length > 0 && (
            <div
              className="border-t border-indigo-100 px-5 py-3.5 sm:px-6"
              style={{
                background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-bold text-slate-900">
                    {filtered.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-900">
                    {list.length}
                  </span>{" "}
                  items
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-600">
                    Per page:
                  </span>
                  <select className="cursor-pointer rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-[24px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Import Items
                </h2>
                <p className="text-sm text-slate-500">
                  Select category, choose import type, then upload the Excel
                  file.
                </p>
              </div>

              <button
                onClick={() => setShowImportModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <select
                    value={importCategory}
                    onChange={(e) => setImportCategory(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Application Software">
                      Application Software
                    </option>
                    <option value="Test Platform">Test Platform</option>
                    <option value="Fixture & Adapter">Fixture & Adapter</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Import Type
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  <select
                    value={importType}
                    onChange={(e) => setImportType(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                  >
                    <option value="flat">Simple list</option>
                    <option value="grouped">Grouped items</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Excel File
                </label>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!importFile || !importCategory) {
                    alert("Select category and file");
                    return;
                  }

                  try {
                    console.log("📤 UPLOAD:", {
                      category: importCategory,
                      importType,
                      file: importFile.name,
                    });

                    await dispatch(
                      importItems({
                        file: importFile,
                        category: importCategory,
                        importType,
                      }),
                    ).unwrap();

                    setShowImportModal(false);
                    setImportFile(null);
                    setImportCategory("");
                    setImportType("flat");

                    dispatch(fetchItems());
                  } catch (err) {
                    console.error(err);
                    alert("Import failed");
                  }
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ icon, label, value, color = "indigo", subtext }) {
  const colorMap = {
    indigo: {
      from: "#6366f1",
      to: "#4f46e5",
      shadow: "rgba(99,102,241,0.28)",
      light: "#eef2ff",
      text: "#4338ca",
    },
    emerald: {
      from: "#10b981",
      to: "#059669",
      shadow: "rgba(16,185,129,0.28)",
      light: "#ecfdf5",
      text: "#065f46",
    },
    amber: {
      from: "#f59e0b",
      to: "#d97706",
      shadow: "rgba(245,158,11,0.28)",
      light: "#fffbeb",
      text: "#92400e",
    },
  };
  const c = colorMap[color];

  return (
    <div className="flex items-center gap-4 rounded-[18px] border border-slate-100 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-2xl text-white flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
          boxShadow: `0 6px 16px ${c.shadow}`,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
          {label}
        </div>
        <div className="mt-0.5 text-xl font-black tracking-tight text-slate-900 truncate">
          {value}
        </div>
        {subtext && (
          <div
            className="text-[10px] font-semibold mt-0.5"
            style={{ color: c.text }}
          >
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
