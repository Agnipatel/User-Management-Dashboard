import React, { useState, useEffect } from 'react';
import HomePage from './Pages/HomePage';
import UserDetailsPage from './Pages/UserDetailsPage';
import AddUserPage from './Pages/AddUserPage';
import Header from './components/Header';
import Toast from './components/toast';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchUsers();
    loadLocalUsers();
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      showToast('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadLocalUsers = () => {
    const localUsersStr = localStorage.getItem('localUsers');
    if (localUsersStr) {
      try {
        const parsed = JSON.parse(localUsersStr);
        setUsers(prev => [...parsed, ...prev]);
      } catch (e) {
        console.error('Error loading local users');
      }
    }
  };

  const addUser = (newUser) => {
    const userWithId = { ...newUser, id: Date.now(), isLocal: true };
    setUsers(prev => [userWithId, ...prev]);
    const localUsersStr = localStorage.getItem('localUsers');
    const existing = localUsersStr ? JSON.parse(localUsersStr) : [];
    localStorage.setItem('localUsers', JSON.stringify([userWithId, ...existing]));
    showToast('User added successfully!', 'success');
    setCurrentPage('home');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateTo = (page, userId = null) => {
    setCurrentPage(page);
    setSelectedUserId(userId);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {toast && <Toast toast={toast} />}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} navigateTo={navigateTo} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <HomePage
            users={filteredUsers}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            darkMode={darkMode}
            navigateTo={navigateTo}
          />
        )}
        {currentPage === 'details' && (
          <UserDetailsPage
            userId={selectedUserId}
            users={users}
            darkMode={darkMode}
            navigateTo={navigateTo}
          />
        )}
        {currentPage === 'add' && (
          <AddUserPage addUser={addUser} darkMode={darkMode} navigateTo={navigateTo} />
        )}
      </main>
    </div>
  );
};

export default App;
