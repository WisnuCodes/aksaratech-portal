import React, { useState } from 'react';
import { Code2, Server, Database, FileText, Cpu, CheckCircle } from 'lucide-react';
import { TECH_STACKS } from '../../data/catalogData';
import SectionBadge from '../atoms/SectionBadge';

export default function TechStackSection() {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);

  const categories = [
    {
      title: "Backend Frameworks & Runtime",
      shortTitle: "Backend",
      icon: Server,
      color: 'var(--prussian-blue)',
      items: TECH_STACKS.backend
    },
    {
      title: "Frontend Engineering & UI",
      shortTitle: "Frontend",
      icon: Code2,
      color: '#D97706',
      items: TECH_STACKS.frontend
    },
    {
      title: "Relational Database & Caching",
      shortTitle: "Database",
      icon: Database,
      color: '#059669',
      items: TECH_STACKS.database
    },
    {
      title: "Dokumen Rekayasa & Modeling",
      shortTitle: "Dokumen & UML",
      icon: FileText,
      color: 'var(--prussian-blue)',
      items: TECH_STACKS.modeling
    }
  ];

  return (
    <section id="teknologi" className="section-padding tech-stack-section" style={{ background: '#F8FAFC', borderTop: '2px solid #0F172A' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <SectionBadge icon={Cpu}>
            Arsitektur &amp; Standar Teknologi
          </SectionBadge>
          <h2 className="section-title">
            Teknologi Modern Berstandar <span style={{ color: 'var(--prussian-blue)' }}>Industri &amp; Akademik</span>
          </h2>
          <p className="section-desc">
            Seluruh kode program disusun dengan arsitektur bersih, modular, teruji, dan terdokumentasi rapi agar mudah dipelihara atau disidangkan.
          </p>
        </div>

        {/* Mobile Horizontal Category Pills */}
        <div className="tech-mobile-tabs-bar">
          <div className="tech-mobile-tabs">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCategoryIdx(idx)}
                className={`tech-mobile-pill ${activeCategoryIdx === idx ? 'active' : ''}`}
              >
                <span>{cat.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid (Desktop: 4 Cards, Mobile: Interactive Selected Card) */}
        <div className="tech-cards-grid">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isMobileActive = activeCategoryIdx === idx;
            return (
              <div
                key={idx}
                className={`neo-card tech-category-card ${isMobileActive ? 'mobile-active' : ''}`}
              >
                <div className="tech-card-header">
                  <div className="tech-icon-box" style={{ color: cat.color }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="tech-card-title">
                    {cat.title}
                  </h3>
                </div>

                <div className="tech-items-list">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="tech-sub-card">
                      <div className="tech-item-name">
                        <CheckCircle size={15} style={{ color: '#059669', flexShrink: 0 }} />
                        <span>{item.name}</span>
                      </div>
                      <div className="tech-item-desc">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Embedded CSS */}
      <style>{`
        .tech-mobile-tabs-bar {
          display: none;
        }

        .tech-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .tech-category-card {
          padding: 28px 24px;
          background: #FFFFFF;
          border: 2px solid #0F172A;
          display: flex;
          flex-direction: column;
        }

        .tech-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
        }

        .tech-icon-box {
          background: #F1F5F9;
          border: 2px solid #0F172A;
          box-shadow: 2px 2px 0px #0F172A;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tech-card-title {
          font-size: 1.12rem;
          font-weight: 900;
          color: #0F172A;
        }

        .tech-items-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .tech-sub-card {
          background: #F8FAFC;
          border: 1.5px solid #0F172A;
          border-radius: 6px;
          padding: 12px 14px;
          box-shadow: 2px 2px 0px #CBD5E1;
        }

        .tech-item-name {
          font-weight: 800;
          font-size: 0.94rem;
          color: #0F172A;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tech-item-desc {
          font-size: 0.84rem;
          color: #475569;
          line-height: 1.5;
          font-weight: 500;
        }

        @media (max-width: 1040px) {
          .tech-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .tech-mobile-tabs-bar {
            display: block;
            margin-bottom: 16px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 6px;
          }

          .tech-mobile-tabs {
            display: flex;
            gap: 8px;
            min-width: max-content;
          }

          .tech-mobile-pill {
            padding: 8px 16px;
            background: #FFFFFF;
            border: 2px solid #0F172A;
            border-radius: 6px;
            font-size: 0.82rem;
            font-weight: 800;
            color: #0F172A;
            box-shadow: 2px 2px 0px #0F172A;
            cursor: pointer;
            white-space: nowrap;
          }

          .tech-mobile-pill.active {
            background: var(--kuning);
            box-shadow: 2px 2px 0px var(--prussian-blue);
          }

          .tech-cards-grid {
            grid-template-columns: 1fr;
          }

          .tech-category-card {
            display: none;
          }

          .tech-category-card.mobile-active {
            display: flex;
            box-shadow: 4px 4px 0px var(--prussian-blue);
          }
        }
      `}</style>
    </section>
  );
}
