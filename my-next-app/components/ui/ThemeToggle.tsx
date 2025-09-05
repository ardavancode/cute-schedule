"use client";
import { useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setChecked(resolvedTheme === "dark"), [resolvedTheme]);

  const onChange = useCallback(
    (v: boolean) => {
      setChecked(v);
      setTheme(v ? "dark" : "light");
    },
    [setTheme],
  );

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Switch 
        checked={checked}
        onCheckedChange={onChange}
        className={cn(
          "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-orange-400",
          "focus-visible:ring-2 focus-visible:ring-offset-2",
          checked 
            ? "focus-visible:ring-blue-400" 
            : "focus-visible:ring-orange-400",
          "transition-all duration-300",
          checked 
            ? "shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40" 
            : "shadow-lg shadow-orange-400/25 hover:shadow-orange-400/40",
          "hover:scale-105 active:scale-95"
        )}
      />
      
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <SunIcon 
          size={20} 
          className={cn(
            "transition-all duration-300",
            !checked 
              ? "text-orange-500 scale-110 rotate-12" 
              : "text-gray-400 scale-90 rotate-0"
          )} 
        />
        <MoonIcon 
          size={20} 
          className={cn(
            "transition-all duration-300",
            checked 
              ? "text-blue-400 scale-110 -rotate-12" 
              : "text-gray-400 scale-90 rotate-0"
          )} 
        />
      </div>

      <span className={cn(
        "text-sm font-medium transition-colors duration-300",
        checked 
          ? "text-blue-600 dark:text-blue-400" 
          : "text-orange-600 dark:text-orange-400"
      )}>
        {checked ? "حالت شب" : "حالت روز"}
      </span>
    </div>
  );
}