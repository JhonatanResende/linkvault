import api from './api'
import type { Category, CreateCategoryData } from '../types'

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories/')
  return response.data
}

export const createCategory = async (data: CreateCategoryData): Promise<Category> => {
  const response = await api.post('/categories/', data)
  return response.data
}

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}/`)
}