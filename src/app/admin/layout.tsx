import React from 'react';
import Link from 'next/link';
import { UserIcon, UsersIcon, BookOpenIcon, ChartBarIcon, Cog6ToothIcon, LifebuoyIcon, HomeIcon, BellIcon, MagnifyingGlassIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const navLinks = [
  { label: 'Dashboard', href: '/admin', icon: HomeIcon },
  { label: 'Users', href: '/admin/users', icon: UsersIcon },
  { label: 'Recipes', href: '/admin/recipes', icon: BookOpenIcon },
  { label: 'Recipe Dashboard 2', href: '/admin/recipe2', icon: Squares2X2Icon },
  { label: 'Meal Plans', href: '/admin/meal-plans', icon: BookOpenIcon },
  { label: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { label: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
  { label: 'Support', href: '/admin/support', icon: LifebuoyIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-blue-50 to-purple-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 border-r border-gray-200 p-6 hidden md:flex flex-col justify-between">
        <div>
          <div className="font-bold text-2xl mb-8 text-blue-700">Admin Panel</div>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition">
                <link.icon className="h-5 w-5 text-blue-400" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 mt-8">
          <UserIcon className="h-7 w-7 text-blue-400" />
          <div>
            <div className="font-semibold text-gray-800">Admin User</div>
            <div className="text-xs text-gray-500">admin@recipehub.com</div>
          </div>
        </div>
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/80 border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 w-1/2">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search..." className="w-full bg-transparent outline-none text-gray-700" />
          </div>
          <div className="flex items-center gap-6">
            <BellIcon className="h-6 w-6 text-gray-400 cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer">
              <UserIcon className="h-7 w-7 text-blue-400" />
              <span className="font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
} 