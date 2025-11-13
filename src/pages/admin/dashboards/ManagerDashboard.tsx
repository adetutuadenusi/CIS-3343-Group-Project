import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DollarSign, ShoppingCart, Users, TrendingUp, Package, Calendar, Settings, FileText } from 'lucide-react';
import { KPICard } from '../../../components/dashboard/KPICard';
import { QuickActionCard } from '../../../components/dashboard/QuickActionCard';
import { Card } from '../../../components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ManagerDashboardProps {
  onNavigate?: (page: string) => void;
}

export function ManagerDashboard({ onNavigate }: ManagerDashboardProps) {
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

  // Manager-level analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const activeOrders = orders.filter(o => !['completed', 'cancelled'].includes(o.status || '')).length;

  // Mock revenue trend data (would come from API)
  const revenueTrend = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5100 },
    { month: 'Mar', revenue: 4800 },
    { month: 'Apr', revenue: 6200 },
    { month: 'May', revenue: 7100 },
    { month: 'Jun', revenue: 6800 }
  ];

  // Order status distribution
  const statusData = [
    { status: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { status: 'Preparing', count: orders.filter(o => ['baking', 'decorating'].includes(o.status || '')).length },
    { status: 'Ready', count: orders.filter(o => o.status === 'ready').length },
    { status: 'Completed', count: completedOrders }
  ];

  const quickActions = [
    {
      label: 'Create Order',
      icon: Package,
      color: '#C44569',
      onClick: () => onNavigate?.('order-create')
    },
    {
      label: 'View All Orders',
      icon: ShoppingCart,
      color: '#5A3825',
      onClick: () => onNavigate?.('order-management')
    },
    {
      label: 'Business Intelligence',
      icon: FileText,
      color: '#3B82F6',
      onClick: () => onNavigate?.('business-intelligence')
    },
    {
      label: 'System Settings',
      icon: Settings,
      color: '#6B7280',
      onClick: () => onNavigate?.('system-configuration')
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
          Manager Dashboard
        </h1>
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#5A3825' }}>
          Complete business overview and system management
        </p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Total Revenue"
          value={`$${(totalRevenue / 100).toFixed(0)}`}
          change="+18.2%"
          icon={DollarSign}
          color="#10B981"
          index={0}
        />
        <KPICard
          title="Active Orders"
          value={activeOrders}
          icon={ShoppingCart}
          color="#F59E0B"
          index={1}
        />
        <KPICard
          title="Avg Order Value"
          value={`$${(avgOrderValue / 100).toFixed(0)}`}
          change="+5.7%"
          icon={TrendingUp}
          color="#C44569"
          index={2}
        />
        <KPICard
          title="Completed"
          value={completedOrders}
          icon={Package}
          color="#5A3825"
          index={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend */}
        <Card style={{ background: 'white', border: 'none', boxShadow: '0 2px 8px rgba(90, 56, 37, 0.1)' }}>
          <div className="p-6">
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#2B2B2B',
              marginBottom: '16px'
            }}>
              Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif' }} />
                <YAxis style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#C44569" strokeWidth={2} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Order Status Distribution */}
        <Card style={{ background: 'white', border: 'none', boxShadow: '0 2px 8px rgba(90, 56, 37, 0.1)' }}>
          <div className="p-6">
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#2B2B2B',
              marginBottom: '16px'
            }}>
              Order Status
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="status" style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif' }} />
                <YAxis style={{ fontSize: '12px', fontFamily: 'Open Sans, sans-serif' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#C44569" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <QuickActionCard title="Quick Actions" actions={quickActions} />
        </div>

        {/* System Status */}
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
                System Overview
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={20} color="#C44569" />
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#2B2B2B' }}>
                      Today's Pickups
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 600, color: '#C44569' }}>
                    {orders.filter(o => {
                      const today = new Date().toDateString();
                      return o.eventDate && new Date(o.eventDate).toDateString() === today;
                    }).length}
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={20} color="#5A3825" />
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#2B2B2B' }}>
                      Total Customers
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 600, color: '#5A3825' }}>
                    {new Set(orders.map(o => o.customerId)).size}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
