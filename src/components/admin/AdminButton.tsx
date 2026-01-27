import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { cn } from '@/lib/utils';

interface AdminButtonProps {
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export default function AdminButton({
  onClick,
  children,
  icon,
  variant = 'outline',
  size = 'sm',
  className,
}: AdminButtonProps) {
  const { isAdmin } = useAdmin();

  if (!isAdmin) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        className={cn(
          'border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground',
          className
        )}
      >
        {icon}
        {children}
      </Button>
    </motion.div>
  );
}
