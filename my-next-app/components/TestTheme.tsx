"use client";

import ThemeToggle from './ui/ThemeToggle';

export default function TestTheme() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header with Theme Toggle */}
        <header className="flex justify-between items-center border-b border-border pb-4">
          <h1 className="text-3xl font-bold">تست تغییر تم</h1>
          <ThemeToggle />
        </header>

        {/* Sample Cards */}
        <div className="grid gap-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">کارت نمونه ۱</h2>
            <p className="text-muted-foreground">
              این یک کارت نمونه است که رنگ‌هایش با تغییر تم تغییر می‌کند.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3 text-secondary">کارت نمونه ۲</h2>
            <p className="text-muted-foreground">
              رنگ‌های این برنامه برای حالت روز: نارنجی و زرد، برای حالت شب: آبی و بنفش.
            </p>
            <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
              دکمه نمونه
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}