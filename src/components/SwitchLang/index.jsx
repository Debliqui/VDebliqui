import { useContext } from "react"
import LanguageContext from "../../context/LanguageContext"

export default function SwitchLang() {
  const { SwitchLanguage, langage } = useContext(LanguageContext)
  return (
    <select
      name="language"
      role="menu"
      id="language-selecte"
      onChange={(event) => {
        SwitchLanguage(event.target.value)
      }}
      aria-label={langage ? "Sélectionner la langue" : "Select language"}
    >
      <option value="fr" aria-label="Français">
        FR
      </option>
      <option value="en" aria-label="English">
        EN
      </option>
    </select>
  )
}
