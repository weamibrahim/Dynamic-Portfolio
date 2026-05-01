import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, icon: Icon, ...props }, ref) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">{label}</label>}
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />}
      <input
        ref={ref}
        className={cn(
          'w-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 text-sm py-3 px-4 rounded-xl outline-none transition-all duration-200',
          'focus:ring-2 focus:ring-primary/20 focus:bg-surface-container',
          Icon && 'pl-10',
          error && 'ring-2 ring-error/30',
          className
        )}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
));
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, error, ...props }, ref) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">{label}</label>}
    <textarea
      ref={ref}
      className={cn(
        'w-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 text-sm py-3 px-4 rounded-xl outline-none transition-all duration-200 resize-none',
        'focus:ring-2 focus:ring-primary/20 focus:bg-surface-container',
        error && 'ring-2 ring-error/30',
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
));
Textarea.displayName = 'Textarea';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, label, error, children, ...props }, ref) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">{label}</label>}
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'w-full bg-surface-container-lowest text-on-surface text-sm py-3 px-4 rounded-xl outline-none transition-all duration-200 appearance-none cursor-pointer',
          'focus:ring-2 focus:ring-primary/20 focus:bg-surface-container',
          error && 'ring-2 ring-error/30',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
));
Select.displayName = 'Select';
