import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Edit, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  Calendar,
  DollarSign,
  ShoppingBag,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';

// Types
interface CustomerProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  customerType: 'retail' | 'corporate';
  isPreferred: boolean;
  totalOrders: number;
  firstOrderDate: string | null;
  lastOrderDate: string | null;
  avgOrderValue: number;
  favoriteProducts: string[];
  commonFlavors: string[];
  commonDecorations: string[];
  allergies?: string;
  specialNotes?: string;
  daysSinceLastOrder: number;
  atRiskOfChurn: boolean;
}

interface OrderHistoryItem {
  id: number;
  orderNumber: string;
  productName: string;
  sizeDescription: string;
  orderDate: string;
  eventDate: string;
  totalAmount: number;
  status: string;
}

const CustomerDetailView: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();

  // Fetch customer details
  const { data: customer, isLoading: loadingCustomer } = useQuery<CustomerProfile>({
    queryKey: ['customer-detail', customerId],
    queryFn: async () => {
      const response = await fetch(`/api/customers/${customerId}`);
      if (!response.ok) throw new Error('Failed to fetch customer details');
      return response.json();
    },
    enabled: !!customerId
  });

  // Fetch order history
  const { data: orderHistory, isLoading: loadingOrders } = useQuery<OrderHistoryItem[]>({
    queryKey: ['customer-orders', customerId],
    queryFn: async () => {
      const response = await fetch(`/api/customers/${customerId}/orders`);
      if (!response.ok) throw new Error('Failed to fetch order history');
      return response.json();
    },
    enabled: !!customerId
  });

  const isLoading = loadingCustomer || loadingOrders;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#C44569]" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Not Found</h2>
        <p className="text-gray-600 mb-6">The customer you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/admin/customers')}
          className="px-4 py-2 bg-[#C44569] text-white rounded-lg hover:bg-[#B03D5D] transition-colors"
        >
          Back to Customers
        </button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed' || statusLower === 'picked up') return 'bg-green-100 text-green-800 border-green-200';
    if (statusLower === 'cancelled') return 'bg-red-100 text-red-800 border-red-200';
    if (statusLower === 'ready') return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-[#F8EBD7] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/customers')}
            className="flex items-center gap-2 text-[#5A3825] hover:text-[#C44569] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Customers</span>
          </button>
        </div>

        {/* Customer Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-[#C44569]/20 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#2B2B2B]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {customer.fullName}
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                  customer.customerType === 'corporate' 
                    ? 'bg-blue-100 text-blue-800 border-blue-200' 
                    : 'bg-purple-100 text-purple-800 border-purple-200'
                }`}>
                  {customer.customerType === 'corporate' ? 'Corporate' : 'Retail'}
                </span>
                {customer.isPreferred && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Star size={14} fill="currentColor" />
                    Preferred Customer (10% discount)
                  </span>
                )}
                {customer.atRiskOfChurn && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    At Risk of Churn
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/admin/customers/${customerId}/edit`)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-[#C44569] text-[#C44569] rounded-lg hover:bg-[#C44569] hover:text-white transition-colors"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => navigate(`/admin/orders/create?customerId=${customerId}`)}
                className="flex items-center gap-2 px-4 py-2 bg-[#C44569] text-white rounded-lg hover:bg-[#B03D5D] transition-colors"
              >
                <Plus size={16} />
                Create Order
              </button>
            </div>
          </div>

          {/* Two-column layout for contact and stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2B2B2B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Contact Information
              </h3>
              <div className="space-y-3 text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail size={18} className="text-[#C44569]" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={18} className="text-[#C44569]" />
                  <span>{customer.phone}</span>
                </div>
                {customer.address && (
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin size={18} className="text-[#C44569] mt-0.5" />
                    <span>{customer.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2B2B2B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Customer Statistics
              </h3>
              <div className="space-y-3 text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <ShoppingBag size={16} className="text-[#C44569]" />
                    Total Orders:
                  </span>
                  <span className="font-semibold text-gray-900">{customer.totalOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <DollarSign size={16} className="text-[#C44569]" />
                    Avg Order Value:
                  </span>
                  <span className="font-semibold text-gray-900">${customer.avgOrderValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar size={16} className="text-[#C44569]" />
                    First Order:
                  </span>
                  <span className="text-gray-700">
                    {customer.firstOrderDate ? format(new Date(customer.firstOrderDate), 'MMM d, yyyy') : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar size={16} className="text-[#C44569]" />
                    Last Order:
                  </span>
                  <span className="text-gray-700">
                    {customer.lastOrderDate ? (
                      <>
                        {format(new Date(customer.lastOrderDate), 'MMM d, yyyy')}
                        <span className="text-gray-500 ml-2 text-xs">
                          ({customer.daysSinceLastOrder} days ago)
                        </span>
                      </>
                    ) : (
                      'Never'
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences & Notes */}
          {(customer.favoriteProducts?.length > 0 || customer.commonFlavors?.length > 0 || 
            customer.allergies || customer.specialNotes) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-[#2B2B2B] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Preferences & Notes
              </h3>
              <div className="bg-[#F8EBD7]/50 p-4 rounded-xl space-y-3 text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {customer.favoriteProducts && customer.favoriteProducts.length > 0 && (
                  <div>
                    <strong className="text-[#5A3825]">Favorite Products:</strong>{' '}
                    <span className="text-gray-700">{customer.favoriteProducts.join(', ')}</span>
                  </div>
                )}
                {customer.commonFlavors && customer.commonFlavors.length > 0 && (
                  <div>
                    <strong className="text-[#5A3825]">Common Flavors:</strong>{' '}
                    <span className="text-gray-700">{customer.commonFlavors.join(', ')}</span>
                  </div>
                )}
                {customer.commonDecorations && customer.commonDecorations.length > 0 && (
                  <div>
                    <strong className="text-[#5A3825]">Common Decorations:</strong>{' '}
                    <span className="text-gray-700">{customer.commonDecorations.join(', ')}</span>
                  </div>
                )}
                {customer.allergies && (
                  <div className="flex items-start gap-2 text-red-600 font-semibold bg-red-50 p-3 rounded-lg border border-red-200">
                    <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>ALLERGIES:</strong> {customer.allergies}
                    </div>
                  </div>
                )}
                {customer.specialNotes && (
                  <div>
                    <strong className="text-[#5A3825]">Special Notes:</strong>{' '}
                    <span className="text-gray-700">{customer.specialNotes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Order History Card */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-[#C44569]/20 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#2B2B2B]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Order History
              </h2>
              <p className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {orderHistory?.length || 0} total orders
              </p>
            </div>
          </div>

          {!orderHistory || orderHistory.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                No orders yet
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center p-4 border-2 border-gray-200 rounded-xl hover:border-[#C44569]/50 hover:bg-[#F8EBD7]/20 cursor-pointer transition-all"
                  onClick={() => navigate(`/admin/orders/${order.id}`)}
                >
                  <div className="flex-1">
                    <div className="font-semibold text-[#2B2B2B] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Order #{order.orderNumber}
                    </div>
                    <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {order.productName} • {order.sizeDescription}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Ordered: {format(new Date(order.orderDate), 'MMM d, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Event: {format(new Date(order.eventDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2 ml-4">
                    <div className="font-bold text-lg text-[#2B2B2B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      ${order.totalAmount.toFixed(2)}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailView;
