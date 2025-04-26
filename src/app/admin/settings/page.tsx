"use client";
import React, { useState } from 'react';

const sections = [
  { key: 'branding', label: 'Branding' },
  { key: 'email', label: 'Email & Notifications' },
  { key: 'users', label: 'User & Role Management' },
  { key: 'billing', label: 'Subscription & Billing' },
  { key: 'integrations', label: 'Integrations' },
  { key: 'security', label: 'Security & Compliance' },
  { key: 'support', label: 'Support & Help' },
];

export default function AdminSettings() {
  const [active, setActive] = useState('branding');

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-8 gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 mb-6 md:mb-0">
        <nav className="flex md:flex-col gap-2">
          {sections.map(s => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`px-4 py-2 rounded-lg text-left font-semibold transition w-full ${active === s.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-white/80 rounded-xl shadow p-8 min-h-[400px]">
        {active === 'branding' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Branding</h2>
            <form className="flex flex-col gap-4 max-w-lg">
              <label className="font-semibold text-gray-700">Platform Name
                <input type="text" className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full" placeholder="RecipeHUB" />
              </label>
              <label className="font-semibold text-gray-700">Logo
                <input type="file" className="mt-1" />
              </label>
              <label className="font-semibold text-gray-700">Brand Color
                <input type="color" className="mt-1 w-12 h-8 p-0 border-0" />
              </label>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-fit">Save Branding</button>
            </form>
          </div>
        )}
        {active === 'email' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Email & Notifications</h2>
            <form className="flex flex-col gap-4 max-w-lg">
              <label className="font-semibold text-gray-700">Sender Email
                <input type="email" className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full" placeholder="noreply@recipehub.com" />
              </label>
              <label className="font-semibold text-gray-700">Invite Email Template
                <textarea className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full" rows={3} placeholder="Welcome to RecipeHUB..." />
              </label>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-fit">Save Email Settings</button>
            </form>
          </div>
        )}
        {active === 'users' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">User & Role Management</h2>
            <div className="mb-4 text-gray-700">Manage admin, coach, and client roles and permissions. (Feature coming soon)</div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-fit">Invite Admin/Coach</button>
          </div>
        )}
        {active === 'billing' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Subscription & Billing</h2>
            <div className="mb-4 text-gray-700">View and manage your subscription plan, billing info, and invoices. (Feature coming soon)</div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition w-fit">Update Billing Info</button>
          </div>
        )}
        {active === 'integrations' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Integrations</h2>
            <div className="mb-4 text-gray-700">Connect to third-party services, manage API keys, and set up webhooks. (Feature coming soon)</div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition w-fit">Manage Integrations</button>
          </div>
        )}
        {active === 'security' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Security & Compliance</h2>
            <form className="flex flex-col gap-4 max-w-lg">
              <label className="font-semibold text-gray-700">Password Policy
                <select className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full">
                  <option>Standard (min 8 chars)</option>
                  <option>Strong (min 12 chars, symbols)</option>
                </select>
              </label>
              <label className="font-semibold text-gray-700">Two-Factor Authentication
                <select className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full">
                  <option>Optional</option>
                  <option>Required for Admins</option>
                  <option>Required for All</option>
                </select>
              </label>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-fit">Save Security Settings</button>
            </form>
          </div>
        )}
        {active === 'support' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Support & Help</h2>
            <div className="mb-4 text-gray-700">Need help? Contact support or view documentation.</div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-fit">Contact Support</button>
            <button className="ml-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition w-fit">View Docs</button>
          </div>
        )}
      </main>
    </div>
  );
} 