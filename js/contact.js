window.history.scrollRestoration = "manual";
  window.onbeforeunload = () => window.screen(0, 0);
// particles
    tsParticles.load("particles-js", {
      fullScreen: { enable: false }, // confined to container
      background: { color: "transparent" },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas", // restricts interaction to hero only
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 0.6 } },
          push: { quantity: 4 },
        },
      },
      particles: {
        color: { value: "#FFD700" },
        links: {
          color: "#FFD700",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: { enable: true, speed: 1.2, direction: "none", outModes: "out" },
        number: { density: { enable: true, area: 800 }, value: 100 },
        opacity: {
          value: 0.6,
          animation: { enable: true, speed: 1, minimumValue: 0.2 },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 2, max: 5 },
          animation: { enable: true, speed: 2, minimumValue: 1, sync: false },
        },
      },
      detectRetina: true,
    });




/*** =================== WHATSAPP POPUP =================== ***/
const btn = document.getElementById("whatsapp-btn");
const popup = document.getElementById("whatsapp-popup");

const closePopup = () => {
  if (!popup.classList.contains("hidden")) {
    popup.classList.remove("animate-fadeIn");
    popup.classList.add("animate-fadeOut");
    setTimeout(() => popup.classList.add("hidden"), 250);
  }
};

btn.addEventListener("click", () => {
  if (popup.classList.contains("hidden")) {
    popup.classList.remove("hidden", "animate-fadeOut");
    popup.classList.add("animate-fadeIn");
    updateChatTimes(); 
  } else closePopup();
});

document.addEventListener("click", e => {
  if (!btn.contains(e.target) && !popup.contains(e.target)) closePopup();
});
window.addEventListener("scroll", closePopup);

/*** =================== CHAT TIME =================== ***/
  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  function updateChatTimes() {
    const times = document.querySelectorAll(".chat-time");
    const now = new Date();
    times.forEach(el => {
      el.textContent = formatTime(now);
    });
  }

  // Run immediately + keep updating every second
  document.addEventListener("DOMContentLoaded", () => {
    updateChatTimes();
    setInterval(updateChatTimes, 1000);
  });



  // -----------------------------
  // Navbar toggle
  // -----------------------------
  const toggleButton = document.getElementById("navbarToggle");
  const navMenu = document.getElementById("navbarNav");
  const overlay = document.getElementById("overlay");
  const closeButton = document.getElementById("closeNav");

  function openMenu() {
    if (!navMenu || !overlay) return;
    navMenu.classList.remove("-translate-x-full", "opacity-0");
    overlay.classList.remove("pointer-events-none", "opacity-0");
    overlay.classList.add("opacity-100");
  }

  function closeMenu() {
    if (!navMenu || !overlay) return;
    navMenu.classList.add("-translate-x-full", "opacity-0");
    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0");
    setTimeout(() => overlay.classList.add("pointer-events-none"), 300);
  }

  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      openMenu();
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !toggleButton.contains(e.target)) {
        closeMenu();
      }
    });

    if (closeButton) {
      closeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMenu();
      });
    }

    document.querySelectorAll("#navbarNav a").forEach(link =>
      link.addEventListener("click", closeMenu)
    );
  }

