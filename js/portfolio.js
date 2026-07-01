const toggle = document.querySelector(".mobile-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to white theme" : "Switch to dark theme"
  );
  themeIcon.className = isDark ? "bi bi-sun" : "bi bi-moon-stars";
}

applyTheme(document.documentElement.dataset.theme || "light");

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((item) => {
  revealObserver.observe(item);
});

document.getElementById("year").textContent = new Date().getFullYear();


if (window.GitHubCalendar) {
  GitHubCalendar(".calendar", "rohansah29", { responsive: true });
}

const chatbot = document.getElementById("portfolio-chatbot");
const chatbotToggle = chatbot.querySelector(".chatbot-toggle");
const chatbotClose = chatbot.querySelector(".chatbot-close");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");

const rohanAnswers = [
  {
    keywords: ["experience", "company", "job", "work", "hyperface", "current", "role"],
    answer:
      "Rohan is currently an Application Engineer at Hyperface Technologies Pvt. Ltd. since Mar 2024. He works on fintech platforms using React.js, TypeScript, Node.js, Express, MySQL, Jenkins and CI/CD, with ownership across frontend development, testing and production deployment.",
  },
  {
    keywords: ["cbcc", "credit", "card", "bank", "au", "cheq", "fintech"],
    answer:
      "Rohan has worked on Co-branded Credit Card platforms, including CBCC Lite live with AU Bank in partnership with Cheq. He has contributed to partner solutions for AU Bank, Yes Bank, Federal Bank and NCB, plus integrations involving Flipkart, Ixigo and Cheq.",
  },
  {
    keywords: ["impact", "performance", "latency", "uptime", "improve", "revenue"],
    answer:
      "Some measurable impact: 40% frontend performance improvement, 35% API latency reduction in critical flows, 30% faster partner onboarding, 25% bounce-rate reduction across key journeys and collaboration on systems with 99.9% production uptime.",
  },
  {
    keywords: ["skill", "skills", "tech", "stack", "technology", "language"],
    answer:
      "Rohan's core stack includes React.js, TypeScript, JavaScript, Node.js, Express, MongoDB, MySQL, HTML, CSS, Git, GitHub, Jenkins and CI/CD. He is strongest in frontend-heavy full stack product development.",
  },
  {
    keywords: ["project", "projects", "portfolio", "work sample", "github"],
    answer:
      "Rohan's featured projects include TuneWaves, Money Mentor, MixMasterGear and Gent's Hub. They show React UI work, backend/API understanding, ecommerce flows, fintech-style user journeys and deployment experience.",
  },
  {
    keywords: ["contact", "email", "phone", "linkedin", "whatsapp", "hire", "connect"],
    answer:
      "You can contact Rohan at 00rohansah00.kr@gmail.com or +91 7992438393. LinkedIn: linkedin.com/in/kumar-rohan-915538214 and GitHub: github.com/rohansah29.",
  },
  {
    keywords: ["resume", "cv", "download"],
    answer:
      "Rohan's resume is available from the Resume button in the top navigation. It opens the PDF directly so recruiters can review or download it.",
  },
  {
    keywords: ["intern", "masai", "mentor", "teaching"],
    answer:
      "Before Hyperface, Rohan worked as a MERN Stack Developer Intern at Masai School from Nov 2023 to Apr 2024, mentoring students and helping improve code quality and project completion rates.",
  },
];

function addChatMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `chat-message ${sender}`;
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getRohanAnswer(question) {
  const normalizedQuestion = question.toLowerCase();
  const match = rohanAnswers.find((item) =>
    item.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );

  if (match) {
    return match.answer;
  }

  return "Thanks for asking. I do not have the exact answer for this right now, but I will note your query and Rohan can share the right information with you later. You can also email him at 00rohansah00.kr@gmail.com.";
}

function askChatbot(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  addChatMessage(cleanQuestion, "user");
  window.setTimeout(() => {
    addChatMessage(getRohanAnswer(cleanQuestion), "bot");
  }, 260);
}

chatbotToggle.addEventListener("click", () => {
  const isOpen = chatbot.classList.toggle("open");
  chatbotToggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen && chatbotMessages.children.length === 0) {
    addChatMessage(
      "Hi, how can I help you? You can ask what information you want to know about Rohan.",
      "bot"
    );
    chatbotInput.focus();
  }
});

chatbotClose.addEventListener("click", () => {
  chatbot.classList.remove("open");
  chatbotToggle.setAttribute("aria-expanded", "false");
});

chatbotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  askChatbot(chatbotInput.value);
  chatbotInput.value = "";
});

document.querySelectorAll(".chat-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    askChatbot(chip.dataset.question);
  });
});

function openAndDownload(e) {
  e.preventDefault();
  e.stopPropagation();

  const url = "./Kumar_Rohan_CV.pdf";

  window.open(url, "_blank");

  const link = document.createElement("a");
  link.href = url;
  link.download = "Kumar_Rohan_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return false;
}

