import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusVariants = cva(
  "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
  {
    variants: {
      status: {
        active: "bg-success-light text-success border-success/20",
        pending: "bg-pending-light text-pending border-pending/20", 
        offline: "bg-muted text-muted-foreground border-border",
        closed: "bg-destructive-light text-destructive border-destructive/20",
      }
    },
    defaultVariants: {
      status: "active"
    }
  }
);

export interface StatusBadgeProps extends VariantProps<typeof statusVariants> {
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusVariants({ status }), className)}>
      {children}
    </span>
  );
}