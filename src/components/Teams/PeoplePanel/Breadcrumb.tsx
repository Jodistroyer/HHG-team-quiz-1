import './Breadcrumb.css'

interface BreadcrumbProps {
  path: string[]
  onNavigate?: (index: number) => void
}

export function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  if (path.length === 0) return null

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {path.map((segment, i) => (
        <span key={i} className="breadcrumb__segment">
          {i > 0 && <span className="breadcrumb__sep"> / </span>}
          {onNavigate ? (
            <button
              type="button"
              className="breadcrumb__link"
              onClick={() => onNavigate(i)}
            >
              {segment}
            </button>
          ) : (
            <span className="breadcrumb__text">{segment}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
