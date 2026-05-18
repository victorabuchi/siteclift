'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/pricing', label: 'Pricing' },
];

function isActiveNav(href: string, pathname: string): boolean {
  if (href === '/marketplace') return pathname.startsWith('/marketplace');
  return pathname === href || pathname.startsWith(href + '/');
}

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('siteclift_token'));
  }, []);

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
        <Link href='/' style={{ textDecoration: 'none', flexShrink: 0 }}>
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
            gap: '16px',
            flexShrink: 0,
          }}
        >
          {isLoggedIn ? (
            <Link
              href='/dashboard'
              className='mkt-btn-primary'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 18px',
                background: '#f59e0b',
                color: '#ffffff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href='/login'
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#64748b',
                  textDecoration: 'none',
                }}
              >
                Log in
              </Link>
              <Link
                href='/register'
                className='mkt-btn-primary'
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 18px',
                  background: '#f59e0b',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Get started free
              </Link>
            </>
          )}
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
