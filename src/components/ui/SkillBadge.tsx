import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  className?: string;
  variant?: 'default' | 'outline' | 'accent';
}

export default function SkillBadge({ name, className, variant = 'default' }: SkillBadgeProps) {
  const variants = {
    default: 'bg-secondary text-secondary-foreground',
    outline: 'border border-border bg-transparent text-foreground',
    accent: 'bg-accent/10 text-accent border border-accent/20',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors',
        variants[variant],
        className
      )}
    >
      {name}
    </motion.span>
  );
}
