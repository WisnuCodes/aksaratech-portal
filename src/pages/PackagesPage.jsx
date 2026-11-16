import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PACKAGES, ADDONS } from '../data/catalogData';
import { formatRupiah } from '../utils/documentEngine';
import PageHeader from '../components/molecules/PageHeader';
import Button from '../components/atoms/Button';
import InstantPriceEstimator from '../components/organisms/InstantPriceEstimator';
import { 
  Package, Clock, CheckCircle2, FileCode2, Shield, Layers, 
  ChevronRight, ChevronDown, ChevronUp, LayoutGrid, List
} from 'lucide-react';

export default function PackagesPage({ onSelectPackage }) {
  const navigate = useNavigate();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [activeAddonFilter, setActiveAddonFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [expandedListPkg, setExpandedListPkg] = useState({});

  const toggleExpandPkg = (pkgId) => {
    setExpandedListPkg(prev => ({
      ...prev,
      [pkgId]: !prev[pkgId]
    }));
  };

  const handleChoosePackage = (pkgId) => {
    if (onSelectPackage) {
      onSelectPackage(pkgId);
    }
    navigate('/pesan');
  };

  // Filter packages: All, Bisnis, Akademik
  const filteredPackages = PACKAGES.filter(p => {
    if (activeCategoryFilter === 'ALL') return true;
    if (activeCategoryFilter === 'BUSINESS') return [1, 2, 3, 4].includes(p.number);
    if (activeCategoryFilter === 'ACADEMIC') return [5, 6].includes(p.number);
    return true;
  });

  const filteredAddons = activeAddonFilter === 'All' 
    ? ADDONS 
    : ADDONS.filter(a => a.type === activeAddonFilter);

  // Comparison matrix items
  const comparisonRows = [
    { label: 'Tipe Sistem', key: 'systemType' },
    { label: 'Estimasi Pengerjaan', render: (p) => `${p.minDays}–${p.maxDays} Hari Kerja` },
    { 
      label: 'Rentang Tarif Resmi', 
      render: (p) => p.minPrice === p.maxPrice 
        ? `${formatRupiah(p.minPrice)} (Flat)` 
        : `${formatRupiah(p.minPrice)} – ${formatRupiah(p.maxPrice)}` 
    },
    { label: 'Jumlah Halaman', render: (p) => p.pages },
    { 
      label: 'Database Relasional & CRUD', 
      render: (p) => [2, 4, 5, 6].includes(p.number) ? (
        <span className="matrix-yes">
          <CheckCircle2 size={15} />
          <span>{p.number === 6 ? 'MySQL/Postgres' : 'MySQL & CRUD'}</span>
        </span>
      ) : (
        <span className="matrix-optional">Opsional via Add-on</span>
      )
    },
    { 
      label: 'Sistem Autentikasi / Login', 
      render: (p) => {
        if (p.number === 5) {
          return (
            <span className="matrix-yes">
              <CheckCircle2 size={15} />
              <span>Multi-Role (Kompleks)</span>
            </span>
          );
        }
        if (p.number === 6) {
          return (
            <span className="matrix-yes">
              <CheckCircle2 size={15} />
              <span>Bisa Multi-Role</span>
            </span>
          );
        }
        return <span className="matrix-optional">Opsional via Add-on</span>;
      }
    },
    { 
      label: 'Dokumen Rekayasa SRS & SDD', 
      render: (p) => p.includeDocs ? (
        <span className="matrix-yes">
          <CheckCircle2 size={15} />
          <span>Termasuk</span>
        </span>
      ) : (
        <span className="matrix-optional">Add-on</span>
      )
    },
    { 
      label: 'Pemodelan Diagram UML', 
      render: (p) => [2, 4, 5].includes(p.number) ? (
        <span className="matrix-yes">
          <CheckCircle2 size={15} />
          <span>Termasuk</span>
        </span>
      ) : (
        <span className="matrix-optional">Add-on</span>
      )
    },
    { 
      label: 'Garansi Bug & Error Kode', 
      render: () => (
        <span className="matrix-pill">1 Minggu (7 Hari)</span>
      ) 
    },
    { label: 'Kuota Revisi Maksimal', render: () => <span className="matrix-pill">3x Mutlak</span> },
    { label: 'Skema Pembayaran', render: () => <span className="matrix-payment">DP 50% / Pelunasan 50%</span> }
  ];

  return (
    <div className="packages-page" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <PageHeader
        breadcrumbs={[{ label: 'Katalog Paket & Layanan' }]}
        badge="Katalog Resmi Aksara Tech"
        badgeIcon={Package}
        title="Katalog 6 Paket"
        highlightText="Layanan Resmi"
        description="Seluruh paket dibangun dengan arsitektur teruji, fasilitas kuota revisi maksimal 3 kali mutlak, estimasi 1–10 hari kerja, dan plafon tarif transparan tanpa biaya tersembunyi (maks Rp 500.000)."
        action={
          <div className="pkg-header-actions">
            <a href="#kalkulator" className="btn btn-secondary page-header-cta pkg-hdr-btn" style={{ background: '#FFFFFF', color: '#0F172A', border: '1.5px solid #CBD5E1' }}>
              <span>Simulasi Anggaran</span>
            </a>
            <Link to="/pesan" className="btn btn-primary page-header-cta pkg-hdr-btn">
              <span>Isi Lembar Kebutuhan</span>
            </Link>
          </div>
        }
      />

      {/* Trust Proof Strip */}
      <div className="pkg-trust-strip">
        <div className="container">
          <div className="pkg-trust-items">
            <div className="pkg-trust-item">
              <CheckCircle2 size={14} style={{ color: "#0F172A", flexShrink: 0 }} />
              <span>6 Paket Spesifik &amp; Teruji</span>
            </div>
            <span className="pkg-trust-sep">•</span>
            <div className="pkg-trust-item">
              <CheckCircle2 size={14} style={{ color: "#0F172A", flexShrink: 0 }} />
              <span>Plafon Maks Rp 500.000</span>
            </div>
            <span className="pkg-trust-sep">•</span>
            <div className="pkg-trust-item">
              <CheckCircle2 size={14} style={{ color: "#0F172A", flexShrink: 0 }} />
              <span>Garansi Bug 1 Minggu</span>
            </div>
            <span className="pkg-trust-sep">•</span>
            <div className="pkg-trust-item">
              <CheckCircle2 size={14} style={{ color: "#0F172A", flexShrink: 0 }} />
              <span>Kuota 3x Revisi Mutlak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Packages Section */}
      <section className="section-padding" style={{ background: '#FFFFFF', borderBottom: 'none' }}>
        <div className="container">

          {/* Quick Segment Filter & View Switcher */}
          <div className="pkg-segment-bar">
            <div className="pkg-segment-info">
              <span className="pkg-segment-count">
                Menampilkan <strong>{filteredPackages.length}</strong> dari 6 Paket
              </span>
            </div>

            <div className="pkg-segment-controls">
              {/* Category Filter Tabs */}
              <div className="pkg-category-tabs">
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('ALL')}
                  className={`pkg-cat-btn ${activeCategoryFilter === 'ALL' ? 'active' : ''}`}
                >
                  <span>Semua ({PACKAGES.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('BUSINESS')}
                  className={`pkg-cat-btn ${activeCategoryFilter === 'BUSINESS' ? 'active' : ''}`}
                >
                  <span>Bisnis (4)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('ACADEMIC')}
                  className={`pkg-cat-btn ${activeCategoryFilter === 'ACADEMIC' ? 'active' : ''}`}
                >
                  <span>Akademik (2)</span>
                </button>
              </div>

              {/* View Switcher: Grid vs List */}
              <div className="pkg-view-switcher" role="radiogroup" aria-label="Mode Tampilan Katalog">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`pkg-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  aria-label="Tampilan Grid"
                  title="Tampilan Grid"
                >
                  <LayoutGrid size={15} />
                  <span className="view-btn-text">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`pkg-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  aria-label="Tampilan List"
                  title="Tampilan List"
                >
                  <List size={15} />
                  <span className="view-btn-text">List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Packages Section: Grid vs List */}
          {viewMode === 'grid' ? (
            <div className="pkg-cards-grid">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="neo-card pkg-card"
                >
                  {/* Card Header */}
                  <div className="pkg-card-head">
                    <div className="pkg-meta-row">
                      <div className="category-pill">
                        <span className="package-num">PAKET {pkg.number}</span>
                        <span className="divider">/</span>
                        <span className="cat-name">{pkg.category}</span>
                      </div>

                      {pkg.badge && (
                        <div className="badge badge-neutral">
                          <span>{pkg.badge}</span>
                        </div>
                      )}
                    </div>

                    <h2 className="pkg-card-title">{pkg.name}</h2>
                    <p className="pkg-card-desc">{pkg.description}</p>
                  </div>

                  {/* Price Box */}
                  <div className="pkg-price-box">
                    <div className="pkg-price-header">
                      <div className="pkg-price-label">Tarif Referensi Resmi</div>
                      <div className="pkg-price-value">
                        {pkg.minPrice === pkg.maxPrice ? (
                          <div className="pkg-price-flat">
                            <span className="pkg-amount">{formatRupiah(pkg.minPrice)}</span>
                            <span className="pkg-flat-tag">Tarif Tetap</span>
                          </div>
                        ) : (
                          <div className="pkg-price-range">
                            <span className="pkg-amount">{formatRupiah(pkg.minPrice)}</span>
                            <span className="pkg-sep">–</span>
                            <span className="pkg-amount">{formatRupiah(pkg.maxPrice)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pkg-meta-stack">
                      <div className="pkg-meta-item">
                        <Clock size={14} style={{ color: '#0F172A', flexShrink: 0 }} />
                        <span className="pkg-meta-text">Estimasi: <strong>{pkg.minDays}–{pkg.maxDays} Hari Kerja</strong></span>
                      </div>
                      <div className="pkg-meta-item">
                        <Layers size={14} style={{ color: '#0F172A', flexShrink: 0 }} />
                        <span className="pkg-meta-text">{pkg.pages}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="pkg-deliverables">
                    <div className="pkg-del-label">Deliverables Termasuk</div>
                    <div className="pkg-del-list">
                      {pkg.deliverables.map((d, i) => (
                        <div key={i} className="pkg-del-item">
                          <FileCode2 size={15} style={{ color: '#0F172A', marginTop: '2px', flexShrink: 0 }} />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Unified Specifications & Warranty Card */}
                    <div className="pkg-specs-summary-card">
                      <div className="pkg-spec-row">
                        <FileCode2 size={14} style={{ color: '#0F172A', flexShrink: 0, marginTop: '2px' }} />
                        <span>{pkg.docsSummary}</span>
                      </div>
                      <div className="pkg-spec-row">
                        <Shield size={14} style={{ color: '#0F172A', flexShrink: 0, marginTop: '2px' }} />
                        <span>Garansi Bug Kode 1 Minggu (7 Hari)</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="pkg-card-footer">
                    <Button
                      variant="primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => handleChoosePackage(pkg.id)}
                    >
                      Pilih Paket Ini
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pkg-cards-list">
              {filteredPackages.map((pkg) => {
                const isExpanded = !!expandedListPkg[pkg.id];
                const isAcademic = [5, 6].includes(pkg.number);
                return (
                  <div 
                    key={pkg.id} 
                    data-ui="true"
                    className={`pkg-list-row ${isAcademic ? 'academic-accent' : 'business-accent'}`}
                  >
                    <div className="pkg-row-top">
                      <div className="pkg-row-badges">
                        <span className="pkg-row-num">PAKET {pkg.number}</span>
                        <span className="pkg-row-cat">{pkg.category}</span>
                        {pkg.badge && (
                          <span className="pkg-row-tag">{pkg.badge}</span>
                        )}
                      </div>
                      <div className="pkg-row-timeline">
                        <Clock size={13} style={{ color: '#0F172A', flexShrink: 0 }} />
                        <span>{pkg.minDays}–{pkg.maxDays} Hari</span>
                      </div>
                    </div>

                    <div className="pkg-row-body">
                      <div className="pkg-row-main-info">
                        <h3 className="pkg-row-title">{pkg.name}</h3>
                        <p className="pkg-row-desc">{pkg.recommendedFor || pkg.description}</p>
                      </div>

                      <div className="pkg-row-chips">
                        <span className="pkg-row-chip">
                          <Layers size={12} style={{ color: '#0F172A', flexShrink: 0 }} />
                          <span>{pkg.pages}</span>
                        </span>
                        <span className="pkg-row-chip">
                          <FileCode2 size={12} style={{ color: '#0F172A', flexShrink: 0 }} />
                          <span>{pkg.docsSummary}</span>
                        </span>
                        <span className="pkg-row-chip">
                          <Shield size={12} style={{ color: '#0F172A', flexShrink: 0 }} />
                          <span>Garansi 1 Minggu</span>
                        </span>
                      </div>
                    </div>

                    {/* Deliverables Accordion */}
                    <div className="pkg-row-accordion">
                      <button
                        type="button"
                        className="pkg-row-toggle-btn"
                        onClick={() => toggleExpandPkg(pkg.id)}
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? 'Tutup Rincian' : `Lihat Rincian ${pkg.deliverables.length} Deliverables & Garansi`}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {isExpanded && (
                        <div className="pkg-row-expanded-panel">
                          <div className="pkg-row-del-list">
                            {pkg.deliverables.map((d, i) => (
                              <div key={i} className="pkg-row-del-item">
                                <CheckCircle2 size={14} style={{ color: '#0F172A', flexShrink: 0, marginTop: '2px' }} />
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pkg-row-del-note">
                            <span><strong>Dokumen:</strong> {pkg.docsSummary}</span> • <span><strong>Garansi:</strong> 1 Minggu + Kuota 3x Revisi</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price & CTA Action Bar */}
                    <div className="pkg-row-action-bar">
                      <div className="pkg-row-pricing">
                        <span className="pkg-row-price-label">Tarif Resmi</span>
                        <div className="pkg-row-price-val">
                          {pkg.minPrice === pkg.maxPrice ? (
                            <div className="pkg-price-flat">
                              <span className="pkg-row-amount">{formatRupiah(pkg.minPrice)}</span>
                              <span className="pkg-flat-tag">Tetap</span>
                            </div>
                          ) : (
                            <div className="pkg-price-range-sm">
                              <span className="pkg-row-amount">{formatRupiah(pkg.minPrice)}</span>
                              <span className="pkg-sep">–</span>
                              <span className="pkg-row-amount">{formatRupiah(pkg.maxPrice)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        className="pkg-row-btn"
                        onClick={() => handleChoosePackage(pkg.id)}
                      >
                        <span>Pilih Paket</span>
                        <ChevronRight size={14} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Comparative Matrix Section */}
          <div className="pkg-matrix-section">
            <div className="pkg-matrix-header">
              <h2 className="pkg-matrix-title">
                Matriks Perbandingan Fitur Paket
              </h2>
              <p className="pkg-matrix-desc">
                Perbandingan transparan seluruh parameter teknis, dokumen rekayasa, dan plafon biaya. Geser tabel ke samping pada layar HP.
              </p>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="matrix-mobile-hint">
              <span>Geser tabel ke samping untuk melihat seluruh Paket 1 s/d 6</span>
            </div>

            {/* Matrix Table with Sticky Parameter Column on Mobile */}
            <div className="pkg-matrix-table-wrap">
              <table className="pkg-matrix-table">
                <thead>
                  <tr>
                    <th className="matrix-th-label sticky-col">Parameter</th>
                    {PACKAGES.map(p => (
                      <th key={p.id} className="matrix-th-pkg">
                        <div className="matrix-pkg-num">Paket {p.number}</div>
                        <div className="matrix-th-name">{p.shortName || p.name.split(' ')[0]}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'matrix-row-even' : 'matrix-row-odd'}>
                      <td className="matrix-td-label sticky-col">{row.label}</td>
                      {PACKAGES.map(p => (
                        <td key={p.id} className="matrix-td-value">
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
          <div className="pkg-addons-section">
            <div className="pkg-addons-header">
              <div>
                <h2 className="pkg-addons-title">
                  10 Layanan Tambahan (Add-on Resmi)
                </h2>
                <p className="pkg-addons-desc">
                  Pilihan modul pelengkap untuk penyesuaian di luar paket standar.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="pkg-filter-tabs">
                {['All', 'Document', 'Feature', 'Maintenance'].map((cat) => {
                  const isSelected = activeAddonFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveAddonFilter(cat)}
                      className={`pkg-filter-btn ${isSelected ? 'active' : ''}`}
                    >
                      {cat === 'All' ? 'Semua' : cat === 'Document' ? 'Dokumen SRS/SDD' : cat === 'Feature' ? 'Modul Fitur' : 'Maintenance'}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pkg-addons-grid">
              {filteredAddons.map((addon) => (
                <div key={addon.id} className="neo-card pkg-addon-card">
                  <div className="addon-top-row">
                    <span className="addon-number">#{addon.number}</span>
                    <span className="addon-type-tag">{addon.type}</span>
                  </div>
                  <h3 className="addon-title">{addon.name}</h3>
                  <p className="addon-desc">{addon.description}</p>
                  <div className="addon-footer">
                    <span className="addon-price">{addon.priceDisplay}</span>
                    <Link to="/pesan" className="btn btn-secondary btn-sm addon-cta">
                      <span>Minta via Brief</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Instant Price Estimator Section */}
      <InstantPriceEstimator onSelectPackage={onSelectPackage} />

      {/* ── Embedded CSS ── */}
      <style>{`
        /* =======================================================
           TRUST STRIP (UNDER HEADER)
           ======================================================= */
        .pkg-trust-strip {
          background: #FFFFFF;
          padding: 12px 0;
          border-bottom: 1.5px solid #E2E8F0;
        }

        .pkg-trust-items {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
        }

        .pkg-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pkg-trust-sep {
          color: #CBD5E1;
        }

        .pkg-header-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* =======================================================
           SEGMENT FILTER BAR & VIEW SWITCHER
           ======================================================= */
        .pkg-segment-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 32px;
          padding-bottom: 18px;
        }

        .pkg-segment-count {
          font-size: 0.88rem;
          font-weight: 600;
          color: #475569;
        }

        .pkg-segment-count strong {
          color: #0F172A;
          font-weight: 800;
        }

        .pkg-segment-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .pkg-category-tabs {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F1F5F9;
          border: 1.5px solid #CBD5E1;
          padding: 3px;
          border-radius: 8px;
        }

        .pkg-cat-btn {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
        }

        .pkg-cat-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          border-color: #CBD5E1;
          font-weight: 800;
        }

        /* View Switcher: Grid vs List */
        .pkg-view-switcher {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          background: #F1F5F9;
          border: 1.5px solid #CBD5E1;
          border-radius: 8px;
          padding: 3px;
        }

        .pkg-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 11px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .pkg-view-btn:hover:not(.active) {
          color: #0F172A;
          background: #E2E8F0;
        }

        .pkg-view-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          border-color: #CBD5E1;
        }

        /* =======================================================
           PACKAGES GRID - EQUAL HEIGHT & CRISP ALIGNMENT
           ======================================================= */
        .pkg-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
          margin-bottom: 72px;
        }

        .pkg-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 0;
          overflow: hidden;
          position: relative;
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: var(--radius-md);
          transition: transform 0.18s ease, border-color 0.18s ease;
        }

        .pkg-card:hover {
          transform: translateY(-2px);
          border-color: #0F172A;
        }

        .pkg-card-head {
          padding: 22px 24px 18px;
          background: #FFFFFF;
          min-height: 268px;
          display: flex;
          flex-direction: column;
        }

        .pkg-meta-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
          min-height: 38px;
        }

        .pkg-card-title {
          font-size: 1.22rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
          line-height: 1.35;
          min-height: 64px;
          display: flex;
          align-items: flex-start;
        }

        .pkg-card-desc {
          font-size: 0.88rem;
          color: #475569;
          line-height: 1.55;
          min-height: 108px;
          margin-bottom: 0;
        }

        .pkg-price-box {
          padding: 18px 24px;
          background: #F8FAFC;
          min-height: 148px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 12px;
        }

        .pkg-price-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pkg-price-label {
          font-size: 0.74rem;
          color: #64748B;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .pkg-price-flat,
        .pkg-price-range {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pkg-amount {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--prussian-blue);
          letter-spacing: -0.02em;
        }

        .pkg-sep {
          font-size: 0.95rem;
          color: #94A3B8;
          font-weight: 400;
        }

        .pkg-flat-tag {
          font-size: 0.74rem;
          background: #F1F5F9;
          color: #0F172A;
          padding: 2px 8px;
          border-radius: 4px;
          border: 1.5px solid #CBD5E1;
          font-weight: 700;
        }

        .pkg-meta-stack {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pkg-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #334155;
        }

        .pkg-meta-text {
          line-height: 1.35;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pkg-meta-text strong {
          color: #0F172A;
          font-weight: 700;
        }

        .pkg-deliverables {
          padding: 22px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
        }

        .pkg-del-label {
          font-size: 0.78rem;
          color: #0F172A;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .pkg-del-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 165px;
          margin-bottom: 16px;
        }

        .pkg-del-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.84rem;
          color: #334155;
          line-height: 1.45;
          font-weight: 500;
        }

        .pkg-specs-summary-card {
          margin-top: auto;
          background: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: 8px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 82px;
          justify-content: center;
        }

        .pkg-spec-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #1E293B;
          line-height: 1.35;
        }

        .pkg-card-footer {
          padding: 16px 24px 24px;
          margin-top: auto;
          background: #FFFFFF;
        }

        /* =======================================================
           LIST VIEW MODE - EXECUTIVE TECHNICAL LEDGER
           ======================================================= */
        .pkg-cards-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 72px;
        }

        .pkg-list-row {
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: var(--radius-md);
          padding: 18px 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.18s ease, transform 0.18s ease;
        }

        .pkg-list-row.business-accent {
          border-left: 4px solid var(--prussian-blue);
        }

        .pkg-list-row.academic-accent {
          border-left: 4px solid #0F172A;
        }

        .pkg-list-row:hover {
          border-color: #0F172A;
          transform: translateY(-1px);
        }

        .pkg-row-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .pkg-row-badges {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pkg-row-num {
          font-size: 0.72rem;
          font-weight: 800;
          color: #FFFFFF;
          background: #0F172A;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: -0.01em;
        }

        .pkg-row-cat {
          font-size: 0.74rem;
          font-weight: 700;
          color: #475569;
        }

        .pkg-row-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #0F172A;
          background: #F1F5F9;
          border: 1.5px solid #CBD5E1;
          padding: 2px 7px;
          border-radius: 4px;
        }

        .pkg-row-timeline {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #1E293B;
          background: #F8FAFC;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .pkg-row-body {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .pkg-row-main-info {
          flex: 1;
          min-width: 0;
        }

        .pkg-row-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .pkg-row-desc {
          font-size: 0.84rem;
          color: #475569;
          line-height: 1.5;
          margin: 0;
          max-width: 720px;
        }

        .pkg-row-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          flex-shrink: 0;
        }

        .pkg-row-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #334155;
          background: #F8FAFC;
          border: 1.5px solid #CBD5E1;
          border-radius: 6px;
          padding: 4px 9px;
        }

        /* Accordion in list row */
        .pkg-row-accordion {
          display: flex;
          flex-direction: column;
        }

        .pkg-row-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          padding: 4px 0;
          color: var(--prussian-blue);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          align-self: flex-start;
          transition: color 0.15s ease;
        }

        .pkg-row-toggle-btn:hover {
          color: #0F172A;
          text-decoration: underline;
        }

        .pkg-row-expanded-panel {
          margin-top: 8px;
          padding: 12px 14px;
          background: #F8FAFC;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pkg-row-del-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pkg-row-del-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.82rem;
          color: #334155;
          line-height: 1.4;
        }

        .pkg-row-del-note {
          padding-top: 6px;
          font-size: 0.76rem;
          color: #64748B;
        }

        /* Action bar: Price + CTA */
        .pkg-row-action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 12px 16px;
          background: #F8FAFC;
          border-radius: 8px;
        }

        .pkg-row-pricing {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }

        .pkg-row-price-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748B;
        }

        .pkg-row-amount {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--prussian-blue);
          letter-spacing: -0.02em;
        }

        .pkg-row-btn {
          min-height: 40px;
          padding: 8px 18px;
          font-size: 0.88rem;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* =======================================================
           COMPARISON MATRIX TABLE (STICKY LEFT COL ON MOBILE)
           ======================================================= */
        .pkg-matrix-section {
          margin-bottom: 80px;
        }

        .pkg-matrix-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .pkg-matrix-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
          line-height: 1.25;
        }

        .pkg-matrix-desc {
          font-size: 0.95rem;
          color: #64748B;
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .matrix-mobile-hint {
          display: none;
          text-align: center;
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
          background: #F1F5F9;
          border: 1.5px solid #CBD5E1;
          border-radius: 6px;
          padding: 6px 12px;
          margin-bottom: 12px;
        }

        .pkg-matrix-table-wrap {
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: var(--radius-md);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .pkg-matrix-table {
          width: 100%;
          border-collapse: collapse;
          text-align: center;
          min-width: 820px;
          font-size: 0.88rem;
        }

        table.pkg-matrix-table thead tr {
          background: #F8FAFC;
        }

        .matrix-th-label {
          padding: 16px 20px;
          text-align: left;
          color: #0F172A;
          width: 22%;
          font-weight: 800;
        }

        .matrix-th-pkg {
          padding: 16px 14px;
          color: #0F172A;
          font-weight: 800;
          min-width: 130px;
        }

        .matrix-pkg-num {
          font-size: 0.9rem;
          font-weight: 800;
        }

        .matrix-th-name {
          font-size: 0.78rem;
          color: var(--prussian-blue);
          font-weight: 700;
        }

        .matrix-row-even { background: #FFFFFF; }
        .matrix-row-odd { background: #F8FAFC; }

        td.matrix-td-label {
          padding: 14px 20px;
          text-align: left;
          font-weight: 700;
          color: #0F172A;
        }

        td.matrix-td-value {
          padding: 14px 14px;
          color: #1E293B;
        }

        .matrix-yes {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: #0F172A;
          font-weight: 700;
        }

        .matrix-yes svg {
          color: #0F172A;
        }

        .matrix-optional {
          font-size: 0.8rem;
          color: #64748B;
          font-weight: 500;
        }

        .matrix-pill {
          background: #F1F5F9;
          color: #0F172A;
          padding: 3px 10px;
          border-radius: 4px;
          border: 1.5px solid #CBD5E1;
          font-weight: 700;
          font-size: 0.8rem;
          display: inline-block;
        }

        .matrix-payment {
          font-size: 0.82rem;
          font-weight: 700;
          color: #0F172A;
        }

        /* Sticky Left Column for Mobile Matrix */
        @media (max-width: 1023px) {
          .sticky-col {
            position: sticky;
            left: 0;
            background: #FFFFFF;
            z-index: 2;
          }
          thead tr .sticky-col {
            background: #F8FAFC;
            z-index: 3;
          }
          .matrix-row-odd .sticky-col {
            background: #F8FAFC;
          }
          .matrix-mobile-hint {
            display: block;
          }
        }

        /* =======================================================
           ADD-ONS SECTION
           ======================================================= */
        .pkg-addons-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
        }

        .pkg-addons-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
          line-height: 1.25;
        }

        .pkg-addons-desc {
          font-size: 0.95rem;
          color: #64748B;
        }

        .pkg-filter-tabs {
          display: flex;
          gap: 6px;
          background: #FFFFFF;
          padding: 4px;
          border-radius: 6px;
          border: 1.5px solid #CBD5E1;
          flex-wrap: wrap;
        }

        .pkg-filter-btn {
          background: transparent;
          color: #475569;
          border: 1px solid transparent;
          border-radius: 4px;
          padding: 6px 14px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }

        .pkg-filter-btn.active {
          background: var(--prussian-blue);
          color: #FFFFFF;
          border-color: var(--prussian-blue);
          font-weight: 700;
        }

        .pkg-filter-btn:hover:not(.active) {
          background: #F1F5F9;
        }

        .pkg-addons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          align-items: stretch;
        }

        .pkg-addon-card {
          padding: 22px;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: var(--radius-md);
          transition: transform 0.18s ease, border-color 0.18s ease;
        }

        .pkg-addon-card:hover {
          transform: translateY(-2px);
          border-color: #0F172A;
        }

        .addon-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .addon-number {
          font-size: 0.78rem;
          color: var(--prussian-blue);
          font-weight: 800;
        }

        .addon-type-tag {
          font-size: 0.74rem;
          background: #F1F5F9;
          border: 1.5px solid #CBD5E1;
          padding: 2px 8px;
          border-radius: 4px;
          color: #0F172A;
          font-weight: 600;
        }

        .addon-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
          line-height: 1.35;
        }

        .addon-desc {
          font-size: 0.88rem;
          color: #475569;
          line-height: 1.55;
          margin-bottom: 16px;
          flex: 1;
        }

        .addon-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          gap: 10px;
          margin-top: auto;
        }

        .addon-price {
          font-weight: 800;
          color: var(--prussian-blue);
          font-size: 0.98rem;
        }

        .addon-cta {
          font-size: 0.82rem;
          padding: 6px 14px;
        }

        /* =======================================================
           TABLET RESPONSIVENESS (max-width: 1023px)
           ======================================================= */
        @media (max-width: 1023px) {
          .pkg-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .pkg-matrix-title,
          .pkg-addons-title {
            font-size: 1.5rem;
          }
        }

        /* =======================================================
           MOBILE RESPONSIVENESS (max-width: 640px)
           ======================================================= */
        @media (max-width: 640px) {
          .pkg-header-actions {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }

          .pkg-hdr-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            min-height: 48px !important;
            border-radius: 8px !important;
            font-size: 0.94rem !important;
          }

          .pkg-trust-strip {
            padding: 10px 0;
          }

          .pkg-trust-items {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
            font-size: 0.72rem;
          }

          .pkg-trust-sep {
            display: none;
          }

          .pkg-trust-item {
            background: #FFFFFF;
            border: 1.5px solid #CBD5E1;
            padding: 6px 8px;
            border-radius: 8px;
            justify-content: center;
            text-align: center;
            min-height: 36px;
          }

          .pkg-segment-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-bottom: 20px;
            padding-bottom: 14px;
          }

          .pkg-segment-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            width: 100%;
          }

          .pkg-category-tabs {
            flex: 1;
            min-width: 0;
            display: flex;
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding: 3px;
            gap: 4px;
          }

          .pkg-category-tabs::-webkit-scrollbar {
            display: none;
          }

          .pkg-cat-btn {
            flex: 1;
            padding: 7px 8px;
            font-size: 0.76rem;
            text-align: center;
            white-space: nowrap;
          }

          .pkg-view-switcher {
            flex-shrink: 0;
            padding: 2px;
          }

          .view-btn-text {
            display: inline-block;
            font-size: 0.74rem;
            font-weight: 700;
          }

          .pkg-view-btn {
            padding: 6px 9px;
            gap: 4px;
            font-size: 0.76rem;
          }

          .pkg-view-btn.active {
            background: #0F172A;
            color: #FFFFFF;
            border-color: #0F172A;
          }

          /* Grid View on Mobile: True 2-Column Responsive Symmetrical Grid */
          .pkg-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            margin-bottom: 48px !important;
            align-items: stretch !important;
          }

          .pkg-card {
            border-radius: 10px !important;
            display: flex !important;
            flex-direction: column !important;
          }

          .pkg-card-head {
            padding: 12px 10px 8px !important;
            min-height: auto !important;
          }

          .pkg-meta-row {
            margin-bottom: 6px !important;
            min-height: auto !important;
            gap: 4px !important;
          }

          .category-pill {
            font-size: 0.65rem !important;
            padding: 2px 6px !important;
          }

          .category-pill .divider,
          .category-pill .cat-name {
            display: none !important;
          }

          .pkg-card-title {
            font-size: 0.88rem !important;
            line-height: 1.25 !important;
            min-height: 38px !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            margin-bottom: 0 !important;
          }

          .pkg-card-desc {
            display: none !important;
          }

          .pkg-price-box {
            padding: 8px 10px !important;
            min-height: auto !important;
            gap: 4px !important;
          }

          .pkg-price-label {
            font-size: 0.68rem !important;
          }

          .pkg-amount {
            font-size: 1.05rem !important;
            letter-spacing: -0.02em !important;
          }

          .pkg-sep {
            font-size: 0.8rem !important;
          }

          .pkg-flat-tag {
            font-size: 0.68rem !important;
            padding: 1px 5px !important;
          }

          .pkg-meta-stack {
            gap: 3px !important;
          }

          .pkg-meta-item {
            font-size: 0.7rem !important;
            gap: 5px !important;
          }

          .pkg-deliverables {
            padding: 8px 10px !important;
            flex: 1 !important;
          }

          .pkg-del-label {
            font-size: 0.7rem !important;
            margin-bottom: 6px !important;
          }

          .pkg-del-list {
            min-height: auto !important;
            gap: 5px !important;
            margin-bottom: 6px !important;
          }

          .pkg-del-item {
            font-size: 0.7rem !important;
            line-height: 1.25 !important;
            gap: 5px !important;
          }

          .pkg-del-item:nth-child(n+3) {
            display: none !important;
          }

          .pkg-specs-summary-card {
            padding: 6px 8px !important;
            min-height: auto !important;
            gap: 4px !important;
            margin-top: 4px !important;
          }

          .pkg-spec-row {
            font-size: 0.68rem !important;
            line-height: 1.2 !important;
            gap: 5px !important;
          }

          .pkg-card-footer {
            padding: 6px 10px 12px !important;
            margin-top: auto !important;
          }

          .pkg-card-footer .btn {
            min-height: 40px !important;
            padding: 8px 6px !important;
            font-size: 0.82rem !important;
            border-radius: 6px !important;
            width: 100% !important;
            justify-content: center !important;
          }

          /* List View on Mobile: Executive Compact Ledger Row */
          .pkg-cards-list {
            gap: 10px !important;
            margin-bottom: 48px !important;
          }

          .pkg-list-row {
            padding: 12px 14px !important;
            gap: 10px !important;
            border-radius: 10px !important;
          }

          .pkg-row-top {
            gap: 6px !important;
          }

          .pkg-row-title {
            font-size: 1rem !important;
            line-height: 1.25 !important;
            margin-bottom: 2px !important;
          }

          .pkg-row-desc {
            font-size: 0.78rem !important;
            line-height: 1.45 !important;
            color: #475569 !important;
          }

          .pkg-row-body {
            flex-direction: column !important;
            gap: 8px !important;
          }

          .pkg-row-chips {
            gap: 5px !important;
          }

          .pkg-row-chip {
            font-size: 0.7rem !important;
            padding: 3px 7px !important;
          }

          .pkg-row-toggle-btn {
            font-size: 0.76rem !important;
            padding: 6px 8px !important;
            background: #F1F5F9 !important;
            border-radius: 6px !important;
            width: 100% !important;
            justify-content: space-between !important;
            color: #0F172A !important;
          }

          .pkg-row-action-bar {
            padding: 10px 12px !important;
            gap: 10px !important;
          }

          .pkg-row-amount {
            font-size: 1.15rem !important;
          }

          .pkg-row-btn {
            min-height: 38px !important;
            padding: 6px 14px !important;
            font-size: 0.84rem !important;
          }

          /* Comparison Matrix Table on Mobile */
          .pkg-matrix-section {
            margin-bottom: 48px;
          }

          .pkg-matrix-title {
            font-size: 1.3rem;
          }

          .pkg-matrix-desc {
            font-size: 0.84rem;
          }

          .matrix-th-label {
            width: 130px;
            min-width: 130px;
            padding: 12px 10px;
            font-size: 0.78rem;
          }

          .matrix-td-label {
            padding: 12px 10px;
            font-size: 0.78rem;
            width: 130px;
            min-width: 130px;
          }

          .matrix-th-pkg {
            min-width: 100px;
            padding: 12px 8px;
          }

          .matrix-td-value {
            padding: 12px 8px;
            font-size: 0.78rem;
          }

          /* Add-ons mobile */
          .pkg-addons-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-bottom: 18px;
          }

          .pkg-addons-title {
            font-size: 1.3rem;
          }

          .pkg-addons-desc {
            font-size: 0.84rem;
          }

          .pkg-filter-tabs {
            width: 100%;
            overflow-x: auto;
            flex-wrap: nowrap;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding: 3px;
            gap: 4px;
          }

          .pkg-filter-tabs::-webkit-scrollbar {
            display: none;
          }

          .pkg-filter-btn {
            flex: 0 0 auto;
            padding: 6px 10px;
            font-size: 0.76rem;
            border-radius: 6px;
          }

          .pkg-addons-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .pkg-addon-card {
            padding: 16px;
            border: 1.5px solid #CBD5E1;
            border-radius: 10px;
          }

          .addon-title {
            font-size: 1rem;
          }

          .addon-desc {
            font-size: 0.82rem;
            line-height: 1.5;
            margin-bottom: 12px;
          }

          .addon-footer {
            padding-top: 12px;
          }

          .addon-price {
            font-size: 0.94rem;
          }

          .addon-cta {
            min-height: 40px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            font-size: 0.82rem;
            border-radius: 6px;
          }
        }
      `}</style>
    </div>
  );
}
