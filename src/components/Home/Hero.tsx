import React from 'react';
import { BookOpen, PenTool, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 bg-white">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Excel in Your</span>
                <span className="block text-indigo-600">Year 7 Studies</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                Master Mathematics and English with our interactive learning platform. Practice with tests, track your progress, and achieve your academic goals.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center sm:space-x-4">
                <Link
                  to="/mathematics"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Mathematics
                </Link>
                <Link
                  to="/english"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Start English
                </Link>
              </div>
            </div>
          </main>

          <div className="mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <FeatureCard
                  icon={<BookOpen className="h-8 w-8 text-indigo-600" />}
                  title="Comprehensive Learning"
                  description="Access structured lessons and materials aligned with the Year 7 curriculum."
                />
                <FeatureCard
                  icon={<PenTool className="h-8 w-8 text-indigo-600" />}
                  title="Practice Tests"
                  description="Test your knowledge with short quizzes and comprehensive assessments."
                />
                <FeatureCard
                  icon={<LineChart className="h-8 w-8 text-indigo-600" />}
                  title="Progress Tracking"
                  description="Monitor your improvement with detailed performance analytics."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 text-center">{description}</p>
    </div>
  );
}