/* ============================================
   ULTIMATE2SURE - MAIN JS
============================================ */

/* -------------------------------
   LOADER
-------------------------------- */
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  }
});

/* -------------------------------
   NAVBAR SCROLL EFFECT
-------------------------------- */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }
});

/* -------------------------------
   MOBILE MENU
-------------------------------- */
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});

mobileMenu?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("open");
  });
});

/* -------------------------------
   SCROLL ANIMATION
-------------------------------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".animate-on-scroll").forEach(el => {
  observer.observe(el);
});

/* -------------------------------
   COUNTER ANIMATION
-------------------------------- */
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  counter.innerText = "0";
  const update = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 100;

    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}`;
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };
  update();
});

/* -------------------------------
   DARK MODE TOGGLE
-------------------------------- */
const themeToggle = document.querySelector(".theme-toggle");

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

themeToggle?.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) setTheme(savedTheme);

/* -------------------------------
   COOKIE CONSENT
-------------------------------- */
const cookieBanner = document.querySelector(".cookie-banner");
const cookieBtn = document.querySelector(".cookie-accept");

if (!localStorage.getItem("cookieAccepted")) {
  cookieBanner?.classList.remove("hidden");
}

cookieBtn?.addEventListener("click", () => {
  localStorage.setItem("cookieAccepted", "true");
  cookieBanner?.classList.add("hidden");
});

/* -------------------------------
   PROGRESS BAR ANIMATION
-------------------------------- */
function setProgress(percent) {
  const bar = document.querySelector(".progress-bar-fill");
  if (bar) {
    bar.style.width = percent + "%";
  }
}

/* -------------------------------
   TASK PROGRESS DOTS
-------------------------------- */
function updateDots(current, total) {
  const dots = document.querySelectorAll(".task-dot");
  dots.forEach((dot, index) => {
    dot.classList.remove("active", "done");
    if (index < current) dot.classList.add("done");
    if (index === current) dot.classList.add("active");
  });
}

/* -------------------------------
   SIMPLE VISIT COUNTER (LOCAL)
-------------------------------- */
function incrementVisit() {
  let visits = localStorage.getItem("visits");
  visits = visits ? parseInt(visits) + 1 : 1;
  localStorage.setItem("visits", visits);
}
incrementVisit();

/* -------------------------------
   SIMPLE COMPLETION COUNTER
-------------------------------- */
function incrementCompletion() {
  let completes = localStorage.getItem("completions");
  completes = completes ? parseInt(completes) + 1 : 1;
  localStorage.setItem("completions", completes);
}

/* -------------------------------
   SERVICE WORKER REGISTER
-------------------------------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("Service Worker Registered"))
      .catch(err => console.log("SW Error:", err));
  });
}

/* -------------------------------
   SHARE FUNCTION
-------------------------------- */
function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    });
  } else {
    alert("Sharing not supported on this device.");
  }
}
