import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockProducts, mockCustomers, Product, Customer } from '../data/mockData';

interface SearchResult {
  type: 'product' | 'customer';
  item: Product | Customer;
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchQuery = query.toLowerCase();
    
    // Search products
    const productResults: SearchResult[] = mockProducts
      .filter(product => 
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
      )
      .map(product => ({ type: 'product' as const, item: product }));

    // Search customers
    const customerResults: SearchResult[] = mockCustomers
      .filter(customer =>
        customer.name.toLowerCase().includes(searchQuery) ||
        customer.email.toLowerCase().includes(searchQuery)
      )
      .map(customer => ({ type: 'customer' as const, item: customer }));

    setResults([...productResults.slice(0, 5), ...customerResults.slice(0, 3)]);
    setShowResults(true);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'product') {
      const product = result.item as Product;
      alert(`Selected product: ${product.name}`);
    } else {
      const customer = result.item as Customer;
      alert(`Selected customer: ${customer.name}`);
    }
    setQuery('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl" style={{ zIndex: 50 }}>
      <div className="relative">
        <Search 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
          style={{ color: '#5A3825' }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowResults(true)}
          placeholder="Search products, customers..."
          aria-label="Search products and customers"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={showResults}
          style={{
            width: '100%',
            padding: '14px 50px 14px 48px',
            background: 'white',
            border: '2px solid #E9E9E9',
            borderRadius: '12px',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '16px',
            color: '#2B2B2B',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          className="focus:border-raspberry"
        />
        {query && (
          <button
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
            style={{ cursor: 'pointer' }}
          >
            <X className="w-5 h-5" style={{ color: '#5A3825' }} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            id="search-results"
            role="listbox"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: 'white',
              border: '2px solid #E9E9E9',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(90, 56, 37, 0.15)',
              maxHeight: '400px',
              overflowY: 'auto',
              padding: '8px'
            }}
          >
            {results.map((result, index) => {
              const isProduct = result.type === 'product';
              const item = result.item;
              
              return (
                <motion.div
                  key={`${result.type}-${item.id}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  onClick={() => handleResultClick(result)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: index === selectedIndex ? '#F8EBD7' : 'transparent',
                    transition: 'background 0.2s ease',
                    marginBottom: '4px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    {isProduct && (
                      <>
                        <div 
                          className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${(item as Product).image})` }}
                        />
                        <div className="flex-1">
                          <h4 style={{ 
                            fontFamily: 'Poppins, sans-serif', 
                            fontSize: '15px', 
                            fontWeight: 600, 
                            color: '#2B2B2B',
                            marginBottom: '2px'
                          }}>
                            {(item as Product).name}
                          </h4>
                          <p style={{ 
                            fontFamily: 'Open Sans, sans-serif', 
                            fontSize: '13px', 
                            color: '#5A3825' 
                          }}>
                            {(item as Product).category} • ${(item as Product).price}
                          </p>
                        </div>
                        <span 
                          className="px-2 py-1 rounded text-xs"
                          style={{ 
                            background: '#C4456920', 
                            color: '#C44569',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600
                          }}
                        >
                          Product
                        </span>
                      </>
                    )}
                    {!isProduct && (
                      <>
                        <div 
                          className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                          style={{ background: '#C4456920' }}
                        >
                          <span style={{ 
                            fontFamily: 'Poppins, sans-serif', 
                            fontSize: '18px', 
                            fontWeight: 700, 
                            color: '#C44569' 
                          }}>
                            {(item as Customer).name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 style={{ 
                            fontFamily: 'Poppins, sans-serif', 
                            fontSize: '15px', 
                            fontWeight: 600, 
                            color: '#2B2B2B',
                            marginBottom: '2px'
                          }}>
                            {(item as Customer).name}
                          </h4>
                          <p style={{ 
                            fontFamily: 'Open Sans, sans-serif', 
                            fontSize: '13px', 
                            color: '#5A3825' 
                          }}>
                            {(item as Customer).email}
                          </p>
                        </div>
                        <span 
                          className="px-2 py-1 rounded text-xs"
                          style={{ 
                            background: '#5A382520', 
                            color: '#5A3825',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600
                          }}
                        >
                          Customer
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {showResults && results.length === 0 && query && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: 'white',
            border: '2px solid #E9E9E9',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#5A3825' }}>
            No results found for "{query}"
          </p>
        </motion.div>
      )}

      <style>{`
        .focus\\:border-raspberry:focus {
          border-color: #C44569 !important;
        }
      `}</style>
    </div>
  );
}
