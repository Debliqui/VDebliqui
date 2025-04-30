const toggleTheme = document.querySelector("[data-theme-toggle]")
const themeIcon = document.querySelector("[data-theme-icon]")
const localStorageTheme = localStorage.getItem("theme")
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)")
const backgroundBannerSrc = document.querySelector("[data-background-src]")
const backgroundBannerSrcset = document.querySelector(
  "[data-background-srcset]"
)

// Initialize string according to local storage and user browser preferences.
function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme
  }

  if (systemSettingDark.matches) {
    return "dark"
  }

  return "light"
}

// Update theme switch attributes
function updateToggleTheme({ switchBtn, isDark }) {
  const newCta = isDark ? "Passer en mode claire" : "Passer en mode sombre"
  switchBtn.setAttribute("aria-label", newCta)
  themeIcon.setAttribute(
    "class",
    isDark ? "fa-solid fa-moon" : "fa-solid fa-sun"
  )
  themeIcon.setAttribute("data-theme-icon", isDark ? "moon" : "sun")
}

// Update theme string in html header
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme)
}

// Update banner image to match color
function updateBackgroundBannerSrc(currentThemeSetting) {
  if (currentThemeSetting === "dark") {
    backgroundBannerSrc.setAttribute(
      "src",
      "./assets/image/background-dark-366.webp"
    )
    backgroundBannerSrcset.setAttribute(
      "srcset",
      "./assets/image/background-dark-366.webp 399w, ./assets/image/background-dark-735.webp 767w, ./assets/image/background-dark-975.webp 1023w, ./assets/image/background-dark-1280.webp 1439px"
    )
  } else {
    backgroundBannerSrc.setAttribute(
      "src",
      "./assets/image/background-light-366.webp"
    )
    backgroundBannerSrcset.setAttribute(
      "srcset",
      "./assets/image/background-light-366.webp 399w, ./assets/image/background-light-735.webp 767w, ./assets/image/background-light-975.webp 1023w, ./assets/image/background-light-1280.webp 1439px"
    )
  }
}

// Initial mode status
let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
})

updateToggleTheme({
  switchBtn: toggleTheme,
  isDark: currentThemeSetting === "dark",
})
updateThemeOnHtmlEl({ theme: currentThemeSetting })
updateBackgroundBannerSrc(currentThemeSetting)

// Manual theme change
toggleTheme.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark"

  localStorage.setItem("theme", newTheme)
  updateToggleTheme({ switchBtn: toggleTheme, isDark: newTheme === "dark" })
  updateThemeOnHtmlEl({ theme: newTheme })
  updateBackgroundBannerSrc(newTheme)

  currentThemeSetting = newTheme
})

// Changing the theme via browser preferences
systemSettingDark.addEventListener("change", (event) => {
  const newTheme = event.matches ? "dark" : "light"
  localStorage.setItem("theme", newTheme)
  updateToggleTheme({ switchBtn: toggleTheme, isDark: newTheme === "dark" })
  updateThemeOnHtmlEl({ theme: newTheme })
  updateBackgroundBannerSrc(newTheme)

  currentThemeSetting = newTheme
})
