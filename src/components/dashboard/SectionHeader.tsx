import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  count?: number;
  iconColor?: string;
}

export function SectionHeader({ 
  icon: Icon, 
  title, 
  count, 
  iconColor = '#C44569' 
}: SectionHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    }}>
      {/* Icon Circle */}
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: 'rgba(196, 69, 105, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon size={20} color={iconColor} strokeWidth={2.5} />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '20px',
        fontWeight: 700,
        color: '#2B2B2B',
        margin: 0,
        lineHeight: 1
      }}>
        {title}
      </h3>

      {/* Count Badge */}
      {count !== undefined && (
        <span style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '12px',
          fontWeight: 600,
          color: '#6B7280',
          background: '#F3F4F6',
          padding: '4px 10px',
          borderRadius: '6px',
          marginLeft: '8px',
          lineHeight: 1
        }}>
          {count}
        </span>
      )}
    </div>
  );
}
