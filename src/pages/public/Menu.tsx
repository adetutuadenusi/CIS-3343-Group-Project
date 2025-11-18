import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Cake, Sparkles } from 'lucide-react';
import { 
  standardCakes, 
  cakeFlavors, 
  fillingFlavors, 
  icingFlavors, 
  icingColors, 
  decorations 
} from '../../data/cakeOptions';

type FilterCategory = 'standard-cakes' | 'cake-flavors' | 'fillings' | 'icing-types' | 'icing-colors' | 'decorations';

const filterOptions = [
  { id: 'standard-cakes' as FilterCategory, label: 'Standard Cakes' },
  { id: 'cake-flavors' as FilterCategory, label: 'Cake Flavors' },
  { id: 'fillings' as FilterCategory, label: 'Fillings' },
  { id: 'icing-types' as FilterCategory, label: 'Icing Types' },
  { id: 'icing-colors' as FilterCategory, label: 'Icing Colors' },
  { id: 'decorations' as FilterCategory, label: 'Decorations' }
];

function MenuHero() {
  return (
    <section 
      className="relative text-white py-32 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #C44569 0%, #8B3A5E 50%, #6B2D4F 100%)',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full mb-8"
          >
            <Sparkles size={64} className="text-white" strokeWidth={1.5} />
          </motion.div>

          <h1 
            className="text-6xl md:text-7xl font-bold mb-6"
            style={{ fontFamily: 'Playfair Display', lineHeight: 1.2 }}
          >
            Our Menu
          </h1>
          <p 
            className="text-2xl md:text-3xl mb-10 max-w-3xl mx-auto"
            style={{ fontFamily: 'Poppins', opacity: 0.95, fontWeight: 300 }}
          >
            Explore our signature collection of European-style custom cakes
          </p>
          
          <motion.div 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/15 backdrop-blur-md rounded-full border border-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontFamily: 'Poppins' }}
          >
            14 Signature Cakes • 6 Flavors • 15 Fillings • 37 Colors
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0,0 C300,80 600,80 900,40 L1200,80 L1200,120 L0,120 Z" fill="white" opacity="0.3"/>
          <path d="M0,20 C300,100 600,100 900,60 L1200,100 L1200,120 L0,120 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

function FilterNavigation({ activeFilter, onFilterChange }: { 
  activeFilter: FilterCategory; 
  onFilterChange: (filter: FilterCategory) => void;
}) {
  return (
    <div 
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md"
      style={{ borderBottom: '2px solid #E8D5C4' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto py-4 gap-3 scrollbar-hide">
          {filterOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              className="px-8 py-3 rounded-full font-semibold whitespace-nowrap transition-all"
              style={{
                fontFamily: 'Poppins',
                fontSize: '15px',
                background: activeFilter === option.id 
                  ? 'linear-gradient(135deg, #C44569 0%, #8B3A5E 100%)'
                  : '#F8EBD7',
                color: activeFilter === option.id ? 'white' : '#2D2D2D',
                boxShadow: activeFilter === option.id 
                  ? '0 4px 12px rgba(196, 69, 105, 0.4)'
                  : '0 2px 4px rgba(0,0,0,0.05)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StandardCakesGrid() {
  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'Classic': 'linear-gradient(135deg, #FFE5E5 0%, #FFF5F5 100%)',
      'Premium': 'linear-gradient(135deg, #F3E5FF 0%, #FAF0FF 100%)',
      'Fruity': 'linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 100%)',
      'Signature': 'linear-gradient(135deg, #FFF9E5 0%, #FFFEF5 100%)',
      'Chocolate': 'linear-gradient(135deg, #F5E5D5 0%, #FFF5ED 100%)'
    };
    return gradients[category] || gradients['Classic'];
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display', color: '#2D2D2D' }}
          >
            Our Signature Cakes
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6B6B6B', fontFamily: 'Open Sans' }}
          >
            Each cake is handcrafted with premium ingredients and European techniques
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {standardCakes.map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -8 }}
            >
              {/* Larger Image Placeholder */}
              <div 
                className="relative w-full h-72 overflow-hidden"
                style={{ background: getCategoryGradient(cake.category || '') }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl opacity-40">
                    {cake.category === 'Chocolate' ? '🍫' : cake.category === 'Fruity' ? '🍓' : '🎂'}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span 
                    className="px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#C44569',
                      fontFamily: 'Poppins',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {cake.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Compact Content */}
              <div className="p-5">
                <h3 
                  className="text-xl font-bold mb-2 group-hover:text-[#C44569] transition-colors"
                  style={{ fontFamily: 'Poppins', color: '#2D2D2D' }}
                >
                  {cake.name}
                </h3>

                <p 
                  className="text-sm mb-3 line-clamp-2"
                  style={{ color: '#6B6B6B', fontFamily: 'Open Sans', lineHeight: 1.5 }}
                >
                  {cake.description}
                </p>

                <div 
                  className="p-3 rounded-lg mb-3"
                  style={{ background: '#F8EBD7' }}
                >
                  <p className="text-xs font-semibold mb-1" style={{ color: '#2D2D2D', fontFamily: 'Poppins' }}>
                    Includes:
                  </p>
                  {cake.layers.slice(0, 2).map((layer, i) => (
                    <p key={i} className="text-xs mb-1" style={{ color: '#6B6B6B', fontFamily: 'Open Sans' }}>
                      • {layer.flavor} / {layer.fillings.join(', ')}
                    </p>
                  ))}
                  {cake.layers.length > 2 && (
                    <p className="text-xs" style={{ color: '#6B6B6B', fontFamily: 'Open Sans' }}>
                      + {cake.layers.length - 2} more layer{cake.layers.length > 3 ? 's' : ''}
                    </p>
                  )}
                </div>

                <div>
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: '#C44569', fontFamily: 'Poppins' }}
                  >
                    ${cake.basePrice}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: '#9B9B9B', fontFamily: 'Open Sans' }}
                  >
                    starting price
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CakeFlavorsGrid() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display', color: '#2D2D2D' }}
          >
            Cake Flavors
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6B6B6B', fontFamily: 'Open Sans' }}
          >
            Choose from our selection of premium cake flavors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cakeFlavors.map((flavor, index) => (
            <motion.div
              key={flavor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ y: -5 }}
            >
              <div 
                className="w-full h-56 rounded-xl mb-5 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FFE5E5 0%, #FFF5F5 100%)' }}
              >
                <div className="text-8xl opacity-50">🎂</div>
              </div>

              <h3 
                className="text-2xl font-bold text-center group-hover:text-[#C44569] transition-colors"
                style={{ fontFamily: 'Poppins', color: '#2D2D2D' }}
              >
                {flavor.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FillingsGrid() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display', color: '#2D2D2D' }}
          >
            Filling Options
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6B6B6B', fontFamily: 'Open Sans' }}
          >
            Choose up to 2 fillings per layer for the perfect flavor combination
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fillingFlavors.map((filling, index) => (
            <motion.div
              key={filling.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
            >
              <div 
                className="w-full h-48 rounded-xl mb-4 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #F5E5D5 0%, #FFF5ED 100%)' }}
              >
                <div className="text-7xl opacity-50">🍫</div>
              </div>

              <h3 
                className="text-lg font-bold text-center group-hover:text-[#C44569] transition-colors"
                style={{ 
                  fontFamily: 'Poppins', 
                  color: '#2D2D2D',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {filling.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function IcingTypesGrid() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display', color: '#2D2D2D' }}
          >
            Icing Types
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6B6B6B', fontFamily: 'Open Sans' }}
          >
            Select your preferred icing style for the perfect finish
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {icingFlavors.map((icing, index) => (
            <motion.div
              key={icing.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ y: -5 }}
            >
              <div 
                className="w-full h-56 rounded-xl mb-5 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #F3E5FF 0%, #FAF0FF 100%)' }}
              >
                <div className="text-8xl opacity-50">🧁</div>
              </div>

              <h3 
                className="text-2xl font-bold text-center group-hover:text-[#C44569] transition-colors"
                style={{ fontFamily: 'Poppins', color: '#2D2D2D' }}
              >
                {icing.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function IcingColorsGrid() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display', color: '#2D2D2D' }}
          >
            Icing & Writing Colors
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6B6B6B', fontFamily: 'Open Sans' }}
          >
            Choose from {icingColors.length} beautiful colors for your icing and custom writing
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4">
          {icingColors.map((color, index) => (
            <motion.div
              key={color.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
              className="group"
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-white rounded-xl p-2 shadow-md hover:shadow-xl transition-all">
                <div 
                  className="w-full aspect-square rounded-lg mb-2 border-2 border-white shadow-md cursor-pointer"
                  style={{ 
                    backgroundColor: color.hex,
                    boxShadow: `0 4px 8px ${color.hex}30`
                  }}
                  title={`${color.name} - ${color.hex}`}
                />

                <div className="text-center">
                  <p 
                    className="text-xs font-semibold line-clamp-2"
                    style={{ 
                      fontFamily: 'Poppins',
                      color: '#2D2D2D',
                      minHeight: '32px'
                    }}
                  >
                    {color.name}
                  </p>
                  <p 
                    className="text-xs font-mono mt-1"
                    style={{ color: '#9B9B9B' }}
                  >
                    {color.hex}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function DecorationsGrid() {
  const decorationIcons: Record<string, string> = {
    'buttercream-flowers': '🌸',
    'fondant-decorations': '🎨',
    'silk-flowers-iris': '🌺',
    'silk-flowers-rose': '🌹',
    'silk-flowers-daisy': '🌼',
    'silk-flowers-lily': '💐',
    'silk-butterflies': '🦋',
    'edible-photo': '📸',
    'toys-trains': '🚂',
    'toys-dinosaurs': '🦕',
    'toys-race-cars': '🏎️',
    'plastic-sports': '⚽',
    'plastic-graduation': '🎓',
    'plastic-baby': '👶',
    'paper-parasols': '☂️',
    'plastic-flamingos': '🦩',
    'plastic-mermaids': '🧜',
    'plastic-seashells': '🐚',
    'flags': '🚩',
    'ribbons': '🎀',
    'plastic-trees': '🌲',
    'plastic-animals': '🦁',
    'plastic-camping': '🏕️',
    'rock-candy': '🍬',
    'plastic-star-explosion': '⭐'
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display', color: '#2D2D2D' }}
          >
            Decoration Options
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6B6B6B', fontFamily: 'Open Sans' }}
          >
            Add the perfect finishing touch with our wide selection of decorations
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {decorations.map((deco, index) => (
            <motion.div
              key={deco.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all"
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <div className="text-center">
                <motion.div 
                  className="text-7xl mb-4"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {decorationIcons[deco.id] || '🎀'}
                </motion.div>

                <h3 
                  className="text-sm font-bold group-hover:text-[#C44569] transition-colors"
                  style={{ 
                    fontFamily: 'Poppins',
                    color: '#2D2D2D',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {deco.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ContactCTA() {
  return (
    <section 
      className="relative text-white py-24 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #C44569 0%, #8B3A5E 50%, #6B2D4F 100%)',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-md rounded-full mb-8 border-4 border-white/30"
          >
            <Cake size={56} strokeWidth={2} />
          </motion.div>

          <h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: 'Playfair Display', lineHeight: 1.2 }}
          >
            Ready to Order Your Perfect Cake?
          </h2>

          <p 
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
            style={{ 
              fontFamily: 'Poppins',
              opacity: 0.95,
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            Call or email us today to discuss your custom cake
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.a 
              href="tel:713-555-2253"
              className="group inline-flex items-center justify-center gap-3 bg-white px-10 py-5 rounded-2xl font-bold text-lg transition-all"
              style={{
                color: '#C44569',
                fontFamily: 'Poppins',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={24} className="group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <div className="text-xs opacity-60">Call Us Now</div>
                <div>(713) 555-CAKE</div>
              </div>
            </motion.a>

            <motion.a 
              href="mailto:orders@emilybakescakes.com"
              className="group inline-flex items-center justify-center gap-3 bg-white px-10 py-5 rounded-2xl font-bold text-lg transition-all"
              style={{
                color: '#C44569',
                fontFamily: 'Poppins',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={24} className="group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs opacity-60">Email Us</div>
                <div>orders@emilybakescakes.com</div>
              </div>
            </motion.a>
          </div>

          <div 
            className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm pt-8 border-t border-white/20"
            style={{ fontFamily: 'Open Sans', opacity: 0.9 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <span>2847 Westheimer Road, Houston, TX 77098</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏰</span>
              <span>Mon-Sat: 9AM - 6PM</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('standard-cakes');

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <MenuHero />
      <FilterNavigation activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeFilter === 'standard-cakes' && <StandardCakesGrid />}
          {activeFilter === 'cake-flavors' && <CakeFlavorsGrid />}
          {activeFilter === 'fillings' && <FillingsGrid />}
          {activeFilter === 'icing-types' && <IcingTypesGrid />}
          {activeFilter === 'icing-colors' && <IcingColorsGrid />}
          {activeFilter === 'decorations' && <DecorationsGrid />}
        </motion.div>
      </AnimatePresence>

      <ContactCTA />
    </div>
  );
}

export { Menu };
