import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSettings } from '../hooks/useSettings'
import { useUpdateSettings } from '../hooks/useUpdateSettings'
import { usePublishPortfolio } from '../../Portfolio/hooks/usePublishPortfolio'
import { useUIStore } from '../../store/uiStore'
import { useThemeStore } from '../../store/themeStore'
import { Button } from '../../components/ui/Button'
import { PortfolioSettings, SectionVisibility } from '../types'

// Modular Components & Constants
import { DEFAULT_SETTINGS } from '../constants'
import AppearanceSettings from '../components/AppearanceSettings'
import BrandIdentitySettings from '../components/BrandIdentitySettings'
import ContactSettings from '../components/ContactSettings'
import VisibilitySettings from '../components/VisibilitySettings'
import TechStackSettings from '../components/TechStackSettings'
import LivePreview from '../components/LivePreview'
import SettingsSkeleton from '../components/SettingsSkeleton'

export default function SettingsPage() {
  const { addToast } = useUIStore()
  const { setTheme, setAccentColor } = useThemeStore()
  const { data: settings, isLoading } = useSettings()
  const updateSettings = useUpdateSettings()
  const publishPortfolio = usePublishPortfolio()
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null)

  const { watch, setValue, handleSubmit, reset, control, register } = useForm<PortfolioSettings>({
    defaultValues: DEFAULT_SETTINGS,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stack',
  })

  useEffect(() => {
    if (settings) reset(settings)
  }, [settings, reset])

  const formValues = watch()

  useEffect(() => {
    setTheme(formValues.theme)
    setAccentColor(formValues.accentColor)
  }, [formValues.theme, formValues.accentColor, setTheme, setAccentColor])

  const prepareFormData = (data: PortfolioSettings) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'sectionVisibility' || key === 'stack') {
        formData.append(key, JSON.stringify(value))
      } else if (key !== 'heroImage') {
        formData.append(key, value as string)
      }
    })
    if (heroImageFile) {
      formData.append('heroImage', heroImageFile)
    }
    return formData
  }

  const onSubmit = async (data: PortfolioSettings) => {
    try {
      const formData = prepareFormData(data)
      await updateSettings.mutateAsync(formData)
      setHeroImageFile(null)
    } catch {
      // Handled in hook
    }
  }

  const handlePublish = async () => {
    try {
      const currentData = watch()
      const formData = prepareFormData(currentData)
      await updateSettings.mutateAsync(formData)
      await publishPortfolio.mutateAsync()
      setHeroImageFile(null)
    } catch {
      // Handled in hook
    }
  }

  const handleVisibilityToggle = (key: keyof SectionVisibility) => {
    const currentVal = formValues.sectionVisibility?.[key] ?? false
    setValue(`sectionVisibility.${key}`, !currentVal, { shouldDirty: true })
  }

  if (isLoading) return <SettingsSkeleton />

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Appearance & Theme</h1>
        <p className="text-on-surface-variant mt-1">Tailor your portfolio's visual identity to match your brand's unique aesthetic.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column — controls */}
          <div className="lg:col-span-7 space-y-6">
            <AppearanceSettings 
              theme={formValues.theme}
              accentColor={formValues.accentColor}
              onSetTheme={(m: any) => setValue('theme', m)}
              onSetAccentColor={(c: any) => setValue('accentColor', c)}
            />

            <BrandIdentitySettings 
              register={register} 
              onImageChange={setHeroImageFile}
              currentImage={formValues.heroImage}
            />

            <ContactSettings register={register} />

            <VisibilitySettings 
              visibility={formValues.sectionVisibility}
              onToggle={handleVisibilityToggle}
            />

            <TechStackSettings 
              fields={fields}
              register={register}
              watch={watch}
              append={append}
              remove={remove}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={updateSettings.isPending}>
                {updateSettings.isPending ? 'Saving…' : 'Save Settings'}
              </Button>
            </div>
          </div>

          {/* Right column — live preview */}
          <div className="lg:col-span-5">
            <LivePreview 
              formValues={formValues}
              onPublish={handlePublish}
              onDiscard={() => reset(settings)}
              isPublishing={publishPortfolio.isPending}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
