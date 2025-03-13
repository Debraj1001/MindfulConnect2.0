document.addEventListener("DOMContentLoaded", () => {
  // Initialize the landing page
  initLandingPage()
})

function initLandingPage() {
  // Initialize theme
  initTheme()

  // Initialize Go To button
  initGoToButton()

  // Initialize mouse following background
  initMouseFollowingBackground()

  // Initialize scroll effects
  initScrollEffects()
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

// Go To button initialization
function initGoToButton() {
  const goToBtn = document.getElementById("go-to-btn")
  const transitionOverlay = document.getElementById("transition-overlay")

  if (goToBtn && transitionOverlay) {
    goToBtn.addEventListener("click", () => {
      // Add active class to overlay to show it
      transitionOverlay.classList.add("active")

      // After animation completes, redirect to index.html
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)

      // Add pulse animation to the button
      goToBtn.classList.add("pulse")
    })
  }
}

// Mouse following background
function initMouseFollowingBackground() {
  const gradientSpheres = document.querySelectorAll(".gradient-sphere")
  const landingContainer = document.querySelector(".landing-container")

  if (landingContainer) {
    landingContainer.addEventListener("mousemove", (e) => {
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

  // Parallax effect for floating elements
  const floatingElements = document.querySelectorAll(".floating-element")
  const imageContainer = document.querySelector(".image-container")

  if (imageContainer && floatingElements.length > 0) {
    imageContainer.addEventListener("mousemove", (e) => {
      const rect = imageContainer.getBoundingClientRect()
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5

      floatingElements.forEach((element, index) => {
        const depth = index + 1
        const moveX = mouseX * depth * 20
        const moveY = mouseY * depth * 20

        element.style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    })

    // Reset position when mouse leaves
    imageContainer.addEventListener("mouseleave", () => {
      floatingElements.forEach((element) => {
        element.style.transform = "translate(0, 0)"
      })
    })
  }
}

// Scroll effects
function initScrollEffects() {
  const landingContainer = document.querySelector(".landing-container")
  const scrollIndicator = document.querySelector(".scroll-indicator")

  if (landingContainer && scrollIndicator) {
    // Hide scroll indicator when scrolling
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        scrollIndicator.style.opacity = "0"
      } else {
        scrollIndicator.style.opacity = "1"
      }
    })

    // Smooth scroll on mouse wheel
    landingContainer.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault()

        const delta = e.deltaY
        const scrollAmount = 50

        window.scrollBy({
          top: delta > 0 ? scrollAmount : -scrollAmount,
          behavior: "smooth",
        })
      },
      { passive: false },
    )
  }
}

// Add a subtle animation to elements when they come into view
function animateOnScroll() {
  const elements = document.querySelectorAll(".feature-item, .tagline h2, .tagline p, .go-to-btn")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animate")
    }
  })
}

// Initialize animation on scroll
window.addEventListener("scroll", animateOnScroll)

