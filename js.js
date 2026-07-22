/* =======================================================
   BURGER MENU (nav mobile)
======================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burgerBtn");
  const navLinks = document.getElementById("navLinks");

  if (burgerBtn && navLinks) {
    // Ftou7 / sd l-menu mli ndosou 3la l-burger
    burgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      burgerBtn.classList.toggle("active");
    });

    // Sed l-menu mli ndosou 3la chi bouton mn dakhlou (ba3d ma scrollina)
    navLinks.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        navLinks.classList.remove("open");
        burgerBtn.classList.remove("active");
      });
    });

    // Sed l-menu mli ndosou barra mnou (khassoss dyal UX)
    document.addEventListener("click", (e) => {
      const clickedInsideNav = navLinks.contains(e.target) || burgerBtn.contains(e.target);
      if (!clickedInsideNav && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        burgerBtn.classList.remove("active");
      }
    });
  }
});

/* =======================================================
   SCROLL TO SECTION (nav-links + smooth scroll)
======================================================= */
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  const navbar = document.querySelector(".navbar");
  const navHeight = navbar ? navbar.offsetHeight : 0;

  const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: sectionTop - navHeight,
    behavior: "smooth"
  });

  // Sed l-menu dyal mobile ila kan mahlol
  const navLinks = document.getElementById("navLinks");
  const burgerBtn = document.getElementById("burgerBtn");
  if (navLinks) navLinks.classList.remove("open");
  if (burgerBtn) burgerBtn.classList.remove("active");
}

/* =======================================================
   ZID ACTIVITÉ JDIDA B DYNAMIQUE (utilitaire ikhtiyari)
   Exemple d'utilisation dans la console:
   addActivity({ icon: "🎤", title: "الغناء" });
======================================================= */
function addActivity({ icon = "✨", title = "نشاط جديد" } = {}) {
  const container = document.getElementById("activities-container");
  if (!container) return;

  const chip = document.createElement("div");
  chip.className = "chip";
  chip.innerHTML = `
    <span class="chip-icon">${icon}</span>
    <span class="chip-title">${title}</span>
  `;
  container.appendChild(chip);
}