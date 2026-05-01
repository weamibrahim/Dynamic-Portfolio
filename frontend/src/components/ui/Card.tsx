import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

// Card
export function Card({ className, children, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-container-low rounded-xl p-6',
        hover && 'hover:bg-surface-variant hover:scale-[1.02] transition-all duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-6', className)}>{children}</div>;
}

export function CardTitle({ className, children }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('font-headline text-lg font-semibold text-on-surface', className)}>{children}</h3>;
}

export function CardContent({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)}>{children}</div>;
}

// Badge
const badgeVariants = {
  published: 'bg-secondary/10 text-secondary border border-secondary/20',
  draft: 'bg-tertiary/10 text-tertiary border border-tertiary/20',
  archived: 'bg-outline/20 text-on-surface-variant border border-outline/20',
  default: 'bg-primary/10 text-primary border border-primary/20',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider', badgeVariants[variant] || badgeVariants.default, className)}>
      {children}
    </span>
  );
}

// Tech tag (glassmorphism)
interface TechTagProps {
  children: ReactNode;
  onRemove?: () => void;
}

export function TechTag({ children, onRemove }: TechTagProps) {
  return (
    <span className="glass inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-on-surface border border-outline-variant/20">
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} className="text-on-surface-variant hover:text-error transition-colors ml-1">×</button>
      )}
    </span>
  );
}

// Switch
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function Switch({ checked, onChange, label, description }: SwitchProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
      <div className="flex-1">
        <p className="text-sm font-medium text-on-surface">{label}</p>
        {description && <p className="text-xs text-on-surface-variant mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-12 h-6 rounded-full transition-all duration-200 flex-shrink-0',
          checked ? 'bg-primary' : 'bg-outline-variant/30'
        )}
      >
        <span className={cn(
          'absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200',
          checked ? 'right-1' : 'left-1'
        )} />
      </button>
    </div>
  );
}

// Stat card
interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: number;
  trendUp?: boolean;
  live?: boolean;
}

export function StatCard({ icon, label, value, trend, trendUp, live }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary">
          {icon}
        </div>
        {trend !== undefined && (
          <span className={cn('text-xs font-semibold', trendUp ? 'text-secondary' : 'text-error')}>
            {trendUp ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
        {live && <span className="flex items-center gap-1.5 text-xs text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />LIVE</span>}
      </div>
      <div>
        <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">{label}</p>
        <p className="font-headline text-3xl font-bold text-on-surface">{value}</p>
      </div>
    </Card>
  );
}

// Divider replacement — just vertical spacing
interface SpacerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Spacer({ size = 'md' }: SpacerProps) {
  const sizes = { sm: 'h-4', md: 'h-6', lg: 'h-8', xl: 'h-12' };
  return <div className={sizes[size]} />;
}
