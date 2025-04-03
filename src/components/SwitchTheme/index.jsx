import { useContext } from "react"
import ThemeContext from "../../context/ThemeContext"
import LanguageContext from "../../context/LanguageContext"

import "./index.scss"

export default function SwitchTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { language } = useContext(LanguageContext)
  console.log(theme)

  return (
    <button
      onClick={toggleTheme}
      aria-label={language ? "Changer de thème" : "Change theme"}
      className="switchTheme"
    >
      {theme === "dark" ? (
        <i className="fa-solid fa-moon" />
      ) : (
        <i className="fa-solid fa-sun" />
      )}
    </button>
  )
}
