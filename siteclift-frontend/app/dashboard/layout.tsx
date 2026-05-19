'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

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
          ref={dropdownRef}
          style={{ marginLeft: 'auto', position: 'relative', flexShrink: 0 }}
        >
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: '#f59e0b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {user ? getInitials(user.name) : '?'}
            </div>
            {user && (
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a2e', whiteSpace: 'nowrap' }}>
                {user.name}
              </span>
            )}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                minWidth: '180px',
                zIndex: 200,
                overflow: 'hidden',
              }}
            >
              <Link
                href="/dashboard/account"
                onClick={() => setDropdownOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  fontSize: '14px',
                  color: '#374151',
                  textDecoration: 'none',
                }}
              >
                Account settings
              </Link>
              <button
                onClick={() => { handleSignOut(); setDropdownOpen(false); }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 16px',
                  fontSize: '14px',
                  color: '#374151',
                  background: 'none',
                  border: 'none',
                  borderTop: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={{ minHeight: 'calc(100vh - 60px)' }}>{children}</main>
    </div>
  );
}
