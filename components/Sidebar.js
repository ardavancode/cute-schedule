'use client';

import { X, Timer, FileText, Calendar, Settings, Home, BookOpen, Briefcase } from 'lucide-react';

export default function Sidebar({ isOpen, onClose, tools }) {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BookOpen, label: 'Idea Book' },
    { icon: Briefcase, label: 'Work Desk' },
  ];

  const toolItems = [
    { icon: Timer, label: 'Timer' },
    { icon: FileText, label: 'Notes' },
    { icon: Calendar, label: 'Calendar' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <span className="font-semibold text-gray-800">Menu</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1 mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Main
            </h3>
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                  item.active 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Tools
            </h3>
            {toolItems.map((tool) => (
              <button
                key={tool.label}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 text-gray-700"
              >
                <tool.icon className="w-5 h-5" />
                <span>{tool.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 text-gray-700">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}