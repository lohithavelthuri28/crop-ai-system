import { Sprout, Brain } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-2">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                AI Crop Recommendation System
              </h1>
              <p className="text-xs text-muted-foreground">Smart farming with AI-powered insights</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
              v1.0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
