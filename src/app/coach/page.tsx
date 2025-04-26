"use client";
import React, { useState } from 'react';

const sections = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'clients', label: 'Clients' },
  { key: 'mealplans', label: 'Meal Plans' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'messages', label: 'Messages' },
  { key: 'library', label: 'Library' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'profile', label: 'Profile' },
];

const mockClients = [
  { name: 'Alice Smith', mealPlan: 'Keto', calories: 1800, days: 21 },
  { name: 'Bob Johnson', mealPlan: 'Vegan', calories: 2000, days: 14 },
  { name: 'Charlie Lee', mealPlan: 'Paleo', calories: 2200, days: 30 },
  { name: 'Diana King', mealPlan: 'Mediterranean', calories: 1700, days: 10 },
  { name: 'Ethan Brown', mealPlan: 'Low-Carb', calories: 1900, days: 7 },
  { name: 'Fiona White', mealPlan: 'Balanced', calories: 2100, days: 25 },
  { name: 'George Black', mealPlan: 'Intermittent Fasting', calories: 1600, days: 18 },
  { name: 'Hannah Green', mealPlan: 'High-Protein', calories: 2300, days: 12 },
  { name: 'Ian Blue', mealPlan: 'Vegetarian', calories: 2000, days: 16 },
  { name: 'Julia Red', mealPlan: 'DASH', calories: 1750, days: 9 },
];

function ClientTable() {
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sortedClients = [...mockClients].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDir === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 cursor-pointer text-gray-900" onClick={() => handleSort('name')}>
              Name {sortBy === 'name' && (sortDir === 'asc' ? '▲' : '▼')}
            </th>
            <th className="px-4 py-2 cursor-pointer text-gray-900" onClick={() => handleSort('mealPlan')}>
              Meal Plan {sortBy === 'mealPlan' && (sortDir === 'asc' ? '▲' : '▼')}
            </th>
            <th className="px-4 py-2 cursor-pointer text-gray-900" onClick={() => handleSort('calories')}>
              Calories {sortBy === 'calories' && (sortDir === 'asc' ? '▲' : '▼')}
            </th>
            <th className="px-4 py-2 cursor-pointer text-gray-900" onClick={() => handleSort('days')}>
              Days on Plan {sortBy === 'days' && (sortDir === 'asc' ? '▲' : '▼')}
            </th>
            <th className="px-4 py-2 text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client, idx) => (
            <tr key={idx} className="border-t hover:bg-blue-50 transition">
              <td className="px-4 py-2 font-medium text-gray-900">{client.name}</td>
              <td className="px-4 py-2 text-gray-800">{client.mealPlan}</td>
              <td className="px-4 py-2 text-gray-800">{client.calories}</td>
              <td className="px-4 py-2 text-gray-800">{client.days}</td>
              <td className="px-4 py-2 flex gap-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">View Plan</button>
                <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition">Edit Plan</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CoachDashboard() {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-blue-50 to-purple-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 border-r border-gray-200 p-6 hidden md:flex flex-col justify-between min-h-screen">
        <div>
          <div className="font-bold text-2xl mb-8 text-blue-700">Coach Panel</div>
          <nav className="flex flex-col gap-2">
            {sections.map(s => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition font-semibold ${active === s.key ? 'bg-blue-600 text-white' : ''}`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 mt-8">
          <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">C</div>
          <div>
            <div className="font-semibold text-gray-800">Coach User</div>
            <div className="text-xs text-gray-500">coach@recipehub.com</div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <div className="bg-white/80 rounded-xl shadow p-8 min-h-[400px]">
            {active === 'dashboard' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Coach Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <div className="text-2xl font-bold text-blue-700 mb-2">8</div>
                    <div className="text-gray-700">Active Clients</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6 text-center">
                    <div className="text-2xl font-bold text-green-700 mb-2">5</div>
                    <div className="text-gray-700">Meal Plans Assigned</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-6 text-center">
                    <div className="text-2xl font-bold text-yellow-700 mb-2">3</div>
                    <div className="text-gray-700">Clients Need Attention</div>
                  </div>
                </div>
                <div className="text-gray-700">Welcome! Use the sidebar to manage your clients, plans, and more.</div>
              </div>
            )}
            {active === 'clients' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Clients</h2>
                <ClientTable />
              </div>
            )}
            {active === 'mealplans' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Meal Plans</h2>
                <div className="text-gray-700">Create, edit, and assign meal plans. (Feature coming soon)</div>
              </div>
            )}
            {active === 'analytics' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Analytics</h2>
                <div className="text-gray-700">Track client progress and engagement. (Feature coming soon)</div>
              </div>
            )}
            {active === 'messages' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Messages</h2>
                <div className="text-gray-700">Communicate with your clients. (Feature coming soon)</div>
              </div>
            )}
            {active === 'library' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Library</h2>
                <div className="text-gray-700">Browse recipes and plan templates. (Feature coming soon)</div>
              </div>
            )}
            {active === 'calendar' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Calendar</h2>
                <div className="text-gray-700">View check-ins and important dates. (Feature coming soon)</div>
              </div>
            )}
            {active === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">Profile</h2>
                <div className="text-gray-700">Edit your profile and settings. (Feature coming soon)</div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 