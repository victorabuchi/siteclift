'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { AxiosError } from 'axios';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { authStyles as s } from '@/lib/auth-styles';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      login(data.token, data.user);
      router.push('/dashboard');
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message || 'Invalid email or password');
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
      <p style={s.tagline}>Build and switch websites instantly</p>

      <div style={s.card}>
        <form onSubmit={handleSubmit}>
          {error && <div style={s.errorBox}>{error}</div>}

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
              autoComplete='current-password'
              style={s.input}
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='auth-submit-btn'
            style={{ ...s.button, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={s.footer}>
          Don&apos;t have an account?{' '}
          <Link href='/register' style={s.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
