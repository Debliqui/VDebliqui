import ThemeContext from "../../context/ThemeContext"
import LanguageContext from "../../context/LanguageContext"
import { useContext } from "react"
import traduction from "../../traduction"

import BgDark from "../../assets/background-dark.webp"
import BgLight from "../../assets/background-light.webp"
import ProfilePicture from "../../assets/profile-picture.webp"
import "./index.scss"
import LinkButton from "../LinkedinButton"

export default function Banner() {
  const { theme } = useContext(ThemeContext)
  const { language } = useContext(LanguageContext)
  return (
    <>
      <section className="banner" aria-label="Introduction">
        <header
          className="banner__header"
          aria-label={language ? "Information profile" : "Profile information"}
        >
          <h1 className="banner__header__title" itemProp="name">
            {traduction[language].title}
          </h1>
          <h2 className="banner__header__job" itemh2rop="jobTitle">
            {traduction[language].job}
          </h2>
          <p className="banner__header__location" itemProp="address">
            {traduction[language].location}
          </p>
          <LinkButton title="Linkedin" statu={traduction[language].statu} />
        </header>
        <div className="banner__middle">
          <div
            className="banner__middle__profilePicture"
            aria-hidden
            itemProp="image"
          >
            <img
              src={ProfilePicture}
              alt=""
              className="banner__middle__profilePicture__picture"
            />
          </div>
          <button
            className="banner__middle__contactBtn"
            aria-label={
              language ? "Ouvrir le formulaire de contact" : "Open contact form"
            }
          >
            {language ? "S'abonner +" : "Subscribe +"}
          </button>
        </div>
        <div className="banner__backgroundImg" aria-hidden>
          <img
            src={theme === "dark" ? BgDark : BgLight}
            alt=""
            className="banner__backgroundImg__src"
          />
        </div>
      </section>
    </>
  )
}
