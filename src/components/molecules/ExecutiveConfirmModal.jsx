import React, { useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  RotateCcw, 
  Info, 
  Trash2, 
  X, 
  Loader2 
} from 'lucide-react';

/**
 * ExecutiveConfirmModal
 * Modern, executive-grade confirmation and alert modal dialog.
 * Replaces crude browser window.confirm() and window.alert() popups
 * with strict adherence to Aksara Tech Anti-Slop and Design Taste standards.
 */
export default function ExecutiveConfirmModal({
  isOpen,
  title,
  subtitle,
  message,
  bulletPoints = [],
  variant = 'danger', // 'danger' | 'warning' | 'info'
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  confirmIcon: CustomConfirmIcon = null,
  onConfirm,
  onCancel,
  isLoading = false
}) {
  const confirmBtnRef = useRef(null);

  // Keyboard accessibility: Escape to cancel, Enter to confirm
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isLoading) {
        e.preventDefault();
        onCancel?.();
      } else if (e.key === 'Enter' && !isLoading && !e.shiftKey) {
        // Only trigger if not typing in an input
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag !== 'textarea' && activeTag !== 'input') {
          e.preventDefault();
          onConfirm?.();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Auto focus primary button on open
    const timer = setTimeout(() => {
      confirmBtnRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, isLoading, onConfirm, onCancel]);

  if (!isOpen) return null;

  // Resolve visual variant tokens
  const isDanger = variant === 'danger';
  const isWarning = variant === 'warning';
  const isInfo = variant === 'info';

  const iconConfig = isDanger
    ? {
        icon: Trash2,
        badgeBg: '#FEF2F2',
        badgeBorder: '#FCA5A5',
        iconColor: '#DC2626',
        btnBg: '#DC2626',
        btnHover: '#B91C1C',
        btnActive: '#991B1B',
        badgeLabel: 'TINDAKAN KRITIKAL'
      }
    : isWarning
    ? {
        icon: RotateCcw,
        badgeBg: '#FFFBEB',
        badgeBorder: '#FDE68A',
        iconColor: '#D97706',
        btnBg: '#0F172A',
        btnHover: '#1E293B',
        btnActive: '#334155',
        badgeLabel: 'PERINGATAN SISTEM'
      }
    : {
        icon: Info,
        badgeBg: '#EFF6FF',
        badgeBorder: '#BFDBFE',
        iconColor: '#2563EB',
        btnBg: '#2563EB',
        btnHover: '#1D4ED8',
        btnActive: '#1E40AF',
        badgeLabel: 'INFORMASI SISTEM'
      };

  const IconComponent = iconConfig.icon;
  const isAlertMode = cancelLabel === null;

  return (
    <div 
      className="exec-modal-backdrop" 
      onClick={() => {
        if (!isLoading) onCancel?.();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exec-modal-title"
    >
      <div 
        className="exec-modal-dialog" 
        data-ui="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Row */}
        <div className="exec-modal-header">
          <div className="exec-modal-badge-row">
            <div 
              className="exec-modal-icon-badge"
              style={{
                backgroundColor: iconConfig.badgeBg,
                borderColor: iconConfig.badgeBorder
              }}
            >
              <IconComponent size={20} color={iconConfig.iconColor} strokeWidth={2.2} />
            </div>
            <div>
              <span 
                className="exec-modal-pill"
                style={{
                  color: iconConfig.iconColor,
                  borderColor: iconConfig.badgeBorder,
                  backgroundColor: iconConfig.badgeBg
                }}
              >
                {iconConfig.badgeLabel}
              </span>
              <h3 id="exec-modal-title" className="exec-modal-title">
                {title}
              </h3>
            </div>
          </div>

          {!isLoading && (
            <button 
              type="button" 
              className="exec-modal-close-btn"
              onClick={onCancel}
              aria-label="Tutup dialog"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="exec-modal-body">
          {subtitle && (
            <p className="exec-modal-subtitle">
              {subtitle}
            </p>
          )}

          {message && (
            <p className="exec-modal-message">
              {message}
            </p>
          )}

          {/* Structured Impact / Consequences List */}
          {Array.isArray(bulletPoints) && bulletPoints.length > 0 && (
            <div className="exec-modal-impact-box">
              <div className="exec-modal-impact-label">
                Konsekuensi Tindakan:
              </div>
              <ul className="exec-modal-impact-list">
                {bulletPoints.map((point, idx) => (
                  <li key={idx} className="exec-modal-impact-item">
                    <span 
                      className="exec-modal-impact-dot"
                      style={{
                        backgroundColor: isDanger ? '#DC2626' : '#64748B'
                      }}
                    />
                    <span className="exec-modal-impact-text">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="exec-modal-footer">
          {!isAlertMode && (
            <button
              type="button"
              className="exec-modal-btn exec-modal-btn-cancel"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
          )}

          <button
            ref={confirmBtnRef}
            type="button"
            className="exec-modal-btn exec-modal-btn-confirm"
            style={{
              backgroundColor: iconConfig.btnBg
            }}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="exec-modal-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                {CustomConfirmIcon && <CustomConfirmIcon size={16} />}
                <span>{confirmLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .exec-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(15, 23, 42, 0.72);
          padding: 16px;
          animation: execFadeIn 0.15s ease-out;
        }

        .exec-modal-dialog {
          position: relative;
          width: 100%;
          max-width: 500px;
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25); /* taste-skill-ignore: true floating overlay modal */
          animation: execScaleUp 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        }

        .exec-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
        }

        .exec-modal-badge-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .exec-modal-icon-badge {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 10px;
          border-width: 1.5px;
          border-style: solid;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .exec-modal-pill {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 2px 8px;
          border-radius: 4px;
          border-width: 1px;
          border-style: solid;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .exec-modal-title {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.35;
        }

        .exec-modal-close-btn {
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s, background-color 0.15s;
        }

        .exec-modal-close-btn:hover {
          color: #0F172A;
          background-color: #F1F5F9;
        }

        .exec-modal-body {
          margin-bottom: 24px;
        }

        .exec-modal-subtitle {
          margin: 0 0 8px 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1E293B;
          line-height: 1.45;
        }

        .exec-modal-message {
          margin: 0 0 14px 0;
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.55;
          white-space: pre-line;
        }

        .exec-modal-impact-box {
          background-color: #F8FAFC;
          border-radius: 8px;
          padding: 14px 16px;
        }

        .exec-modal-impact-label {
          font-size: 0.76rem;
          font-weight: 700;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }

        .exec-modal-impact-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .exec-modal-impact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .exec-modal-impact-dot {
          width: 6px;
          height: 6px;
          min-width: 6px;
          border-radius: 50%;
          margin-top: 6px;
        }

        .exec-modal-impact-text {
          font-size: 0.85rem;
          color: #334155;
          line-height: 1.45;
        }

        .exec-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 20px;
        }

        .exec-modal-btn {
          height: 42px;
          padding: 0 18px;
          font-size: 0.88rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.15s, border-color 0.15s, color 0.15s;
          box-sizing: border-box;
        }

        .exec-modal-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .exec-modal-btn-cancel {
          background-color: #FFFFFF;
          border: 1.5px solid #CBD5E1;
          color: #334155;
        }

        .exec-modal-btn-cancel:hover:not(:disabled) {
          background-color: #F8FAFC;
          border-color: #94A3B8;
          color: #0F172A;
        }

        .exec-modal-btn-confirm {
          border: none;
          color: #FFFFFF;
        }

        .exec-modal-btn-confirm:hover:not(:disabled) {
          filter: brightness(0.92);
        }

        .exec-modal-spin {
          animation: execSpin 1s linear infinite;
        }

        @keyframes execFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes execScaleUp {
          from { 
            opacity: 0; 
            transform: scale(0.96) translateY(6px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }

        @keyframes execSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .exec-modal-dialog {
            padding: 20px 16px;
          }

          .exec-modal-footer {
            flex-direction: column-reverse;
            gap: 8px;
          }

          .exec-modal-btn {
            width: 100%;
            height: 44px;
          }
        }
      `}</style>
    </div>
  );
}
