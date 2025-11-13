export interface ChartDataPoint {
  date: string;
  count: number;
}

export interface ReportOrder {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: Date | string;
  status: string;
  totalAmount: number | null;
  depositAmount: number | null;
  balanceDue: number | null;
  createdAt: Date | string;
}

export interface OrderSummaryResponse {
  chartData: ChartDataPoint[];
  orders: ReportOrder[];
  totals: {
    count: number;
    revenue: number;
  };
}

export interface OrderSummaryFilters {
  startDate: string;
  endDate: string;
  status: string;
}
