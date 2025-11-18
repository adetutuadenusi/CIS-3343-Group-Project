import { motion } from 'motion/react';
import { Phone, Mail, Cake, Heart } from 'lucide-react';
import { 
  standardCakes, 
  cakeFlavors, 
  fillingFlavors, 
  icingFlavors, 
  icingColors, 
  decorations 
} from '../../data/cakeOptions';

function MenuHero() {
  return (
    <section 
      className="text-white py-20 text-center"
      style={{ 
        background: 'linear-gradient(135deg, #C44569 0%, #8B3A5E 100%)',
        boxShadow: '0 4px 20px rgba(196, 69, 105, 0.3)'
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display' }}
          >
            Our Menu
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8"
            style={{ fontFamily: 'Poppins', opacity: 0.95 }}
          >
            Custom European-Style Cakes Made with Love
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:713-555-2253" 
              className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105"
              style={{
                color: '#C44569',
                fontFamily: 'Poppins',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <Phone size={20} />
              Call (713) 555-CAKE
            </a>
            <a 
              href="mailto:orders@emilybakescakes.com"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold transition-all hover:bg-white"
              style={{
                fontFamily: 'Poppins',
                color: 'inherit'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#C44569'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              <Mail size={20} />
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function getCakeEmoji(category: string) {
  const emojiMap: Record<string, string> = {
    'Classic': '🎂',
    'Premium': '🍰',
    'Fruity': '🍓',
    'Signature': '✨',
    'Chocolate': '🍫'
  };
  return emojiMap[category] || '🎂';
}

function StandardCakesSection() {
  return (
    <section className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 
          className="text-4xl font-bold text-center mb-4"
          style={{ fontFamily: 'Playfair Display', color: 'var(--text-primary)' }}
        >
          Standard Cakes
        </h2>
        <p 
          className="text-center mb-12 max-w-2xl mx-auto"
          style={{ 
            color: 'var(--text-secondary)', 
            fontFamily: 'Open Sans',
            fontSize: '16px'
          }}
        >
          Choose from our signature collection of European-style cakes
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {standardCakes.map((cake, index) => (
            <motion.div 
              key={cake.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-white rounded-lg border-2 hover:shadow-lg transition-all p-6"
              style={{ 
                borderColor: '#E8D5C4',
                background: 'var(--surface-elevated)'
              }}
              whileHover={{ 
                borderColor: '#C44569',
                y: -5 
              }}
            >
              <div className="text-5xl text-center mb-4">
                {getCakeEmoji(cake.category || '')}
              </div>
              
              <h3 
                className="text-xl font-bold text-center mb-2"
                style={{ 
                  fontFamily: 'Poppins',
                  color: 'var(--text-primary)' 
                }}
              >
                {cake.name}
              </h3>
              
              <div className="text-center mb-3">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-sm"
                  style={{
                    background: 'rgba(196, 69, 105, 0.1)',
                    color: '#C44569',
                    fontFamily: 'Poppins',
                    fontWeight: 500
                  }}
                >
                  {cake.category}
                </span>
              </div>
              
              <p 
                className="text-sm text-center mb-4"
                style={{ 
                  color: 'var(--text-secondary)',
                  fontFamily: 'Open Sans',
                  lineHeight: 1.5
                }}
              >
                {cake.description}
              </p>
              
              <div 
                className="p-3 rounded text-xs mb-4"
                style={{
                  background: '#F8EBD7',
                  fontFamily: 'Open Sans'
                }}
              >
                <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Includes:
                </p>
                {cake.layers.map((layer, i) => (
                  <p key={i} style={{ color: 'var(--text-secondary)' }}>
                    • Layer {i + 1}: {layer.flavor} / {layer.fillings.join(', ')}
                  </p>
                ))}
              </div>
              
              <div className="text-center">
                <p 
                  className="text-2xl font-bold"
                  style={{ 
                    color: '#C44569',
                    fontFamily: 'Poppins'
                  }}
                >
                  Starting at ${cake.basePrice}
                </p>
                <p 
                  className="text-xs mt-1"
                  style={{ 
                    color: 'var(--text-tertiary)',
                    fontFamily: 'Open Sans'
                  }}
                >
                  + size and customizations
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CustomizationOptionsSection() {
  return (
    <section 
      className="py-16"
      style={{ background: '#F8EBD7' }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            className="text-4xl font-bold text-center mb-12"
            style={{ fontFamily: 'Playfair Display', color: 'var(--text-primary)' }}
          >
            Customize Your Perfect Cake
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-lg p-6 shadow-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🎂</span>
                <h3 
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Poppins', color: 'var(--text-primary)' }}
                >
                  Cake Flavors
                </h3>
              </div>
              <ul className="space-y-2">
                {cakeFlavors.map((flavor) => (
                  <li 
                    key={flavor.id} 
                    className="flex items-center gap-2"
                    style={{ fontFamily: 'Open Sans', color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: '#22C55E' }}>✓</span>
                    <span>{flavor.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg p-6 shadow-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🍫</span>
                <h3 
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Poppins', color: 'var(--text-primary)' }}
                >
                  Fillings
                </h3>
              </div>
              <p 
                className="text-sm mb-3"
                style={{ color: 'var(--text-secondary)', fontFamily: 'Open Sans' }}
              >
                Choose up to 2 per layer
              </p>
              <ul className="space-y-2">
                {fillingFlavors.map((filling) => (
                  <li 
                    key={filling.id} 
                    className="flex items-center gap-2"
                    style={{ fontFamily: 'Open Sans', color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: '#22C55E' }}>✓</span>
                    <span className="text-sm">{filling.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg p-6 shadow-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🧁</span>
                <h3 
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Poppins', color: 'var(--text-primary)' }}
                >
                  Icing Flavors
                </h3>
              </div>
              <ul className="space-y-2">
                {icingFlavors.map((icing) => (
                  <li 
                    key={icing.id} 
                    className="flex items-center gap-2"
                    style={{ fontFamily: 'Open Sans', color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: '#22C55E' }}>✓</span>
                    <span>{icing.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IcingColorsSection() {
  return (
    <section className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 
          className="text-4xl font-bold text-center mb-4"
          style={{ fontFamily: 'Playfair Display', color: 'var(--text-primary)' }}
        >
          Icing & Writing Colors
        </h2>
        <p 
          className="text-center mb-12"
          style={{ 
            color: 'var(--text-secondary)',
            fontFamily: 'Open Sans',
            fontSize: '16px'
          }}
        >
          Choose from {icingColors.length} vibrant colors
        </p>
        
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
          {icingColors.map((color, index) => (
            <motion.div 
              key={color.id} 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
            >
              <div 
                className="w-16 h-16 rounded-lg border-2 mx-auto mb-2 shadow-sm transition-all cursor-pointer"
                style={{ 
                  backgroundColor: color.hex,
                  borderColor: '#E8D5C4'
                }}
                title={color.name}
              />
              <p 
                className="text-xs font-medium"
                style={{ 
                  fontFamily: 'Open Sans',
                  color: 'var(--text-secondary)'
                }}
              >
                {color.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function DecorationsSection() {
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
    <section 
      className="py-16"
      style={{ background: '#F8EBD7' }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            className="text-4xl font-bold text-center mb-12"
            style={{ fontFamily: 'Playfair Display', color: 'var(--text-primary)' }}
          >
            Decoration Options
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {decorations.map((deco, index) => (
              <motion.div 
                key={deco.id}
                className="bg-white rounded-lg p-4 text-center shadow-sm transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 8px 16px rgba(196, 69, 105, 0.2)'
                }}
              >
                <div className="text-4xl mb-2">
                  {decorationIcons[deco.id] || '🎀'}
                </div>
                <p 
                  className="text-sm font-medium mb-1"
                  style={{ 
                    fontFamily: 'Poppins',
                    color: 'var(--text-primary)',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {deco.name}
                </p>
                <p 
                  className="text-xs font-semibold"
                  style={{ 
                    color: '#C44569',
                    fontFamily: 'Poppins'
                  }}
                >
                  Available
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section 
      className="text-white py-20 text-center"
      style={{ 
        background: 'linear-gradient(135deg, #C44569 0%, #8B3A5E 100%)',
        boxShadow: '0 -4px 20px rgba(196, 69, 105, 0.3)'
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <Cake size={48} strokeWidth={1.5} />
          </div>
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display' }}
          >
            Ready to Order Your Perfect Cake?
          </h2>
          <p 
            className="text-xl mb-8"
            style={{ 
              fontFamily: 'Poppins',
              opacity: 0.95
            }}
          >
            Call or email us to customize your dream cake today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="tel:713-555-2253"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
              style={{
                color: '#C44569',
                fontFamily: 'Poppins',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <Phone size={20} />
              (713) 555-CAKE
            </a>
            <a 
              href="mailto:orders@emilybakescakes.com"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
              style={{
                color: '#C44569',
                fontFamily: 'Poppins',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <Mail size={20} />
              orders@emilybakescakes.com
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm" style={{ opacity: 0.9 }}>
            <p style={{ fontFamily: 'Open Sans' }}>
              📍 2847 Westheimer Road, Houston, TX 77098
            </p>
            <span>|</span>
            <p style={{ fontFamily: 'Open Sans' }}>
              ⏰ Mon-Sat: 9AM - 6PM
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Menu() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <MenuHero />
      <StandardCakesSection />
      <CustomizationOptionsSection />
      <IcingColorsSection />
      <DecorationsSection />
      <ContactCTA />
    </div>
  );
}

export { Menu };
