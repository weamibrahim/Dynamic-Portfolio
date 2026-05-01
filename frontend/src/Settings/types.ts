export interface AccentColor {
  name: string
  value: string
  hex: string
}

export interface Theme {
  name: string
  value: string
}

export interface StackIconOption {
  label: string
  val: string
}

export interface TechStackItem {
  name: string
  icon: string
}

export interface SectionVisibility {
  showStack: boolean
  showContact: boolean
}

export interface PortfolioSettings {
  theme: 'light' | 'dark'
  accentColor: string
  sectionVisibility: SectionVisibility
  portfolioTitle: string
  role?: string
  heroHeadline: string
  heroSubtitle: string
  heroImage?: string
  stackSectionTitle?: string
  contactEmail: string
  contactLocation: string
  githubUrl: string
  linkedinUrl: string
  stack: TechStackItem[]
}
