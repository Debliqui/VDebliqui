import traduction from "../data/traduction.js"

const defaultLang = document.documentElement.lang
const switchBtnLang = document.querySelector("[data-switch-lang]")
const localStorageLang = localStorage.getItem("language")

// Function to apply the language to the document
function applyLanguage(lang) {
  if (!traduction[lang]) {
    console.log(`La langue ${lang} n'est pas disponible dans les traductions.`)
    return
  }

  document.documentElement.lang = lang

  if (switchBtnLang) {
    switchBtnLang.value = lang
  }
}

// Updates page content according to language
function updateContent(lang) {
  const content = traduction[lang]

  if (!content) return

  document.querySelector("[data-title]").textContent = content.title
  document.querySelector("[data-job]").textContent = content.job
  document.querySelector("[data-location]").textContent = content.location
  document.querySelector("[data-statu]").textContent = content.statu
  document.querySelector("[data-subscribe]").textContent = content.subscribe

  const aboutSection = content.section.about
  document.querySelector("[data-about-title]").textContent = aboutSection.title
  document.querySelector("[data-about-catchphrase]").textContent =
    aboutSection.catchphrase

  const specialtiesList = document.querySelector("[data-about-specialties]")
  if (specialtiesList) {
    specialtiesList.innerHTML = ""
    aboutSection.listSpecialties.forEach((specialty) => {
      const listItem = document.createElement("li")
      listItem.textContent = specialty
      specialtiesList.appendChild(listItem)
    })
  }

  // document.querySelector("[data-project-title]").textContent =
  //   content.section.project
  // document.querySelector("[data-skills-title]").textContent =
  //   content.section.skils
}

document.addEventListener("DOMContentLoaded", () => {
  const langToApply = localStorageLang || defaultLang
  applyLanguage(langToApply)
  updateContent(langToApply)
})

switchBtnLang?.addEventListener("change", () => {
  const selectedLang = switchBtnLang.value
  localStorage.setItem("language", selectedLang)
  applyLanguage(selectedLang)
  updateContent(selectedLang)
})
