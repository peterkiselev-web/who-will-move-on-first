import { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import CheckInForm from './components/CheckInForm.jsx';
import FloatingHearts from './components/FloatingHearts.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) setUser({ token, username });
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setUser(data);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    setView('dashboard');
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="app-root">
      <FloatingHearts />
      <header className="app-header">
        <div className="header-inner">
          <h1 className="site-title">💔 Who Will Move On First?</h1>
          <nav className="header-nav">
            <button
              className={`nav-btn ${view === 'dashboard' ? 'active' : ''}`}
              onClick={() => setView('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-btn ${view === 'checkin' ? 'active' : ''}`}
              onClick={() => setView('checkin')}
            >
              Daily Check-In
            </button>
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout ({user.username === 'peter' ? 'Peter' : 'Niloufar'})
            </button>
          </nav>
        </div>
      </header>
      <main className="app-main">
        {view === 'dashboard' ? (
          <Dashboard user={user} onNavigate={setView} />
        ) : (
          <CheckInForm user={user} onNavigate={setView} />
        )}
      </main>
    </div>
  );
}
