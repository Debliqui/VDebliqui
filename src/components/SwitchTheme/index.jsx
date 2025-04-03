import { useContext } from "react"
import ThemeContext from "../../context/ThemeContext"
import LanguageContext from "../../context/LanguageContext"

import Sun from "../../assets/sun.svg"
import Moon from "../../assets/moon.svg"
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
        <img
          src={Moon}
          alt={language ? "Icône de la lune" : "Moon icon"}
          className="switchTheme__icon"
        />
      ) : (
        <img
          src={Sun}
          alt={language ? "Icône du soleil" : "Sun icon"}
          className="switchTheme__icon"
        />
      )}
    </button>
  )
}
