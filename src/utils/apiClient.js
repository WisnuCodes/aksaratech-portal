// Standardized API Client & HTTP Error Interceptor
// Maps any response status code (4xx & 5xx) to the Aksara Tech Incident Console

export async function requestApi(endpoint, options = {}) {
  // Check client offline condition first
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    const error = new Error('Koneksi internet perangkat Anda terputus (Client Offline)');
    error.status = 503;
    throw error;
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      error.status = response.status;
      try {
        error.data = await response.json();
      } catch {
        error.data = null;
      }
      throw error;
    }

    return await response.json();
  } catch (err) {
    if (!err.status) {
      // Network failure / Gateway unreachable
      err.status = 502;
    }
    throw err;
  }
}
