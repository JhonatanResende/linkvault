export interface Tag {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
  color: string
  createdAt: string
}

export interface Link {
  id: string
  title: string
  url: string
  description?: string
  isFavorite: boolean
  createdAt: string
  updatedAt: string
  categoryId: string
  category: Category
  tags: Tag[]
}

export interface CreateLinkData {
  title: string
  url: string
  description?: string
  categoryId: string
  tags: string[]
}

export interface CreateCategoryData {
  name: string
  color: string
}