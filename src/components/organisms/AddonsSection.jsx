import React, { useState } from 'react';
import { ADDONS } from '../../data/catalogData';
import { Puzzle, FileText, Code2, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import SectionBadge from '../atoms/SectionBadge';

const typeIcons = {
  Document: <FileText size={18} />,
  Feature: <Code2 size={18} />,
  Maintenance: <Wrench size={18} />
};

export default function AddonsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleAddons = showAll ? ADDONS : ADDONS.slice(0, 6);

  return (
    <section id="addons" className="section-padding" style={{ background: '#FFFFFF', borderTop: '2px solid #0F172A' }}>
      <div className="container">
        <div className="section-header">
          <SectionBadge icon={Puzzle}>
            Modul Tambahan Resmi
          </SectionBadge>
          <h2 className="section-title">
            10 Layanan <span style={{ color: 'var(--prussian-blue)' }}>Add-on</span> &amp; Maintenance
          </h2>
          <p className="section-desc">
            Modul pelengkap untuk kebutuhan di luar paket standar: dokumen SRS/SDD, UML, fitur kustom, integrasi database, hingga software maintenance koding harian Rp 50.000/hari.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px',
          alignItems: 'start'
        }}>
          {visibleAddons.map((addon) => {
            const isYellow = addon.type === 'Document';
            const isBlue = addon.type === 'Feature';
            const accentBg = isYellow ? '#FFFBEB' : isBlue ? '#EFF6FF' : '#ECFDF5';
            const accentColor = isYellow ? '#B45309' : isBlue ? 'var(--prussian-blue)' : '#059669';
            return (
              <div
                key={addon.id}
                className="neo-card"
                style={{
                  padding: '22px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  alignSelf: 'start',
                  background: '#FFFFFF'
                }}
              >
                <div style={{
                  background: accentBg,
                  border: `2px solid #0F172A`,
                  boxShadow: '2px 2px 0px #0F172A',
                  borderRadius: '8px',
                  padding: '10px',
                  color: accentColor,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {typeIcons[addon.type]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A' }}>
                      {addon.number}. {addon.name}
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.55', marginBottom: '12px' }}>
                    {addon.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', paddingTop: '10px', borderTop: '1.5px solid #E2E8F0' }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '900',
                      fontSize: '0.95rem',
                      color: 'var(--prussian-blue)'
                    }}>
                      {addon.priceDisplay}
                    </span>
                    <span style={{
                      fontSize: '0.74rem',
                      color: '#0F172A',
                      background: '#F1F5F9',
                      border: '1.5px solid #0F172A',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontWeight: '700'
                    }}>
                      {addon.complexity}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {ADDONS.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-secondary"
              style={{ gap: '8px' }}
            >
              <span>{showAll ? 'Tampilkan Lebih Sedikit' : 'Tampilkan Semua 10 Add-on'}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
