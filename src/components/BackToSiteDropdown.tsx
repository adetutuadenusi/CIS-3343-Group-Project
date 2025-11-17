import React, { useState, useRef, useEffect } from 'react';
import { LogOut, RefreshCw, ChevronDown, ArrowLeft } from 'lucide-react';

interface BackToSiteDropdownProps {
  onLogout: () => void;
  onSwitchAccount?: () => void;
}

export function BackToSiteDropdown({ onLogout, onSwitchAccount }: BackToSiteDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen((v) => !v)} style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'rgba(255,255,255,0.8)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <ArrowLeft size={18} />
        <span style={{ fontFamily: 'Poppins', fontSize: 14 }}>Back to Site</span>
        <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms' }} />
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 40, left: 0, width: 200, background: 'rgba(43,43,43,0.95)', backdropFilter: 'blur(12px)', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', padding: 8, zIndex: 100 }}>
          <button onClick={() => { window.location.href = '/'; }} style={{ width: '100%', height: 42, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'transparent', border: 'none', color: '#FFFFFF', borderRadius: 6, cursor: 'pointer' }}>
            <ArrowLeft size={16} />
            <span style={{ fontFamily: 'Poppins', fontSize: 14 }}>Back to Public Site</span>
          </button>

          <button onClick={() => { onSwitchAccount?.(); }} style={{ width: '100%', height: 42, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'transparent', border: 'none', color: '#FFFFFF', borderRadius: 6, cursor: 'pointer' }}>
            <RefreshCw size={16} />
            <span style={{ fontFamily: 'Poppins', fontSize: 14 }}>Switch Accounts</span>
          </button>

          <button onClick={() => { onLogout(); }} style={{ width: '100%', height: 42, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'transparent', border: 'none', color: '#FFFFFF', borderRadius: 6, cursor: 'pointer' }}>
            <LogOut size={16} />
            <span style={{ fontFamily: 'Poppins', fontSize: 14 }}>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default BackToSiteDropdown;
