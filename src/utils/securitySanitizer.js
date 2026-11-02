// Security Sanitizer Utility for Aksara Tech
// Neutralizes Cross-Site Scripting (XSS), SQL Injection syntax patterns, and dangerous protocol URI schemes

export function sanitizeText(str) {
  if (typeof str !== 'string') return '';

  return str
    // 1. Remove null bytes and control characters
    .replace(/\0/g, '')
    // 2. Strip potential XSS scripts & executable HTML tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/data\s*:\s*text\/html/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // 3. Neutralize classic SQL injection signatures in user input
    .replace(/--+/g, '-') // SQL line comment delimiter
    .replace(/\/\*[\s\S]*?\*\//g, '') // SQL block comments
    .replace(/;\s*(DROP|DELETE|TRUNCATE|ALTER|EXEC|UNION|INSERT|UPDATE)\b/gi, '') // chained destructive commands
    .replace(/'\s*(OR|AND)\s*['"]?[0-9]+['"]?\s*=\s*['"]?[0-9]+/gi, '') // tautology bypasses (e.g. ' OR 1=1)
    .trim();
}

export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Allow only legitimate http or https protocols (strictly blocks javascript:, vbscript:, and data: schemes)
  if (/^https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/i.test(trimmed)) {
    return trimmed;
  }

  // If user pasted a drive/cloud link without protocol prefix, normalize safely
  if (/^(?:drive\.google\.com|dropbox\.com|onedrive\.live\.com)\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return '';
}

export function sanitizePhone(phone) {
  if (typeof phone !== 'string') return '';
  // Only permit valid digits and optional leading plus sign
  return phone.replace(/[^0-9+]/g, '').trim();
}
