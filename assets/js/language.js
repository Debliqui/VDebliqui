const defaultLang = document.documentElement.lang
const switchBtnLang = document.querySelector("[data-switch-lang]")
const localStorageLang = localStorage.getItem("language")

function applyLanguage(lang) {
  document.documentElement.lang = lang
  switchBtnLang.value = lang
}

if (localStorageLang) {
  applyLanguage(localStorageLang)
} else {
  localStorage.setItem("language", defaultLang)
  applyLanguage(defaultLang)
}

switchBtnLang.addEventListener("change", () => {
  const selectedLang = switchBtnLang.value
  localStorage.setItem("language", selectedLang)
  applyLanguage(selectedLang)
})
