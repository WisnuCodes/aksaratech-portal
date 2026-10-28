import React from 'react';

export default function Badge({
  children,
  variant = 'blue', // 'blue' | 'yellow' | 'amber' | 'emerald' | 'rose'
  icon: Icon,
  className = '',
  style = {}
}) {
  const getBadgeClass = () => {
    switch (variant) {
      case 'amber':
      case 'yellow':
      case 'kuning':
        return 'badge-kuning';
      case 'emerald':
        return 'badge-emerald';
      case 'rose':
        return 'badge-rose';
      case 'blue':
      case 'cyan':
      default:
        return 'badge-blue';
    }
  };

  return (
    <div className={`badge ${getBadgeClass()} ${className}`} style={style}>
      {Icon && <Icon size={13} />}
      <span>{children}</span>
    </div>
  );
}
