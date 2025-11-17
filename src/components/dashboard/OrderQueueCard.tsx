import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock, User, Cake } from 'lucide-react';

interface QueueOrder {
  id: number;
  customerName: string;
  occasion: string;
  eventDate: string | null;
  status: string;
  priority: 'low' | 'medium' | 'high';
}

interface OrderQueueCardProps {
  title: string;
  orders: QueueOrder[];
  emptyMessage: string;
  onOrderClick?: (order: QueueOrder) => void;
}

export function OrderQueueCard({ title, orders, emptyMessage, onOrderClick }: OrderQueueCardProps) {
  const priorityColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#DC3545'
  };

  const statusColors: Record<string, string> = {
    'pending': '#FFA500',
    'baking': '#C44569',
    'cooling': '#5A3825',
    'decorating': '#C44569',
    'ready': '#10B981',
    'completed': '#10B981'
  };

  return (
    <Card style={{ background: 'white', border: 'none', boxShadow: '0 2px 8px rgba(90, 56, 37, 0.1)' }}>
      <div className="p-6">
        <h3 style={{ 
          fontFamily: 'Poppins, sans-serif', 
          fontSize: '18px', 
          fontWeight: 600, 
          color: '#2B2B2B',
          marginBottom: '16px'
        }}>
          {title}
        </h3>

        {orders.length === 0 ? (
          <p style={{ 
            fontFamily: 'Open Sans, sans-serif', 
            fontSize: '14px', 
            color: '#999',
            textAlign: 'center',
            padding: '32px 16px'
          }}>
            {emptyMessage}
          </p>
        ) : (
          <div className="space-y-3">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onOrderClick?.(order)}
                className="p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ 
                  border: '1px solid #E5E7EB',
                  borderLeft: `4px solid ${priorityColors[order.priority]}`
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Cake size={16} color="#C44569" />
                    <span style={{ 
                      fontFamily: 'Open Sans, sans-serif', 
                      fontSize: '14px', 
                      fontWeight: 600, 
                      color: '#2B2B2B' 
                    }}>
                      {order.occasion}
                    </span>
                  </div>
                  <Badge style={{ 
                    background: statusColors[order.status.toLowerCase()] || '#999',
                    color: 'white',
                    fontSize: '11px'
                  }}>
                    {order.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#666' }}>
                      {order.customerName}
                    </span>
                  </div>
                  {order.eventDate && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#666' }}>
                        {new Date(order.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
