import { useState, useRef, useEffect } from 'react'
import { imgUrl } from '../../lib/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateProject } from '../hooks/useCreateProject'
import { useUpdateProject } from '../hooks/useUpdateProject'
import { useProject } from '../hooks/useProject'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../../components/ui/Button'
import { Input, Textarea } from '../../components/ui/Input'
import { TechTag } from '../../components/ui/Card'
import { Link2, GitFork, ImagePlus, Info, Eye, Layers } from 'lucide-react'
import { ProjectStatus } from '../types'

const schema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  liveUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  githubUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  status: z.enum(['draft', 'published', 'archived']),
})

type FormDataValues = z.infer<typeof schema>

function SectionHeader({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <h2 className="font-headline text-lg font-semibold">{title}</h2>
    </div>
  )
}

export default function AddProjectPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const { addToast } = useUIStore()

  const { data: existing } = useProject(id)
  const createMutation = useCreateProject()
  const updateMutation = useUpdateProject()

  const [techStack, setTechStack] = useState<string[]>([])
  const [techInput, setTechInput] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [screenshots, setScreenshots] = useState<File[]>([])
  const [publishImmediately, setPublishImmediately] = useState(false)
  const thumbRef = useRef<HTMLInputElement>(null)
  const screenshotsRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormDataValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      liveUrl: '',
      githubUrl: '',
      status: 'draft',
    },
  })

  // Populate form when data is loaded
  useEffect(() => {
    if (existing) {
      reset({
        title: existing.title || '',
        description: existing.description || '',
        liveUrl: existing.liveUrl || '',
        githubUrl: existing.githubUrl || '',
        status: (existing.status as ProjectStatus) || 'draft',
      })
      setTechStack(existing.techStack || [])
      if (existing.thumbnail) {
        setThumbnailPreview(imgUrl(existing.thumbnail))
      }
      setPublishImmediately(existing.status === 'published')
    }
  }, [existing, reset])

  const addTech = () => {
    const t = techInput.trim()
    if (t && !techStack.includes(t)) setTechStack(s => [...s, t])
    setTechInput('')
  }

  const onSubmit: SubmitHandler<FormDataValues> = async (values) => {
    const fd = new FormData()
    // Type-safe iteration
    const entries = Object.entries(values) as [keyof FormDataValues, any][]
    entries.forEach(([k, v]) => {
      if (v != null) fd.append(k, v)
    })
    
    fd.append('techStack', JSON.stringify(techStack))
    fd.set('status', publishImmediately ? 'published' : 'draft')
    if (thumbnail) fd.append('thumbnail', thumbnail)
    screenshots.forEach(f => fd.append('screenshots', f))

    try {
      if (isEditing && id) {
        await updateMutation.mutateAsync({ id, formData: fd })
       
      } else {
        await createMutation.mutateAsync(fd)
       
      }
      navigate('/projects')
    } catch (err: any) {
      
    }
  }

  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setThumbnail(file)
    setThumbnailPreview(URL.createObjectURL(file))
  }

  const handleScreenshotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenshots(Array.from(e.target.files ?? []))
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold">{isEditing ? 'Edit Project' : 'Add New Project'}</h1>
        <p className="text-on-surface-variant mt-1">
          {isEditing ? 'Update your project details.' : 'Fill in the details below to add a new creation to your Digital Curator portfolio.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* General Information */}
        <div className="bg-surface-container-low rounded-xl p-8">
          <SectionHeader icon={<Info size={14} />} title="General Information" />
          <div className="space-y-5">
            <Input
              label="Project Title"
              placeholder="e.g. Quantum Analytics Dashboard"
              error={errors.title?.message}
              {...register('title')}
            />
            <Textarea
              label="Short Description"
              placeholder="Briefly explain the project's purpose and impact..."
              rows={4}
              error={errors.description?.message}
              {...register('description')}
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-surface-container-low rounded-xl p-8">
          <SectionHeader icon={<Layers size={14} />} title="Project Details" />
          <div className="space-y-5">
            {/* Tech stack */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Tech Stack</label>
              <div className="flex flex-wrap items-center gap-2 min-h-[3rem] bg-surface-container-lowest rounded-xl px-4 py-3 focus-within:ring-2 ring-primary/20">
                {techStack.map(t => (
                  <TechTag key={t} onRemove={() => setTechStack(s => s.filter(x => x !== t))}>{t}</TechTag>
                ))}
                <input
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  onKeyDown={e => { 
                    if (e.key === 'Enter') { e.preventDefault(); addTech() } 
                    if (e.key === ',') { e.preventDefault(); addTech() } 
                  }}
                  placeholder={techStack.length === 0 ? 'Add tech… (Enter to add)' : ''}
                  className="flex-1 min-w-24 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Live Demo URL"
                placeholder="https://example.com"
                icon={Link2}
                error={errors.liveUrl?.message}
                {...register('liveUrl')}
              />
              <Input
                label="GitHub Repository"
                placeholder="https://github.com/user/repo"
                icon={GitFork}
                error={errors.githubUrl?.message}
                {...register('githubUrl')}
              />
            </div>
          </div>
        </div>

        {/* Media Upload */}
        <div className="bg-surface-container-low rounded-xl p-8">
          <SectionHeader icon={<ImagePlus size={14} />} title="Media Upload" />
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {/* Drop zone */}
            <div className="sm:col-span-3">
              <button
                type="button"
                onClick={() => screenshotsRef.current?.click()}
                className="w-full h-44 border border-dashed border-outline-variant/40 rounded-xl flex flex-col items-center justify-center gap-3 text-on-surface-variant hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <ImagePlus size={20} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-on-surface">Drag and drop screenshots</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">PNG, JPG up to 10MB each. Suggested ratio 16:9.</p>
                </div>
              </button>
              <input ref={screenshotsRef} type="file" multiple accept="image/*" className="hidden" onChange={handleScreenshotsChange} />
              
              {/* Existing screenshots */}
              {isEditing && existing?.screenshots && existing.screenshots.length > 0 && (
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Existing Screenshots</p>
                  <div className="grid grid-cols-4 gap-2">
                    {existing.screenshots.map((s: string, i: number) => (
                      <div key={i} className="aspect-video rounded-lg overflow-hidden bg-surface-container relative group">
                        <img src={imgUrl(s)} className="w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <span className="text-[8px] text-white font-bold uppercase">Saved</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {screenshots.length > 0 && (
                <p className="text-xs text-secondary mt-2">{screenshots.length} new file(s) selected</p>
              )}
            </div>
            {/* Thumbnail */}
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider block mb-2">Preview Thumbnail</label>
              <button
                type="button"
                onClick={() => thumbRef.current?.click()}
                className="relative w-full aspect-video rounded-xl bg-surface-container overflow-hidden group border border-outline-variant/10 hover:border-primary/30 transition-colors"
              >
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} className="w-full h-full object-cover" alt="Thumbnail preview" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/30">
                    <ImagePlus size={28} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Change</span>
                </div>
              </button>
              <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={handleThumbChange} />
              <p className="text-[10px] text-on-surface-variant mt-1.5 text-center">This will be the cover image in the gallery.</p>
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-surface-container-low rounded-xl p-8">
          <SectionHeader icon={<Eye size={14} />} title="Visibility" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Publish immediately</p>
              <p className="text-xs text-on-surface-variant mt-0.5">Make your project public or keep it as a draft for now.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={publishImmediately}
              onClick={() => setPublishImmediately(v => !v)}
              className={`relative w-12 h-6 rounded-full transition-all duration-200 ${publishImmediately ? 'bg-primary' : 'bg-outline-variant/30'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${publishImmediately ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Divider line replacement — just spacing */}
        <div className="h-px bg-outline-variant/10" />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/projects')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  )
}
