"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // چک کردن تم فعلی از localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // اعمال تم به document
    document.documentElement.classList.toggle('dark', newTheme);
    
    // ذخیره تم در localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // تغییر CSS variables
    if (newTheme) {
      document.body.style.backgroundColor = '#0D1117';
      document.body.style.color = '#C9D1D9';
    } else {
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#111827';
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        fontSize: '18px'
      }}
      title={isDark ? 'تبدیل به حالت روز' : 'تبدیل به حالت شب'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}