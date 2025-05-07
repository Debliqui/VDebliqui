const dialog = document.querySelector("[data-dialog-label]")
const dialogClose = document.querySelector("[data-close-btn]")
const contactBtn = document.querySelector("[data-contact-btn]")
const copyBtn = document.querySelector("[data-copy-btn]")
const dataEmail = document.querySelector("[data-email]")
const copyMessage = document.querySelector("[data-copy-message]")

contactBtn.addEventListener("click", () => {
  dialog.showModal()
})

dialogClose.addEventListener("click", () => {
  dialog.close()
  copyMessage.classList.remove("active")
  copyMessage.setAttribute("aria-hidden", "true")
})

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close()
    copyMessage.classList.remove("active")
    copyMessage.setAttribute("aria-hidden", "true")
  }
})

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(dataEmail.textContent.trim()).then(() => {
    copyMessage.classList.add("active")
    copyMessage.setAttribute("aria-hidden", "false")
    setTimeout(() => {
      copyMessage.classList.remove("active")
      copyMessage.setAttribute("aria-hidden", "true")
    }, 3000)
  })
})
