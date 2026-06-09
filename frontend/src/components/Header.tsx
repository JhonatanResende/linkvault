import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="logo">
          🔐 LinkVault
        </Link>

        {/* Navegação */}
        <nav className="nav">
          <Link to="/" className="nav-link">Links</Link>
          <Link to="/categories" className="nav-link">Categorias</Link>
          <Link to="/add" className="nav-btn">+ Novo Link</Link>
        </nav>
      </div>
    </header>
  )
}