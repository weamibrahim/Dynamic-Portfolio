import { Globe, Eye, Mail, MapPin } from 'lucide-react'
import { imgUrl } from '../../lib/utils'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export default function LivePreview({ formValues, onPublish, onDiscard, isPublishing }) {
  return (
    <div className="sticky top-24">
      <Card className="p-0 overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
          <h4 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">Live Preview</h4>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-error/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
          </div>
        </div>
        
        {/* Mock UI */}
        <div className={`rounded-b-xl overflow-hidden aspect-[3/4] relative transition-colors duration-500 flex flex-col ${
          formValues.theme === 'dark' ? 'bg-[#0f172a] text-slate-200' : 'bg-white text-slate-800'
        }`}>
          {/* Mock Nav */}
          <nav className={`h-8 w-full flex items-center justify-between px-3 border-b backdrop-blur-sm sticky top-0 z-10 ${
            formValues.theme === 'dark' ? 'bg-black/20 border-white/5' : 'bg-white/50 border-black/5'
          }`}>
            <span className="text-[7px] font-bold truncate max-w-[60px]">
              {formValues.portfolioTitle || 'Title'}
            </span>
            <div className="flex gap-2">
              <div className="w-6 h-1 bg-primary/40 rounded-full" />
              <div className="w-6 h-1 bg-outline-variant/30 rounded-full" />
            </div>
          </nav>

          {/* Mock Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {/* Hero */}
            <div className="space-y-2 pt-2">
              <div className="w-16 h-1 bg-primary/20 rounded mb-1" />
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <h5 className="text-[10px] font-bold leading-tight">
                    {formValues.heroHeadline || 'Headline'}
                  </h5>
                  <p className="text-[6px] opacity-60 leading-relaxed line-clamp-2">
                    {formValues.heroSubtitle || 'Subtitle...'}
                  </p>
                </div>
                <div className={`w-16 aspect-video rounded-md flex-shrink-0 ${formValues.heroImage ? 'bg-primary/20' : 'bg-outline-variant/10'} flex items-center justify-center`}>
                  {formValues.heroImage ? (
                     <div className="w-full h-full bg-cover bg-center rounded-md opacity-60" style={{ backgroundImage: `url(${imgUrl(formValues.heroImage)})` }} />
                  ) : (
                    <div className="w-full h-full flex flex-col gap-0.5 p-1">
                       <div className="w-full h-0.5 bg-on-surface/10 rounded" />
                       <div className="w-3/4 h-0.5 bg-on-surface/10 rounded" />
                       <div className="w-1/2 h-0.5 bg-on-surface/10 rounded" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-1.5 pt-1">
                <div className="w-10 h-3 bg-primary rounded-full" />
                {formValues.sectionVisibility?.showContact && (
                  <div className="w-10 h-3 border border-outline-variant/30 rounded-full" />
                )}
              </div>
            </div>

            {/* Work Grid Mock */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-[7px] font-bold uppercase">Selected Work</div>
                <div className="flex-1 h-px bg-outline-variant/10" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map(i => (
                  <div key={i} className={`rounded-lg p-1.5 border ${
                    formValues.theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'
                  }`}>
                    <div className="aspect-video bg-primary/10 rounded mb-1.5" />
                    <div className="w-3/4 h-1 bg-on-surface/40 rounded mb-1" />
                    <div className="w-1/2 h-0.5 bg-on-surface/20 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Mock */}
            {formValues.sectionVisibility?.showStack && (
              <div className="space-y-2">
                <div className="text-[7px] font-bold uppercase text-center">Core Stack</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(formValues.stack?.length > 0 ? formValues.stack : [{icon: '⚛️'}, {icon: '🟩'}, {icon: '📘'}, {icon: '🐘'}]).slice(0, 8).map((item, i) => (
                    <div key={i} className={`aspect-square rounded flex flex-col items-center justify-center gap-0.5 ${
                      formValues.theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'
                    }`}>
                      <span className="text-[8px]">{item.icon || '⚡'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Mock */}
            {formValues.sectionVisibility?.showContact && (
              <div className="space-y-2 pt-2 border-t border-outline-variant/10">
                <div className="text-[9px] font-bold">Get In Touch</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[6px] opacity-60">
                    <Mail size={6} className="text-primary" />
                    {formValues.contactEmail || 'email@...'}
                  </div>
                  <div className="flex items-center gap-1.5 text-[6px] opacity-60">
                    <MapPin size={6} className="text-primary" />
                    {formValues.contactLocation || 'Location...'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-3">
          <Button
            type="button"
            className="w-full"
            onClick={onPublish}
            disabled={isPublishing}
          >
            <Globe size={14} />
            {isPublishing ? 'Publishing…' : 'Publish Live'}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            className="w-full" 
            onClick={() => window.open('/portfolio', '_blank')}
          >
            <Eye size={14} />
            View Live Portfolio
          </Button>
          <Button type="button" variant="ghost" className="w-full" onClick={onDiscard}>
            Discard Changes
          </Button>
        </div>
      </Card>

      {/* Info tip */}
      <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-3">
        <Globe size={16} className="text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-on-surface/80 leading-relaxed">
          Changes are applied instantly to your preview, but won't be visible to the public until you hit{' '}
          <span className="font-bold text-primary">Publish Live</span>.
        </p>
      </div>
    </div>
  )
}
