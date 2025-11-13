document.addEventListener("DOMContentLoaded", () => {
  window.history.scrollRestoration = "manual";
  window.onbeforeunload = () => window.screen(0, 0);
  // tsParticles init
  if (window.tsParticles) {
    tsParticles.load("particles-js", {
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "parent",
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.6 } },
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
        move: { enable: true, speed: 1.2, outModes: "out" },
        number: { value: 70, density: { enable: true, area: 800 } },
        opacity: { value: 0.6 },
        shape: { type: "circle" },
        size: { value: { min: 2, max: 5 } },
      },
    });
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

  document.addEventListener("click", (e) => {
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
    times.forEach((el) => {
      el.textContent = formatTime(now);
    });
  }

  // Run immediately + keep updating every second
  document.addEventListener("DOMContentLoaded", () => {
    updateChatTimes();
    setInterval(updateChatTimes, 1000);
  });

  // Navbar toggle
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

    document
      .querySelectorAll("#navbarNav a")
      .forEach((link) => link.addEventListener("click", closeMenu));
  }

  // Accordion
  const accordions = Array.from(document.querySelectorAll(".accordion"));

  function closeAccordionElement(accordionEl) {
    if (!accordionEl) return;
    const content = accordionEl.querySelector(".accordion-content");
    const icon = accordionEl.querySelector(".icon");
    if (!content) return;

    content.style.maxHeight = content.scrollHeight + "px";
    void content.offsetWidth;
    content.style.maxHeight = "0px";

    content.classList.remove("open");
    if (icon) icon.textContent = "+";

    const onEnd = () => {
      if (!content.classList.contains("open")) content.classList.add("hidden");
      content.removeEventListener("transitionend", onEnd);
    };
    content.addEventListener("transitionend", onEnd);
  }

  function openAccordionElement(accordionEl) {
    if (!accordionEl) return;
    const content = accordionEl.querySelector(".accordion-content");
    const icon = accordionEl.querySelector(".icon");
    if (!content) return;

    content.classList.remove("hidden");
    content.classList.add("open");

    content.style.maxHeight = "0px";
    void content.offsetWidth;
    content.style.maxHeight = content.scrollHeight + "px";

    if (icon) icon.textContent = "-";
  }

  accordions.forEach((acc) => {
    const btnEl = acc.querySelector(".accordion-btn");
    const contentEl = acc.querySelector(".accordion-content");

    if (contentEl && !contentEl.classList.contains("open")) {
      if (!contentEl.classList.contains("hidden"))
        contentEl.classList.add("hidden");
      contentEl.style.maxHeight = "0px";
    }

    if (!btnEl) return;
    btnEl.addEventListener("click", (e) => {
      e.stopPropagation();
      accordions.forEach((other) => {
        if (other !== acc) closeAccordionElement(other);
      });
      if (contentEl.classList.contains("open")) closeAccordionElement(acc);
      else openAccordionElement(acc);
    });
  });

  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".section-job");
  const underline = document.getElementById("underline");
  const tabsContainer = document.getElementById("tabs");

  function moveUnderline(activeTab) {
    if (!activeTab || !underline) return;
    const rect = activeTab.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();
    underline.style.width = rect.width + "px";

    underline.style.left =
      rect.left - containerRect.left + tabsContainer.scrollLeft + "px";
  }

  function scrollToTab(tab) {
    const container = tabsContainer;
    const containerRect = container.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    const offsetLeft = tabRect.left - containerRect.left;
    const offsetRight = tabRect.right - containerRect.right;

    if (offsetLeft < 0) {
      container.scrollBy({ left: offsetLeft - 8, behavior: "smooth" });
    } else if (offsetRight > 0) {
      container.scrollBy({ left: offsetRight + 8, behavior: "smooth" });
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Reset all tabs
      tabs.forEach((t) => {
        t.classList.remove("text-yellow-400");
        t.classList.add("text-gray-400");
      });
      tab.classList.add("text-yellow-400");
      tab.classList.remove("text-gray-400");

      // Hide all sections
      sections.forEach((s) => {
        s.classList.remove("active");
        s.style.display = "none";
      });

      const target = tab.dataset.target;
      const section = document.getElementById(target);

      if (tab.classList.contains("disabled")) {
        if (section) {
          section.innerHTML = `
      <div class="flex items-center justify-center py-12">
        <p class="text-gray-500 text-lg">Jobs are not available right now.</p>
      </div>
    `;
          section.style.display = "block";
          requestAnimationFrame(() => section.classList.add("active"));
        }
      } else if (target === "all") {
        // All tab → Show all enabled sections only
        tabs.forEach((t) => {
          if (t.dataset.target && !t.classList.contains("disabled")) {
            const sec = document.getElementById(t.dataset.target);
            if (sec) {
              sec.style.display = "block";
              requestAnimationFrame(() => sec.classList.add("active"));
            }
          }
        });
      } else if (target) {
        // Normal enabled tab
        if (section) {
          section.style.display = "block";
          requestAnimationFrame(() => section.classList.add("active"));
        }
      }

      moveUnderline(tab);
      scrollToTab(tab);
    });
  });

  // Default active tab on page load
  window.addEventListener("load", () => {
    const first = document.querySelector(".tab.text-yellow-400");
    if (first) {
      first.click();
    }
  });

  // Responsive underline adjustment
  window.addEventListener("resize", () => {
    const active = document.querySelector(".tab.text-yellow-400");
    if (active) moveUnderline(active);
  });

  // Apply Now → Save to sessionStorage & redirect
  const applyBtns = document.querySelectorAll(".applyBtn");
  applyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const accordion = btn.closest(".accordion");
      const jobName = accordion
        .querySelector(".accordion-btn span")
        .textContent.trim();
      const jobDesc = Array.from(
        accordion.querySelector(".accordion-content").children
      )
        .filter((el) =>
          ["P", "H2", "H3", "SPAN", "UL", "LI", "STRONG", "EM"].includes(
            el.tagName
          )
        )
        .map((el) => el.outerHTML)
        .join("")
        .trim();

      sessionStorage.setItem("jobName", jobName);
      sessionStorage.setItem("jobDesc", jobDesc);

      window.location.href = "apply.html";
    });
  });

  // APPLY PAGE LOGIC
  if (document.getElementById("applyForm")) {
    const job = sessionStorage.getItem("jobName") || "Job Title";
    const desc =
      sessionStorage.getItem("jobDesc") || "No description available.";

    const jobTitleEl = document.getElementById("jobTitle");
    const jobDescEl = document.getElementById("jobDesc");
    const jobInput = document.getElementById("jobPosition");

    if (jobTitleEl) jobTitleEl.textContent = job;
    if (jobDescEl) jobDescEl.innerHTML = desc;
    if (jobInput) jobInput.value = job;

    document.getElementById("fullName")?.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    });

    document.getElementById("age")?.addEventListener("input", (e) => {
      let val = e.target.value.replace(/[^0-9]/g, "");
      if (parseInt(val) > 60) val = "60";
      e.target.value = val;
    });

    document.getElementById("phone")?.addEventListener("input", (e) => {
      let val = e.target.value.replace(/[^0-9]/g, "");
      if (val.length > 11) val = val.slice(0, 11);
      e.target.value = val;
    });

    // Experience toggle
    const expSelect = document.getElementById("experience");
    const expYearsContainer = document.getElementById(
      "experienceYearsContainer"
    );
    if (expSelect && expYearsContainer) {
      expSelect.addEventListener("change", () => {
        if (expSelect.value === "Yes") {
          expYearsContainer.classList.remove("hidden");
          document.getElementById("experienceYears").required = true;
        } else {
          expYearsContainer.classList.add("hidden");
          document.getElementById("experienceYears").required = false;
          document.getElementById("experienceYears").value = "";
        }
      });
    }
  }

  // Fade-in observer
  const cards = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );
  cards.forEach((card) => observer.observe(card));
});
// DOMContentLoaded END

/*** =================== FADE-UP & SLIDE-IN =================== ***/
const fadeSlideObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.style.transitionDelay = `${index * 0.15}s`;
        fadeSlideObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document
  .querySelectorAll(".fade-up, .slide-in")
  .forEach((el) => fadeSlideObserver.observe(el));

const tabScroll = document.getElementById("tabScroll");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

function checkArrows() {
  const scrollLeft = tabScroll.scrollLeft;
  const maxScrollLeft = tabScroll.scrollWidth - tabScroll.clientWidth;

  if (tabScroll.scrollWidth > tabScroll.clientWidth) {
    if (scrollLeft <= 0) {
      leftArrow.classList.add("hidden");
    } else {
      leftArrow.classList.remove("hidden");
    }

    if (scrollLeft >= maxScrollLeft - 2) {
      rightArrow.classList.add("hidden");
    } else {
      rightArrow.classList.remove("hidden");
    }
  } else {
    leftArrow.classList.add("hidden");
    rightArrow.classList.add("hidden");
  }
}

leftArrow.addEventListener("click", () => {
  tabScroll.scrollBy({ left: -200, behavior: "smooth" });
});
rightArrow.addEventListener("click", () => {
  tabScroll.scrollBy({ left: 200, behavior: "smooth" });
});

tabScroll.addEventListener("scroll", checkArrows);
window.addEventListener("resize", checkArrows);
window.addEventListener("load", checkArrows);


// Changing words animation
const words = ["Growth", "Success", "Excellence", "Propstar"];
let i = 0;
const changingWord = document.getElementById("changingWord");
setInterval(() => {
  changingWord.classList.add("opacity-0", "transition-opacity", "duration-800");
  setTimeout(() => {
    i = (i + 1) % words.length;
    changingWord.textContent = words[i];
    changingWord.classList.remove("opacity-0");
  }, 500);
}, 2500);
