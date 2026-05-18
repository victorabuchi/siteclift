'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { AxiosError } from 'axios';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { authStyles as s } from '@/lib/auth-styles';

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
    <div style={s.page}>
      <div style={s.wordmark}>
        <span style={s.wordmarkBase}>Site</span>
        <span style={s.wordmarkAccent}>clift</span>
      </div>
      <p style={s.tagline}>Join thousands building with Siteclift</p>

      <div style={s.card}>
        <form onSubmit={handleSubmit}>
          {error && <div style={s.errorBox}>{error}</div>}

          <div style={s.fieldGroup}>
            <label style={s.label} htmlFor='full-name'>Full name</label>
            <input
              id='full-name'
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete='name'
              style={s.input}
            />
          </div>

          <div style={s.fieldGroup}>
            <label style={s.label} htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='email'
              style={s.input}
            />
          </div>

          <div style={s.fieldGroup}>
            <label style={s.label} htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='new-password'
              style={s.input}
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='auth-submit-btn'
            style={{ ...s.button, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={s.footer}>
          Already have an account?{' '}
          <Link href='/login' style={s.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
