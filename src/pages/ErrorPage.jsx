import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Alert,
  IconButton,
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
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import WifiOffRoundedIcon from '@mui/icons-material/WifiOffRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

import { HTTP_ERRORS, getHttpError, getAllHttpErrors } from '../data/httpErrorCatalog';
import { BUSINESS_INFO } from '../data/catalogData';

const errorTheme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: { fontFamily: "'Space Grotesk', sans-serif" },
    h2: { fontFamily: "'Space Grotesk', sans-serif" },
    h3: { fontFamily: "'Space Grotesk', sans-serif" },
    h4: { fontFamily: "'Space Grotesk', sans-serif" },
    h5: { fontFamily: "'Space Grotesk', sans-serif" },
    h6: { fontFamily: "'Space Grotesk', sans-serif" },
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

  // Determine active error code
  const queryParams = new URLSearchParams(location.search);
  const queryCode = queryParams.get('code');
  const initialCode = parseInt(routeParamCode || queryCode || defaultCode, 10) || 404;

  const [activeCode, setActiveCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState('causes'); // 'causes' | 'json' | 'catalog'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | '4xx' | '5xx'
  const [isReloading, setIsReloading] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Real-time dynamic telemetry states
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [latencyMs, setLatencyMs] = useState(28);

  // Sync with route parameter if changed
  useEffect(() => {
    if (routeParamCode) {
      const codeNum = parseInt(routeParamCode, 10);
      if (codeNum && HTTP_ERRORS[codeNum]) {
        setActiveCode(codeNum);
      }
    }
  }, [routeParamCode]);

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
      setLatencyMs(Math.floor(20 + Math.random() * 18));
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

  // Retrieve full error metadata
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

  // Master list of all 40 codes
  const allErrorsList = useMemo(() => getAllHttpErrors(), []);

  // Filtered list for the switcher
  const filteredErrors = useMemo(() => {
    return allErrorsList.filter(item => {
      if (filterCategory === '4xx' && (item.code < 400 || item.code >= 500)) return false;
      if (filterCategory === '5xx' && (item.code < 500 || item.code >= 600)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return item.code.toString().includes(q) || item.name.toLowerCase().includes(q) || item.shortDesc.toLowerCase().includes(q);
      }
      return true;
    });
  }, [allErrorsList, filterCategory, searchQuery]);

  // Select another code in real-time
  const handleSelectCode = (code) => {
    setActiveCode(code);
    setActiveTab('causes');
    navigate(`/error/${code}`, { replace: true });
  };

  // Real-time Reload simulation
  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
      if (location.pathname === '/' || location.pathname === '/error') {
        window.location.reload();
      }
    }, 600);
  };

  // Copy full diagnostic JSON
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

  // WhatsApp Help URL
  const waReportUrl = useMemo(() => {
    const msg = `*LAPORAN KENDALA TEKNIS (HTTP ${errorData.code} ${errorData.name})*
---------------------------------------
• *Incident ID:* ${incidentId}
• *Target URL:* ${location.pathname}
• *Waktu:* ${currentTime.toLocaleTimeString('id-ID')} WIB
• *Koneksi:* ${isOnline ? 'Online' : 'Offline'} (${latencyMs}ms)
• *Kategori:* ${errorData.category}
• *Deskripsi:* ${errorData.shortDesc}

Halo Tim Aksara Tech, saya mengalami kendala teknis pada sistem web dengan rincian di atas. Mohon arahan pemeriksaan.`;
    return `https://wa.me/${BUSINESS_INFO.waNumber}?text=${encodeURIComponent(msg)}`;
  }, [errorData, incidentId, location.pathname, currentTime, isOnline, latencyMs]);

  const is5xx = errorData.code >= 500;
  const isTeapot = errorData.code === 418;
  const accentColor = is5xx ? '#DC2626' : isTeapot ? '#059669' : '#1D63FF';
  const accentLight = is5xx ? '#FEF2F2' : isTeapot ? '#ECFDF5' : '#EEF4FF';
  const tagBorderColor = is5xx ? '#F87171' : isTeapot ? '#34D399' : '#93C5FD';

  // Popular quick switcher codes
  const quickCodes = [404, 400, 401, 403, 408, 422, 429, 500, 502, 503, 504, 418];

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
          p: { xs: 1.5, sm: 2, md: 3 },
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

        {/* SINGLE MASTER INCIDENT CONSOLE (Zero-scroll Executive Card) */}
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: '1080px',
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
              px: { xs: 1.5, sm: 2.2 },
              py: 1,
              bgcolor: '#F8FAFC',
              borderBottom: '2px solid #0F172A',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              flexShrink: 0
            }}
          >
            {/* Brand + Live Clock */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
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

              <Box sx={{ width: '1px', height: '18px', bgcolor: '#CBD5E1', mx: 0.2, display: { xs: 'none', sm: 'block' } }} />

              {/* Real-time Telemetry Pill */}
              <Box
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  alignItems: 'center',
                  gap: 0.6,
                  bgcolor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #10B981',
                  borderRadius: '5px',
                  px: 0.8,
                  py: 0.2,
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
            </Box>

            {/* Right Status Badges & Quick Action */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title={isOnline ? 'Jaringan terhubung (Online)' : 'Koneksi terputus'}>
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

              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#64748B',
                  bgcolor: '#FFFFFF',
                  px: 0.8,
                  py: 0.2,
                  borderRadius: '5px',
                  border: '1px solid #CBD5E1'
                }}
              >
                {incidentId}
              </Box>

              <Button
                component={Link}
                to="/"
                size="small"
                startIcon={<HomeRoundedIcon sx={{ fontSize: 15 }} />}
                sx={{
                  height: 28,
                  textTransform: 'none',
                  fontWeight: 800,
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-heading)',
                  color: '#0F172A',
                  border: '1.5px solid #0F172A',
                  borderRadius: '6px',
                  bgcolor: '#FFFFFF',
                  px: 1.2,
                  boxShadow: '1.5px 1.5px 0px #0F172A',
                  '&:hover': {
                    bgcolor: '#F1F5F9',
                    transform: 'translate(-1px, -1px)',
                    boxShadow: '2.5px 2.5px 0px #0F172A'
                  }
                }}
              >
                Ke Beranda
              </Button>
            </Box>
          </Box>

          {/* 2. SPLIT BODY: Left Hero Status + Right Interactive Console */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.05fr 1.35fr' },
              minHeight: 0,
              flex: 1,
              overflow: 'hidden'
            }}
          >
            {/* LEFT COLUMN: Clean Neo-Brutalist Status Summary */}
            <Box
              sx={{
                p: { xs: 2, sm: 2.8, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRight: { md: '2px solid #0F172A' },
                borderBottom: { xs: '2px solid #0F172A', md: 'none' },
                bgcolor: '#FFFFFF',
                overflowY: { xs: 'auto', md: 'hidden' }
              }}
            >
              <Box>
                {/* Protocol Tag & RFC */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
                  <Chip
                    label={errorData.category.toUpperCase()}
                    size="small"
                    sx={{
                      height: 22,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 900,
                      fontSize: '0.68rem',
                      bgcolor: accentLight,
                      color: accentColor,
                      border: `1.2px solid ${tagBorderColor}`,
                      borderRadius: '5px'
                    }}
                  />
                  <Chip
                    label={errorData.rfcSpec}
                    size="small"
                    sx={{
                      height: 22,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '0.66rem',
                      bgcolor: '#F1F5F9',
                      color: '#475569',
                      border: '1px solid #CBD5E1',
                      borderRadius: '5px'
                    }}
                  />
                </Box>

                {/* Massive Code & Title */}
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.2rem' },
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                      color: accentColor
                    }}
                  >
                    {errorData.code}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
                      fontWeight: 900,
                      color: '#0F172A',
                      lineHeight: 1.15
                    }}
                  >
                    {errorData.name}
                  </Typography>
                </Box>

                {/* Concise Indonesian Description */}
                <Typography
                  sx={{
                    fontSize: { xs: '0.86rem', sm: '0.94rem' },
                    fontWeight: 700,
                    color: '#334155',
                    lineHeight: 1.45,
                    mb: 1
                  }}
                >
                  {errorData.shortDesc}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.78rem',
                    color: '#64748B',
                    lineHeight: 1.5,
                    mb: 1.8,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  {errorData.technicalDetail}
                </Typography>

                {/* Target URL Pill */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.8,
                    bgcolor: '#F8FAFC',
                    border: '1.2px solid #CBD5E1',
                    borderRadius: '6px',
                    px: 1,
                    py: 0.4,
                    maxWidth: '100%'
                  }}
                >
                  <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#64748B', fontWeight: 800 }}>
                    ENDPOINT:
                  </Typography>
                  <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#0F172A', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {location.pathname || '/'}
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons Row */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  mt: { xs: 2, md: 2.5 },
                  pt: 1.5,
                  borderTop: '1px solid #F1F5F9'
                }}
              >
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  size="small"
                  startIcon={<HomeRoundedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: '#0F172A',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    px: 1.6,
                    py: 0.6,
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
                  size="small"
                  startIcon={<RefreshRoundedIcon sx={{ fontSize: 16, animation: isReloading ? 'spin 1s linear infinite' : 'none' }} />}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#0F172A',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    px: 1.4,
                    py: 0.6,
                    borderRadius: '6px',
                    border: '1.5px solid #0F172A',
                    boxShadow: '2px 2px 0px #0F172A',
                    '&:hover': {
                      bgcolor: '#F1F5F9',
                      border: '1.5px solid #0F172A',
                      transform: 'translate(-1px, -1px)',
                      boxShadow: '3px 3px 0px #0F172A'
                    }
                  }}
                >
                  {isReloading ? 'Memeriksa...' : 'Muat Ulang'}
                </Button>

                <Button
                  component="a"
                  href={waReportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="small"
                  startIcon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: '#059669',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    px: 1.5,
                    py: 0.6,
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
                  Lapor WA
                </Button>
              </Box>
            </Box>

            {/* RIGHT COLUMN: Interactive Diagnostic Console & Switcher */}
            <Box
              sx={{
                p: { xs: 1.8, sm: 2.4 },
                bgcolor: '#FAFCFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0,
                overflow: 'hidden'
              }}
            >
              {/* Top Tab Switcher */}
              <Box sx={{ flexShrink: 0, mb: 1.2 }}>
                <Box sx={{ display: 'flex', borderBottom: '1.5px solid #CBD5E1', gap: 0.5 }}>
                  <Button
                    onClick={() => setActiveTab('causes')}
                    size="small"
                    startIcon={<AssignmentTurnedInRoundedIcon sx={{ fontSize: 15 }} />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-heading)',
                      pb: 0.8,
                      pt: 0.4,
                      px: 1.2,
                      color: activeTab === 'causes' ? '#0F172A' : '#64748B',
                      borderBottom: activeTab === 'causes' ? '2.5px solid #1D63FF' : '2.5px solid transparent',
                      borderRadius: 0,
                      '&:hover': { bgcolor: 'transparent', color: '#0F172A' }
                    }}
                  >
                    Penyebab &amp; Solusi
                  </Button>

                  <Button
                    onClick={() => setActiveTab('json')}
                    size="small"
                    startIcon={<TerminalRoundedIcon sx={{ fontSize: 15 }} />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-heading)',
                      pb: 0.8,
                      pt: 0.4,
                      px: 1.2,
                      color: activeTab === 'json' ? '#0F172A' : '#64748B',
                      borderBottom: activeTab === 'json' ? '2.5px solid #1D63FF' : '2.5px solid transparent',
                      borderRadius: 0,
                      '&:hover': { bgcolor: 'transparent', color: '#0F172A' }
                    }}
                  >
                    Log JSON
                  </Button>

                  <Button
                    onClick={() => setActiveTab('catalog')}
                    size="small"
                    startIcon={<CodeRoundedIcon sx={{ fontSize: 15 }} />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-heading)',
                      pb: 0.8,
                      pt: 0.4,
                      px: 1.2,
                      color: activeTab === 'catalog' ? '#0F172A' : '#64748B',
                      borderBottom: activeTab === 'catalog' ? '2.5px solid #1D63FF' : '2.5px solid transparent',
                      borderRadius: 0,
                      '&:hover': { bgcolor: 'transparent', color: '#0F172A' }
                    }}
                  >
                    Pilih 40 Kode
                  </Button>
                </Box>
              </Box>

              {/* Middle Panel: Tab Contents with constrained height (zero outer scroll) */}
              <Box
                sx={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  pr: 0.5,
                  mb: 1.2,
                  '&::-webkit-scrollbar': { width: 5 },
                  '&::-webkit-scrollbar-thumb': { bgcolor: '#CBD5E1', borderRadius: 3 }
                }}
              >
                {/* TAB 1: Causes & Actions */}
                {activeTab === 'causes' && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: '#475569', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      KEMUNGKINAN PENYEBAB TEKNIS:
                    </Typography>
                    {errorData.possibleCauses.slice(0, 3).map((cause, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          p: 1.1,
                          bgcolor: '#FFFFFF',
                          border: '1.2px solid #E2E8F0',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1
                        }}
                      >
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            bgcolor: '#EEF4FF',
                            color: '#1D63FF',
                            border: '1px solid #93C5FD',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            fontWeight: 900,
                            flexShrink: 0,
                            mt: 0.1
                          }}
                        >
                          {idx + 1}
                        </Box>
                        <Typography sx={{ fontSize: '0.78rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                          {cause}
                        </Typography>
                      </Box>
                    ))}

                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: '#065F46', letterSpacing: '0.04em', textTransform: 'uppercase', mt: 0.5 }}>
                      LANGKAH PENYELESAIAN TERARAH:
                    </Typography>
                    {errorData.recommendedActions.slice(0, 2).map((action, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          p: 1.1,
                          bgcolor: '#F0FDF4',
                          border: '1.2px solid #86EFAC',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 0.8
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon sx={{ color: '#059669', fontSize: 16, flexShrink: 0, mt: 0.1 }} />
                        <Typography sx={{ fontSize: '0.78rem', color: '#166534', lineHeight: 1.45, fontWeight: 600 }}>
                          {action}
                        </Typography>
                      </Box>
                    ))}

                    <Box
                      sx={{
                        p: 1,
                        mt: 0.3,
                        bgcolor: '#FFFBEB',
                        border: '1px solid #FDE68A',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8
                      }}
                    >
                      <ShieldOutlinedIcon sx={{ color: '#D97706', fontSize: 16, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '0.7rem', color: '#92400E', fontWeight: 600, lineHeight: 1.35 }}>
                        <strong>Aksara Tech Policy:</strong> Rekayasa kode berstandar enterprise. Urusan hosting/server publik adalah hak akses Klien.
                      </Typography>
                    </Box>
                  </Box>
                )}

                {/* TAB 2: Developer JSON Terminal */}
                {activeTab === 'json' && (
                  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.6 }}>
                      <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#64748B' }}>
                        INCIDENT PAYLOAD CONSOLE
                      </Typography>
                      <Button
                        size="small"
                        onClick={handleCopyDiagnostic}
                        startIcon={<ContentCopyRoundedIcon sx={{ fontSize: 13 }} />}
                        sx={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'none',
                          p: '2px 8px',
                          color: '#1D63FF',
                          fontWeight: 700
                        }}
                      >
                        Salin JSON
                      </Button>
                    </Box>
                    <Box
                      component="pre"
                      sx={{
                        m: 0,
                        p: 1.2,
                        bgcolor: '#0F172A',
                        color: '#38BDF8',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        lineHeight: 1.45,
                        overflowX: 'auto',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        flex: 1
                      }}
                    >
                      {JSON.stringify(
                        {
                          incidentId,
                          httpStatus: errorData.code,
                          name: errorData.name,
                          category: errorData.category,
                          rfcSpec: errorData.rfcSpec,
                          endpoint: location.pathname || '/',
                          timestamp: currentTime.toISOString(),
                          network: isOnline ? 'Online' : 'Offline',
                          latency: `${latencyMs}ms`,
                          causes: errorData.possibleCauses.slice(0, 2),
                          actions: errorData.recommendedActions.slice(0, 2)
                        },
                        null,
                        2
                      )}
                    </Box>
                  </Box>
                )}

                {/* TAB 3: Interactive 40 Code Picker */}
                {activeTab === 'catalog' && (
                  <Box>
                    <Box sx={{ display: 'flex', gap: 0.8, mb: 1 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Cari kode (404, 500, timeout)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchRoundedIcon sx={{ fontSize: 16, color: '#64748B' }} />
                            </InputAdornment>
                          ),
                          sx: { height: 30, fontSize: '0.76rem', bgcolor: '#FFFFFF', borderRadius: '5px' }
                        }}
                      />
                      <Box sx={{ display: 'flex', gap: 0.4 }}>
                        <Button
                          size="small"
                          onClick={() => setFilterCategory('all')}
                          sx={{
                            minWidth: 42,
                            height: 30,
                            p: 0,
                            fontSize: '0.66rem',
                            fontWeight: 800,
                            borderRadius: '5px',
                            border: '1px solid #0F172A',
                            bgcolor: filterCategory === 'all' ? '#0F172A' : '#FFFFFF',
                            color: filterCategory === 'all' ? '#FFFFFF' : '#0F172A'
                          }}
                        >
                          All
                        </Button>
                        <Button
                          size="small"
                          onClick={() => setFilterCategory('4xx')}
                          sx={{
                            minWidth: 42,
                            height: 30,
                            p: 0,
                            fontSize: '0.66rem',
                            fontWeight: 800,
                            borderRadius: '5px',
                            border: '1px solid #0F172A',
                            bgcolor: filterCategory === '4xx' ? '#1D63FF' : '#FFFFFF',
                            color: filterCategory === '4xx' ? '#FFFFFF' : '#0F172A'
                          }}
                        >
                          4xx
                        </Button>
                        <Button
                          size="small"
                          onClick={() => setFilterCategory('5xx')}
                          sx={{
                            minWidth: 42,
                            height: 30,
                            p: 0,
                            fontSize: '0.66rem',
                            fontWeight: 800,
                            borderRadius: '5px',
                            border: '1px solid #0F172A',
                            bgcolor: filterCategory === '5xx' ? '#DC2626' : '#FFFFFF',
                            color: filterCategory === '5xx' ? '#FFFFFF' : '#0F172A'
                          }}
                        >
                          5xx
                        </Button>
                      </Box>
                    </Box>

                    {/* Compact Grid of Code Chips */}
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 0.6
                      }}
                    >
                      {filteredErrors.map((item) => {
                        const isSelected = item.code === activeCode;
                        const itemIs5xx = item.code >= 500;
                        return (
                          <Button
                            key={item.code}
                            onClick={() => handleSelectCode(item.code)}
                            sx={{
                              p: '5px 8px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              textTransform: 'none',
                              borderRadius: '5px',
                              border: isSelected ? '1.5px solid #0F172A' : '1px solid #E2E8F0',
                              bgcolor: isSelected ? (itemIs5xx ? '#FEE2E2' : '#DBEAFE') : '#FFFFFF',
                              color: '#0F172A',
                              boxShadow: isSelected ? '1.5px 1.5px 0px #0F172A' : 'none',
                              '&:hover': {
                                bgcolor: isSelected ? (itemIs5xx ? '#FEE2E2' : '#DBEAFE') : '#F1F5F9',
                                borderColor: '#0F172A'
                              }
                            }}
                          >
                            <Typography sx={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.72rem', color: itemIs5xx ? '#DC2626' : '#1D63FF' }}>
                              {item.code}
                            </Typography>
                            <Typography sx={{ fontSize: '0.64rem', fontWeight: 600, color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '65px' }}>
                              {item.name}
                            </Typography>
                          </Button>
                        );
                      })}
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Bottom Quick Switcher Pills Row */}
              <Box sx={{ flexShrink: 0, pt: 1, borderTop: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: '#64748B', fontWeight: 800 }}>
                    PINTASAN KODE CEPAT:
                  </Typography>
                  <Button
                    size="small"
                    onClick={handleCopyDiagnostic}
                    startIcon={<ContentCopyRoundedIcon sx={{ fontSize: 12 }} />}
                    sx={{
                      p: '0 4px',
                      height: 20,
                      fontSize: '0.64rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      textTransform: 'none',
                      color: '#0F172A'
                    }}
                  >
                    Salin Log
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {quickCodes.map((code) => {
                    const isCurrent = code === activeCode;
                    return (
                      <Chip
                        key={code}
                        clickable
                        onClick={() => handleSelectCode(code)}
                        label={code}
                        size="small"
                        sx={{
                          height: 22,
                          px: 0.3,
                          fontWeight: 800,
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          border: isCurrent ? '1.5px solid #0F172A' : '1px solid #CBD5E1',
                          bgcolor: isCurrent ? '#FFCE32' : '#FFFFFF',
                          color: '#0F172A',
                          boxShadow: isCurrent ? '1.5px 1.5px 0px #0F172A' : 'none',
                          '&:hover': { bgcolor: isCurrent ? '#FFCE32' : '#F1F5F9' }
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Copy Toast Feedback */}
        <Snackbar
          open={copiedToast}
          autoHideDuration={2500}
          onClose={() => setCopiedToast(false)}
          message="Log diagnostik berhasil disalin ke clipboard!"
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
