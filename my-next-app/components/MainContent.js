'use client';

import { BookOpen, Briefcase, Plus } from 'lucide-react';

export default function MainContent({ ideas, workItems, onUpdateIdeas, onUpdateWorkItems }) {
  const addNewIdea = () => {
    const newIdea = {
      id: Date.now(),
      title: 'New Idea',
      date: new Date().toISOString().split('T')[0]
    };
    onUpdateIdeas([...ideas, newIdea]);
  };

  const addNewWorkItem = () => {
    const newWorkItem = {
      id: Date.now(),
      title: 'New Task',
      status: 'todo'
    };
    onUpdateWorkItems([...workItems, newWorkItem]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Cute Schedule
        </h1>
        <p className="text-gray-600">
          Organize your ideas and get work done
        </p>
      </div>

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Idea Book Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Idea Book</h2>
                <p className="text-gray-500 text-sm">Capture inspiration</p>
              </div>
            </div>
            <button
              onClick={addNewIdea}
              className="w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-lg flex items-center justify-center transition-colors"
            >
              <Plus className="w-5 h-5 text-pink-600" />
            </button>
          </div>

          <div className="space-y-3">
            {ideas.slice(0, 3).map((idea) => (
              <div key={idea.id} className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">{idea.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{idea.date}</p>
              </div>
            ))}
          </div>

          {ideas.length > 3 && (
            <div className="text-center mt-4">
              <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View all {ideas.length} ideas →
              </button>
            </div>
          )}
        </div>

        {/* Work Desk Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Work Desk</h2>
                <p className="text-gray-500 text-sm">Get things done</p>
              </div>
            </div>
            <button
              onClick={addNewWorkItem}
              className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors"
            >
              <Plus className="w-5 h-5 text-blue-600" />
            </button>
          </div>

          <div className="space-y-3">
            {workItems.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.status === 'completed' ? 'bg-green-100 text-green-700' :
                    item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {workItems.length > 3 && (
            <div className="text-center mt-4">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all {workItems.length} tasks →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}