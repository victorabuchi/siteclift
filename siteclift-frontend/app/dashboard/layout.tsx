'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

interface SidebarUser {
  name: string;
  email: string;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', exact: true },
  { href: '/dashboard/websites', label: 'My Websites', exact: false },
  { href: '/marketplace', label: 'Theme Marketplace', exact: false },
  { href: '/dashboard/themes', label: 'My Themes', exact: false },
  { href: '/dashboard/account', label: 'Account', exact: false },
];

function isActiveLink(href: string, exact: boolean, pathname: string): boolean {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + '/');
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<SidebarUser | null>(null);

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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '240px',
          background: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
        }}
      >
        <div style={{ padding: '24px 20px', flexShrink: 0 }}>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e' }}>Site</span>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#f59e0b' }}>clift</span>
        </div>

        <nav style={{ flex: 1, paddingTop: '8px' }}>
          {navItems.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              className={`sidebar-link${isActiveLink(href, exact, pathname) ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            padding: '20px',
            borderTop: '1px solid #e2e8f0',
            flexShrink: 0,
          }}
        >
          {user && (
            <>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1a1a2e',
                  marginBottom: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.name}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#64748b',
                  marginBottom: '12px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.email}
              </div>
            </>
          )}
          <button
            onClick={handleSignOut}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#64748b',
              background: 'transparent',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Sign out
          </button>
        </div>
      </aside>

      <main
        style={{
          marginLeft: '240px',
          background: '#f8fafc',
          padding: '32px',
          minHeight: '100vh',
          flex: 1,
        }}
      >
        {children}
      </main>
    </div>
  );
}
