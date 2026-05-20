// script.js

// ================= DARK MODE TOGGLE =================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ================= FORM VALIDATION =================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if(name === "" || email === "" || message === ""){
    formMessage.textContent = "Please fill in all fields.";
    formMessage.style.color = "red";
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if(!email.match(emailPattern)){
    formMessage.textContent = "Please enter a valid email.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Message sent successfully!";
  formMessage.style.color = "green";

  contactForm.reset();
});

// ================= SCROLL REVEAL =================

function revealSections(){
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top;
    const revealPoint = 100;

    if(sectionTop < windowHeight - revealPoint){
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealSections);
revealSections();

// ================= DYNAMIC PROJECT SEARCH =================

const searchInput = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");

searchInput.addEventListener("keyup", () => {

  const searchValue = searchInput.value.toLowerCase();

  projectCards.forEach((card) => {

    const projectName = card.dataset.name.toLowerCase();

    if(projectName.includes(searchValue)){
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});