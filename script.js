 const navbar = document.getElementById("navbar");
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("overlay");
      const openMenuBtn = document.getElementById("fa-bars");
      const closeMenuBtn = document.getElementById("fa-times");
      const toggleBtn = document.getElementById("toggle");
      const body = document.body;
      const loadingOverlay = document.getElementById("loadingOverlay");

      // Mobile Navigation Functions
      function openSidebar() {
        sidebar.classList.add("show");
        overlay.style.display = "block";
        body.style.overflow = "hidden";
      }

      function closeSidebar() {
        sidebar.classList.remove("show");
        overlay.style.display = "none";
        body.style.overflow = "auto";
      }

      // Dark Mode Toggle
      function toggleDarkMode() {
        body.classList.toggle("darkmode");
        const icon = toggleBtn;

        if (body.classList.contains("darkmode")) {
          icon.className = "fas fa-sun modebtn";
          localStorage.setItem("darkmode", "enabled");
        } else {
          icon.className = "fas fa-moon modebtn";
          localStorage.setItem("darkmode", "disabled");
        }
      }

      // Scroll Effects
      function handleScroll() {
        const scrolled = window.pageYOffset;

        // Navbar scroll effect
        if (scrolled > 100) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        // Parallax effect (optional, can be disabled on mobile if needed)
        if (window.innerWidth > 768) {
          const rate = scrolled * -0.2;
          const hero = document.querySelector("#intro");
          if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
          }
        }
      }

      // Scroll Animation Observer
      function observeElements() {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        document
          .querySelectorAll(".fade-in")
          .forEach((el) => observer.observe(el));
      }

      // Smooth scrolling for navigation links
      function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              if (sidebar.classList.contains("show")) {
                closeSidebar();
              }
            }
          });
        });
      }

      // Loading animation
      function hideLoader() {
        setTimeout(() => {
          loadingOverlay.classList.add("hide");
          setTimeout(() => {
            loadingOverlay.style.display = "none";
          }, 500);
        }, 1000);
      }

      // Initialize page
      function init() {
        if (localStorage.getItem("darkmode") === "enabled") {
          body.classList.add("darkmode");
          if (toggleBtn) toggleBtn.className = "fas fa-sun modebtn";
        }
        hideLoader();
        observeElements();
        setupSmoothScroll();
      }

      // Event Listeners 
      if (openMenuBtn) openMenuBtn.addEventListener("click", openSidebar);
      if (closeMenuBtn) closeMenuBtn.addEventListener("click", closeSidebar);
      if (overlay) overlay.addEventListener("click", closeSidebar);
      if (toggleBtn) toggleBtn.addEventListener("click", toggleDarkMode);

      // Scroll listener with throttling
      let ticking = false;
      window.addEventListener("scroll", () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      });

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sidebar.classList.contains("show")) {
          closeSidebar();
        }
      });

      // Initialize when DOM is loaded
      document.addEventListener("DOMContentLoaded", init);