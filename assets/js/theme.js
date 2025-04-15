const button = document.querySelector("[data-theme-toggle]")
const themeIcon = document.querySelector("[data-theme-icon]")
const localStorageTheme = localStorage.getItem("theme")
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)")
const backgroundBannerSrc = document.querySelector("[data-background-src]")

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

function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "Passer en mode claire" : "Passer en mode sombre"
  buttonEl.setAttribute("aria-label", newCta)
  themeIcon.setAttribute(
    "class",
    isDark ? "fa-solid fa-moon" : "fa-solid fa-sun"
  )
  themeIcon.setAttribute("data-theme-icon", isDark ? "moon" : "sun")
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme)
}

function updateBackgroundBannerSrc(currentThemeSetting) {
  if (currentThemeSetting === "dark") {
    backgroundBannerSrc.setAttribute(
      "src",
      "./assets/image/background-dark.webp"
    )
  } else {
    backgroundBannerSrc.setAttribute(
      "src",
      "./assets/image/background-light.webp"
    )
  }
}

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
})

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" })
updateThemeOnHtmlEl({ theme: currentThemeSetting })
updateBackgroundBannerSrc(currentThemeSetting)

button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark"

  localStorage.setItem("theme", newTheme)
  updateButton({ buttonEl: button, isDark: newTheme === "dark" })
  updateThemeOnHtmlEl({ theme: newTheme })
  updateBackgroundBannerSrc(newTheme)

  currentThemeSetting = newTheme
})
