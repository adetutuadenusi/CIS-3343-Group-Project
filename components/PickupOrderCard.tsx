import React from 'react';
import { CheckCircle, Edit2, Eye, Clock } from 'lucide-react';

interface PickupOrderCardProps {
  id: string;
  customer: string;
  cake: string;
  pickup: string;
  priority: 'high' | 'medium' | 'low';
  value: number;
  onView?: (id: string) => void;
  onUpdate?: (id: string) => void;
  onMarkPicked?: (id: string) => void;
}

export function PickupOrderCard({ id, customer, cake, pickup, priority, value, onView, onUpdate, onMarkPicked }: PickupOrderCardProps) {
  // Simple payment simulation for quick-win: paid = 50% of value
  const paid = Math.round((value * 0.5) * 100) / 100;
  const balance = Math.round((value - paid) * 100) / 100;

  const priorityColor = priority === 'high' ? '#EF4444' : priority === 'medium' ? '#F59E0B' : '#9CA3AF';

  return (
    <div style={{ position: 'relative', paddingLeft: 12 }}>
      {/* Left priority stripe */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: '12px 0 0 12px', background: priorityColor }} />

      <div style={{ marginLeft: 12, background: '#FFFFFF', borderRadius: 12, padding: 16, border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2B2B2B' }}>{customer}</div>
            <div style={{ fontFamily: 'Open Sans', fontSize: 13, color: '#5A3825', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 280 }}>{cake}</div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ padding: '4px 10px', borderRadius: 6, fontFamily: 'Poppins', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', background: '#F3F4F6', color: '#374151' }}>{priority}</div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 600, color: '#2B2B2B' }}>${value}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: 'Open Sans', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5 }}>Pickup Time</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontFamily: 'Poppins', fontSize: 14, fontWeight: 600, color: '#2B2B2B' }}>
              <Clock size={14} color="#C44569" />
              <span>{pickup}</span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'Open Sans', fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5 }}>Payment Status</div>
            <div style={{ marginTop: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#2B2B2B' }}>
                <span>Total:</span>
                <span style={{ fontWeight: 700 }}>${value.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6B7280', marginTop: 6 }}>
                <span>Paid:</span>
                <span style={{ fontWeight: 600 }}>${paid.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#EF4444', marginTop: 6 }}>
                <span>Balance:</span>
                <span style={{ fontWeight: 700 }}>${balance.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onView?.(id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: 6, cursor: 'pointer' }}>
            <Eye size={14} />
            <span style={{ fontSize: 12, fontWeight: 500 }}>View</span>
          </button>

          <button onClick={() => onUpdate?.(id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(196,69,105,0.08)', border: '1px solid rgba(196,69,105,0.25)', color: '#C44569', borderRadius: 6, cursor: 'pointer' }}>
            <Edit2 size={14} />
            <span style={{ fontSize: 12, fontWeight: 500 }}>Update Status</span>
          </button>

          <button onClick={() => onMarkPicked?.(id)} style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#D4EDDA', border: '1px solid #10B981', color: '#065F46', borderRadius: 6, cursor: 'pointer' }}>
            <CheckCircle size={14} />
            <span style={{ fontSize: 12, fontWeight: 600 }}>Picked Up</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PickupOrderCard;
