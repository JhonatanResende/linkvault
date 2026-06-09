import { useState } from 'react'
import type { Link } from '../types'
import { deleteLink, updateLink } from '../services/linkService'
import './LinkCard.css'

interface LinkCardProps {
  link: Link
  onDelete: (id: string) => void
  onUpdate: (link: Link) => void
}

export default function LinkCard({ link, onDelete, onUpdate }: LinkCardProps) {
  const [confirming, setConfirming] = useState(false)

  const handleFavorite = async () => {
    const updated = await updateLink(link.id, { isFavorite: !link.isFavorite })
    onUpdate(updated)
  }

  const handleDelete = async () => {
    try {
      await deleteLink(link.id)
      onDelete(link.id)
    } catch {
      alert('Erro ao deletar o link.')
    }
  }

  return (
    <div className="link-card">
      <div className="card-header">
        <span
          className="category-badge"
          style={{ backgroundColor: link.category.color + '33', color: link.category.color }}
        >
          {link.category.name}
        </span>

        <button
          className={`favorite-btn ${link.isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
          title={link.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {link.isFavorite ? '★' : '☆'}
        </button>
      </div>

      <a href={link.url} target="_blank" rel="noopener noreferrer" className="card-title">
        {link.title}
      </a>

      {link.description && (
        <p className="card-description">{link.description}</p>
      )}

      <p className="card-url">{link.url}</p>

      {link.tags.length > 0 && (
        <div className="card-tags">
          {link.tags.map(tag => (
            <span key={tag.id} className="tag">#{tag.name}</span>
          ))}
        </div>
      )}

      <div className="card-footer">
        <span className="card-date">
          {new Date(link.createdAt).toLocaleDateString('pt-BR')}
        </span>

        {/* Se está confirmando, mostra os botões de confirmar/cancelar */}
        {confirming ? (
          <div className="confirm-delete">
            <span>Tem certeza?</span>
            <button className="btn-yes" onClick={handleDelete}>Sim</button>
            <button className="btn-no" onClick={() => setConfirming(false)}>Não</button>
          </div>
        ) : (
          <button className="delete-btn" onClick={() => setConfirming(true)}>
            🗑️ Deletar
          </button>
        )}
      </div>
    </div>
  )
}