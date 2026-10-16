import { useState, useEffect } from 'react'
import { fetchLinks } from '../services/linkService'
import { fetchCategories } from '../services/categoryService'
import type { Link, Category } from '../types'
import LinkCard from '../components/LinkCard'
import Spinner from '../components/Spinner'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import './Home.css'

export default function Home() {
  const [links, setLinks] = useState<Link[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [onlyFavorites, setOnlyFavorites] = useState(false)

  // Plugando o hook de toast!
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [linksData, categoriesData] = await Promise.all([
        fetchLinks(),
        fetchCategories(),
      ])
      setLinks(linksData)
      setCategories(categoriesData)
    } catch {
      showToast('Erro ao carregar dados. O servidor está ligado?', 'error')
    } finally {
      setLoading(false)
    }
  }

  const filteredLinks = links.filter(link => {
    const matchSearch =
      link.title.toLowerCase().includes(search.toLowerCase()) ||
      link.description?.toLowerCase().includes(search.toLowerCase()) ||
      link.tags.some(t => t.name.toLowerCase().includes(search.toLowerCase()))

    const matchCategory = !selectedCategory || link.category.id === selectedCategory
    const matchFavorite = !onlyFavorites || link.is_favorite

    return matchSearch && matchCategory && matchFavorite
  })

  const handleDelete = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id))
    showToast('Link deletado com sucesso!', 'success')
  }

  const handleUpdate = (updated: Link) => {
    setLinks(prev => prev.map(l => l.id === updated.id ? updated : l))
    showToast(
      updated.is_favorite ? '⭐ Adicionado aos favoritos!' : 'Removido dos favoritos',
      'info'
    )
  }

  if (loading) return <Spinner text="Carregando seus links..." />

  return (
    <div className="home">
      {/* Toast aparece quando visible = true */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      <div className="home-header">
        <div>
          <h1>Meus Links</h1>
          <p>
            {filteredLinks.length} link{filteredLinks.length !== 1 ? 's' : ''}{' '}
            encontrado{filteredLinks.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Buscar por título, descrição ou tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">Todas as categorias</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button
          className={`filter-btn ${onlyFavorites ? 'active' : ''}`}
          onClick={() => setOnlyFavorites(prev => !prev)}
        >
          ★ Favoritos
        </button>
      </div>

      {filteredLinks.length === 0 ? (
        <div className="empty">
          <p>Nenhum link encontrado 😕</p>
          <p>Tente mudar os filtros ou adicionar novos links!</p>
        </div>
      ) : (
        <div className="links-grid">
          {filteredLinks.map(link => (
            <LinkCard
              key={link.id}
              link={link}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}