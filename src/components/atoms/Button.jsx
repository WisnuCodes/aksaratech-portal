import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'wa' | 'amber' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  className = '',
  style = {},
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'btn-primary';
      case 'secondary': return 'btn-secondary';
      case 'wa': return 'btn-wa';
      case 'amber': return 'btn-amber';
      case 'ghost': return 'btn-ghost';
      default: return 'btn-primary';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm': return { padding: '8px 16px', fontSize: '0.85rem' };
      case 'lg': return { padding: '14px 32px', fontSize: '1.05rem' };
      default: return {};
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${getVariantClass()} ${className}`}
      style={{ ...getSizeStyle(), ...style, opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : 18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : 18} />}
    </button>
  );
}
