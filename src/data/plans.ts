import { Cake, Plane, UtensilsCrossed, type LucideIcon } from "lucide-react";

export type Plan = {
  id: string;
  title: string;
  when: string;
  where: string;
  icon: LucideIcon;
  tone: "blue" | "orange" | "violet";
  progress: string;
  people: string;
  note: string;
  parts: string[];
  alfred: string;
  itinerary: { id: string; time: string; title: string; meta: string }[];
  tasks: { id: string; title: string; meta: string }[];
  files: string[];
};

export const plans: Plan[] = [
  {
    id: "p1",
    title: "Paris vacation",
    when: "12 – 19 October",
    where: "Paris, France",
    icon: Plane,
    tone: "blue",
    progress: "6 of 11 done",
    people: "You · Ada",
    note: "Eight days, light schedule. Keep two evenings free.",
    parts: ["Flight booked", "Hotel held", "Dinner at Septime", "Places to visit", "Visa documents"],
    alfred: "Alfred is watching fares for the return leg.",
    itinerary: [
      { id: "i1", time: "12 Oct", title: "Flight LOS → CDG", meta: "Air France · 23:10 · 2 seats" },
      { id: "i2", time: "13 Oct", title: "Check in at Hôtel Fabric", meta: "11ᵉ arrondissement · 6 nights" },
      { id: "i3", time: "14 Oct", title: "Dinner at Septime", meta: "20:00 · reservation held" },
      { id: "i4", time: "16 Oct", title: "Louvre and Tuileries", meta: "Morning · tickets not booked" },
      { id: "i5", time: "19 Oct", title: "Flight CDG → LOS", meta: "Air France · 13:40" },
    ],
    tasks: [
      { id: "t1", title: "Submit visa documents", meta: "Due Friday" },
      { id: "t2", title: "Book Louvre tickets", meta: "Before 10 Oct" },
      { id: "t3", title: "Order euros", meta: "Anytime" },
    ],
    files: ["Passport scan.pdf", "Flight itinerary.pdf", "Hotel confirmation.pdf"],
  },
  {
    id: "p2",
    title: "Dinner with Mum",
    when: "Tonight · 18:40",
    where: "Yellow Chilli, Lekki Phase 1",
    icon: UtensilsCrossed,
    tone: "orange",
    progress: "3 of 4 done",
    people: "You · Mum",
    note: "Her favourite table is by the window — ask when you arrive.",
    parts: ["Table for two — Yellow Chilli", "Ride at 18:20", "Pick up flowers"],
    alfred: "Alfred will nudge you 40 minutes before.",
    itinerary: [
      { id: "i1", time: "17:45", title: "Pick up flowers", meta: "Florist on Admiralty Way" },
      { id: "i2", time: "18:20", title: "Ride to the restaurant", meta: "Booked · 18 minutes" },
      { id: "i3", time: "18:40", title: "Dinner — table for two", meta: "Yellow Chilli · reserved" },
      { id: "i4", time: "21:00", title: "Drop Mum home", meta: "Ikoyi" },
    ],
    tasks: [
      { id: "t1", title: "Confirm the table", meta: "Done" },
      { id: "t2", title: "Ask about her check-up", meta: "Tonight" },
    ],
    files: ["Reservation.pdf"],
  },
  {
    id: "p3",
    title: "Ada's birthday",
    when: "Sat 20 September",
    where: "To be decided · Lagos",
    icon: Cake,
    tone: "violet",
    progress: "2 of 7 done",
    people: "You · 8 guests",
    note: "Keep it a surprise until the day.",
    parts: ["Venue shortlist", "Cake order", "Guest list", "Gift budget ₦120,000"],
    alfred: "Alfred drafted the invite message.",
    itinerary: [
      { id: "i1", time: "18 Sep", title: "Confirm the venue", meta: "Three places shortlisted" },
      { id: "i2", time: "19 Sep", title: "Collect the cake", meta: "Sweet Kiwi · ordered" },
      { id: "i3", time: "20 Sep", title: "Dinner and cake", meta: "19:00 · 9 people" },
    ],
    tasks: [
      { id: "t1", title: "Send the invite message", meta: "Draft ready" },
      { id: "t2", title: "Buy the gift", meta: "Budget ₦120,000" },
      { id: "t3", title: "Confirm guest count", meta: "By Thursday" },
    ],
    files: ["Guest list.numbers", "Venue quotes.pdf"],
  },
];

export const getPlan = (id: string) => plans.find((p) => p.id === id);
