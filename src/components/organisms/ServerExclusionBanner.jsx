import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, XCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { SERVER_EXCLUSIONS } from '../../data/catalogData';

export default function ServerExclusionBanner() {
  return (
    <section id="eksklusi-server" className="section-padding" style={{ paddingTop: '40px', paddingBottom: '60px', background: '#FFFFFF' }}>
      <div className="container">
        <div style={{
          background: '#FFFBEB',
          border: '2px solid #0F172A',
          borderRadius: 'var(--radius-md)',
          padding: '36px 32px',
          boxShadow: '6px 6px 0px #0F172A',
          position: 'relative'
        }}>
          {/* Top Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              background: 'var(--kuning)',
              color: '#0F172A',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: '800',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: '2px solid #0F172A',
              boxShadow: '2px 2px 0px #0F172A'
            }}>
              <ShieldAlert size={16} /> Batasan Ruang Lingkup Mutlak
            </div>
            <span style={{ fontSize: '0.88rem', color: '#475569', fontWeight: '700' }}>Kebijakan Resmi Operasional Aksara Tech</span>
          </div>

          <h3 style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 1.95rem)',
            fontWeight: '900',
            marginBottom: '14px',
            color: '#0F172A'
          }}>
            Penegasan Kebijakan <span style={{ color: 'var(--prussian-blue)' }}>Eksklusi Layanan Server &amp; Hosting</span>
          </h3>

          <p style={{
            fontSize: '1rem',
            color: '#334155',
            lineHeight: '1.7',
            marginBottom: '24px',
            maxWidth: '1020px',
            fontWeight: '500'
          }}>
            AKSARA TECH berfokus murni pada <strong>Software Engineering &amp; Source Code Crafting</strong> (penulisan kode program web fungsional, arsitektur database MySQL, serta dokumen rekayasa perangkat lunak). Demi transparansi dan kepastian hukum, kami secara tegas <strong>TIDAK MENYEDIAKAN</strong> layanan infrastruktur publik berikut:
          </p>

          {/* Grid of Exclusions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {SERVER_EXCLUSIONS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #0F172A',
                  borderRadius: '6px',
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  boxShadow: '3px 3px 0px #E11D48'
                }}
              >
                <div style={{ color: '#E11D48', marginTop: '2px', flexShrink: 0 }}>
                  <XCircle size={18} />
                </div>
                <div style={{ fontSize: '0.9rem', color: '#0F172A', lineHeight: '1.5', fontWeight: '600' }}>
                  {item}
                </div>
              </div>
            ))}
          </div>

          {/* Scope Comparison Strip */}
          <div style={{
            background: '#FFFFFF',
            border: '2px solid #0F172A',
            borderRadius: '6px',
            padding: '20px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '3px 3px 0px #0F172A'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 500px' }}>
              <div style={{ color: '#059669', flexShrink: 0 }}>
                <CheckCircle size={24} />
              </div>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>
                <strong style={{ color: '#0F172A' }}>Bagaimana dengan Software Maintenance Rp 50.000/hari?</strong><br />
                Layanan tersebut murni mencakup pemeliharaan baris kode, penanganan bug/error logika program, refactoring script, dan optimasi performa software, <em>bukan</em> maintenance server hosting atau penanganan server down.
              </div>
            </div>
            <Link
              to="/eksklusi-server"
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '0.86rem',
                gap: '8px'
              }}
            >
              <span>Pelajari Batasan Eksklusi Lengkap</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
