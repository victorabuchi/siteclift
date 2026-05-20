'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

interface NavUser {
  name: string;
  email: string;
}

function getInitials(name: string | undefined | null): string {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function isActive(href: string, pathname: string): boolean {
  if (href === '/dashboard') {
    return (
      pathname === '/dashboard' ||
      (pathname.startsWith('/dashboard/') &&
        !pathname.startsWith('/dashboard/account') &&
        !pathname.startsWith('/dashboard/billing') &&
        !pathname.startsWith('/dashboard/domains'))
    );
  }
  return pathname === href || pathname.startsWith(href + '/');
}

const SIDEBAR_SALES = [{ href: '/dashboard', label: 'Online Store' }];

const SIDEBAR_SETTINGS = [
  { href: '/dashboard/account', label: 'Account' },
  { href: '/dashboard/billing', label: 'Billing' },
  { href: '/dashboard/domains', label: 'Domains' },
];

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
    if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  function handleSignOut() {
    logout();
    router.push('/login');
  }

  if (!ready) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f11' }}>
      {/* Top bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '52px',
          background: '#18181b',
          borderBottom: '1px solid #2a2a2f',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '12px',
        }}
      >
        {/* Logo */}
        <Link
          href="/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
              S
            </span>
          </div>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap' }}>
            Siteclift
          </span>
        </Link>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: '520px', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: '11px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#52525b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            placeholder="Search"
            style={{
              width: '100%',
              padding: '7px 60px 7px 32px',
              background: '#0f0f11',
              border: '1px solid #2a2a2f',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#fafafa',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: '#52525b',
                background: '#27272a',
                borderRadius: '3px',
                padding: '2px 5px',
                fontFamily: 'monospace',
              }}
            >
              Ctrl K
            </span>
          </div>
        </div>

        {/* Right icons */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2px' }}>
          {/* Apps grid */}
          <button
            style={{
              width: '34px',
              height: '34px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#71717a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>

          {/* Bell */}
          <button
            style={{
              width: '34px',
              height: '34px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#71717a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          {/* Avatar + dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative', marginLeft: '6px' }}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#6366f1',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>
                {user ? getInitials(user.name) : '?'}
              </span>
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  background: '#18181b',
                  border: '1px solid #2a2a2f',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  minWidth: '200px',
                  zIndex: 300,
                  overflow: 'hidden',
                }}
              >
                {user && (
                  <div
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #2a2a2f',
                      background: '#1c1c1f',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#fafafa' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#71717a', marginTop: '2px' }}>
                      {user.email}
                    </div>
                  </div>
                )}
                <Link
                  href="/dashboard/account"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 16px',
                    fontSize: '13px',
                    color: '#a1a1aa',
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
                    fontSize: '13px',
                    color: '#a1a1aa',
                    background: 'none',
                    border: 'none',
                    borderTop: '1px solid #2a2a2f',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Left sidebar */}
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: '52px',
          width: '220px',
          height: 'calc(100vh - 52px)',
          background: '#18181b',
          borderRight: '1px solid #2a2a2f',
          overflowY: 'auto',
          paddingTop: '16px',
          zIndex: 100,
        }}
      >
        {/* Sales Channels */}
        <div
          style={{
            padding: '0 16px',
            marginBottom: '4px',
            fontSize: '11px',
            fontWeight: 500,
            color: '#52525b',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          Sales Channels
        </div>

        {SIDEBAR_SALES.map(({ href, label }) => {
          const active = isActive(href, pathname);
          return (
            <div key={href} style={{ margin: '0 8px' }}>
              <Link
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#ffffff' : '#71717a',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  background: active ? '#6366f1' : 'transparent',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={active ? '#ffffff' : '#71717a'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                {label}
              </Link>
            </div>
          );
        })}

        {/* Divider */}
        <div style={{ margin: '12px 0', borderTop: '1px solid #2a2a2f' }} />

        {/* Settings */}
        <div
          style={{
            padding: '0 16px',
            marginBottom: '4px',
            fontSize: '11px',
            fontWeight: 500,
            color: '#52525b',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          Settings
        </div>

        {SIDEBAR_SETTINGS.map(({ href, label }) => {
          const active = isActive(href, pathname);
          return (
            <div key={href} style={{ margin: '0 8px' }}>
              <Link
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 10px',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#ffffff' : '#71717a',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  background: active ? '#6366f1' : 'transparent',
                }}
              >
                {label}
              </Link>
            </div>
          );
        })}
      </aside>

      {/* Main content */}
      <main
        style={{
          marginLeft: '220px',
          marginTop: '52px',
          minHeight: 'calc(100vh - 52px)',
          background: '#0f0f11',
        }}
      >
        {children}
      </main>
    </div>
  );
}
