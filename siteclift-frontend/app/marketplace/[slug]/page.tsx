import { notFound } from 'next/navigation';
import Link from 'next/link';
import { themes } from '../themes-data';

export default async function ThemeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug);

  if (!theme) {
    notFound();
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 60px)' }}>
      <div
        style={{
          height: '340px',
          background: `linear-gradient(135deg, ${theme.colors.from}, ${theme.colors.to})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            width: '100%',
            borderRadius: '10px 10px 0 0',
            overflow: 'hidden',
            boxShadow: '0 16px 64px rgba(0,0,0,0.3)',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              height: '28px',
              background: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              gap: '5px',
            }}
          >
            {['#fca5a5', '#fde68a', '#bbf7d0'].map((c) => (
              <div
                key={c}
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }}
              />
            ))}
            <div
              style={{
                marginLeft: '8px',
                flex: 1,
                height: '11px',
                background: '#e2e8f0',
                borderRadius: '4px',
              }}
            />
          </div>
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                height: '28px',
                background: theme.colors.from,
                borderRadius: '4px',
                opacity: 0.3,
              }}
            />
            <div
              style={{ height: '8px', background: '#e2e8f0', borderRadius: '3px', width: '72%' }}
            />
            <div
              style={{ height: '8px', background: '#e2e8f0', borderRadius: '3px', width: '50%' }}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <div
                style={{
                  flex: 2,
                  height: '48px',
                  background: theme.colors.from,
                  borderRadius: '4px',
                  opacity: 0.2,
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: '48px',
                  background: '#f8fafc',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '48px 32px',
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '40px',
          alignItems: 'start',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '3px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                background: '#f8fafc',
                color: '#64748b',
                border: '1px solid #e2e8f0',
              }}
            >
              {theme.category}
            </span>
            {theme.featured && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: '#fffbeb',
                  color: '#d97706',
                  border: '1px solid #fde68a',
                }}
              >
                Featured
              </span>
            )}
          </div>

          <h1
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#1a1a2e',
              margin: '0 0 12px 0',
            }}
          >
            {theme.name}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '20px',
            }}
          >
            <span style={{ color: '#f59e0b', fontSize: '16px', letterSpacing: '1px' }}>
              {'★★★★★'}
            </span>
            <span style={{ fontSize: '14px', color: '#64748b' }}>{theme.rating} rating</span>
          </div>

          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              lineHeight: '1.7',
              margin: '0 0 36px 0',
            }}
          >
            {theme.description}
          </p>

          <div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#1a1a2e',
                margin: '0 0 16px 0',
              }}
            >
              What is included
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {theme.features.map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '15px',
                    color: '#1a1a2e',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '11px',
                      color: '#d97706',
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '28px',
            position: 'sticky',
            top: '80px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: theme.price === 0 ? '#16a34a' : '#1a1a2e',
              marginBottom: '4px',
            }}
          >
            {theme.price === 0 ? 'Free' : `€${theme.price}`}
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
            {theme.price === 0 ? 'No credit card required' : 'One-time purchase, lifetime updates'}
          </div>

          <Link
            href={`/login?theme=${theme.slug}`}
            className='mkt-btn-primary'
            style={{
              display: 'block',
              width: '100%',
              padding: '13px 0',
              textAlign: 'center',
              fontSize: '15px',
              fontWeight: 700,
              color: '#ffffff',
              background: '#f59e0b',
              borderRadius: '8px',
              textDecoration: 'none',
              marginBottom: '12px',
              boxSizing: 'border-box',
            }}
          >
            Use this theme
          </Link>

          <Link
            href='/marketplace'
            style={{
              display: 'block',
              textAlign: 'center',
              fontSize: '13px',
              color: '#64748b',
              textDecoration: 'none',
            }}
          >
            Back to all themes
          </Link>

          <div
            style={{
              borderTop: '1px solid #e2e8f0',
              marginTop: '20px',
              paddingTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {[
              'Instant setup',
              'Mobile responsive',
              'SEO optimized',
              'Free theme updates',
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#64748b',
                }}
              >
                <span style={{ color: '#f59e0b', fontWeight: 700 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
