import type { Dictionary } from './dictionary';

export interface PricingTier {
  id: string;
  name: string;
  category: 'graphic' | 'vi' | 'ecommerce';
  popular?: boolean;
  priceWithoutAfterSales: number;
  priceWithAfterSales: number;
  features: (keyof Dictionary['pricing']['features'])[];
  deliveryDays: number;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'graphic-essential',
    name: 'Essential',
    category: 'graphic',
    priceWithoutAfterSales: 1200,
    priceWithAfterSales: 1600,
    features: ['research', 'concepts', 'moodboard', 'revisions', 'sourceFile', 'commercialUse'],
    deliveryDays: 5,
  },
  {
    id: 'graphic-professional',
    name: 'Professional',
    category: 'graphic',
    popular: true,
    priceWithoutAfterSales: 2800,
    priceWithAfterSales: 3600,
    features: ['research', 'concepts', 'moodboard', 'presentation', 'revisions', 'sourceFile', 'commercialUse', 'digitalAssets'],
    deliveryDays: 10,
  },
  {
    id: 'vi-essential',
    name: 'Essential',
    category: 'vi',
    priceWithoutAfterSales: 2500,
    priceWithAfterSales: 3200,
    features: ['research', 'concepts', 'moodboard', 'presentation', 'revisions', 'sourceFile', 'commercialUse'],
    deliveryDays: 7,
  },
  {
    id: 'vi-professional',
    name: 'Professional',
    category: 'vi',
    popular: true,
    priceWithoutAfterSales: 4800,
    priceWithAfterSales: 6000,
    features: ['research', 'concepts', 'moodboard', 'presentation', 'styleGuide', 'brandStrategy', 'revisions', 'sourceFile', 'commercialUse', 'extendedSupport'],
    deliveryDays: 14,
  },
  {
    id: 'ecommerce-essential',
    name: 'Essential',
    category: 'ecommerce',
    priceWithoutAfterSales: 1800,
    priceWithAfterSales: 2400,
    features: ['productMockups', 'storeSetup', 'productListing', 'revisions', 'sourceFile', 'commercialUse'],
    deliveryDays: 7,
  },
  {
    id: 'ecommerce-professional',
    name: 'Professional',
    category: 'ecommerce',
    popular: true,
    priceWithoutAfterSales: 4500,
    priceWithAfterSales: 5800,
    features: ['productMockups', 'storeSetup', 'productListing', 'marketingAssets', 'revisions', 'sourceFile', 'commercialUse', 'extendedSupport'],
    deliveryDays: 14,
  },
];
