
'use client';

import { Menu } from 'lucide-react';

export default function TopNavbar({ onMenuClick }) {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900">
          Cute Schedule
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Today's Goals
        </button>
        
        <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-medium">
          U
        </div>
      </div>
    </header>
  );
}