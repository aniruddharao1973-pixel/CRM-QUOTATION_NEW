// src\features\quotations\pdf\QuotationPdfDocumentV2.jsx
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
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 28,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#1F2937",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#DBEAFE",
  },
  logoRow: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  logoImage: {
    width: 110,
    height: 28,
    objectFit: "contain",
  },
  tagline: {
    fontSize: 8.5,
    color: "#3B82F6",
    marginTop: 3,
    letterSpacing: 0.8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  metaBox: {
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
  },
  metaLabel: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#1E40AF",
    borderRightWidth: 1.5,
    borderRightColor: "#BFDBFE",
  },
  metaValue: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 8.5,
    color: "#3B82F6",
    fontWeight: "medium",
  },
  pageTitleWrap: {
    alignItems: "center",
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    letterSpacing: 1.5,
    textAlign: "center",
  },
  titleUnderline: {
    width: 70,
    height: 3.5,
    backgroundColor: "#3B82F6",
    marginTop: 7,
    borderRadius: 2,
  },
  sectionCard: {
    borderWidth: 1.5,
    borderColor: "#DBEAFE",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
  },
  sectionCardSoft: {
    borderWidth: 1.5,
    borderColor: "#DBEAFE",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 14,
    backgroundColor: "#F8FAFC",
  },
  sectionHeaderBlue: {
    backgroundColor: "#DBEAFE",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: "#BFDBFE",
  },
  sectionHeaderSoft: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: "#BFDBFE",
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  sectionHeaderTextBlue: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#1E40AF",
    letterSpacing: 0.3,
  },
  sectionHeaderTextDark: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0F172A",
    letterSpacing: 0.4,
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoRowNoGap: {
    flexDirection: "row",
  },
  infoLabel: {
    width: "30%",
    fontSize: 9,
    fontWeight: "bold",
    color: "#0F172A",
    paddingRight: 8,
  },
  infoValueText: {
    width: "70%",
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.4,
  },
  infoValueNode: {
    width: "70%",
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#374151",
    marginBottom: 7,
    textAlign: "justify",
  },
  highlightBox: {
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    backgroundColor: "#FEF3C7",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 8,
    marginBottom: 10,
  },
  highlightText: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: "#92400E",
    fontWeight: "bold",
  },
  tableWrap: {
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1E40AF",
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
    paddingHorizontal: 6,
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.3)",
  },
  tableCell: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontSize: 8.5,
    color: "#374151",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    lineHeight: 1.4,
  },
  tableCellLast: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.4,
  },
  tableCellHighlighted: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontSize: 8.5,
    color: "#1E40AF",
    fontWeight: "bold",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    lineHeight: 1.4,
  },
  tableCellHighlightedLast: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontSize: 8.5,
    color: "#1E40AF",
    fontWeight: "bold",
    lineHeight: 1.4,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#DBEAFE",
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
    fontSize: 9,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 2,
  },
  footerSub: {
    fontSize: 8,
    color: "#6B7280",
    fontStyle: "italic",
    marginBottom: 1,
  },
  footerRightText: {
    fontSize: 8,
    color: "#6B7280",
    fontStyle: "italic",
    marginBottom: 1,
    textAlign: "right",
  },
  bulletLine: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bulletMark: {
    width: 12,
    fontSize: 8.5,
    color: "#3B82F6",
    fontWeight: "bold",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#1F2937",
    lineHeight: 1.5,
  },
  twoColGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modelCard: {
    width: "48.5%",
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  modelTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 5,
  },
  modelDesc: {
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.4,
  },
  stepWrap: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 6,
    padding: 12,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  stepCircleWrap: {
    width: 24,
    alignItems: "center",
  },
  stepCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNum: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "bold",
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#BFDBFE",
    marginTop: -1,
  },
  stepContent: {
    flex: 1,
    paddingLeft: 10,
  },
  stepTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 3,
  },
  stepDesc: {
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.4,
  },
  centeredIntro: {
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.45,
    marginBottom: 10,
  },
  categoryBox: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  tinyMuted: {
    fontSize: 8,
    color: "#374151",
    lineHeight: 1.4,
  },
  gstSummaryWrap: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  gstBox: {
    width: "48%",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 8,
    overflow: "hidden",
  },
  gstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  gstRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  gstLabel: {
    fontSize: 9,
    color: "#1F2937",
  },
  gstValue: {
    fontSize: 9,
    color: "#0F172A",
    fontWeight: "bold",
  },
  gstGrandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#D1FAE5",
  },
  gstGrandLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#065F46",
  },
  gstGrandValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#047857",
  },
  endDocWrap: {
    marginTop: 20,
    alignItems: "center",
  },
  endDocLine: {
    fontSize: 8.5,
    color: "#6B7280",
    letterSpacing: 1.2,
  },
  divider: {
    height: 1.5,
    backgroundColor: "#BFDBFE",
    marginTop: 12,
  },
});

const bankTableRows = [
  { no: "1", label: "ACCOUNT DETAILS", value: "" },
  { no: "1.1", label: "Name of the Bank", value: "Kotak Mahindra Bank" },
  {
    no: "1.2",
    label: "Account Holder's Name",
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
      '#22-D1, "Micrologic Drive", KIADB Industrial Area, Phase 1, Kumbalagodu (Bengaluru-Mysuru Highway), Bengaluru-560 074, India',
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
    "Delayed Delivery of the Project due to delays at customer's end or force majeure",
  lines: [
    "In the event the customer does not take the delivery of the Project beyond 3 weeks of the readiness of the project at our factory or hold from the customer's end for any other reason, the customer is liable to make the payment that is due as per the agreed terms with applicable taxes. Micrologic will intimate the readiness of the project with an internal test report.",
    "The reasons for such delays could be due to customer's changed timelines, Lockdown/Curfew due to pandemic or any reasons causing a delay for the customer to take the delivery.",
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
      "In this engagement model, the software will be built for a given specification and the software will be the buyer's property. Micrologic will charge on a Time and Effort basis, wherein the Man-hours spent on software development will be charged. The software can either be developed at Micrologic or at the buyer's premises as necessary. The source code will be the property of the buyer.",
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
      "Time lines quoted will be adhered by Micrologic. Where the buyer has to provide details like drawings, information, samples, if delayed from the buyer's end, which would affect the project time lines, the affect of the delays will be borne by the buyer.",
      "If the equipment is not taken by the buyer after readiness, within a reasonable time, the buyer shall have to pay the full balance amount and Micrologic is entitled to impose demurrage charges to the buyer for keeping the equipment at Micrologic.",
    ],
  },
  {
    no: "1.7",
    heading: "Pre-Shipping Acceptance",
    lines: [
      "The buyer will validate the line/equipment before dispatch at his discretion and a 'Dispatch Clearance' is necessary for Micrologic to arrange dispatch.",
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
  return (
    <View style={styles.stepWrap}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <View key={`${step.title}-${index}`} style={styles.stepRow}>
            <View style={styles.stepCircleWrap}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNum}>{index + 1}</Text>
              </View>
              {!isLast ? <View style={styles.stepLine} /> : null}
            </View>

            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.description}</Text>
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

    // 🔥 remove Rs / ₹ / INR
    .replace(/(Rs\.?|₹|INR)/gi, "")

    // existing cleanup
    .replace(/[\u00B9\u00B2\u00B3\u2070-\u2079]/g, "")
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
    .replace(/[^\d.,]/g, "")
    .replace(/,/g, "");

  const num = Number(cleaned);
  return Number.isFinite(num) && num > 0
    ? `Rs. ${num.toLocaleString("en-IN")}`
    : "-";
};

const cleanPdfText = (value) => {
  if (value == null) return "-";

  return String(value)
    .normalize("NFKC")
    .replace(/[\u00B9\u00B2\u00B3\u2070-\u2079]/g, "")
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
    .replace(/^[^a-zA-Z0-9]+/, "")
    .trim();
};

const cleanNumber = (value) => {
  if (value === "-" || value == null) return 0;

  const cleaned = String(value)
    .normalize("NFKC")
    .replace(/\u00B9/g, "")
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
    .replace(/[\u00B2\u00B3\u2070-\u2079\u2032\u2033\u00B0\u00BA]/g, "")
    .replace(/(Rs\.?|₹|INR)/gi, "")
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
                paddingVertical: 6,
                paddingHorizontal: 6,
                borderRightWidth: 1,
                borderRightColor: "#E5E7EB",
              }}
            >
              <Text
                style={{ fontSize: 8.5, fontWeight: "bold", color: "#0F172A" }}
              >
                {row.no}
              </Text>
            </View>

            <View
              style={{ width: "93%", paddingVertical: 6, paddingHorizontal: 6 }}
            >
              {row.heading ? (
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "bold",
                    color: "#0F172A",
                    marginBottom: row.lines && row.lines.length ? 3 : 0,
                  }}
                >
                  {row.heading}
                </Text>
              ) : null}

              {(row.lines || []).map((line, i) => (
                <Text
                  key={i}
                  style={{
                    fontSize: 8.5,
                    color: "#1F2937",
                    lineHeight: 1.4,
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
  const HSN_SAC = "90318000";
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
        description: cleanPdfText(
          (sub.description || sub.name || "-")
            .normalize("NFKC")
            .replace(/[\u00B9\u00B2\u00B3\u2070-\u2079]/g, "")
            .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
            .replace(/^[^a-zA-Z0-9]+/, ""),
        ),
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
    { key: "sku", title: "SKU", width: "10%", align: "center" },
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
    { key: "gst", title: "GST", width: "8%", align: "center" },
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
  const cgst = subtotal * (gstRate / 2 / 100);
  const sgst = subtotal * (gstRate / 2 / 100);
  const grandTotal = subtotal + cgst + sgst;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <View style={styles.pageTitleWrap}>
          <Text style={styles.pageTitle}>COMMERCIAL PROPOSAL</Text>
          <View style={styles.titleUnderline} />
        </View>

        <InfoCard title="Proposal Submitted to:" items={customerItems} />
        <InfoCard title="Project Details:" items={projectItems} />

        <View
          style={{
            marginTop: "auto",
            borderTopWidth: 2,
            borderTopColor: "#DBEAFE",
            paddingTop: 12,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
              color: "#0F172A",
              marginBottom: 4,
              textAlign: "center",
              letterSpacing: 0.6,
            }}
          >
            {company.name}
          </Text>
          <Text
            style={{
              fontSize: 8.5,
              color: "#374151",
              marginBottom: 2,
              textAlign: "center",
              lineHeight: 1.45,
            }}
          >
            {company.address}
          </Text>
          <Text
            style={{
              fontSize: 8.5,
              color: "#3B82F6",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            {company.website} | M: {company.phone}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {company.contacts.map((contact, index) => (
              <View
                key={`${contact.name}-${index}`}
                style={{
                  flex: 1,
                  backgroundColor: "#EFF6FF",
                  padding: 9,
                  borderWidth: 1.5,
                  borderColor: "#BFDBFE",
                  borderRadius: 6,
                  marginRight: index === company.contacts.length - 1 ? 0 : 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "bold",
                    color: "#0F172A",
                    marginBottom: 3,
                  }}
                >
                  {contact.name}
                </Text>
                <Text
                  style={{ fontSize: 7.5, color: "#374151", marginBottom: 1 }}
                >
                  {contact.email}
                </Text>
                <Text style={{ fontSize: 7.5, color: "#374151" }}>
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
            fontSize: 16,
            fontWeight: "bold",
            color: "#0F172A",
            marginBottom: 12,
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
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#0F172A",
            marginBottom: 12,
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          Confidentiality &amp; General Conditions
        </Text>

        <Text style={styles.paragraph}>
          This techno commercial proposal (the &quot;Proposal&quot;) is
          submitted with the intent of executing a definitive and legally
          binding agreement (the &quot;Agreement&quot;) following an award of
          business to Micrologic Integrated Systems (P) Limited (Micrologic).
        </Text>
        <Text style={styles.paragraph}>
          The Proposal itself is a legally binding offer to contract and in the
          event of an award to Micrologic, it shall execute an Agreement that
          will be the complete agreement between the parties, however, where the
          parties do not execute any such Agreement, then the terms and
          conditions mentioned in this Proposal shall govern any purchase
          order(s) issued by the Customer in reference to the specific project.
        </Text>
        <Text style={styles.paragraph}>
          This Proposal constitutes confidential and proprietary information of
          Micrologic and requires that Customer treat the information contained
          in this Proposal as confidential. Customer may use the information
          contained in this Proposal solely for the purposes of evaluating this
          Proposal and executing the Agreement with Micrologic. This Proposal
          and all supporting documentation and drawings, Images and concepts
          provided to Customer in connection with this Proposal shall remain the
          property of Micrologic and must be returned immediately upon request.
        </Text>
        <Text style={styles.paragraph}>
          This Proposal is based upon the set of requirements provided by
          Customer to Micrologic, and certain reasonable assumptions taken by
          Micrologic. If Customer alters the requirements or if any assumption
          stated herein are false or inaccurate, then this Proposal, including
          pricing, may change. Implementation of any services detailed in this
          Proposal is subject to applicable legal and regulatory norms and
          requirements in force as on the date when services are to be
          implemented and such implementation may vary to cater to the
          requirements of such applicable legal and regulatory norms and
          requirements.
        </Text>

        <HighlightBox text="These are customized equipment, this proposal is indicative of the concept there could be changes during the detailed design which will be dealt during Design Approval Process (DAP) & will be subjected to the customer approval." />

        <PdfFooter pageNumber={3} />
      </Page>

      {/* Pricing Page - Page 4 */}
      <Page size="A4" style={styles.page} wrap>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#0F172A",
            marginBottom: 10,
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
        <Text
          style={{
            fontSize: 9,
            fontWeight: "bold",
            color: "#1E40AF",
            marginBottom: 10,
          }}
        >
          {quotation?.deal?.dealName || proposalData.project.name}
        </Text>

        <View wrap={false}>
          <TableBlock columns={pricingColumns} data={pricingRows} />
        </View>

        <View style={styles.gstSummaryWrap} wrap={false}>
          <View style={styles.gstBox}>
            <View style={styles.gstRow}>
              <Text style={styles.gstLabel}>Subtotal</Text>
              <Text style={styles.gstValue}>{formatCurrency(subtotal)}</Text>
            </View>

            <View style={styles.gstRow}>
              <Text style={styles.gstLabel}>Taxable Value</Text>
              <Text style={styles.gstValue}>{formatCurrency(subtotal)}</Text>
            </View>

            <View style={styles.gstRow}>
              <Text style={styles.gstLabel}>CGST (9%)</Text>
              <Text style={styles.gstValue}>{formatCurrency(cgst)}</Text>
            </View>

            <View style={styles.gstRowLast}>
              <Text style={styles.gstLabel}>SGST (9%)</Text>
              <Text style={styles.gstValue}>{formatCurrency(sgst)}</Text>
            </View>

            <View style={styles.gstGrandRow}>
              <Text style={styles.gstGrandLabel}>Grand Total</Text>
              <Text style={styles.gstGrandValue}>
                {formatCurrency(grandTotal)}
              </Text>
            </View>
          </View>
        </View>

        <PdfFooter pageNumber={4} totalPages={12} />
      </Page>

      {/* Price Basis & Delivery - Page 5 */}
      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

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
              backgroundColor: "#EFF6FF",
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: "bold", color: "#374151" }}>
              Note: All payments should be made via NEFT/RTGS to the
              above-mentioned bank account.
            </Text>
          </View>
        </SectionCard>

        <HighlightBox
          text={
            quotation?.notes ||
            "These are customized equipment; final design may change during DAP with customer approval."
          }
        />

        <SectionCard title="Price Basis & Delivery" soft>
          <Text
            style={{
              fontSize: 9,
              fontWeight: "bold",
              color: "#374151",
              marginBottom: 7,
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

      {/* Warranty Page - Page 6 */}
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
              backgroundColor: "#DBEAFE",
              paddingVertical: 9,
              paddingHorizontal: 12,
              borderRadius: 6,
              marginTop: 12,
              alignItems: "center",
              borderWidth: 1.5,
              borderColor: "#93C5FD",
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: "bold", color: "#1E40AF" }}>
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
            fontSize: 16,
            fontWeight: "bold",
            color: "#0F172A",
            marginBottom: 5,
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

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#0F172A",
            marginBottom: 5,
          }}
        >
          Project Execution Process Flow
        </Text>
        <Text style={styles.centeredIntro}>
          Standard operating procedure for the successful delivery of the
          proposed solution.
        </Text>

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
            fontSize: 12,
            fontWeight: "bold",
            color: "#0F172A",
            marginTop: 16,
            marginBottom: 10,
            textDecoration: "underline",
          }}
        >
          Order Cancellation
        </Text>

        {orderCancellationNotes.map((line, index) => (
          <Text
            key={index}
            style={{
              fontSize: 9,
              color: "#1F2937",
              lineHeight: 1.5,
              marginBottom: 9,
              textAlign: "justify",
            }}
          >
            {line}
          </Text>
        ))}

        <View style={{ marginLeft: 8, marginTop: 3 }}>
          {cancellationItems.map((item) => (
            <View
              key={item.no}
              style={{ flexDirection: "row", marginBottom: 7 }}
            >
              <Text style={{ width: 14, fontSize: 9, color: "#0F172A" }}>
                {item.no}.
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 9,
                  color: "#1F2937",
                  lineHeight: 1.45,
                }}
              >
                {item.text}
              </Text>
            </View>
          ))}
        </View>

        <Text
          style={{
            fontSize: 9,
            color: "#1F2937",
            marginTop: 3,
            marginBottom: 10,
          }}
        >
          The dates of the activity will be shared in the timelines released by
          the project team
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#0F172A",
            marginTop: 10,
            marginBottom: 7,
            textDecoration: "underline",
          }}
        >
          Note:
        </Text>

        <View style={{ marginLeft: 8 }}>
          {noteItems.map((line, index) => (
            <View key={index} style={{ flexDirection: "row", marginBottom: 7 }}>
              <Text style={{ width: 14, fontSize: 9, color: "#0F172A" }}>
                {index + 1}.
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 9,
                  color: "#1F2937",
                  lineHeight: 1.45,
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
          <View style={[styles.tableHeader, { backgroundColor: "#1E40AF" }]}>
            <Text
              style={[
                styles.tableCellHeader,
                {
                  width: "15%",
                  textAlign: "center",
                  color: "transparent",
                },
              ]}
            >
              .
            </Text>

            <Text
              style={[
                styles.tableCellHeader,
                { width: "35%", letterSpacing: 0.4 },
              ]}
            >
              Description
            </Text>

            <Text
              style={[
                styles.tableCellHeader,
                { width: "50%", letterSpacing: 0.4 },
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
                  borderBottomColor: "#E5E7EB",
                  backgroundColor: isSection ? "#EFF6FF" : "#FFFFFF",
                }}
              >
                <Text
                  style={[
                    styles.tableCell,
                    {
                      width: "15%",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#1E40AF",
                      fontSize: 9,
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
                      color: isSection ? "#1E40AF" : "#1F2937",
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
                      color: isSection ? "#1E40AF" : "#0F172A",
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
