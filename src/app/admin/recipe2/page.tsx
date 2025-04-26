"use client";
import React from 'react';

const mockRecipes = [
  { id: 1, name: 'Chicken Salad', missing: ['image'], flagged: false, created: '2024-06-25', assigned: true },
  { id: 2, name: 'Oatmeal Bowl', missing: ['macros', 'instructions'], flagged: true, created: '2024-06-24', assigned: false },
  { id: 3, name: 'Grilled Salmon', missing: [], flagged: false, created: '2024-06-23', assigned: true },
  { id: 4, name: 'Vegan Wrap', missing: ['macros'], flagged: true, created: '2024-06-22', assigned: false },
];

const recentActivity = [
  { type: 'created', recipe: 'Chicken Salad', by: 'Carl Coach', date: '2024-06-25' },
  { type: 'edited', recipe: 'Oatmeal Bowl', by: 'Alice Admin', date: '2024-06-24' },
  { type: 'flagged', recipe: 'Vegan Wrap', by: 'System', date: '2024-06-22' },
];

export default function RecipeDashboard2() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Recipe Dashboard (Content Quality & Workflow)</h2>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Add New Recipe</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">Create with AI</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">Bulk Import</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">Review Flagged</button>
        </div>
      </div>

      {/* Needs Attention Section */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Recipes Needing Attention</h3>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white/80">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Missing Info</th>
                <th className="py-3 px-4">Flagged</th>
                <th className="py-3 px-4">Assigned to Plan?</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRecipes.filter(r => r.missing.length > 0 || r.flagged).map(recipe => (
                <tr key={recipe.id} className="border-b hover:bg-yellow-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{recipe.name}</td>
                  <td className="py-3 px-4 text-gray-800">{recipe.missing.length > 0 ? recipe.missing.join(', ') : '-'}</td>
                  <td className="py-3 px-4 text-gray-800">{recipe.flagged ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-4 text-gray-800">{recipe.assigned ? 'Yes' : <span className="text-red-500">No</span>}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="text-blue-600 hover:underline text-sm">View</button>
                    <button className="text-yellow-600 hover:underline text-sm">Edit</button>
                    <button className="text-red-600 hover:underline text-sm">Flag</button>
                  </td>
                </tr>
              ))}
              {mockRecipes.filter(r => r.missing.length > 0 || r.flagged).length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-400">No recipes need attention.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
        <ul className="bg-white/80 rounded-lg shadow divide-y divide-gray-200">
          {recentActivity.map((a, i) => (
            <li key={i} className="px-4 py-3 flex items-center gap-4">
              <span className="font-semibold text-gray-700">{a.recipe}</span>
              <span className="text-gray-500 text-sm">{a.type} by {a.by} on {a.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Callouts/Alerts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Callouts & Alerts</h3>
        <ul className="list-disc ml-6 text-red-600">
          {mockRecipes.filter(r => r.missing.length > 0).map(r => (
            <li key={r.id}>Recipe <span className="font-semibold">{r.name}</span> is missing: {r.missing.join(', ')}</li>
          ))}
          {mockRecipes.filter(r => r.flagged).map(r => (
            <li key={r.id}>Recipe <span className="font-semibold">{r.name}</span> is flagged for review.</li>
          ))}
          {mockRecipes.filter(r => !r.assigned).map(r => (
            <li key={r.id}>Recipe <span className="font-semibold">{r.name}</span> is not assigned to any plan.</li>
          ))}
          {mockRecipes.filter(r => r.missing.length === 0 && !r.flagged && r.assigned).length === mockRecipes.length && (
            <li className="text-green-600">All recipes are complete and assigned!</li>
          )}
        </ul>
      </div>
    </div>
  );
} 