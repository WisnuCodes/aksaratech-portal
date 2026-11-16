import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  MessageCircle, 
  Plus, 
  Minus,
  Check,
  ChevronRight
} from 'lucide-react';
import { PACKAGES, ADDONS, BUSINESS_INFO } from '../../data/catalogData';
import { formatRupiah } from '../../utils/documentEngine';

export default function InstantPriceEstimator({ onSelectPackage, className = '' }) {
  const navigate = useNavigate();

  // State
  const [selectedPkgId, setSelectedPkgId] = useState('umkm-katalog');
  const [selectedAddonIds, setSelectedAddonIds] = useState(['addon-mysql-crud']);
  const [packageFilter, setPackageFilter] = useState('ALL'); // ALL, BUSINESS, ACADEMIC
  const [addonFilter, setAddonFilter] = useState('ALL'); // ALL, Feature, Document, Maintenance
  const [pageCount, setPageCount] = useState(2); // for addon-new-page (Rp 35.000 / hal)
  const [maintenanceDays, setMaintenanceDays] = useState(3); // for addon-maintenance-daily (Rp 50.000 / hari)

  // Filtered packages
  const displayedPackages = useMemo(() => {
    if (packageFilter === 'BUSINESS') return PACKAGES.filter(p => [1, 2, 3, 4].includes(p.number));
    if (packageFilter === 'ACADEMIC') return PACKAGES.filter(p => [5, 6].includes(p.number));
    return PACKAGES;
  }, [packageFilter]);

  // Selected package object
  const activePackage = useMemo(() => {
    return PACKAGES.find(p => p.id === selectedPkgId) || PACKAGES[0];
  }, [selectedPkgId]);

  // Filtered addons
  const displayedAddons = useMemo(() => {
    if (addonFilter === 'ALL') return ADDONS;
    return ADDONS.filter(a => a.type === addonFilter);
  }, [addonFilter]);

  // Toggle addon
  const toggleAddon = (id) => {
    setSelectedAddonIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const calculations = useMemo(() => {
    const basePrice = activePackage.minPrice || 0;
    
    let addonsTotal = 0;
    const itemizedAddons = [];

    selectedAddonIds.forEach(id => {
      const addon = ADDONS.find(a => a.id === id);
      if (!addon) return;

      let itemPrice = addon.minPrice;
      let qtyLabel = '';

      if (id === 'addon-new-page') {
        itemPrice = addon.minPrice * pageCount;
        qtyLabel = ` (${pageCount} halaman)`;
      } else if (id === 'addon-maintenance-daily') {
        itemPrice = addon.minPrice * maintenanceDays;
        qtyLabel = ` (${maintenanceDays} hari)`;
      }

      addonsTotal += itemPrice;
      itemizedAddons.push({
        ...addon,
        finalPrice: itemPrice,
        qtyLabel
      });
    });

    const grandTotal = basePrice + addonsTotal;
    const dpAmount = Math.round(grandTotal / 2);
    const finalPayment = grandTotal - dpAmount;

    // Timeline estimation
    let extraDays = 0;
    if (selectedAddonIds.includes('addon-payment-gateway')) extraDays += 2;
    if (selectedAddonIds.includes('addon-auth-multi-role')) extraDays += 1;
    if (selectedAddonIds.includes('addon-srs-sdd')) extraDays += 1;
    if (selectedAddonIds.includes('addon-maintenance-daily')) extraDays += maintenanceDays;

    const minDays = activePackage.minDays;
    const maxDays = activePackage.maxDays + extraDays;

    return {
      basePrice,
      addonsTotal,
      grandTotal,
      dpAmount,
      finalPayment,
      itemizedAddons,
      minDays,
      maxDays
    };
  }, [activePackage, selectedAddonIds, pageCount, maintenanceDays]);

  // Reset simulator
  const handleReset = () => {
    setSelectedPkgId('umkm-katalog');
    setSelectedAddonIds([]);
    setPageCount(2);
    setMaintenanceDays(3);
  };

  // WhatsApp click handler
  const handleSendToWhatsApp = () => {
    const addonsListText = calculations.itemizedAddons.length > 0
      ? calculations.itemizedAddons.map((a, idx) => `  ${idx + 1}. ${a.name}${a.qtyLabel} : ${formatRupiah(a.finalPrice)}`).join('\n')
      : '  (Tanpa modul add-on tambahan)';

    const text = `*SIMULASI PENAWARAN BIAYA WEBSITE — AKSARA TECH*
Tanggal: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}

*1. Rincian Paket Utama:*
- Paket: *${activePackage.name}*
- Kategori: ${activePackage.category}
- Biaya Pokok: ${formatRupiah(calculations.basePrice)}
- Estimasi Paket: ${activePackage.minDays}–${activePackage.maxDays} Hari Kerja

*2. Layanan Add-on Tambahan:*
${addonsListText}

*3. Rekapitulasi Investasi:*
- Total Biaya: *${formatRupiah(calculations.grandTotal)}*
- Termin 1 (DP 50% Mulai Kerja): *${formatRupiah(calculations.dpAmount)}*
- Termin 2 (Pelunasan 50% Serah Terima): *${formatRupiah(calculations.finalPayment)}*
- Estimasi Timeline Total: *${calculations.minDays} – ${calculations.maxDays} Hari Kerja*

*4. Jaminan Layanan:*
- 100% Full Ownership Master Source Code & Database .sql
- Garansi Bebas Bug Kode 1 Minggu (7 Hari)
- Kuota Revisi Maksimal 3x Sesi Mutlak

Halo Tim Aksara Tech, saya ingin konsultasi terkait simulasi ini dan memastikan ketersediaan slot pengerjaan. Mohon informasinya. Terima kasih!`;

    const encoded = encodeURIComponent(text);
    const phone = BUSINESS_INFO.phone || '085600386692';
    const cleanPhone = phone.replace(/^0/, '62');
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  // Navigate to /pesan with prefilled state
  const handleProceedToOrder = () => {
    try {
      const existing = localStorage.getItem('aksara_order_brief_v1');
      let parsed = existing ? JSON.parse(existing) : {};
      parsed.selectedPackageId = activePackage.id;
      parsed.selectedAddonIds = selectedAddonIds;
      localStorage.setItem('aksara_order_brief_v1', JSON.stringify(parsed));
    } catch (e) {
      // LocalStorage fallback handled silently
    }

    if (onSelectPackage) {
      onSelectPackage(activePackage.id);
    }
    navigate('/pesan');
  };

  return (
    <section id="kalkulator" className={`estimator-section ${className}`}>
      <div className="estimator-container">
        
        {/* Section Headline */}
        <div className="estimator-header">
          <h2 className="estimator-title">
            Kalkulator Biaya &amp; Estimasi Pengerjaan Instan
          </h2>
          <p className="estimator-subtitle">
            Simulasi anggaran transparan untuk 6 paket dan 10 modul add-on. Pilih kombinasi yang Anda butuhkan untuk melihat pembagian termin DP 50% serta estimasi jadwal pengerjaan tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Main Grid: Left Controls (Selection) vs Right Panel (Sticky Summary) */}
        <div className="estimator-layout">
          
          {/* LEFT COLUMN: Controls */}
          <div className="estimator-controls">
            
            {/* Step 1: Package Selection Box */}
            <div className="estimator-box">
              <div className="estimator-box-header">
                <div className="estimator-box-title-group">
                  <h3 className="estimator-box-title">
                    1. Pilih Fondasi Paket Utama
                  </h3>
                  <p className="estimator-box-desc">
                    Tentukan fondasi arsitektur sistem yang ingin Anda bangun.
                  </p>
                </div>

                {/* Filter Tabs Package */}
                <div className="estimator-segmented-tabs" role="tablist" aria-label="Filter Paket">
                  {[
                    { id: 'ALL', label: 'Semua (6)' },
                    { id: 'BUSINESS', label: 'Bisnis & UMKM' },
                    { id: 'ACADEMIC', label: 'Tugas Kuliah' }
                  ].map(tab => {
                    const isActive = packageFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setPackageFilter(tab.id)}
                        className={`estimator-tab-btn ${isActive ? 'active' : ''}`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Selection Cards */}
              <div className="estimator-pkg-grid">
                {displayedPackages.map(pkg => {
                  const isSelected = selectedPkgId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPkgId(pkg.id); }}
                      className={`estimator-pkg-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="estimator-pkg-card-top">
                        <div className="estimator-pkg-meta-row">
                          <span className="estimator-pkg-category">
                            {pkg.category}
                          </span>
                          <span className={`estimator-pkg-radio ${isSelected ? 'checked' : ''}`}>
                            {isSelected && <span className="estimator-pkg-radio-dot" />}
                          </span>
                        </div>
                        <h4 className="estimator-pkg-name">
                          {pkg.name}
                        </h4>
                        <div className="estimator-pkg-scope">
                          {pkg.pages}
                        </div>
                      </div>

                      <div className="estimator-pkg-card-bottom">
                        <div>
                          <div className="estimator-pkg-rate-label">Tarif Resmi:</div>
                          <div className={`estimator-pkg-rate-value ${isSelected ? 'selected' : ''}`}>
                            {formatRupiah(pkg.minPrice)}
                          </div>
                        </div>
                        <div className="estimator-pkg-duration">
                          <Clock size={14} color="#0F172A" />
                          <span>{pkg.minDays}–{pkg.maxDays} Hari</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-on Selection Box */}
            <div className="estimator-box">
              <div className="estimator-box-header">
                <div className="estimator-box-title-group">
                  <h3 className="estimator-box-title">
                    2. Modul Tambahan &amp; Fitur Ekstra (Opsional)
                  </h3>
                  <p className="estimator-box-desc">
                    Sesuaikan kebutuhan spesifik. Modul akan diintegrasikan langsung ke dalam arsitektur utama.
                  </p>
                </div>

                {/* Filter Tabs Addon */}
                <div className="estimator-segmented-tabs" role="tablist" aria-label="Filter Modul Add-on">
                  {[
                    { id: 'ALL', label: 'Semua (10)' },
                    { id: 'Feature', label: 'Fitur' },
                    { id: 'Document', label: 'Dokumen' },
                    { id: 'Maintenance', label: 'Maintenance' }
                  ].map(tab => {
                    const isActive = addonFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setAddonFilter(tab.id)}
                        className={`estimator-tab-btn ${isActive ? 'active' : ''}`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Addons List */}
              <div className="estimator-addon-list">
                {displayedAddons.map(addon => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  const isUnitPage = addon.id === 'addon-new-page';
                  const isUnitMaintenance = addon.id === 'addon-maintenance-daily';

                  return (
                    <div
                      key={addon.id}
                      className={`estimator-addon-card ${isChecked ? 'selected' : ''}`}
                    >
                      {/* Addon Main Row */}
                      <div 
                        className="estimator-addon-clickable"
                        onClick={() => toggleAddon(addon.id)}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleAddon(addon.id); }}
                      >
                        <div className="estimator-addon-checkbox-wrap">
                          <span className={`estimator-addon-checkbox ${isChecked ? 'checked' : ''}`}>
                            {isChecked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                          </span>
                        </div>
                        
                        <div className="estimator-addon-info">
                          <div className="estimator-addon-headline-row">
                            <h4 className="estimator-addon-name">{addon.name}</h4>
                            <div className="estimator-addon-price-tag">
                              {addon.priceDisplay}
                            </div>
                          </div>
                          
                          <p className="estimator-addon-desc">
                            {addon.description}
                          </p>
                          
                          <div className="estimator-addon-meta">
                            <span className="estimator-addon-complexity">{addon.complexity}</span>
                            <span className="estimator-addon-type">{addon.type}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper for addon-new-page */}
                      {isChecked && isUnitPage && (
                        <div className="estimator-stepper-box">
                          <span className="estimator-stepper-label">Jumlah Tambahan Halaman:</span>
                          <div className="estimator-stepper-controls">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setPageCount(prev => Math.max(1, prev - 1)); }}
                              className="estimator-stepper-btn"
                              aria-label="Kurang halaman"
                            >
                              <Minus size={15} color="#0F172A" />
                            </button>
                            <span className="estimator-stepper-val">
                              {pageCount} hal
                            </span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setPageCount(prev => Math.min(10, prev + 1)); }}
                              className="estimator-stepper-btn"
                              aria-label="Tambah halaman"
                            >
                              <Plus size={15} color="#0F172A" />
                            </button>
                            <span className="estimator-stepper-subtotal">
                              (= {formatRupiah(addon.minPrice * pageCount)})
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Quantity Stepper for addon-maintenance-daily */}
                      {isChecked && isUnitMaintenance && (
                        <div className="estimator-stepper-box">
                          <span className="estimator-stepper-label">Durasi Maintenance Tambahan:</span>
                          <div className="estimator-stepper-controls">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setMaintenanceDays(prev => Math.max(1, prev - 1)); }}
                              className="estimator-stepper-btn"
                              aria-label="Kurang hari maintenance"
                            >
                              <Minus size={15} color="#0F172A" />
                            </button>
                            <span className="estimator-stepper-val">
                              {maintenanceDays} hari
                            </span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setMaintenanceDays(prev => Math.min(14, prev + 1)); }}
                              className="estimator-stepper-btn"
                              aria-label="Tambah hari maintenance"
                            >
                              <Plus size={15} color="#0F172A" />
                            </button>
                            <span className="estimator-stepper-subtotal">
                              (= {formatRupiah(addon.minPrice * maintenanceDays)})
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Real-Time Summary Card */}
          <div className="estimator-summary-col">
            <div className="estimator-summary-card">
              
              {/* Summary Header */}
              <div className="estimator-summary-header">
                <div>
                  <h3 className="estimator-summary-title">
                    Rincian Kalkulasi Investasi
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="estimator-reset-btn"
                  title="Kembalikan kalkulator ke kondisi awal"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              </div>

              {/* Itemized Breakdown */}
              <div className="estimator-breakdown-list">
                
                {/* Active Package Row */}
                <div className="estimator-breakdown-pkg">
                  <div className="estimator-breakdown-pkg-row">
                    <span className="estimator-breakdown-name">{activePackage.name}</span>
                    <span className="estimator-breakdown-price">{formatRupiah(calculations.basePrice)}</span>
                  </div>
                  <div className="estimator-breakdown-subtext">
                    {activePackage.category} &bull; {activePackage.pages}
                  </div>
                </div>

                {/* Selected Addons */}
                {calculations.itemizedAddons.length > 0 ? (
                  <div className="estimator-breakdown-addons">
                    <div className="estimator-breakdown-addons-title">
                      Modul Tambahan Terpilih ({calculations.itemizedAddons.length}):
                    </div>
                    {calculations.itemizedAddons.map(a => (
                      <div key={a.id} className="estimator-addon-item-row">
                        <span className="estimator-addon-item-name">+ {a.name}{a.qtyLabel}</span>
                        <span className="estimator-addon-item-val">{formatRupiah(a.finalPrice)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="estimator-empty-addon-note">
                    Belum ada modul add-on tambahan yang dipilih.
                  </div>
                )}

                {/* Duration Line */}
                <div className="estimator-duration-row">
                  <span className="estimator-duration-label">
                    <Clock size={16} color="#0F172A" />
                    <span>Estimasi Durasi Kerja</span>
                  </span>
                  <span className="estimator-duration-value">
                    {calculations.minDays} – {calculations.maxDays} Hari Kerja
                  </span>
                </div>
              </div>

              {/* Total Box */}
              <div className="estimator-total-box">
                <div className="estimator-total-row">
                  <span className="estimator-total-label">Total Investasi Bersih:</span>
                  <span className="estimator-total-value">
                    {formatRupiah(calculations.grandTotal)}
                  </span>
                </div>

                {/* 50:50 Milestone split */}
                <div className="estimator-milestone-grid">
                  <div className="estimator-milestone-item">
                    <div className="estimator-milestone-tag">Termin 1 (DP 50%)</div>
                    <div className="estimator-milestone-amt">{formatRupiah(calculations.dpAmount)}</div>
                    <div className="estimator-milestone-sub">Saat pengerjaan dimulai</div>
                  </div>
                  <div className="estimator-milestone-item">
                    <div className="estimator-milestone-tag">Termin 2 (Pelunasan 50%)</div>
                    <div className="estimator-milestone-amt">{formatRupiah(calculations.finalPayment)}</div>
                    <div className="estimator-milestone-sub">Setelah lolos uji fungsi</div>
                  </div>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="estimator-guarantees-list">
                <div className="estimator-guarantee-item">
                  <CheckCircle2 size={16} color="#0F172A" className="estimator-guarantee-icon" />
                  <span>100% Hak Milik Master Source Code &amp; .sql</span>
                </div>
                <div className="estimator-guarantee-item">
                  <CheckCircle2 size={16} color="#0F172A" className="estimator-guarantee-icon" />
                  <span>Garansi Bebas Bug Kode 1 Minggu (7 Hari)</span>
                </div>
                <div className="estimator-guarantee-item">
                  <CheckCircle2 size={16} color="#0F172A" className="estimator-guarantee-icon" />
                  <span>Fasilitas Kuota Revisi Maksimal 3x Sesi Mutlak</span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="estimator-actions-stack">
                {/* Send to WhatsApp Button */}
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="estimator-btn-wa"
                >
                  <MessageCircle size={18} color="#25D366" />
                  <span>Kirim Rincian ke WhatsApp</span>
                </button>

                {/* Continue to Order Brief Form */}
                <button
                  type="button"
                  onClick={handleProceedToOrder}
                  className="estimator-btn-order"
                >
                  <span>Lanjut ke Formulir Pemesanan</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="estimator-legal-footnote">
                *Tarif resmi mengikat setelah penerbitan Surat Penawaran (Quotation) resmi oleh Aksara Tech.
              </div>

            </div>
          </div>

        </div>

      </div>

      <style>{`
        /* Core Section & Layout */
        .estimator-section {
          background-color: #FFFFFF;
          padding: 72px 0;
          color: #0F172A;
        }
        .estimator-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .estimator-header {
          margin-bottom: 36px;
          text-align: left;
        }
        .estimator-title {
          font-size: clamp(1.5rem, 3.2vw, 2.2rem);
          font-weight: 900;
          color: #0F172A;
          letter-spacing: -0.025em;
          margin: 0 0 12px 0;
          line-height: 1.25;
        }
        .estimator-subtitle {
          font-size: 1.02rem;
          color: #334155;
          max-width: 820px;
          margin: 0;
          line-height: 1.6;
        }
        .estimator-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(320px, 1fr);
          gap: 32px;
          align-items: start;
        }
        .estimator-controls {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Step Card Boxes */
        .estimator-box {
          background-color: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          padding: 24px;
        }
        .estimator-box-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 20px;
        }
        .estimator-box-title-group {
          flex: 1 1 280px;
        }
        .estimator-box-title {
          font-size: 1.18rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }
        .estimator-box-desc {
          font-size: 0.88rem;
          color: #475569;
          margin: 0;
          line-height: 1.45;
        }

        /* Segmented Tabs Control */
        .estimator-segmented-tabs {
          display: inline-flex;
          background-color: #E2E8F0;
          padding: 3px;
          border-radius: 8px;
          gap: 2px;
        }
        .estimator-tab-btn {
          background: transparent;
          color: #334155;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 6px 14px;
          border: 1.5px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .estimator-tab-btn.active {
          background-color: #FFFFFF;
          color: #0F172A;
          font-weight: 800;
          border-color: #CBD5E1;
        }

        /* Step 1: Package Grid */
        .estimator-pkg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 12px;
        }
        .estimator-pkg-card {
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 10px;
          padding: 18px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
          transition: border-color 0.15s, background-color 0.15s;
          user-select: none;
        }
        .estimator-pkg-card:hover {
          border-color: #94A3B8;
        }
        .estimator-pkg-card.selected {
          border-color: var(--prussian-blue, #2563EB);
          background-color: #F8FAFC;
        }
        .estimator-pkg-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .estimator-pkg-category {
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .estimator-pkg-radio {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #94A3B8;
          background-color: #FFFFFF;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .estimator-pkg-radio.checked {
          border-color: var(--prussian-blue, #2563EB);
          background-color: var(--prussian-blue, #2563EB);
        }
        .estimator-pkg-radio-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #FFFFFF;
        }
        .estimator-pkg-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 6px 0;
          line-height: 1.3;
        }
        .estimator-pkg-scope {
          font-size: 0.86rem;
          color: #475569;
          line-height: 1.4;
        }
        .estimator-pkg-card-bottom {
          padding-top: 12px;
          border-top: 1.5px solid #F1F5F9;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .estimator-pkg-rate-label {
          font-size: 0.8rem;
          color: #475569;
          font-weight: 600;
        }
        .estimator-pkg-rate-value {
          font-size: 1.15rem;
          font-weight: 900;
          color: #0F172A;
        }
        .estimator-pkg-rate-value.selected {
          color: var(--prussian-blue, #2563EB);
        }
        .estimator-pkg-duration {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.84rem;
          color: #334155;
          font-weight: 600;
        }

        /* Step 2: Addon List */
        .estimator-addon-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .estimator-addon-card {
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 10px;
          padding: 16px;
          transition: border-color 0.15s, background-color 0.15s;
        }
        .estimator-addon-card.selected {
          border-color: var(--prussian-blue, #2563EB);
          background-color: #F8FAFC;
        }
        .estimator-addon-clickable {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          cursor: pointer;
          user-select: none;
        }
        .estimator-addon-checkbox-wrap {
          margin-top: 2px;
          flex-shrink: 0;
        }
        .estimator-addon-checkbox {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 2px solid #94A3B8;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          transition: background-color 0.15s, border-color 0.15s;
        }
        .estimator-addon-checkbox.checked {
          border-color: var(--prussian-blue, #2563EB);
          background-color: var(--prussian-blue, #2563EB);
        }
        .estimator-addon-info {
          flex: 1;
          min-width: 0;
        }
        .estimator-addon-headline-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
        }
        .estimator-addon-name {
          font-size: 0.98rem;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.35;
          margin: 0;
        }
        .estimator-addon-price-tag {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0F172A;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .estimator-addon-card.selected .estimator-addon-price-tag {
          color: var(--prussian-blue, #2563EB);
        }
        .estimator-addon-desc {
          font-size: 0.86rem;
          color: #475569;
          margin: 6px 0 0 0;
          line-height: 1.45;
        }
        .estimator-addon-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }
        .estimator-addon-complexity {
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155;
          background-color: #F1F5F9;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .estimator-addon-type {
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748B;
        }

        /* Stepper Box */
        .estimator-stepper-box {
          margin-top: 12px;
          padding: 12px 14px;
          background-color: #F1F5F9;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .estimator-stepper-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #1E293B;
        }
        .estimator-stepper-controls {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .estimator-stepper-btn {
          width: 36px;
          height: 36px;
          border: 1.5px solid #CBD5E1;
          background-color: #FFFFFF;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.15s;
        }
        .estimator-stepper-btn:hover {
          background-color: #F8FAFC;
        }
        .estimator-stepper-val {
          min-width: 48px;
          text-align: center;
          font-weight: 800;
          color: #0F172A;
          font-size: 0.95rem;
        }
        .estimator-stepper-subtotal {
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--prussian-blue, #2563EB);
          margin-left: 4px;
        }

        /* RIGHT PANEL: Summary Card */
        .estimator-summary-col {
          position: sticky;
          top: 96px;
        }
        .estimator-summary-card {
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .estimator-summary-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1.5px solid #E2E8F0;
          padding-bottom: 14px;
        }
        .estimator-summary-title {
          font-size: 1.3rem;
          font-weight: 900;
          color: #0F172A;
          margin: 4px 0 0 0;
          letter-spacing: -0.015em;
        }
        .estimator-reset-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #334155;
          background-color: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 6px;
          padding: 6px 10px;
          cursor: pointer;
          transition: background-color 0.15s;
        }
        .estimator-reset-btn:hover {
          background-color: #F1F5F9;
        }

        /* Breakdown items */
        .estimator-breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 0.94rem;
        }
        .estimator-breakdown-pkg-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2px;
        }
        .estimator-breakdown-name {
          font-weight: 700;
          color: #0F172A;
        }
        .estimator-breakdown-price {
          font-weight: 800;
          color: #0F172A;
        }
        .estimator-breakdown-subtext {
          font-size: 0.84rem;
          color: #475569;
        }
        .estimator-breakdown-addons {
          padding-top: 12px;
          border-top: 1.5px solid #E2E8F0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .estimator-breakdown-addons-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .estimator-addon-item-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.9rem;
        }
        .estimator-addon-item-name {
          color: #1E293B;
        }
        .estimator-addon-item-val {
          font-weight: 700;
          color: #0F172A;
        }
        .estimator-empty-addon-note {
          padding-top: 10px;
          border-top: 1.5px solid #E2E8F0;
          font-size: 0.84rem;
          color: #64748B;
          font-style: italic;
        }
        .estimator-duration-row {
          padding-top: 12px;
          border-top: 1.5px solid #E2E8F0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .estimator-duration-label {
          color: #334155;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }
        .estimator-duration-value {
          font-weight: 800;
          color: #0F172A;
        }

        /* Total Box */
        .estimator-total-box {
          background-color: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          padding: 16px;
        }
        .estimator-total-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }
        .estimator-total-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #334155;
        }
        .estimator-total-value {
          font-size: 1.45rem;
          font-weight: 900;
          color: var(--prussian-blue, #2563EB);
        }
        .estimator-milestone-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding-top: 12px;
          border-top: 1.5px solid #E2E8F0;
        }
        .estimator-milestone-item {
          background-color: #FFFFFF;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid #E2E8F0;
        }
        .estimator-milestone-tag {
          font-size: 0.8rem;
          color: #475569;
          font-weight: 700;
        }
        .estimator-milestone-amt {
          font-size: 1.02rem;
          font-weight: 800;
          color: #0F172A;
          margin-top: 2px;
        }
        .estimator-milestone-sub {
          font-size: 0.76rem;
          color: #64748B;
          margin-top: 2px;
          line-height: 1.35;
        }

        /* Guarantees List */
        .estimator-guarantees-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.86rem;
          color: #334155;
        }
        .estimator-guarantee-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .estimator-guarantee-icon {
          flex-shrink: 0;
        }

        /* Actions Stack */
        .estimator-actions-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .estimator-btn-wa {
          background-color: #0F172A;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          padding: 14px 20px;
          min-height: 48px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background-color 0.15s;
          width: 100%;
        }
        .estimator-btn-wa:hover {
          background-color: #1E293B;
        }
        .estimator-btn-order {
          background-color: var(--prussian-blue, #2563EB);
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          padding: 14px 20px;
          min-height: 48px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.15s;
          width: 100%;
        }
        .estimator-btn-order:hover {
          opacity: 0.92;
        }
        .estimator-legal-footnote {
          font-size: 0.78rem;
          color: #64748B;
          text-align: center;
          line-height: 1.45;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .estimator-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .estimator-summary-col {
            position: static;
            margin-top: 12px;
          }
        }

        @media (max-width: 640px) {
          .estimator-section {
            padding: 44px 0 60px 0;
          }
          .estimator-container {
            padding: 0 16px;
          }
          .estimator-header {
            margin-bottom: 24px;
          }
          .estimator-title {
            font-size: 1.45rem;
            line-height: 1.25;
            margin-bottom: 8px;
          }
          .estimator-subtitle {
            font-size: 0.92rem;
            line-height: 1.5;
          }
          .estimator-box {
            padding: 16px 14px;
            border-radius: 10px;
          }
          .estimator-box-header {
            flex-direction: column;
            gap: 12px;
            margin-bottom: 16px;
          }
          .estimator-box-title {
            font-size: 1.1rem;
          }
          .estimator-box-desc {
            font-size: 0.84rem;
          }

          /* Scrollable tabs bar on phone */
          .estimator-segmented-tabs {
            width: 100%;
            display: flex;
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding: 3px;
          }
          .estimator-segmented-tabs::-webkit-scrollbar {
            display: none;
          }
          .estimator-tab-btn {
            flex: 1 0 auto;
            text-align: center;
            padding: 8px 12px;
            font-size: 0.82rem;
          }

          /* Package Grid -> Single-column stacked cards on phone */
          .estimator-pkg-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .estimator-pkg-card {
            padding: 14px;
            border-radius: 8px;
          }

          /* Addon cards on phone */
          .estimator-addon-card {
            padding: 14px 12px;
            border-radius: 8px;
          }
          .estimator-addon-clickable {
            gap: 10px;
          }
          .estimator-addon-name {
            font-size: 0.92rem;
          }
          .estimator-addon-price-tag {
            font-size: 0.92rem;
          }
          .estimator-addon-desc {
            font-size: 0.82rem;
            margin-top: 4px;
          }
          .estimator-stepper-box {
            padding: 10px 12px;
          }
          .estimator-stepper-label {
            font-size: 0.84rem;
            width: 100%;
            margin-bottom: 4px;
          }
          .estimator-stepper-controls {
            width: 100%;
            justify-content: flex-start;
          }

          /* Summary card on phone */
          .estimator-summary-card {
            padding: 18px 14px;
            border-radius: 10px;
            gap: 16px;
          }
          .estimator-summary-title {
            font-size: 1.2rem;
          }
          .estimator-total-box {
            padding: 14px 12px;
          }
          .estimator-total-value {
            font-size: 1.35rem;
          }

          /* When phone width is <= 420px, split milestones cleanly */
          @media (max-width: 420px) {
            .estimator-milestone-grid {
              grid-template-columns: 1fr;
              gap: 8px;
            }
          }
        }
      `}</style>
    </section>
  );
}
