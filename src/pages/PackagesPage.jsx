import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PACKAGES, ADDONS } from '../data/catalogData';
import { formatRupiah } from '../utils/documentEngine';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';
import { 
  Package, Clock, CheckCircle2, XCircle, ArrowRight, Star, 
  FileCode2, Shield, Layers, HelpCircle, Code2
} from 'lucide-react';

export default function PackagesPage({ onSelectPackage }) {
  const navigate = useNavigate();
  const [activeAddonFilter, setActiveAddonFilter] = useState('All');

  const handleChoosePackage = (pkgId) => {
    if (onSelectPackage) {
      onSelectPackage(pkgId);
    }
    navigate('/pesan');
  };

  const filteredAddons = activeAddonFilter === 'All' 
    ? ADDONS 
    : ADDONS.filter(a => a.type === activeAddonFilter);

  // Comparison matrix items
  const comparisonRows = [
    { label: 'Tipe Sistem', key: 'systemType' },
    { label: 'Estimasi Pengerjaan', render: (p) => `${p.minDays}–${p.maxDays} Hari Kerja` },
    { label: 'Rentang Tarif Resmi', render: (p) => `${formatRupiah(p.minPrice)} – ${formatRupiah(p.maxPrice)}` },
    { label: 'Jumlah Halaman', render: (p) => p.pages },
    { label: 'Database MySQL & CRUD', render: (p) => p.number >= 2 ? <CheckCircle2 size={18} style={{ color: '#059669', margin: '0 auto' }} /> : <XCircle size={18} style={{ color: '#94A3B8', margin: '0 auto' }} /> },
    { label: 'Sistem Autentikasi / Login', render: (p) => p.number === 5 ? <CheckCircle2 size={18} style={{ color: '#059669', margin: '0 auto' }} /> : <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '600' }}>Opsional via Add-on</span> },
    { label: 'Dokumen Rekayasa SRS & SDD', render: (p) => p.includeDocs ? <CheckCircle2 size={18} style={{ color: '#059669', margin: '0 auto' }} /> : <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '600' }}>Add-on</span> },
    { label: 'Pemodelan Diagram UML', render: (p) => p.number === 5 || p.number === 4 || p.number === 2 ? <CheckCircle2 size={18} style={{ color: '#059669', margin: '0 auto' }} /> : <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '600' }}>Add-on</span> },
    { label: 'Kuota Revisi Maksimal', render: () => <span style={{ color: '#0F172A', background: 'var(--kuning)', padding: '2px 8px', borderRadius: '4px', border: '1.5px solid #0F172A', fontWeight: '800' }}>3x Mutlak</span> },
    { label: 'Skema Pembayaran', render: () => <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A' }}>DP 50% / Pelunasan 50%</span> }
  ];

  return (
    <div className="packages-page" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <PageHeader
        breadcrumbs={[{ label: 'Katalog Paket & Layanan' }]}
        badge="Katalog Resmi Aksara Tech"
        badgeIcon={Package}
        title="Spesifikasi & Tarif 5 Paket"
        highlightText="Layanan Enterprise"
        description="Seluruh paket dibangun dengan arsitektur teruji, fasilitas kuota revisi maksimal 3 kali mutlak, estimasi 3–10 hari kerja, dan plafon tarif transparan tanpa biaya tersembunyi."
        action={
          <Link to="/pesan" className="btn btn-primary">
            <span>Isi Lembar Kebutuhan</span>
            <ArrowRight size={16} />
          </Link>
        }
      />

      {/* Main 5 Packages Grid */}
      <section className="section-padding" style={{ background: '#FFFFFF', borderBottom: '2px solid #0F172A' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'start',
            marginBottom: '72px'
          }}>
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="neo-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0',
                  overflow: 'hidden',
                  position: 'relative',
                  alignSelf: 'start',
                  border: '2px solid #0F172A',
                  boxShadow: pkg.number === 5 ? '6px 6px 0px var(--kuning)' : '4px 4px 0px #0F172A'
                }}
              >
                {/* Card Header with Non-overlapping Tag & Badge */}
                <div style={{ padding: '22px 24px 20px 24px', borderBottom: '2px solid #0F172A' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '14px'
                  }}>
                    <div className="category-pill">
                      <span className="package-num">PAKET {pkg.number}</span>
                      <span className="divider">/</span>
                      <span className="cat-name">{pkg.category}</span>
                    </div>

                    {pkg.badge && (
                      <div className={`badge ${pkg.number === 5 ? 'badge-kuning' : 'badge-blue'}`}>
                        <Star size={11} fill="currentColor" />
                        <span>{pkg.badge}</span>
                      </div>
                    )}
                  </div>

                  <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0F172A', marginBottom: '10px', lineHeight: '1.3' }}>
                    {pkg.name}
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', minHeight: '50px' }}>
                    {pkg.description}
                  </p>
                </div>

                <div style={{ padding: '18px 24px', background: '#F8FAFC', borderBottom: '2px solid #0F172A' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '4px', fontWeight: '700' }}>Tarif Referensi Resmi:</div>
                  <div style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ color: 'var(--prussian-blue)' }}>{formatRupiah(pkg.minPrice)}</span>
                    <span style={{ fontSize: '0.95rem', color: '#94A3B8', fontWeight: '400' }}>–</span>
                    <span style={{ color: 'var(--prussian-blue)' }}>{formatRupiah(pkg.maxPrice)}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '12px', fontSize: '0.82rem', color: '#0F172A', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={15} style={{ color: '#D97706' }} />
                      <span>{pkg.minDays}–{pkg.maxDays} Hari Kerja</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Layers size={15} style={{ color: 'var(--prussian-blue)' }} />
                      <span>{pkg.pages}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px 24px', flex: 1, background: '#FFFFFF' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                    Deliverables Termasuk:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {pkg.deliverables.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#334155', fontWeight: '600' }}>
                        <FileCode2 size={15} style={{ color: 'var(--prussian-blue)', marginTop: '2px', flexShrink: 0 }} />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: pkg.includeDocs ? '#ECFDF5' : '#FFF9E6',
                    border: pkg.includeDocs ? '2px solid #10B981' : '2px solid #F59E0B',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    color: pkg.includeDocs ? '#065F46' : '#92400E',
                    fontWeight: '800'
                  }}>
                    {pkg.docsSummary}
                  </div>
                </div>

                <div style={{ padding: '16px 24px', borderTop: '2px solid #0F172A', marginTop: 'auto', background: '#F8FAFC' }}>
                  <Button
                    variant={pkg.number === 5 ? 'amber' : 'primary'}
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => handleChoosePackage(pkg.id)}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Pilih Paket Ini
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Comparative Matrix Table */}
          <div style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A', marginBottom: '8px' }}>
                Matriks Perbandingan Fitur Paket
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
                Perbandingan transparan seluruh parameter teknis, dokumen rekayasa, dan plafon biaya.
              </p>
            </div>

            <div style={{
              background: '#FFFFFF',
              border: '2px solid #0F172A',
              boxShadow: '4px 4px 0px #0F172A',
              borderRadius: 'var(--radius-md)',
              overflowX: 'auto'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '800px', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#F1F5F9', borderBottom: '2px solid #0F172A' }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left', color: '#0F172A', width: '22%', fontWeight: '900' }}>Parameter</th>
                    {PACKAGES.map(p => (
                      <th key={p.id} style={{ padding: '16px 14px', color: '#0F172A', fontWeight: '800' }}>
                        <div>Paket {p.number}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--prussian-blue)', fontWeight: '800' }}>{p.name.split(' ')[0]}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                      <td style={{ padding: '14px 20px', textAlign: 'left', fontWeight: '700', color: '#0F172A' }}>
                        {row.label}
                      </td>
                      {PACKAGES.map(p => (
                        <td key={p.id} style={{ padding: '14px 14px', color: '#1E293B' }}>
                          {row.render ? row.render(p) : p[row.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 10 Add-on Section */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '28px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A', marginBottom: '6px' }}>
                  10 Layanan Tambahan (Add-on Resmi)
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
                  Pilihan modul pelengkap untuk penyesuaian di luar paket standar.
                </p>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: '8px', background: '#FFFFFF', padding: '6px', borderRadius: '6px', border: '2px solid #0F172A', boxShadow: '2px 2px 0px #0F172A' }}>
                {['All', 'Document', 'Feature', 'Maintenance'].map((cat) => {
                  const isSelected = activeAddonFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveAddonFilter(cat)}
                      style={{
                        background: isSelected ? 'var(--prussian-blue)' : 'transparent',
                        color: isSelected ? '#FFFFFF' : '#475569',
                        border: isSelected ? '1.5px solid #0F172A' : 'none',
                        borderRadius: '4px',
                        padding: '6px 14px',
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {cat === 'All' ? 'Semua' : cat === 'Document' ? 'Dokumen IEEE' : cat === 'Feature' ? 'Modul Fitur' : 'Maintenance'}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr)),', gap: '20px', alignItems: 'start' }}>
              {filteredAddons.map((addon) => (
                <div key={addon.id} className="neo-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', alignSelf: 'start', background: '#FFFFFF', border: '2px solid #0F172A', boxShadow: '4px 4px 0px #0F172A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--prussian-blue)', fontWeight: '900' }}>#{addon.number}</span>
                    <span style={{ fontSize: '0.74rem', background: '#F1F5F9', border: '1.5px solid #0F172A', padding: '3px 8px', borderRadius: '4px', color: '#0F172A', fontWeight: '700' }}>
                      {addon.type}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#0F172A', marginBottom: '6px' }}>
                    {addon.name}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: '1.5', marginBottom: '14px', flex: 1 }}>
                    {addon.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '2px solid #E2E8F0' }}>
                    <span style={{ fontWeight: '900', color: 'var(--prussian-blue)', fontSize: '0.98rem' }}>
                      {addon.priceDisplay}
                    </span>
                    <Link to="/pesan" className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem', gap: '4px', padding: '6px 12px' }}>
                      <span>Minta via Brief</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
