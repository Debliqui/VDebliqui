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
    .querySelector("[data-profil-picture]")
    .setAttribute("alt", bannerSection.altPictureProfile)
  document
    .querySelector("[data-background-src]")
    .setAttribute("alt", bannerSection.altPictureBackground)
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
  aboutSectionTitle.setAttribute("aria-label", aboutSection.title)
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
  const projects = content.section.project.listProject
  const projectSection = document.querySelector("[data-projects]")
  document
    .querySelector("[data-projects-section]")
    .setAttribute("aria-label", content.section.project.sectionLabel)
  document.querySelector("[data-project-title]").textContent =
    content.section.project.title

  projectSection.innerHTML = ""
  projects.forEach((project) => {
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
              <button class="card__img-container" data-project-id="${
                project.id
              }" aria-label="${content.section.project.label.detailsLabel} ${
      project.name
    }">
                <img
                  src="${project.src}"
                  alt="Demo ${project.name}"
                  class="card__img-container__picture"/>
                <div class="card__img-container__overlay">
                  <p>${content.section.project.label.detailsBtnLabel}</p>
                </div>
              </button>
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

  const dialog = document.querySelector("[data-project-dialog]")
  dialog.setAttribute("aria-label", content.section.project.label.dialogLabel)
  document.querySelectorAll("[data-project-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project-id")
      const project = projects.find((p) => p.id === projectId)

      if (project) {
        document.querySelector("[data-project-dialog-title]").textContent =
          project.name

        const videoDemoContainer = document.querySelector(
          "[data-conainer-video-demo]"
        )
        const iframeDemoContainer = document.querySelector(
          "[data-container-iframe-demo]"
        )
        if (!project.mobileDemo) {
          const demoDesktop = `
          <video class="dialog-project__demo-video__src" controls muted playsinline src="${project.srcDemo}">
            `
          iframeDemoContainer.style.display = "none"
          videoDemoContainer.style.display = "flex"
          videoDemoContainer.innerHTML = demoDesktop
        } else {
          videoDemoContainer.style.display = "none"
          iframeDemoContainer.style.display = "flex"
          const iframeDemo = document.querySelector("[data-iframe-demo]")
          const existingIframeDemo = document.querySelector(
            "[data-iframe-content]"
          )
          if (existingIframeDemo) {
            existingIframeDemo.remove()
          }
          const iframeContent = document.createElement("iframe")
          iframeContent.setAttribute("src", project.link)
          iframeContent.classList.add("desktop-template__iframe")
          iframeContent.setAttribute("aria-label", project.name)
          iframeContent.setAttribute("data-iframe-content", "")
          iframeDemo.appendChild(iframeContent)
        }

        document.querySelector("[data-project-dialog-subtitle]").textContent =
          project.subtitle
        document.querySelector("[data-project-dialog-description]").innerHTML =
          project.description
        const projectLang = document.querySelector("[data-project-lang]")
        projectLang.innerHTML = `
        ${project.language
          .map(
            (language) =>
              `<li class="card__content__language__tag">${language}</li>`
          )
          .join("")}
        `
        projectLang.setAttribute(
          "aria-label",
          content.section.project.label.langTitle
        )
        const linkGith = document.querySelector("[data-gitHub-repo]")
        linkGith.href = project.linkGit
        linkGith.setAttribute(
          "aria-label",
          `${content.section.project.label.linkGitLabel} ${project.name}`
        )
        if (project.link) {
          const linkDemo = document.createElement("a")
          linkDemo.textContent = content.section.project.label.linkDemoBtn
          linkDemo.className = "dialog-project__links__link"
          linkDemo.href = project.link
          linkDemo.target = "_blank"
          linkDemo.setAttribute("data-link-demo", "")
          linkDemo.setAttribute(
            "aria-label",
            `${content.section.project.label.linkLabel} ${project.name}`
          )
          linkGith.insertAdjacentElement("afterend", linkDemo)
        } else {
          const linkDemo = document.querySelector("[data-link-demo]")
          if (linkDemo) {
            clearData()
          }
        }
        dialog.showModal()
      }
    })
  })

  document.querySelectorAll("[data-close-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      dialog.close()
      clearData()
    })
  })

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close()
      clearData()
    }
  })

  function clearData() {
    const linkDemo = document.querySelector("[data-link-demo]")
    linkDemo.remove()
    const linkGith = document.querySelector("[data-gitHub-repo]")
    linkGith.href = ""
    linkGith.setAttribute("aria-label", "")
    const imgElement = document.querySelector("[data-demo-img]")
    if (imgElement) {
      imgElement.remove()
    }
  }

  // Update skills section
  document
    .querySelector("[data-skills-section]")
    .setAttribute("aria-label", content.section.skills.sectionLabel)
  const sectionSkills = document.querySelector("[data-skills-title]")
  sectionSkills.textContent = content.section.skills.title
  sectionSkills.setAttribute("aria-label", content.section.skills.sectionLabel)
  const catchphrase = document.querySelector("[data-skills-catchphrase]")
  catchphrase.textContent = content.section.skills.catchphrase
  catchphrase.setAttribute(
    "aria-label",
    content.section.skills.catchphraseLabel
  )
  const cardGridSkills = document.querySelector("[data-skills-card-grid]")
  cardGridSkills.setAttribute("aria-label", content.section.skills.gridLabel)
  const listArticles = content.section.skills.article
  cardGridSkills.innerHTML = ""
  listArticles.forEach((article) => {
    const gridCards = `
     <article
            class="section-container__skills__grid__card"
            aria-label="${article.cardLabel}"
            data-skills-card
          >
            <header class="section-container__skills__grid__card__header">
              ${article.icon}
              <h3
                class="section-container__skills__grid__card__title"
                data-skills-card-title
              >
                ${article.title}
              </h3>
            </header>
            <ul
              class="section-container__skills__grid__card__list"
              aria-label="${article.listLabel}"
              data-skills-card-list
            >
              ${article.list
                .map(
                  (item) => `<li><span aria-hidden="true">✔ </span>${item}</li>`
                )
                .join("")}
            </ul>
          </article>
  `
    cardGridSkills.innerHTML += gridCards
  })

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
  const closeBtn = document.querySelectorAll("[data-close-btn]")
  closeBtn.forEach((btn) => {
    btn.setAttribute("aria-label", content.contact.closeLabel)
  })
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
