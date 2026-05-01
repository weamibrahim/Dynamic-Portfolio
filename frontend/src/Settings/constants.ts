import { AccentColor, StackIconOption, PortfolioSettings } from './types'

export const ACCENT_COLORS: AccentColor[] = [
  { name: 'Indigo', value: 'indigo', hex: '#a3a6ff' },
  { name: 'Rose', value: 'rose', hex: '#ff6e84' },
  { name: 'Emerald', value: 'emerald', hex: '#69f6b8' },
  { name: 'Amber', value: 'amber', hex: '#ffb148' },
]

export const STACK_ICON_OPTS: StackIconOption[] = [
  // Development
  { label: 'React', val: 'react' },
  { label: 'Next.js', val: 'nextdotjs' },
  { label: 'Node.js', val: 'nodedotjs' },
  { label: 'JavaScript', val: 'javascript' },
  { label: 'TypeScript', val: 'typescript' },
  { label: 'PostgreSQL', val: 'postgresql' },
  { label: 'MongoDB', val: 'mongodb' },
  { label: 'AWS', val: 'amazonaws' },
  { label: 'Python', val: 'python' },
  { label: 'GraphQL', val: 'graphql' },
  { label: 'Tailwind CSS', val: 'tailwindcss' },
  { label: 'Docker', val: 'docker' },
  { label: 'Git', val: 'git' },
  { label: 'GitHub', val: 'github' },

  // More Dev
  { label: 'HTML5', val: 'html5' },
  { label: 'CSS3', val: 'css3' },
  { label: 'Sass', val: 'sass' },
  { label: 'Redux', val: 'redux' },
  { label: 'Express', val: 'express' },
  { label: 'Firebase', val: 'firebase' },
  { label: 'Vercel', val: 'vercel' },
  { label: 'Netlify', val: 'netlify' },
  { label: 'Linux', val: 'linux' },
  { label: 'Nginx', val: 'nginx' },
  { label: 'Webpack', val: 'webpack' },
  { label: 'Vite', val: 'vite' },
  { label: 'Babel', val: 'babel' },

  // Design
  { label: 'Figma', val: 'figma' },
  { label: 'Adobe Photoshop', val: 'adobephotoshop' },
  { label: 'Adobe Illustrator', val: 'adobeillustrator' },
  { label: 'Blender', val: 'blender' },
  { label: 'Three.js', val: 'threedotjs' },

  // More Design
  
  { label: 'Sketch', val: 'sketch' },
  { label: 'Canva', val: 'canva' },
  { label: 'Framer', val: 'framer' },
{ label: 'Maze', val: 'maze' },

  // Business / Tools
  { label: 'Google Analytics', val: 'googleanalytics' },
  { label: 'Jira', val: 'jira' },
 
  { label: 'Notion', val: 'notion' },
  { label: 'Trello', val: 'trello' },

  // More Tools
  { label: 'Zoom', val: 'zoom' },
  { label: 'Discord', val: 'discord' },
  { label: 'Microsoft Teams', val: 'microsoftteams' },
  { label: 'Postman', val: 'postman' },
  { label: 'Insomnia', val: 'insomnia' },
  { label: 'Stripe', val: 'stripe' },

  // Mobile / Other
  { label: 'React Native', val: 'reactnative' },
  { label: 'Flutter', val: 'flutter' },
  { label: 'Kotlin', val: 'kotlin' },
  { label: 'Swift', val: 'swift' },
  { label: 'Slack', val: 'slack' },
  { label: 'Adobe XD', val: 'adobe-xd' },
]

export const DEFAULT_STACK = [
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Next.js', icon: 'nextdotjs' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'Figma', icon: 'figma' },
]

export const DEFAULT_SETTINGS: PortfolioSettings = {
  theme: 'dark',
  accentColor: 'indigo',
  sectionVisibility: { showStack: true, showContact: false },
  portfolioTitle: 'My Portfolio',
  role: '',
  heroHeadline: 'Crafting Work That Speaks.',
  heroSubtitle: 'A curated portfolio of projects, creative work, and professional milestones — built to impress and designed to last.',
  stackSectionTitle: 'Skills & Tools',
  contactEmail: 'hello@portfolio.dev',
  contactLocation: 'Remote • Worldwide',
  githubUrl: '',
  linkedinUrl: '',
  stack: DEFAULT_STACK,
}
