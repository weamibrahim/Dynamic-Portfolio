import { Globe, Upload, Image as ImageIcon } from 'lucide-react'
import { imgUrl } from '../../lib/utils'
import { Card } from '../../components/ui/Card'
import { Input, Textarea } from '../../components/ui/Input'
import { UseFormRegister } from 'react-hook-form';
import { PortfolioSettings } from '../types';
import { useState } from 'react';

interface BrandIdentitySettingsProps {
  register: UseFormRegister<PortfolioSettings>;
  onImageChange: (file: File | null) => void;
  currentImage?: string;
}

export default function BrandIdentitySettings({ register, onImageChange, currentImage }: BrandIdentitySettingsProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageChange(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <Globe size={16} className="text-primary" />
        <h3 className="font-headline text-lg font-semibold">Brand Identity</h3>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Portfolio Title / Brand Name"
              placeholder="My Portfolio"
              {...register('portfolioTitle')}
            />
            <Input
              label="Your Role / Tagline"
              placeholder="e.g. UX Designer · Frontend Dev · Creative Agency"
              {...register('role')}
            />
            <Input
              label="Hero Headline"
              placeholder="Crafting Work That Speaks."
              {...register('heroHeadline')}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Hero Section Image</label>
            <div className="relative aspect-video rounded-xl bg-surface-container-high border-2 border-dashed border-outline-variant/30 overflow-hidden group">
              {(preview || currentImage) ? (
                <img 
                  src={preview || imgUrl(currentImage)} 
                  className="w-full h-full object-cover" 
                  alt="Hero Preview" 
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant/40">
                  <ImageIcon size={32} className="mb-2" />
                  <span className="text-[10px] font-bold">16:9 RECOMMENDED</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="cursor-pointer bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-md transition-all">
                  <Upload size={20} className="text-white" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
            </div>
            <p className="text-[10px] text-on-surface-variant italic">Replaces the decorative code block in the hero section.</p>
          </div>
        </div>

        <Textarea
          label="Hero Subtitle / Bio"
          rows={3}
          placeholder="A short description of your work, expertise, or what you offer..."
          {...register('heroSubtitle')}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="GitHub URL"
            placeholder="https://github.com/yourusername"
            {...register('githubUrl')}
          />
          <Input
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/yourusername"
            {...register('linkedinUrl')}
          />
        </div>
      </div>
    </Card>
  )
}
