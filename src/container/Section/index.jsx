import "./index.scss"

export default function Section({ title, children, background }) {
  return (
    <section
      className="section-container"
      aria-label={`Section ${title}`}
      style={{ backgroundColor: background }}
    >
      <h2 className="section-container__title" aria-labelledby={title}>
        {title}
      </h2>
      <hr className="separator" aria-hidden />
      {children}
    </section>
  )
}
