import React from 'react';
import { Mail, Phone, Building } from 'lucide-react';

const UserCard = ({ user, darkMode, onClick }) => (
  <div
    onClick={onClick}
    className={`${
      darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
    } rounded-lg p-6 shadow-md cursor-pointer transition-all hover:shadow-xl border ${
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
);

export default UserCard;
