import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  highlightText,
  description,
  breadcrumbs = [],
  action
}) {
  return (
    <div className="page-header" style={{
      background: '#F1F5F9',
      borderBottom: '2px solid #0F172A',
      paddingTop: '40px',
      paddingBottom: '44px',
      position: 'relative'
    }}>
      <style>{`
        @media (max-width: 768px) {
          .page-header {
            padding-top: 28px !important;
            padding-bottom: 32px !important;
          }
          .page-header h1 {
            font-size: clamp(1.6rem, 3.5vw, 2.2rem) !important;
          }
          .page-header p {
            font-size: 0.92rem !important;
          }
          .page-header nav[aria-label="Breadcrumb"] {
            margin-bottom: 12px !important;
          }
        }
        @media (max-width: 480px) {
          .page-header {
            padding-top: 20px !important;
            padding-bottom: 24px !important;
          }
          .page-header .page-header-inner {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .page-header .page-header-inner > div:last-child {
            width: 100% !important;
          }
          .page-header .page-header-inner > div:last-child > * {
            width: 100%;
          }
        }
      `}</style>
      <div className="container">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#64748B', marginBottom: '18px' }}>
            <Link to="/" style={{ color: '#0F172A', fontWeight: '700' }}>
              Beranda
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={14} style={{ color: '#94A3B8' }} />
                {crumb.path ? (
                  <Link to={crumb.path} style={{ color: '#0F172A', fontWeight: '700' }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: 'var(--prussian-blue)', fontWeight: '800' }}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="page-header-inner" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ maxWidth: '820px' }}>
            {badge && (
              <div className="section-badge" style={{ marginBottom: '14px' }}>
                {BadgeIcon && <BadgeIcon size={14} />}
                <span>{badge}</span>
              </div>
            )}

            <h1 style={{
              fontSize: 'clamp(2.1rem, 4vw, 3rem)',
              fontWeight: '900',
              lineHeight: '1.2',
              marginBottom: '14px',
              letterSpacing: '-0.025em',
              color: '#0F172A'
            }}>
              {title} {highlightText && <span style={{ color: 'var(--prussian-blue)' }}>{highlightText}</span>}
            </h1>

            {description && (
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: '1.65', margin: 0, fontWeight: '500' }}>
                {description}
              </p>
            )}
          </div>

          {action && (
            <div style={{ flexShrink: 0 }}>
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
