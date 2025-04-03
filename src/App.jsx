import { useContext } from "react"
import LanguageContext from "./context/LanguageContext"
import Header from "./container/Header"
import Banner from "./components/Banner"

import Section from "./container/Section"

import "./App.scss"
import traduction from "./traduction"
import ThemeContext from "./context/ThemeContext"

function App() {
  const { language } = useContext(LanguageContext)
  const { theme } = useContext(ThemeContext)
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
        <Section
          title={traduction[language].section.about.title}
          background={
            theme === "dark" ? "var(--section-dark)" : "var(--section-light)"
          }
        >
          <p className="section-container__catchphrase">
            {traduction[language].section.about.catchphrase}
          </p>
          <ul
            className="section-container__listSpecialtie"
            aria-label={
              language ? "Liste des spécialités" : "List of specialties"
            }
          >
            {traduction[language].section.about.listSpecialties.map(
              (specialties, index) => (
                <li key={index}>{specialties}</li>
              )
            )}
          </ul>
        </Section>
      </main>
    </>
  )
}

export default App
