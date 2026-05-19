'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { themes } from '../marketplace/themes-data';

interface Website {
  id: string;
  name: string;
  domain?: string;
  subdomain?: string;
  theme_name?: string;
  status: 'live' | 'draft' | string;
  updated_at?: string;
}

const FEATURED_THEMES = ['restaurant-pro', 'glow-beauty', 'shop-base']
  .map((slug) => themes.find((t) => t.slug === slug))
  .filter(Boolean) as (typeof themes)[number][];

const THEME_IMAGES: Record<string, string> = {
  Restaurant: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  'Beauty Salon': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
  eCommerce: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
};

const HERO_PREVIEW = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80';

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'just now';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'just now';
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function SearchBar() {
  const [value, setValue] = useState('');

  return (
    <div style={{ position: 'relative', marginBottom: '24px' }}>
      <div
        style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search themes, settings, help..."
        style={{
          width: '100%',
          padding: '12px 80px 12px 40px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1a1a2e',
          background: '#ffffff',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: '#64748b',
            background: '#f1f5f9',
            borderRadius: '4px',
            padding: '2px 6px',
            fontFamily: 'monospace',
            letterSpacing: '0.02em',
          }}
        >
          Ctrl K
        </span>
      </div>
    </div>
  );
}

function AnalyticsBar() {
  const cols = [
    { label: 'Page views', value: '0' },
    { label: 'Unique visitors', value: '0' },
    { label: 'Sessions', value: '0' },
    { label: 'Conversion rate', value: '0%' },
  ];

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '20px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          paddingRight: '24px',
          flexShrink: 0,
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>30 days</span>
      </div>

      {cols.map((col) => (
        <div
          key={col.label}
          style={{
            flex: 1,
            borderLeft: '1px solid #e2e8f0',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>{col.label}</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a2e' }}>{col.value}</div>
        </div>
      ))}
    </div>
  );
}

function CurrentThemeSection({ website }: { website: Website | null }) {
  if (!website) {
    return (
      <div
        style={{
          background: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '24px',
        }}
      >
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>Current theme</span>
        </div>
        <div
          style={{
            padding: '48px 32px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <svg
            width="120"
            height="88"
            viewBox="0 0 120 88"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: '20px' }}
          >
            <rect x="4" y="4" width="112" height="80" rx="6" />
            <line x1="4" y1="22" x2="116" y2="22" />
            <circle cx="15" cy="13" r="3" />
            <circle cx="26" cy="13" r="3" />
            <circle cx="37" cy="13" r="3" />
            <line x1="22" y1="40" x2="98" y2="40" />
            <line x1="22" y1="54" x2="78" y2="54" />
          </svg>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 18px 0', lineHeight: '1.6' }}>
            No active theme. Browse the marketplace to get started.
          </p>
          <Link
            href="/marketplace"
            style={{
              padding: '9px 20px',
              background: '#f59e0b',
              color: '#ffffff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Browse themes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '24px',
      }}
    >
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>Current theme</span>
      </div>

      <div style={{ display: 'flex', height: '280px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Image
            src={HERO_PREVIEW}
            alt="Theme preview"
            fill
            style={{ objectFit: 'cover' }}
            sizes="800px"
            priority
          />
        </div>
        <div
          style={{
            width: '108px',
            background: '#f8fafc',
            borderLeft: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '116px',
              border: '2px solid #1a1a2e',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#ffffff',
            }}
          >
            <div
              style={{
                height: '10px',
                background: '#1a1a2e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.35)',
                  borderRadius: '1px',
                }}
              />
            </div>
            <div style={{ position: 'relative', height: '106px', overflow: 'hidden' }}>
              <Image
                src={HERO_PREVIEW}
                alt="Mobile preview"
                fill
                style={{ objectFit: 'cover' }}
                sizes="64px"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '12px 20px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>
              {website.theme_name || 'Custom Theme'}
            </span>
            <span
              style={{
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                background: '#f1f5f9',
                color: '#64748b',
              }}
            >
              Current theme
            </span>
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>
            Last saved: {formatDate(website.updated_at)}
          </div>
        </div>
        <button
          style={{
            width: '36px',
            height: '36px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            background: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a1a2e" stroke="none">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
        <Link
          href={`/dashboard/websites/${website.id}`}
          style={{
            padding: '9px 18px',
            background: '#1a1a2e',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          Edit theme
        </Link>
      </div>
    </div>
  );
}

function DraftThemesSection() {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          Draft themes
        </h2>
        <button
          style={{
            padding: '7px 14px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            background: '#ffffff',
            fontSize: '13px',
            fontWeight: 600,
            color: '#1a1a2e',
            cursor: 'pointer',
          }}
        >
          Import
        </button>
      </div>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: '14px', color: '#64748b' }}>No draft themes</span>
      </div>
    </div>
  );
}

function DiscoverThemesSection() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '14px',
        }}
      >
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          Discover themes
        </h2>
        <Link
          href="/marketplace"
          style={{ fontSize: '13px', fontWeight: 600, color: '#f59e0b', textDecoration: 'none' }}
        >
          Visit Marketplace
        </Link>
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', marginBottom: '4px' }}>
          Generate a custom storefront
        </div>
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '14px' }}>
          Describe your business to get tailored theme options
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. modern Italian restaurant"
            style={{
              flex: 1,
              padding: '9px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#1a1a2e',
              outline: 'none',
              background: '#ffffff',
            }}
          />
          <Link
            href="/marketplace"
            style={{
              padding: '9px 18px',
              background: '#f59e0b',
              color: '#ffffff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Find themes
          </Link>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
      >
        {FEATURED_THEMES.map((theme) => {
          const imgSrc = THEME_IMAGES[theme.category] ?? THEME_IMAGES.Restaurant;
          return (
            <div
              key={theme.slug}
              style={{
                background: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
              }}
            >
              <Link
                href={`/marketplace/${theme.slug}`}
                style={{
                  display: 'block',
                  position: 'relative',
                  height: '160px',
                  textDecoration: 'none',
                }}
              >
                <Image
                  src={imgSrc}
                  alt={theme.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1100px) 25vw, 260px"
                />
              </Link>
              <div
                style={{
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <Link
                    href={`/marketplace/${theme.slug}`}
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#1a1a2e',
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '2px',
                    }}
                  >
                    {theme.name}
                  </Link>
                  <span
                    style={{
                      fontSize: '12px',
                      color: theme.price === 0 ? '#16a34a' : '#64748b',
                      fontWeight: theme.price === 0 ? 600 : 400,
                    }}
                  >
                    {theme.price === 0 ? 'Free' : `€${theme.price}`}
                  </span>
                </div>
                <Link
                  href={`/login?theme=${theme.slug}`}
                  style={{
                    display: 'inline-block',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '5px 14px',
                    fontSize: '13px',
                    color: '#374151',
                    background: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  Add
                </Link>
              </div>
            </div>
          );
        })}

        {/* Explore more card */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#1a1a2e',
              marginBottom: '8px',
            }}
          >
            Explore more themes
          </div>
          <div
            style={{
              fontSize: '13px',
              color: '#64748b',
              marginBottom: '16px',
              lineHeight: '1.5',
            }}
          >
            Browse professionally designed free and paid themes
          </div>
          <Link
            href="/marketplace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '13px',
              color: '#374151',
              background: '#ffffff',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Visit Marketplace
          </Link>
        </div>
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
        const list = Array.isArray(data) ? data : (data?.websites ?? data?.data ?? []);
        setWebsites(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const currentSite = websites.length > 0 ? websites[0] : null;

  return (
    <div style={{ background: '#f4f4f4', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ padding: '32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SearchBar />
          <AnalyticsBar />
          <CurrentThemeSection website={loading ? null : currentSite} />
          <DraftThemesSection />
          <DiscoverThemesSection />
          <div
            style={{
              textAlign: 'center',
              marginTop: '32px',
              paddingBottom: '32px',
              fontSize: '13px',
              color: '#64748b',
            }}
          >
            Learn more about{' '}
            <Link
              href="/marketplace"
              style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 500 }}
            >
              themes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
