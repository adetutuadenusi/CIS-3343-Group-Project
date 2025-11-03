// Mock Data for Emily Bakes Cakes
// This provides realistic demo data for all features without backend

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  popularity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  product: string;
  quantity: number;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  date: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  segment: 'vip' | 'regular' | 'new';
}

export interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
}

// Products Mock Data
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Classic Vanilla Birthday Cake',
    category: 'Birthday Cakes',
    price: 85,
    description: 'Three-layer vanilla cake with buttercream frosting',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400',
    inStock: true,
    popularity: 95
  },
  {
    id: 'p2',
    name: 'Elegant Wedding Tier',
    category: 'Wedding Cakes',
    price: 350,
    description: 'Three-tier masterpiece with handcrafted sugar flowers',
    image: 'https://images.unsplash.com/photo-1584158531319-96912adae663?w=400',
    inStock: true,
    popularity: 98
  },
  {
    id: 'p3',
    name: 'German Chocolate Delight',
    category: 'Specialty Cakes',
    price: 75,
    description: 'Rich chocolate layers with coconut pecan frosting',
    image: 'https://images.unsplash.com/photo-1644158776192-2d24ce35da1d?w=400',
    inStock: true,
    popularity: 88
  },
  {
    id: 'p4',
    name: 'Red Velvet Dream',
    category: 'Specialty Cakes',
    price: 80,
    description: 'Moist red velvet with cream cheese frosting',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400',
    inStock: true,
    popularity: 92
  },
  {
    id: 'p5',
    name: 'Custom Fondant Creation',
    category: 'Custom Cakes',
    price: 250,
    description: 'Fully customized fondant cake for any occasion',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
    inStock: true,
    popularity: 85
  },
  {
    id: 'p6',
    name: 'Cupcake Dozen Box',
    category: 'Cupcakes',
    price: 45,
    description: 'Assorted flavors, beautifully decorated',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400',
    inStock: true,
    popularity: 90
  }
];

// Orders Mock Data
export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    product: 'Elegant Wedding Tier',
    quantity: 1,
    total: 350,
    status: 'preparing',
    date: '2025-11-05',
    priority: 'high',
    notes: 'Needs delivery by 2pm Saturday'
  },
  {
    id: 'ord-002',
    customerName: 'Michael Chen',
    customerEmail: 'mchen@email.com',
    product: 'German Chocolate Delight',
    quantity: 2,
    total: 150,
    status: 'pending',
    date: '2025-11-04',
    priority: 'medium',
    notes: 'Pickup at 10am Friday'
  },
  {
    id: 'ord-003',
    customerName: 'Lisa Martinez',
    customerEmail: 'lisa.m@email.com',
    product: 'Classic Vanilla Birthday Cake',
    quantity: 1,
    total: 85,
    status: 'ready',
    date: '2025-11-03',
    priority: 'medium'
  },
  {
    id: 'ord-004',
    customerName: 'David Kim',
    customerEmail: 'dkim@email.com',
    product: 'Cupcake Dozen Box',
    quantity: 3,
    total: 135,
    status: 'completed',
    date: '2025-11-02',
    priority: 'low'
  },
  {
    id: 'ord-005',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily.r@email.com',
    product: 'Red Velvet Dream',
    quantity: 1,
    total: 80,
    status: 'pending',
    date: '2025-11-06',
    priority: 'high',
    notes: 'Gluten-free version requested'
  },
  {
    id: 'ord-006',
    customerName: 'James Wilson',
    customerEmail: 'jwilson@email.com',
    product: 'Custom Fondant Creation',
    quantity: 1,
    total: 250,
    status: 'preparing',
    date: '2025-11-05',
    priority: 'high',
    notes: 'Superhero theme for 8-year-old'
  }
];

// Customers Mock Data
export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 123-4567',
    totalOrders: 5,
    totalSpent: 875,
    lastOrder: '2025-11-05',
    segment: 'vip'
  },
  {
    id: 'c2',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '(555) 234-5678',
    totalOrders: 3,
    totalSpent: 320,
    lastOrder: '2025-11-04',
    segment: 'regular'
  },
  {
    id: 'c3',
    name: 'Lisa Martinez',
    email: 'lisa.m@email.com',
    phone: '(555) 345-6789',
    totalOrders: 7,
    totalSpent: 1240,
    lastOrder: '2025-11-03',
    segment: 'vip'
  },
  {
    id: 'c4',
    name: 'David Kim',
    email: 'dkim@email.com',
    phone: '(555) 456-7890',
    totalOrders: 1,
    totalSpent: 135,
    lastOrder: '2025-11-02',
    segment: 'new'
  },
  {
    id: 'c5',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 567-8901',
    totalOrders: 2,
    totalSpent: 205,
    lastOrder: '2025-11-06',
    segment: 'regular'
  }
];

// Sales Data for Charts
export const mockSalesData: SalesData[] = [
  { month: 'May', revenue: 12500, orders: 145, avgOrderValue: 86 },
  { month: 'Jun', revenue: 15200, orders: 168, avgOrderValue: 90 },
  { month: 'Jul', revenue: 18500, orders: 195, avgOrderValue: 95 },
  { month: 'Aug', revenue: 16800, orders: 182, avgOrderValue: 92 },
  { month: 'Sep', revenue: 19200, orders: 210, avgOrderValue: 91 },
  { month: 'Oct', revenue: 22500, orders: 238, avgOrderValue: 95 },
  { month: 'Nov', revenue: 25800, orders: 265, avgOrderValue: 97 }
];

// Top Products for Charts
export const topProductsData = [
  { name: 'Wedding Cakes', sales: 45, revenue: 15750 },
  { name: 'Birthday Cakes', sales: 120, revenue: 10200 },
  { name: 'Specialty Cakes', sales: 65, revenue: 5200 },
  { name: 'Custom Cakes', sales: 25, revenue: 6250 },
  { name: 'Cupcakes', sales: 180, revenue: 8100 }
];

// Customer Segments for Charts
export const customerSegmentData = [
  { name: 'VIP', value: 35, color: '#C44569' },
  { name: 'Regular', value: 45, color: '#F8EBD7' },
  { name: 'New', value: 20, color: '#E9E9E9' }
];

// Demo Data Sets for Toggle Feature
export interface DataSet {
  id: string;
  name: string;
  description: string;
  salesData: SalesData[];
  topProducts: typeof topProductsData;
  customerSegments: typeof customerSegmentData;
}

// Current Week Dataset (Default)
const currentSalesData: SalesData[] = mockSalesData;
const currentTopProducts = topProductsData;
const currentSegments = customerSegmentData;

// Peak Season Dataset (Holiday Rush)
const peakSalesData: SalesData[] = [
  { month: 'May', revenue: 18500, orders: 210, avgOrderValue: 88 },
  { month: 'Jun', revenue: 22800, orders: 245, avgOrderValue: 93 },
  { month: 'Jul', revenue: 28500, orders: 295, avgOrderValue: 97 },
  { month: 'Aug', revenue: 26200, orders: 272, avgOrderValue: 96 },
  { month: 'Sep', revenue: 31500, orders: 325, avgOrderValue: 97 },
  { month: 'Oct', revenue: 38900, orders: 395, avgOrderValue: 98 },
  { month: 'Nov', revenue: 45200, orders: 458, avgOrderValue: 99 }
];

const peakTopProducts = [
  { name: 'Wedding Cakes', sales: 85, revenue: 29750 },
  { name: 'Birthday Cakes', sales: 220, revenue: 18700 },
  { name: 'Specialty Cakes', sales: 105, revenue: 8400 },
  { name: 'Custom Cakes', sales: 48, revenue: 12000 },
  { name: 'Cupcakes', sales: 315, revenue: 14175 }
];

const peakSegments = [
  { name: 'VIP', value: 45, color: '#C44569' },
  { name: 'Regular', value: 40, color: '#F8EBD7' },
  { name: 'New', value: 15, color: '#E9E9E9' }
];

// Quiet Period Dataset (Off-Season)
const quietSalesData: SalesData[] = [
  { month: 'May', revenue: 6500, orders: 78, avgOrderValue: 83 },
  { month: 'Jun', revenue: 7200, orders: 85, avgOrderValue: 85 },
  { month: 'Jul', revenue: 8500, orders: 95, avgOrderValue: 89 },
  { month: 'Aug', revenue: 7800, orders: 88, avgOrderValue: 89 },
  { month: 'Sep', revenue: 9200, orders: 102, avgOrderValue: 90 },
  { month: 'Oct', revenue: 10500, orders: 115, avgOrderValue: 91 },
  { month: 'Nov', revenue: 11800, orders: 128, avgOrderValue: 92 }
];

const quietTopProducts = [
  { name: 'Wedding Cakes', sales: 15, revenue: 5250 },
  { name: 'Birthday Cakes', sales: 45, revenue: 3825 },
  { name: 'Specialty Cakes', sales: 28, revenue: 2240 },
  { name: 'Custom Cakes', sales: 8, revenue: 2000 },
  { name: 'Cupcakes', sales: 75, revenue: 3375 }
];

const quietSegments = [
  { name: 'VIP', value: 25, color: '#C44569' },
  { name: 'Regular', value: 50, color: '#F8EBD7' },
  { name: 'New', value: 25, color: '#E9E9E9' }
];

export const dataSets: DataSet[] = [
  {
    id: 'current',
    name: 'Current Week',
    description: 'Real-time orders and activity',
    salesData: currentSalesData,
    topProducts: currentTopProducts,
    customerSegments: currentSegments
  },
  {
    id: 'busy',
    name: 'Peak Season',
    description: 'Holiday rush simulation',
    salesData: peakSalesData,
    topProducts: peakTopProducts,
    customerSegments: peakSegments
  },
  {
    id: 'minimal',
    name: 'Quiet Period',
    description: 'Off-season activity',
    salesData: quietSalesData,
    topProducts: quietTopProducts,
    customerSegments: quietSegments
  }
];

// Generate randomized data for demo mode
export const generateRandomOrders = (count: number = 10): Order[] => {
  const statuses: Order['status'][] = ['pending', 'preparing', 'ready', 'completed'];
  const priorities: Order['priority'][] = ['low', 'medium', 'high'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `ord-${String(i + 100).padStart(3, '0')}`,
    customerName: `Customer ${i + 1}`,
    customerEmail: `customer${i + 1}@email.com`,
    product: mockProducts[Math.floor(Math.random() * mockProducts.length)].name,
    quantity: Math.floor(Math.random() * 3) + 1,
    total: Math.floor(Math.random() * 300) + 50,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: priorities[Math.floor(Math.random() * priorities.length)]
  }));
};
