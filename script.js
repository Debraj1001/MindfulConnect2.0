// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the application
  initApp()
})

// Main initialization function
function initApp() {
  // Initialize theme
  initTheme()

  // Initialize navigation
  initNavigation()

  // Initialize typing effect
  initTypingEffect()

  // Initialize mood tracker
  initMoodTracker()

  // Initialize forums
  initForums()

  // Initialize challenges
  initChallenges()

  // Initialize events
  initEvents()

  // Initialize smooth scrolling
  initSmoothScrolling()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize mouse following background
  initMouseFollowingBackground()

  // Set current date
  setCurrentDate()
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

      // Add this to force re-render of text colors
      document.body.style.color = isDarkMode ? "#f9fafb" : "#1f2937"
      setTimeout(() => {
        document.body.style.color = ""
      }, 10)
    })
  }

  // Update theme icon based on current theme
  function updateThemeIcon(isDarkMode) {
    const icons = document.querySelectorAll("#theme-toggle i, .theme-toggle i")
    icons.forEach((icon) => {
      if (isDarkMode) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
      } else {
        icon.classList.remove("fa-sun")
        icon.classList.add("fa-moon")
      }
    })
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

  // Active link highlighting
  const navItems = document.querySelectorAll(".nav-links a")
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  })
}

// Typing effect initialization
function initTypingEffect() {
  const mainText = "Your Mental Wellness Journey Starts Here"
  const subText = "A safe space for students to connect, share, and prioritize mental health."

  const mainTypingElement = document.getElementById("typing-text")
  const subTypingElement = document.getElementById("sub-typing-text")

  if (mainTypingElement && subTypingElement) {
    let index1 = 0,
      index2 = 0

    function typeMainText() {
      if (index1 < mainText.length) {
        mainTypingElement.textContent = mainText.substring(0, index1 + 1)
        index1++
        setTimeout(typeMainText, 100)
      } else {
        setTimeout(typeSubText, 300)
      }
    }

    function typeSubText() {
      if (index2 < subText.length) {
        subTypingElement.textContent = subText.substring(0, index2 + 1)
        index2++
        setTimeout(typeSubText, 50)
      }
    }

    typeMainText()
  }
}

// Mood tracker initialization
function initMoodTracker() {
  const moodOptions = document.querySelectorAll(".mood-option")
  const factorTags = document.querySelectorAll(".factor-tag")
  const moodChart = document.getElementById("mood-chart")

  // Select mood
  if (moodOptions) {
    moodOptions.forEach((option) => {
      option.addEventListener("click", () => {
        // Remove active class from all options
        moodOptions.forEach((opt) => opt.classList.remove("active"))

        // Add active class to selected option
        option.classList.add("active")

        // Store selected mood (would save to backend in real app)
        const selectedMood = option.getAttribute("data-mood")
        localStorage.setItem("currentMood", selectedMood)
      })
    })
  }

  // Select factors
  if (factorTags) {
    factorTags.forEach((tag) => {
      tag.addEventListener("click", () => {
        tag.classList.toggle("active")

        // Store selected factors (would save to backend in real app)
        const activeTags = Array.from(document.querySelectorAll(".factor-tag.active")).map((tag) => tag.textContent)
        localStorage.setItem("currentFactors", JSON.stringify(activeTags))
      })
    })
  }

  // Initialize mood chart (using canvas)
  if (moodChart) {
    const ctx = moodChart.getContext("2d")

    // Sample data (would come from backend in real app)
    const moodData = [
      { day: "Mon", value: 4 },
      { day: "Tue", value: 3 },
      { day: "Wed", value: 2 },
      { day: "Thu", value: 3 },
      { day: "Fri", value: 4 },
      { day: "Sat", value: 5 },
      { day: "Sun", value: 4 },
    ]

    // Set canvas size
    moodChart.width = moodChart.parentElement.offsetWidth
    moodChart.height = 250

    // Draw chart
    drawMoodChart(ctx, moodData, moodChart.width, moodChart.height)

    // Redraw on window resize
    window.addEventListener("resize", () => {
      moodChart.width = moodChart.parentElement.offsetWidth
      drawMoodChart(ctx, moodData, moodChart.width, moodChart.height)
    })
  }

  // Function to draw mood chart
  function drawMoodChart(ctx, data, width, height) {
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue("--text-muted")
    ctx.stroke()

    // Draw data points and lines
    const pointWidth = chartWidth / (data.length - 1)

    ctx.beginPath()
    ctx.moveTo(padding, height - padding - (data[0].value / 5) * chartHeight)

    data.forEach((point, index) => {
      const x = padding + index * pointWidth
      const y = height - padding - (point.value / 5) * chartHeight

      // Draw line to this point
      if (index > 0) {
        ctx.lineTo(x, y)
      }

      // Draw day label
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--text-muted")
      ctx.textAlign = "center"
      ctx.fillText(point.day, x, height - padding + 20)
    })

    // Style and stroke the line
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue("--primary-color")
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw points
    data.forEach((point, index) => {
      const x = padding + index * pointWidth
      const y = height - padding - (point.value / 5) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--primary-color")
      ctx.fill()

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#fff"
      ctx.fill()
    })

    // Draw y-axis labels
    const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Great"]
    moodLabels.forEach((label, index) => {
      const y = height - padding - (index / 4) * chartHeight
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--text-muted")
      ctx.textAlign = "right"
      ctx.fillText(label, padding - 10, y + 5)
    })
  }
}

// Forums initialization
function initForums() {
  const forumPostForm = document.getElementById("forum-post-form")
  const forumCategory = document.getElementById("forum-category")
  const postContent = document.getElementById("post-content")
  const stayAnonymous = document.getElementById("stay-anonymous")
  const anonymousName = document.getElementById("anonymous-name")

  if (forumPostForm) {
    forumPostForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const category = forumCategory.value
      const content = postContent.value
      const isAnonymous = stayAnonymous.checked
      const nameType = anonymousName.value

      // Validate form
      if (!category || !content) {
        alert("Please fill in all required fields")
        return
      }

      // Generate anonymous name
      let displayName = "Anonymous User"
      if (nameType === "random") {
        const animals = ["Owl", "Fox", "Eagle", "Deer", "Wolf", "Bear", "Lion", "Tiger", "Rabbit", "Dolphin"]
        displayName = "Anonymous " + animals[Math.floor(Math.random() * animals.length)]
      }

      // Create new post (would send to backend in real app)
      alert(`Post submitted as ${displayName} in ${category} category!`)

      // Reset form
      forumPostForm.reset()
    })
  }
}

// Challenges initialization
function initChallenges() {
  const categoryTabs = document.querySelectorAll(".category-tab")
  const challengeCards = document.querySelectorAll(".challenge-card:not(.active)")
  const markCompleteBtn = document.querySelector(".task-actions .secondary-btn")
  const skipTodayBtn = document.querySelector(".task-actions .text-btn")

  // Category tabs
  if (categoryTabs) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        categoryTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        tab.classList.add("active")

        // Filter challenges by category (would fetch from backend in real app)
        const category = tab.getAttribute("data-category")
        filterChallenges(category)
      })
    })
  }

  // Mark challenge complete
  if (markCompleteBtn) {
    markCompleteBtn.addEventListener("click", () => {
      // Update progress (would send to backend in real app)
      const progressBar = document.querySelector(".progress")
      const progressText = document.querySelector(".progress-text")

      if (progressBar && progressText) {
        // Increase progress by ~14% (1/7 of the challenge)
        const currentWidth = Number.parseInt(progressBar.style.width) || 42
        const newWidth = Math.min(currentWidth + 14, 100)

        progressBar.style.width = `${newWidth}%`
        progressText.textContent = `${newWidth}% Complete`

        // Update day counter
        const dayCounter = document.querySelector(".challenge-info p")
        if (dayCounter) {
          const currentDay = Number.parseInt(dayCounter.textContent.split(" ")[1])
          const totalDays = Number.parseInt(dayCounter.textContent.split(" ")[3])

          if (currentDay < totalDays) {
            dayCounter.textContent = `Day ${currentDay + 1} of ${totalDays}`
          }
        }

        // Update streak
        const streakCounter = document.querySelector(".challenge-streak span")
        if (streakCounter) {
          const currentStreak = Number.parseInt(streakCounter.textContent.split(" ")[0])
          streakCounter.innerHTML = `<i class="fas fa-fire"></i> ${currentStreak + 1} Day Streak!`
        }

        // Show success message
        alert("Great job! Task marked as complete.")

        // Disable buttons
        markCompleteBtn.disabled = true
        if (skipTodayBtn) skipTodayBtn.disabled = true
      }
    })
  }

  // Skip today's task
  if (skipTodayBtn) {
    skipTodayBtn.addEventListener("click", () => {
      // Update day counter (would send to backend in real app)
      const dayCounter = document.querySelector(".challenge-info p")
      if (dayCounter) {
        const currentDay = Number.parseInt(dayCounter.textContent.split(" ")[1])
        const totalDays = Number.parseInt(dayCounter.textContent.split(" ")[3])

        if (currentDay < totalDays) {
          dayCounter.textContent = `Day ${currentDay + 1} of ${totalDays}`
        }
      }

      // Reset streak
      const streakCounter = document.querySelector(".challenge-streak span")
      if (streakCounter) {
        streakCounter.innerHTML = `<i class="fas fa-fire"></i> 0 Day Streak!`
      }

      // Show message
      alert("Task skipped. You can try again tomorrow!")

      // Disable buttons
      if (markCompleteBtn) markCompleteBtn.disabled = true
      skipTodayBtn.disabled = true
    })
  }

  // Function to filter challenges by category
  function filterChallenges(category) {
    if (category === "all" || category === "popular") {
      challengeCards.forEach((card) => {
        card.style.display = "block"
      })
    } else {
      challengeCards.forEach((card) => {
        // Check if card matches category (would be data-attribute in real app)
        const cardCategory = card.querySelector(".challenge-info h4").textContent.toLowerCase()

        if (cardCategory.includes(category)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    }
  }
}

// Events initialization
function initEvents() {
  const calendarNav = document.querySelectorAll(".calendar-nav")
  const calendarDates = document.getElementById("calendar-dates")
  const currentMonthElement = document.getElementById("current-month")

  // Generate calendar
  if (calendarDates && currentMonthElement) {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    generateCalendar(currentMonth, currentYear)

    // Calendar navigation
    if (calendarNav) {
      calendarNav.forEach((nav) => {
        nav.addEventListener("click", () => {
          const direction = nav.querySelector("i").classList.contains("fa-chevron-left") ? -1 : 1
          const newDate = new Date(currentYear, currentMonth + direction, 1)
          generateCalendar(newDate.getMonth(), newDate.getFullYear())
        })
      })
    }
  }

  // Function to generate calendar
  function generateCalendar(month, year) {
    if (!calendarDates || !currentMonthElement) return

    const today = new Date()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.

    // Update month display
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    currentMonthElement.textContent = `${monthNames[month]} ${year}`

    // Clear previous calendar
    calendarDates.innerHTML = ""

    // Add previous month's days
    for (let i = 0; i < startingDay; i++) {
      const prevMonthDay = new Date(year, month, 0 - (startingDay - i - 1)).getDate()
      const dayElement = document.createElement("span")
      dayElement.textContent = prevMonthDay
      dayElement.classList.add("prev-month")
      calendarDates.appendChild(dayElement)
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("span")
      dayElement.textContent = i

      // Check if this is today
      if (today.getDate() === i && today.getMonth() === month && today.getFullYear() === year) {
        dayElement.classList.add("current-day")
      }

      // Add event indicator for some days (would come from backend in real app)
      if ([6, 8, 13, 16, 21].includes(i)) {
        dayElement.classList.add("has-event")
      }

      dayElement.addEventListener("click", () => {
        // Remove current-day class from all dates
        document.querySelectorAll(".calendar-dates span").forEach((date) => {
          date.classList.remove("current-day")
        })

        // Add current-day class to clicked date
        dayElement.classList.add("current-day")

        // Filter events by date (would fetch from backend in real app)
        alert(`Events for ${monthNames[month]} ${i}, ${year} would be displayed here.`)
      })

      calendarDates.appendChild(dayElement)
    }

    // Add next month's days to fill the grid
    const totalDaysDisplayed = startingDay + daysInMonth
    const remainingDays = 7 - (totalDaysDisplayed % 7)

    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        const dayElement = document.createElement("span")
        dayElement.textContent = i
        dayElement.classList.add("next-month")
        calendarDates.appendChild(dayElement)
      }
    }
  }
}

// Smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close mobile menu if open
        const navLinks = document.querySelector(".nav-links")
        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")

          const icon = document.querySelector(".mobile-menu-btn i")
          if (icon) {
            icon.classList.remove("fa-times")
            icon.classList.add("fa-bars")
          }
        }

        // Scroll to target with offset for header
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .connection-card, .challenge-card, .resource-card, .event-card, .emergency-card",
  )

  // Initial check for elements in viewport
  checkElementsInViewport()

  // Check on scroll
  window.addEventListener("scroll", checkElementsInViewport)

  function checkElementsInViewport() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("fade-in")
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

// Set current date
function setCurrentDate() {
  const currentDateElement = document.getElementById("current-date")
  if (currentDateElement) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const today = new Date()
    currentDateElement.textContent = today.toLocaleDateString("en-US", options)
  }
}