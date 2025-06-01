// Typewriter effect
const typewriterElem = document.getElementById("typewriter");
const texts = [
  "Web Developer",
  "React Enthusiast",
  "JavaScript Lover",
  "UI/UX Designer",
];
let i = 0,
  j = 0,
  currentText = "",
  isDeleting = false,
  waitTime = 2000,
  typeSpeed = 120;

function typeWriter() {
  if (i >= texts.length) i = 0;
  currentText = texts[i];

  if (!isDeleting) {
    typewriterElem.textContent = currentText.substring(0, j + 1);
    j++;
    if (j === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, waitTime);
      return;
    }
  } else {
    typewriterElem.textContent = currentText.substring(0, j - 1);
    j--;
    if (j === 0) {
      isDeleting = false;
      i++;
    }
  }
  setTimeout(typeWriter, isDeleting ? typeSpeed / 2 : typeSpeed);
}
typeWriter();

// Animate skill bars when in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-bar");
  bars.forEach((bar) => {
    if (isElementInViewport(bar) && !bar.classList.contains("animated")) {
      const level = bar.getAttribute("data-level");
      const fill = bar.querySelector(".fill");
      fill.style.width = level;
      bar.classList.add("animated");
    }
  });
}

// Sections and nav links
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");

// Fixed updateActiveNav with proper last section detection
function updateActiveNav() {
  let index = 0;
  const scrollPos = window.scrollY + window.innerHeight / 3;

  for (let i = 0; i < sections.length; i++) {
    if (scrollPos >= sections[i].offsetTop) {
      index = i;
    }
  }

  navLinks.forEach((link) => link.classList.remove("active"));
  if (navLinks[index]) navLinks[index].classList.add("active");
}

// Scroll listeners
window.addEventListener("scroll", () => {
  animateSkillBars();
  updateActiveNav();
});

window.addEventListener("load", () => {
  animateSkillBars();
  updateActiveNav();
});

// Contact form validation & submission
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) {
      formMessage.style.color = "red";
      formMessage.textContent = "Please enter a valid name (at least 2 characters).";
      form.name.focus();
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      formMessage.style.color = "red";
      formMessage.textContent = "Please enter a valid email address.";
      form.email.focus();
      return;
    }

    if (message.length < 10) {
      formMessage.style.color = "red";
      formMessage.textContent = "Message should be at least 10 characters.";
      form.message.focus();
      return;
    }

    formMessage.style.color = "green";
    formMessage.textContent = "Sending message...";
    setTimeout(() => {
      formMessage.textContent = "Thank you for contacting me!";
      form.reset();
    }, 1500);
  });
}
