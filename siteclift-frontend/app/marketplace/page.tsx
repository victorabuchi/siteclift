'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { themes, type Theme } from './themes-data';

const CATEGORY_IMAGES: Record<string, string> = {
  Restaurant: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  Clinic: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
  'Law Firm': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
  Gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
  Portfolio: 'https://images.unsplash.com/photo-1545665277-5937489579f2?w=600&q=80',
  eCommerce: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
  'Real Estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
  Hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  'Beauty Salon': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
  Education: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
  'Tech Startup': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  Photography: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80',
};

const INDUSTRY_OPTIONS = [
  'Restaurant',
  'Clinic',
  'Law Firm',
  'Gym',
  'Portfolio',
  'eCommerce',
  'Real Estate',
  'Hotel',
  'Beauty Salon',
  'Education',
  'Tech Startup',
  'Photography',
];

function CheckboxItem({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count: number;
}) {
  return (
    <div
      onClick={onChange}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '4px 0',
      }}
    >
      <div
        style={{
          width: '16px',
          height: '16px',
          border: `1px solid ${checked ? '#1a1a2e' : '#d1d5db'}`,
          borderRadius: '3px',
          background: checked ? '#1a1a2e' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {checked && (
          <span
            style={{ color: '#ffffff', fontSize: '9px', fontWeight: 700, lineHeight: '1' }}
          >
            ✓
          </span>
        )}
      </div>
      <span style={{ fontSize: '13px', color: '#374151', flex: 1 }}>{label}</span>
      <span style={{ fontSize: '12px', color: '#9ca3af' }}>({count})</span>
    </div>
  );
}

function SidebarSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          background: 'none',
          border: 'none',
          borderTop: '1px solid #e2e8f0',
          cursor: 'pointer',
          padding: '14px 0',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e' }}>{title}</span>
        <span style={{ fontSize: '10px', color: '#6b7280' }}>{open ? '▼' : '▶'}</span>
      </button>
      {open && <div style={{ paddingBottom: '8px' }}>{children}</div>}
    </div>
  );
}

function ThemeCard({ theme }: { theme: Theme }) {
  const imgSrc = CATEGORY_IMAGES[theme.category];

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        cursor: 'pointer',
      }}
    >
      <Link
        href={`/marketplace/${theme.slug}`}
        style={{
          display: 'block',
          position: 'relative',
          height: '220px',
          textDecoration: 'none',
        }}
      >
        <Image
          src={imgSrc}
          alt={theme.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes='(max-width: 1400px) 33vw, 400px'
        />
      </Link>

      <div style={{ padding: '12px 16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <Link
            href={`/marketplace/${theme.slug}`}
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#1a1a2e',
              textDecoration: 'none',
            }}
          >
            {theme.name}
          </Link>
          <span
            style={{
              fontSize: '13px',
              color: theme.price === 0 ? '#16a34a' : '#64748b',
              fontWeight: theme.price === 0 ? 600 : 400,
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
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ minHeight: '24px', display: 'flex', alignItems: 'center' }}>
            {theme.featured && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 500,
                  background: '#f3f4f6',
                  color: '#64748b',
                }}
              >
                NEW
              </span>
            )}
          </div>
          <Link
            href={`/login?theme=${theme.slug}`}
            className='mkt-btn-outline'
            style={{
              display: 'inline-block',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '6px 16px',
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
    </div>
  );
}

export default function MarketplacePage() {
  const [priceFilters, setPriceFilters] = useState<Set<string>>(new Set());
  const [industryFilters, setIndustryFilters] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('relevance');
  const [priceOpen, setPriceOpen] = useState(true);
  const [industryOpen, setIndustryOpen] = useState(true);

  const freeCount = themes.filter((t) => t.price === 0).length;
  const paidCount = themes.filter((t) => t.price > 0).length;

  function togglePrice(val: string) {
    setPriceFilters((prev) => {
      const next = new Set(prev);
      if (next.has(val)) next.delete(val);
      else next.add(val);
      return next;
    });
  }

  function toggleIndustry(val: string) {
    setIndustryFilters((prev) => {
      const next = new Set(prev);
      if (next.has(val)) next.delete(val);
      else next.add(val);
      return next;
    });
  }

  const displayThemes = themes
    .filter((t) => {
      const matchesPrice =
        priceFilters.size === 0 ||
        (priceFilters.has('free') && t.price === 0) ||
        (priceFilters.has('paid') && t.price > 0);
      const matchesIndustry =
        industryFilters.size === 0 || industryFilters.has(t.category);
      return matchesPrice && matchesIndustry;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div
      style={{
        display: 'flex',
        background: '#f4f4f4',
        minHeight: 'calc(100vh - 60px)',
        alignItems: 'flex-start',
      }}
    >
      <aside
        style={{
          width: '260px',
          flexShrink: 0,
          background: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          padding: '24px',
          position: 'sticky',
          top: '60px',
          maxHeight: 'calc(100vh - 60px)',
          overflowY: 'auto',
          alignSelf: 'flex-start',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#1a1a2e',
            margin: '0 0 20px 0',
          }}
        >
          Browse all themes
        </h1>

        <SidebarSection
          title='Price'
          open={priceOpen}
          onToggle={() => setPriceOpen((v) => !v)}
        >
          <CheckboxItem
            checked={priceFilters.has('free')}
            onChange={() => togglePrice('free')}
            label='Free'
            count={freeCount}
          />
          <CheckboxItem
            checked={priceFilters.has('paid')}
            onChange={() => togglePrice('paid')}
            label='Paid'
            count={paidCount}
          />
        </SidebarSection>

        <SidebarSection
          title='Industry'
          open={industryOpen}
          onToggle={() => setIndustryOpen((v) => !v)}
        >
          {INDUSTRY_OPTIONS.map((cat) => (
            <CheckboxItem
              key={cat}
              checked={industryFilters.has(cat)}
              onChange={() => toggleIndustry(cat)}
              label={cat}
              count={themes.filter((t) => t.category === cat).length}
            />
          ))}
        </SidebarSection>
      </aside>

      <main style={{ flex: 1, padding: '32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '14px', color: '#64748b' }}>
            1-{displayThemes.length} of {themes.length} themes
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '13px',
              color: '#374151',
              background: '#ffffff',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value='relevance'>Relevance</option>
            <option value='newest'>Newest</option>
            <option value='price-asc'>Price low to high</option>
            <option value='price-desc'>Price high to low</option>
          </select>
        </div>

        {displayThemes.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 32px',
              color: '#64748b',
              fontSize: '15px',
            }}
          >
            No themes match the selected filters.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            {displayThemes.map((theme) => (
              <ThemeCard key={theme.slug} theme={theme} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
