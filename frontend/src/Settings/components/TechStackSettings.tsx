import { Cpu, Plus, Trash2 } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input, Select } from '../../components/ui/Input'
import { STACK_ICON_OPTS } from '../constants'

export default function TechStackSettings({ fields, register, watch, append, remove }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-primary" />
          <h3 className="font-headline text-lg font-semibold">Core Tech Stack</h3>
        </div>
        <Button 
          type="button" 
          variant="secondary" 
          size="sm" 
          onClick={() => append({ name: '', icon: 'react' })}
          className="h-8 px-3 text-xs"
        >
          <Plus size={14} />
          Add Tech
        </Button>
      </div>
      
      <div className="space-y-4">
        {fields.length === 0 && (
          <p className="text-xs text-on-surface-variant/50 text-center py-4 border-2 border-dashed border-outline-variant/10 rounded-xl">
            No tech items added yet. Click "Add Tech" to start.
          </p>
        )}
        {fields.map((field, index) => {
          const iconSlug = watch(`stack.${index}.icon`) || 'react';
          return (
            <div key={field.id} className="flex gap-3 items-end group animate-fade-in">
              <div className="flex flex-col gap-1.5">
                {index === 0 && <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Icon</label>}
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/10 p-2.5">
                  <img 
                    src={(() => {
                      const logoMap = {
                        'react': 'logos:react',
                        'nextdotjs': 'logos:nextjs-icon',
                        'nodedotjs': 'logos:nodejs-icon',
                        'typescript': 'logos:typescript-icon',
                        'javascript': 'logos:javascript',
                        'postgresql': 'logos:postgresql',
                        'mongodb': 'logos:mongodb-icon',
                        'amazonaws': 'logos:aws',
                        'python': 'logos:python',
                        'graphql': 'logos:graphql',
                        'tailwindcss': 'logos:tailwindcss-icon',
                        'docker': 'logos:docker-icon',
                        'figma': 'logos:figma',
                        'adobe-xd': 'logos:adobe-xd',
                        'slack': 'logos:slack-icon',
                        'github': 'logos:github-icon',
                        'framer': 'logos:framer',
                        'sketch': 'logos:sketch',
                        'notion': 'logos:notion-icon',
                        'jira': 'logos:jira',
                        'trello': 'logos:trello',
                      };
                      const iconId = logoMap[iconSlug] || `simple-icons:${iconSlug}`;
                      return `https://api.iconify.design/${iconId}.svg`;
                    })()} 
                    alt={iconSlug}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="w-32">
                <Select
                  label={index === 0 ? "Choose Icon" : ""}
                  {...register(`stack.${index}.icon`)}
                >
                {STACK_ICON_OPTS.map(opt => (
                  <option key={opt.val} value={opt.val}>{opt.val} {opt.label}</option>
                ))}
              </Select>
            </div>
            <div className="flex-1">
              <Input
                label={index === 0 ? "Language / Tool" : ""}
                placeholder="e.g. React"
                {...register(`stack.${index}.name`)}
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="mb-2.5 p-2 text-on-surface-variant hover:text-error transition-colors"
            >
              <Trash2 size={16} />
            </button>
            </div>
          );
        })}
      </div>
    </Card>
  )
}
