import "./index.scss"
import SwitchLang from "../../components/SwitchLang"
import SwitchTheme from "../../components/SwitchTheme"
import { useContext } from "react"
import LanguageContext from "../../context/LanguageContext"

export default function Header() {
  const { language } = useContext(LanguageContext)
  return (
    <header
      className="main-header"
      aria-label={language ? "En tête principale" : "Main header"}
    >
      <SwitchLang />
      <SwitchTheme />
    </header>
  )
}
