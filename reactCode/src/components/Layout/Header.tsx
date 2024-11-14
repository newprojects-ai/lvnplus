import React from 'react';
import { BookOpen, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  
  return (
    <header className="bg-indigo-700 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <BookOpen className="h-8 w-8 text-white" />
          <h1 className="text-xl font-bold text-white">Year 7 Learning Hub</h1>
        </div>
        <div className="flex items-center space-x-6">
          <NavLink to="/" icon={<Home className="h-5 w-5" />} label="Home" />
          <NavLink to="/mathematics" label="Mathematics" />
          <NavLink to="/english" label="English" />
          <NavLink to="/progress" label="My Progress" />
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, label, icon }: { to: string; label: string; icon?: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isActive 
          ? 'bg-indigo-800 text-white' 
          : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
        }`}
    >
      {icon && icon}
      <span>{label}</span>
    </Link>
  );
}