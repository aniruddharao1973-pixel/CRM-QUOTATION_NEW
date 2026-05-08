// // src/features/quotations/QuotationList.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Plus,
//   FileText,
//   Search,
//   BadgeCheck,
//   Clock3,
//   Trash2,
// } from "lucide-react";
// import { fetchQuotations, deleteQuotation } from "./quotationSlice";
// import { formatINR } from "./quotationUtils";

// export default function QuotationList() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { list, loading } = useSelector((state) => state.quotation);

//   const [search, setSearch] = useState("");

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     dispatch(fetchQuotations());
//   }, [dispatch]);

//   const handleDelete = async (id, e) => {
//     e.stopPropagation(); // 🔥 VERY IMPORTANT (prevents row click navigation)

//     const confirmDelete = window.confirm("Delete this quotation?");
//     if (!confirmDelete) return;

//     try {
//       await dispatch(deleteQuotation(id)).unwrap();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete");
//     }
//   };

//   /* ================= FILTER ================= */
//   const quotations = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return list || [];

//     return (list || []).filter((x) => {
//       return (
//         x.quotationNo?.toLowerCase().includes(q) ||
//         x.account?.accountName?.toLowerCase().includes(q) ||
//         x.status?.toLowerCase().includes(q)
//       );
//     });
//   }, [search, list]);

//   /* ================= STATS ================= */
//   const stats = useMemo(() => {
//     const total = quotations.length;
//     const draft = quotations.filter((q) => q.status === "DRAFT").length;
//     const sent = quotations.filter((q) => q.status === "SENT").length;

//     const value = quotations.reduce(
//       (sum, q) => sum + Number(q.grandTotal || 0),
//       0,
//     );

//     return { total, draft, sent, value };
//   }, [quotations]);

//   /* ================= UI ================= */
//   return (
//     <div className="p-4 sm:p-6 space-y-6 bg-slate-50 min-h-[calc(100vh-64px)]">
//       {/* ================= HEADER ================= */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Quotation Hub</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Manage quotations with centralized GST calculation and totals
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* SEARCH */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search quotation, account..."
//               className="w-full sm:w-[320px] rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
//             />
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={() => navigate("/quotations/new")}
//             className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
//           >
//             <Plus size={16} />
//             New Quotation
//           </button>
//         </div>
//       </div>

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard label="Total" value={stats.total} icon={<FileText />} />
//         <StatCard label="Draft" value={stats.draft} icon={<Clock3 />} />
//         <StatCard label="Sent" value={stats.sent} icon={<BadgeCheck />} />
//         <StatCard
//           label="Pipeline Value"
//           value={formatINR(stats.value)}
//           icon={<FileText />}
//         />
//       </div>

//       {/* ================= TABLE ================= */}
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="px-5 py-4 border-b border-slate-100">
//           <h2 className="font-semibold text-slate-900">Recent Quotations</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-slate-50 text-slate-600">
//               <tr>
//                 <th className="p-4 text-left font-semibold">Quotation</th>
//                 <th className="p-4 text-left font-semibold">Account</th>
//                 <th className="p-4 text-left font-semibold">Issue Date</th>
//                 <th className="p-4 text-right font-semibold">Taxable</th>
//                 <th className="p-4 text-right font-semibold">Total</th>
//                 <th className="p-4 text-left font-semibold">Status</th>
//                 <th className="p-4 text-center font-semibold">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {/* LOADING */}
//               {loading && (
//                 <tr>
//                   <td colSpan={7} className="p-10 text-center text-slate-500">
//                     Loading quotations...
//                   </td>
//                 </tr>
//               )}

//               {/* DATA */}
//               {!loading &&
//                 quotations.map((q) => (
//                   <tr
//                     key={q.id}
//                     onClick={() => navigate(`/quotations/${q.id}`)}
//                     className="border-t border-slate-100 hover:bg-indigo-50/40 cursor-pointer transition"
//                   >
//                     <td className="p-4">
//                       <div className="font-semibold text-indigo-700">
//                         {q.quotationNo}
//                       </div>
//                     </td>

//                     <td className="p-4 text-slate-700">
//                       {q.account?.accountName || "-"}
//                     </td>

//                     <td className="p-4 text-slate-600">
//                       {q.issueDate
//                         ? new Date(q.issueDate).toLocaleDateString()
//                         : "-"}
//                     </td>

//                     <td className="p-4 text-right text-slate-700">
//                       {formatINR(
//                         Math.max(
//                           Number(q.subtotal || 0) -
//                             Number(q.discountTotal || 0),
//                           0,
//                         ),
//                       )}
//                     </td>

//                     <td className="p-4 text-right font-semibold text-slate-900">
//                       {formatINR(q.grandTotal || 0)}
//                     </td>

//                     <td className="p-4">
//                       <StatusBadge status={q.status} />
//                     </td>

//                     <td className="p-4 text-center">
//                       <button
//                         onClick={(e) => handleDelete(q.id, e)}
//                         className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-rose-600 hover:bg-rose-50"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}

//               {/* EMPTY */}
//               {!loading && quotations.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="p-12 text-center text-slate-500">
//                     No quotations found
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

// /* ================= SMALL COMPONENTS ================= */

// function StatCard({ label, value, icon }) {
//   return (
//     <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-xs text-slate-500">{label}</div>
//           <div className="mt-2 text-xl font-bold text-slate-900">{value}</div>
//         </div>

//         <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     DRAFT: "bg-slate-100 text-slate-700",
//     SENT: "bg-blue-50 text-blue-700",
//     APPROVED: "bg-emerald-50 text-emerald-700",
//     REJECTED: "bg-rose-50 text-rose-700",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
//         map[status] || map.DRAFT
//       }`}
//     >
//       {status}
//     </span>
//   );
// }

// // src/features/quotations/QuotationList.jsx

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Plus,
//   FileText,
//   Search,
//   BadgeCheck,
//   Clock3,
//   Trash2,
//   Eye,
//   TrendingUp,
//   DollarSign,
//   Calendar,
//   Building2,
//   Filter,
//   Download,
//   RefreshCw,
//   X,
//   MoreVertical,
//   Edit,
//   Copy,
//   Send,
//   Layers,
// } from "lucide-react";
// import { fetchQuotations, deleteQuotation } from "./quotationSlice";
// import { formatINR } from "./quotationUtils";

// export default function QuotationList() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { list, loading } = useSelector((state) => state.quotation);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     dispatch(fetchQuotations());
//   }, [dispatch]);

//   const handleDelete = async (id, e) => {
//     e.stopPropagation();

//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this quotation? This action cannot be undone.",
//     );
//     if (!confirmDelete) return;

//     try {
//       await dispatch(deleteQuotation(id)).unwrap();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete quotation");
//     }
//   };

//   const handleRefresh = () => {
//     dispatch(fetchQuotations());
//   };

//   /* ================= FILTER ================= */
//   const quotations = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     let filtered = [...(list || [])].sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//     );

//     // Search filter
//     if (q) {
//       filtered = filtered.filter((x) => {
//         return (
//           x.quotationNo?.toLowerCase().includes(q) ||
//           x.account?.accountName?.toLowerCase().includes(q) ||
//           x.status?.toLowerCase().includes(q)
//         );
//       });
//     }

//     // Status filter
//     if (statusFilter !== "ALL") {
//       filtered = filtered.filter(
//         (x) => x.status?.toUpperCase() === statusFilter,
//       );
//     }

//     return filtered;
//   }, [search, list, statusFilter]);

//   /* ================= STATS ================= */
//   const stats = useMemo(() => {
//     const all = list || [];
//     const total = all.length;
//     const draft = all.filter((q) => q.status?.toUpperCase() === "DRAFT").length;
//     const sent = all.filter((q) => q.status?.toUpperCase() === "SENT").length;
//     const approved = all.filter(
//       (q) => q.status?.toUpperCase() === "ACCEPTED",
//     ).length;

//     const value = all.reduce((sum, q) => sum + Number(q.grandTotal || 0), 0);

//     const avgValue = total > 0 ? value / total : 0;

//     return { total, draft, sent, approved, value, avgValue };
//   }, [list]);

//   /* ================= UI ================= */
//   return (
//     <div className="p-4 sm:p-6 space-y-6 bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/20 min-h-[calc(100vh-64px)]">
//       {/* ================= HEADER ================= */}
//       <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
//         <div>
//           <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//             <FileText className="w-4 h-4" />
//             Sales Management
//           </div>
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">
//             Quotation Hub
//           </h1>
//           <p className="text-sm text-slate-600 max-w-2xl">
//             Manage quotations with centralized GST calculation, track pipeline
//             value, and monitor status across all deals.
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* SEARCH */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search quotations..."
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

//             <button
//               onClick={() => navigate("/quotations/new")}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-sm font-bold text-white hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
//             >
//               <Plus className="w-4 h-4" />
//               New Quotation
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//         <StatCard
//           label="Total Quotations"
//           value={stats.total}
//           icon={<Layers className="w-5 h-5" />}
//           color="indigo"
//           subtext={`${quotations.length} shown`}
//         />
//         <StatCard
//           label="Draft"
//           value={stats.draft}
//           icon={<Clock3 className="w-5 h-5" />}
//           color="slate"
//           subtext="Pending completion"
//         />
//         <StatCard
//           label="Sent"
//           value={stats.sent}
//           icon={<Send className="w-5 h-5" />}
//           color="blue"
//           subtext="Awaiting response"
//         />
//         <StatCard
//           label="Approved"
//           value={stats.approved}
//           icon={<BadgeCheck className="w-5 h-5" />}
//           color="emerald"
//           subtext="Conversion ready"
//         />
//         <StatCard
//           label="Total Pipeline"
//           value={formatINR(stats.value)}
//           icon={<TrendingUp className="w-5 h-5" />}
//           color="amber"
//           subtext={`Avg: ${formatINR(stats.avgValue)}`}
//         />
//       </div>

//       {/* ================= FILTERS ================= */}
//       <div className="flex items-center gap-3 flex-wrap">
//         <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
//           <Filter className="w-4 h-4" />
//           Filter by status:
//         </div>
//         <div className="flex gap-2 flex-wrap">
//           {["ALL", "DRAFT", "SENT", "ACCEPTED", "REJECTED"].map((status) => (
//             <button
//               key={status}
//               onClick={() => setStatusFilter(status)}
//               className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
//                 statusFilter === status
//                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
//                   : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
//               }`}
//             >
//               {status}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ================= TABLE ================= */}
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//         {/* TABLE HEADER */}
//         <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
//           <div>
//             <h2 className="font-bold text-slate-900 text-lg">
//               Quotation Records
//             </h2>
//             <p className="text-sm text-slate-500 mt-0.5">
//               {quotations.length}{" "}
//               {quotations.length === 1 ? "quotation" : "quotations"}
//               {search && " matching your search"}
//               {statusFilter !== "ALL" && ` with status: ${statusFilter}`}
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
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
//                 <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                   Quotation Details
//                 </th>
//                 <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                   Account
//                 </th>
//                 <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                   Issue Date
//                 </th>
//                 <th className="p-4 text-right font-bold text-xs uppercase tracking-wider">
//                   Taxable Value
//                 </th>
//                 <th className="p-4 text-right font-bold text-xs uppercase tracking-wider">
//                   Grand Total
//                 </th>
//                 <th className="p-4 text-left font-bold text-xs uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="p-4 text-center font-bold text-xs uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">
//               {/* LOADING */}
//               {loading && (
//                 <tr>
//                   <td colSpan={7} className="p-12 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
//                       <p className="text-slate-500 font-medium">
//                         Loading quotations...
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}

//               {/* DATA */}
//               {!loading &&
//                 quotations.map((q) => (
//                   <tr
//                     key={q.id}
//                     onClick={() => navigate(`/quotations/${q.id}`)}
//                     className="hover:bg-indigo-50/50 cursor-pointer transition-colors group"
//                   >
//                     <td className="p-4">
//                       <div className="flex items-start gap-3">
//                         <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 transition">
//                           <FileText className="w-4 h-4" />
//                         </div>
//                         <div>
//                           <div className="font-bold text-indigo-700 mb-1">
//                             {q.quotationNo}
//                           </div>
//                           <div className="text-xs text-slate-500">
//                             {q.items?.length || 0}{" "}
//                             {q.items?.length === 1 ? "item" : "items"}
//                           </div>

//                           {q.items?.length > 0 && (
//                             <div className="text-[11px] text-indigo-500 mt-0.5">
//                               {[
//                                 ...new Set(
//                                   q.items
//                                     .map((i) => i.category)
//                                     .filter(Boolean),
//                                 ),
//                               ]
//                                 .slice(0, 2)
//                                 .join(", ")}
//                               {q.items.length > 2 ? " +" : ""}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </td>

//                     <td className="p-4">
//                       {q.account?.accountName ? (
//                         <div className="flex items-center gap-2">
//                           <Building2 className="w-4 h-4 text-slate-400" />
//                           <span className="font-medium text-slate-900">
//                             {q.account.accountName}
//                           </span>
//                         </div>
//                       ) : (
//                         <span className="text-slate-400 text-xs">-</span>
//                       )}
//                     </td>

//                     <td className="p-4">
//                       {q.issueDate ? (
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-slate-400" />
//                           <span className="text-slate-700">
//                             {new Date(q.issueDate).toLocaleDateString("en-IN", {
//                               dateStyle: "medium",
//                             })}
//                           </span>
//                         </div>
//                       ) : (
//                         <span className="text-slate-400 text-xs">-</span>
//                       )}
//                     </td>

//                     <td className="p-4 text-right">
//                       <div className="font-semibold text-slate-700">
//                         {formatINR(
//                           (q.items || []).reduce((sum, item) => {
//                             // ✅ if sub-items exist → use them
//                             if (item.subItems?.length > 0) {
//                               return (
//                                 sum +
//                                 item.subItems.reduce(
//                                   (s, sub) =>
//                                     s +
//                                     Number(sub.quantity || 1) *
//                                       Number(sub.price || 0) *
//                                       (1 - Number(sub.discount || 0) / 100),
//                                   0,
//                                 )
//                               );
//                             }

//                             // ✅ fallback to parent
//                             return (
//                               sum +
//                               Number(item.quantity || 1) *
//                                 Number(item.price || 0) *
//                                 (1 - Number(item.discount || 0) / 100)
//                             );
//                           }, 0),
//                         )}
//                       </div>
//                     </td>

//                     <td className="p-4 text-right">
//                       <div className="font-bold text-slate-900 text-base">
//                         {formatINR(
//                           (() => {
//                             const subtotal = (q.items || []).reduce(
//                               (sum, item) => {
//                                 if (item.subItems?.length > 0) {
//                                   return (
//                                     sum +
//                                     item.subItems.reduce(
//                                       (s, sub) =>
//                                         s +
//                                         Number(sub.quantity || 1) *
//                                           Number(sub.price || 0) *
//                                           (1 - Number(sub.discount || 0) / 100),
//                                       0,
//                                     )
//                                   );
//                                 }

//                                 return (
//                                   sum +
//                                   Number(item.quantity || 1) *
//                                     Number(item.price || 0) *
//                                     (1 - Number(item.discount || 0) / 100)
//                                 );
//                               },
//                               0,
//                             );

//                             const gst = subtotal * 0.18;

//                             return subtotal + gst;
//                           })(),
//                         )}
//                       </div>
//                     </td>

//                     <td className="p-4">
//                       <StatusBadge status={q.status?.toUpperCase()} />
//                     </td>

//                     <td className="p-4">
//                       <div className="flex items-center justify-center gap-1">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigate(`/quotations/${q.id}`);
//                           }}
//                           className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 font-medium text-xs transition"
//                           title="View details"
//                         >
//                           <Eye className="w-3.5 h-3.5" />
//                           View
//                         </button>

//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigate(`/quotations/${q.id}/edit`);
//                           }}
//                           className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 font-medium text-xs transition"
//                           title="Edit quotation"
//                         >
//                           <Edit className="w-3.5 h-3.5" />
//                           Edit
//                         </button>

//                         <button
//                           onClick={(e) => handleDelete(q.id, e)}
//                           className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-medium text-xs transition"
//                           title="Delete quotation"
//                         >
//                           <Trash2 className="w-3.5 h-3.5" />
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}

//               {/* EMPTY */}
//               {!loading && quotations.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="p-12">
//                     <div className="flex flex-col items-center gap-4 text-center">
//                       <div className="p-4 rounded-2xl bg-slate-100">
//                         <FileText className="w-12 h-12 text-slate-400" />
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-slate-900 text-lg mb-1">
//                           {search || statusFilter !== "ALL"
//                             ? "No quotations found"
//                             : "No quotations yet"}
//                         </h3>
//                         <p className="text-slate-500 text-sm mb-4">
//                           {search || statusFilter !== "ALL"
//                             ? "Try adjusting your search or filters"
//                             : "Get started by creating your first quotation"}
//                         </p>
//                         {!search && statusFilter === "ALL" && (
//                           <button
//                             onClick={() => navigate("/quotations/new")}
//                             className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm transition"
//                           >
//                             <Plus className="w-4 h-4" />
//                             Create First Quotation
//                           </button>
//                         )}
//                         {(search || statusFilter !== "ALL") && (
//                           <button
//                             onClick={() => {
//                               setSearch("");
//                               setStatusFilter("ALL");
//                             }}
//                             className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition"
//                           >
//                             <X className="w-4 h-4" />
//                             Clear Filters
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
//         {!loading && quotations.length > 0 && (
//           <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
//             <div className="flex items-center justify-between text-sm">
//               <div className="text-slate-600">
//                 Showing{" "}
//                 <span className="font-semibold text-slate-900">
//                   {quotations.length}
//                 </span>{" "}
//                 of{" "}
//                 <span className="font-semibold text-slate-900">
//                   {list?.length || 0}
//                 </span>{" "}
//                 quotations
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

// function StatCard({ label, value, icon, color = "indigo", subtext }) {
//   const colorClasses = {
//     indigo: "from-indigo-500 to-indigo-600 shadow-indigo-500/30",
//     slate: "from-slate-500 to-slate-600 shadow-slate-500/30",
//     blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
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

// function StatusBadge({ status }) {
//   const statusConfig = {
//     DRAFT: {
//       bg: "bg-slate-100",
//       text: "text-slate-700",
//       border: "border-slate-200",
//       icon: <Clock3 className="w-3 h-3" />,
//     },
//     SENT: {
//       bg: "bg-blue-100",
//       text: "text-blue-700",
//       border: "border-blue-200",
//       icon: <Send className="w-3 h-3" />,
//     },
//     APPROVED: {
//       bg: "bg-emerald-100",
//       text: "text-emerald-700",
//       border: "border-emerald-200",
//       icon: <BadgeCheck className="w-3 h-3" />,
//     },
//     REJECTED: {
//       bg: "bg-rose-100",
//       text: "text-rose-700",
//       border: "border-rose-200",
//       icon: <X className="w-3 h-3" />,
//     },
//   };

//   const config = statusConfig[status] || statusConfig.DRAFT;

//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${config.bg} ${config.text} ${config.border}`}
//     >
//       {config.icon}
//       {status}
//     </span>
//   );
// }

// src/features/quotations/QuotationList.jsx

import { useEffect, useMemo, useState, Fragment } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  FileText,
  Search,
  BadgeCheck,
  Clock3,
  Trash2,
  Eye,
  TrendingUp,
  Calendar,
  Building2,
  Filter,
  Download,
  RefreshCw,
  X,
  Edit,
  Send,
  Layers,
  ChevronLeft,
  Calculator,
  Settings2,
} from "lucide-react";
import {
  fetchQuotations,
  deleteQuotation,
  fetchQuotationHistory,
  submitQuotation,
  clearQuotationHistory,
  fetchDiscountPolicy,
  updateDiscountPolicy,
} from "./quotationSlice";
import { formatINR } from "./quotationUtils";

export default function QuotationList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading, history, discountPolicy } = useSelector(
    (state) => state.quotation,
  );
  const { user } = useSelector((state) => state.auth); // ⚠️ adjust if needed
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const formatAmount = (value) => {
    const amount = Number(value || 0);

    return formatINR(Math.round(amount)).replace(".00", "");
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [expandedRow, setExpandedRow] = useState(null);
  const [showQuotationModal, setShowQuotationModal] = useState(false);

  const [showDiscountModal, setShowDiscountModal] = useState(false);

  const [discountForm, setDiscountForm] = useState({
    salesRepMax: 5,
    managerMax: 20,
    adminMax: 100,
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchQuotations());

    if (isAdmin) {
      dispatch(fetchDiscountPolicy());
    }
  }, [dispatch, isAdmin]);

  useEffect(() => {
    if (discountPolicy) {
      setDiscountForm({
        salesRepMax: discountPolicy.salesRepMax ?? 5,
        managerMax: discountPolicy.managerMax ?? 20,
        adminMax: discountPolicy.adminMax ?? 100,
      });
    }
  }, [discountPolicy]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quotation? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteQuotation(id)).unwrap();
    } catch (err) {
      console.error(err);
      alert("Failed to delete quotation");
    }
  };

  const handleRefresh = () => {
    dispatch(fetchQuotations());
  };

  const handleSaveDiscountPolicy = async () => {
    try {
      await dispatch(
        updateDiscountPolicy({
          salesRepMax: Number(discountForm.salesRepMax),
          managerMax: Number(discountForm.managerMax),
          adminMax: Number(discountForm.adminMax),
        }),
      ).unwrap();

      toast.success("Discount policy updated successfully");

      setShowDiscountModal(false);
    } catch (err) {
      console.error(err);

      toast.error(err?.message || "Failed to update discount policy");
    }
  };

  const handleQuotationTypeSelect = (type) => {
    setShowQuotationModal(false);

    navigate("/quotations/new", {
      state: {
        quotationType: type,
      },
    });
  };

  const handleExpand = (quotationNo, e) => {
    e.stopPropagation();

    if (expandedRow === quotationNo) {
      setExpandedRow(null);
      dispatch({ type: "quotations/clearQuotationHistory" });
      return;
    }

    setExpandedRow(quotationNo);
    dispatch(fetchQuotationHistory(quotationNo));
  };

  /* ================= FILTER ================= */
  const quotations = useMemo(() => {
    const q = search.trim().toLowerCase();
    let filtered = [...(list || [])]
      .filter((q) => q.isLatest)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (q) {
      filtered = filtered.filter((x) => {
        return (
          x.quotationNo?.toLowerCase().includes(q) ||
          x.account?.accountName?.toLowerCase().includes(q) ||
          x.status?.toLowerCase().includes(q)
        );
      });
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (x) => x.status?.toUpperCase() === statusFilter,
      );
    }

    return filtered;
  }, [search, list, statusFilter]);

  /* ================= STATS ================= */
  const stats = useMemo(() => {
    const all = list || [];
    const total = all.length;
    const draft = all.filter((q) => q.status?.toUpperCase() === "DRAFT").length;
    const submitted = all.filter(
      (q) => q.status?.toUpperCase() === "SUBMITTED",
    ).length;
    const approved = all.filter(
      (q) => q.status?.toUpperCase() === "APPROVED",
    ).length;

    const value = all.reduce((sum, q) => sum + Number(q.grandTotal || 0), 0);
    const avgValue = total > 0 ? value / total : 0;

    return { total, draft, submitted, approved, value, avgValue };
  }, [list]);

  return (
    <div
      className="min-h-[calc(100vh-64px)] px-4 py-6 sm:px-6"
      style={{
        background:
          "linear-gradient(145deg, #f0f4ff 0%, #f8fafc 40%, #eef2ff 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1700px] space-y-3">
        {/* ================= HERO ================= */}
        <div className="overflow-hidden rounded-[24px] border border-indigo-100 bg-white shadow-[0_8px_32px_rgba(99,102,241,0.10)]">
          <div className="relative px-6 py-4 sm:px-8 sm:py-4">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, transparent 50%)",
              }}
            />
            <div className="relative flex flex-col gap-2 xl:flex-row xl:items-end xl:justify-between">
              {/* <button
                onClick={() => navigate(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900"
                aria-label="Back"
              >
                <ChevronLeft className="h-5 w-5" />
              </button> */}
              <div className="max-w-3xl">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Quotation Hub
                </h1>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto xl:items-center">
                <div className="relative w-full sm:w-[340px]">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search quotations..."
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white/95 pl-11 pr-11 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Refresh"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => setShowDiscountModal(true)}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-100"
                    >
                      <Settings2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Discount Policy</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowQuotationModal(true)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(79,70,229,0.28)] transition hover:from-indigo-700 hover:via-indigo-700 hover:to-violet-700 hover:shadow-[0_16px_34px_rgba(79,70,229,0.34)]"
                  >
                    <Plus className="h-4 w-4" />
                    New Quotation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}
        {/* <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 mt-1">
          <StatCard
            label="Total Quotations"
            value={stats.total}
            icon={<Layers className="h-5 w-5" />}
            color="indigo"
            subtext={`${quotations.length} shown`}
          />
          <StatCard
            label="Draft"
            value={stats.draft}
            icon={<Clock3 className="h-5 w-5" />}
            color="slate"
            subtext="Pending completion"
          />
          <StatCard
            label="Submitted"
            value={stats.submitted}
            icon={<Send className="h-5 w-5" />}
            color="blue"
            subtext="Pending approval"
          />
          <StatCard
            label="Approved"
            value={stats.approved}
            icon={<BadgeCheck className="h-5 w-5" />}
            color="emerald"
            subtext="Conversion ready"
          />
          <StatCard
            label="Total Pipeline"
            value={formatAmount(stats.value)}
            icon={<TrendingUp className="h-5 w-5" />}
            color="amber"
            subtext={`Avg: ${formatAmount(stats.avgValue)}`}
          />
        </div> */}

        {/* ================= TABLE ================= */}
        <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Quotation Records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {quotations.length}{" "}
                {quotations.length === 1 ? "quotation" : "quotations"}
                {search && " matching your search"}
                {statusFilter !== "ALL" && ` with status: ${statusFilter}`}
              </p>
            </div>

            {/* ================= FILTERS ================= */}
            <div className="rounded-[24px] border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <Filter className="h-4 w-4 text-slate-500" />
                  Filter by status
                </div>

                <div className="flex flex-wrap gap-2">
                  {["ALL", "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-all ${
                          statusFilter === status
                            ? "bg-indigo-600 text-white shadow-[0_10px_24px_rgba(79,70,229,0.25)]"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {status}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
            </div>
          </div>

          <div className="max-h-[500px] overflow-auto">
            <table className="w-full text-sm">
              <thead
                className="sticky top-0 z-10"
                style={{
                  background: "white",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <tr className="bg-slate-50/50">
                  <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-[#37306B]/50 w-[220px]">
                    Quotation Details
                  </th>
                  <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-[#37306B]/50 w-[160px]">
                    Account
                  </th>
                  <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-[#37306B]/50 w-[160px]">
                    Deal
                  </th>
                  <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-[#37306B]/50 w-[130px]">
                    Issue Date
                  </th>
                  <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.15em] text-[#37306B]/50 w-[120px]">
                    Taxable
                  </th>
                  <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.15em] text-[#37306B]/50 w-[130px]">
                    Total Value
                  </th>
                  <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-[#37306B]/50 w-[120px]">
                    Status
                  </th>
                  <th className="px-5 py-4 text-center text-[10px] font-black uppercase tracking-[0.15em] text-[#37306B]/50 w-[140px]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading && (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="h-8 w-8 animate-spin text-indigo-500" />
                        <p className="text-sm font-medium text-slate-500">
                          Loading quotations...
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {!loading &&
                  quotations.map((q) => (
                    <Fragment key={q.id}>
                      <tr
                        onClick={() => navigate(`/quotations/${q.id}`)}
                        className="group cursor-pointer border-b border-slate-50 transition-all duration-150"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(90deg, #eef2ff 0%, #f8fafc 100%)";
                          e.currentTarget.style.boxShadow =
                            "inset 3px 0 0 #6366f1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <td className="px-5 py-4 w-[220px]">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={(e) => handleExpand(q.quotationNo, e)}
                              className={`group flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-200 active:scale-90 ${
                                expandedRow === q.quotationNo
                                  ? "border-[#37306B]/20 bg-[#37306B]/10 text-[#37306B]"
                                  : "border-slate-200 bg-white text-slate-400 hover:border-[#37306B]/20 hover:bg-[#37306B]/5 hover:text-[#37306B]"
                              }`}
                            >
                              <svg
                                className={`h-3 w-3 transition-transform duration-200 ${
                                  expandedRow === q.quotationNo
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </button>

                            <div className="rounded-xl bg-[#37306B]/5 p-2 text-[#37306B] ring-1 ring-inset ring-[#37306B]/10 transition group-hover:bg-[#37306B]/10">
                              <FileText className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[13px] font-black tracking-tight text-[#37306B] whitespace-nowrap">
                                  {q.quotationNo}
                                </span>
                                <span className="rounded-full bg-[#37306B]/10 px-2 py-0.5 text-[9px] font-black text-[#37306B] uppercase tracking-wider">
                                  Rev {q.version}
                                </span>
                              </div>
                              <div className="mt-0.5 text-[11px] font-bold text-slate-400">
                                {q.items?.length || 0}{" "}
                                {q.items?.length === 1 ? "item" : "items"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 w-[160px]">
                          {q.account?.accountName ? (
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-rose-500/60" />
                              <span className="truncate text-[13px] font-bold text-slate-800">
                                {q.account.accountName}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-300 font-medium">
                              —
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 w-[160px]">
                          {q.deal?.dealName ? (
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-indigo-500/60" />
                              <span className="truncate text-[13px] font-bold text-slate-800">
                                {q.deal.dealName}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-300 font-medium">
                              —
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 w-[130px]">
                          {q.issueDate ? (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-slate-400" />
                              <span className="text-[12px] font-semibold text-slate-600">
                                {new Date(q.issueDate).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-300 font-medium">
                              —
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-right w-[120px]">
                          <div className="text-[13px] font-semibold text-slate-700 tabular-nums">
                            {formatAmount(q.subtotal || 0)}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-right w-[130px]">
                          <div className="text-[14px] font-black text-[#37306B] tabular-nums">
                            {formatAmount(q.grandTotal || 0)}
                          </div>
                        </td>

                        <td className="px-5 py-4 w-[120px]">
                          <StatusBadge status={q.status?.toUpperCase()} />
                        </td>

                        <td className="px-5 py-4 w-[140px]">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/quotations/${q.id}`);
                              }}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/quotations/${q.id}/edit`);
                              }}
                              disabled={["SUBMITTED", "APPROVED"].includes(
                                q.status?.toUpperCase(),
                              )}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white disabled:opacity-30 disabled:hover:bg-emerald-50 disabled:hover:text-emerald-600"
                              title="Edit quotation"
                            >
                              <Edit className="h-4 w-4" />
                            </button>

                            <button
                              onClick={(e) => isAdmin && handleDelete(q.id, e)}
                              disabled={!isAdmin}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 transition-colors hover:bg-rose-600 hover:text-white disabled:opacity-30 disabled:hover:bg-rose-50 disabled:hover:text-rose-600"
                              title={
                                isAdmin ? "Delete" : "Only admin can delete"
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* 🔥 EXPANDED HISTORY ROW */}
                      {expandedRow === q.quotationNo && (
                        <tr>
                          <td colSpan={8} className="p-0">
                            <div className="border-x border-b border-indigo-100 bg-gradient-to-b from-indigo-50/60 to-slate-50/40 px-6 py-6">
                              <div className="ml-[52px] flex">
                                {/* ================= COMPACT REVISION CARD ================= */}
                                <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50">
                                  {/* Header */}
                                  <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-white px-5 py-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 shadow-sm">
                                      <svg
                                        className="h-4 w-4 text-indigo-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                    </div>

                                    <div className="flex flex-col">
                                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Revision History
                                      </span>
                                      <span className="text-[11px] text-slate-400">
                                        Version tracking
                                      </span>
                                    </div>

                                    {history.length > 0 && (
                                      <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-600">
                                        {history.length}{" "}
                                        {history.length === 1
                                          ? "revision"
                                          : "revisions"}
                                      </span>
                                    )}
                                  </div>

                                  {/* Body */}
                                  {history.length === 0 ? (
                                    <div className="flex items-center justify-center gap-3 px-5 py-8 text-sm text-slate-400">
                                      <svg
                                        className="h-5 w-5 animate-spin text-slate-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                        />
                                        <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8v8z"
                                        />
                                      </svg>
                                      Loading revisions…
                                    </div>
                                  ) : (
                                    <div className="divide-y divide-slate-100">
                                      {history.map((h) => {
                                        const approvalAction =
                                          h.approvals?.[0]?.action ||
                                          h.status ||
                                          "DRAFT";

                                        const rejectionReason =
                                          h.approvals?.[0]?.comment ||
                                          h.rejectionReason ||
                                          "";

                                        return (
                                          <div
                                            key={h.id}
                                            className="group flex items-center justify-between px-5 py-4 transition-all hover:bg-indigo-50/40"
                                          >
                                            {/* LEFT */}
                                            <div className="flex items-center gap-3">
                                              {/* Version Bubble */}
                                              <div
                                                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold shadow-sm ${
                                                  h.isLatest
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-slate-100 text-slate-500"
                                                }`}
                                              >
                                                {h.version}
                                              </div>

                                              <div className="flex flex-col">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                  {/* REV */}
                                                  <span className="text-sm font-semibold text-slate-800">
                                                    Rev {h.version}
                                                  </span>

                                                  {/* LATEST */}
                                                  {h.isLatest && (
                                                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                                      ● Latest
                                                    </span>
                                                  )}

                                                  {/* STATUS */}
                                                  <span
                                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                      approvalAction ===
                                                      "APPROVED"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : approvalAction ===
                                                            "REJECTED"
                                                          ? "bg-rose-100 text-rose-700"
                                                          : "bg-slate-100 text-slate-600"
                                                    }`}
                                                  >
                                                    {approvalAction}
                                                  </span>
                                                </div>

                                                {/* DATE */}
                                                <span className="text-xs text-slate-400">
                                                  {new Date(
                                                    h.createdAt,
                                                  ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                      day: "numeric",
                                                      month: "short",
                                                      year: "numeric",
                                                    },
                                                  )}
                                                </span>

                                                {/* APPROVED LABEL */}
                                                {approvalAction ===
                                                  "APPROVED" && (
                                                  <span className="text-xs font-medium mt-1 text-emerald-600">
                                                    Approved version
                                                  </span>
                                                )}

                                                {/* REJECTED REASON */}
                                                {approvalAction ===
                                                  "REJECTED" &&
                                                  rejectionReason && (
                                                    <span className="text-xs font-medium mt-1 text-rose-600">
                                                      {rejectionReason}
                                                    </span>
                                                  )}
                                              </div>
                                            </div>

                                            {/* RIGHT */}
                                            <div className="flex items-center gap-4">
                                              {/* Amount */}
                                              <span className="tabular-nums text-sm font-bold text-slate-800">
                                                {formatINR(h.grandTotal)}
                                              </span>

                                              {/* Button */}
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  navigate(
                                                    `/quotations/${h.id}`,
                                                  );
                                                }}
                                                className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                                              >
                                                View →
                                              </button>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}

                {!loading && quotations.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-16">
                      <div className="flex flex-col items-center text-center">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                          <FileText className="h-12 w-12 text-slate-400" />
                        </div>

                        <div className="mt-5 max-w-md">
                          <h3 className="text-lg font-bold text-slate-900">
                            {search || statusFilter !== "ALL"
                              ? "No quotations found"
                              : "No quotations yet"}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {search || statusFilter !== "ALL"
                              ? "Try adjusting your search or filters."
                              : "Get started by creating your first quotation."}
                          </p>

                          {!search && statusFilter === "ALL" && (
                            <button
                              onClick={() => setShowQuotationModal(true)}
                              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(79,70,229,0.24)] transition hover:bg-indigo-700"
                            >
                              <Plus className="h-4 w-4" />
                              Create First Quotation
                            </button>
                          )}

                          {(search || statusFilter !== "ALL") && (
                            <button
                              onClick={() => {
                                setSearch("");
                                setStatusFilter("ALL");
                              }}
                              className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                            >
                              <X className="h-4 w-4" />
                              Clear Filters
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {showDiscountModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-indigo-100 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.25)]">
                  {/* HEADER */}
                  <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-6 py-5">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">
                      Discount Policy
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Configure maximum role-based discounts
                    </p>
                  </div>

                  {/* BODY */}
                  <div className="space-y-5 p-6">
                    {/* SALES REP */}
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Sales Rep Max %
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discountForm.salesRepMax}
                        onChange={(e) =>
                          setDiscountForm((prev) => ({
                            ...prev,
                            salesRepMax: e.target.value,
                          }))
                        }
                        className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>

                    {/* MANAGER */}
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Manager Max %
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discountForm.managerMax}
                        onChange={(e) =>
                          setDiscountForm((prev) => ({
                            ...prev,
                            managerMax: e.target.value,
                          }))
                        }
                        className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>

                    {/* ADMIN */}
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Admin Max %
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discountForm.adminMax}
                        onChange={(e) =>
                          setDiscountForm((prev) => ({
                            ...prev,
                            adminMax: e.target.value,
                          }))
                        }
                        className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
                    <button
                      onClick={() => setShowDiscountModal(false)}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSaveDiscountPolicy}
                      className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
                    >
                      Save Policy
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showQuotationModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-indigo-100 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.25)]">
                  {/* HEADER */}
                  <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-6 py-5">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">
                      New Quotation
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Select quotation type
                    </p>
                  </div>

                  {/* BODY */}
                  <div className="space-y-3 p-5">
                    <button
                      onClick={() => handleQuotationTypeSelect("BUDGETARY")}
                      className="group w-full rounded-2xl border border-amber-200 bg-amber-50/60 p-5 text-left transition hover:scale-[1.01] hover:border-amber-300"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-black uppercase tracking-[0.2em] text-amber-700">
                            Budgetary
                          </div>

                          <div className="mt-1 text-sm text-slate-600">
                            Preliminary pricing estimation quotation
                          </div>
                        </div>

                        <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                          <Calculator className="h-4 w-4" />
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleQuotationTypeSelect("QUOTATION")}
                      className="group w-full rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 text-left transition hover:scale-[1.01] hover:border-indigo-300"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700">
                            Quotation
                          </div>

                          <div className="mt-1 text-sm text-slate-600">
                            Standard commercial quotation
                          </div>
                        </div>

                        <div className="rounded-xl bg-indigo-100 p-2 text-indigo-700">
                          <FileText className="h-4 w-4" />
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleQuotationTypeSelect("FIRM")}
                      className="group w-full rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-left transition hover:scale-[1.01] hover:border-emerald-300"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                            Firm Quotation
                          </div>

                          <div className="mt-1 text-sm text-slate-600">
                            Finalized confirmed commercial quotation
                          </div>
                        </div>

                        <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                          <BadgeCheck className="h-4 w-4" />
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-end border-t border-slate-100 px-5 py-4">
                    <button
                      onClick={() => setShowQuotationModal(false)}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!loading && quotations.length > 0 && (
            <div
              className="border-t border-indigo-100 px-6 py-4"
              style={{
                background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-semibold text-slate-900">
                    {quotations.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-900">
                    {list?.length || 0}
                  </span>{" "}
                  quotations
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    Per page:
                  </span>
                  <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:ring-4 focus:ring-indigo-500/10">
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
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ label, value, icon, color = "indigo", subtext }) {
  const colorMap = {
    indigo: {
      from: "#6366f1",
      to: "#4f46e5",
      shadow: "rgba(99,102,241,0.30)",
      bg: "#eef2ff",
      text: "#4338ca",
    },
    slate: {
      from: "#64748b",
      to: "#475569",
      shadow: "rgba(100,116,139,0.25)",
      bg: "#f1f5f9",
      text: "#334155",
    },
    blue: {
      from: "#3b82f6",
      to: "#2563eb",
      shadow: "rgba(59,130,246,0.28)",
      bg: "#eff6ff",
      text: "#1d4ed8",
    },
    emerald: {
      from: "#10b981",
      to: "#059669",
      shadow: "rgba(16,185,129,0.28)",
      bg: "#ecfdf5",
      text: "#065f46",
    },
    amber: {
      from: "#f59e0b",
      to: "#d97706",
      shadow: "rgba(245,158,11,0.28)",
      bg: "#fffbeb",
      text: "#92400e",
    },
  };
  const c = colorMap[color];

  return (
    <div className="group relative rounded-[18px] border border-slate-100 bg-white px-4 py-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default flex items-center gap-3.5">
      <div
        className="rounded-xl p-2.5 text-white shadow-md flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
          boxShadow: `0 4px 12px ${c.shadow}`,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 truncate">
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

function StatusBadge({ status }) {
  const normalized = (status || "DRAFT").toUpperCase();

  const statusConfig = {
    DRAFT: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-200",
      icon: <Clock3 className="h-3 w-3" />,
      label: "DRAFT",
    },
    SUBMITTED: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: <Send className="h-3 w-3" />,
      label: "SUBMITTED",
    },
    APPROVED: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: <BadgeCheck className="h-3 w-3" />,
      label: "APPROVED",
    },
    REJECTED: {
      bg: "bg-rose-100",
      text: "text-rose-700",
      border: "border-rose-200",
      icon: <X className="h-3 w-3" />,
      label: "REJECTED",
    },
  };

  const config = statusConfig[normalized] || statusConfig.DRAFT;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${config.bg} ${config.text} ${config.border}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
