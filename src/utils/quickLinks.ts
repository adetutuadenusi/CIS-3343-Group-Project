// Enhancement #40: Quick navigation links between related records

/**
 * Navigate to order detail from customer or payment view
 * @param orderId - The order ID to navigate to
 * @param context - Context from which navigation is triggered (for analytics)
 */
export function navigateToOrder(orderId: number, context: 'customer' | 'payment' = 'customer'): void {
  // In a real app, this would use React Router
  // For now, we'll store the order ID in sessionStorage and trigger an event
  sessionStorage.setItem('selectedOrderId', orderId.toString());
  sessionStorage.setItem('orderNavigationContext', context);
  
  // Trigger a custom event that OrderList can listen to
  window.dispatchEvent(new CustomEvent('navigateToOrder', { 
    detail: { orderId, context } 
  }));
}

/**
 * Navigate to customer detail from order view
 * @param customerId - The customer ID to navigate to
 */
export function navigateToCustomer(customerId: number): void {
  sessionStorage.setItem('selectedCustomerId', customerId.toString());
  sessionStorage.setItem('customerNavigationContext', 'order');
  
  window.dispatchEvent(new CustomEvent('navigateToCustomer', { 
    detail: { customerId } 
  }));
}

/**
 * Get pending navigation data and clear it
 * @returns Navigation data if available
 */
export function getPendingNavigation(): { type: 'order' | 'customer'; id: number } | null {
  const orderId = sessionStorage.getItem('selectedOrderId');
  const customerId = sessionStorage.getItem('selectedCustomerId');
  
  if (orderId) {
    sessionStorage.removeItem('selectedOrderId');
    sessionStorage.removeItem('orderNavigationContext');
    return { type: 'order', id: parseInt(orderId) };
  }
  
  if (customerId) {
    sessionStorage.removeItem('selectedCustomerId');
    sessionStorage.removeItem('customerNavigationContext');
    return { type: 'customer', id: parseInt(customerId) };
  }
  
  return null;
}

/**
 * Create a clickable link style for order/customer IDs
 * @returns CSS style object for links
 */
export function getLinkStyle() {
  return {
    color: '#C44569',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'opacity 0.2s',
    ':hover': {
      opacity: 0.7
    }
  };
}
