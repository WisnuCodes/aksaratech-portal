import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  MessageCircle, 
  Plus, 
  Minus,
  Check
} from 'lucide-react';
import { PACKAGES, ADDONS, BUSINESS_INFO } from '../../data/catalogData';
import { formatRupiah } from '../../utils/documentEngine';

export default function InstantPriceEstimator({ onSelectPackage, className = '' }) {
  const navigate = useNavigate();

  // State
  const [selectedPkgId, setSelectedPkgId] = useState('umkm-katalog');
  const [selectedAddonIds, setSelectedAddonIds] = useState(['addon-mysql-crud']);
  const [packageFilter, setPackageFilter] = useState('ALL'); // ALL, BUSINESS, ACADEMIC
  const [addonFilter, setAddonFilter] = useState('ALL'); // ALL, Document, Feature, Maintenance
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
    <section id="kalkulator" className={`estimator-section ${className}`} style={{ background: '#FFFFFF', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Section Headline */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 12px 0', lineHeight: '1.2' }}>
            Kalkulator Biaya &amp; Estimasi Pengerjaan Instan
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#334155', maxWidth: '800px', margin: 0, lineHeight: '1.6' }}>
            Simulasi anggaran transparan untuk 6 paket dan 10 modul add-on. Pilih kombinasi yang Anda butuhkan untuk melihat pembagian termin DP 50% serta estimasi jadwal pengerjaan tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Main Grid: Left Controls (Selection) vs Right Panel (Sticky Summary) */}
        <div className="estimator-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(320px, 1fr)', gap: '32px', alignItems: 'start' }}>
          
          {/* LEFT COLUMN: Controls */}
          <div className="estimator-controls" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Step 1: Package Selection */}
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
                    Pilih Paket Dasar
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                    Tentukan fondasi sistem yang ingin Anda bangun.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="estimator-filter-tabs" style={{ display: 'inline-flex', background: '#E2E8F0', padding: '3px', borderRadius: '8px', gap: '2px', flexWrap: 'wrap' }}>
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
                        onClick={() => setPackageFilter(tab.id)}
                        className="estimator-filter-btn"
                        style={{
                          background: isActive ? '#FFFFFF' : 'transparent',
                          color: isActive ? '#0F172A' : '#1E293B',
                          fontWeight: isActive ? '800' : '600',
                          fontSize: '0.86rem',
                          padding: '6px 14px',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'background 0.15s, color 0.15s'
                        }}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Radio Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {displayedPackages.map(pkg => {
                  const isSelected = selectedPkgId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPkgId(pkg.id); }}
                      style={{
                        background: '#FFFFFF',
                        border: isSelected ? '2px solid var(--prussian-blue)' : '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '18px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px',
                        position: 'relative',
                        transition: 'border-color 0.15s'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.84rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {pkg.category}
                          </span>
                          <span style={{ 
                            width: '18px', 
                            height: '18px', 
                            borderRadius: '50%', 
                            border: isSelected ? '5px solid var(--prussian-blue)' : '2px solid #94A3B8',
                            background: '#FFFFFF',
                            boxSizing: 'border-box'
                          }} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                          {pkg.name}
                        </h4>
                        <div style={{ fontSize: '0.86rem', color: '#475569' }}>
                          {pkg.pages}
                        </div>
                      </div>

                      <div style={{ paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div>
                          <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '600' }}>Tarif Tetap:</div>
                          <div style={{ fontSize: '1.15rem', fontWeight: '900', color: isSelected ? 'var(--prussian-blue)' : '#0F172A' }}>
                            {formatRupiah(pkg.minPrice)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.84rem', color: '#334155', fontWeight: '600' }}>
                          <Clock size={14} color="#0F172A" />
                          <span>{pkg.minDays}–{pkg.maxDays} Hari</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-on Selection */}
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>
                    Tambahkan Modul &amp; Fitur (Opsional)
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                    Sesuaikan kebutuhan spesifik sistem. Centang modul yang diinginkan.
                  </p>
                </div>

                {/* Filter Tabs Addon */}
                <div className="estimator-filter-tabs" style={{ display: 'inline-flex', background: '#E2E8F0', padding: '3px', borderRadius: '8px', gap: '2px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'ALL', label: 'Semua (10)' },
                    { id: 'Feature', label: 'Modul Fitur' },
                    { id: 'Document', label: 'Dokumen' },
                    { id: 'Maintenance', label: 'Maintenance' }
                  ].map(tab => {
                    const isActive = addonFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setAddonFilter(tab.id)}
                        className="estimator-filter-btn"
                        style={{
                          background: isActive ? '#FFFFFF' : 'transparent',
                          color: isActive ? '#0F172A' : '#1E293B',
                          fontWeight: isActive ? '800' : '600',
                          fontSize: '0.86rem',
                          padding: '6px 14px',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'background 0.15s, color 0.15s'
                        }}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Addons List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {displayedAddons.map(addon => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  const isUnitPage = addon.id === 'addon-new-page';
                  const isUnitMaintenance = addon.id === 'addon-maintenance-daily';

                  return (
                    <div
                      key={addon.id}
                      style={{
                        background: '#FFFFFF',
                        border: isChecked ? '1.5px solid var(--prussian-blue)' : '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        transition: 'border-color 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                        <div 
                          onClick={() => toggleAddon(addon.id)}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', flex: 1 }}
                        >
                          <div 
                            style={{ 
                              width: '22px', 
                              height: '22px', 
                              borderRadius: '4px', 
                              border: isChecked ? 'none' : '2px solid #94A3B8',
                              background: isChecked ? 'var(--prussian-blue)' : '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: '2px',
                              flexShrink: 0
                            }}
                          >
                            {isChecked && <Check size={15} color="#FFFFFF" strokeWidth={3} />}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.98rem', fontWeight: '700', color: '#0F172A', lineHeight: '1.3' }}>
                              {addon.name}
                            </div>
                            <p style={{ fontSize: '0.86rem', color: '#475569', margin: '4px 0 0 0', lineHeight: '1.45' }}>
                              {addon.description}
                            </p>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: '1rem', fontWeight: '800', color: isChecked ? 'var(--prussian-blue)' : '#0F172A' }}>
                            {addon.priceDisplay}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '600' }}>
                            {addon.complexity}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper for Unit Addons */}
                      {isChecked && isUnitPage && (
                        <div style={{ marginTop: '8px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '10px 14px', borderRadius: '6px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E293B' }}>Jumlah Tambahan Halaman:</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                            <button
                              type="button"
                              onClick={() => setPageCount(prev => Math.max(1, prev - 1))}
                              style={{ width: '30px', height: '30px', border: '1px solid #94A3B8', background: '#FFFFFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              aria-label="Kurang halaman"
                            >
                              <Minus size={15} color="#0F172A" />
                            </button>
                            <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: '800', color: '#0F172A', fontSize: '0.98rem' }}>
                              {pageCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => setPageCount(prev => Math.min(10, prev + 1))}
                              style={{ width: '30px', height: '30px', border: '1px solid #94A3B8', background: '#FFFFFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              aria-label="Tambah halaman"
                            >
                              <Plus size={15} color="#0F172A" />
                            </button>
                            <span style={{ fontSize: '0.86rem', color: '#475569', marginLeft: '6px' }}>
                              (= {formatRupiah(addon.minPrice * pageCount)})
                            </span>
                          </div>
                        </div>
                      )}

                      {isChecked && isUnitMaintenance && (
                        <div style={{ marginTop: '8px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '10px 14px', borderRadius: '6px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E293B' }}>Durasi Maintenance (Hari):</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                            <button
                              type="button"
                              onClick={() => setMaintenanceDays(prev => Math.max(1, prev - 1))}
                              style={{ width: '30px', height: '30px', border: '1px solid #94A3B8', background: '#FFFFFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              aria-label="Kurang hari maintenance"
                            >
                              <Minus size={15} color="#0F172A" />
                            </button>
                            <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: '800', color: '#0F172A', fontSize: '0.98rem' }}>
                              {maintenanceDays}
                            </span>
                            <button
                              type="button"
                              onClick={() => setMaintenanceDays(prev => Math.min(14, prev + 1))}
                              style={{ width: '30px', height: '30px', border: '1px solid #94A3B8', background: '#FFFFFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              aria-label="Tambah hari maintenance"
                            >
                              <Plus size={15} color="#0F172A" />
                            </button>
                            <span style={{ fontSize: '0.86rem', color: '#475569', marginLeft: '6px' }}>
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
          <div className="estimator-summary-col" style={{ position: 'sticky', top: '96px' }}>
            <div 
              style={{ 
                background: '#FFFFFF', 
                border: '1.5px solid #CBD5E1', 
                borderRadius: '12px', 
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              {/* Summary Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Ringkasan Penawaran
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0F172A', margin: '4px 0 0 0' }}>
                    Kalkulasi Investasi
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  title="Kembalikan ke awal"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.84rem',
                    color: '#334155',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '700'
                  }}
                >
                  <RotateCcw size={15} />
                  <span>Reset</span>
                </button>
              </div>

              {/* Itemized Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.94rem' }}>
                
                {/* Active Package */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <span style={{ fontWeight: '700', color: '#0F172A' }}>{activePackage.name}</span>
                    <span style={{ fontWeight: '800', color: '#0F172A' }}>{formatRupiah(calculations.basePrice)}</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                    {activePackage.category} &bull; {activePackage.pages}
                  </div>
                </div>

                {/* Selected Addons */}
                {calculations.itemizedAddons.length > 0 && (
                  <div style={{ paddingTop: '12px', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      Modul Tambahan ({calculations.itemizedAddons.length}):
                    </div>
                    {calculations.itemizedAddons.map(a => (
                      <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.9rem' }}>
                        <span style={{ color: '#1E293B' }}>+ {a.name}{a.qtyLabel}</span>
                        <span style={{ fontWeight: '700', color: '#0F172A' }}>{formatRupiah(a.finalPrice)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Duration Line */}
                <div style={{ paddingTop: '12px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} color="#0F172A" />
                    <span>Estimasi Durasi Kerja</span>
                  </span>
                  <span style={{ fontWeight: '800', color: '#0F172A' }}>
                    {calculations.minDays} – {calculations.maxDays} Hari Kerja
                  </span>
                </div>
              </div>

              {/* Total Box */}
              <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#334155' }}>Total Investasi Bersih:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--prussian-blue)' }}>
                    {formatRupiah(calculations.grandTotal)}
                  </span>
                </div>

                {/* 50:50 Milestone split */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '700' }}>Termin 1 (DP 50%)</div>
                    <div style={{ fontSize: '1.02rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{formatRupiah(calculations.dpAmount)}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>Saat pengerjaan dimulai</div>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '700' }}>Termin 2 (Pelunasan 50%)</div>
                    <div style={{ fontSize: '1.02rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{formatRupiah(calculations.finalPayment)}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>Setelah lolos uji fungsi</div>
                  </div>
                </div>
              </div>

              {/* Guarantees List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0F172A" />
                  <span>100% Hak Milik Master Source Code &amp; .sql</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0F172A" />
                  <span>Garansi Bebas Bug Kode 1 Minggu (7 Hari)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#0F172A" />
                  <span>Fasilitas Kuota Revisi Maksimal 3x Sesi</span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Send to WhatsApp Button */}
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 20px',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'background-color 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1E293B'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#0F172A'}
                >
                  <MessageCircle size={18} color="#25D366" />
                  <span>Kirim Simulasi ke WhatsApp</span>
                </button>

                {/* Continue to Order Brief Form */}
                <button
                  type="button"
                  onClick={handleProceedToOrder}
                  style={{
                    background: 'var(--prussian-blue)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 20px',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'opacity 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.92'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <span>Lanjut ke Formulir Pemesanan</span>
                </button>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#475569', textAlign: 'center', lineHeight: '1.45' }}>
                *Tarif resmi mengikat setelah diterbitkan Surat Penawaran (Quotation) resmi oleh Aksara Tech.
              </div>

            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .estimator-layout {
            grid-template-columns: 1fr !important;
          }
          .estimator-summary-col {
            position: static !important;
            margin-top: 24px;
          }
        }
        @media (max-width: 640px) {
          .estimator-filter-tabs {
            width: 100% !important;
            display: flex !important;
          }
          .estimator-filter-btn {
            flex: 1 1 auto !important;
            text-align: center !important;
            padding: 8px 6px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
