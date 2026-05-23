// script.js

// ================= DARK MODE TOGGLE =================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector("i");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const searchInput = document.getElementById("projectSearch");
const cards = document.querySelectorAll('.project-card');
const noResults = document.getElementById('noResults');
const backToTop = document.getElementById('backToTop');
const themeStorageKey = 'projectTheme';

function applyTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  if (themeIcon) {
    themeIcon.classList.toggle('fa-moon', !isDark);
    themeIcon.classList.toggle('fa-sun', isDark);
  }
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  return savedTheme === 'dark';
}

function saveThemePreference(isDark) {
  localStorage.setItem(themeStorageKey, isDark ? 'dark' : 'light');
}

applyTheme(loadThemePreference());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains('dark');
    applyTheme(isDark);
    saveThemePreference(isDark);
  });
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const expanded = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", expanded);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function validateContactForm(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.style.color = "red";
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    formMessage.textContent = "Please enter a valid email.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Message sent successfully!";
  formMessage.style.color = "green";
  contactForm.reset();
}

function revealSections() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top;
    const revealPoint = 100;

    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add("active");
    }
  });
}

function updateProjectSearch() {
  const query = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(card => {
    const match = card.dataset.name.toLowerCase().includes(query);
    card.style.display = match ? 'block' : 'none';
    if (match) visibleCount++;
  });

  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

if (contactForm) {
  contactForm.addEventListener("submit", validateContactForm);
}

function handleScroll() {
  revealSections();
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener("scroll", handleScroll);
revealSections();
handleScroll();

if (searchInput) {
  searchInput.addEventListener("keyup", updateProjectSearch);
  updateProjectSearch();
}


