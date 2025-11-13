export const flavors = [
  { id: 'vanilla', name: 'Classic Vanilla', price: 0, description: 'Timeless vanilla bean' },
  { id: 'chocolate', name: 'Rich Chocolate', price: 0, description: 'Premium dark chocolate' },
  { id: 'strawberry', name: 'Fresh Strawberry', price: 5, description: 'Real strawberry puree' },
  { id: 'almond', name: 'Almond Dream', price: 8, description: 'Premium almond extract' },
  { id: 'lemon', name: 'Lemon Zest', price: 5, description: 'Fresh lemon & vanilla' },
  { id: 'red-velvet', name: 'Red Velvet', price: 10, description: 'Southern classic' },
  { id: 'carrot', name: 'Carrot Spice', price: 8, description: 'Warm spices with cream cheese' },
  { id: 'funfetti', name: 'Funfetti', price: 5, description: 'Vanilla with rainbow sprinkles' }
];

export const fillings = [
  { id: 'vanilla-buttercream', name: 'Vanilla Buttercream', price: 1 },
  { id: 'chocolate-ganache', name: 'Chocolate Ganache', price: 1 },
  { id: 'strawberry-preserves', name: 'Strawberry Preserves', price: 1 },
  { id: 'raspberry-coulis', name: 'Raspberry Coulis', price: 1 },
  { id: 'lemon-curd', name: 'Lemon Curd', price: 1 },
  { id: 'cream-cheese', name: 'Cream Cheese Frosting', price: 1 },
  { id: 'caramel', name: 'Salted Caramel', price: 1 },
  { id: 'nutella', name: 'Nutella', price: 1 },
  { id: 'peanut-butter', name: 'Peanut Butter', price: 1 },
  { id: 'white-chocolate', name: 'White Chocolate', price: 1 }
];

export const pricingConstants = {
  basePrice: 50,
  perLayerPrice: 15,
  perFillingPrice: 1,
  maxFillingsPerLayer: 2,
  layerWarningThreshold: 20
};

export interface LayerData {
  id: string;
  flavor: string;
  fillings: string[];
  notes: string;
}

export function calculateTotalPrice(layers: LayerData[]): number {
  let total = pricingConstants.basePrice;
  
  layers.forEach(layer => {
    const flavorObj = flavors.find(f => f.id === layer.flavor);
    total += pricingConstants.perLayerPrice;
    total += flavorObj?.price || 0;
    total += layer.fillings.length * pricingConstants.perFillingPrice;
  });
  
  return total;
}
