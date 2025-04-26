import { ShieldCheckIcon, UsersIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const accessPoints = [
  {
    label: 'Recipe HUB Admin',
    description: 'Full management access to users, recipes, analytics, and settings.',
    route: '/admin',
    color: 'from-pink-500 via-red-500 to-yellow-500',
    icon: ShieldCheckIcon,
    iconColor: 'text-pink-400',
    shadow: 'shadow-pink-200/60',
  },
  {
    label: 'Coach Access',
    description: 'Manage assigned clients, view analytics, and assign meal plans.',
    route: '/coach',
    color: 'from-blue-500 via-cyan-500 to-green-400',
    icon: UsersIcon,
    iconColor: 'text-blue-400',
    shadow: 'shadow-blue-200/60',
  },
  {
    label: 'Client Access',
    description: 'Personal meal planning, macro tracking, and shopping lists.',
    route: '/client',
    color: 'from-green-400 via-lime-400 to-yellow-300',
    icon: UserIcon,
    iconColor: 'text-green-400',
    shadow: 'shadow-green-200/60',
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
      <div className="mb-10 text-center animate-fade-in">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight drop-shadow-sm font-sans">RecipeHUB</h1>
        <p className="text-xl text-gray-600 font-medium mb-2">Your all-in-one fitness, health, and nutrition meal planning platform</p>
        <span className="inline-block bg-white/70 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold tracking-wide shadow-sm text-primary-700 border border-primary-100">Choose your access point</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {accessPoints.map((ap) => {
          const Icon = ap.icon;
          return (
            <Link
              key={ap.label}
              href={ap.route}
              className={`group relative rounded-3xl bg-white/60 backdrop-blur border border-gray-200 ${ap.shadow} hover:shadow-2xl transition-all duration-300 p-10 flex flex-col items-center focus:outline-none focus:ring-4 focus:ring-primary-300 hover:scale-105 hover:bg-white/80 animate-slide-up`}
              style={{ minHeight: 340 }}
            >
              <span className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-br ${ap.color} p-5 rounded-full shadow-lg flex items-center justify-center`}>
                <Icon className={`h-14 w-14 ${ap.iconColor} drop-shadow-lg`} />
              </span>
              <div className="mt-10 mb-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition font-sans">{ap.label}</h2>
                <p className="text-gray-700 text-base font-medium mb-4 font-sans">{ap.description}</p>
              </div>
              <span className={`mt-auto w-full py-2 px-4 rounded-lg bg-gradient-to-r ${ap.color} text-white font-semibold text-lg shadow group-hover:scale-105 group-hover:shadow-xl transition font-sans`}>Enter</span>
            </Link>
          );
        })}
      </div>
      <footer className="mt-16 text-gray-400 text-xs text-center animate-fade-in">
        &copy; {new Date().getFullYear()} RecipeHUB. All rights reserved.
      </footer>
      <style>{`
        .animate-fade-in { animation: fadeIn 1.2s ease; }
        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(.4,2,.6,1) both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </main>
  );
}
