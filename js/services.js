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
        number: { density: { enable: true, area: 800 }, value: 70 },
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


// bpo counter

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".glow-border"); // section wrapper
  const counters = section.querySelectorAll(".counter");
  const duration = 2000; // 2s

  let animated = false;

  // Remove fade-up initially so animation can trigger later
  section.classList.remove("fade-up");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;

          // Trigger fade-up animation
          section.classList.add("fade-up");

          // Start counter animation
          const startTime = performance.now();
          function animateCounters(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            counters.forEach(counter => {
              const target = +counter.getAttribute("data-target");
              counter.textContent = Math.floor(progress * target);
            });
            if (progress < 1) requestAnimationFrame(animateCounters);
            else counters.forEach(c => c.textContent = c.getAttribute("data-target"));
          }
          requestAnimationFrame(animateCounters);

          observer.unobserve(section); // stop observing
        }
      });
    },
    { threshold: 0.3 } // triggers when 30% visible
  );

  observer.observe(section);
});


// our campaigns

    const cards=document.querySelectorAll('.card');
    const io=new IntersectionObserver(entries=>{
      entries.forEach((e,i)=>{
        if(e.isIntersecting){
          setTimeout(()=>e.target.classList.add('in-view'), i*150); // staggered fade-up
          io.unobserve(e.target);
        }
      });
    },{threshold:.2});
    cards.forEach(c=>io.observe(c));


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

/* =================== WHATSAPP POPUP =================== */
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

/* =================== CHAT TIME =================== */
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



/* ============= Wheel  ================ */
document.addEventListener("DOMContentLoaded", () => {
      const wheelSection = document.querySelector("#services");
      const spokes = document.querySelectorAll(".spoke");
      let played = false;

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !played) {
            played = true;

            spokes.forEach((spoke, i) => {
              const line = spoke.querySelector(".spoke-line");
              const icon = spoke.querySelector(".icon-circle");

              // reset
              line.style.animation = "none";
              icon.style.animation = "none";
              void line.offsetHeight; // reflow
              void icon.offsetHeight;

              // animate
              line.style.animation = `growLine 0.8s ease forwards`;
              line.style.animationDelay = `${i * 0.5}s`;

              icon.style.animation = `popIn 0.6s ease forwards`;
              icon.style.animationDelay = `${(i * 0.5) + 0.6}s`;
            });
          }

          // replay if scrolled out and in
          if (!entry.isIntersecting) {
            played = false;
            spokes.forEach(spoke => {
              const line = spoke.querySelector(".spoke-line");
              const icon = spoke.querySelector(".icon-circle");
              line.style.animation = "none";
              line.style.height = "0";
              line.style.opacity = "0";
              icon.style.animation = "none";
              icon.style.opacity = "0";
              icon.style.transform = `scale(0) rotate(calc(-1 * var(--rot)))`;
            });
          }
        });
      }, { threshold: 0.3 });

      io.observe(wheelSection);
    });

// tabsX GSAP
  gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".tabsX_panel");
const images = gsap.utils.toArray(".tabsX_image");
const totalPanels = panels.length;

ScrollTrigger.create({
  trigger: ".tabsX_scroll",
  start: "top top",
  end: () => `${totalPanels * window.innerHeight * 1.1}`,
  scrub: 1.2,
  onUpdate: (self) => {
    const progress = self.progress * (totalPanels - 1);
    const index = Math.round(progress);
    setActive(index);
  },
});

function setActive(index) {
  panels.forEach((p, i) => p.classList.toggle("active", i === index));
  images.forEach((img, i) => img.classList.toggle("active", i === index));
}

