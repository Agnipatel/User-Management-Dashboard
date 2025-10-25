import { useState, useEffect } from 'react';
import HomePage from './Pages/HomePage';
import UserDetailsPage from './Pages/UserDetailsPage';
import AddUserPage from './Pages/AddUserPage';
import Header from './components/Header';
import Toast from './components/Toast';

export interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string | Company;
  isLocal?: boolean;
}

export interface ToastType {
  message: string;
  type: 'success' | 'error';
}

type Page = 'home' | 'details' | 'add';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastType | null>(null);

  // Load users on mount
  useEffect(() => {
    fetchUsers();
    loadLocalUsers();
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: User[] = await response.json();
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
        const parsed: User[] = JSON.parse(localUsersStr);
        setUsers(prev => [...parsed, ...prev]);
      } catch (e) {
        console.error('Error loading local users', e);
      }
    }
  };

  const addUser = (newUser: Omit<User, 'id' | 'isLocal'>) => {
    const userWithId: User = { ...newUser, id: Date.now(), isLocal: true };
    setUsers(prev => [userWithId, ...prev]);

    const localUsersStr = localStorage.getItem('localUsers');
    const existing: User[] = localUsersStr ? JSON.parse(localUsersStr) : [];
    localStorage.setItem('localUsers', JSON.stringify([userWithId, ...existing]));

    showToast('User added successfully!', 'success');
    setCurrentPage('home');
  };

  const showToast = (message: string, type: ToastType['type'] = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredUsers: User[] = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateTo = (page: Page, userId: number | null = null) => {
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

        {currentPage === 'details' && selectedUserId !== null && (
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
