"use client";
import React, { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'Alice Admin', email: 'alice@recipehub.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Carl Coach', email: 'carl@recipehub.com', role: 'Coach', status: 'Active' },
  { id: 3, name: 'Clara Client', email: 'clara@recipehub.com', role: 'Client', status: 'Active' },
  { id: 4, name: 'Inactive User', email: 'inactive@recipehub.com', role: 'Client', status: 'Inactive' },
];

const roles = ['All', 'Admin', 'Coach', 'Client'];
const mockCoaches = mockUsers.filter(u => u.role === 'Coach');

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null as null | typeof mockUsers[0]);
  const [assignUser, setAssignUser] = useState(null as null | typeof mockUsers[0]);
  const [deactivateUser, setDeactivateUser] = useState(null as null | typeof mockUsers[0]);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'Client' });
  const [inviteError, setInviteError] = useState('');
  const [assignCoachId, setAssignCoachId] = useState('');

  const filteredUsers = mockUsers.filter(
    (u) =>
      (role === 'All' || u.role === role) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  function handleInviteSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) {
      setInviteError('Name and email are required.');
      return;
    }
    setInviteError('');
    // TODO: Send invite logic
    setInviteOpen(false);
    setInviteForm({ name: '', email: '', role: 'Client' });
  }

  function handleAssignSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Assign logic
    setAssignUser(null);
    setAssignCoachId('');
  }

  function handleDeactivate() {
    // TODO: Deactivate/reactivate logic
    setDeactivateUser(null);
  }

  return (
    <div>
      {/* Invite User Modal */}
      {inviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={() => setInviteOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4">Invite New User</h3>
            <form className="flex flex-col gap-4" onSubmit={handleInviteSubmit}>
              <input type="text" placeholder="Name" className="border rounded-lg px-3 py-2" value={inviteForm.name} onChange={e => setInviteForm(f => ({ ...f, name: e.target.value }))} />
              <input type="email" placeholder="Email" className="border rounded-lg px-3 py-2" value={inviteForm.email} onChange={e => setInviteForm(f => ({ ...f, email: e.target.value }))} />
              <select className="border rounded-lg px-3 py-2" value={inviteForm.role} onChange={e => setInviteForm(f => ({ ...f, role: e.target.value }))}>
                <option>Admin</option>
                <option>Coach</option>
                <option>Client</option>
              </select>
              {inviteError && <div className="text-red-500 text-sm">{inviteError}</div>}
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Send Invite</button>
            </form>
          </div>
        </div>
      )}
      {/* View User Modal */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={() => setViewUser(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4">User Details</h3>
            <div className="mb-2"><span className="font-semibold">Name:</span> {viewUser.name}</div>
            <div className="mb-2"><span className="font-semibold">Email:</span> {viewUser.email}</div>
            <div className="mb-2"><span className="font-semibold">Role:</span> {viewUser.role}</div>
            <div className="mb-2"><span className="font-semibold">Status:</span> {viewUser.status}</div>
            <button onClick={() => setViewUser(null)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Close</button>
          </div>
        </div>
      )}
      {/* Assign Modal */}
      {assignUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={() => setAssignUser(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4">Assign Coach</h3>
            <form className="flex flex-col gap-4" onSubmit={handleAssignSubmit}>
              <div className="mb-2">Assign <span className="font-semibold">{assignUser.name}</span> to a coach:</div>
              <select className="border rounded-lg px-3 py-2" value={assignCoachId} onChange={e => setAssignCoachId(e.target.value)} required>
                <option value="">Select a coach...</option>
                {mockCoaches.map(coach => (
                  <option key={coach.id} value={coach.id}>{coach.name}</option>
                ))}
              </select>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Assign</button>
            </form>
          </div>
        </div>
      )}
      {/* Deactivate Modal */}
      {deactivateUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button onClick={() => setDeactivateUser(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h3 className="text-xl font-bold mb-4">{deactivateUser.status === 'Active' ? 'Deactivate' : 'Reactivate'} User</h3>
            <div className="mb-4">Are you sure you want to {deactivateUser.status === 'Active' ? 'deactivate' : 'reactivate'} <span className="font-semibold">{deactivateUser.name}</span>?</div>
            <div className="flex gap-4">
              <button onClick={handleDeactivate} className={`px-4 py-2 rounded-lg font-semibold text-white ${deactivateUser.status === 'Active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition`}>
                Yes, {deactivateUser.status === 'Active' ? 'Deactivate' : 'Reactivate'}
              </button>
              <button onClick={() => setDeactivateUser(null)} className="px-4 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {roles.map(r => <option key={r}>{r}</option>)}
          </select>
          <button onClick={() => setInviteOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Invite User</button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white/80">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-blue-50">
                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>{user.status}</span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => setViewUser(user)} className="text-blue-600 hover:underline text-sm">View</button>
                  <button onClick={() => setAssignUser(user)} className="text-yellow-600 hover:underline text-sm">Assign</button>
                  <button onClick={() => setDeactivateUser(user)} className="text-red-600 hover:underline text-sm">{user.status === 'Active' ? 'Deactivate' : 'Reactivate'}</button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
} 