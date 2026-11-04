import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, XCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { SERVER_EXCLUSIONS } from '../../data/catalogData';

export default function ServerExclusionBanner() {
  return (
    <section id="eksklusi-server" className="section-padding" style={{ paddingTop: '40px', paddingBottom: '60px', background: '#FFFFFF' }}>
      <div className="container">
        <div style={{
          background: '#F8FAFC',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '36px 32px',
          
          position: 'relative'
        }}>
          <h3 style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 1.95rem)',
            fontWeight: '900',
            marginBottom: '14px',
            color: '#0F172A'
          }}>
            Kebijakan Eksklusi <span style={{ color: 'var(--prussian-blue)' }}>Server &amp; Hosting</span>
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
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  
                }}
              >
                <div style={{ color: '#0F172A', marginTop: '2px', flexShrink: 0 }}>
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
            background: '#FFFFFF', border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '20px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 500px' }}>
              <div style={{ color: '#0F172A', flexShrink: 0 }}>
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
