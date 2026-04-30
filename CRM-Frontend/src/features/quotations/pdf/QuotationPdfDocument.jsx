// src\features\quotations\pdf\QuotationPdfDocument.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../../assets/micrologic_logo.png";
import { proposalData } from "./data/proposalData";

const styles = StyleSheet.create({
  page: {
    paddingTop: 22,
    paddingBottom: 20,
    paddingHorizontal: 36, // was 26
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#374151",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingBottom: 10,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  logoRow: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  logoImage: {
    width: 110,
    height: 28,
    objectFit: "contain",
  },
  tagline: {
    fontSize: 8,
    color: "#2563EB",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  metaBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginHorizontal: 3,
  },
  metaLabel: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 8,
    fontWeight: "bold",
    color: "#4B5563",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  metaValue: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 8,
    color: "#2563EB",
  },
  pageTitleWrap: {
    alignItems: "center",
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    letterSpacing: 1,
    textAlign: "center",
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: "#2563EB",
    marginTop: 6,
    borderRadius: 2,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1.5,
    borderBottomColor: "#CBD5F5",
  },
  sectionCardSoft: {
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#F9FBFF",
    borderBottomWidth: 1.5,
    borderBottomColor: "#CBD5F5",
  },
  sectionHeaderBlue: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 6,
    paddingHorizontal: 8, // was 10
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionHeaderSoft: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 7,
    paddingHorizontal: 8, // was 10
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },
  sectionHeaderTextBlue: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#2563EB",
  },
  sectionHeaderTextDark: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#1E3A8A",
    letterSpacing: 0.3,
  },
  cardBody: {
    paddingVertical: 10,
    paddingHorizontal: 8, // was 10
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  infoRowNoGap: {
    flexDirection: "row",
  },
  infoLabel: {
    width: "28%",
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#111827",
    paddingRight: 6,
  },
  infoValueText: {
    width: "72%",
    fontSize: 8.6,
    color: "#4B5563",
    lineHeight: 1.35,
  },
  infoValueNode: {
    width: "70%",
  },
  paragraph: {
    fontSize: 8.6,
    lineHeight: 1.6,
    color: "#4B5563",
    marginBottom: 8,
    textAlign: "justify",
  },
  highlightBox: {
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    backgroundColor: "#FFFBEB",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 6,
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 8.3,
    lineHeight: 1.4,
    color: "#92400E",
    fontWeight: "bold",
  },
  tableWrap: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563EB",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableCellHeader: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontSize: 8.2,
    fontWeight: "bold",
    color: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.18)",
  },
  tableCell: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontSize: 8.2,
    color: "#4B5563",
    borderRightWidth: 1,
    borderRightColor: "#E5EAF2",
    lineHeight: 1.5,
  },
  tableCellLast: {
    paddingVertical: 5,
    paddingHorizontal: 4, // was 5
    fontSize: 8,
    color: "#4B5563",
    lineHeight: 1.35,
  },
  tableCellHighlighted: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 8,
    color: "#2563EB",
    fontWeight: "bold",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    lineHeight: 1.35,
  },
  tableCellHighlightedLast: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 8,
    color: "#2563EB",
    fontWeight: "bold",
    lineHeight: 1.35,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#CBD5F5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  footerMain: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  footerSub: {
    fontSize: 7.8,
    color: "#9CA3AF",
    fontStyle: "italic",
    marginBottom: 1,
  },
  footerRightText: {
    fontSize: 7.8,
    color: "#9CA3AF",
    fontStyle: "italic",
    marginBottom: 1,
    textAlign: "right",
  },
  bulletLine: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletMark: {
    width: 10,
    fontSize: 8,
    color: "#4B5563",
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.5,
  },
  twoColGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modelCard: {
    width: "49%",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  modelTitle: {
    fontSize: 8.3,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 4,
  },
  modelDesc: {
    fontSize: 8,
    color: "#4B5563",
    lineHeight: 1.35,
  },
  stepWrap: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 5,
    padding: 10,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 9,
  },
  stepCircleWrap: {
    width: 22,
    alignItems: "center",
  },
  stepCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNum: {
    color: "#FFFFFF",
    fontSize: 7.5,
    fontWeight: "bold",
  },
  stepLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#DBEAFE",
    marginTop: -1,
  },
  stepContent: {
    flex: 1,
    paddingLeft: 8,
  },
  stepTitle: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 8,
    color: "#4B5563",
    lineHeight: 1.35,
  },
  centeredIntro: {
    fontSize: 8.2,
    color: "#4B5563",
    lineHeight: 1.4,
    marginBottom: 8,
  },
  categoryBox: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 7,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 8.3,
    fontWeight: "bold",
    color: "#2563EB",
  },
  tinyMuted: {
    fontSize: 7.8,
    color: "#4B5563",
    lineHeight: 1.35,
  },
  gstSummaryWrap: {
    marginTop: 10,
    alignItems: "flex-end",
  },

  gstBox: {
    width: "45%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
  },

  gstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  gstRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 8,
  },

  gstLabel: {
    fontSize: 8.5,
    color: "#374151",
  },

  gstValue: {
    fontSize: 8.5,
    color: "#111827",
    fontWeight: "bold",
  },

  gstGrandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "#ECFDF5",
  },

  gstGrandLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#065F46",
  },

  gstGrandValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#059669",
  },
  endDocWrap: {
    marginTop: 18,
    alignItems: "center",
  },

  endDocLine: {
    fontSize: 8,
    color: "#6B7280",
    letterSpacing: 1,
  },

  divider: {
    height: 1,
    backgroundColor: "#CBD5F5",
    marginTop: 10,
  },
});

const bankTableRows = [
  { no: "1", label: "ACCOUNT DETAILS", value: "" },

  { no: "1.1", label: "Name of the Bank", value: "Kotak Mahindra Bank" },
  {
    no: "1.2",
    label: "Account Holder’s Name",
    value: "MICROLOGIC INTEGRATED SYSTEMS PRIVATE LIMITED",
  },
  { no: "1.3", label: "Name of the Branch", value: "Sadashivanagar Branch" },
  {
    no: "1.4",
    label: "Address of the Branch",
    value:
      "G-2, No. 19 Old No.86, Lower Palace Orchards Main Road, Sanky Road, Sadashivanagar, Bengaluru – 560003 Karnataka, India",
  },
  {
    no: "1.5",
    label: "Telephone Number of the Branch",
    value: "1860 266 2666",
  },
  { no: "1.6", label: "IFSC code of the Branch", value: "KKBK0008060" },
  { no: "1.7", label: "SWIFT code of the Branch", value: "KKBKINBB" },
  { no: "1.8", label: "MICR Code", value: "560485064" },
  {
    no: "1.9",
    label: "Bank Account number",
    value: "7650258829 (As appearing on the Cheque book/pass book)",
  },
  { no: "1.10", label: "Account Type", value: "Overdraft Account" },

  {
    no: "2",
    label: "Micrologic Payment Cheque / DD / Pay Order",
    value:
      "In favor of Micrologic Integrated Systems Pvt. Ltd.\nPayable at Bangalore only",
  },

  { no: "3", label: "Micrologic Registration Numbers", value: "" },

  {
    no: "3.1",
    label: "Company Identity Number (CIN)",
    value: "U72200KA2006PTC041282",
  },
  { no: "3.2", label: "Excise Registration Number", value: "AAECM8994LEM004" },
  { no: "3.3", label: "VAT Registration Number", value: "29840733064" },
  { no: "3.4", label: "CST Registration Number", value: "29840733064" },
  { no: "3.5", label: "PAN Number", value: "AAECM8994L" },
  { no: "3.6", label: "GST Number", value: "29AAECM8994L1ZG" },
  { no: "3.7", label: "HSN Code", value: "90318000" },
  { no: "3.8", label: "State", value: "Karnataka" },
];

const models = [
  {
    title: "1. Fixed Price Model",
    desc: "Ideal for projects with well-defined requirements and scope. We provide a fixed quote and timeline, ensuring predictable costs and delivery schedules.",
  },
  {
    title: "2. Time & Material",
    desc: "Suitable for projects where scope is fluid or evolving. Billing is based on actual hours spent and materials used, offering maximum flexibility.",
  },
  {
    title: "3. Dedicated Team",
    desc: "We provide a dedicated team of experts who work exclusively on your project, acting as an extension of your own workforce.",
  },
  {
    title: "4. Support & Maintenance",
    desc: "Ongoing support post-deployment, ensuring system uptime, regular updates, and quick resolution of any issues.",
  },
];

const benefits = [
  "Flexibility to choose the model that best fits your project needs.",
  "Transparent communication and regular progress updates.",
  "Access to a pool of highly skilled and experienced professionals.",
  "Focus on delivering high-quality solutions on time and within budget.",
];

const processSteps = [
  {
    title: "Requirement Analysis & Kickoff",
    description:
      "Detailed review of customer requirements, finalizing the scope of work, and official project kickoff meeting.",
  },
  {
    title: "Design Approval Process (DAP)",
    description:
      "Submission of preliminary designs for customer review. Iterations and final approval of the design before manufacturing begins.",
  },
  {
    title: "Procurement & Manufacturing",
    description:
      "Sourcing of necessary components and materials. Fabrication and assembly of the equipment as per approved designs.",
  },
  {
    title: "Internal Testing & Validation",
    description:
      "Rigorous testing of the equipment at our facility to ensure it meets all functional and performance specifications.",
  },
  {
    title: "Factory Acceptance Test (FAT)",
    description:
      "Customer inspection and testing of the equipment at our facility before dispatch.",
  },
  {
    title: "Dispatch & Delivery",
    description:
      "Safe packaging and transportation of the equipment to the customer site.",
  },
  {
    title: "Installation & Commissioning",
    description:
      "On-site installation, integration, and final commissioning of the equipment.",
  },
  {
    title: "Site Acceptance Test (SAT) & Handover",
    description:
      "Final testing at the customer site, user training, and official handover of the equipment.",
  },
];

const commercialTermsRows = [
  {
    no: "1",
    heading: "PRICE BASIS",
    lines: ["Ex-Works Micrologic, Duties, Taxes, Freight, Insurance Extra"],
  },
  {
    no: "2",
    heading: "DELIVERY",
    lines: [
      "As above from the date of receipt of the Purchase order & advance",
    ],
  },
  {
    no: "3",
    heading: "PAYMENT TERMS",
    lines: [
      "Stage 1: Advance (Down payment) 50% of the order value, along with the Purchase Order",
      "Payment to be released within 1 week from the date of Pro forma Invoice to keep up the committed delivery time.",
      "Stage 2: 40% of the order value + Taxes before dispatch on validation at Micrologic",
      "Stage 3: 10% of the order value against Installation & Commissioning",
    ],
  },
  {
    no: "4",
    heading: "Goods and Service Tax",
    lines: ["GST as above", "Or as applicable at the time of delivery"],
  },
  {
    no: "5",
    heading: "Warranty",
    lines: [
      "12 Months from the date of Invoice for Manufacturing Defects (Refer Micrologic General Warranty Terms below)",
    ],
  },
  {
    no: "6",
    heading: "Transit Insurance",
    lines: ["Buyers account"],
  },
  {
    no: "7",
    heading: "Equipment Validation & Acceptance",
    lines: [
      "The equipment will be fully tested in house prior to FAT (Factory Acceptance Test) and SAT (Site Acceptance Test). Our in-house test procedures will be in line with the Requirement Specification (RS) signed off by the Customer in the beginning of the Project.",
    ],
  },
  {
    no: "8",
    heading: "Inspection",
    lines: [
      "Inspection and validation by the customer.",
      "We suggest to validate with at least 100 samples",
    ],
  },
  {
    no: "9",
    heading: "Validity",
    lines: ["This quote is valid for 2 months from date"],
  },
  {
    no: "10",
    heading: "Placement of Purchase Order",
    lines: [
      "Please make the purchase order on:",
      "Micrologic Integrated Systems (P) Limited",
      "#22-D1, “Micrologic Drive”, KIADB Industrial Area, Phase 1, Kumbalagodu (Bengaluru-Mysuru Highway), Bengaluru-560 074, India",
    ],
  },
  {
    no: "11",
    heading: "Force Majeure",
    lines: [
      "The event either party is unable to perform its obligations under the terms of this Agreement because of acts of God, strikes, lockdowns, curfews, effects due to pandemic, equipment or transmission failure or damage reasonably beyond its control, or other causes reasonably beyond its control, such party shall not be liable for damages to the other for any damages resulting from such failure to perform or otherwise from such causes.",
    ],
  },
];

const delayedDeliveryRow = {
  no: "12",
  heading:
    "Delayed Delivery of the Project due to delays at customer’s end or force majeure",
  lines: [
    "In the event the customer does not take the delivery of the Project beyond 3 weeks of the readiness of the project at our factory or hold from the customer’s end for any other reason, the customer is liable to make the payment that is due as per the agreed terms with applicable taxes. Micrologic will intimate the readiness of the project with an internal test report.",
    "The reasons for such delays could be due to customer’s changed timelines, Lockdown/Curfew due to pandemic or any reasons causing a delay for the customer to take the delivery.",
  ],
};

const orderCancellationNotes = [
  "The deliverables proposed vide this proposal are completely customized and will be made specifically against your order. In order to deliver the project/product, there will be a set of stages which includes concept design, detailed design, software development, part manufacturing, integration, test & validation before it is ready for shipping. All these stages have cost content in effort & material.",
  "Orders once placed, and Micrologic accepts the order with an order acceptance, to meet the timelines, as a process the work begins internally.",
  "Cancellation of an order will have impact on the costs incurred at different stages;",
];

const cancellationItems = [
  { no: "1", text: "Order cancellation within 7 days of OA,\nNo charges" },
  {
    no: "2",
    text: "Cancellation of the order before DAP Signoff\n25% of the order value will be payable",
  },
  {
    no: "3",
    text: "Cancellation of the order after DAP Signoff\n50% of the order value will be payable",
  },
  {
    no: "4",
    text: "Cancellation of the order once the manufacturing has started\n100% of the order value will be payable",
  },
];

const noteItems = [
  "For Fast track deliveries with delivery timelines lesser than 7 days are not cancellable. 100% of the order value is payable",
  "For advances received, the cost as above will be forfeited at respective stages. The customer is deemed committed to pay the difference, where applicable",
  "For delayed payments an interest @2.5% per month",
];

const engagementRows = [
  {
    no: "1.1",
    heading: "Software",
    lines: [
      "The software applications (Suite) are the product and property of Micrologic and are licensed to the user under the license agreement. All Intellectual Properties (IP) used are property of the respective owners.",
      "The software suite cannot be reused without prior licensing from Micrologic.",
      "This model of engagement will not allow sharing, part or full source codes/snippets.",
    ],
  },
  {
    no: "1.2",
    heading: "Software Engagement Models",
    lines: [],
  },
  {
    no: "1.3",
    heading: "Application Development",
    lines: [
      "In this engagement model, a software application (software suite) will be supplied. The application remains a property of Micrologic and will be licensed to the buyer.",
    ],
  },
  {
    no: "1.4",
    heading: "Time and Effort",
    lines: [
      "In this engagement model, the software will be built for a given specification and the software will be the buyer’s property. Micrologic will charge on a Time and Effort basis, wherein the Man-hours spent on software development will be charged. The software can either be developed at Micrologic or at the buyer’s premises as necessary. The source code will be the property of the buyer.",
    ],
  },
  {
    no: "1.5",
    heading: "Modifications & Additions",
    lines: [
      "A DAP process will be followed where in the design and the requirement is discussed and vetted by the user. Modifications post DAP will call for a cost and time implication, to be borne by the buyer. Minor and reasonable modifications with respect to the requirement specifications can be made with mutual understanding from the seller and buyer.",
      "Modifications or additions requiring material and additional time and effort might call for a change in delivery time and there might be cost implications.",
    ],
  },
  {
    no: "1.6",
    heading: "Time lines",
    lines: [
      "Time lines quoted will be adhered by Micrologic. Where the buyer has to provide details like drawings, information, samples, if delayed from the buyer’s end, which would affect the project time lines, the affect of the delays will be borne by the buyer.",
      "If the equipment is not taken by the buyer after readiness, within a reasonable time, the buyer shall have to pay the full balance amount and Micrologic is entitled to impose demurrage charges to the buyer for keeping the equipment at Micrologic.",
    ],
  },
  {
    no: "1.7",
    heading: "Pre-Shipping Acceptance",
    lines: [
      "The buyer will validate the line/equipment before dispatch at his discretion and a ‘Dispatch Clearance’ is necessary for Micrologic to arrange dispatch.",
    ],
  },
  {
    no: "1.8",
    heading: "Information and Samples",
    lines: [
      "Information and samples needed to complete the project will be provided by the buyer at no cost to Micrologic. All costs involved to ship the samples will be borne by the buyer.",
    ],
  },
  {
    no: "1.9",
    heading: "Non-Disclosure",
    lines: [
      "Information and drawings submitted to the buyer for reviews and approvals remain property of Micrologic and cannot be shared or used for other purposes.",
      "At the same time Micrologic will commit to protect all properties of the customer from misuse.",
      "Where necessary a Non-Disclosure Agreement can be signed by both parties.",
    ],
  },
];

function PdfHeader({ refNo, revNo, date }) {
  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <Image src={logo} style={styles.logoImage} />
        {/* <Text style={styles.tagline}>Efficiency Enhanced</Text> */}
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Ref</Text>
          <Text style={styles.metaValue}>{refNo}</Text>
        </View>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Rev</Text>
          <Text style={styles.metaValue}>{revNo}</Text>
        </View>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Date</Text>
          <Text style={styles.metaValue}>{date}</Text>
        </View>
      </View>
    </View>
  );
}

function PdfFooter({ pageNumber, totalPages = 12 }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerLeft}>
        <Text style={styles.footerMain}>
          Page {pageNumber} of {totalPages}
        </Text>
        <Text style={styles.footerSub}>
          Confidential – Intended for the Addressee &amp; Recipient only
        </Text>
      </View>

      <View style={styles.footerRight}>
        <Text style={styles.footerRightText}>
          Doc No: 4001.0004, Ver No:1.1, Date:29-Apr-2026
        </Text>
        <Text style={styles.footerRightText}>
          All Images &amp; Drawings shown are Indicative only
        </Text>
      </View>
    </View>
  );
}

function SectionCard({ title, children, soft = false }) {
  return (
    <View style={soft ? styles.sectionCardSoft : styles.sectionCard}>
      {title ? (
        <View
          style={soft ? styles.sectionHeaderSoft : styles.sectionHeaderBlue}
        >
          <Text
            style={
              soft ? styles.sectionHeaderTextDark : styles.sectionHeaderTextBlue
            }
          >
            {title}
          </Text>
        </View>
      ) : null}
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

function HighlightBox({ text }) {
  return (
    <View style={styles.highlightBox}>
      <Text style={styles.highlightText}>{text}</Text>
    </View>
  );
}

function InfoCard({ title, items }) {
  return (
    <SectionCard title={title}>
      {items.map((item, index) => (
        <View
          key={`${item.label}-${index}`}
          style={
            index < items.length - 1 ? styles.infoRow : styles.infoRowNoGap
          }
        >
          <Text style={styles.infoLabel}>{item.label}</Text>
          {typeof item.value === "string" ? (
            <Text style={styles.infoValueText}>{item.value}</Text>
          ) : (
            <View style={styles.infoValueNode}>{item.value}</View>
          )}
        </View>
      ))}
    </SectionCard>
  );
}

function TableBlock({ columns, data, highlightLastRow = false }) {
  return (
    <View style={styles.tableWrap}>
      <View style={styles.tableHeader}>
        {columns.map((col, i) => {
          const isLastCol = i === columns.length - 1;
          return (
            <Text
              key={col.key}
              style={[
                styles.tableCellHeader,
                {
                  width: col.width,
                  textAlign: col.align || "left",
                  borderRightWidth: isLastCol ? 0 : 1,
                },
              ]}
            >
              {col.title}
            </Text>
          );
        })}
      </View>

      {data.map((row, rowIndex) => {
        const isLast = rowIndex === data.length - 1;
        const isHighlighted = highlightLastRow && isLast;
        const isMainRow = rowIndex === 0;

        return (
          <View
            key={rowIndex}
            style={[
              isLast ? styles.tableRowLast : styles.tableRow,
              isMainRow && { backgroundColor: "#F8FAFC" },
            ]}
          >
            {columns.map((col, colIndex) => {
              const isLastCol = colIndex === columns.length - 1;
              const cellStyle = isHighlighted
                ? isLastCol
                  ? styles.tableCellHighlightedLast
                  : styles.tableCellHighlighted
                : isLastCol
                  ? styles.tableCellLast
                  : styles.tableCell;

              return (
                <Text
                  key={col.key}
                  style={[
                    cellStyle,
                    {
                      width: col.width,
                      textAlign: col.align || "left",
                      borderRightWidth: isLastCol ? 0 : 1,
                    },
                  ]}
                >
                  {typeof row[col.key] === "string"
                    ? cleanPdfText(row[col.key])
                    : row[col.key] != null
                      ? row[col.key]
                      : "-"}
                </Text>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

function BulletList({ items }) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.bulletLine}>
          <Text style={styles.bulletMark}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function StepFlow({ steps }) {
  const leftColors = [
    "#2563EB",
    "#6366F1",
    "#0EA5E9",
    "#8B5CF6",
    "#2563EB",
    "#6366F1",
    "#0EA5E9",
    "#8B5CF6",
  ];

  return (
    <View style={{ gap: 6 }}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const accentColor = leftColors[index % leftColors.length];

        return (
          <View
            key={`${step.title}-${index}`}
            style={{ flexDirection: "row", alignItems: "stretch" }}
          >
            {/* Left: number column with connecting line */}
            <View style={{ width: 32, alignItems: "center" }}>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: accentColor,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: "#DBEAFE",
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 8, fontWeight: "bold" }}
                >
                  {index + 1}
                </Text>
              </View>
              {!isLast && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    backgroundColor: "#DBEAFE",
                    marginTop: 3,
                    borderRadius: 1,
                    minHeight: 10,
                  }}
                />
              )}
            </View>

            {/* Right: content card */}
            <View
              style={{
                flex: 1,
                marginLeft: 8,
                marginBottom: isLast ? 0 : 6,
                borderLeftWidth: 3,
                borderLeftColor: accentColor,
                backgroundColor: "#F8FAFC",
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#E2E8F0",
                paddingVertical: 7,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 8.5,
                  fontWeight: "bold",
                  color: "#0F172A",
                  marginBottom: 2,
                }}
              >
                {step.title}
              </Text>
              <Text
                style={{
                  fontSize: 8,
                  color: "#4B5563",
                  lineHeight: 1.4,
                }}
              >
                {step.description}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const formatCurrency = (value) => {
  if (value === "-" || value == null) return "-";

  const cleaned = String(value)
    .normalize("NFKC")
    .replace(/\u00B9/g, "")
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
    .replace(/[\u00B2\u00B3\u2070-\u2079\u2032\u2033\u00B0\u00BA]/g, "")
    .replace(/[^\d.,]/g, "")
    .replace(/,/g, "");

  const num = Number(cleaned);
  return Number.isFinite(num) && num > 0
    ? `${num.toLocaleString("en-IN")}`
    : "-";
};

const cleanPdfText = (value) => {
  if (value == null) return "-";

  return (
    String(value)
      .normalize("NFKC")

      // 🔥 remove ALL superscripts explicitly
      .replace(/[\u00B9\u00B2\u00B3\u2070-\u2079]/g, "")

      // 🔥 remove invisible / zero-width chars
      .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")

      // 🔥 remove leading junk like quotes, symbols, etc.
      .replace(/^[^a-zA-Z0-9↳]+/, "")

      .trim()
  );
};

const cleanNumber = (value) => {
  if (value === "-" || value == null) return 0;

  const cleaned = String(value)
    .normalize("NFKC")
    .replace(/\u00B9/g, "")
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
    .replace(/[\u00B2\u00B3\u2070-\u2079\u2032\u2033\u00B0\u00BA]/g, "")
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "")
    .replace(/^\./, "");

  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
};

function NumberedTermsTable({ title, rows }) {
  return (
    <View style={styles.tableWrap}>
      <View style={styles.tableHeader}>
        <Text
          style={[
            styles.tableCellHeader,
            { width: "100%", textAlign: "center" },
          ]}
        >
          {title}
        </Text>
      </View>

      {rows.map((row, index) => {
        const isLast = index === rows.length - 1;

        return (
          <View
            key={row.no}
            style={{
              flexDirection: "row",
              borderBottomWidth: isLast ? 0 : 1,
              borderBottomColor: "#E5E7EB",
            }}
          >
            <View
              style={{
                width: "7%",
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderRightWidth: 1,
                borderRightColor: "#E5E7EB",
              }}
            >
              <Text
                style={{ fontSize: 8, fontWeight: "bold", color: "#111827" }}
              >
                {row.no}
              </Text>
            </View>

            <View
              style={{ width: "93%", paddingVertical: 5, paddingHorizontal: 5 }}
            >
              {row.heading ? (
                <Text
                  style={{
                    fontSize: 8.2,
                    fontWeight: "bold",
                    color: "#111827",
                    marginBottom: row.lines && row.lines.length ? 2 : 0,
                  }}
                >
                  {row.heading}
                </Text>
              ) : null}

              {(row.lines || []).map((line, i) => (
                <Text
                  key={i}
                  style={{
                    fontSize: 8,
                    color: "#374151",
                    lineHeight: 1.35,
                    marginBottom: 2,
                  }}
                >
                  {line}
                </Text>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

export function ProposalPDF({ quotation, totals }) {
  const HSN_SAC = "90318000"; // ✅
  const categories = [
    ...new Set(
      (quotation?.items || []).flatMap((item) => [
        item.category,
        ...(item.subItems || []).map((sub) => sub.category),
      ]),
    ),
  ]
    .filter(Boolean)
    .join(", ");
  const metadata = {
    ref: "MISPL/COMM/F2425.1150",
    rev: quotation?.version || "01",
    date: new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  const company = proposalData.company;
  const pricing = proposalData.pricing;

  const pricingRows = [];

  (quotation?.items || []).forEach((item) => {
    pricingRows.push({
      sl: pricingRows.length + 1,
      sku: cleanPdfText(item.sku || "-"),
      hsn: HSN_SAC,
      description: cleanPdfText(
        (item.description || item.name || "-").replace(
          /^[\u00B9\u00B2\u00B3\u2070-\u2079]+/,
          "",
        ),
      ),
      qty: cleanNumber(item.quantity || 0),
      unitPrice: item.price != null ? formatCurrency(item.price) : "-",
      discount: item.discount != null ? `${item.discount}%` : "-",
      gst: item.gst != null ? `${item.gst}%` : "18%",
      total: formatCurrency(
        cleanNumber(item.quantity || 1) *
          cleanNumber(item.price || 0) *
          (1 - cleanNumber(item.discount || 0) / 100),
      ),
    });

    (item.subItems || []).forEach((sub) => {
      pricingRows.push({
        sl: pricingRows.length + 1,
        sku: cleanPdfText(sub.sku || "-"),
        hsn: HSN_SAC,
        description: `↳ ${cleanPdfText(
          (sub.description || sub.name || "-").replace(
            /[\u00B9\u00B2\u00B3\u2070-\u2079]/g,
            "",
          ),
        )}`,
        qty: cleanNumber(sub.quantity || 0),
        unitPrice: sub.price != null ? formatCurrency(sub.price) : "-",
        discount: sub.discount != null ? `${sub.discount}%` : "-",
        gst: sub.gst != null ? `${sub.gst}%` : "18%",
        total: formatCurrency(
          cleanNumber(sub.quantity || 1) *
            cleanNumber(sub.price || 0) *
            (1 - cleanNumber(sub.discount || 0) / 100),
        ),
      });
    });
  });
  const warranty = proposalData.warranty;
  const softwareSupport = proposalData.softwareSupport;
  const revisionHistory = proposalData.revisionHistory;

  const contact = quotation?.account?.contacts?.[0];

  const fullAddress = [
    quotation?.account?.billingStreet,
    quotation?.account?.billingCity,
    quotation?.account?.billingState,
    quotation?.account?.billingPincode,
    quotation?.account?.billingCountry,
  ]
    .filter(Boolean)
    .join(", ");

  const customerItems = [
    {
      label: "Customer",
      value: quotation?.account?.accountName || "-",
    },

    {
      label: "Address",
      value: fullAddress || "-",
    },

    {
      label: "Contact",
      value: contact
        ? `${contact.firstName || ""} ${contact.lastName || ""}`.trim()
        : "-",
    },

    {
      label: "Phone No.",
      value: quotation?.account?.phone || contact?.phone || "-",
    },

    {
      label: "Email",
      value: contact?.email || "-",
    },
  ];

  const projectItems = [
    { label: "Project", value: quotation?.deal?.dealName || "-" },
    { label: "Ref Documents", value: "-" },
    { label: "Tech Prop Ref", value: "-" },
    { label: "Doc Owner", value: "Chaitra S B" },
    { label: "Approved By", value: "Bhavya K S" },
  ];

  const pricingColumns = [
    { key: "sl", title: "SL#", width: "6%", align: "center" },
    { key: "sku", title: "SKU", width: "14%", align: "center" },
    { key: "hsn", title: "HSN/SAC", width: "10%", align: "center" },

    { key: "description", title: "Description", width: "30%" },

    { key: "qty", title: "QTY", width: "6%", align: "center" },

    {
      key: "unitPrice",
      title: "Unit Price",
      width: "10%",
      align: "right",
    },

    { key: "discount", title: "Disc %", width: "8%", align: "center" },
    { key: "gst", title: "GST %", width: "8%", align: "center" },

    {
      key: "total",
      title: "Total",
      width: "12%",
      align: "right",
    },
  ];

  const deliveryColumns = [
    { key: "sl", title: "SL#", width: "10%", align: "center" },
    { key: "desc", title: "Delivery Timeline Details", width: "90%" },
  ];

  const subtotal = pricingRows.reduce((sum, row) => {
    const qty = cleanNumber(row.qty);
    const price = cleanNumber(row.unitPrice);
    const discount = cleanNumber(row.discount);
    return sum + qty * price * (1 - discount / 100);
  }, 0);

  const gstRate = 18;

  const gstAmount = subtotal * (gstRate / 100);

  const grandTotal = subtotal + gstAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <View
          style={{
            alignItems: "center",
            marginBottom: 14,
            paddingVertical: 12,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#DBEAFE",
            backgroundColor: "#F0F7FF",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#0F172A",
              letterSpacing: 2.5,
              textTransform: "uppercase",
            }}
          >
            COMMERCIAL PROPOSAL
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              gap: 6,
            }}
          >
            <View
              style={{
                width: 24,
                height: 2,
                backgroundColor: "#93C5FD",
                borderRadius: 2,
              }}
            />
            <Text
              style={{ fontSize: 7.5, color: "#2563EB", letterSpacing: 1.5 }}
            >
              CONFIDENTIAL · PREPARED EXCLUSIVELY FOR THE ADDRESSEE
            </Text>
            <View
              style={{
                width: 24,
                height: 2,
                backgroundColor: "#93C5FD",
                borderRadius: 2,
              }}
            />
          </View>
        </View>

        {/* ── Proposal Submitted To ── */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#DBEAFE",
            borderRadius: 6,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#1E40AF",
              paddingVertical: 7,
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 3,
                height: 13,
                backgroundColor: "#60A5FA",
                borderRadius: 2,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                fontSize: 9,
                fontWeight: "bold",
                color: "#FFFFFF",
                letterSpacing: 0.4,
              }}
            >
              Proposal Submitted to:
            </Text>
          </View>
          {customerItems.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                backgroundColor: index % 2 === 0 ? "#F8FAFC" : "#FFFFFF",
                borderBottomWidth: index < customerItems.length - 1 ? 1 : 0,
                borderBottomColor: "#EFF6FF",
                paddingVertical: 6,
                paddingHorizontal: 10,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  width: "28%",
                  fontSize: 8.5,
                  fontWeight: "bold",
                  color: "#1E3A8A",
                }}
              >
                {item.label}
              </Text>
              <Text style={{ width: "2%", fontSize: 8.5, color: "#94A3B8" }}>
                :
              </Text>
              <Text
                style={{
                  width: "70%",
                  fontSize: 8.5,
                  color: "#374151",
                  lineHeight: 1.4,
                }}
              >
                {typeof item.value === "string" ? item.value : ""}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Project Details ── */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#DBEAFE",
            borderRadius: 6,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#1E40AF",
              paddingVertical: 7,
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 3,
                height: 13,
                backgroundColor: "#60A5FA",
                borderRadius: 2,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                fontSize: 9,
                fontWeight: "bold",
                color: "#FFFFFF",
                letterSpacing: 0.4,
              }}
            >
              Project Details:
            </Text>
          </View>
          {projectItems.map((item, index) => {
            const isBadge =
              item.label === "Doc Owner" || item.label === "Approved By";
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  backgroundColor: index % 2 === 0 ? "#F8FAFC" : "#FFFFFF",
                  borderBottomWidth: index < projectItems.length - 1 ? 1 : 0,
                  borderBottomColor: "#EFF6FF",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: "28%",
                    fontSize: 8.5,
                    fontWeight: "bold",
                    color: "#1E3A8A",
                  }}
                >
                  {item.label}
                </Text>
                <Text style={{ width: "2%", fontSize: 8.5, color: "#94A3B8" }}>
                  :
                </Text>
                {isBadge ? (
                  <View
                    style={{
                      backgroundColor: "#EFF6FF",
                      borderWidth: 1,
                      borderColor: "#BFDBFE",
                      borderRadius: 12,
                      paddingVertical: 3,
                      paddingHorizontal: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 7.8,
                        color: "#1D4ED8",
                        fontWeight: "bold",
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      width: "70%",
                      fontSize: 8.5,
                      color: "#374151",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.value}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        <View style={{ marginTop: "auto" }}>
          {/* Top blue divider bar */}
          <View
            style={{
              height: 2,
              backgroundColor: "#2563EB",
              borderRadius: 1,
              marginBottom: 10,
            }}
          />

          {/* Company info centered */}
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 9.5,
                fontWeight: "bold",
                color: "#0F172A",
                letterSpacing: 0.5,
                marginBottom: 3,
              }}
            >
              {company.name}
            </Text>
            <Text
              style={{
                fontSize: 7.8,
                color: "#64748B",
                textAlign: "center",
                lineHeight: 1.4,
                marginBottom: 3,
              }}
            >
              {company.address}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 8, color: "#2563EB", fontWeight: "bold" }}
              >
                {company.website}
              </Text>
              <Text
                style={{ fontSize: 8, color: "#94A3B8", marginHorizontal: 4 }}
              >
                |
              </Text>
              <Text
                style={{ fontSize: 8, color: "#2563EB", fontWeight: "bold" }}
              >
                M: {company.phone}
              </Text>
            </View>
          </View>

          {/* Contact cards */}
          <View style={{ flexDirection: "row" }}>
            {company.contacts.map((contact, index) => (
              <View
                key={`${contact.name}-${index}`}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#DBEAFE",
                  borderRadius: 5,
                  borderLeftWidth: 3,
                  borderLeftColor: "#2563EB",
                  backgroundColor: "#F0F7FF",
                  padding: 8,
                  marginRight: index === company.contacts.length - 1 ? 0 : 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 8.5,
                    fontWeight: "bold",
                    color: "#1E3A8A",
                    marginBottom: 3,
                  }}
                >
                  {contact.name}
                </Text>
                <Text
                  style={{ fontSize: 7.3, color: "#475569", marginBottom: 1 }}
                >
                  {contact.email}
                </Text>
                <Text style={{ fontSize: 7.3, color: "#475569" }}>
                  {contact.phone}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <PdfFooter pageNumber={1} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 10,
          }}
        >
          Revision History
        </Text>

        <TableBlock
          columns={[
            { key: "sl", title: "SL#", width: "10%", align: "center" },
            { key: "revNo", title: "Revision No.", width: "30%" },
            { key: "date", title: "Revision Date", width: "30%" },
            { key: "history", title: "History", width: "30%" },
          ]}
          data={revisionHistory}
        />

        <PdfFooter pageNumber={2} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />
        <View
          style={{
            alignItems: "center",
            marginBottom: 14,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#DBEAFE",
            backgroundColor: "#F0F7FF",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#0F172A",
              letterSpacing: 1,
            }}
          >
            Confidentiality &amp; General Conditions
          </Text>
          <View
            style={{
              width: 40,
              height: 2,
              backgroundColor: "#2563EB",
              borderRadius: 2,
              marginTop: 5,
            }}
          />
        </View>

        {[
          `This techno commercial proposal (the "Proposal") is submitted with the intent of executing a definitive and legally binding agreement (the "Agreement") following an award of business to Micrologic Integrated Systems (P) Limited (Micrologic).`,

          `The Proposal itself is a legally binding offer to contract and in the event of an award to Micrologic, it shall execute an Agreement that will be the complete agreement between the parties, however, where the parties do not execute any such Agreement, then the terms and conditions mentioned in this Proposal shall govern any purchase order(s) issued by the Customer in reference to the specific project.`,

          `This Proposal constitutes confidential and proprietary information of Micrologic and requires that Customer treat the information contained in this Proposal as confidential. Customer may use the information contained in this Proposal solely for the purposes of evaluating this Proposal and executing the Agreement with Micrologic. This Proposal and all supporting documentation and drawings, Images and concepts provided to Customer in connection with this Proposal shall remain the property of Micrologic and must be returned immediately upon request.`,

          `This Proposal is based upon the set of requirements provided by Customer to Micrologic, and certain reasonable assumptions taken by Micrologic. If Customer alters the requirements or if any assumption stated herein are false or inaccurate, then this Proposal, including pricing, may change. Implementation of any services detailed in this Proposal is subject to applicable legal and regulatory norms and requirements in force as on the date when services are to be implemented and such implementation may vary to cater to the requirements of such applicable legal and regulatory norms and requirements.`,
        ].map((text, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              marginBottom: 8,
              borderLeftWidth: 3,
              borderLeftColor:
                index === 0
                  ? "#2563EB"
                  : index === 1
                    ? "#6366F1"
                    : index === 2
                      ? "#0EA5E9"
                      : "#8B5CF6",
              backgroundColor: "#F8FAFC",
              borderRadius: 4,
              paddingVertical: 8,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 8.5,
                lineHeight: 1.55,
                color: "#374151",
                textAlign: "justify",
                flex: 1,
              }}
            >
              {text}
            </Text>
          </View>
        ))}

        <View
          style={{
            marginTop: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#FCD34D",
            backgroundColor: "#FFFBEB",
            overflow: "hidden",
          }}
        >
          {/* Colored top bar */}
          <View style={{ height: 3, backgroundColor: "#F59E0B" }} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            {/* Icon box */}
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: "#F59E0B",
                borderRadius: 9,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
                marginTop: 1,
              }}
            >
              <Text
                style={{ fontSize: 9, fontWeight: "bold", color: "#FFFFFF" }}
              >
                !
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 8,
                  fontWeight: "bold",
                  color: "#92400E",
                  marginBottom: 3,
                }}
              >
                IMPORTANT NOTICE
              </Text>
              <Text
                style={{ fontSize: 8.3, lineHeight: 1.5, color: "#78350F" }}
              >
                These are customized equipment, this proposal is indicative of
                the concept there could be changes during the detailed design
                which will be dealt during Design Approval Process (DAP) &amp;
                will be subjected to the customer approval.
              </Text>
            </View>
          </View>
        </View>

        <PdfFooter pageNumber={3} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 8,
          }}
        >
          PRICE:
        </Text>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>Category: {categories || "-"}</Text>
        </View>

        <Text style={styles.centeredIntro}>
          Design, Development, Manufacture, Test &amp; Validate, Supply &amp;
          Commissioning of:
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#DBEAFE",
            borderRadius: 6,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          {/* Header strip */}
          <View
            style={{
              backgroundColor: "#1E40AF",
              paddingVertical: 6,
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 3,
                height: 12,
                backgroundColor: "#60A5FA",
                borderRadius: 2,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                fontSize: 8.5,
                fontWeight: "bold",
                color: "#FFFFFF",
                letterSpacing: 0.4,
              }}
            >
              Project
            </Text>
          </View>

          {/* Value row */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F8FAFC",
              paddingVertical: 7,
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: "100%",
                fontSize: 8.8,
                fontWeight: "bold",
                color: "#1D4ED8",
                lineHeight: 1.4,
              }}
            >
              {quotation?.deal?.dealName || proposalData.project.name}
            </Text>
          </View>
        </View>

        <>
          <TableBlock columns={pricingColumns} data={pricingRows} />

          <View style={styles.gstSummaryWrap}>
            <View style={styles.gstBox}>
              <View style={styles.gstRow}>
                <Text style={styles.gstLabel}>Subtotal</Text>
                <Text style={styles.gstValue}>{formatCurrency(subtotal)}</Text>
              </View>

              <View style={styles.gstRow}>
                <Text style={styles.gstLabel}>Taxable Value</Text>
                <Text style={styles.gstValue}>{formatCurrency(subtotal)}</Text>
              </View>

              <View style={styles.gstRowLast}>
                <Text style={styles.gstLabel}>GST (18%)</Text>
                <Text style={styles.gstValue}>{formatCurrency(gstAmount)}</Text>
              </View>

              <View style={styles.gstGrandRow}>
                <Text style={styles.gstGrandLabel}>Grand Total</Text>
                <Text style={styles.gstGrandValue}>
                  {formatCurrency(grandTotal)}
                </Text>
              </View>
            </View>
          </View>
        </>

        <PdfFooter pageNumber={4} totalPages={12} />

        <View break>
          <PdfHeader
            refNo={metadata.ref}
            revNo={metadata.rev}
            date={metadata.date}
          />

          <HighlightBox
            text={
              quotation?.notes ||
              "These are customized equipment; final design may change during DAP with customer approval."
            }
          />

          <SectionCard title="Price Basis & Delivery" soft>
            <Text
              style={{
                fontSize: 8.5,
                fontWeight: "bold",
                color: "#4B5563",
                marginBottom: 6,
              }}
            >
              {quotation?.priceBasis ||
                "Ex-Works Micrologic, Duties, Taxes, Freight, Insurance Extra"}
            </Text>

            <TableBlock
              columns={deliveryColumns}
              data={
                quotation?.deliveryTimeline || [
                  {
                    sl: "1",
                    desc: "10-12 Weeks from the date of receipt of Purchase Order and Advance",
                  },
                  {
                    sl: "2",
                    desc: "Delivery depends on customer dependent activities like receipt of Advance, DAP approval, etc. Timeline will be finalized after project kickoff.",
                  },
                ]
              }
            />
          </SectionCard>
        </View>

        <SectionCard title="Important Notes" soft>
          {pricing.generalNotes.map((note, index) => (
            <View key={`${note}-${index}`} style={styles.bulletLine}>
              <Text style={styles.bulletMark}>{index + 1}.</Text>
              <Text style={styles.bulletText}>{note}</Text>
            </View>
          ))}
        </SectionCard>

        <PdfFooter pageNumber={5} totalPages={12} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <SectionCard title="MICROLOGIC GENERAL WARRANTY TERMS" soft>
          <BulletList items={warranty} />
          <View
            style={{
              backgroundColor: "#EFF6FF",
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderRadius: 5,
              marginTop: 10,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#BFDBFE",
            }}
          >
            <Text
              style={{ fontSize: 8.7, fontWeight: "bold", color: "#1E40AF" }}
            >
              Subject to Bangalore Jurisdiction only
            </Text>
          </View>
        </SectionCard>

        <SectionCard title="Software Support Terms" soft>
          <BulletList items={softwareSupport} />
        </SectionCard>

        <PdfFooter pageNumber={6} totalPages={12} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 4,
          }}
        >
          Engagement Model
        </Text>
        <Text style={styles.centeredIntro}>
          Our engagement model is designed to ensure transparency, efficiency,
          and successful project delivery.
        </Text>

        <View style={styles.twoColGrid}>
          {models.map((model) => (
            <View key={model.title} style={styles.modelCard}>
              <Text style={styles.modelTitle}>{model.title}</Text>
              <Text style={styles.modelDesc}>{model.desc}</Text>
            </View>
          ))}
        </View>

        <SectionCard title="Key Benefits" soft>
          <BulletList items={benefits} />
        </SectionCard>

        <PdfFooter pageNumber={7} totalPages={12} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <View
          style={{
            alignItems: "center",
            marginBottom: 14,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#DBEAFE",
            backgroundColor: "#F0F7FF",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#0F172A",
              letterSpacing: 1,
            }}
          >
            Project Execution Process Flow
          </Text>
          <View
            style={{
              width: 40,
              height: 2,
              backgroundColor: "#2563EB",
              borderRadius: 2,
              marginTop: 5,
            }}
          />
          <Text
            style={{
              fontSize: 7.8,
              color: "#64748B",
              marginTop: 5,
              letterSpacing: 0.3,
            }}
          >
            Standard operating procedure for the successful delivery of the
            proposed solution
          </Text>
        </View>

        <StepFlow steps={processSteps} />

        <PdfFooter pageNumber={8} totalPages={12} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <NumberedTermsTable
          title="COMMERCIAL TERMS"
          rows={commercialTermsRows}
        />

        <PdfFooter pageNumber={9} totalPages={12} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <NumberedTermsTable
          title="COMMERCIAL TERMS"
          rows={[delayedDeliveryRow]}
        />

        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#111827",
            marginTop: 14,
            marginBottom: 8,
            textDecoration: "underline",
          }}
        >
          Order Cancellation
        </Text>

        {orderCancellationNotes.map((line, index) => (
          <Text
            key={index}
            style={{
              fontSize: 8.4,
              color: "#374151",
              lineHeight: 1.45,
              marginBottom: 8,
              textAlign: "justify",
            }}
          >
            {line}
          </Text>
        ))}

        <View style={{ marginLeft: 6, marginTop: 2 }}>
          {cancellationItems.map((item) => (
            <View
              key={item.no}
              style={{ flexDirection: "row", marginBottom: 6 }}
            >
              <Text style={{ width: 12, fontSize: 8.4, color: "#111827" }}>
                {item.no}.
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 8.4,
                  color: "#374151",
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </Text>
            </View>
          ))}
        </View>

        <Text
          style={{
            fontSize: 8.4,
            color: "#374151",
            marginTop: 2,
            marginBottom: 8,
          }}
        >
          The dates of the activity will be shared in the timelines released by
          the project team
        </Text>

        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#111827",
            marginTop: 8,
            marginBottom: 6,
            textDecoration: "underline",
          }}
        >
          Note:
        </Text>

        <View style={{ marginLeft: 6 }}>
          {noteItems.map((line, index) => (
            <View key={index} style={{ flexDirection: "row", marginBottom: 6 }}>
              <Text style={{ width: 12, fontSize: 8.4, color: "#111827" }}>
                {index + 1}.
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 8.4,
                  color: "#374151",
                  lineHeight: 1.4,
                }}
              >
                {line}
              </Text>
            </View>
          ))}
        </View>

        <PdfFooter pageNumber={10} totalPages={12} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <NumberedTermsTable
          title="ENGAGEMENT MODEL & DEFINITIONS"
          rows={engagementRows}
        />

        <PdfFooter pageNumber={11} totalPages={12} />
      </Page>

      <Page size="A4" style={styles.page} wrap={false}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <View style={styles.tableWrap}>
          {/* HEADER */}
          <View
            style={[
              styles.tableHeader,
              { backgroundColor: "#1E40AF" }, // deeper premium blue
            ]}
          >
            <Text
              style={[
                styles.tableCellHeader,
                {
                  width: "15%",
                  textAlign: "center",
                  color: "transparent", // 🔥 removes "#" visually
                },
              ]}
            >
              .
            </Text>

            <Text
              style={[
                styles.tableCellHeader,
                { width: "35%", letterSpacing: 0.3 },
              ]}
            >
              Description
            </Text>

            <Text
              style={[
                styles.tableCellHeader,
                { width: "50%", letterSpacing: 0.3 },
              ]}
            >
              Details
            </Text>
          </View>

          {bankTableRows.map((row, index) => {
            const isSection = row.no === "1" || row.no === "3";

            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "#E2E8F0",
                  backgroundColor: isSection ? "#EEF2FF" : "#FFFFFF",
                }}
              >
                <Text
                  style={[
                    styles.tableCell,
                    {
                      width: "15%",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#1E3A8A",
                      fontSize: 8.5,
                    },
                  ]}
                >
                  {row.no}
                </Text>

                <Text
                  style={[
                    styles.tableCell,
                    {
                      width: "35%",
                      fontWeight: isSection ? "bold" : "medium",
                      color: isSection ? "#1E3A8A" : "#334155",
                    },
                  ]}
                >
                  {row.label}
                </Text>

                <Text
                  style={[
                    styles.tableCell,
                    {
                      width: "50%",
                      color: isSection ? "#1E3A8A" : "#0F172A",
                      fontWeight: isSection ? "bold" : "medium",
                      lineHeight: 1.5,
                    },
                  ]}
                >
                  {row.value}
                </Text>
              </View>
            );
          })}
        </View>

        <SectionCard title="Payment Terms" soft>
          <View style={styles.bulletLine}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              40% Advance along with the Purchase Order.
            </Text>
          </View>
          <View style={styles.bulletLine}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              40% Against proforma invoice before dispatch after successful FAT.
            </Text>
          </View>
          <View style={styles.bulletLine}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              20% After successful installation and commissioning at site (SAT).
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#F1F5F9",
              paddingVertical: 7,
              paddingHorizontal: 8,
              borderRadius: 4,
              marginTop: 8,
            }}
          >
            <Text
              style={{ fontSize: 8.3, fontWeight: "bold", color: "#4B5563" }}
            >
              Note: All payments should be made via NEFT/RTGS to the
              above-mentioned bank account.
            </Text>
          </View>
        </SectionCard>

        <View style={styles.endDocWrap}>
          <Text style={styles.endDocLine}>
            ***************** END OF DOCUMENT *****************
          </Text>
        </View>

        <PdfFooter pageNumber={12} totalPages={12} />
      </Page>
    </Document>
  );
}

export default ProposalPDF;
