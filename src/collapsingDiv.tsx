import { useId, useState, type ReactNode } from 'react'
import './collapsingDiv.css'

type CollapsingDivProps = {
  title: string
  children: ReactNode
}

function CollapsingDiv({ title, children }: CollapsingDivProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const contentId = useId()

  return (
    <section className="collapsing-div">
      <button
        className="collapsing-div__toggle"
        type="button"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={() => setIsExpanded(expanded => !expanded)}
      >
        <span>{title}</span>
        <svg
          className="collapsing-div__arrow"
          aria-hidden="true"
          viewBox="0 0 24 24"
          focusable="false"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className="collapsing-div__content" id={contentId} hidden={!isExpanded}>
        {children}
      </div>
    </section>
  )
}

export default CollapsingDiv