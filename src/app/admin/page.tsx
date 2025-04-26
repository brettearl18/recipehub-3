export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-blue-50 to-purple-100">
      {/* Sidebar placeholder */}
      <aside className="w-64 bg-white/80 border-r border-gray-200 p-6 hidden md:block">
        <div className="font-bold text-2xl mb-8 text-blue-700">Admin Panel</div>
        <nav className="flex flex-col gap-4">
          <span className="text-gray-700 font-semibold">Dashboard</span>
          <span className="text-gray-500">Users</span>
          <span className="text-gray-500">Recipes</span>
          <span className="text-gray-500">Analytics</span>
          <span className="text-gray-500">Settings</span>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome, Admin!</h1>
        <p className="text-lg text-gray-600 mb-8">Manage users, recipes, analytics, and platform settings from this dashboard.</p>
        <div className="w-full max-w-2xl bg-white/70 rounded-2xl shadow-lg p-8 text-center">
          <span className="text-blue-600 font-semibold">This is your admin dashboard. More features coming soon!</span>
        </div>
      </main>
    </div>
  );
} 