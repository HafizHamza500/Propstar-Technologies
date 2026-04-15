window.history.scrollRestoration = "manual";
  window.onbeforeunload = () => window.screen(0, 0);
lucide.createIcons();
document.addEventListener("DOMContentLoaded", () => {

/*** =================== COUNTERS (Ease-Out) =================== ***/
const counters = document.querySelectorAll(".counter");
let animated = false;

const animateCounters = () => {
  const duration = 1500;
  const startTime = performance.now();
  const easeOutQuad = t => t * (2 - t);

  const animate = timestamp => {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = easeOutQuad(progress);

    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute("data-target"));
      const suffix = counter.getAttribute("data-suffix") || "";
      counter.innerText = (Math.ceil(target * eased * 10) / 10) + suffix;
    });

    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

const observerr = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animated) {
      animated = true;
      animateCounters();
      observerr.disconnect();
    }
  });
}, { threshold: 0.3 });

observerr.observe(document.getElementById("counterSection"));
 /*** =================== Video =================== ***/
function setupVideo(videoId, sectionId, btnId, iconId) {
  const video = document.getElementById(videoId);
  const videoSection = document.getElementById(sectionId);
  const toggleBtn = document.getElementById(btnId);
  const toggleIcon = document.getElementById(iconId);

  const playSVG = `<svg xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-[#E8B42F]" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd"
          d="M4.5 3.75a.75.75 0 011.125-.65l14.25 8.25a.75.75 0 010 1.3l-14.25 8.25A.75.75 0 014.5 20.25v-16.5z"
          clip-rule="evenodd" />
      </svg>`;

  const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-[#E8B42F]" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd"
          d="M5.25 4.5A.75.75 0 016 3.75h2.25a.75.75 0 01.75.75v15a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75v-15zM13.5 3.75a.75.75 0 00-.75.75v15a.75.75 0 00.75.75H15.75a.75.75 0 00.75-.75v-15a.75.75 0 00-.75-.75H13.5z"
          clip-rule="evenodd" />
      </svg>`;

  const setIcon = (paused) => toggleIcon.innerHTML = paused ? playSVG : pauseSVG;

  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play(); setIcon(false);
      } else {
        video.pause(); setIcon(true);
      }
    });
  }, { threshold: 0.5 }).observe(videoSection);

  toggleBtn.addEventListener("click", () => {
    if (video.paused) { video.play(); setIcon(false); }
    else { video.pause(); setIcon(true); }
  });
}

// Call for desktop & mobile
setupVideo("myVideoDesktop", "videoSectionDesktop", "videoToggleDesktop", "toggleIconDesktop");
setupVideo("myVideoMobile", "videoSectionMobile", "videoToggleMobile", "toggleIconMobile");


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



  /*** =================== FADE-UP & SLIDE-IN =================== ***/
  const fadeSlideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.style.transitionDelay = `${index * 0.15}s`; // stagger
        fadeSlideObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".fade-up, .slide-in")
    .forEach(el => fadeSlideObserver.observe(el));


  /*** =================== TYPED.JS =================== ***/
  new Typed("#typed", {
    strings: [
      "Engineered with Talent.",
      "Powered by Innovation.",
      "Driven by Excellence.",
      "Built for Success.",
      "Crafted with Precision."
    ],
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 1800,
    loop: true,
    smartBackspace: true,
    cursorChar: "|",
  });


  /*** =================== tsParticles =================== ***/
  tsParticles.load("particles-js", {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" }, resize: true },
      modes: { grab: { distance: 180, line_linked: { opacity: 0.6 } }, push: { quantity: 4 } },
    },
    particles: {
      color: { value: "#FFD700" },
      links: { color: "#FFD700", distance: 150, enable: true, opacity: 0.3, width: 1 },
      move: { enable: true, speed: 1.2, direction: "none", outModes: "out" },
      number: { density: { enable: true, area: 800 }, value: 70 },
      opacity: { value: 0.6, animation: { enable: true, speed: 1, minimumValue: 0.2 } },
      shape: { type: "circle" },
      size: { value: { min: 2, max: 5 }, animation: { enable: true, speed: 2, minimumValue: 1, sync: false } },
    },
    detectRetina: true,
  });

});
/*  <!--END--> */

/*==================== Multi Images Section ======================*/
document.addEventListener("DOMContentLoaded", () => {
  const col2 = document.getElementById("hero12-column2");
  const col3 = document.getElementById("hero12-column3");

  // Duplicate images to create a seamless loop
  col2.innerHTML += col2.innerHTML;
  col3.innerHTML += col3.innerHTML;

});
/*  <!--END--> */


 // Fade-in scroll animation
    const sections = document.querySelectorAll(".service-section");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.3 });

    sections.forEach(sec => observer.observe(sec));

    /*  <!--END--> */


    // Zoom-in scroll animation desktop
     const imgD = document.getElementById('zoomImgDesktop');
    const textD = document.getElementById('zoomTextDesktop');
    const sectionD = document.getElementById('zoomSectionDesktop');

    // window.addEventListener('scroll', () => {
    //   if (!sectionD || window.innerWidth < 1024) return;

    //   const rect = sectionD.getBoundingClientRect();
    //   const windowHeight = window.innerHeight;

    //   let scrollPercent = 1 - rect.top / windowHeight;
    //   scrollPercent = Math.min(Math.max(scrollPercent, 0), 1);

    //   const imgScale = 0.5 + (scrollPercent * 0.5);
    //   imgD.style.transform = `scale(${imgScale})`;

    //   const textScale = 1 + (scrollPercent * 0.5);
    //   textD.style.transform = `scale(${textScale})`;

    //   textD.style.opacity = scrollPercent > 0.1 ? 1 : 0;
    // });

    let hasEntered = false;

window.addEventListener('scroll', () => {
  if (!sectionD || window.innerWidth < 1024) return;

  const rect = sectionD.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight * 0.9) {
    hasEntered = true;
  }

  if (!hasEntered) return;

  let scrollPercent = 1 - rect.top / windowHeight;
  scrollPercent = Math.min(Math.max(scrollPercent, 0), 1);

  const imgScale = 0.5 + (scrollPercent * 0.5);
  imgD.style.transform = `scale(${imgScale})`;

  const textScale = 1 + (scrollPercent * 0.5);
  textD.style.transform = `scale(${textScale})`;

  textD.style.opacity = scrollPercent > 0.1 ? 1 : 0;
});


    