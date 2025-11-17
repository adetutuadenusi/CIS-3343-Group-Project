import React from 'react';
import { Clock, RefreshCw, HelpCircle } from 'lucide-react';

interface DashboardFooterProps {
  lastUpdated?: string;
  onRefresh?: () => Promise<void> | void;
}

export function DashboardFooter({ lastUpdated, onRefresh }: DashboardFooterProps) {
  return (
    <footer style={{ position: 'sticky', bottom: 0, width: '100%', height: 56, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontFamily: 'Open Sans' }}>
        <Clock size={14} />
        <span style={{ fontSize: 13 }}>Last updated: {lastUpdated || '—'}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onRefresh?.()} style={{ height: 36, padding: '8px 12px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <RefreshCw size={14} />
          <span style={{ fontFamily: 'Poppins', fontSize: 13 }}>Refresh</span>
        </button>

        <button onClick={() => window.open('/help/dashboard', '_blank')} style={{ height: 36, padding: '8px 12px', background: 'transparent', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#374151' }}>
          <HelpCircle size={14} />
          <span style={{ fontFamily: 'Poppins', fontSize: 13 }}>Help</span>
        </button>
      </div>
    </footer>
  );
}

export default DashboardFooter;
