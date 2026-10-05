export const user = {
  name: "Tony",
  fullName: "Tony Starkis",
  initials: "TS",
  plan: "Alfred Plus",
};

export const upNext = {
  time: "18:40",
  title: "Dinner with Mum, Yellow Chilli",
  meta: "Lekki Phase 1 · in 1h 25m",
  cta: "Open the plan",
};

export const homeStats = [
  { label: "Tasks today", value: "5", sub: "2 overdue", tone: "orange" as const, icon: "check" },
  { label: "Approvals", value: "3", sub: "Alfred is waiting", tone: "blue" as const, icon: "shield" },
  { label: "Reminders", value: "4", sub: "Next at 20:00", tone: "violet" as const, icon: "bell" },
  { label: "Wallet", value: "₦248k", sub: "Fund on 30th", tone: "green" as const, icon: "wallet" },
];

export const tasks = [
  { id: "t1", title: "Renew driver's licence", meta: "Overdue · 2 days", tone: "amber" as const, action: "Start" },
  { id: "t2", title: "Send Ada the apartment photos", meta: "Today · 19:00", tone: "blue" as const, action: "Open" },
  { id: "t3", title: "Book dentist for Thursday", meta: "Today", tone: "green" as const, action: "Book" },
];

export const approvals = [
  {
    id: "a1",
    title: "Pay DSTV subscription, ₦24,500",
    meta: "From instruction · Subscriptions",
    tone: "orange" as const,
  },
  {
    id: "a2",
    title: "Book Uber for 18:20 to Lekki",
    meta: "So you make dinner on time",
    tone: "blue" as const,
  },
];

export const messages = [
  { id: "m1", from: "Ada", preview: "Are we still on for Saturday?", time: "2m", unread: true },
  { id: "m2", from: "Alfred", preview: "I drafted your gym cancellation email.", time: "1h", unread: true },
  { id: "m3", from: "Kola", preview: "Sent the flat listing 🙌", time: "3h", unread: false },
  { id: "m4", from: "Mum", preview: "Don't be late tonight o.", time: "5h", unread: false },
];

export const alfredActivity = [
  { id: "act1", title: "Moved your tithe payment to Sunday 08:00", meta: "Instruction · weekly" },
  { id: "act2", title: "Found a cheaper renewal for your car insurance", meta: "Saves ₦31,000 a year" },
  { id: "act3", title: "Filed 4 receipts into Money · Purchases", meta: "This morning" },
];

export const events = [
  { id: "e1", time: "18:40", title: "Dinner with Mum", tag: "Personal", tone: "blue" as const },
  { id: "e2", time: "21:00", title: "Wind down · phone away", tag: "Routine", tone: "violet" as const },
];

export const timeline = [
  {
    day: "Today · Tue 01 Sep",
    items: [
      { time: "09:15", title: "Alfred paid your electricity bill", tag: "Alfred", tone: "orange" as const },
      { time: "12:30", title: "Lunch with the design team", tag: "Event", tone: "blue" as const },
      { time: "16:00", title: "Submit apartment application", tag: "Deadline", tone: "red" as const },
      { time: "18:40", title: "Dinner with Mum, Yellow Chilli", tag: "Booking", tone: "green" as const },
    ],
  },
  {
    day: "Tomorrow · Wed 02 Sep",
    items: [
      { time: "07:00", title: "Gym, leg day", tag: "Routine", tone: "violet" as const },
      { time: "11:00", title: "Call with landlord", tag: "Task", tone: "amber" as const },
      { time: "19:30", title: "Flight to Abuja · AA 314", tag: "Travel", tone: "blue" as const },
    ],
  },
  {
    day: "Thu 03 Sep",
    items: [
      { time: "10:00", title: "Dentist, Smile Studio", tag: "Appointment", tone: "green" as const },
      { time: "23:59", title: "Netflix renews · ₦7,500", tag: "Money", tone: "orange" as const },
    ],
  },
];

export const instructions = [
  { id: "i1", title: "Pay my tithes every Sunday", meta: "Weekly · 08:00 · from Wallet", active: true },
  { id: "i2", title: "Remind me to fund my wallet on the last day of every month", meta: "Monthly · 20:00", active: true },
  { id: "i3", title: "Email my customers every public holiday", meta: "Holiday calendar · Nigeria", active: false },
];

export const createOptions = [
  { id: "c1", title: "Quick note", sub: "Capture it before it's gone", tone: "neutral" as const },
  { id: "c2", title: "Task", sub: "Something you intend to do", tone: "neutral" as const },
  { id: "c3", title: "Reminder", sub: "Nudge me at the right time", tone: "neutral" as const },
];

export const createWorkItems = [
  { id: "w1", eyebrow: "INSTRUCTION", title: "New instruction", sub: "A rule Alfred should always follow", tone: "orange" as const },
  { id: "w2", eyebrow: "EVENT", title: "Event or booking", sub: "Put it on your timeline", tone: "blue" as const },
  { id: "w3", eyebrow: "MONEY", title: "Log a purchase", sub: "Receipts, spend and subscriptions", tone: "green" as const },
  { id: "w4", eyebrow: "WORKSPACE", title: "Project", sub: "Group work that runs for a while", tone: "violet" as const },
];

export const assistantAbilities = [
  { id: "s1", title: "Sort out my day", sub: "Reshuffle tasks around what's fixed" },
  { id: "s2", title: "Handle a bill", sub: "Pay, schedule or dispute it" },
  { id: "s3", title: "Plan something", sub: "Trips, dinners, birthdays, gifts" },
  { id: "s4", title: "Chase someone", sub: "Politely, on your behalf" },
];
