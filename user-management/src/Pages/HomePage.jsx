import React from 'react';
import { Search, User, Mail, Phone, Building, Plus } from 'lucide-react';

const HomePage = ({ users, loading, searchTerm, setSearchTerm, darkMode, navigateTo }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Users</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{users.length} total users</p>
        </div>
        <button
          onClick={() => navigateTo('add')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} /> Add User
        </button>
      </div>

      <div className="mb-6 relative">
        <Search
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          size={20}
        />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md animate-pulse`}>
              <div className={`h-12 w-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full mb-4`}></div>
              <div className={`h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
              <div className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
              <div className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3`}></div>
            </div>
          ))}
        </div>
      )}

      {!loading && users.length === 0 && (
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <User size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-xl">No users found</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div
              key={user.id}
              onClick={() => navigateTo('details', user.id)}
              className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} rounded-lg p-6 shadow-md cursor-pointer transition-all hover:shadow-xl border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } ${user.isLocal ? 'border-l-4 border-l-green-500' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                {user.isLocal && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">New</span>}
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} truncate`}>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} truncate`}>
                    {user.company?.name || user.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
