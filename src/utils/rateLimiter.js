// Client-Side Anti-Spam & Rate Limiter Utility
// Enforces HTTP 429 (Too Many Requests) protections against spam submissions and rapid automated clicks

import { SYSTEM_CONFIG } from '../constants/systemConfig';

const STORAGE_KEY = 'aksara_rate_limit_records';

export function getRateLimitStatus(actionKey = 'order_submission') {
  if (!SYSTEM_CONFIG.RATE_LIMITING.ENABLED) {
    return { allowed: true, remainingAttempts: 99, retryAfterSeconds: 0 };
  }

  try {
    const rawData = sessionStorage.getItem(STORAGE_KEY);
    const records = rawData ? JSON.parse(rawData) : {};
    const now = Date.now();
    const actionRecord = records[actionKey] || { timestamps: [], blockedUntil: 0 };

    // Check if currently blocked
    if (actionRecord.blockedUntil && now < actionRecord.blockedUntil) {
      const retryAfterSeconds = Math.ceil((actionRecord.blockedUntil - now) / 1000);
      return {
        allowed: false,
        remainingAttempts: 0,
        retryAfterSeconds
      };
    }

    // Clean timestamps outside the window
    const windowMs = SYSTEM_CONFIG.RATE_LIMITING.WINDOW_SECONDS * 1000;
    const validTimestamps = actionRecord.timestamps.filter(ts => (now - ts) < windowMs);

    const remainingAttempts = Math.max(0, SYSTEM_CONFIG.RATE_LIMITING.MAX_ATTEMPTS - validTimestamps.length);

    return {
      allowed: remainingAttempts > 0,
      remainingAttempts,
      retryAfterSeconds: 0
    };
  } catch {
    return { allowed: true, remainingAttempts: 5, retryAfterSeconds: 0 };
  }
}

export function recordActionAttempt(actionKey = 'order_submission') {
  if (!SYSTEM_CONFIG.RATE_LIMITING.ENABLED) return { allowed: true };

  try {
    const rawData = sessionStorage.getItem(STORAGE_KEY);
    const records = rawData ? JSON.parse(rawData) : {};
    const now = Date.now();
    const actionRecord = records[actionKey] || { timestamps: [], blockedUntil: 0 };

    const windowMs = SYSTEM_CONFIG.RATE_LIMITING.WINDOW_SECONDS * 1000;
    const validTimestamps = actionRecord.timestamps.filter(ts => (now - ts) < windowMs);
    validTimestamps.push(now);

    // If limit exceeded, block for cooldown duration
    let blockedUntil = 0;
    let allowed = true;
    let retryAfterSeconds = 0;

    if (validTimestamps.length > SYSTEM_CONFIG.RATE_LIMITING.MAX_ATTEMPTS) {
      const cooldownMs = SYSTEM_CONFIG.RATE_LIMITING.COOLDOWN_SECONDS * 1000;
      blockedUntil = now + cooldownMs;
      allowed = false;
      retryAfterSeconds = SYSTEM_CONFIG.RATE_LIMITING.COOLDOWN_SECONDS;
    }

    records[actionKey] = {
      timestamps: validTimestamps,
      blockedUntil
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(records));

    return {
      allowed,
      remainingAttempts: Math.max(0, SYSTEM_CONFIG.RATE_LIMITING.MAX_ATTEMPTS - validTimestamps.length),
      retryAfterSeconds
    };
  } catch {
    return { allowed: true };
  }
}

