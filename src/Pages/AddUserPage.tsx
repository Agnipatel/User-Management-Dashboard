import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Define the User type
interface User {
  name: string;
  email: string;
  phone: string;
  company: string;
}

// Props type for AddUserPage
interface AddUserPageProps {
  addUser: (user: User) => void;
  darkMode: boolean;
  navigateTo: (page: string) => void;
}

const AddUserPage: React.FC<AddUserPageProps> = ({ addUser, darkMode, navigateTo }) => {
  const [formData, setFormData] = useState<User>({ name: '', email: '', phone: '', company: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof User, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) addUser(formData);
  };

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

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

      <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-md`}>
        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New User</h2>

        <div className="space-y-6">
          {(['name', 'email', 'phone', 'company'] as (keyof User)[]).map((field) => (
            <div key={field}>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {field.charAt(0).toUpperCase() + field.slice(1)} *
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors[field]
                    ? 'border-red-500'
                    : darkMode
                    ? 'border-gray-700 bg-gray-750 text-white'
                    : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder={`Enter ${field}`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg"
            >
              Add User
            </button>
            <button
              onClick={() => navigateTo('home')}
              className={`px-6 py-3 rounded-lg border ${
                darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-750' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
