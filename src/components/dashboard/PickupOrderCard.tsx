import { Clock, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { RushBadge } from './RushBadge';
import { getBorderStripeStyle } from '../../utils/orderColors';

interface PickupOrderCardProps {
  order: {
    id: number;
    customerName: string;
    cakeDetails: {
      flavor: string;
      size: string;
      layers: number;
    };
    pickupTime: string;
    status: 'pending' | 'baking' | 'decorating' | 'ready' | 'completed';
    priority: 'high' | 'medium' | 'low' | 'rush';
    payment: {
      total: number;
      paid: number;
      balance: number;
    };
  };
  onViewDetails?: () => void;
  onUpdateStatus?: () => void;
  onMarkPickedUp?: () => void;
}

export function PickupOrderCard({ order, onViewDetails, onUpdateStatus, onMarkPickedUp }: PickupOrderCardProps) {
  // Guard against division by zero
  const paymentProgress = order.payment.total > 0 
    ? Math.min(100, Math.max(0, (order.payment.paid / order.payment.total) * 100))
    : 0;
  const isRush = order.priority === 'rush';

  return (
    <div 
      style={{
        position: 'relative',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Priority Stripe */}
      <div style={getBorderStripeStyle(order.status, order.priority)} />

      {/* Card Content */}
      <div style={{ padding: '20px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px'
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#1F2937',
              marginBottom: '4px',
              lineHeight: 1.4
            }}>
              {order.customerName}
            </h3>
            <p style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '13px',
              color: '#6B7280',
              lineHeight: 1.5
            }}>
              Order #{order.id}
            </p>
          </div>
          {isRush && <RushBadge />}
        </div>

        {/* Body - Cake Details */}
        <div style={{
          padding: '16px',
          background: '#F9FAFB',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div>
              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '4px'
              }}>
                Flavor
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#1F2937'
              }}>
                {order.cakeDetails.flavor}
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '4px'
              }}>
                Size
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#1F2937'
              }}>
                {order.cakeDetails.size}
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '4px'
              }}>
                Layers
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#1F2937'
              }}>
                {order.cakeDetails.layers}
              </p>
            </div>
          </div>

          {/* Pickup Time */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            background: 'white',
            borderRadius: '6px',
            border: '1px solid #E5E7EB'
          }}>
            <Clock 
              size={16} 
              style={{ 
                color: '#C44569',
                flexShrink: 0
              }}
              aria-hidden="true"
            />
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '11px',
                color: '#6B7280',
                marginBottom: '2px'
              }}>
                Pickup Time
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#C44569'
              }}>
                {order.pickupTime}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div style={{
          padding: '16px',
          background: '#F9FAFB',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <span style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '12px',
              color: '#6B7280'
            }}>
              Total: ${order.payment.total.toFixed(2)}
            </span>
            <span style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '12px',
              color: '#6B7280'
            }}>
              Paid: ${order.payment.paid.toFixed(2)}
            </span>
          </div>
          
          {/* Payment Progress Bar */}
          <div style={{
            width: '100%',
            height: '6px',
            background: '#E5E7EB',
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: '8px'
          }}>
            <div style={{
              width: `${paymentProgress}%`,
              height: '100%',
              background: paymentProgress === 100 ? '#10B981' : '#F59E0B',
              borderRadius: '3px',
              transition: 'width 300ms ease-out'
            }} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: order.payment.balance === 0 ? '#10B981' : '#DC2626'
            }}>
              {order.payment.balance === 0 ? 'Paid in Full' : `Balance: $${order.payment.balance.toFixed(2)}`}
            </span>
            <span style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '11px',
              color: '#6B7280'
            }}>
              {Math.round(paymentProgress)}%
            </span>
          </div>
        </div>

        {/* Footer - Action Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px'
        }}>
          <Button
            onClick={onViewDetails}
            variant="outline"
            style={{
              height: '40px',
              padding: '0 12px',
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              background: 'white',
              color: '#4B5563',
              cursor: 'pointer',
              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#C44569';
              e.currentTarget.style.color = '#C44569';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.color = '#4B5563';
            }}
            aria-label={`View details for order ${order.id}`}
          >
            <Eye size={14} strokeWidth={2} aria-hidden="true" />
            View
          </Button>

          <Button
            onClick={onUpdateStatus}
            variant="outline"
            style={{
              height: '40px',
              padding: '0 12px',
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              background: 'white',
              color: '#4B5563',
              cursor: 'pointer',
              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#F59E0B';
              e.currentTarget.style.color = '#F59E0B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.color = '#4B5563';
            }}
            aria-label={`Update status for order ${order.id}`}
          >
            <RefreshCw size={14} strokeWidth={2} aria-hidden="true" />
            Update
          </Button>

          <Button
            onClick={onMarkPickedUp}
            style={{
              height: '40px',
              padding: '0 12px',
              fontSize: '13px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: '1px solid #10B981',
              borderRadius: '6px',
              background: '#10B981',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#059669';
              e.currentTarget.style.borderColor = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#10B981';
              e.currentTarget.style.borderColor = '#10B981';
            }}
            aria-label={`Mark order ${order.id} as picked up`}
          >
            <CheckCircle2 size={14} strokeWidth={2} aria-hidden="true" />
            Pickup
          </Button>
        </div>
      </div>
    </div>
  );
}
