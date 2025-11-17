// Enhancement #25: CSV Export Utility
// Enables downloading filtered lists for offline review or reporting

export function formatDate(dateString: string | Date | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

export function downloadCSV(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function escapeCSVField(field: any): string {
  if (field === null || field === undefined) return '';
  
  const str = String(field);
  
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  
  return str;
}

export function exportCustomersToCSV(customers: any[]) {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Total Orders', 'VIP Status', 'Last Order Date', 'Customer Since'];
  
  const rows = customers.map(c => [
    c.id,
    c.name,
    c.email,
    c.phone || '',
    c.totalOrders || 0,
    c.isVip ? 'Yes' : 'No',
    formatDate(c.lastOrderDate),
    formatDate(c.createdAt)
  ]);
  
  const csvContent = [
    headers.map(escapeCSVField).join(','),
    ...rows.map(row => row.map(escapeCSVField).join(','))
  ].join('\n');
  
  const timestamp = new Date().toISOString().split('T')[0];
  downloadCSV(`customers_${timestamp}.csv`, csvContent);
}

export function exportOrdersToCSV(orders: any[]) {
  const headers = [
    'Order ID',
    'Customer Name',
    'Customer Email',
    'Order Type',
    'Occasion',
    'Status',
    'Total Amount',
    'Deposit Amount',
    'Balance Due',
    'Payment Status',
    'Event Date',
    'Created Date'
  ];
  
  const rows = orders.map(o => [
    o.id,
    o.customerName,
    o.customerEmail,
    o.orderType,
    o.occasion || '',
    o.status,
    o.totalAmount ? `$${(o.totalAmount / 100).toFixed(2)}` : '',
    o.depositAmount ? `$${(o.depositAmount / 100).toFixed(2)}` : '',
    o.balanceDue ? `$${(o.balanceDue / 100).toFixed(2)}` : '',
    o.paymentStatus,
    formatDate(o.eventDate),
    formatDate(o.createdAt)
  ]);
  
  const csvContent = [
    headers.map(escapeCSVField).join(','),
    ...rows.map(row => row.map(escapeCSVField).join(','))
  ].join('\n');
  
  const timestamp = new Date().toISOString().split('T')[0];
  downloadCSV(`orders_${timestamp}.csv`, csvContent);
}

export function exportPaymentsToCSV(payments: any[], orderInfo?: any) {
  const headers = [
    'Payment ID',
    'Order ID',
    'Payment Type',
    'Amount',
    'Payment Date',
    'Status',
    'Notes',
    'Recorded By',
    'Created Date'
  ];
  
  const rows = payments.map(p => [
    p.id,
    p.orderId,
    p.paymentType.replace('_', ' ').toUpperCase(),
    `$${(p.amount / 100).toFixed(2)}`,
    formatDate(p.paymentDate),
    p.paymentStatus,
    p.notes || '',
    p.recordedBy,
    formatDate(p.createdAt)
  ]);
  
  const csvContent = [
    headers.map(escapeCSVField).join(','),
    ...rows.map(row => row.map(escapeCSVField).join(','))
  ].join('\n');
  
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = orderInfo ? `order_${orderInfo.id}_payments_${timestamp}.csv` : `payments_${timestamp}.csv`;
  downloadCSV(filename, csvContent);
}
