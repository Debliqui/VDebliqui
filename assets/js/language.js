import traduction from "../data/traduction.js"

const defaultLang = document.documentElement.lang || "fr"
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
  document.querySelector("[data-switch-lang-title]").textContent =
    content.selectTitle
  // Update the content of the switchTheme button.
  const isDark = document.documentElement.getAttribute("data-theme") === "dark"
  const themeLabel = document.querySelector("[data-theme-label]")
  if (themeLabel) {
    themeLabel.textContent = isDark
      ? content.themeDarkLabel
      : content.themeLightLabel
  }

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
  document
    .querySelectorAll("[data-contact-btn]")
    .forEach((button) => (button.textContent = bannerSection.subscribe))

  // Update about section
  const aboutSection = content.section.about
  document
    .querySelector("[data-about-section]")
    .setAttribute("aria-label", aboutSection.sectionLabel)
  const aboutSectionTitle = document.querySelector("[data-about-title]")
  aboutSectionTitle.textContent = aboutSection.title
  document.querySelector("[data-about-catchphrase]").innerHTML =
    aboutSection.catchphrase
  document.querySelector("[data-about-titleList]").textContent =
    aboutSection.titleList
  const specialtiesList = document.querySelector("[data-about-specialties]")
  if (specialtiesList) {
    specialtiesList.innerHTML = ""
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

  /**
   * Add category id to url
   * @param {string} id
   */
  function applyFilterIdInUrl(id) {
    const params = new URLSearchParams(location.search)

    if (id === "all") {
      // Removes 'flt' parameter from URL for "all"
      params.delete("flt")
    } else {
      params.set("flt", id)
    }

    const newUrl =
      params.toString().length > 0
        ? `${location.pathname}?${params.toString()}`
        : location.pathname

    history.replaceState(null, "", newUrl)
  }

  // Project filter
  const filterContainer = document.querySelector("[data-projects-filter]")
  filterContainer.setAttribute("title", content.section.project.filtersTitle)
  let currentId =
    new URLSearchParams(window.location.search).get("flt") || "all"
  filterContainer.innerHTML = ""

  const allCategoriesBtn = document.createElement("button")
  allCategoriesBtn.setAttribute("data-category-id", "all")
  allCategoriesBtn.classList.add(
    "section-container__projects__filter__btn",
    "selected"
  )
  allCategoriesBtn.textContent = content.section.project.allCategory
  filterContainer.appendChild(allCategoriesBtn)

  const categoriesList = content.section.project.categories
  categoriesList.forEach((category) => {
    const categoryBtn = document.createElement("button")
    categoryBtn.setAttribute("data-category-id", category.categoryId)
    categoryBtn.classList.add("section-container__projects__filter__btn")
    categoryBtn.textContent = category.name
    filterContainer.appendChild(categoryBtn)
  })

  // Adds the filter category to the URL and updates the style of the selected buttons.
  document
    .querySelectorAll(".section-container__projects__filter__btn")
    .forEach((filterBtn) => {
      filterBtn.addEventListener("click", () => {
        const categoryId = filterBtn.dataset.categoryId

        applyFilterIdInUrl(categoryId)
        generateProjectCard()

        document
          .querySelectorAll(".section-container__projects__filter__btn")
          .forEach((btn) => btn.classList.remove("selected"))

        filterBtn.classList.add("selected")
      })
    })

  generateProjectCard()

  // Generate project Card
  function generateProjectCard() {
    const params = new URLSearchParams(window.location.search)
    const currentId = params.get("flt") || "all"
    document
      .querySelectorAll(".section-container__projects__filter__btn")
      .forEach((btn) => {
        btn.classList.toggle("selected", btn.dataset.categoryId === currentId)
      }) // Initialise selected button
    projectSection.innerHTML = ""
    const filteredProjects =
      currentId === "all"
        ? projects
        : projects.filter((project) => project.categoryId === currentId)

    filteredProjects.forEach((project) => {
      const projectCard = `
        <div class="project-card" data-category-id="${project.categoryId}">
            <article class="card" aria-label="${
              content.section.project.label.projectLabel
            } ${project.name}">
              <div class="card__content" >
                <h3 class="card__content__name">${project.name}</h3>
                <p class="card__content__objectif" aria-label="${
                  content.section.project.label.objectifLabel
                }"><span>${
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
                  alt=""
                  class="card__img-container__picture"
                  width="300" height="200"
                  loading="lazy"
                />
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

    setupProjectModal()
  }

  window.addEventListener("popstate", () => {
    generateProjectCard()
  })

  // Project modal
  const dialog = document.querySelector("[data-project-dialog]")
  dialog.setAttribute("aria-label", content.section.project.label.dialogLabel)
  function setupProjectModal() {
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
            iframeContent.title = project.name
            iframeContent.setAttribute("data-iframe-content", "")
            iframeDemo.appendChild(iframeContent)
          }

          document.querySelector("[data-project-dialog-subtitle]").textContent =
            project.subtitle
          document.querySelector(
            "[data-project-dialog-description]"
          ).innerHTML = project.description
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
          const linkGitH = document.querySelector("[data-gitHub-repo]")
          linkGitH.href = project.linkGit
          if (project.link) {
            const linkDemo = document.createElement("a")
            linkDemo.textContent = content.section.project.label.linkDemoBtn
            linkDemo.className = "dialog-project__links__link"
            linkDemo.href = project.link
            linkDemo.target = "_blank"
            linkDemo.setAttribute("data-link-demo", "")
            linkGitH.insertAdjacentElement("afterend", linkDemo)
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
  }

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
    if (linkDemo) {
      linkDemo.remove()
    }
    const linkGith = document.querySelector("[data-gitHub-repo]")
    linkGith.href = ""
    const imgElement = document.querySelector("[data-demo-img]")
    if (imgElement) {
      imgElement.remove()
    }
  }

  // Update degrees section
  document
    .querySelector("[data-degrees-section]")
    .setAttribute("aria-label", content.section.degrees.sectionLabel)
  const sectionDegrees = document.querySelector("[data-degrees-title]")
  sectionDegrees.textContent = content.section.degrees.title
  const catchphrase = document.querySelector("[data-degrees-catchphrase]")
  catchphrase.textContent = content.section.degrees.catchphrase
  const cardGridDegrees = document.querySelector("[data-degrees-card-grid]")
  const cardGridDegreesTitle = document.querySelector(
    "[data-degrees-card-grid-title]"
  )
  cardGridDegreesTitle.textContent = content.section.degrees.gridLabel
  const listArticles = content.section.degrees.article
  cardGridDegrees.innerHTML = ""
  listArticles.forEach((article) => {
    const gridCards = `
     <article
            class="section-container__degrees__grid__card"
            aria-label="${article.cardLabel}"
            data-degrees-card
          >
              <h4
                class="section-container__degrees__grid__card__title"
                data-degrees-card-title
              >
              ${article.icon} ${article.title}
              </h4>
              <p class="section-container__degrees__grid__card__type">Type : ${
                article.type
              }</p>
              <p class="section-container__degrees__grid__card__skills">${
                article.skillsLabel
              }</p>
            <ul
              class="section-container__degrees__grid__card__list"
              aria-label="${article.listLabel}"
              data-degrees-card-list
            >
              ${article.list
                .map(
                  (item) => `<li><span aria-hidden="true">✔ </span>${item}</li>`
                )
                .join("")}
            </ul>
          </article>
  `
    cardGridDegrees.innerHTML += gridCards
  })

  // Update footer
  document
    .querySelector("[data-footer-label]")
    .setAttribute("aria-label", content.footer.footerLabel)
  document
    .querySelectorAll("[data-list-link-title")
    .forEach((element) => (element.textContent = content.footer.listLabel))
  document
    .querySelectorAll("[data-linkedin-label-span]")
    .forEach((element) => (element.textContent = content.footer.linkedinLabel))
  document
    .querySelectorAll("[data-github-label]")
    .forEach((element) =>
      element.setAttribute("aria-label", content.footer.githubLabel)
    )
  document
    .querySelectorAll("[data-gitHub-label-span]")
    .forEach((element) => (element.textContent = content.footer.githubLabel))

  // Update contact modal
  document
    .querySelector("[data-dialog-label]")
    .setAttribute("aria-label", content.contact.dialogLabel)
  const closeBtnLabel = document.querySelectorAll("[data-close-btn-label]")
  closeBtnLabel.forEach((btn) => {
    btn.textContent = content.contact.closeLabel
  })
  document.querySelector("[data-dialog-subtitle]").innerHTML =
    content.contact.subtitle
  const dialogDesc = document.querySelector("[data-dialog-description]")
  dialogDesc.textContent = content.contact.description
  dialogDesc.setAttribute("aria-label", content.contact.descriptionLabel)
  const copyBtnContent = document.querySelector("[data-copy-btn-content]")
  copyBtnContent.setAttribute("aria-label", content.contact.copyBtn)
  copyBtnContent.textContent = content.contact.copyBtn
  document.querySelector("[data-mail-btn]").textContent =
    content.contact.mailBtnLabel
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
