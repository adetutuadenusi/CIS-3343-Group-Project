import React from 'react';
import { Lock } from 'lucide-react';

interface CompactStaffLoginCTAProps {
  onClick?: () => void;
  href?: string;
}

export function CompactStaffLoginCTA({ onClick, href }: CompactStaffLoginCTAProps) {
  const content = (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C44569] text-white rounded-lg text-[12px] font-semibold hover:bg-[#A63D54] transition-all shadow-md hover:shadow-lg"
      style={{ boxShadow: '0 2px 8px rgba(196, 69, 105, 0.25)' }}
      aria-label="Staff Login"
    >
      <Lock size={14} />
      <span>Staff Login</span>
    </button>
  );

  if (href) {
    return (
      <a href={href} aria-label="Staff Login Link">
        {content}
      </a>
    );
  }

  return content;
}

export default CompactStaffLoginCTA;
