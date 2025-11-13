import { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { ReportLayout } from './ReportLayout';
import { useToast } from '../../../components/ToastContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  timesOrdered: number;
  revenue: number;
  trending: boolean;
}

export function ProductInventoryReport() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [exportingCSV, setExportingCSV] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [top10Data, setTop10Data] = useState<Array<{ name: string; revenue: number }>>([]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const allProducts = await response.json();
      
      const productsWithStats = allProducts.map((product: any) => ({
        id: product.id,
        name: product.name,
        category: product.category || 'Uncategorized',
        price: product.price / 100,
        timesOrdered: Math.floor(Math.random() * 50), // Mock data
        revenue: Math.floor(Math.random() * 5000), // Mock data
        trending: Math.random() > 0.7
      }));

      setProducts(productsWithStats);

      // Get top 10 by revenue
      const top10 = [...productsWithStats]
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10)
        .map(p => ({ name: p.name, revenue: p.revenue }));

      setTop10Data(top10);
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

  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter(p => p.category === categoryFilter);

  const handleExportCSV = () => {
    setExportingCSV(true);
    
    const headers = ['Product', 'Category', 'Price', 'Times Ordered', 'Revenue', 'Trending'];
    const rows = filteredProducts.map(product => [
      product.name,
      product.category,
      `$${product.price.toFixed(2)}`,
      product.timesOrdered,
      `$${product.revenue.toFixed(2)}`,
      product.trending ? 'Yes' : 'No'
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-inventory-${new Date().toISOString().split('T')[0]}.csv`;
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
      doc.text('Product Inventory Report', 14, 20);
      
      const tableData = filteredProducts.map(product => [
        product.name,
        product.category,
        `$${product.price.toFixed(2)}`,
        product.timesOrdered.toString(),
        `$${product.revenue.toFixed(2)}`
      ]);
      
      autoTable(doc, {
        head: [['Product', 'Category', 'Price', 'Times Ordered', 'Revenue']],
        body: tableData,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [196, 69, 105] }
      });
      
      doc.save(`product-inventory-${new Date().toISOString().split('T')[0]}.pdf`);
      
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
          Filter by Category
        </label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Cakes">Cakes</SelectItem>
            <SelectItem value="Cupcakes">Cupcakes</SelectItem>
            <SelectItem value="Pastries">Pastries</SelectItem>
            <SelectItem value="Cookies">Cookies</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <ReportLayout
      title="Product Inventory Report"
      description="Top products by revenue and order frequency (Manager Only)"
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
            <h3 className="text-lg font-semibold mb-4">Top 10 Products by Revenue</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={top10Data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: 'Revenue ($)', position: 'insideBottom', offset: -5 }} />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#C44569" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6" style={{ background: 'white' }}>
            <h3 className="text-lg font-semibold mb-4">All Products ({filteredProducts.length})</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Times Ordered</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Trending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.timesOrdered}</TableCell>
                      <TableCell>${product.revenue.toFixed(2)}</TableCell>
                      <TableCell>
                        {product.trending && (
                          <span className="px-2 py-1 rounded text-xs font-semibold" style={{ background: '#4CAF5020', color: '#4CAF50' }}>
                            Trending
                          </span>
                        )}
                      </TableCell>
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
