document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme()

  // Initialize auth tabs
  initAuthTabs()

  // Initialize form submissions
  initFormSubmissions()

  // Check URL parameters for auto-tab selection
  checkUrlParams()
})

// Theme initialization and toggle
function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle")
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

      // Add this to force re-render of text colors
      document.body.style.color = isDarkMode ? "#f9fafb" : "#1f2937"
      setTimeout(() => {
        document.body.style.color = ""
      }, 10)
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

// Auth tabs initialization
function initAuthTabs() {
  const authTabs = document.querySelectorAll(".auth-tab")
  const authForms = document.querySelectorAll(".auth-form")

  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and forms
      authTabs.forEach((t) => t.classList.remove("active"))
      authForms.forEach((f) => f.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      // Show corresponding form
      const formId = `${tab.getAttribute("data-tab")}-form`
      document.getElementById(formId).classList.add("active")
    })
  })
}

// Form submissions
function initFormSubmissions() {
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value

      // Validate form
      if (!email || !password) {
        alert("Please fill in all fields")
        return
      }

      // Simulate login (would connect to backend in real app)
      alert("Login successful! Redirecting to dashboard...")

      // Redirect to main page after short delay
      setTimeout(() => {
        window.location.href = "landing.html"
      }, 1500)
    })
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("signup-name").value
      const email = document.getElementById("signup-email").value
      const password = document.getElementById("signup-password").value
      const confirmPassword = document.getElementById("signup-confirm").value

      // Validate form
      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields")
        return
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      // Validate email format (simple check for GMIT domain)
      if (!email.endsWith("@gmit.edu")) {
        alert("Please use your GMIT email address (@gmit.edu)")
        return
      }

      // Simulate signup (would connect to backend in real app)
      alert("Account created successfully! Redirecting to dashboard...")

      // Redirect to main page after short delay
      setTimeout(() => {
        window.location.href = "landing.html"
      }, 1500)
    })
  }
}

// Check URL parameters for auto-tab selection
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const signupParam = urlParams.get("signup")

  if (signupParam === "true") {
    // Trigger click on signup tab
    document.querySelector('.auth-tab[data-tab="signup"]').click()
  }
}