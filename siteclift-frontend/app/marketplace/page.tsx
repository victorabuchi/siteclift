'use client';

import { useState } from 'react';
import Link from 'next/link';
import { themes, categories, type Theme } from './themes-data';

function ThemePreview({ colors }: { colors: { from: string; to: string } }) {
  return (
    <div
      style={{
        height: '200px',
        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          width: '100%',
          borderRadius: '6px 6px 0 0',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            height: '22px',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            gap: '4px',
          }}
        >
          {['#fca5a5', '#fde68a', '#bbf7d0'].map((c) => (
            <div
              key={c}
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }}
            />
          ))}
          <div
            style={{
              marginLeft: '6px',
              flex: 1,
              height: '9px',
              background: '#e2e8f0',
              borderRadius: '3px',
            }}
          />
        </div>
        <div
          style={{
            padding: '8px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <div
            style={{
              height: '18px',
              background: colors.from,
              borderRadius: '3px',
              opacity: 0.3,
            }}
          />
          <div
            style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', width: '78%' }}
          />
          <div
            style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', width: '56%' }}
          />
          <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
            <div
              style={{
                flex: 2,
                height: '26px',
                background: colors.from,
                borderRadius: '3px',
                opacity: 0.22,
              }}
            />
            <div
              style={{
                flex: 1,
                height: '26px',
                background: '#f8fafc',
                borderRadius: '3px',
                border: '1px solid #e2e8f0',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeCard({ theme }: { theme: Theme }) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <ThemePreview colors={theme.colors} />

      {theme.featured && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#f59e0b',
            color: '#ffffff',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          Featured
        </div>
      )}

      <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 600,
            background: '#f8fafc',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            marginBottom: '8px',
          }}
        >
          {theme.category}
        </span>

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
              fontWeight: 700,
              color: '#1a1a2e',
              margin: 0,
            }}
          >
            {theme.name}
          </h3>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: theme.price === 0 ? '#16a34a' : '#1a1a2e',
              whiteSpace: 'nowrap',
              marginLeft: '8px',
            }}
          >
            {theme.price === 0 ? 'Free' : `€${theme.price}`}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '16px',
          }}
        >
          <span style={{ color: '#f59e0b', fontSize: '13px', letterSpacing: '1px' }}>
            {'★★★★★'}
          </span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{theme.rating}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <Link
            href={`/marketplace/${theme.slug}`}
            className='mkt-btn-outline'
            style={{
              flex: 1,
              display: 'block',
              padding: '9px 0',
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: 600,
              color: '#1a1a2e',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '7px',
              textDecoration: 'none',
            }}
          >
            Preview
          </Link>
          <Link
            href={`/login?theme=${theme.slug}`}
            className='mkt-btn-primary'
            style={{
              flex: 1,
              display: 'block',
              padding: '9px 0',
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: 600,
              color: '#ffffff',
              background: '#f59e0b',
              borderRadius: '7px',
              textDecoration: 'none',
            }}
          >
            Use this theme
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = themes.filter((theme) => {
    const matchesSearch =
      !searchQuery ||
      theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' ||
      theme.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <section
        style={{
          background: 'linear-gradient(180deg, #fffbeb 0%, #f8fafc 100%)',
          padding: '72px 32px 56px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '40px',
            fontWeight: 800,
            color: '#1a1a2e',
            margin: '0 auto 16px',
            lineHeight: '1.15',
            maxWidth: '700px',
          }}
        >
          Find the perfect theme for your brand
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#64748b',
            margin: '0 auto 36px',
            maxWidth: '540px',
            lineHeight: '1.6',
          }}
        >
          Browse professionally designed themes for every business type. Switch anytime, your
          content stays.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type='text'
            placeholder='Search themes by name or category...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '600px',
              padding: '14px 20px',
              fontSize: '15px',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              outline: 'none',
              background: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              color: '#1a1a2e',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </section>

      <div
        style={{
          borderBottom: '1px solid #e2e8f0',
          background: '#ffffff',
          padding: '0 32px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ display: 'inline-flex', gap: '8px', padding: '14px 0' }}>
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: isActive ? 'none' : '1px solid #e2e8f0',
                  background: isActive ? '#f59e0b' : '#ffffff',
                  color: isActive ? '#ffffff' : '#64748b',
                  transition: 'all 0.1s',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 32px',
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 32px',
              color: '#64748b',
              fontSize: '15px',
            }}
          >
            No themes found for{' '}
            <strong style={{ color: '#1a1a2e' }}>
              {searchQuery || activeCategory}
            </strong>
            . Try a different search or category.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {filtered.map((theme) => (
              <ThemeCard key={theme.slug} theme={theme} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
