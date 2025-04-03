import { useContext } from "react"
import LanguageContext from "./context/LanguageContext"
import traduction from "./traduction"

import Header from "./container/Header"

import "./App.scss"
import ThemeContextProvider from "./context/ThemeContextProvider"

function App() {
  const { language } = useContext(LanguageContext)
  return (
    <ThemeContextProvider>
      <Header />
      <main
        className="main-content"
        aria-label={language ? "Contenu principal" : "Main content"}
      >
        <h1>{traduction[language].title}</h1>
        <p>{traduction[language].statu}</p>
      </main>
    </ThemeContextProvider>
  )
}

export default App
