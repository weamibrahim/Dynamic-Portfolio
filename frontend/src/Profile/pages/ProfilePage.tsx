import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../store/authStore'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import { useUIStore } from '../../store/uiStore'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input, Textarea } from '../../components/ui/Input'
import { User, Mail, Lock, MapPin, AlignLeft, Camera } from 'lucide-react'

interface ProfileFormData {
  name: string
  email: string
  password?: string
  bio: string
  location: string
  avatar: string
}

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore()
  const { addToast } = useUIStore()
  const updateProfile = useUpdateProfile()

  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      bio: user?.bio || '',
      location: user?.location || '',
      avatar: user?.avatar || ''
    }
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        location: user.location || '',
        avatar: user.avatar || '',
        password: ''
      })
    }
  }, [user, reset])

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Only send password if it's not empty
      const payload: any = { ...data }
      if (!payload.password) delete payload.password

      await updateProfile.mutateAsync(payload)
    } catch {
      // Error handled in hook
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Your Profile</h1>
        <p className="text-on-surface-variant mt-1">Manage your account details and professional identity.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <User size={16} className="text-primary" />
            <h3 className="font-headline text-lg font-semibold">Account Information</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary text-2xl font-bold relative overflow-hidden group">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{user?.name?.charAt(0).toUpperCase()}</span>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={20} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <Input 
                  label="Avatar URL" 
                  placeholder="https://example.com/avatar.jpg"
                  {...register('avatar')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                icon={User}
                {...register('name', { required: true })}
              />
              <Input
                label="Email Address"
                placeholder="john@example.com"
                icon={Mail}
                {...register('email', { required: true })}
              />
            </div>

            <Input
              label="New Password"
              type="password"
              placeholder="Leave blank to keep current"
              icon={Lock}
              {...register('password')}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-6">
            <AlignLeft size={16} className="text-primary" />
            <h3 className="font-headline text-lg font-semibold">Professional Details</h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Location"
              placeholder="San Francisco, CA"
              icon={MapPin}
              {...register('location')}
            />
            <Textarea
              label="Short Bio"
              rows={4}
              placeholder="Tell people about yourself..."
              {...register('bio')}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Updating...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
