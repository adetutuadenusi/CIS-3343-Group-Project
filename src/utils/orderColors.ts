// Status-based colors for order cards
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'pending': '#F59E0B',
    'baking': '#F97316',
    'decorating': '#8B5CF6',
    'ready': '#10B981',
    'completed': '#3B82F6',
    'cancelled': '#6B7280'
  };
  return statusColors[status.toLowerCase()] || '#6B7280';
};

// Priority-based colors for order cards
export const getPriorityColor = (priority: string): string => {
  const priorityColors: Record<string, string> = {
    'high': '#EF4444',
    'medium': '#F59E0B',
    'low': '#9CA3AF',
    'rush': '#DC2626'
  };
  return priorityColors[priority.toLowerCase()] || '#9CA3AF';
};

// Border stripe style generator for order cards
export const getBorderStripeStyle = (status?: string, priority?: string) => {
  // Priority takes precedence over status for visual urgency
  const color = priority ? getPriorityColor(priority) : getStatusColor(status || 'pending');
  
  return {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    background: color,
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px'
  };
};
