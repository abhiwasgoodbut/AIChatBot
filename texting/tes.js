const usage = [
  {
    userId: 1,
    name: "Abhinay",
    plan: "Premium",
    logs: [
      { date: "2025-01-01", actions: 30 },
      { date: "2025-01-02", actions: 50 }
    ]
  },
  {
    userId: 2,
    name: "Sara",
    plan: "Free",
    logs: [
      { date: "2025-01-01", actions: 5 },
      { date: "2025-01-03", actions: 8 }
    ]
  }
];

const group = {}
usage.forEach(n=> n.logs.forEach(m=> group[n.name] = (group[n.name] || 0) + m.actions))
console.log(group);


