import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

const variants = {
  primary: 'gradient-primary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 glow-primary-hover transition-all duration-200',
  secondary: 'bg-transparent border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-200',
  tertiary: 'bg-transparent text-primary font-semibold uppercase tracking-wider text-sm hover:text-primary-fixed transition-colors duration-200',
  ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-200',
  destructive: 'bg-error/10 text-error border border-error/20 hover:bg-error/20 transition-all duration-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-full',
  lg: 'px-7 py-3 text-base rounded-full',
  icon: 'p-2 rounded-xl',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children?: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
