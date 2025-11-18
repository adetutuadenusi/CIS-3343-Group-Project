import { useState } from 'react';
import { RefreshCw, HelpCircle, Clock } from 'lucide-react';
import { Button } from '../ui/button';

interface DashboardFooterProps {
  onRefresh?: () => void | Promise<void>;
}

export function DashboardFooter({ onRefresh }: DashboardFooterProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRefreshHovered, setIsRefreshHovered] = useState(false);
  const [isHelpHovered, setIsHelpHovered] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      }
      setLastUpdated(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <footer style={{
      position: 'sticky',
      bottom: 0,
      width: '100%',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      borderTop: '1px solid #E5E7EB',
      zIndex: 10
    }}>
      {/* Left - Last Updated */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Clock size={14} color="#6B7280" strokeWidth={2} />
        <span style={{
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          color: '#6B7280'
        }}>
          Last updated: {formatTime(lastUpdated)}
        </span>
      </div>

      {/* Center - Refresh Button */}
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          height: '36px',
          border: `1px solid ${!isRefreshing && isRefreshHovered ? '#C44569' : '#D1D5DB'}`,
          borderRadius: '8px',
          background: !isRefreshing && isRefreshHovered ? '#E5E7EB' : '#F3F4F6',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          color: '#374151',
          cursor: isRefreshing ? 'not-allowed' : 'pointer',
          transition: 'all 200ms ease',
          opacity: isRefreshing ? 0.6 : 1
        }}
        onMouseEnter={() => setIsRefreshHovered(true)}
        onMouseLeave={() => setIsRefreshHovered(false)}
        aria-label="Refresh dashboard data"
      >
        <RefreshCw 
          size={14} 
          strokeWidth={2}
          style={{
            animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
            transform: isRefreshing ? 'none' : isRefreshHovered ? 'rotate(180deg)' : 'none',
            transition: 'transform 300ms ease'
          }}
          aria-hidden="true"
        />
        Refresh
      </button>

      {/* Right - Help Button */}
      <button
        onClick={() => window.open('/help', '_blank')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          height: '36px',
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          background: isHelpHovered ? '#E5E7EB' : '#F3F4F6',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          color: '#374151',
          cursor: 'pointer',
          transition: 'all 200ms ease'
        }}
        onMouseEnter={() => setIsHelpHovered(true)}
        onMouseLeave={() => setIsHelpHovered(false)}
        aria-label="Get help and support"
      >
        <HelpCircle size={14} strokeWidth={2} aria-hidden="true" />
        Help
      </button>

      {/* CSS for RefreshCw spin animation */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </footer>
  );
}
