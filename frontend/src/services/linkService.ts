import api from './api'
import type { Link, CreateLinkData } from '../types'

// Busca todos os links
export const fetchLinks = async (): Promise<Link[]> => {
  const response = await api.get('/links')
  return response.data
}

// Cria um novo link
export const createLink = async (data: CreateLinkData): Promise<Link> => {
  const response = await api.post('/links', data)
  return response.data
}

// Atualiza um link
export const updateLink = async (id: string, data: Partial<CreateLinkData> & { isFavorite?: boolean }): Promise<Link> => {
  const response = await api.put(`/links/${id}`, data)
  return response.data
}

// Deleta um link
export const deleteLink = async (id: string): Promise<void> => {
  await api.delete(`/links/${id}`)
}