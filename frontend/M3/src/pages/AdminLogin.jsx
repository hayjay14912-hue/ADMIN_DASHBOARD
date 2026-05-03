import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css';
import { API_BASE_URL } from '../config/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <aside className="login-visual" aria-hidden="true">
          <div className="login-brand-mark">NEES</div>
          <div className="login-visual-copy">
            <p className="login-visual-kicker">Medical admin workspace</p>
            <h2>Control the storefront with a calmer, cleaner interface.</h2>
            <p>
              Sign in to manage products, clinical categories, staff access, and daily order flow from one place.
            </p>
          </div>
          <div className="login-visual-stats">
            <div>
              <strong>Secure</strong>
              <span>Protected access</span>
            </div>
            <div>
              <strong>Fast</strong>
              <span>Quick dashboard entry</span>
            </div>
            <div>
              <strong>Clear</strong>
              <span>Focused admin layout</span>
            </div>
          </div>
        </aside>

        <section className="login-panel">
          <div className="login-header">
            <span className="login-badge">Admin Access</span>
            <h1>Admin Login</h1>
            <p>Welcome back. Please sign in to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <Link to="/admin/forgot-password" className="forgot-password-link">
              Forgot your password?
            </Link>
            <div className="register-link">
              Don't have an account?{' '}
              <Link to="/admin/register">Register here</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLogin;
