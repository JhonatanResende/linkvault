import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Essa página não existe no cofre! 🔐</p>
      <Link to="/" className="back-home">Voltar para o início</Link>
    </div>
  )
}