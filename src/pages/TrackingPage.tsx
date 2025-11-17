import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentStage, TRACKING_STAGES } from '../utils/tracking';

interface TrackingOrder {
  id: number;
  status: string;
  trackingToken: string | null;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  fulfillment: {
    eventDate: Date | null;
  };
  payment: {
    totalAmount: number | null;
    depositAmount: number | null;
    balanceDue: number | null;
    depositRequired: number | null;
    depositMet: boolean;
    paymentStatus: string;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

export function TrackingPage() {
  const { token } = useParams<{ token: string }>();
  const [order, setOrder] = useState<TrackingOrder | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch order data
  useEffect(() => {
    if (!token) {
      setError('No tracking token provided');
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/track/${token}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Order not found. Please check your tracking token.');
          } else {
            setError('Failed to load order details.');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setOrder(data);
        
        // Calculate initial stage
        const stageIndex = getCurrentStage(data.metadata.createdAt);
        setCurrentStageIndex(stageIndex);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details.');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [token]);

  // Update stage index every 10 seconds
  useEffect(() => {
    if (!order) return;

    const interval = setInterval(() => {
      const newStageIndex = getCurrentStage(order.metadata.createdAt);
      setCurrentStageIndex(newStageIndex);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [order]);

  if (loading) {
    return (
      <div>
        <h1>Tracking Order</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Tracking Order</h1>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <h1>Tracking Order</h1>
        <p>No order found</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Tracking Order</h1>
      <p>Stage: {TRACKING_STAGES[currentStageIndex]}</p>
    </div>
  );
}
