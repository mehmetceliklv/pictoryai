import { Timestamp } from 'firebase/firestore';

// User and Subscription Types
export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete';

export interface SubscriptionInfo {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodEnd: Timestamp;
  customerId: string; // Stripe customer ID
  subscriptionId?: string; // Stripe subscription ID
}

export interface UsageInfo {
  imagesGenerated: number;
  videosGenerated: number;
  storageUsed: number; // in MB
  lastReset: Timestamp;
}

export interface BrandKit {
  logo?: string;
  colors: string[];
  fonts: string[];
  templates: string[];
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  subscription: SubscriptionInfo;
  usage: UsageInfo;
  brandKit: BrandKit;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Project and Asset Types
export type AssetType = 'image' | 'video';
export type AssetStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface AssetSettings {
  model: string;
  style?: string;
  aspectRatio: string;
  resolution: string;
  duration?: number; // for videos
  fps?: number; // for videos
}

export interface AssetUrls {
  original: string;
  thumbnail: string;
  watermarked?: string;
}

export interface AssetMetadata {
  fileSize: number;
  duration?: number; // for videos
  dimensions: { width: number; height: number };
  format: string;
}

export interface Asset {
  id: string;
  projectId: string;
  userId: string;
  type: AssetType;
  prompt: string;
  settings: AssetSettings;
  status: AssetStatus;
  urls: AssetUrls;
  metadata: AssetMetadata;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: AssetType;
  assets: string[]; // Asset IDs
  collaborators: string[]; // User IDs
  isPublic: boolean;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Organization Types
export type OrganizationRole = 'owner' | 'admin' | 'member';
export type OrganizationPlan = 'team' | 'enterprise';

export interface OrganizationMember {
  userId: string;
  role: OrganizationRole;
  joinedAt: Timestamp;
}

export interface OrganizationSubscription {
  plan: OrganizationPlan;
  seats: number;
  usage: {
    totalImages: number;
    totalVideos: number;
    totalStorage: number;
  };
}

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  members: OrganizationMember[];
  subscription: OrganizationSubscription;
  brandKit: BrandKit;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Generation Job Types
export type JobType = 'image' | 'video';
export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface GenerationJob {
  id: string;
  userId: string;
  type: JobType;
  priority: number; // based on subscription tier
  payload: Record<string, unknown>;
  retryCount: number;
  status: JobStatus;
  result?: string; // URL to generated content
  error?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Subscription Plan Configuration
export interface PlanFeatures {
  imagesPerMonth: number;
  videosPerMonth: number;
  storageGB: number;
  priority: boolean;
  teamMembers: number;
  apiAccess: boolean;
  commercialRights: boolean;
  customBranding: boolean;
  advancedModels: boolean;
}

export interface SubscriptionPlanConfig {
  id: SubscriptionPlan;
  name: string;
  price: number; // in cents
  interval: 'month' | 'year';
  features: PlanFeatures;
  popular?: boolean;
  stripePriceId: string;
}

// AI Service Types
export interface ImageGenerationRequest {
  prompt: string;
  negativePrompt?: string;
  model: string;
  style?: string;
  aspectRatio: string;
  resolution: string;
  seed?: number;
  steps?: number;
  guidance?: number;
}

export interface VideoGenerationRequest {
  prompt: string;
  image?: string; // for image-to-video
  duration: number;
  fps: number;
  resolution: string;
  model: string;
}

// UI State Types
export interface UIState {
  isLoading: boolean;
  error: string | null;
  selectedAssets: string[];
  viewMode: 'grid' | 'list';
  filters: {
    type?: AssetType;
    status?: AssetStatus;
    dateRange?: { start: Date; end: Date };
    tags?: string[];
  };
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form Types
export interface SignUpForm {
  email: string;
  password: string;
  displayName: string;
  agreeToTerms: boolean;
}

export interface SignInForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ProjectForm {
  name: string;
  description?: string;
  type: AssetType;
  isPublic: boolean;
  tags: string[];
}

export interface BrandKitForm {
  logo?: File;
  colors: string[];
  fonts: string[];
}

// Webhook Types (for Stripe)
export interface StripeWebhookPayload {
  id: string;
  object: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Analytics Types
export interface UsageAnalytics {
  period: 'day' | 'week' | 'month' | 'year';
  imagesGenerated: number;
  videosGenerated: number;
  storageUsed: number;
  apiCalls: number;
  breakdown: {
    date: string;
    images: number;
    videos: number;
    storage: number;
  }[];
}

// Export all types
export type { Timestamp };