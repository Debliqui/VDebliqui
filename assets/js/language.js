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

  const projectSection = document.querySelector("[data-projects]")
  document.querySelector("[data-project-title]").textContent =
    content.section.project.title

  projectSection.innerHTML = ""
  content.section.project.listProject.forEach((project) => {
    const projectCard = `
        <div class="project-card">
            <article class="card" aria-label="Project ${project.name}">
              <div class="card__content" >
                <h3 class="card__content__name">${project.name}</h3>
                <p class="card__content__objectif" aria-label="${
                  project.objectifLabel
                }"><span aria-hidden="true">${project.objectifLabel} : </span>${
      project.objectif
    }</p>
                 <ul class="card__content__language" aria-label="${
                   project.langTitle
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
      project.linkLabel
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
      project.linkGitLabel
    } ${project.name}">
              <i class="fa-brands fa-github"></i>
            </a>
          </article>
        </div>
    `
    projectSection.innerHTML += projectCard
  })
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
