import { useContext } from "react"
import LanguageContext from "./context/LanguageContext"
import Banner from "./components/Banner"

import Header from "./container/Header"

import "./App.scss"

function App() {
  const { language } = useContext(LanguageContext)

  return (
    <>
      <Header />
      <main
        className="main-content"
        aria-label={language ? "Contenu principal" : "Main content"}
        itemScope
        itemType="http://schema.org/Person"
      >
        <Banner />
      </main>
    </>
  )
}

export default App
