import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

interface DashboardSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'card' | 'minimal';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface DashboardStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
    trend?: {
      value: string;
      isPositive: boolean;
    };
  }>;
  className?: string;
}

interface DashboardActionBarProps {
  children: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

// Main Layout Container
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "min-h-screen bg-[#F8FAFC]",
      className
    )}>
      {children}
    </div>
  );
};

// Header Component
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle, 
  actions,
  className 
}) => {
  return (
    <header className={cn(
      "bg-white shadow-sm border-b border-[#E5E7EB] sticky top-0 z-10",
      className
    )}>
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-[#64748B] mt-1 line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Section Component
export const DashboardSection: React.FC<DashboardSectionProps> = ({ 
  title, 
  children, 
  className,
  variant = 'default',
  padding = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  const sectionContent = (
    <>
      {title && (
        <h2 className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-3 sm:mb-4">
          {title}
        </h2>
      )}
      {children}
    </>
  );

  if (variant === 'card') {
    return (
      <Card className={cn(
        "bg-white border-[#E5E7EB] shadow-sm",
        className
      )}>
        <CardContent className={paddingClasses[padding]}>
          {sectionContent}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn(paddingClasses[padding], className)}>
        {sectionContent}
      </div>
    );
  }

  return (
    <section className={cn(
      "bg-white rounded-lg border border-[#E5E7EB] shadow-sm",
      paddingClasses[padding],
      className
    )}>
      {sectionContent}
    </section>
  );
};

// Stats Component
export const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  stats, 
  className 
}) => {
  return (
    <div className={cn(
      "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4",
      className
    )}>
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-3">
              {stat.icon && (
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  stat.color || "bg-[#4B2AAD]/10 text-[#4B2AAD]"
                )}>
                  {stat.icon}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-xl sm:text-2xl font-bold text-[#1A1A1A] truncate">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[#64748B] truncate">
                  {stat.label}
                </div>
                {stat.trend && (
                  <div className={cn(
                    "text-xs font-medium mt-1",
                    stat.trend.isPositive ? "text-[#10B981]" : "text-[#EF4444]"
                  )}>
                    {stat.trend.value}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Action Bar Component
export const DashboardActionBar: React.FC<DashboardActionBarProps> = ({ 
  children, 
  sticky = false,
  className 
}) => {
  return (
    <div className={cn(
      "bg-white border-t border-[#E5E7EB] px-4 sm:px-6 py-3 sm:py-4",
      sticky && "sticky bottom-0 z-10 shadow-lg",
      className
    )}>
      <div className="flex items-center justify-between gap-3">
        {children}
      </div>
    </div>
  );
};

// Quick Actions Grid
export const DashboardQuickActions: React.FC<{ 
  actions: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    disabled?: boolean;
  }>;
  className?: string;
}> = ({ actions, className }) => {
  return (
    <div className={cn(
      "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
      className
    )}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'outline'}
          onClick={action.onClick}
          disabled={action.disabled}
          className={cn(
            "h-12 flex-col gap-1 text-xs sm:text-sm",
            action.variant === 'primary' && "bg-[#4B2AAD] text-white hover:bg-[#3B1F8B]",
            action.variant === 'secondary' && "border-[#4B2AAD] text-[#4B2AAD] hover:bg-[#4B2AAD] hover:text-white"
          )}
        >
          {action.icon}
          <span className="truncate">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

// Content Container
export const DashboardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <main className={cn(
      "px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6",
      className
    )}>
      {children}
    </main>
  );
};

// Grid Layout Helper
export const DashboardGrid: React.FC<{ 
  children: React.ReactNode; 
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}> = ({ 
  children, 
  cols = 1,
  className 
}) => {
  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  return (
    <div className={cn(
      "grid gap-4 sm:gap-6",
      colsClasses[cols],
      className
    )}>
      {children}
    </div>
  );
};
