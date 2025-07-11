import { SubscriptionPlanConfig } from '@/types';

export const SUBSCRIPTION_PLANS: SubscriptionPlanConfig[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    stripePriceId: '', // No Stripe price ID for free plan
    features: {
      imagesPerMonth: 10,
      videosPerMonth: 3,
      storageGB: 1,
      priority: false,
      teamMembers: 1,
      apiAccess: false,
      commercialRights: false,
      customBranding: false,
      advancedModels: false,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2900, // $29/month
    interval: 'month',
    stripePriceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 'price_pro_monthly',
    popular: true,
    features: {
      imagesPerMonth: 500,
      videosPerMonth: 50,
      storageGB: 25,
      priority: true,
      teamMembers: 3,
      apiAccess: true,
      commercialRights: true,
      customBranding: false,
      advancedModels: true,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 9900, // $99/month
    interval: 'month',
    stripePriceId: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || 'price_enterprise_monthly',
    features: {
      imagesPerMonth: 2000,
      videosPerMonth: 200,
      storageGB: 100,
      priority: true,
      teamMembers: 10,
      apiAccess: true,
      commercialRights: true,
      customBranding: true,
      advancedModels: true,
    },
  },
];

// Annual plans with 20% discount
export const ANNUAL_SUBSCRIPTION_PLANS: SubscriptionPlanConfig[] = [
  {
    id: 'pro',
    name: 'Pro',
    price: 27840, // $278.40/year (20% discount)
    interval: 'year',
    stripePriceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID || 'price_pro_yearly',
    popular: true,
    features: {
      imagesPerMonth: 500,
      videosPerMonth: 50,
      storageGB: 25,
      priority: true,
      teamMembers: 3,
      apiAccess: true,
      commercialRights: true,
      customBranding: false,
      advancedModels: true,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 95040, // $950.40/year (20% discount)
    interval: 'year',
    stripePriceId: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID || 'price_enterprise_yearly',
    features: {
      imagesPerMonth: 2000,
      videosPerMonth: 200,
      storageGB: 100,
      priority: true,
      teamMembers: 10,
      apiAccess: true,
      commercialRights: true,
      customBranding: true,
      advancedModels: true,
    },
  },
];

// Helper functions
export const getPlanById = (planId: string, interval: 'month' | 'year' = 'month') => {
  const plans = interval === 'year' ? ANNUAL_SUBSCRIPTION_PLANS : SUBSCRIPTION_PLANS;
  return plans.find(plan => plan.id === planId);
};

export const getPlanByPriceId = (priceId: string) => {
  const allPlans = [...SUBSCRIPTION_PLANS, ...ANNUAL_SUBSCRIPTION_PLANS];
  return allPlans.find(plan => plan.stripePriceId === priceId);
};

export const getUsageLimits = (planId: string) => {
  const plan = getPlanById(planId);
  if (!plan) return null;
  
  return {
    images: plan.features.imagesPerMonth,
    videos: plan.features.videosPerMonth,
    storage: plan.features.storageGB * 1024, // Convert to MB
  };
};

export const checkFeatureAccess = (planId: string, feature: keyof SubscriptionPlanConfig['features']) => {
  const plan = getPlanById(planId);
  return plan?.features[feature] || false;
};

// Pricing display helpers
export const formatPrice = (price: number, interval: 'month' | 'year') => {
  const formattedPrice = (price / 100).toFixed(2);
  return `$${formattedPrice}/${interval}`;
};

export const getDiscountAmount = (monthlyPrice: number, yearlyPrice: number) => {
  const annualEquivalent = monthlyPrice * 12;
  const discount = ((annualEquivalent - yearlyPrice) / annualEquivalent) * 100;
  return Math.round(discount);
};

// Feature comparison
export const FEATURE_DESCRIPTIONS = {
  imagesPerMonth: 'AI-generated images per month',
  videosPerMonth: 'AI-generated videos per month',
  storageGB: 'Cloud storage for your assets',
  priority: 'Priority processing queue',
  teamMembers: 'Team collaboration seats',
  apiAccess: 'Programmatic API access',
  commercialRights: 'Commercial usage rights',
  customBranding: 'Remove watermarks & branding',
  advancedModels: 'Access to latest AI models',
} as const;