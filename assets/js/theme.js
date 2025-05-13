import traduction from "../data/traduction.js"

const toggleTheme = document.querySelector("[data-theme-toggle]")
const themeLabel = document.querySelector("[data-theme-label]")
const themeIcon = document.querySelector("[data-theme-icon]")
const localStorageTheme = localStorage.getItem("theme")
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)")
const backgroundBannerSrc = document.querySelector("[data-background-src]")
const backgroundBannerSrcset = document.querySelector(
  "[data-background-srcset]"
)

// Initialize string according to local storage and user browser preferences.
function getPreferredTheme(localStorageTheme, systemSettingDark) {
  if (localStorageTheme) return localStorageTheme
  return systemSettingDark.matches ? "dark" : "light"
}

let currentThemeSetting = getPreferredTheme(
  localStorageTheme,
  systemSettingDark
)

document.addEventListener("DOMContentLoaded", () => {
  const currentLang = document.documentElement.lang || "fr"
  applyTheme(currentThemeSetting, currentLang)
})

function applyTheme(newTheme, lang) {
  localStorage.setItem("theme", newTheme)

  // Update theme switch attributes and content
  const newCta =
    traduction[lang]?.[
      newTheme === "dark" ? "themeDarkLabel" : "themeLightLabel"
    ]
  themeLabel.textContent = newCta
  themeIcon.setAttribute(
    "class",
    newTheme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun"
  )
  themeIcon.setAttribute(
    "data-theme-icon",
    newTheme === "dark" ? "moon" : "sun"
  )

  // Updates the data-theme attribute on the html element to apply the new theme
  document.querySelector("html").setAttribute("data-theme", newTheme)

  // Update banner image to match color
  const prefix = newTheme === "dark" ? "background-dark" : "background-light"
  backgroundBannerSrc.setAttribute("src", `./assets/image/${prefix}-366.webp`)
  backgroundBannerSrcset.setAttribute(
    "srcset",
    `
      ./assets/image/${prefix}-366.webp 399w,
      ./assets/image/${prefix}-735.webp 767w,
      ./assets/image/${prefix}-975.webp 1023w,
      ./assets/image/${prefix}-1280.webp 1439w
    `
  )

  currentThemeSetting = newTheme
}

// Manual theme change
toggleTheme.addEventListener("click", () => {
  applyTheme(
    currentThemeSetting === "dark" ? "light" : "dark",
    document.documentElement.lang || "fr"
  )
})

// Changing the theme via browser preferences
systemSettingDark.addEventListener("change", (event) => {
  applyTheme(
    event.matches ? "dark" : "light",
    document.documentElement.lang || "fr"
  )
})
