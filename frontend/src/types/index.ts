export interface Tag {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
  color: string
  created_at: string
}

export interface Link {
  id: string
  title: string
  url: string
  description?: string
  is_favorite: boolean
  created_at: string
  updated_at: string
  category: Category
  tags: Tag[]
}

export interface CreateLinkData {
  title: string
  url: string
  description?: string
  category_id: string
  tag_names: string[]
}

export interface CreateCategoryData {
  name: string
  color: string
}