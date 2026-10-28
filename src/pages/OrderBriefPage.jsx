import React from 'react';
import PageHeader from '../components/molecules/PageHeader';
import OrderBriefForm from '../components/organisms/OrderBriefForm';
import { FileText, ShieldAlert } from 'lucide-react';

export default function OrderBriefPage({ preselectedPackageId }) {
  return (
    <div className="order-brief-page">
      <PageHeader
        breadcrumbs={[{ label: 'Formulir Kebutuhan Proyek' }]}
        badge="Progressive Disclosure Engine"
        badgeIcon={FileText}
        title="Formulir Spesifikasi &"
        highlightText="Brief Teknis Proyek"
        description="Isi kebutuhan fungsional, database, dokumen rekayasa, dan preferensi desain Anda secara terstruktur. Sistem kami akan menerbitkan draf penawaran presisi untuk divalidasi ke WhatsApp resmi 085600386692."
      />

      <div style={{ paddingBottom: '80px' }}>
        <OrderBriefForm preselectedPackageId={preselectedPackageId} hideHeader={true} />
      </div>
    </div>
  );
}
