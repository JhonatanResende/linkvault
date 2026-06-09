import { useState, useEffect } from 'react'
import { fetchCategories, createCategory, deleteCategory } from '../services/categoryService'
import type { Category } from '../types'
import './Categories.css'

// Cores predefinidas pra escolher
const PRESET_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899',
  '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#14b8a6', '#3b82f6',
]

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#6366f1')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await fetchCategories()
      setCategories(data)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!name.trim()) return

    try {
      setSaving(true)
      const newCategory = await createCategory({ name: name.trim(), color })
      setCategories(prev => [...prev, newCategory])
      setName('') // limpa o campo depois de salvar
    } catch {
      alert('Erro ao criar categoria.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deletar essa categoria? Os links vinculados a ela serão afetados.')) return

    try {
      await deleteCategory(id)
      setCategories(prev => prev.filter(c => c.id !== id))
    } catch {
      alert('Erro ao deletar. Verifique se não há links nessa categoria.')
    }
  }

  return (
    <div className="categories-page">
      <div className="categories-container">
        <h1>🏷️ Categorias</h1>
        <p>Organize seus links por categoria</p>

        {/* Formulário de criar categoria */}
        <div className="create-category-card">
          <h2>Nova Categoria</h2>

          <div className="create-form">
            <input
              type="text"
              placeholder="Nome da categoria..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              className="category-input"
            />

            {/* Seletor de cores */}
            <div className="color-picker">
              <span>Cor:</span>
              <div className="color-options">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c}
                    className={`color-dot ${color === c ? 'selected' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                    title={c}
                  />
                ))}
              </div>

              {/* Preview de como vai ficar */}
              <span
                className="color-preview"
                style={{ backgroundColor: color + '33', color }}
              >
                {name || 'Preview'}
              </span>
            </div>

            <button
              className="btn-create"
              onClick={handleCreate}
              disabled={saving || !name.trim()}
            >
              {saving ? 'Criando...' : '+ Criar Categoria'}
            </button>
          </div>
        </div>

        {/* Lista de categorias existentes */}
        <div className="categories-list">
          <h2>Categorias existentes ({categories.length})</h2>

          {loading ? (
            <p className="loading-text">Carregando...</p>
          ) : categories.length === 0 ? (
            <p className="empty-text">Nenhuma categoria ainda. Crie a primeira! 👆</p>
          ) : (
            <div className="categories-grid">
              {categories.map(cat => (
                <div key={cat.id} className="category-item">
                  <div className="category-info">
                    <div
                      className="category-dot"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span
                      className="category-name"
                      style={{ color: cat.color }}
                    >
                      {cat.name}
                    </span>
                  </div>
                  <button
                    className="delete-cat-btn"
                    onClick={() => handleDelete(cat.id)}
                    title="Deletar categoria"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}