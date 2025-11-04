import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { ProductCard } from '../../components/ProductCard';
import { SearchBar } from '../../components/SearchBar';
import { mockProducts, Product } from '../../data/mockData';
import { useToast } from '../../components/ToastContext';

export function AdminProducts() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          // Transform API data to match Product interface
          const transformedProducts = data.map((p: any) => ({
            id: p.id.toString(),
            name: p.name,
            category: p.category,
            price: p.price / 100, // Convert from cents
            description: p.description,
            image: p.image || `https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400`,
            inStock: p.inStock !== false,
            popularity: p.popularity || 0
          }));
          setProducts(transformedProducts.length > 0 ? transformedProducts : mockProducts);
        } else {
          setProducts(mockProducts);
          showToast('error', 'Failed to fetch products. Using mock data.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(mockProducts);
        showToast('error', 'Failed to fetch products. Using mock data.');
      }
    };

    fetchProducts();
  }, [showToast]);

  const handleEdit = (product: Product) => {
    showToast('info', `Edit functionality coming soon for ${product.name}`);
  };

  const handleView = (product: Product) => {
    showToast('info', `Viewing details for ${product.name}`);
  };

  const handleAddToCart = (product: Product) => {
    showToast('success', `Added ${product.name} to cart!`);
  };

  return (
    <div style={{ background: '#F8EBD7', minHeight: '100vh', padding: 'clamp(20px, 4vw, 40px)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                color: '#2B2B2B',
                marginBottom: '8px'
              }}
            >
              Product Catalog
            </h1>
            <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#5A3825', fontSize: '16px' }}>
              Manage your delicious offerings
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Add new product')}
            style={{
              padding: '12px 24px',
              background: '#C44569',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(196, 69, 105, 0.3)'
            }}
            aria-label="Add new product"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard
              product={product}
              onEdit={handleEdit}
              onView={handleView}
              onAddToCart={handleAddToCart}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
