import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.scss"
import App from "./App.jsx"
import ThemeContectProvider from "./context/ThemeContextProvider/index.jsx"
import LanguageContextProvider from "./context/LanguageContextProvider/index.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContectProvider>
      <LanguageContextProvider>
        <App />
      </LanguageContextProvider>
    </ThemeContectProvider>
  </StrictMode>
)
