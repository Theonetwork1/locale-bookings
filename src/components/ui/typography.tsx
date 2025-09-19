import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

// Main Heading (Dashboard Titles)
export const H1: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h1 className={cn(
      "text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight",
      className
    )}>
      {children}
    </h1>
  );
};

// Section Headings
export const H2: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h2 className={cn(
      "text-lg sm:text-xl font-semibold text-[#1A1A1A] tracking-tight",
      className
    )}>
      {children}
    </h2>
  );
};

// Subsection Headings
export const H3: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h3 className={cn(
      "text-base sm:text-lg font-semibold text-[#1A1A1A]",
      className
    )}>
      {children}
    </h3>
  );
};

// Card Titles
export const H4: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h4 className={cn(
      "text-sm sm:text-base font-semibold text-[#1A1A1A]",
      className
    )}>
      {children}
    </h4>
  );
};

// Body Text
export const P: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <p className={cn(
      "text-sm sm:text-base text-[#374151] leading-relaxed",
      className
    )}>
      {children}
    </p>
  );
};

// Subtitle/Description Text
export const Subtitle: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <p className={cn(
      "text-sm sm:text-base text-[#64748B] leading-relaxed",
      className
    )}>
      {children}
    </p>
  );
};

// Small Text (Captions, Labels)
export const Small: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <span className={cn(
      "text-xs sm:text-sm text-[#64748B]",
      className
    )}>
      {children}
    </span>
  );
};

// Muted Text
export const Muted: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <span className={cn(
      "text-xs text-[#9CA3AF]",
      className
    )}>
      {children}
    </span>
  );
};

// Lead Text (Larger body text)
export const Lead: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <p className={cn(
      "text-base sm:text-lg text-[#374151] leading-relaxed",
      className
    )}>
      {children}
    </p>
  );
};

// Code Text
export const Code: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <code className={cn(
      "text-xs sm:text-sm bg-[#F3F4F6] text-[#1F2937] px-2 py-1 rounded font-mono",
      className
    )}>
      {children}
    </code>
  );
};

// Stats/Numbers
export const StatNumber: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <span className={cn(
      "text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight",
      className
    )}>
      {children}
    </span>
  );
};

// Status Text with Colors
interface StatusTextProps extends TypographyProps {
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export const StatusText: React.FC<StatusTextProps> = ({ 
  children, 
  className, 
  status = 'neutral' 
}) => {
  const statusColors = {
    success: 'text-[#10B981]',
    warning: 'text-[#F59E0B]',
    error: 'text-[#EF4444]',
    info: 'text-[#4B2AAD]',
    neutral: 'text-[#64748B]'
  };

  return (
    <span className={cn(
      "text-sm font-medium",
      statusColors[status],
      className
    )}>
      {children}
    </span>
  );
};
