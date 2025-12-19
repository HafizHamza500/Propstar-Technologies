window.history.scrollRestoration = "manual";
  window.onbeforeunload = () => window.screen(0, 0);
// particles
    tsParticles.load("particles-js", {
      fullScreen: { enable: false }, // confined to container
      background: { color: "transparent" },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas", //restricts interaction to hero only
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


document.addEventListener("DOMContentLoaded", () => {
  /* ========================= */
  /* SMOOTH SCROLL (HERO BTN)  */
  /* ========================= */
  function smoothScroll(target, duration = 1200) {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const distance = end - start;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // EaseInOutCubic
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start + distance * ease);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

  const scrollBtn = document.getElementById('scrollBtn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextSection = document.getElementById('next-section');
      if (nextSection) smoothScroll(nextSection, 1200);
    });
  }

  /* ========================= */
  /* COUNTER ANIMATION         */
  /* ========================= */
  const duration = 2000;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const plus = counter.parentElement.querySelector(".plus");
    const startTime = performance.now();

    counter.classList.add("active");

    function update(now) {
      const elapsed = now - startTime;
      let progress = Math.min(elapsed / duration, 1);
      progress = easeOutCubic(progress);

      const current = Math.floor(progress * target);
      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
        if (plus) setTimeout(() => plus.classList.add("show"), 150);
      }
    }

    requestAnimationFrame(update);
  }

  /* ========================= */
  /* OBSERVERS (Animations)    */
  /* ========================= */

  // Fade-up + Slide-in
  const fadeSlideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("fade-up")) {
          entry.target.classList.add("visible");
        }
        if (entry.target.classList.contains("slide-in")) {
          entry.target.classList.add("show");
        }
        fadeSlideObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".fade-up, .slide-in")
    .forEach(el => fadeSlideObserver.observe(el));


  // Fade-Zoom (timeline, team, CTA)
  const fadeZoomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        fadeZoomObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-zoom")
    .forEach(el => fadeZoomObserver.observe(el));
});

// ---------- Play Image Animation ----------
function playAnim() {
  mainImage.classList.remove("img-anim");
  void mainImage.offsetWidth;
  mainImage.classList.add("img-anim");
}

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


  /*** =================== NAVBAR =================== ***/

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


  // -----------------------------
  // inside propstar

  const images = document.querySelectorAll('.story-img');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      } else {

        if (entry.boundingClientRect.top > window.innerHeight || entry.boundingClientRect.bottom < 0) {
          entry.target.classList.remove('reveal');
        }
      }
    });
  }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });

  images.forEach(img => observer.observe(img));


  // timeline

    // Desktop Animation
    document.addEventListener("DOMContentLoaded", () => {
      const line = document.querySelector(".timeline-line");
      const dots = document.querySelectorAll(".dot");
      const cards = document.querySelectorAll(".carddd");

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && window.innerWidth >= 1280) {
            line.classList.add("line-animate");
            setTimeout(() => {
              dots.forEach((dot, i) => {
                setTimeout(() => {
                  dot.classList.add("show");
                  cards[i].classList.add("show");
                }, 500 * i);
              });
            }, 900);
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });

      if (document.querySelector(".outer")) observer.observe(document.querySelector(".outer"));
    });

    // Mobile/Tablet Animation
    document.addEventListener("DOMContentLoaded", () => {
      const mobileLine = document.querySelector(".mobile-line");
      const mobileDots = document.querySelectorAll(".mobile-dot");
      const mobileCards = document.querySelectorAll(".mobile-card");

      if (mobileLine) {
        const mobObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && window.innerWidth < 1280) {
              mobileLine.classList.add("animate");
              setTimeout(() => {
                mobileDots.forEach((dot, i) => {
                  setTimeout(() => {
                    dot.classList.add("show");
                    mobileCards[i].classList.add("show");
                    mobileCards[i].classList.remove("-translate-x-full", "translate-x-full", "sm:-translate-x-1/2", "sm:translate-x-1/2");
                  }, 600 * i);
                });
              }, 500);
              mobObserver.disconnect();
            }
          });
        }, { threshold: 0.2 });

        mobObserver.observe(mobileLine);
      }
    });


    (() => {

  /* REVEAL OBSERVER */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('ps-visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.2});

document.querySelectorAll('.ps-reveal')
  .forEach(el=>observer.observe(el));

/* SKELETON REMOVE ON LOAD */
document.querySelectorAll('.ps-card img').forEach(img=>{
  img.addEventListener('load',()=>{
    img.style.opacity = 1;
    img.previousElementSibling?.remove();
  });
});

/* POPUP */
const popup = document.getElementById('psPopup');
const popupImg = document.getElementById('psPopupImg');
const closeBtn = document.getElementById('psClose');

document.querySelectorAll('.ps-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const img = card.querySelector('img');
    popupImg.src = img.src;
    popup.classList.add('ps-active');
    document.body.style.overflow = 'hidden';
  });
});

const closePopup = ()=>{
  popup.classList.remove('ps-active');
  document.body.style.overflow = '';
};

closeBtn.addEventListener('click', closePopup);
popup.addEventListener('click',e=>{
  if(e.target === popup) closePopup();
});

})();