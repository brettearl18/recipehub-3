"use client";
import React, { useState } from 'react';

const mockPlans = [
  { id: 1, name: 'Weight Loss Plan', coach: 'Carl Coach', clients: 5, status: 'Active', flagged: false, created: '2024-06-20' },
  { id: 2, name: 'Muscle Gain Plan', coach: 'Alice Admin', clients: 2, status: 'Active', flagged: true, created: '2024-06-18' },
  { id: 3, name: 'Vegan Starter', coach: 'Carl Coach', clients: 0, status: 'Template', flagged: false, created: '2024-06-10' },
  { id: 4, name: 'Low Carb Plan', coach: 'Alice Admin', clients: 1, status: 'Archived', flagged: true, created: '2024-05-30' },
];

export default function AdminMealPlans() {
  const [filter, setFilter] = useState('All');
  const [selectedPlan, setSelectedPlan] = useState<typeof mockPlans[0] | null>(null);

  const filteredPlans = mockPlans.filter(plan =>
    filter === 'All' ? true : plan.status === filter
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Meal Plans Management</h2>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Create Plan</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">Import Plans</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">Review Flagged</button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4 items-center">
        <label className="font-semibold text-gray-700">Filter by status:</label>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option>All</option>
          <option>Active</option>
          <option>Template</option>
          <option>Archived</option>
        </select>
      </div>

      {/* Meal Plans Table */}
      <div className="overflow-x-auto rounded-lg shadow mb-10">
        <table className="min-w-full bg-white/80">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Coach</th>
              <th className="py-3 px-4">Clients</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Flagged</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map(plan => (
              <tr key={plan.id} className="border-b hover:bg-blue-50">
                <td className="py-3 px-4 font-medium text-gray-900">{plan.name}</td>
                <td className="py-3 px-4 text-gray-800">{plan.coach}</td>
                <td className="py-3 px-4 text-gray-800">{plan.clients}</td>
                <td className="py-3 px-4 text-gray-800">{plan.status}</td>
                <td className="py-3 px-4 text-gray-800">{plan.flagged ? <span className="text-red-500">Yes</span> : 'No'}</td>
                <td className="py-3 px-4 text-gray-800">{plan.created}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => setSelectedPlan(plan)} className="text-blue-600 hover:underline text-sm">View</button>
                  <button className="text-yellow-600 hover:underline text-sm">Edit</button>
                  <button className="text-red-600 hover:underline text-sm">Archive</button>
                </td>
              </tr>
            ))}
            {filteredPlans.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-400">No meal plans found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Flagged/Review Section */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Flagged or Needs Review</h3>
        <ul className="bg-white/80 rounded-lg shadow divide-y divide-gray-200">
          {mockPlans.filter(p => p.flagged).length === 0 && (
            <li className="px-4 py-3 text-gray-400">No flagged plans.</li>
          )}
          {mockPlans.filter(p => p.flagged).map(plan => (
            <li key={plan.id} className="px-4 py-3 flex items-center gap-4">
              <span className="font-semibold text-gray-700">{plan.name}</span>
              <span className="text-red-500 text-sm">Flagged for review</span>
              <button className="ml-auto text-blue-600 hover:underline text-sm">View</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Plan Detail Modal Placeholder */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={() => setSelectedPlan(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Plan Details</h3>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Name:</span> {selectedPlan.name}</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Coach:</span> {selectedPlan.coach}</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Clients:</span> {selectedPlan.clients}</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Status:</span> {selectedPlan.status}</div>
            <div className="mb-2 text-gray-800"><span className="font-semibold">Created:</span> {selectedPlan.created}</div>
            <button onClick={() => setSelectedPlan(null)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
} 