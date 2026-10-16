import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { createLink } from '../services/linkService'
import { fetchCategories } from '../services/categoryService'
import type { Category, CreateLinkData } from '../types'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import './AddLink.css'

export default function AddLink() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateLinkData>()

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const value = tagInput.trim().toLowerCase()
      if (value && !tags.includes(value)) {
        setTags(prev => [...prev, value])
      }
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag))
  }

    const onSubmit = async (data: CreateLinkData) => {
      try {
        setLoading(true)
        await createLink({
          title: data.title,
          url: data.url,
          description: data.description,
          category_id: data.category_id,
          tag_names: tags
        })
        showToast('Link salvo com sucesso! 🎉', 'success')
        setTimeout(() => navigate('/'), 1000)
      } catch {
        showToast('Erro ao salvar o link. Tente novamente.', 'error')
      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="add-link-page">

      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="form-container">
        <h1>➕ Novo Link</h1>
        <p>Salve um link no seu cofre pessoal</p>

        <form onSubmit={handleSubmit(onSubmit)} className="link-form">

          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              placeholder="Ex: Documentação do React"
              {...register('title', { required: 'Título é obrigatório' })}
            />
            {errors.title && (
              <span className="error">{errors.title.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>URL *</label>
            <input
              type="url"
              placeholder="https://..."
              {...register('url', {
                required: 'URL é obrigatória',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'URL inválida (precisa começar com http:// ou https://)'
                }
              })}
            />
            {errors.url && (
              <span className="error">{errors.url.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Descrição <span className="optional">(opcional)</span></label>
            <textarea
              placeholder="Do que se trata esse link?"
              rows={3}
              {...register('description')}
            />
          </div>

          <div className="form-group">
            <label>Categoria *</label>
            <select
              {...register('category_id', { required: 'Selecione uma categoria' })}
            >
              <option value="">Selecione uma categoria...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category_id && (
              <span className="error">{errors.category_id.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Tags <span className="optional">(opcional — aperte Enter pra adicionar)</span></label>

            {tags.length > 0 && (
              <div className="tags-preview">
                {tags.map(tag => (
                  <span key={tag} className="tag-chip">
                    #{tag}
                    <button type="button" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="Ex: react, frontend, estudo..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={loading}
            >
              {loading ? 'Salvando...' : '💾 Salvar Link'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}