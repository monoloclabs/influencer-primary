export type Employee = {
  id: string;
  name: string;
  role: string;
  initials: string;
  phone: string;
  whatsapp: string;
  email: string;
  salary: string;
  bank: string;
  status: "Active" | "On leave" | "Probation";
  since: string;
};

export const employees: Employee[] = [
  {
    id: "e1",
    name: "Chidinma Okafor",
    role: "Shop manager",
    initials: "CO",
    phone: "+234 803 441 2290",
    whatsapp: "+234 803 441 2290",
    email: "chidinma@brightlane.ng",
    salary: "₦320,000 / month",
    bank: "GTBank · 0123••••88",
    status: "Active",
    since: "Joined Mar 2023",
  },
  {
    id: "e2",
    name: "Tunde Bakare",
    role: "Logistics lead",
    initials: "TB",
    phone: "+234 706 118 7745",
    whatsapp: "+234 706 118 7745",
    email: "tunde@brightlane.ng",
    salary: "₦245,000 / month",
    bank: "Zenith · 2210••••41",
    status: "Active",
    since: "Joined Aug 2023",
  },
  {
    id: "e3",
    name: "Amaka Eze",
    role: "Customer support",
    initials: "AE",
    phone: "+234 815 903 6612",
    whatsapp: "+234 815 903 6612",
    email: "amaka@brightlane.ng",
    salary: "₦180,000 / month",
    bank: "Access · 0994••••07",
    status: "On leave",
    since: "Joined Jan 2024",
  },
  {
    id: "e4",
    name: "Segun Ade",
    role: "Sales associate",
    initials: "SA",
    phone: "+234 802 774 1130",
    whatsapp: "+234 802 774 1130",
    email: "segun@brightlane.ng",
    salary: "₦150,000 / month",
    bank: "UBA · 1187••••55",
    status: "Probation",
    since: "Joined Jul 2026",
  },
];

export const workItems = [
  { id: "w1", title: "Call the packaging supplier", who: "Tunde Bakare", meta: "Due today · 15:00", tone: "orange" as const, tag: "Today" },
  { id: "w2", title: "Send the Ikeja customer invoice", who: "Chidinma Okafor", meta: "Due today · 17:30", tone: "orange" as const, tag: "Today" },
  { id: "w3", title: "Restock inventory — 40 cartons", who: "Segun Ade", meta: "Tomorrow", tone: "blue" as const, tag: "Upcoming" },
  { id: "w4", title: "Deliver signed contract to Femi", who: "Tunde Bakare", meta: "Thursday", tone: "blue" as const, tag: "Upcoming" },
  { id: "w5", title: "Follow up with the Yaba customer", who: "Amaka Eze", meta: "Friday", tone: "violet" as const, tag: "Upcoming" },
  { id: "w6", title: "Reconcile last week's deliveries", who: "Chidinma Okafor", meta: "Completed Monday", tone: "green" as const, tag: "Done" },
];

export const salaryRows = [
  { id: "s1", name: "Chidinma Okafor", amount: "₦320,000", status: "Paid" as const, when: "Paid 28 Aug" },
  { id: "s2", name: "Tunde Bakare", amount: "₦245,000", status: "Paid" as const, when: "Paid 28 Aug" },
  { id: "s3", name: "Amaka Eze", amount: "₦180,000", status: "Pending" as const, when: "Due 30 Sep" },
  { id: "s4", name: "Segun Ade", amount: "₦150,000", status: "Pending" as const, when: "Due 30 Sep" },
];

export const officeActivity = [
  { id: "a1", time: "09:10", title: "Tunde marked “Deliver document” as complete", meta: "Work · Logistics" },
  { id: "a2", time: "10:25", title: "Alfred sent the invoice email to Ikeja Stores", meta: "Business action" },
  { id: "a3", time: "11:40", title: "You assigned “Restock inventory” to Segun", meta: "Work" },
  { id: "a4", time: "13:05", title: "Supplier agreement added to documents", meta: "Files" },
  { id: "a5", time: "16:30", title: "August salary marked paid for 2 staff", meta: "Salaries" },
];

export const expenditure = [
  { id: "x1", label: "Logistics & fuel", amount: "₦186,000" },
  { id: "x2", label: "Packaging materials", amount: "₦94,500" },
  { id: "x3", label: "Shop utilities", amount: "₦61,200" },
];
