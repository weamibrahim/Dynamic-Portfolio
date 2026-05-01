export type ProjectStatus = 'draft' | 'published' | 'archived'

export interface Project {
  _id: string
  title: string
  description: string

  status: ProjectStatus
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  thumbnail?: string
  screenshots?: string[]
  year?: number
  createdAt: string
  updatedAt: string
}

export interface ProjectFilters {
  page?: number
  limit?: number
  status?: string
  search?: string

}

export interface ProjectsResponse {
  projects: Project[]
  total: number
  pages: number
  currentPage: number
}
