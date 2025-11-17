import { Cake, CheckCircle, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  onCreateOrder?: () => void;
}

export function EmptyState({ onCreateOrder }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 20px',
      background: '#FAFBFC',
      border: '2px dashed #E5E7EB',
      borderRadius: '12px',
      textAlign: 'center'
    }}>
      {/* Icon Container */}
      <div style={{
        position: 'relative',
        width: '80px',
        height: '80px',
        marginBottom: '24px'
      }}>
        {/* Main Cake Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Cake 
            size={48}
            style={{ 
              color: '#C44569',
              strokeWidth: 2
            }}
            aria-hidden="true"
          />
        </div>
        
        {/* Success CheckCircle Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '32px',
          height: '32px',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <CheckCircle 
            size={24}
            style={{ 
              color: '#10B981',
              strokeWidth: 2,
              fill: '#10B981'
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Heading */}
      <h3 style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '18px',
        fontWeight: 600,
        color: '#1F2937',
        marginBottom: '8px',
        lineHeight: 1.4
      }}>
        No recent orders today - all set! 🎉
      </h3>

      {/* Paragraph */}
      <p style={{
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '14px',
        color: '#6B7280',
        marginBottom: '24px',
        lineHeight: 1.6
      }}>
        You're caught up on all orders
      </p>

      {/* Action Button */}
      {onCreateOrder && (
        <Button 
          onClick={onCreateOrder}
          style={{
            height: '44px',
            padding: '0 24px',
            background: 'linear-gradient(135deg, #C44569 0%, #9B3654 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 4px rgba(196, 69, 105, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(196, 69, 105, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(196, 69, 105, 0.2)';
          }}
          aria-label="Create a new order"
        >
          <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
          Create a New Order
        </Button>
      )}
    </div>
  );
}
