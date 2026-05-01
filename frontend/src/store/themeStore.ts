import { create } from 'zustand'

interface ThemeState {
  theme: string
  accentColor: string
  setTheme: (theme: string) => void
  setAccentColor: (accentColor: string) => void
  syncSettings: (settings: { theme?: string; accentColor?: string } | null) => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: localStorage.getItem('portfolio-theme') || 'light',
  accentColor: localStorage.getItem('portfolio-accent') || 'indigo',
  
  setTheme: (theme) => {
    set({ theme })
    applyTheme(theme)
    localStorage.setItem('portfolio-theme', theme)
  },
  
  setAccentColor: (accentColor) => {
    set({ accentColor })
    applyAccent(accentColor)
    localStorage.setItem('portfolio-accent', accentColor)
  },

  // Sync with settings from backend
  syncSettings: (settings) => {
    if (!settings) return
    const { theme, accentColor } = settings
    const newTheme = theme || 'light'
    const newAccent = accentColor || 'indigo'
    
    set({ theme: newTheme, accentColor: newAccent })
    applyTheme(newTheme)
    applyAccent(newAccent)
    
    localStorage.setItem('portfolio-theme', newTheme)
    localStorage.setItem('portfolio-accent', newAccent)
  }
}))

// DOM Side effects
function applyTheme(theme: string) {
  const root = window.document.documentElement
  root.setAttribute('data-theme', theme)
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

function applyAccent(accent: string) {
  const root = window.document.documentElement
  root.setAttribute('data-accent', accent)
}
