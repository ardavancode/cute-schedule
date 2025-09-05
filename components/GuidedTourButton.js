'use client';

import { HelpCircle } from 'lucide-react';

export default function GuidedTourButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center text-white transition-colors"
      title="Start Tour"
    >
      <HelpCircle className="w-5 h-5" />
    </button>
  );
}