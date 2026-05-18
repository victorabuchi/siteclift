'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';

interface StatCard {
  label: string;
  value: string | number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [websiteCount, setWebsiteCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/websites')
      .then(({ data }) => {
        const count = Array.isArray(data)
          ? data.length
          : (data?.count ?? data?.total ?? 0);
        setWebsiteCount(count);
      })
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, []);

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  const stats: StatCard[] = [
    { label: 'My Websites', value: statsLoading ? '...' : websiteCount },
    { label: 'Active Themes', value: 0 },
    { label: 'Total Visits', value: 0 },
    { label: 'Plan', value: 'Free' },
  ];

  return (
    <div>
      <div style={{ margin: '0 0 28px 0' }}>
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--color-text)',
            margin: '0 0 6px 0',
          }}
        >
          Welcome back, {firstName}
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-muted)',
            margin: 0,
          }}
        >
          Here is what is happening with your websites
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          margin: '0 0 32px 0',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                color: 'var(--color-muted)',
                marginBottom: '8px',
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--color-primary)',
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ margin: '0 0 32px 0' }}>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 16px 0',
          }}
        >
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link
            href='/marketplace'
            style={{
              flex: 1,
              background: 'var(--color-primary)',
              borderRadius: '12px',
              padding: '28px',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
              }}
            >
              Browse Themes
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>
              Find the perfect theme for your brand
            </div>
          </Link>

          <Link
            href='/dashboard/websites/new'
            style={{
              flex: 1,
              background: 'var(--color-text)',
              borderRadius: '12px',
              padding: '28px',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
              }}
            >
              Create Website
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              Launch a new site in minutes
            </div>
          </Link>
        </div>
      </div>

      <div>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 16px 0',
          }}
        >
          Recent Websites
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--color-muted)',
            fontSize: '14px',
          }}
        >
          No websites yet. Create your first website to get started.
        </div>
      </div>
    </div>
  );
}
