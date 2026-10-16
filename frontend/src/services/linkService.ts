import api from './api'
import type { Link, CreateLinkData } from '../types'

export const fetchLinks = async (): Promise<Link[]> => {
  const response = await api.get('/links/')
  return response.data
}

export const createLink = async (data: CreateLinkData): Promise<Link> => {
  const response = await api.post('/links/', data)
  return response.data
}

export const updateLink = async (
  id: string,
  data: Partial<CreateLinkData> & { is_favorite?: boolean }
): Promise<Link> => {
  const response = await api.put(`/links/${id}/`, data)
  return response.data
}

export const deleteLink = async (id: string): Promise<void> => {
  await api.delete(`/links/${id}/`)
}