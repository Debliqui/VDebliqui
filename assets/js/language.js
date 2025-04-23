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
  // Update header
  document
    .querySelector("[data-header-label]")
    .setAttribute("aria-label", content.headerLablel)
  document
    .querySelector("[data-switch-lang]")
    .setAttribute("aria-label", content.menuLabel)
  document
    .querySelector("[data-theme-label]")
    .setAttribute("aria-label", content.themeLabel)

  // Update main content
  document
    .querySelector("[data-main-label]")
    .setAttribute("aria-label", content.mainLabel)

  // Update banner section
  const bannerSection = content.section.banner
  document.querySelector("[data-title]").textContent = bannerSection.title
  document.querySelector("[data-job]").textContent = bannerSection.job
  document.querySelector("[data-location]").textContent = bannerSection.location
  document.querySelector("[data-statu]").textContent = bannerSection.statu
  const subscribeBtn = document.querySelector("[data-contact-btn]")
  subscribeBtn.textContent = bannerSection.subscribe
  subscribeBtn.setAttribute("aria-label", bannerSection.subscribeLabel)
  document
    .querySelector("[data-link-label]")
    .setAttribute("aria-label", bannerSection.linkLabel)
  // Update about section
  const aboutSection = content.section.about
  document
    .querySelector("[data-about-section]")
    .setAttribute("aria-label", aboutSection.sectionLabel)
  const aboutSectionTitle = document.querySelector("[data-about-title]")
  aboutSectionTitle.textContent = aboutSection.title
  aboutSectionTitle.setAttribute("aria-labelledby", aboutSection.title)
  document.querySelector("[data-about-catchphrase]").textContent =
    aboutSection.catchphrase

  const specialtiesList = document.querySelector("[data-about-specialties]")
  if (specialtiesList) {
    specialtiesList.innerHTML = ""
    specialtiesList.setAttribute("aria-label", aboutSection.listLabel)
    aboutSection.listSpecialties.forEach((specialty) => {
      const listItem = document.createElement("li")
      listItem.textContent = specialty
      specialtiesList.appendChild(listItem)
    })
  }

  // Update project section
  const projectSection = document.querySelector("[data-projects]")
  document
    .querySelector("[data-projects-section]")
    .setAttribute("aria-label", content.section.project.sectionLabel)
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

  // Update skills section
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

  // Update footer
  document
    .querySelector("[data-footer-label]")
    .setAttribute("aria-label", content.footer.footerLabel)
  document
    .querySelectorAll("[data-list-link]")
    .forEach((element) =>
      element.setAttribute("aria-label", content.footer.listLabel)
    )
  document
    .querySelectorAll("[data-linkedin-label]")
    .forEach((element) =>
      element.setAttribute("aria-label", content.footer.linkedinLabel)
    )
  document
    .querySelectorAll("[data-github-label]")
    .forEach((element) =>
      element.setAttribute("aria-label", content.footer.githubLabel)
    )

  // Update contact modal
  document
    .querySelector("[data-dialog-label]")
    .setAttribute("aria-label", content.contact.dialogLabel)
  document
    .querySelector("[data-close-btn]")
    .setAttribute("aria-label", content.contact.closeLabel)
  document.querySelector("[data-dialog-subtitle]").innerHTML =
    content.contact.subtitle
  const dialogDesc = document.querySelector("[data-dialog-description]")
  dialogDesc.textContent = content.contact.description
  dialogDesc.setAttribute("aria-label", content.contact.descriptionLabel)
  document
    .querySelector("[data-copy-btn]")
    .setAttribute("aria-label", content.contact.copyBtnLabel)
  const copyBtnContent = document.querySelector("[data-copy-btn-content]")
  copyBtnContent.setAttribute("aria-label", content.contact.copyBtn)
  copyBtnContent.textContent = content.contact.copyBtn
  document
    .querySelector("[data-mail-btn]")
    .setAttribute("aria-label", content.contact.mailBtnLabel)
  document
    .querySelector("[data-copy-message]")
    .setAttribute("aria-label", content.contact.copyMessageLabel)
  document.querySelector("[data-copy-message-content]").textContent =
    content.contact.copyMessage
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
