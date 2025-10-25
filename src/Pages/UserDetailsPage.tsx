import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Building } from 'lucide-react';

// Types
interface Company {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface UserType {
  id: string | number;
  name: string;
  username?: string;
  email: string;
  phone: string;
  website?: string;
  company?: Company | string;
  address?: Address;
  isLocal?: boolean;
}

interface UserDetailsPageProps {
  userId: string | number;
  users: UserType[];
  darkMode: boolean;
  navigateTo: (page: string, id?: string | number) => void;
}

const UserDetailsPage: React.FC<UserDetailsPageProps> = ({ userId, users, darkMode, navigateTo }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUser = users.find((u) => u.id === userId);
    if (localUser) {
      setUser(localUser);
      setLoading(false);
    } else {
      fetchUserDetails();
    }
  }, [userId, users]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data: UserType = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-md animate-pulse`}>
        <div className={`h-24 w-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full mb-6`}></div>
        <div className={`h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-4 w-1/3`}></div>
        <div className={`h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>User not found</p>
        <button onClick={() => navigateTo('home')} className="text-blue-500 hover:underline mt-4">
          Go back to home
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigateTo('home')}
        className={`mb-6 flex items-center gap-2 ${
          darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        <ArrowLeft size={20} /> Back to Users
      </button>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-md`}>
        <div className="flex items-start gap-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-4xl flex-shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {user.username ? `@${user.username}` : 'User Profile'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750 border border-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Mail size={20} className="text-blue-500" /> Contact Information
            </h3>
            <div className="space-y-2">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                <span className="font-medium">Phone:</span> {user.phone}
              </p>
              {user.website && (
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <span className="font-medium">Website:</span> {user.website}
                </p>
              )}
            </div>
          </div>

          {/* Company Info */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750 border border-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Building size={20} className="text-purple-500" /> Company
            </h3>
            <div className="space-y-2">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                <span className="font-medium">Name:</span>{' '}
                {typeof user.company === 'string' ? user.company : user.company?.name}
              </p>
              {typeof user.company !== 'string' && user.company?.catchPhrase && (
                <p className={`text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.company.catchPhrase}
                </p>
              )}
              {typeof user.company !== 'string' && user.company?.bs && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.company.bs}</p>
              )}
            </div>
          </div>

          {/* Address */}
          {user.address && (
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750 border border-gray-700' : 'bg-gray-50'} md:col-span-2`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Address</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
