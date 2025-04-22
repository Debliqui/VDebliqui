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
  document
    .querySelector("[data-header-label]")
    .setAttribute("aria-label", content.headerLablel)
  document
    .querySelector("[data-switch-lang]")
    .setAttribute("aria-label", content.menuLabel)
  document
    .querySelector("[data-theme-label]")
    .setAttribute("aria-label", content.themeLabel)
  document.querySelector("[data-title]").textContent = content.title
  document.querySelector("[data-job]").textContent = content.job
  document.querySelector("[data-location]").textContent = content.location
  document.querySelector("[data-statu]").textContent = content.statu
  document.querySelector("[data-subscribe]").textContent = content.subscribe

  document
    .querySelector("[data-main-label]")
    .setAttribute("aria-label", content.mainLabel)

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

  const projectSection = document.querySelector("[data-projects]")
  document.querySelector("[data-project-title]").textContent =
    content.section.project.title

  projectSection.innerHTML = ""
  content.section.project.listProject.forEach((project) => {
    const projectCard = `
        <div class="project-card">
            <article class="card" aria-label="${
              content.section.project.label.projectLabel
            } ${project.name}">
              <div class="card__content" >
                <h3 class="card__content__name">${project.name}</h3>
                <p class="card__content__objectif" aria-label="${
                  content.section.project.label.objectifLabel
                }"><span aria-hidden="true">${
      content.section.project.label.objectifLabel
    } : </span>${project.objectif}</p>
                 <ul class="card__content__language" aria-label="${
                   content.section.project.label.langTitle
                 }">
                    ${project.language
                      .map(
                        (language) =>
                          `<li class="card__content__language__tag">${language}</li>`
                      )
                      .join("")}
                </ul>
              </div>
              <a href="${
                project.link
              }" target="_blank" class="card__img-container" aria-label="${
      content.section.project.label.linkLabel
    } ${project.name}">
                <img
                  src="${project.src}"
                  alt="Demo ${project.name}"
                  class="card__img-container__picture"/>
              </a>
            </article>
          </a>
          <a href="${
            project.linkGit
          }" target="_blank" class="github-link" aria-label="${
      content.section.project.label.linkGitLabel
    } ${project.name}">
              <i class="fa-brands fa-github"></i>
            </a>
          </article>
        </div>
    `
    projectSection.innerHTML += projectCard
  })

  document
    .querySelector("[data-skills-section]")
    .setAttribute("aria-label", content.section.skils.sectionLabel)
  const sectionSkills = document.querySelector("[data-skills-title]")
  sectionSkills.textContent = content.section.skils.title
  sectionSkills.setAttribute(
    "aria-labelledby",
    content.section.skils.sectionLabel
  )
  document.querySelector("[data-language-label]").textContent =
    content.section.skils.langLabel
  document
    .querySelector("[data-language-list]")
    .setAttribute("aria-label", content.section.skils.langListLabel)
  document.querySelector("[data-tool-label]").textContent =
    content.section.skils.toolsLabel
  document
    .querySelector("[data-tool-list]")
    .setAttribute("aria-label", content.section.skils.toolsListLabel)
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
