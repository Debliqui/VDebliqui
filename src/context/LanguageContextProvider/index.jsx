import { useState } from "react"
import LanguageContext from "../LanguageContext"

export default function LanguageContextProvider({ children }) {
  const [language, setLanguage] = useState("fr")

  function SwitchLanguage(updateLanguage) {
    setLanguage(updateLanguage)
    document.documentElement.lang = updateLanguage
  }
  return (
    <LanguageContext.Provider value={{ language, SwitchLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
