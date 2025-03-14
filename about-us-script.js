document.addEventListener("DOMContentLoaded", () => {
    // Initialize the about us page
    initAboutUsPage()
  })
  
  function initAboutUsPage() {
    // Initialize theme
    initTheme()
  
    // Initialize navigation
    initNavigation()
  
    // Initialize contact form
    initContactForm()
  
    // Initialize scroll animations
    initScrollAnimations()
  
    // Initialize mouse following background
    initMouseFollowingBackground()
  }
  
  // Theme initialization and toggle
  function initTheme() {
    const themeToggle = document.getElementById("theme-toggle")
    const storedTheme = localStorage.getItem("theme")
  
    // Set initial theme based on stored preference or system preference
    if (storedTheme) {
      document.body.classList.toggle("dark-mode", storedTheme === "dark")
      updateThemeIcon(storedTheme === "dark")
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark-mode")
      updateThemeIcon(true)
    }
  
    // Theme toggle event listener
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode")
        localStorage.setItem("theme", isDarkMode ? "dark" : "light")
        updateThemeIcon(isDarkMode)
      })
    }
  
    // Update theme icon based on current theme
    function updateThemeIcon(isDarkMode) {
      const icon = themeToggle.querySelector("i")
      if (isDarkMode) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
      } else {
        icon.classList.remove("fa-sun")
        icon.classList.add("fa-moon")
      }
    }
  }
  
  // Navigation initialization
  function initNavigation() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navLinks = document.querySelector(".nav-links")
  
    // Mobile menu toggle
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active")
  
        // Update icon
        const icon = mobileMenuBtn.querySelector("i")
        if (navLinks.classList.contains("active")) {
          icon.classList.remove("fa-bars")
          icon.classList.add("fa-times")
        } else {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      })
    }
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navLinks && mobileMenuBtn && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove("active")
        const icon = mobileMenuBtn.querySelector("i")
        if (icon) {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      }
    })
  }
  
  // Contact form initialization
  function initContactForm() {
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simulate form submission (would connect to backend in real app)
        alert("Thank you for your message! We'll get back to you soon.")
  
        // Reset form
        contactForm.reset()
      })
    }
  }
  
  // Scroll animations
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(".fade-in")
  
    // Initial check for elements in viewport
    checkElementsInViewport()
  
    // Check on scroll
    window.addEventListener("scroll", checkElementsInViewport)
  
    function checkElementsInViewport() {
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150
  
        if (elementTop < window.innerHeight - elementVisible) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  }
  
  // Mouse following background
  function initMouseFollowingBackground() {
    const gradientSpheres = document.querySelectorAll(".gradient-sphere")
  
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight
  
      gradientSpheres.forEach((sphere, index) => {
        // Different movement amount for each sphere
        const moveX = (mouseX - 0.5) * (index + 1) * 50
        const moveY = (mouseY - 0.5) * (index + 1) * 50
  
        // Apply transform with a slight delay for more natural movement
        setTimeout(() => {
          if (index === 0) {
            sphere.style.transform = `translate(${moveX}px, ${moveY}px)`
          } else if (index === 1) {
            sphere.style.transform = `translate(${-moveX}px, ${-moveY}px)`
          } else if (index === 2) {
            sphere.style.transform = `translate(${moveX / 2}px, ${moveY / 2}px) translate(-50%, -50%)`
          }
        }, index * 50)
      })
    })
  }
  
  