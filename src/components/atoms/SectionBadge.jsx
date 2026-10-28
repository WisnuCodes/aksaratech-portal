import React from 'react';

export default function SectionBadge({ icon: Icon, children, className = '', style = {} }) {
  return (
    <div className={`section-badge ${className}`} style={style}>
      {Icon && <Icon size={14} />}
      <span>{children}</span>
    </div>
  );
}
