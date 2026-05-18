'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

interface Website {
  id: string;
  name: string;
  domain?: string;
  subdomain?: string;
  theme_name?: string;
  status: 'live' | 'draft' | string;
  updated_at?: string;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Unknown';
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function StatusBadge({ status }: { status: string }) {
  const isLive = status === 'live';
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: 600,
        background: isLive ? '#dcfce7' : '#f1f5f9',
        color: isLive ? '#16a34a' : '#64748b',
      }}
    >
      {isLive ? 'Live' : 'Draft'}
    </span>
  );
}

function WebsiteCard({ site }: { site: Website }) {
  const displayDomain = site.domain || site.subdomain || 'No domain set';
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: '4px', background: '#f59e0b' }} />

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '6px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            {site.name}
          </h3>
          <StatusBadge status={site.status} />
        </div>

        <div
          style={{
            fontSize: '13px',
            color: 'var(--color-muted)',
            marginBottom: '14px',
          }}
        >
          {displayDomain}
        </div>

        <div style={{ fontSize: '13px', color: 'var(--color-muted)', marginBottom: '6px' }}>
          Theme:{' '}
          <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>
            {site.theme_name || 'None'}
          </span>
        </div>

        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px', flex: 1 }}>
          Updated {formatDate(site.updated_at)}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            href={`/dashboard/websites/${site.id}`}
            style={{
              flex: 1,
              display: 'block',
              padding: '8px 0',
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-text)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Edit
          </Link>
          <Link
            href={`/dashboard/websites/${site.id}/themes`}
            style={{
              flex: 1,
              display: 'block',
              padding: '8px 0',
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-primary)',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Switch Theme
          </Link>
        </div>
      </div>
    </div>
  );
}

function BrowserMockup() {
  return (
    <div
      style={{
        width: '260px',
        height: '190px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        background: '#f8fafc',
        margin: '0 auto 32px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      }}
    >
      <div
        style={{
          height: '36px',
          background: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '6px',
        }}
      >
        {['#fca5a5', '#fde68a', '#bbf7d0'].map((color) => (
          <div
            key={color}
            style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }}
          />
        ))}
        <div
          style={{
            marginLeft: '8px',
            flex: 1,
            height: '16px',
            background: '#fff',
            borderRadius: '4px',
            opacity: 0.7,
          }}
        />
      </div>
      <div
        style={{
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div
          style={{ height: '28px', background: '#f59e0b', borderRadius: '6px', opacity: 0.28 }}
        />
        <div
          style={{ height: '9px', background: '#cbd5e1', borderRadius: '4px', width: '75%' }}
        />
        <div
          style={{ height: '9px', background: '#cbd5e1', borderRadius: '4px', width: '55%' }}
        />
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <div
            style={{
              flex: 1,
              height: '40px',
              background: '#f59e0b',
              borderRadius: '6px',
              opacity: 0.18,
            }}
          />
          <div
            style={{
              flex: 1,
              height: '40px',
              background: '#ffffff',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 32px',
        textAlign: 'center',
      }}
    >
      <BrowserMockup />

      <h2
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0 0 10px 0',
        }}
      >
        Build your first website
      </h2>
      <p
        style={{
          fontSize: '15px',
          color: 'var(--color-muted)',
          margin: '0 0 28px 0',
          maxWidth: '360px',
          lineHeight: '1.6',
        }}
      >
        Choose a theme from our marketplace and launch in minutes
      </p>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link
          href='/marketplace'
          style={{
            padding: '11px 24px',
            background: 'var(--color-primary)',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Browse themes
        </Link>
        <Link
          href='/dashboard/websites/new'
          style={{
            padding: '11px 24px',
            background: 'var(--color-text)',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Start from scratch
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/websites')
      .then(({ data }) => {
        const list = Array.isArray(data)
          ? data
          : (data?.websites ?? data?.data ?? []);
        setWebsites(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--color-text)',
            margin: 0,
          }}
        >
          Your websites
        </h1>
        <Link
          href='/dashboard/websites/new'
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            background: 'var(--color-primary)',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          + New website
        </Link>
      </div>

      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px',
            color: 'var(--color-muted)',
            fontSize: '14px',
          }}
        >
          Loading...
        </div>
      ) : websites.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {websites.map((site) => (
            <WebsiteCard key={site.id} site={site} />
          ))}
        </div>
      )}
    </div>
  );
}
