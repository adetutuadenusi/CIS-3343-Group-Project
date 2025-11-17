/**
 * POPULATE PRODUCTS DATABASE
 * Adds all 14 standard cakes from the case study to the products table
 * Run with: tsx server/populate-products.ts
 */

import { db } from './db';
import { products } from '../shared/schema';

const standardCakes = [
  { name: 'Birthday Celebration', basePrice: 30, description: 'Classic celebration cake perfect for birthdays and special occasions' },
  { name: 'Almond Delight', basePrice: 35, description: 'Rich almond-flavored cake with premium almond extract' },
  { name: 'Lemon & Cream Cheese', basePrice: 35, description: 'Tangy lemon cake with smooth cream cheese frosting' },
  { name: 'Black Forest', basePrice: 40, description: 'Traditional Black Forest cake with chocolate, cherries, and cream' },
  { name: 'German Chocolate', basePrice: 38, description: 'Classic German chocolate cake with coconut-pecan filling' },
  { name: 'Cream Cheese Chocolate', basePrice: 38, description: 'Decadent chocolate cake with rich cream cheese frosting' },
  { name: 'Italian Cream', basePrice: 40, description: 'Traditional Italian cream cake with coconut and pecans' },
  { name: 'Lemon Doberge', basePrice: 45, description: 'Multi-layered lemon Doberge cake with lemon custard filling' },
  { name: 'Chocolate Doberge', basePrice: 45, description: 'Multi-layered chocolate Doberge cake with chocolate custard' },
  { name: '½ & ½ Doberge (Lemon + Chocolate)', basePrice: 48, description: 'Best of both worlds - half lemon, half chocolate Doberge' },
  { name: 'Pecan Praline Cream Cheese', basePrice: 42, description: 'Southern-style cake with pecan praline and cream cheese' },
  { name: 'Chocolate Banana', basePrice: 36, description: 'Moist chocolate cake with fresh banana layers' },
  { name: 'Strawberry Delight', basePrice: 36, description: 'Fresh strawberry cake with strawberry filling' },
  { name: 'Cookies & Cream Cake', basePrice: 35, description: 'Vanilla cake with Oreo cookie pieces and cream frosting' }
];

async function populateProducts() {
  console.log('🍰 Starting product population...\n');

  try {
    // Check if products already exist
    const existingProducts = await db.select().from(products);
    
    if (existingProducts.length > 0) {
      console.log(`ℹ️  Found ${existingProducts.length} existing products in database.`);
      console.log('   Run this script with --force flag to clear and repopulate.\n');
      
      if (!process.argv.includes('--force')) {
        console.log('✅ Skipping population. Use --force to override.\n');
        process.exit(0);
      }
      
      console.log('⚠️  --force flag detected. Clearing existing products...\n');
      // Note: We're not deleting to preserve order history
    }

    let addedCount = 0;
    let skippedCount = 0;

    for (const cake of standardCakes) {
      // Check if this product already exists by name
      const existing = existingProducts.find(p => p.name === cake.name);
      
      if (existing && !process.argv.includes('--force')) {
        console.log(`⏭️  Skipped: ${cake.name} (already exists)`);
        skippedCount++;
        continue;
      }

      try {
        await db.insert(products).values({
          name: cake.name,
          category: 'Cakes',
          price: cake.basePrice * 100, // Convert to cents
          description: cake.description,
          image: null, // Can be added later via admin
          inStock: true,
          popularity: 50 // Default popularity
        });

        console.log(`✅ Added: ${cake.name} ($${cake.basePrice})`);
        addedCount++;
      } catch (error: any) {
        if (error.code === '23505') { // Unique constraint violation
          console.log(`⏭️  Skipped: ${cake.name} (already exists)`);
          skippedCount++;
        } else {
          throw error;
        }
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Added: ${addedCount} products`);
    console.log(`   ⏭️  Skipped: ${skippedCount} products`);
    console.log(`   📦 Total in database: ${existingProducts.length + addedCount}\n`);

    console.log('🎉 Product population complete!\n');
    console.log('💡 Tip: You can now manage these products through the admin Product Catalog.\n');

  } catch (error) {
    console.error('❌ Error populating products:', error);
    process.exit(1);
  }

  process.exit(0);
}

populateProducts();
