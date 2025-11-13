import { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { ReportLayout } from './ReportLayout';
import { useToast } from '../../../components/ToastContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface CompletedOrder {
  id: number;
  completionDate: string;
  customerName: string;
  baker: string | null;
  decorator: string | null;
  daysToComplete: number;
  rating: number;
  totalAmount: number;
}

export function CompletedOrdersReport() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [exportingCSV, setExportingCSV] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [orders, setOrders] = useState<CompletedOrder[]>([]);
  const [chartData, setChartData] = useState<Array<{ type: string; avgDays: number }>>([]);
  const [ratingFilter, setRatingFilter] = useState('all');

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const allOrders = await response.json();
      
      const completedOrders = allOrders
        .filter((order: any) => order.status === 'completed')
        .map((order: any) => {
          const created = new Date(order.createdAt);
          const completed = new Date(order.updatedAt);
          const diffTime = Math.abs(completed.getTime() - created.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return {
            id: order.id,
            completionDate: order.updatedAt,
            customerName: order.customerName || 'Unknown',
            baker: order.assignedBaker || null,
            decorator: order.assignedDecorator || null,
            daysToComplete: diffDays,
            rating: 5, // Default rating
            totalAmount: order.totalAmount ? order.totalAmount / 100 : 0
          };
        });

      setOrders(completedOrders);

      // Calculate average completion time by order type
      const avgByType = [
        { type: 'Custom Cakes', avgDays: completedOrders.filter((o: CompletedOrder) => o.totalAmount > 50).reduce((sum: number, o: CompletedOrder) => sum + o.daysToComplete, 0) / Math.max(completedOrders.filter((o: CompletedOrder) => o.totalAmount > 50).length, 1) },
        { type: 'Standard Cakes', avgDays: completedOrders.filter((o: CompletedOrder) => o.totalAmount <= 50).reduce((sum: number, o: CompletedOrder) => sum + o.daysToComplete, 0) / Math.max(completedOrders.filter((o: CompletedOrder) => o.totalAmount <= 50).length, 1) }
      ];

      setChartData(avgByType);
    } catch (error) {
      console.error('Error fetching report:', error);
      showToast('error', 'Failed to load report data', 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const filteredOrders = ratingFilter === 'all'
    ? orders
    : orders.filter(o => o.rating >= parseInt(ratingFilter));

  const handleExportCSV = () => {
    setExportingCSV(true);
    
    const headers = ['Order #', 'Completion Date', 'Customer', 'Baker', 'Decorator', 'Days to Complete', 'Rating', 'Amount'];
    const rows = filteredOrders.map(order => [
      order.id,
      new Date(order.completionDate).toLocaleDateString(),
      order.customerName,
      order.baker || 'N/A',
      order.decorator || 'N/A',
      order.daysToComplete,
      order.rating,
      `$${order.totalAmount.toFixed(2)}`
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `completed-orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setTimeout(() => {
      setExportingCSV(false);
      showToast('success', 'CSV file downloaded', 'Export Complete');
    }, 800);
  };

  const handleExportPDF = () => {
    setExportingPDF(true);
    
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.setTextColor(196, 69, 105);
      doc.text('Completed Orders Report', 14, 20);
      
      const tableData = filteredOrders.map(order => [
        order.id.toString(),
        new Date(order.completionDate).toLocaleDateString(),
        order.customerName,
        order.baker || 'N/A',
        order.decorator || 'N/A',
        order.daysToComplete.toString(),
        `$${order.totalAmount.toFixed(2)}`
      ]);
      
      autoTable(doc, {
        head: [['Order #', 'Completion Date', 'Customer', 'Baker', 'Decorator', 'Days', 'Amount']],
        body: tableData,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [196, 69, 105] }
      });
      
      doc.save(`completed-orders-${new Date().toISOString().split('T')[0]}.pdf`);
      
      setTimeout(() => {
        setExportingPDF(false);
        showToast('success', 'PDF file downloaded', 'Export Complete');
      }, 800);
    } catch (error) {
      setExportingPDF(false);
      showToast('error', 'Failed to export PDF', 'Error');
    }
  };

  const filters = (
    <div className="flex gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2" style={{ color: '#2B2B2B' }}>
          Filter by Rating
        </label>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <ReportLayout
      title="Completed Orders Report"
      description="Track completion times and performance metrics"
      onExportCSV={handleExportCSV}
      onExportPDF={handleExportPDF}
      exportingCSV={exportingCSV}
      exportingPDF={exportingPDF}
      filters={filters}
    >
      {loading ? (
        <Card className="p-8 text-center">Loading...</Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-6" style={{ background: 'white' }}>
            <h3 className="text-lg font-semibold mb-4">Average Completion Time by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgDays" fill="#C44569" name="Avg Days to Complete" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6" style={{ background: 'white' }}>
            <h3 className="text-lg font-semibold mb-4">Completed Orders ({filteredOrders.length})</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Baker</TableHead>
                    <TableHead>Decorator</TableHead>
                    <TableHead>Days to Complete</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{new Date(order.completionDate).toLocaleDateString()}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.baker || 'N/A'}</TableCell>
                      <TableCell>{order.decorator || 'N/A'}</TableCell>
                      <TableCell>{order.daysToComplete} days</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}
    </ReportLayout>
  );
}
