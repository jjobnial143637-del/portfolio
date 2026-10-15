// All site content lives here. Edit this file; no build step needed.
window.PORTFOLIO = {
  name: "Jamie Navarro",
  title: "AI Engineering Student",
  hook: "First-year student learning how models work by building them from scratch, one notebook at a time.",

  about: {
    bio: [
      "I'm a first-year AI engineering student who likes understanding things from the bottom up. Before reaching for a library, I try to write the math out by hand and implement it in NumPy.",
      "Outside class I maintain the website for my family's travel agency, which taught me how to ship something real people depend on."
    ],
    education: {
      degree: "B.Eng. Artificial Intelligence Engineering",
      school: "Your University",
      years: "2025 to 2029 (expected)",
      coursework: ["Calculus I", "Linear Algebra", "Intro to Programming (Python)", "Discrete Mathematics"]
    },
    focus: [
      { icon: "ph-file-py", name: "Python", text: "Daily driver for coursework, scripts and every project on this page." },
      { icon: "ph-graph", name: "ML fundamentals", text: "Regression, classification, gradient descent and backprop, built from first principles." },
      { icon: "ph-math-operations", name: "Math", text: "Linear algebra, calculus and probability: the parts of ML that don't change." }
    ]
  },

  projects: [
    {
      featured: true,
      name: "Family travel agency website",
      summary: "Designed and built the public site for my family's travel agency: tour packages, destination pages and an inquiry form that emails the team directly.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive design"],
      image: "https://picsum.photos/id/1015/1200/750",
      alt: "River valley between mountains, a typical tour destination",
      links: [{ label: "Visit site", href: "#" }, { label: "Source", href: "#" }]
    },
    {
      name: "Digit classifier in pure NumPy",
      summary: "A two-layer neural network trained on MNIST with hand-written forward and backward passes. No frameworks.",
      tags: ["Python", "NumPy", "Matplotlib"],
      image: "https://picsum.photos/id/0/800/500",
      alt: "Laptop keyboard on a desk",
      links: [{ label: "Source", href: "#" }]
    },
    {
      name: "Lecture notes search",
      summary: "Ask a question in plain English and get the matching paragraph from a semester of class notes, using sentence embeddings.",
      tags: ["Python", "sentence-transformers", "FAISS"],
      image: "https://picsum.photos/id/24/800/500",
      alt: "Open book on a table",
      links: [{ label: "Source", href: "#" }]
    }
  ],

  skills: [
    { group: "Languages", items: ["Python", "JavaScript", "HTML & CSS", "SQL", "C (learning)"] },
    { group: "ML & Data", items: ["NumPy", "pandas", "scikit-learn", "PyTorch (learning)", "Matplotlib", "Jupyter"] },
    { group: "Tools", items: ["Git & GitHub", "VS Code", "Linux shell", "Google Colab", "Figma"] }
  ],

  contact: {
    blurb: "Open to internships, research assistant roles and study groups. Email is the fastest way to reach me.",
    email: "jamie.navarro@example.com",
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username"
  }
};
