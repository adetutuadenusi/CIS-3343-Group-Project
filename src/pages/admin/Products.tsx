import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useToast } from '../../components/ToastContext';
import { Badge } from '../../components/ui/badge';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number; // in cents
  description: string | null;
  image: string | null;
  inStock: boolean;
  popularity: number;
}

export function AdminProducts() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Add/Edit Product Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Cakes',
    price: '',
    description: '',
    image: '',
    inStock: true,
    popularity: '0'
  });

  // Fetch products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('error', 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, products]);

  // Open Add Product Modal
  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Cakes',
      price: '',
      description: '',
      image: '',
      inStock: true,
      popularity: '0'
    });
    setIsModalOpen(true);
  };

  // Open Edit Product Modal
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: (product.price / 100).toString(),
      description: product.description || '',
      image: product.image || '',
      inStock: product.inStock,
      popularity: product.popularity.toString()
    });
    setIsModalOpen(true);
  };

  // Save Product (Add or Edit)
  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price) {
      showToast('error', 'Name and price are required');
      return;
    }

    try {
      const payload = {
        name: productForm.name,
        category: productForm.category,
        price: Math.round(parseFloat(productForm.price) * 100), // Convert to cents
        description: productForm.description || null,
        image: productForm.image || null,
        inStock: productForm.inStock,
        popularity: parseInt(productForm.popularity) || 0
      };

      if (editingProduct) {
        // Update existing product
        const response = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Failed to update product');
        showToast('success', `${productForm.name} updated successfully!`);
      } else {
        // Create new product
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Failed to create product');
        showToast('success', `${productForm.name} added successfully!`);
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      showToast('error', 'Failed to save product');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete product');
      
      showToast('success', `${product.name} deleted successfully`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('error', 'Failed to delete product');
    }
  };

  return (
    <div className="h-full overflow-auto p-6" style={{ background: '#F8EBD7' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '32px',
                fontWeight: 700,
                color: '#2B2B2B',
                marginBottom: '8px'
              }}>
                Product Catalog
              </h1>
              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '14px',
                color: '#5A3825'
              }}>
                Manage all products - standard cakes, custom options, and more
              </p>
            </div>

            <Button
              onClick={handleAddProduct}
              style={{
                background: '#C44569',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600
              }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Filters */}
          <Card className="p-4 mb-4" style={{ background: 'white', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
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
          </Card>
        </div>

        {/* Products Table */}
        <Card className="p-6" style={{ background: 'white', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {isLoading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products found. Click "Add Product" to create your first product.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Popularity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" style={{ borderColor: '#C44569', color: '#C44569' }}>
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>${(product.price / 100).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.inStock ? "default" : "secondary"}
                          style={product.inStock ? { background: '#4CAF50', color: 'white' } : {}}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.popularity}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product)}
                            style={{ borderColor: '#DC3545', color: '#DC3545' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        {/* Add/Edit Product Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#2B2B2B' }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2B2B2B' }}>
                  Product Name *
                </label>
                <Input
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g., Birthday Celebration Cake"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2B2B2B' }}>
                    Category *
                  </label>
                  <Select value={productForm.category} onValueChange={(value) => setProductForm({ ...productForm, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cakes">Cakes</SelectItem>
                      <SelectItem value="Cupcakes">Cupcakes</SelectItem>
                      <SelectItem value="Pastries">Pastries</SelectItem>
                      <SelectItem value="Cookies">Cookies</SelectItem>
                      <SelectItem value="Pies">Pies</SelectItem>
                      <SelectItem value="Breads">Breads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2B2B2B' }}>
                    Price ($) *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="30.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2B2B2B' }}>
                  Description
                </label>
                <Textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Product description..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2B2B2B' }}>
                  Image URL
                </label>
                <Input
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2B2B2B' }}>
                    Stock Status
                  </label>
                  <Select 
                    value={productForm.inStock ? 'in-stock' : 'out-of-stock'} 
                    onValueChange={(value) => setProductForm({ ...productForm, inStock: value === 'in-stock' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2B2B2B' }}>
                    Popularity (0-100)
                  </label>
                  <Input
                    type="number"
                    value={productForm.popularity}
                    onChange={(e) => setProductForm({ ...productForm, popularity: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveProduct}
                style={{ background: '#C44569', color: 'white' }}
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
