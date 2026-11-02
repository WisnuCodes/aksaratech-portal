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
  Collapse,
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

import { HTTP_ERRORS, getHttpError, getAllHttpErrors } from '../data/httpErrorCatalog';
import { BUSINESS_INFO } from '../data/catalogData';

// Theme for consistent brand typography and clean neo-brutalist feel
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
    primary: {
      main: '#1D63FF',
      dark: '#003153',
    },
    error: {
      main: '#DC2626',
    },
    warning: {
      main: '#D97706',
    },
    success: {
      main: '#059669',
    }
  }
});

export default function ErrorPage({ defaultCode = 404 }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { code: routeParamCode } = useParams();

  // Determine active error code: from URL param, query param, or default
  const queryParams = new URLSearchParams(location.search);
  const queryCode = queryParams.get('code');
  const initialCode = parseInt(routeParamCode || queryCode || defaultCode, 10) || 404;

  const [activeCode, setActiveCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState('causes'); // 'causes' | 'actions' | 'json'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | '4xx' | '5xx'
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Real-time dynamic states
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [latencyMs, setLatencyMs] = useState(32);

  // Sync with route parameter if it changes
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
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Real-time Online/Offline Connectivity Listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Minor simulated telemetry jitter for ping latency (20ms - 45ms)
    const latencyTimer = setInterval(() => {
      setLatencyMs(Math.floor(22 + Math.random() * 20));
    }, 4000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(latencyTimer);
    };
  }, []);

  // Retrieve full error metadata for active code
  const errorData = useMemo(() => {
    return getHttpError(activeCode);
  }, [activeCode]);

  // Generate a dynamic incident ID based on code and timestamp session
  const incidentId = useMemo(() => {
    const dateStr = currentTime.toISOString().slice(0, 10).replace(/-/g, '');
    const randomHash = Math.abs((location.pathname.length * 31 + activeCode * 17) % 9999).toString(16).toUpperCase().padStart(4, '0');
    return `INC-AT-${dateStr}-${activeCode}-${randomHash}`;
  }, [activeCode, location.pathname]);

  // Filtered error codes for the interactive catalog/switcher
  const allErrorsList = useMemo(() => {
    return getAllHttpErrors();
  }, []);

  const filteredErrors = useMemo(() => {
    return allErrorsList.filter(item => {
      // Category filter
      if (filterCategory === '4xx' && (item.code < 400 || item.code >= 500)) return false;
      if (filterCategory === '5xx' && (item.code < 500 || item.code >= 600)) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const codeMatch = item.code.toString().includes(query);
        const nameMatch = item.name.toLowerCase().includes(query);
        const descMatch = item.shortDesc.toLowerCase().includes(query);
        return codeMatch || nameMatch || descMatch;
      }

      return true;
    });
  }, [allErrorsList, filterCategory, searchQuery]);

  // Handle switching code
  const handleSelectCode = (code) => {
    setActiveCode(code);
    setIsInspectorOpen(false);
    navigate(`/error/${code}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Real-time Reload simulation
  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
      // If on catch-all and user reloads, re-check or refresh
      if (location.pathname === '/' || location.pathname === '/error') {
        window.location.reload();
      }
    }, 700);
  };

  // Copy full diagnostic payload to clipboard
  const handleCopyDiagnostic = () => {
    const diagnosticPayload = {
      incidentId: incidentId,
      httpStatus: errorData.code,
      errorName: errorData.name,
      category: errorData.category,
      rfcSpecification: errorData.rfcSpec,
      requestedPath: location.pathname + location.search,
      timestamp: currentTime.toISOString(),
      localTimeWIB: currentTime.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' WIB',
      networkState: isOnline ? 'Online' : 'Offline',
      simulatedLatency: `${latencyMs}ms`,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      platform: 'Aksara Tech Enterprise Solutions Platform',
      technicalCauses: errorData.possibleCauses,
      recommendedActions: errorData.recommendedActions
    };

    navigator.clipboard.writeText(JSON.stringify(diagnosticPayload, null, 2));
    setCopiedToast(true);
  };

  // Format WhatsApp message with real-time log details
  const waReportUrl = useMemo(() => {
    const msg = `*LAPORAN KENDALA TEKNIS (HTTP ${errorData.code} ${errorData.name})*
---------------------------------------
• *Incident ID:* ${incidentId}
• *Target Path:* ${location.pathname}
• *Waktu Kejadian:* ${currentTime.toLocaleTimeString('id-ID')} WIB
• *Status Jaringan:* ${isOnline ? 'Online' : 'Offline'} (${latencyMs}ms)
• *Kategori:* ${errorData.category}
• *Deskripsi:* ${errorData.shortDesc}

Halo Tim Aksara Tech, saya mengalami kendala teknis pada sistem web dengan rincian di atas. Mohon bantuan pengecekan atau panduan langkah lebih lanjut.`;
    return `https://wa.me/${BUSINESS_INFO.waNumber}?text=${encodeURIComponent(msg)}`;
  }, [errorData, incidentId, location.pathname, currentTime, isOnline, latencyMs]);

  // Color theme variables based on error severity
  const is5xx = errorData.code >= 500;
  const is404 = errorData.code === 404;
  const isTeapot = errorData.code === 418;

  const accentColor = is5xx ? '#DC2626' : isTeapot ? '#059669' : '#1D63FF';
  const accentLight = is5xx ? '#FEF2F2' : isTeapot ? '#ECFDF5' : '#EEF4FF';
  const tagBorderColor = is5xx ? '#F87171' : isTeapot ? '#34D399' : '#93C5FD';

  // Common high-frequency codes for quick switching pills
  const quickCodes = [404, 400, 401, 403, 408, 422, 429, 500, 502, 503, 504, 418];

  return (
    <ThemeProvider theme={errorTheme}>
      <Box 
        component="section" 
        sx={{
          minHeight: '85vh',
          bgcolor: '#F8FAFC',
          py: { xs: 4, sm: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden'
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
              height: 4,
              bgcolor: '#EEF4FF',
              '& .MuiLinearProgress-bar': { bgcolor: accentColor }
            }} 
          />
        )}

        <Container maxWidth="lg">
          
          {/* TOP BAR: Real-time Live Telemetry Strip */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 1.8 },
              mb: 3.5,
              bgcolor: '#FFFFFF',
              border: '2px solid #0F172A',
              borderRadius: '12px',
              boxShadow: '3px 3px 0px #0F172A',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5
            }}
          >
            {/* Live Indicator & Clock */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.8,
                  bgcolor: '#ECFDF5',
                  color: '#059669',
                  border: '1.2px solid #10B981',
                  borderRadius: '6px',
                  px: 1,
                  py: 0.35,
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: '#10B981',
                    boxShadow: '0 0 6px #10B981',
                    animation: 'pulseDot 1.5s infinite ease-in-out'
                  }}
                />
                LIVE TELEMETRI
              </Box>

              <Typography
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: { xs: '0.75rem', sm: '0.82rem' },
                  color: '#475569',
                  fontWeight: 600
                }}
              >
                {currentTime.toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })} &bull;{' '}
                <Box component="span" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {currentTime.toLocaleTimeString('id-ID')} WIB
                </Box>
              </Typography>
            </Box>

            {/* Network State & Incident Hash */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Tooltip title={isOnline ? 'Jaringan terhubung dengan latensi stabil' : 'Koneksi perangkat Anda terputus'}>
                <Chip
                  icon={isOnline ? <WifiRoundedIcon sx={{ fontSize: '15px !important' }} /> : <WifiOffRoundedIcon sx={{ fontSize: '15px !important' }} />}
                  label={isOnline ? `Online (${latencyMs}ms)` : 'Offline'}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    bgcolor: isOnline ? '#F0FDF4' : '#FEF2F2',
                    color: isOnline ? '#166534' : '#991B1B',
                    border: `1.2px solid ${isOnline ? '#86EFAC' : '#FCA5A5'}`,
                    borderRadius: '6px',
                    '& .MuiChip-icon': { color: 'inherit' }
                  }}
                />
              </Tooltip>

              <Box
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#64748B',
                  bgcolor: '#F1F5F9',
                  px: 1,
                  py: 0.4,
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                ID: <strong>{incidentId}</strong>
              </Box>

              {/* Inspector Toggle Button */}
              <Button
                variant="outlined"
                size="small"
                onClick={() => setIsInspectorOpen(!isInspectorOpen)}
                startIcon={<TuneRoundedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  color: '#0F172A',
                  borderColor: '#0F172A',
                  borderWidth: '1.5px',
                  borderRadius: '6px',
                  bgcolor: isInspectorOpen ? '#FFCE32' : '#FFFFFF',
                  boxShadow: '1.5px 1.5px 0px #0F172A',
                  '&:hover': {
                    borderColor: '#0F172A',
                    bgcolor: '#FFCE32',
                    borderWidth: '1.5px',
                    transform: 'translate(-1px, -1px)',
                    boxShadow: '2.5px 2.5px 0px #0F172A'
                  }
                }}
              >
                {isInspectorOpen ? 'Tutup Katalog Error' : 'Inspeksi 40 Kode Error'}
              </Button>
            </Box>
          </Paper>

          {/* COLLAPSIBLE ERROR CODE INSPECTOR & SIMULATOR (All 40 codes from 4xx & 5xx) */}
          <Collapse in={isInspectorOpen} timeout={300}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5 },
                mb: 3.5,
                bgcolor: '#FFFFFF',
                border: '2.5px solid #0F172A',
                borderRadius: '12px',
                boxShadow: '4px 4px 0px #0F172A'
              }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: '#0F172A', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeRoundedIcon sx={{ color: '#1D63FF', fontSize: 20 }} />
                    Katalog Lengkap HTTP Error Console (40 Kode Resmi)
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.8rem' }}>
                    Pilih kode status di bawah untuk melihat spesifikasi RFC, rincian teknis, dan alur solusinya secara real-time.
                  </Typography>
                </Box>

                {/* Filter Pills */}
                <Box sx={{ display: 'flex', gap: 0.8 }}>
                  <Button
                    size="small"
                    onClick={() => setFilterCategory('all')}
                    sx={{
                      px: 1.2,
                      py: 0.4,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      borderRadius: '6px',
                      textTransform: 'none',
                      border: '1.5px solid #0F172A',
                      bgcolor: filterCategory === 'all' ? '#0F172A' : '#FFFFFF',
                      color: filterCategory === 'all' ? '#FFFFFF' : '#0F172A',
                      '&:hover': { bgcolor: filterCategory === 'all' ? '#1E293B' : '#F1F5F9' }
                    }}
                  >
                    Semua ({allErrorsList.length})
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setFilterCategory('4xx')}
                    sx={{
                      px: 1.2,
                      py: 0.4,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      borderRadius: '6px',
                      textTransform: 'none',
                      border: '1.5px solid #0F172A',
                      bgcolor: filterCategory === '4xx' ? '#1D63FF' : '#FFFFFF',
                      color: filterCategory === '4xx' ? '#FFFFFF' : '#0F172A',
                      '&:hover': { bgcolor: filterCategory === '4xx' ? '#1551D8' : '#F1F5F9' }
                    }}
                  >
                    4xx Klien (29)
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setFilterCategory('5xx')}
                    sx={{
                      px: 1.2,
                      py: 0.4,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      borderRadius: '6px',
                      textTransform: 'none',
                      border: '1.5px solid #0F172A',
                      bgcolor: filterCategory === '5xx' ? '#DC2626' : '#FFFFFF',
                      color: filterCategory === '5xx' ? '#FFFFFF' : '#0F172A',
                      '&:hover': { bgcolor: filterCategory === '5xx' ? '#B91C1C' : '#F1F5F9' }
                    }}
                  >
                    5xx Server (11)
                  </Button>
                </Box>
              </Box>

              {/* Search Bar */}
              <TextField
                fullWidth
                size="small"
                placeholder="Cari kode atau kata kunci (contoh: 404, 500, timeout, unauthorized, payment, teapot)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon sx={{ color: '#64748B', fontSize: 19 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.84rem',
                    '&.Mui-focused': {
                      borderColor: '#0F172A',
                      boxShadow: '2px 2px 0px #0F172A'
                    }
                  }
                }}
              />

              {/* Grid of Interactive Error Buttons */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(5, 1fr)'
                  },
                  gap: 1,
                  maxHeight: '260px',
                  overflowY: 'auto',
                  pr: 0.5,
                  '&::-webkit-scrollbar': { width: 6 },
                  '&::-webkit-scrollbar-thumb': { bgcolor: '#CBD5E1', borderRadius: 3 }
                }}
              >
                {filteredErrors.map((item) => {
                  const isSelected = item.code === activeCode;
                  const itemIs5xx = item.code >= 500;
                  return (
                    <Button
                      key={item.code}
                      onClick={() => handleSelectCode(item.code)}
                      variant={isSelected ? 'contained' : 'outlined'}
                      sx={{
                        p: '8px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        textTransform: 'none',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #0F172A' : '1.5px solid #E2E8F0',
                        bgcolor: isSelected 
                          ? (itemIs5xx ? '#FEF2F2' : '#EEF4FF') 
                          : '#FFFFFF',
                        color: '#0F172A',
                        boxShadow: isSelected ? '2.5px 2.5px 0px #0F172A' : 'none',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          border: '2px solid #0F172A',
                          bgcolor: isSelected ? (itemIs5xx ? '#FEE2E2' : '#E0EDFF') : '#F8FAFC',
                          transform: 'translate(-1px, -1px)',
                          boxShadow: '2px 2px 0px #0F172A'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 0.3 }}>
                        <Typography sx={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.86rem', color: isSelected ? (itemIs5xx ? '#DC2626' : '#1D63FF') : '#0F172A' }}>
                          HTTP {item.code}
                        </Typography>
                        <Box 
                          sx={{ 
                            fontSize: '0.58rem', 
                            fontWeight: 800, 
                            px: 0.5, 
                            py: 0.1, 
                            borderRadius: '3px',
                            bgcolor: itemIs5xx ? '#FEE2E2' : '#DBEAFE',
                            color: itemIs5xx ? '#991B1B' : '#1E40AF',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {itemIs5xx ? '5xx' : '4xx'}
                        </Box>
                      </Box>
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                        {item.name}
                      </Typography>
                    </Button>
                  );
                })}
              </Box>

              {filteredErrors.length === 0 && (
                <Box sx={{ p: 3, textAlign: 'center', color: '#64748B' }}>
                  Tidak ada kode error yang cocok dengan pencarian "{searchQuery}".
                </Box>
              )}
            </Paper>
          </Collapse>

          {/* MAIN INCIDENT CARD */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 4, md: 5 },
              bgcolor: '#FFFFFF',
              border: '2.5px solid #0F172A',
              borderRadius: '16px',
              boxShadow: '6px 6px 0px #0F172A',
              position: 'relative'
            }}
          >
            {/* Top Row: Error Header Badge & RFC Reference */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={errorData.category.toUpperCase()}
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 900,
                    fontSize: '0.74rem',
                    bgcolor: accentLight,
                    color: accentColor,
                    border: `1.5px solid ${tagBorderColor}`,
                    borderRadius: '6px'
                  }}
                />
                <Chip
                  label={errorData.rfcSpec}
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    bgcolor: '#F1F5F9',
                    color: '#475569',
                    border: '1.2px solid #CBD5E1',
                    borderRadius: '6px'
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#64748B' }}>
                  Target Endpoint:
                </Typography>
                <Box
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    bgcolor: '#F8FAFC',
                    color: '#0F172A',
                    px: 1.2,
                    py: 0.35,
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px'
                  }}
                >
                  {location.pathname || '/'}
                </Box>
              </Box>
            </Box>

            {/* Hero Error Section: Big Status Code & Name */}
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' }, 
                gap: { xs: 2.5, md: 4 }, 
                alignItems: 'center',
                mb: 4,
                pb: 4,
                borderBottom: '2px dashed #E2E8F0'
              }}
            >
              {/* Massive Bold Status Code Pill */}
              <Box
                sx={{
                  bgcolor: accentLight,
                  border: '2.5px solid #0F172A',
                  borderRadius: '16px',
                  boxShadow: '4px 4px 0px #0F172A',
                  p: { xs: '20px 32px', sm: '24px 40px' },
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: { xs: '100%', md: '210px' }
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: { xs: '3.6rem', sm: '4.8rem' },
                    fontWeight: 900,
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    color: accentColor
                  }}
                >
                  {errorData.code}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    letterSpacing: '0.08em',
                    mt: 1,
                    textTransform: 'uppercase'
                  }}
                >
                  STATUS PROTOKOL
                </Typography>
              </Box>

              {/* Error Title & Descriptions */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {is5xx ? (
                    <ErrorOutlineRoundedIcon sx={{ color: '#DC2626', fontSize: 26 }} />
                  ) : (
                    <WarningAmberRoundedIcon sx={{ color: '#D97706', fontSize: 26 }} />
                  )}
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.3rem' },
                      fontWeight: 900,
                      color: '#0F172A',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2
                    }}
                  >
                    {errorData.name}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 700,
                    color: '#334155',
                    lineHeight: 1.5,
                    mb: 1.5
                  }}
                >
                  {errorData.shortDesc}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.88rem',
                    color: '#64748B',
                    lineHeight: 1.65,
                    maxWidth: '720px'
                  }}
                >
                  {errorData.technicalDetail}
                </Typography>
              </Box>
            </Box>

            {/* Quick Switcher Pills for Popular Errors */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#64748B',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  mb: 1
                }}
              >
                PINTASAN KODE ERROR SERING TERJADI:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {quickCodes.map((code) => {
                  const item = HTTP_ERRORS[code];
                  const isCurrent = code === activeCode;
                  return (
                    <Chip
                      key={code}
                      clickable
                      onClick={() => handleSelectCode(code)}
                      label={`${code} ${item ? item.name : ''}`}
                      sx={{
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        border: isCurrent ? '2px solid #0F172A' : '1px solid #CBD5E1',
                        bgcolor: isCurrent ? '#FFCE32' : '#FFFFFF',
                        color: '#0F172A',
                        boxShadow: isCurrent ? '2px 2px 0px #0F172A' : 'none',
                        '&:hover': {
                          bgcolor: isCurrent ? '#FFCE32' : '#F1F5F9',
                          borderColor: '#0F172A'
                        }
                      }}
                    />
                  );
                })}
              </Box>
            </Box>

            {/* TAB SELECTOR: Causes, Actions, or Developer JSON */}
            <Box sx={{ mb: 3 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  borderBottom: '2px solid #E2E8F0',
                  gap: 1
                }}
              >
                <Button
                  onClick={() => setActiveTab('causes')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-heading)',
                    pb: 1.2,
                    pt: 0.8,
                    px: 2,
                    color: activeTab === 'causes' ? '#0F172A' : '#64748B',
                    borderBottom: activeTab === 'causes' ? '3px solid #1D63FF' : '3px solid transparent',
                    borderRadius: 0,
                    '&:hover': { bgcolor: 'transparent', color: '#0F172A' }
                  }}
                >
                  Kemungkinan Penyebab ({errorData.possibleCauses.length})
                </Button>
                <Button
                  onClick={() => setActiveTab('actions')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-heading)',
                    pb: 1.2,
                    pt: 0.8,
                    px: 2,
                    color: activeTab === 'actions' ? '#0F172A' : '#64748B',
                    borderBottom: activeTab === 'actions' ? '3px solid #1D63FF' : '3px solid transparent',
                    borderRadius: 0,
                    '&:hover': { bgcolor: 'transparent', color: '#0F172A' }
                  }}
                >
                  Rekomendasi Tindakan ({errorData.recommendedActions.length})
                </Button>
                <Button
                  onClick={() => setActiveTab('json')}
                  startIcon={<TerminalRoundedIcon sx={{ fontSize: 17 }} />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-heading)',
                    pb: 1.2,
                    pt: 0.8,
                    px: 2,
                    color: activeTab === 'json' ? '#0F172A' : '#64748B',
                    borderBottom: activeTab === 'json' ? '3px solid #1D63FF' : '3px solid transparent',
                    borderRadius: 0,
                    '&:hover': { bgcolor: 'transparent', color: '#0F172A' }
                  }}
                >
                  Log Diagnostik JSON
                </Button>
              </Box>
            </Box>

            {/* TAB CONTENT 1: Causes */}
            {activeTab === 'causes' && (
              <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5 }}>
                {errorData.possibleCauses.map((cause, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      p: 1.8,
                      height: '100%',
                      bgcolor: '#F8FAFC',
                      border: '1.5px solid #E2E8F0',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.2
                    }}
                  >
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        bgcolor: '#EEF4FF',
                        color: '#1D63FF',
                        border: '1.2px solid #93C5FD',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        flexShrink: 0,
                        mt: 0.1
                      }}
                    >
                      {idx + 1}
                    </Box>
                    <Typography sx={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.55, fontWeight: 500 }}>
                      {cause}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* TAB CONTENT 2: Recommendations */}
            {activeTab === 'actions' && (
              <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5 }}>
                {errorData.recommendedActions.map((action, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      p: 1.8,
                      height: '100%',
                      bgcolor: '#F0FDF4',
                      border: '1.5px solid #86EFAC',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.2
                    }}
                  >
                    <CheckCircleOutlineRoundedIcon sx={{ color: '#059669', fontSize: 20, flexShrink: 0, mt: 0.1 }} />
                    <Typography sx={{ fontSize: '0.84rem', color: '#166534', lineHeight: 1.55, fontWeight: 600 }}>
                      {action}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* TAB CONTENT 3: Raw Developer JSON Terminal */}
            {activeTab === 'json' && (
              <Box sx={{ mb: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: '#0F172A',
                    color: '#F8FAFC',
                    p: 2,
                    borderRadius: '8px',
                    border: '1.5px solid #0F172A',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    overflowX: 'auto',
                    position: 'relative'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, pb: 1, borderBottom: '1px solid #334155' }}>
                    <Typography sx={{ color: '#94A3B8', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                      DIAGNOSTIC REPORT CONSOLE &bull; {incidentId}
                    </Typography>
                    <Button
                      size="small"
                      onClick={handleCopyDiagnostic}
                      startIcon={<ContentCopyRoundedIcon sx={{ fontSize: 13 }} />}
                      sx={{
                        color: '#FFCE32',
                        fontSize: '0.72rem',
                        textTransform: 'none',
                        fontFamily: 'var(--font-mono)',
                        p: '2px 8px'
                      }}
                    >
                      Salin JSON
                    </Button>
                  </Box>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#38BDF8' }}>
                    {JSON.stringify({
                      incidentId: incidentId,
                      httpStatus: errorData.code,
                      name: errorData.name,
                      category: errorData.category,
                      rfcSpec: errorData.rfcSpec,
                      endpoint: location.pathname + location.search,
                      timestamp: currentTime.toISOString(),
                      network: isOnline ? 'Online' : 'Offline',
                      latency: `${latencyMs}ms`,
                      causes: errorData.possibleCauses,
                      actions: errorData.recommendedActions
                    }, null, 2)}
                  </pre>
                </Paper>
              </Box>
            )}

            {/* AKSARA TECH POLICY & BOUNDARY CALLOUT */}
            <Alert
              severity={is5xx ? 'error' : 'info'}
              sx={{
                mb: 4,
                borderRadius: '8px',
                border: is5xx ? '1.5px solid #FCA5A5' : '1.5px solid #93C5FD',
                bgcolor: is5xx ? '#FEF2F2' : '#EFF6FF',
                color: '#0F172A',
                '& .MuiAlert-icon': { color: is5xx ? '#DC2626' : '#1D63FF' }
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: '0.84rem', mb: 0.3 }}>
                Standar Rekayasa & Kebijakan Batasan Layanan Aksara Tech:
              </Typography>
              <Typography sx={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55 }}>
                {is5xx ? (
                  <>
                    Kode 5xx menandakan kendala di sisi server web hosting, gateway proxy, atau koneksi basis data. 
                    Sesuai <strong>Kebijakan Eksklusi Server</strong> kami, Aksara Tech berfokus murni pada rekayasa perangkat lunak (Software Engineering). 
                    Jika kode program berjalan normal di lingkungan lokal, pastikan konfigurasi web server (Apache/Nginx/CPanel) dan service database MySQL hosting Anda dalam kondisi optimal.
                  </>
                ) : (
                  <>
                    Kode 4xx mengindikasikan ketidaksesuaian pada parameter permintaan atau alamat tautan yang dituju. 
                    Seluruh aplikasi web yang dibangun oleh Aksara Tech menggunakan arsitektur modular, validasi input berlapis, serta penanganan error terstruktur.
                  </>
                )}
              </Typography>
            </Alert>

            {/* ACTION BUTTONS GROUP */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
                pt: 1
              }}
            >
              {/* Left Action Buttons */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  startIcon={<HomeRoundedIcon />}
                  sx={{
                    bgcolor: '#0F172A',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    textTransform: 'none',
                    px: 2.2,
                    py: 1,
                    borderRadius: '8px',
                    border: '2px solid #0F172A',
                    boxShadow: '3px 3px 0px var(--prussian-blue)',
                    '&:hover': {
                      bgcolor: '#1E293B',
                      transform: 'translate(-1px, -1px)',
                      boxShadow: '4px 4px 0px var(--prussian-blue)'
                    }
                  }}
                >
                  Kembali ke Beranda
                </Button>

                <Button
                  onClick={handleReload}
                  disabled={isReloading}
                  variant="outlined"
                  startIcon={<RefreshRoundedIcon sx={{ animation: isReloading ? 'spin 1s linear infinite' : 'none' }} />}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#0F172A',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    border: '2px solid #0F172A',
                    boxShadow: '3px 3px 0px #0F172A',
                    '&:hover': {
                      bgcolor: '#F1F5F9',
                      border: '2px solid #0F172A',
                      transform: 'translate(-1px, -1px)',
                      boxShadow: '4px 4px 0px #0F172A'
                    }
                  }}
                >
                  {isReloading ? 'Memeriksa...' : 'Coba Muat Ulang'}
                </Button>

                <Button
                  onClick={handleCopyDiagnostic}
                  variant="outlined"
                  startIcon={<ContentCopyRoundedIcon />}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#0F172A',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    border: '2px solid #0F172A',
                    boxShadow: '3px 3px 0px #0F172A',
                    '&:hover': {
                      bgcolor: '#F1F5F9',
                      border: '2px solid #0F172A',
                      transform: 'translate(-1px, -1px)',
                      boxShadow: '4px 4px 0px #0F172A'
                    }
                  }}
                >
                  Salin Log Diagnostik
                </Button>
              </Box>

              {/* Right: WhatsApp Official Help Button */}
              <Button
                component="a"
                href={waReportUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<WhatsAppIcon sx={{ color: '#FFFFFF' }} />}
                sx={{
                  bgcolor: '#059669',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  textTransform: 'none',
                  px: 2.5,
                  py: 1,
                  borderRadius: '8px',
                  border: '2px solid #0F172A',
                  boxShadow: '3px 3px 0px #0F172A',
                  '&:hover': {
                    bgcolor: '#047857',
                    transform: 'translate(-1px, -1px)',
                    boxShadow: '4px 4px 0px #0F172A'
                  }
                }}
              >
                Lapor Tim Teknis via WhatsApp
              </Button>
            </Box>

          </Paper>

          {/* Quick Links Section under Card */}
          <Box
            sx={{
              mt: 4,
              textAlign: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <Typography sx={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
              Halaman resmi yang dapat dikunjungi:
            </Typography>
            <Link to="/paket" style={{ fontSize: '0.82rem', color: '#1D63FF', fontWeight: 700, textDecoration: 'none' }}>
              Katalog 6 Paket &amp; Harga &rarr;
            </Link>
            <Link to="/eksklusi-server" style={{ fontSize: '0.82rem', color: '#1D63FF', fontWeight: 700, textDecoration: 'none' }}>
              Batasan Eksklusi Server &rarr;
            </Link>
            <Link to="/alur-sop" style={{ fontSize: '0.82rem', color: '#1D63FF', fontWeight: 700, textDecoration: 'none' }}>
              Alur SOP &amp; Kuota 3x Revisi &rarr;
            </Link>
            <Link to="/faq" style={{ fontSize: '0.82rem', color: '#1D63FF', fontWeight: 700, textDecoration: 'none' }}>
              FAQ Teknis &rarr;
            </Link>
          </Box>

        </Container>

        {/* Copy Toast Feedback */}
        <Snackbar
          open={copiedToast}
          autoHideDuration={3000}
          onClose={() => setCopiedToast(false)}
          message="Log diagnostik berhasil disalin ke papan klip (clipboard)!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              bgcolor: '#0F172A',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.84rem',
              border: '2px solid #FFCE32',
              boxShadow: '4px 4px 0px #0F172A',
              borderRadius: '8px'
            }
          }}
        />

        {/* Global Keyframe CSS */}
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
