import { useState } from 'react';
import { apiFetch } from '../api.js';
import FloatingHearts from './FloatingHearts.jsx';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('peter');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      onLogin(data);
    } catch (err) {
      setError(err.message || 'Login failed. Check your password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <FloatingHearts />
      <div className="login-card">
        <div className="login-header">
          <span className="login-emoji">💔</span>
          <h1 className="login-title">Who Will<br />Move On First?</h1>
          <p className="login-subtitle">
            The breakup tracker nobody asked for<br />but everyone needs.
          </p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">I am…</label>
            <select
              id="username"
              className="form-select"
              value={username}
              onChange={e => setUsername(e.target.value)}
            >
              <option value="peter">Peter 👑 (The Comeback King)</option>
              <option value="niloufar">Niloufar 💅 (The Unbothered Queen)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in…' : 'Enter the Arena 💘'}
          </button>
        </form>
      </div>
    </div>
  );
}
