import React from 'react';

export default function Input({
  label,
  required = false,
  error,
  helperText,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  style = {},
  ...props
}) {
  return (
    <div className={`form-group ${className}`} style={style} data-has-error={!!error}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="req">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
        aria-invalid={!!error}
        data-has-error={!!error}
        style={{
          borderColor: error ? 'var(--rose, #F43F5E)' : undefined,
          boxShadow: error ? '0 0 0 3px rgba(244, 63, 94, 0.25)' : undefined
        }}
        {...props}
      />
      {error ? (
        <p style={{ color: 'var(--rose, #F43F5E)', fontSize: '0.8rem', marginTop: '6px', fontWeight: '600' }}>
          {error}
        </p>
      ) : helperText ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px' }}>{helperText}</p>
      ) : null}
    </div>
  );
}
