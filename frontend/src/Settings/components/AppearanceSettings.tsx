import { Palette, Check } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { ACCENT_COLORS } from '../constants'
import { Theme, AccentColor } from '../types'

interface AppearanceSettingsProps {
  theme: 'light' | 'dark';
  accentColor: string;
  onSetTheme: (theme: 'light' | 'dark') => void;
  onSetAccentColor: (color: string) => void;
}

export default function AppearanceSettings({ theme, accentColor, onSetTheme, onSetAccentColor }: AppearanceSettingsProps) {
  return (
    <>
      {/* Mode Preference */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Palette size={16} className="text-primary" />
          <h3 className="font-headline text-lg font-semibold">Mode Preference</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {['dark', 'light'].map(mode => (
            <button
              key={mode}
              type="button"
              onClick={() => onSetTheme(mode as 'light' | 'dark')}
              className={`rounded-xl p-4 border-2 transition-all duration-200 text-left ${
                theme === mode
                  ? 'border-primary bg-primary/5'
                  : 'border-outline-variant/20 hover:border-outline-variant/50'
              }`}
            >
              <div className={`w-full h-24 rounded-lg mb-3 overflow-hidden ${mode === 'dark' ? 'bg-[#060e20]' : 'bg-slate-100'}`}>
                <div className="p-2 space-y-1.5">
                  <div className={`h-2 w-16 rounded-full ${mode === 'dark' ? 'bg-indigo-400/60' : 'bg-indigo-500/60'}`} />
                  <div className={`h-1.5 w-24 rounded-full ${mode === 'dark' ? 'bg-white/20' : 'bg-gray-400/40'}`} />
                  <div className={`h-6 w-full rounded-lg ${mode === 'dark' ? 'bg-white/10' : 'bg-white/80'}`} />
                  <div className="flex gap-1">
                    <div className={`h-8 w-1/2 rounded-lg ${mode === 'dark' ? 'bg-white/5' : 'bg-gray-200/80'}`} />
                    <div className={`h-8 w-1/2 rounded-lg ${mode === 'dark' ? 'bg-white/5' : 'bg-gray-200/80'}`} />
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium capitalize">{mode} Mode</p>
              {theme === mode && (
                <span className="inline-flex items-center gap-1 text-xs text-primary mt-0.5"><Check size={11} /> Selected</span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Brand Accents */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Palette size={16} className="text-primary" />
          <h3 className="font-headline text-lg font-semibold">Brand Accents</h3>
        </div>
        <div className="flex gap-6">
          {ACCENT_COLORS.map(color => (
            <button
              key={color.value}
              type="button"
              onClick={() => onSetAccentColor(color.value)}
              className="flex flex-col items-center gap-3 group"
            >
              <div
                className="w-14 h-14 rounded-full relative flex items-center justify-center transition-transform duration-200 hover:scale-105"
                style={{ backgroundColor: color.hex }}
              >
                {accentColor === color.value && (
                  <Check size={22} className="text-white drop-shadow" />
                )}
              </div>
              <span className={`text-xs font-medium tracking-wide transition-colors ${
                accentColor === color.value ? 'text-on-surface' : 'text-on-surface-variant'
              }`}>{color.name}</span>
            </button>
          ))}
        </div>
      </Card>
    </>
  )
}
