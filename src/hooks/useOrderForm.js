import { sanitizeText, sanitizeUrl, sanitizePhone } from '../utils/securitySanitizer';
import { recordActionAttempt } from '../utils/rateLimiter';
import { useState, useMemo, useEffect } from 'react';
import { PACKAGES, ADDONS } from '../data/catalogData';
import { generateInquiryId, createWhatsAppPayload } from '../utils/documentEngine';
import { useLocalStorage } from './useLocalStorage';
import { createOrder } from '../utils/orderStorage';

const INITIAL_FORM_STATE = {
  inquiryId: '',
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  projectTitle: '',
  selectedPackageId: 'umkm-katalog', // default popular
  projectCategory: 'UMKM & Bisnis',
  projectGoal: '',
  functionalFeatures: ['Database MySQL & CRUD', 'Formulir Kontak / WA'],
  customFeatures: '', // Fitur kustom yang diketik sendiri di luar list
  designReadiness: 'Belum Ada (Butuh Dibantu Rancangkan)',
  designReference: '',
  attachedFiles: [], // Berkas aset visual yang disiapkan untuk dikirim ke WA
  assetDriveUrl: '', // Tautan Google Drive / Cloud
  selectedAddonIds: [],
  customModuleRequest: '', // Permintaan modul khusus custom chat
  specialNotes: '',
  serverExclusionAgreed: false,
  termsAgreed: false,
};

export function useOrderForm(initialPackageId = null) {
  const [formData, setFormData] = useLocalStorage('aksara_order_brief_v1', {
    ...INITIAL_FORM_STATE,
    inquiryId: generateInquiryId(),
    selectedPackageId: initialPackageId || 'umkm-katalog'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initialPackageId if changed from package selector outside
  useEffect(() => {
    if (initialPackageId) {
      setFormData(prev => ({
        ...prev,
        selectedPackageId: initialPackageId
      }));
    }
  }, [initialPackageId, setFormData]);

  // Ensure inquiry ID and client ID are generated
  useEffect(() => {
    setFormData(prev => {
      const activeId = prev.inquiryId || generateInquiryId();
      const activeName = prev.clientName && prev.clientName.trim().length > 0 ? prev.clientName : activeId;
      if (prev.inquiryId !== activeId || prev.clientName !== activeName) {
        return {
          ...prev,
          inquiryId: activeId,
          clientName: activeName
        };
      }
      return prev;
    });
  }, [setFormData]);

  // Active selected package object
  const selectedPackage = useMemo(() => {
    return PACKAGES.find(p => p.id === formData.selectedPackageId) || PACKAGES[1];
  }, [formData.selectedPackageId]);

  // Active selected addons
  const selectedAddons = useMemo(() => {
    return ADDONS.filter(a => formData.selectedAddonIds.includes(a.id));
  }, [formData.selectedAddonIds]);

  // Estimated price calculation
  const calculations = useMemo(() => {
    let minPrice = selectedPackage.minPrice || 0;
    let maxPrice = selectedPackage.maxPrice || 0;

    selectedAddons.forEach(addon => {
      minPrice += addon.minPrice || 0;
      maxPrice += addon.maxPrice || 0;
    });

    const dpMin = Math.round(minPrice * 0.5);
    const dpMax = Math.round(maxPrice * 0.5);

    return {
      minPrice,
      maxPrice,
      dpMin,
      dpMax,
      minDays: selectedPackage.minDays,
      maxDays: selectedPackage.maxDays
    };
  }, [selectedPackage, selectedAddons]);

  // Field change handler
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error on change
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Toggle selection for array fields (features or addons)
  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const list = prev[field] || [];
      const exists = list.includes(item);
      const updated = exists ? list.filter(i => i !== item) : [...list, item];
      return { ...prev, [field]: updated };
    });
  };

  // Step Validation Logic
  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      const activeClientId = formData.clientName || formData.inquiryId;
      if (!activeClientId || activeClientId.trim().length < 2) {
        newErrors.clientName = 'ID Klien / ID Inquiry wajib terisi secara otomatis.';
      }
      const rawPhone = (formData.clientPhone || '').replace(/[\s-]/g, '');
      const digitsOnly = rawPhone.replace(/^(?:\+62|62|0)/, '');
      if (!digitsOnly || digitsOnly.length < 8 || digitsOnly.length > 13) {
        newErrors.clientPhone = 'Nomor WhatsApp aktif wajib diisi (8–13 digit nomor seluler).';
      } else if (!/^8[0-9]{7,12}$/.test(digitsOnly)) {
        newErrors.clientPhone = 'Nomor WhatsApp tidak valid. Masukkan nomor seluler Indonesia yang aktif.';
      }
      if (!formData.projectTitle || formData.projectTitle.trim().length < 2) {
        newErrors.projectTitle = 'Nama proyek website wajib diisi (min. 2 karakter).';
      }
    }

    if (stepNumber === 2) {
      if (!formData.selectedPackageId) {
        newErrors.selectedPackageId = 'Silakan pilih salah satu paket layanan utama.';
      }
    }

    if (stepNumber === 3) {
      if (!formData.projectCategory) {
        newErrors.projectCategory = 'Silakan pilih kategori tujuan proyek.';
      }
    }

    if (stepNumber === 7) {
      if (!formData.serverExclusionAgreed) {
        newErrors.serverExclusionAgreed = 'Anda wajib menyetujui dan memahami Kebijakan Eksklusi Server Aksara Tech.';
      }
      if (!formData.termsAgreed) {
        newErrors.termsAgreed = 'Anda wajib menyetujui Ketentuan Layanan & Kuota Maksimal 3x Revisi.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 7) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: document.getElementById('order-form')?.offsetTop - 80 || 0, behavior: 'smooth' });
      }
    } else {
      setTimeout(() => {
        const errorInput = document.querySelector('.form-input[aria-invalid="true"], [data-has-error="true"] input, [data-has-error="true"]');
        if (errorInput) {
          errorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof errorInput.focus === 'function') {
            errorInput.focus();
          }
        }
      }, 60);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: document.getElementById('order-form')?.offsetTop - 80 || 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step) => {
    if (step < currentStep || validateStep(currentStep)) {
      setCurrentStep(step);
      window.scrollTo({ top: document.getElementById('order-form')?.offsetTop - 80 || 0, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    const newId = generateInquiryId();
    setFormData({
      ...INITIAL_FORM_STATE,
      inquiryId: newId
    });
    setCurrentStep(1);
    setErrors({});
    setIsSubmitted(false);
  };

    // Submit and launch WhatsApp
  const submitToWhatsApp = () => {
    if (!validateStep(7)) return;

    // 1. Real-time Offline network check (HTTP 503)
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      window.location.href = '/error/503?reason=offline';
      return;
    }

    // 2. Real-time Rate Limiter Anti-Spam (HTTP 429)
    const rateCheck = recordActionAttempt('order_submission');
    if (!rateCheck.allowed) {
      window.location.href = `/error/429?retryAfter=${rateCheck.retryAfterSeconds}`;
      return;
    }

        // 3. Sanitize inputs against XSS and SQL injection patterns
    const sanitizedData = {
      ...formData,
      clientName: sanitizeText(formData.clientName),
      clientPhone: sanitizePhone(formData.clientPhone),
      projectTitle: sanitizeText(formData.projectTitle),
      projectGoal: sanitizeText(formData.projectGoal),
      customFeatures: sanitizeText(formData.customFeatures),
      customModuleRequest: sanitizeText(formData.customModuleRequest),
      specialNotes: sanitizeText(formData.specialNotes),
      assetDriveUrl: sanitizeUrl(formData.assetDriveUrl)
    };

    const waUrl = createWhatsAppPayload(sanitizedData, selectedPackage, selectedAddons, calculations);
    setIsSubmitted(true);

    // Register inquiry to central orderStorage database
    try {
      const activeInquiryId = sanitizedData.inquiryId || generateInquiryId();
      createOrder({
        id: activeInquiryId,
        orderNumber: 'MENUNGGU-DP',
        statusType: 'INQUIRY',
        clientName: sanitizedData.clientName || activeInquiryId,
        clientPhone: sanitizedData.clientPhone || '-',
        clientEmail: sanitizedData.clientEmail || '-',
        projectTitle: sanitizedData.projectTitle || 'Proyek Website Kustom Aksara Tech',
        category: sanitizedData.projectCategory || 'UMKM & Bisnis',
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.minPrice,
        addons: selectedAddons.map(a => ({ name: a.name, price: a.minPrice })),
        totalInvestment: calculations.minPrice,
        dpAmount: calculations.dpMin,
        dpStatus: 'MENUNGGU VERIFIKASI DP 50%',
        orderDate: new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
        estimatedCompletion: `${selectedPackage.minDays}–${selectedPackage.maxDays} Hari Kerja`,
        currentStageNumber: 1,
        revisionQuotaTotal: 3,
        revisionQuotaUsed: 0,
        developerNotes: 'Formulir brief teknis telah diajukan via website. Menunggu verifikasi DP termin 1 (50%) untuk memulai antrean pengerjaan.',
        deliverablesPreview: selectedPackage.deliverables || ['Master Source Code (.zip)', 'Database Relasional (.sql)']
      });
    } catch (e) {
      // Storage fallback handled silently
    }

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return {
    formData,
    currentStep,
    errors,
    isSubmitted,
    selectedPackage,
    selectedAddons,
    calculations,
    updateField,
    toggleArrayItem,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    submitToWhatsApp
  };
}
