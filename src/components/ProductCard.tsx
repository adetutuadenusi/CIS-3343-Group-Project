import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Edit, Eye } from 'lucide-react';
import { Product } from '../data/mockData';
import { Card, CardContent } from './ui/card';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onView, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Card 
        style={{ 
          background: 'white', 
          border: 'none',
          boxShadow: '0 4px 12px rgba(90, 56, 37, 0.1)',
          overflow: 'hidden',
          height: '100%',
          position: 'relative'
        }}
      >
        {/* Image Container */}
        <div 
          className="relative overflow-hidden"
          style={{ paddingTop: '75%' }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showActions ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center gap-3"
            style={{ background: 'rgba(43, 43, 43, 0.7)' }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onView?.(product)}
              className="p-3 rounded-full"
              style={{ background: 'white' }}
              aria-label="View product details"
            >
              <Eye className="w-5 h-5" style={{ color: '#C44569' }} />
            </motion.button>
            {onEdit && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(product)}
                className="p-3 rounded-full"
                style={{ background: 'white' }}
                aria-label="Edit product"
              >
                <Edit className="w-5 h-5" style={{ color: '#C44569' }} />
              </motion.button>
            )}
          </motion.div>

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 p-2 rounded-full"
            style={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className="w-5 h-5" 
              style={{ 
                color: '#C44569',
                fill: isFavorite ? '#C44569' : 'none'
              }} 
            />
          </motion.button>

          {/* Stock Badge */}
          {!product.inStock && (
            <div 
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold"
              style={{ 
                background: '#DC3545',
                color: 'white',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Out of Stock
            </div>
          )}

          {/* Popularity Badge */}
          {product.popularity >= 90 && (
            <div 
              className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ 
                background: '#FFD700',
                color: '#2B2B2B',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              ⭐ Popular
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="mb-2">
            <span 
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ 
                color: '#C44569',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              {product.category}
            </span>
          </div>

          <h3 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '18px', 
            fontWeight: 600, 
            color: '#2B2B2B',
            marginBottom: '8px',
            minHeight: '48px'
          }}>
            {product.name}
          </h3>

          <p style={{ 
            fontFamily: 'Open Sans, sans-serif', 
            fontSize: '14px', 
            color: '#5A3825',
            marginBottom: '16px',
            minHeight: '42px',
            lineHeight: 1.5
          }}>
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '24px', 
              fontWeight: 700, 
              color: '#C44569' 
            }}>
              ${product.price}
            </span>

            {onAddToCart && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(product)}
                disabled={!product.inStock}
                style={{
                  padding: '10px 20px',
                  background: product.inStock ? '#C44569' : '#E9E9E9',
                  color: product.inStock ? 'white' : '#5A3825',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease'
                }}
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
