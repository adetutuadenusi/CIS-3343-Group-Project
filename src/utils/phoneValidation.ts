// Enhancement #37: Phone number validation and formatting

export function validatePhoneNumber(phone: string): { isValid: boolean; error?: string } {
  if (!phone || phone.trim() === '') {
    return { isValid: true }; // Allow empty (optional field)
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');

  // Check length (10 digits for US phone numbers)
  if (digitsOnly.length !== 10) {
    return {
      isValid: false,
      error: 'Phone number must be 10 digits (e.g., 555-123-4567)'
    };
  }

  // Check if first digit is valid (2-9)
  if (digitsOnly[0] === '0' || digitsOnly[0] === '1') {
    return {
      isValid: false,
      error: 'Phone number cannot start with 0 or 1'
    };
  }

  return { isValid: true };
}

export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';

  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }

  // Return as-is if not 10 digits
  return phone;
}

export function normalizePhoneInput(value: string): string {
  // Remove all non-digit characters except hyphens and parentheses during typing
  return value.replace(/[^\d\s\-()]/g, '');
}
