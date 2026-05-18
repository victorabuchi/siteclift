'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { AxiosError } from 'axios';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
  },
  wordmark: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '6px',
    textAlign: 'center' as const,
  },
  tagline: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '28px',
    textAlign: 'center' as const,
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '36px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '420px',
  },
  fieldGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#1a1a2e',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#1a1a2e',
    outline: 'none',
    boxSizing: 'border-box' as const,
    background: '#ffffff',
  },
  errorBox: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#dc2626',
    fontSize: '14px',
    marginBottom: '16px',
  },
  button: (loading: boolean) => ({
    width: '100%',
    background: loading ? '#9d7dff' : '#6c47ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: loading ? 'not-allowed' : 'pointer',
    marginTop: '8px',
    transition: 'background 0.15s',
  }),
  footer: {
    textAlign: 'center' as const,
    marginTop: '20px',
    fontSize: '14px',
    color: '#64748b',
  },
  link: {
    color: '#6c47ff',
    fontWeight: 500,
    textDecoration: 'none',
  },
};

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/api/auth/register', {
        full_name: fullName,
        email,
        password,
      });
      login(data.token, data.user);
      router.push('/dashboard');
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.wordmark}>
        <span style={{ color: '#1a1a2e' }}>Site</span>
        <span style={{ color: '#6c47ff' }}>clift</span>
      </div>
      <p style={styles.tagline}>Join thousands building with Siteclift</p>

      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.errorBox}>{error}</div>}

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor='full-name'>Full name</label>
            <input
              id='full-name'
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete='name'
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='email'
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='new-password'
              style={styles.input}
            />
          </div>

          <button type='submit' disabled={loading} style={styles.button(loading)}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link href='/login' style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
