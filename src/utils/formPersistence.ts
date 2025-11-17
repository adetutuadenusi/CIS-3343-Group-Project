// Enhancement #14: Form session persistence for unsaved data

export interface FormData {
  [key: string]: any;
}

/**
 * Save form data to sessionStorage
 * @param formId - Unique identifier for the form
 * @param data - Form data to persist
 */
export function saveFormData(formId: string, data: FormData): void {
  try {
    const key = `form_draft_${formId}`;
    sessionStorage.setItem(key, JSON.stringify({
      data,
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.warn('Failed to save form data:', error);
  }
}

/**
 * Load form data from sessionStorage
 * @param formId - Unique identifier for the form
 * @param maxAge - Maximum age in milliseconds (default: 24 hours)
 * @returns Saved form data or null if not found/expired
 */
export function loadFormData(formId: string, maxAge: number = 24 * 60 * 60 * 1000): FormData | null {
  try {
    const key = `form_draft_${formId}`;
    const stored = sessionStorage.getItem(key);
    
    if (!stored) return null;
    
    const { data, timestamp } = JSON.parse(stored);
    const age = Date.now() - new Date(timestamp).getTime();
    
    // Return null if data is too old
    if (age > maxAge) {
      clearFormData(formId);
      return null;
    }
    
    return data;
  } catch (error) {
    console.warn('Failed to load form data:', error);
    return null;
  }
}

/**
 * Clear form data from sessionStorage
 * @param formId - Unique identifier for the form
 */
export function clearFormData(formId: string): void {
  try {
    const key = `form_draft_${formId}`;
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear form data:', error);
  }
}

/**
 * Check if form has saved data
 * @param formId - Unique identifier for the form
 * @returns true if saved data exists
 */
export function hasFormData(formId: string): boolean {
  try {
    const key = `form_draft_${formId}`;
    return sessionStorage.getItem(key) !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Hook to auto-save form on change
 * Usage: Call this in onChange handlers with debouncing
 */
export function useFormPersistence(formId: string, formData: FormData, debounceMs: number = 1000) {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      saveFormData(formId, formData);
    }, debounceMs);
  };
}
