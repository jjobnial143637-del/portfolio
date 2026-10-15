// All site content lives here. Edit this file; no build step needed.
window.PORTFOLIO = {
  name: "John Justine Obnial",
  title: "AI Engineering Student",
  hook: "First-year student learning how models work by building them from scratch, one notebook at a time.",

  about: {
    bio: [
      "I'm a first-year AI engineering student who likes understanding things from the bottom up. Before reaching for a library, I try to write the math out by hand and implement it in NumPy.",
      "Outside class I maintain the website for my family's travel agency, which taught me how to ship something real people depend on."
    ],
    education: {
      degree: "B.S. Artificial Intelligence Engineering",
      school: "Mapua University",
      years: "2026 to 2030 (expected)",
      coursework: ["Calculus I", "Algebra", "Intro to Programming (Python)",]
    },
    focus: [
      { icon: "ph-file-py", name: "Python", text: "Daily driver for coursework, scripts and every project on this page." },
      { icon: "ph-graph", name: "ML fundamentals", text: "Regression, classification, gradient descent and backprop, built from first principles." },
      { icon: "ph-math-operations", name: "Math", text: "Algebra, calculus and probability: the parts of ML that don't change." }
    ]
  },

  projects: [
    {
      featured: true,
      name: "John J Travel Agency Company Website",
      summary: "Designed and built the public site for my family's travel agency: tour packages, destination pages and an inquiry form that emails the team directly.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive design"],
      image: "https://picsum.photos/id/1015/1200/750",
      alt: "River valley between mountains, a typical tour destination",
      links: [{ label: "Visit site", href: "#" }, { label: "Source", href: "#" }]
    },
  ],

  skills: [
    { group: "Languages", items: ["Python", "JavaScript", "HTML & CSS", "C (learning)"] },
    { group: "ML & Data", items: ["NumPy"] },
    { group: "Tools", items: ["Git & GitHub", "VS Code", "Linux shell", "Google Colab", "Figma"] }
  ],

  contact: {
    blurb: "Open to internships, research assistant roles and study groups. Email is the fastest way to reach me.",
    email: "jjobnial143637@gmail.com",
    github: "https://github.com/jjobnial143637-del",
    linkedin: "https://www.linkedin.com/in/john-justine-obnial/"
  }
};
