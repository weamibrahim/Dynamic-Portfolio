import { Mail } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'

export default function ContactSettings({ register }) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <Mail size={16} className="text-primary" />
        <h3 className="font-headline text-lg font-semibold">Contact Info</h3>
      </div>
      <div className="space-y-4">
        <Input
          label="Contact Email"
          placeholder="hello@digitalcurator.dev"
          {...register('contactEmail')}
        />
        <Input
          label="Location"
          placeholder="San Francisco, CA • Remote"
          {...register('contactLocation')}
        />
      </div>
    </Card>
  )
}
