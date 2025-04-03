import { useContext } from "react"
import LanguageContext from "./context/LanguageContext"
import traduction from "./traduction"

import "./App.scss"
import SwitchLang from "./components/SwitchLang"
import ThemeContextProvider from "./context/ThemeContextProvider"
import SwitchTheme from "./components/SwitchTheme"

function App() {
  const { language } = useContext(LanguageContext)
  return (
    <ThemeContextProvider>
      <SwitchLang />
      <SwitchTheme />
      <h1>{traduction[language].title}</h1>
      <p>{traduction[language].statu}</p>
    </ThemeContextProvider>
  )
}

export default App
