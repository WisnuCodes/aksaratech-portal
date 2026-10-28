import React from 'react';
import { Check } from 'lucide-react';

const defaultSteps = [
  { num: 1, label: 'Klien', title: 'Identitas Klien & Kontak' },
  { num: 2, label: 'Paket', title: 'Pilih Paket Layanan' },
  { num: 3, label: 'Tujuan', title: 'Tujuan & Target Sistem' },
  { num: 4, label: 'Fitur', title: 'Fitur & Spesifikasi Teknis' },
  { num: 5, label: 'Desain', title: 'Kesiapan Materi & Aset' },
  { num: 6, label: 'Add-on', title: 'Add-on & Modul Khusus' },
  { num: 7, label: 'Ringkasan', title: 'Ringkasan & Validasi' },
];

export default function StepIndicator({ currentStep, totalSteps = 7, steps = [], onStepClick }) {
  const displaySteps = steps.length > 0 ? steps : defaultSteps;
  const currentStepData = displaySteps.find(s => s.num === currentStep) || displaySteps[0];
  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="step-indicator-wrapper">
      
      {/* ===== 1. MOBILE COMPACT PROGRESS VIEW (< 1024px) ===== */}
      <div className="step-mobile-view">
        <div className="step-mobile-header">
          <div className="step-mobile-left">
            <span className="step-mobile-badge">
              LANGKAH {currentStep} DARI {totalSteps}
            </span>
            <span className="step-mobile-title">
              {currentStepData.title || currentStepData.label}
            </span>
          </div>
          <span className="step-mobile-percent">
            {progressPercent}%
          </span>
        </div>

        {/* 7-Segment Neo-Brutalist Progress Bar */}
        <div className="step-segment-bar">
          {displaySteps.map((s) => {
            const isCompleted = s.num < currentStep;
            const isActive = s.num === currentStep;
            return (
              <div
                key={s.num}
                onClick={() => isCompleted && onStepClick?.(s.num)}
                className={`step-segment ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                style={{ cursor: isCompleted ? 'pointer' : 'default' }}
                title={`Langkah ${s.num}: ${s.label}`}
              />
            );
          })}
        </div>

        {/* Quick Back-Navigation Chips */}
        {currentStep > 1 && (
          <div className="step-mobile-quick-chips">
            <span className="quick-chip-label">Kembali ke:</span>
            <div className="quick-chip-list">
              {displaySteps.filter(s => s.num < currentStep).map((s) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => onStepClick?.(s.num)}
                  className="quick-chip-btn"
                >
                  <Check size={11} strokeWidth={3} />
                  <span>{s.num}. {s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== 2. DESKTOP FULL STEP TRACK VIEW (>= 1024px) ===== */}
      <div className="step-desktop-view">
        <div className="step-track-container">
          {/* Background and Active Fill Line Wrapper */}
          <div className="step-track-line-wrapper">
            <div className="step-track-bg" />
            <div 
              className="step-track-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 7 Step Circles in CSS Grid */}
          {displaySteps.map((s) => {
            const isCompleted = s.num < currentStep;
            const isActive = s.num === currentStep;
            return (
              <div
                key={s.num}
                className="step-circle-item"
                style={{ cursor: isCompleted ? 'pointer' : 'default' }}
                onClick={() => isCompleted && onStepClick?.(s.num)}
              >
                <div className={`step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  {isCompleted ? <Check size={17} strokeWidth={3} /> : s.num}
                </div>
                <span className={`step-label ${isActive ? 'active-label' : ''} ${isCompleted ? 'completed-label' : ''}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded Responsive Styles */}
      <style>{`
        .step-indicator-wrapper {
          margin-bottom: 28px;
        }

        /* =======================================================
           DESKTOP STYLES (>= 1024px) — default shown
           ======================================================= */
        .step-desktop-view {
          display: block;
          width: 100%;
        }

        .step-mobile-view {
          display: none;
        }

        /* 7-column grid guarantees each step gets exactly 1/7 width */
        .step-track-container {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          justify-items: center;
          align-items: start;
          position: relative;
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          padding: 0 4px;
        }

        /* Connecting track line wrapper positioned between Circle 1 and Circle 7 centers */
        .step-track-line-wrapper {
          position: absolute;
          top: 19px;
          left: calc(100% / 14);
          right: calc(100% / 14);
          height: 3px;
          z-index: 1;
        }

        .step-track-bg {
          position: absolute;
          inset: 0;
          height: 3px;
          background: #CBD5E1;
          border-radius: 2px;
        }

        .step-track-fill {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          height: 3px;
          background: var(--prussian-blue);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 2px;
        }

        .step-circle-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .step-circle {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 900;
          transition: all 0.15s ease;
          background: #FFFFFF;
          color: #64748B;
          border: 2px solid #CBD5E1;
          box-shadow: 2px 2px 0px #E2E8F0;
          flex-shrink: 0;
        }

        .step-circle.active {
          background: var(--kuning);
          color: #0F172A;
          border-color: #0F172A;
          box-shadow: 3px 3px 0px var(--prussian-blue);
          transform: translateY(-2px);
        }

        .step-circle.completed {
          background: var(--emerald);
          color: #FFFFFF;
          border-color: #0F172A;
          box-shadow: 2px 2px 0px #0F172A;
        }

        .step-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #64748B;
          text-align: center;
          white-space: nowrap;
          line-height: 1.2;
        }

        .step-label.active-label {
          color: var(--prussian-blue);
          font-weight: 900;
        }

        .step-label.completed-label {
          color: #059669;
          font-weight: 700;
        }

        /* =======================================================
           MOBILE & TABLET STYLES (< 1024px)
           ======================================================= */
        @media (max-width: 1023px) {
          .step-desktop-view {
            display: none !important;
          }

          .step-mobile-view {
            display: block !important;
            background: #F8FAFC;
            border: 2px solid #0F172A;
            border-radius: 8px;
            padding: 14px 16px;
            box-shadow: 3px 3px 0px #CBD5E1;
          }

          .step-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 12px;
          }

          .step-mobile-left {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            min-width: 0;
          }

          .step-mobile-badge {
            background: var(--kuning);
            border: 1.5px solid #0F172A;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.72rem;
            font-weight: 900;
            color: #0F172A;
            font-family: var(--font-mono);
            white-space: nowrap;
          }

          .step-mobile-title {
            font-size: 0.88rem;
            font-weight: 800;
            color: #0F172A;
          }

          .step-mobile-percent {
            font-family: var(--font-mono);
            font-size: 0.82rem;
            font-weight: 900;
            color: var(--prussian-blue);
            background: #EFF6FF;
            padding: 2px 6px;
            border-radius: 4px;
            border: 1px solid var(--prussian-blue);
            flex-shrink: 0;
          }

          /* 7-Segment Bar */
          .step-segment-bar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            height: 10px;
          }

          .step-segment {
            height: 100%;
            border-radius: 3px;
            background: #E2E8F0;
            border: 1.5px solid #CBD5E1;
            transition: all 0.2s ease;
          }

          .step-segment.completed {
            background: #10B981;
            border-color: #0F172A;
            box-shadow: 1px 1px 0px #0F172A;
          }

          .step-segment.active {
            background: var(--kuning);
            border-color: #0F172A;
            box-shadow: 1.5px 1.5px 0px var(--prussian-blue);
            transform: scaleY(1.2);
          }

          /* Quick Chips */
          .step-mobile-quick-chips {
            margin-top: 10px;
            padding-top: 8px;
            border-top: 1px dashed #CBD5E1;
            display: flex;
            align-items: center;
            gap: 8px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .step-mobile-quick-chips::-webkit-scrollbar {
            display: none;
          }

          .quick-chip-label {
            font-size: 0.7rem;
            color: #64748B;
            font-weight: 700;
            white-space: nowrap;
          }

          .quick-chip-list {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .quick-chip-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: #FFFFFF;
            border: 1.5px solid #0F172A;
            border-radius: 4px;
            padding: 3px 8px;
            font-size: 0.72rem;
            font-weight: 700;
            color: #0F172A;
            box-shadow: 1px 1px 0px #0F172A;
            cursor: pointer;
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}
