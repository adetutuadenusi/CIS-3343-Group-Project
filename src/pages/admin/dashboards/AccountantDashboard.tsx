import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, CreditCard, FileText, Package, AlertCircle } from 'lucide-react';
import { KPICard } from '../../../components/dashboard/KPICard';
import { QuickActionCard } from '../../../components/dashboard/QuickActionCard';
import { Card } from '../../../components/ui/card';

interface AccountantDashboardProps {
  onNavigate?: (page: string) => void;
}

export function AccountantDashboard({ onNavigate }: AccountantDashboardProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Financial calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const depositsCollected = orders.reduce((sum, o) => sum + (o.depositAmount || 0), 0);
  const balanceDue = orders.reduce((sum, o) => sum + (o.balanceDue || 0), 0);
  const unpaidOrders = orders.filter(o => o.paymentStatus === 'unpaid' || o.paymentStatus === 'partial');

  const quickActions = [
    {
      label: 'Revenue Report',
      icon: DollarSign,
      color: '#10B981',
      onClick: () => onNavigate?.('business-intelligence')
    },
    {
      label: 'View All Orders',
      icon: Package,
      color: '#5A3825',
      onClick: () => onNavigate?.('order-management')
    },
    {
      label: 'Business Intelligence',
      icon: FileText,
      color: '#C44569',
      onClick: () => onNavigate?.('business-intelligence')
    }
  ];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: '#F8EBD7' }}>
        <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#5A3825' }}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto" style={{ background: '#F8EBD7', padding: 'clamp(20px, 4vw, 40px)' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(24px, 5vw, 36px)',
          fontWeight: 700,
          color: '#2B2B2B',
          marginBottom: '8px'
        }}>
          Accountant Dashboard
        </h1>
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#5A3825' }}>
          Financial overview and payment tracking
        </p>
      </motion.div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Total Revenue"
          value={`$${(totalRevenue / 100).toFixed(0)}`}
          change="+15.3%"
          icon={DollarSign}
          color="#10B981"
          index={0}
        />
        <KPICard
          title="Deposits Collected"
          value={`$${(depositsCollected / 100).toFixed(0)}`}
          icon={CreditCard}
          color="#3B82F6"
          index={1}
        />
        <KPICard
          title="Balance Due"
          value={`$${(balanceDue / 100).toFixed(0)}`}
          icon={TrendingUp}
          color="#F59E0B"
          index={2}
        />
        <KPICard
          title="Unpaid Orders"
          value={unpaidOrders.length}
          icon={AlertCircle}
          color="#DC3545"
          index={3}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActionCard title="Financial Tools" actions={quickActions} />
        </div>

        {/* Payment Status Summary */}
        <div className="lg:col-span-2">
          <Card style={{ background: 'white', border: 'none', boxShadow: '0 2px 8px rgba(90, 56, 37, 0.1)' }}>
            <div className="p-6">
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#2B2B2B',
                marginBottom: '16px'
              }}>
                Payment Status Overview
              </h3>

              <div className="space-y-4">
                {['paid', 'partial', 'unpaid'].map((status) => {
                  const count = orders.filter(o => o.paymentStatus === status).length;
                  const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0;
                  const colors = {
                    paid: '#10B981',
                    partial: '#F59E0B',
                    unpaid: '#DC3545'
                  };

                  return (
                    <div key={status}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#2B2B2B',
                          textTransform: 'capitalize'
                        }}>
                          {status}
                        </span>
                        <span style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: colors[status as keyof typeof colors]
                        }}>
                          {count} orders
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#F0F0F0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${percentage}%`,
                          height: '100%',
                          background: colors[status as keyof typeof colors],
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent High-Value Orders */}
      <div className="mt-6">
        <Card style={{ background: 'white', border: 'none', boxShadow: '0 2px 8px rgba(90, 56, 37, 0.1)' }}>
          <div className="p-6">
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#2B2B2B',
              marginBottom: '16px'
            }}>
              High-Value Orders ($500+)
            </h3>

            {orders.filter(o => (o.totalAmount || 0) > 50000).length === 0 ? (
              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '14px',
                color: '#999',
                textAlign: 'center',
                padding: '32px'
              }}>
                No high-value orders
              </p>
            ) : (
              <div className="space-y-2">
                {orders
                  .filter(o => (o.totalAmount || 0) > 50000)
                  .slice(0, 5)
                  .map(order => (
                    <div
                      key={order.id}
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      style={{ border: '1px solid #E5E7EB' }}
                      onClick={() => onNavigate?.('order-management')}
                    >
                      <div>
                        <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#2B2B2B' }}>
                          {order.occasion || 'Custom Order'} - {order.customerName || 'Unknown'}
                        </p>
                        <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#666' }}>
                          #{order.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 600, color: '#10B981' }}>
                          ${((order.totalAmount || 0) / 100).toFixed(2)}
                        </p>
                        <p style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: '12px',
                          color: order.paymentStatus === 'paid' ? '#10B981' : '#F59E0B',
                          textTransform: 'capitalize'
                        }}>
                          {order.paymentStatus}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
