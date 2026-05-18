'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

interface NavUser {
  name: string;
  email: string;
}

const navItems = [
  { href: '/dashboard', label: 'My Sites' },
  { href: '/marketplace', label: 'Themes' },
  { href: '/dashboard/account', label: 'Account' },
];

function getInitials(name: string | undefined | null): string {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function isActiveNav(href: string, pathname: string): boolean {
  if (href === '/dashboard') {
    return (
      pathname === '/dashboard' ||
      (pathname.startsWith('/dashboard/') && !pathname.startsWith('/dashboard/account'))
    );
  }
  return pathname === href || pathname.startsWith(href + '/');
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<NavUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('siteclift_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    const stored = localStorage.getItem('siteclift_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('siteclift_user');
      }
    }
    setReady(true);
  }, [router]);

  function handleSignOut() {
    logout();
    router.push('/login');
  }

  if (!ready) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          height: '60px',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
        }}
      >
        <Link href='/dashboard' style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e' }}>Site</span>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#f59e0b' }}>clift</span>
        </Link>

        <nav
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'stretch',
            height: '60px',
          }}
        >
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`topnav-link${isActiveNav(href, pathname) ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#f59e0b',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {user ? getInitials(user.name) : '?'}
          </div>

          {user && (
            <span
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#1a1a2e',
                whiteSpace: 'nowrap',
              }}
            >
              {user?.name}
            </span>
          )}

          <button
            onClick={handleSignOut}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: '#64748b',
              padding: '4px 0',
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <main style={{ minHeight: 'calc(100vh - 60px)' }}>{children}</main>
    </div>
  );
}
