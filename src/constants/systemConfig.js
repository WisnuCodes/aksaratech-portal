// Aksara Tech System & Production Configuration
// Centralized configuration for Maintenance Mode, Rate Limiting, and Diagnostic Telemetry

export const SYSTEM_CONFIG = {
  // Global Google Spreadsheet Webhook URL (shared across all devices & clients)
  // Fill this with your deployed Google Apps Script URL (ending with /exec)
  GOOGLE_SHEET_WEBHOOK_URL: "",

  // Toggle Maintenance Mode (HTTP 503 Service Unavailable)
  // Set to true during major database migrations or server maintenance
  MAINTENANCE_MODE: false,

  MAINTENANCE_REASON: "Pemeliharaan terjadwal & peningkatan performa infrastruktur sistem.",

  // Rate Limiting Protection (HTTP 429 Too Many Requests)
  RATE_LIMITING: {
    ENABLED: true,
    MAX_ATTEMPTS: 5,        // Max allowed submissions
    WINDOW_SECONDS: 15,     // Within 15 seconds window
    COOLDOWN_SECONDS: 30    // Cooldown duration
  },

  // Version and environment
  VERSION: "1.0.0-PROD",
  TELEMETRY_REFRESH_INTERVAL_MS: 1000
};

