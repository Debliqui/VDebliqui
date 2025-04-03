import "./index.scss"
import { useContext } from "react"
import LanguageContext from "../../context/LanguageContext"

export default function LinkedinButton({ title, statu }) {
  const { language } = useContext(LanguageContext)
  return (
    <a
      href="https://www.linkedin.com/in/valentin-d-290332112/"
      target="_blank"
      rel="noopener noreferrer"
      className="linkedinBtn"
      aria-label={
        language ? "Visitez mon profil LinkedIn" : "Visit me LinkedIn Profile"
      }
    >
      <i className="fa-brands fa-linkedin" aria-hidden="true" />
      <span className="linkedinBtn__content">
        <h3 className="linkedinBtn__content__title">{title}</h3>
        <p className="linkedinBtn__content__statu">{statu}</p>
      </span>
    </a>
  )
}
