import { useState } from 'react';
import { ChevronDown, ExternalLink, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function BackToSiteDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/staff-login');
  };

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => {
        setIsOpen(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        setIsHovered(false);
      }}
    >
      {/* Trigger Link */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          background: 'transparent',
          border: `1px solid ${isHovered || isOpen ? '#C44569' : '#E5E7EB'}`,
          borderRadius: '6px',
          color: isHovered || isOpen ? '#C44569' : '#4B5563',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 200ms ease-out'
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Back to site menu - view public site or logout"
      >
        Back to Site
        <ChevronDown 
          size={16} 
          strokeWidth={2}
          style={{
            transition: 'transform 200ms ease-out',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              minWidth: '200px',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: '1px solid #E5E7EB',
              overflow: 'hidden',
              zIndex: 50
            }}
          >
            {/* View Public Site */}
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#1F2937',
                textDecoration: 'none',
                transition: 'background 150ms ease-out',
                borderBottom: '1px solid #F3F4F6'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
              View Public Site
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#DC2626',
                textDecoration: 'none',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 150ms ease-out',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FEF2F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
              aria-label="Logout from staff portal"
            >
              <LogOut size={16} strokeWidth={2} aria-hidden="true" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
