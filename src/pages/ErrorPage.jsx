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
    primary: { main: '#1D63FF', dark: '#003153' },
    error: { main: '#DC2626' },
    warning: { main: '#D97706' },
    success: { main: '#059669' }
  }
});

export default function ErrorPage({ defaultCode = 404 }) {
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
  const [latencyMs, setLatencyMs] = useState(26);

  // 1. Real-time Clock Timer (Ticks every second)
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
      setLatencyMs(Math.floor(20 + Math.random() * 16));
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
      window.location.reload();
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
• *Waktu Kejadian:* ${currentTime.toLocaleTimeString('id-ID')} WIB
• *Koneksi Jaringan:* ${isOnline ? 'Online' : 'Offline'} (${latencyMs}ms)
• *Kategori:* ${errorData.category}
• *Deskripsi:* ${errorData.shortDesc}

Halo Tim Aksara Tech, saya mengalami kendala teknis pada sistem web dengan rincian di atas. Mohon bantuan pemeriksaan.`;
    return `https://wa.me/${BUSINESS_INFO.waNumber}?text=${encodeURIComponent(msg)}`;
  }, [errorData, incidentId, location.pathname, currentTime, isOnline, latencyMs]);

  const is5xx = errorData.code >= 500;
  const isTeapot = errorData.code === 418;
  const accentColor = is5xx ? '#DC2626' : isTeapot ? '#059669' : '#1D63FF';
  const accentLight = is5xx ? '#FEF2F2' : isTeapot ? '#ECFDF5' : '#EEF4FF';
  const tagBorderColor = is5xx ? '#F87171' : isTeapot ? '#34D399' : '#93C5FD';

  return (
    <ThemeProvider theme={errorTheme}>
      <Box
        component="main"
        sx={{
          height: '100dvh',
          maxHeight: '100dvh',
          width: '100vw',
          overflow: 'hidden', // Strictly NO outer page scroll
          bgcolor: '#F1F5F9',
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
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

        {/* COMPACT AUTHENTIC EXECUTIVE INCIDENT CARD */}
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: 'calc(100dvh - 32px)',
            bgcolor: '#FFFFFF',
            border: '2.5px solid #0F172A',
            borderRadius: '16px',
            boxShadow: '6px 6px 0px #0F172A',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* 1. COMPACT TOP HEADER STRIP */}
          <Box
            sx={{
              px: { xs: 1.8, sm: 2.4 },
              py: 1.1,
              bgcolor: '#F8FAFC',
              borderBottom: '2px solid #0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              flexShrink: 0
            }}
          >
            {/* Brand Logo & Name */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <img
                src="/brand-icon.png"
                alt="Aksara Tech"
                width="38"
                height="22"
                style={{
                  borderRadius: 5,
                  border: '1.2px solid #0F172A',
                  boxShadow: '1px 1px 0px #0F172A'
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 900,
                  fontSize: { xs: '0.92rem', sm: '1.02rem' },
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                  lineHeight: 1
                }}
              >
                AKSARA <span style={{ color: '#1D63FF' }}>TECH</span>
              </Typography>
            </Link>

            {/* Live Telemetry & Network Pill */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.6,
                  bgcolor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #10B981',
                  borderRadius: '5px',
                  px: 0.8,
                  py: 0.25,
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#10B981',
                    boxShadow: '0 0 5px #10B981',
                    animation: 'pulseDot 1.5s infinite ease-in-out'
                  }}
                />
                LIVE &bull; {currentTime.toLocaleTimeString('id-ID')} WIB
              </Box>

              <Tooltip title={isOnline ? 'Jaringan online stabil' : 'Koneksi perangkat terputus'}>
                <Chip
                  icon={isOnline ? <WifiRoundedIcon sx={{ fontSize: '13px !important' }} /> : <WifiOffRoundedIcon sx={{ fontSize: '13px !important' }} />}
                  label={isOnline ? `${latencyMs}ms` : 'Offline'}
                  size="small"
                  sx={{
                    height: 24,
                    fontWeight: 800,
                    fontSize: '0.68rem',
                    bgcolor: isOnline ? '#F0FDF4' : '#FEF2F2',
                    color: isOnline ? '#166534' : '#991B1B',
                    border: `1px solid ${isOnline ? '#86EFAC' : '#FCA5A5'}`,
                    borderRadius: '5px',
                    '& .MuiChip-icon': { color: 'inherit' }
                  }}
                />
              </Tooltip>
            </Box>
          </Box>

          {/* 2. CARD CONTENT (Fits comfortably on screen) */}
          <Box
            sx={{
              p: { xs: 2.2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              overflowY: 'auto'
            }}
          >
            {/* Status Code, Name & RFC Badge */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    bgcolor: accentLight,
                    border: '2px solid #0F172A',
                    borderRadius: '10px',
                    boxShadow: '2.5px 2.5px 0px #0F172A',
                    px: { xs: 1.8, sm: 2.2 },
                    py: 0.6,
                    textAlign: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: { xs: '2.4rem', sm: '2.8rem' },
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                      color: accentColor
                    }}
                  >
                    {errorData.code}
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.3 }}>
                    {is5xx ? (
                      <ErrorOutlineRoundedIcon sx={{ color: '#DC2626', fontSize: 20 }} />
                    ) : (
                      <WarningAmberRoundedIcon sx={{ color: '#D97706', fontSize: 20 }} />
                    )}
                    <Typography
                      variant="h1"
                      sx={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: { xs: '1.25rem', sm: '1.45rem' },
                        fontWeight: 900,
                        color: '#0F172A',
                        lineHeight: 1.2
                      }}
                    >
                      {errorData.name}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155', lineHeight: 1.35 }}>
                    {errorData.shortDesc}
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={errorData.rfcSpec}
                size="small"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  bgcolor: '#F1F5F9',
                  color: '#475569',
                  border: '1px solid #CBD5E1',
                  borderRadius: '5px'
                }}
              />
            </Box>

            {/* Technical Detail */}
            <Typography
              sx={{
                fontSize: '0.82rem',
                color: '#64748B',
                lineHeight: 1.55,
                m: 0
              }}
            >
              {errorData.technicalDetail}
            </Typography>

            {/* Real-time Telemetry Mini Grid */}
            <Box
              sx={{
                bgcolor: '#F8FAFC',
                border: '1.5px solid #CBD5E1',
                borderRadius: '8px',
                p: { xs: 1.2, sm: 1.5 },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 1
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: '#64748B', fontWeight: 800 }}>
                  TARGET ENDPOINT:
                </Typography>
                <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#0F172A', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {location.pathname || '/'}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: '#64748B', fontWeight: 800 }}>
                  INCIDENT ID:
                </Typography>
                <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#0F172A', fontWeight: 700 }}>
                  {incidentId}
                </Typography>
              </Box>
            </Box>

            {/* Contextual Action / Policy Note */}
            <Box
              sx={{
                p: 1.2,
                bgcolor: is5xx ? '#FEF2F2' : '#EFF6FF',
                border: `1.2px solid ${is5xx ? '#FCA5A5' : '#93C5FD'}`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {is5xx ? (
                <ShieldOutlinedIcon sx={{ color: '#DC2626', fontSize: 18, flexShrink: 0 }} />
              ) : (
                <CheckCircleOutlineRoundedIcon sx={{ color: '#1D63FF', fontSize: 18, flexShrink: 0 }} />
              )}
              <Typography sx={{ fontSize: '0.76rem', color: is5xx ? '#991B1B' : '#1E40AF', lineHeight: 1.45, fontWeight: 600 }}>
                {is5xx ? (
                  <>
                    Kendala berada di infrastruktur server hosting. Sesuai <strong>Kebijakan Aksara Tech</strong>, kode sumber telah modular dan siap verifikasi.
                  </>
                ) : (
                  <>
                    Silakan periksa kembali alamat tautan atau gunakan navigasi resmi di bawah untuk kembali ke sistem.
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
                pt: 1,
                borderTop: '1.5px solid #F1F5F9'
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
                    border: '1.5px solid #0F172A',
                    boxShadow: '2.5px 2.5px 0px var(--prussian-blue)',
                    '&:hover': {
                      bgcolor: '#1E293B',
                      transform: 'translate(-1px, -1px)',
                      boxShadow: '3.5px 3.5px 0px var(--prussian-blue)'
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
                    px: 1.6,
                    py: 0.7,
                    borderRadius: '6px',
                    border: '1.5px solid #0F172A',
                    boxShadow: '2px 2px 0px #0F172A',
                    '&:hover': {
                      bgcolor: '#F1F5F9',
                      transform: 'translate(-1px, -1px)',
                      boxShadow: '3px 3px 0px #0F172A'
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
                    bgcolor: '#059669',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textTransform: 'none',
                    px: 1.6,
                    py: 0.7,
                    borderRadius: '6px',
                    border: '1.5px solid #0F172A',
                    boxShadow: '2px 2px 0px #0F172A',
                    '&:hover': {
                      bgcolor: '#047857',
                      transform: 'translate(-1px, -1px)',
                      boxShadow: '3px 3px 0px #0F172A'
                    }
                  }}
                >
                  Bantuan WhatsApp
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Copy Toast Feedback */}
        <Snackbar
          open={copiedToast}
          autoHideDuration={2500}
          onClose={() => setCopiedToast(false)}
          message="Log diagnostik insiden berhasil disalin ke clipboard!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              bgcolor: '#0F172A',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.8rem',
              border: '1.5px solid #FFCE32',
              boxShadow: '3px 3px 0px #0F172A',
              borderRadius: '6px'
            }
          }}
        />

        <style>{`
          @keyframes pulseDot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Box>
    </ThemeProvider>
  );
}
