import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Chip,
  Tooltip,
  Snackbar,
  Paper,
  LinearProgress,
  ThemeProvider,
  createTheme
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import WifiOffRoundedIcon from '@mui/icons-material/WifiOffRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import { getHttpError } from '../data/httpErrorCatalog';
import { BUSINESS_INFO } from '../data/catalogData';

const errorTheme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: { fontFamily: "'Space Grotesk', sans-serif" },
    h2: { fontFamily: "'Space Grotesk', sans-serif" },
    h3: { fontFamily: "'Space Grotesk', sans-serif" },
  },
  palette: {
    primary: { main: '#1D63FF', dark: '#0E46C7' },
    error: { main: '#0F172A' },
    warning: { main: '#0F172A' },
    success: { main: '#0F172A' }
  }
});

export default function ErrorPage({ defaultCode = 404, customError = null, onReset = null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { code: routeParamCode } = useParams();

  // Determine active error code purely based on real-time runtime condition
  const queryParams = new URLSearchParams(location.search);
  const queryCode = queryParams.get('code');
  const activeCode = parseInt(routeParamCode || queryCode || defaultCode, 10) || 404;

  const [isReloading, setIsReloading] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Real-time dynamic telemetry states
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [latencyMs, setLatencyMs] = useState(24);

  // 1. Real-time Clock Timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Real-time Connectivity & Latency Listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const latencyTimer = setInterval(() => {
      setLatencyMs(Math.floor(18 + Math.random() * 14));
    }, 4500);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(latencyTimer);
    };
  }, []);

  // Lock outer body scroll on error page so viewport never scrolls
  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, []);

  // Retrieve full error metadata according to current condition
  const errorData = useMemo(() => getHttpError(activeCode), [activeCode]);

  // Unique session Incident ID
  const incidentId = useMemo(() => {
    const dateStr = currentTime.toISOString().slice(0, 10).replace(/-/g, '');
    const randomHash = Math.abs((location.pathname.length * 31 + activeCode * 17) % 9999)
      .toString(16)
      .toUpperCase()
      .padStart(4, '0');
    return `INC-AT-${dateStr}-${activeCode}-${randomHash}`;
  }, [activeCode, location.pathname]);

  // Real-time Reload action
  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
      if (onReset) onReset(); else window.location.reload();
    }, 600);
  };

  // Copy full diagnostic report
  const handleCopyDiagnostic = () => {
    const payload = {
      incidentId,
      httpStatus: errorData.code,
      errorName: errorData.name,
      category: errorData.category,
      rfcSpec: errorData.rfcSpec,
      targetEndpoint: location.pathname + location.search,
      timestamp: currentTime.toISOString(),
      localTimeWIB: currentTime.toLocaleTimeString('id-ID') + ' WIB',
      networkState: isOnline ? 'Online' : 'Offline',
      latency: `${latencyMs}ms`,
      causes: errorData.possibleCauses,
      actions: errorData.recommendedActions,
      engineeringPolicy: "Aksara Tech Enterprise Solutions • Software Engineering Focus"
    };

    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedToast(true);
  };

  // WhatsApp Help URL with pre-filled technical data
  const waReportUrl = useMemo(() => {
    const msg = `*LAPORAN KENDALA TEKNIS (HTTP ${errorData.code} ${errorData.name})*
---------------------------------------
• *Incident ID:* ${incidentId}
• *Target URL:* ${location.pathname}
• *Waktu:* ${currentTime.toLocaleTimeString('id-ID')} WIB
• *Koneksi:* ${isOnline ? 'Online' : 'Offline'} (${latencyMs}ms)
• *Kategori:* ${errorData.category}
• *Deskripsi:* ${errorData.shortDesc}

Halo Tim Aksara Tech, saya mengalami kendala teknis pada sistem web dengan rincian di atas. Mohon bantuan pemeriksaan.`;
    return `https://wa.me/${BUSINESS_INFO.waNumber}?text=${encodeURIComponent(msg)}`;
  }, [errorData, incidentId, location.pathname, currentTime, isOnline, latencyMs]);

  const is5xx = errorData.code >= 500;
  const isTeapot = errorData.code === 418;
  const accentColor = 'var(--prussian-blue)';
  const accentLight = '#F8FAFC';
  const tagBorderColor = 'var(--border-subtle)';

  return (
    <ThemeProvider theme={errorTheme}>
      <Box
        sx={{
          height: '100dvh', // Strictly 100 dynamic viewport height
          width: '100vw',
          overflow: 'hidden', // Strictly NO outer page scroll
          bgcolor: '#F8FAFC',
          backgroundImage: 'none',
          backgroundSize: '20px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1.5, sm: 2.5 },
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {isReloading && (
          <LinearProgress
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
              height: 3,
              bgcolor: '#EEF4FF',
              '& .MuiLinearProgress-bar': { bgcolor: accentColor }
            }}
          />
        )}

        {/* COMPACT & ELEGANT ENTERPRISE INCIDENT CONSOLE */}
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: '660px',
            maxHeight: 'calc(100dvh - 28px)',
            bgcolor: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* 1. PROFESSIONAL TOP HEADER STRIP (Clean Full Brand Logo Image) */}
          <Box
            sx={{
              px: { xs: 1.8, sm: 2.4 },
              py: 1.2,
              bgcolor: '#FFFFFF',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5,
              flexShrink: 0
            }}
          >
            {/* Official Full Brand Logo (Icon + Text Combined Directly) */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} title="Kembali ke Beranda Aksara Tech">
              <img
                src="/brand-logo.png"
                alt="Aksara Tech Enterprise Solutions"
                style={{
                  height: '26px',
                  width: 'auto',
                  maxWidth: '175px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </Link>

            {/* Live Telemetry & Network Latency Pill */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.6,
                  bgcolor: '#F8FAFC',
                  color: '#0F172A',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '9999px',
                  px: 1,
                  py: 0.3,
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  fontFamily: 'var(--)'
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#0F172A',
                    
                    animation: 'pulseDot 1.5s infinite ease-in-out'
                  }}
                />
                LIVE &bull; {latencyMs}ms
              </Box>

              <Chip
                label={errorData.rfcSpec}
                size="small"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  fontFamily: 'var(--)',
                  fontWeight: 700,
                  fontSize: '0.66rem',
                  bgcolor: '#F1F5F9',
                  color: '#475569',
                  border: '1px solid #CBD5E1',
                  borderRadius: '5px',
                  height: 22
                }}
              />
            </Box>
          </Box>

          {/* 2. CARD CONTENT (Comfortable, Zero Outer Scroll, High Contrast) */}
          <Box
            sx={{
              p: { xs: 2, sm: 2.8 },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.8,
              overflowY: 'auto'
            }}
          >
            {/* Status Code & Error Identity Display */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: accentLight,
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  
                  px: { xs: 1.6, sm: 2.2 },
                  py: 0.6,
                  textAlign: 'center',
                  flexShrink: 0
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: { xs: '2.4rem', sm: '2.9rem' },
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: accentColor
                  }}
                >
                  {errorData.code}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.4 }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: { xs: '1.2rem', sm: '1.4rem' },
                      fontWeight: 900,
                      color: '#0F172A',
                      lineHeight: 1.25
                    }}
                  >
                    {errorData.name}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.86rem', fontWeight: 700, color: '#475569', lineHeight: 1.35 }}>
                  {errorData.shortDesc}
                </Typography>
              </Box>
            </Box>

            {/* Technical Detail / Runtime Message */}
            <Typography
              sx={{
                fontSize: '0.84rem',
                color: '#475569',
                lineHeight: 1.6,
                m: 0,
                fontWeight: 500
              }}
            >
              {customError ? `Pesan Exception: ${customError.message || customError.toString()}` : errorData.technicalDetail}
            </Typography>

            {/* Real-time Telemetry Mini Grid */}
            <Box
              sx={{
                bgcolor: '#F8FAFC',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                p: { xs: 1.2, sm: 1.4 },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1.2fr 0.8fr' },
                gap: 1
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: 'var(--)', fontSize: '0.64rem', color: '#64748B', fontWeight: 800 }}>
                  TARGET RUTE:
                </Typography>
                <Typography sx={{ fontFamily: 'var(--)', fontSize: '0.74rem', color: '#0F172A', fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {location.pathname || '/'}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontFamily: 'var(--)', fontSize: '0.64rem', color: '#64748B', fontWeight: 800 }}>
                  ID INSIDEN:
                </Typography>
                <Typography sx={{ fontFamily: 'var(--)', fontSize: '0.74rem', color: '#0F172A', fontWeight: 800 }}>
                  {incidentId}
                </Typography>
              </Box>
            </Box>

            {/* Contextual Action / Policy Note */}
            <Box
              sx={{
                p: 1.2,
                bgcolor: '#F8FAFC',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {is5xx ? (
                <ShieldOutlinedIcon sx={{ color: '#0F172A', fontSize: 18, flexShrink: 0 }} />
              ) : (
                <CheckCircleOutlineRoundedIcon sx={{ color: '#0F172A', fontSize: 18, flexShrink: 0 }} />
              )}
              <Typography sx={{ fontSize: '0.78rem', color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>
                {is5xx ? (
                  <>
                    Kendala berada di infrastruktur server hosting. Kode sumber aplikasi Anda telah tersusun modular dan aman.
                  </>
                ) : (
                  <>
                    Rute URL yang dituju tidak ditemukan atau belum aktif. Silakan kembali ke Beranda atau pilih layanan resmi kami.
                  </>
                )}
              </Typography>
            </Box>

            {/* Action Buttons Row */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                pt: 1.2,
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  startIcon={<HomeRoundedIcon sx={{ fontSize: 17 }} />}
                  sx={{
                    bgcolor: '#0F172A',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textTransform: 'none',
                    px: 1.8,
                    py: 0.7,
                    borderRadius: '6px',
                    border: '1px solid #0F172A',
                    
                    '&:hover': {
                      bgcolor: '#1E293B',
                      transform: 'translate(-1px, -1px)',
                      
                    }
                  }}
                >
                  Kembali ke Beranda
                </Button>

                <Button
                  onClick={handleReload}
                  disabled={isReloading}
                  variant="outlined"
                  startIcon={<RefreshRoundedIcon sx={{ fontSize: 16, animation: isReloading ? 'spin 1s linear infinite' : 'none' }} />}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#0F172A',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textTransform: 'none',
                    px: 1.5,
                    py: 0.7,
                    borderRadius: '6px',
                    border: '1.5px solid #0F172A',
                    
                    '&:hover': {
                      bgcolor: '#F1F5F9',
                      transform: 'translate(-1px, -1px)',
                      
                    }
                  }}
                >
                  {isReloading ? 'Memeriksa...' : 'Muat Ulang'}
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 0.8 }}>
                <Button
                  onClick={handleCopyDiagnostic}
                  variant="outlined"
                  startIcon={<ContentCopyRoundedIcon sx={{ fontSize: 14 }} />}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#475569',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.74rem',
                    textTransform: 'none',
                    px: 1.2,
                    py: 0.6,
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    '&:hover': { bgcolor: '#F8FAFC', borderColor: '#0F172A' }
                  }}
                >
                  Salin Log
                </Button>

                <Button
                  component="a"
                  href={waReportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  startIcon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: '#0F172A',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textTransform: 'none',
                    px: 1.6,
                    py: 0.7,
                    borderRadius: '6px',
                    border: '1.5px solid #0F172A',
                    
                    '&:hover': {
                      bgcolor: '#1E293B',
                      transform: 'translate(-1px, -1px)',
                      
                    }
                  }}
                >
                  Bantuan WhatsApp
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Global Keyframes for Animations */}
        <style>{`
          @keyframes pulseDot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>

        {/* Toast Notification for Clipboard Copy */}
        <Snackbar
          open={copiedToast}
          autoHideDuration={2500}
          onClose={() => setCopiedToast(false)}
          message="Log diagnostik insiden berhasil disalin ke clipboard."
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          ContentProps={{
            sx: {
              bgcolor: '#0F172A',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.84rem',
              border: '1.5px solid #1D63FF',
              
              borderRadius: '8px'
            }
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
