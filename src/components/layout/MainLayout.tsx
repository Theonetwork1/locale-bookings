import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100 dark:bg-black">
      <div
        className={`w-full max-w-md h-full min-h-screen bg-surface dark:bg-surface-dark shadow-2xl relative flex flex-col overflow-hidden ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export const Header: React.FC<{
  title?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}> = ({ title, onBack, rightAction }) => (
  <header className="sticky top-0 z-20 flex items-center bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md p-4 border-b border-gray-200/50 dark:border-gray-800/50">
    {onBack && (
      <button
        onClick={onBack}
        className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white"
      >
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
    )}
    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight flex-1 text-center px-4 truncate">
      {title}
    </h2>
    <div className="w-10 flex justify-end">{rightAction}</div>
  </header>
);
