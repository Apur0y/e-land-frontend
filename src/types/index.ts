// ─── User Types ────────────────────────────────────────────
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'agent' | 'admin';
  plan: 'free' | 'pro' | 'enterprise';
  isVerified: boolean;
  isActive: boolean;
  aiCreditsUsed: number;
  aiCreditsLimit: number;
  savedProperties: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Land Types ────────────────────────────────────────────
export type LandType = 'residential' | 'commercial' | 'agricultural' | 'industrial' | 'mixed' | 'plot';
export type LandStatus = 'for_sale' | 'for_lease' | 'sold' | 'leased' | 'off_market';
export type AreaUnit = 'sqft' | 'sqm' | 'acre' | 'hectare' | 'katha' | 'bigha' | 'decimal';

export interface LandFeatures {
  roadAccess?: boolean;
  electricity?: boolean;
  water?: boolean;
  gas?: boolean;
  drainage?: boolean;
  wallBoundary?: boolean;
  cornerPlot?: boolean;
  facingDirection?: string;
  roadWidth?: number;
  floodZone?: boolean;
  nearGovtProject?: boolean;
}

export interface LandLocation {
  address: string;
  city: string;
  district: string;
  state?: string;
  country: string;
  zipCode?: string;
  coordinates?: { lat: number; lng: number };
}

export interface AIAnalysis {
  overallScore: number;
  investmentScore: number;
  riskScore: number;
  summary: string;
  strengths?: string[];
  weaknesses?: string[];
  riskFactors?: Array<{ factor: string; severity: 'low' | 'medium' | 'high'; description: string }>;
  priceProjection?: {
    currentFairValue: number;
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
  };
  annualAppreciation?: number;
  rentalYield?: number;
  constructionROI?: number;
  recommendations?: string[];
  bestUseCase?: string;
  nearbyInfrastructure?: string;
  governmentProjectImpact?: string;
  marketTrend?: 'bullish' | 'neutral' | 'bearish';
  liquidityScore?: number;
  verdict?: 'buy' | 'hold' | 'avoid';
  analyzedAt?: string;
}

export interface Land {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  pricePerSqft?: number;
  area: number;
  areaUnit: AreaUnit;
  location: LandLocation;
  landType: LandType;
  status: LandStatus;
  features: LandFeatures;
  images: Array<{ url: string; caption?: string; isPrimary: boolean }>;
  documents?: Array<{ name: string; url: string; type: string }>;
  aiAnalysis?: AIAnalysis;
  owner?: Partial<User>;
  agent?: Partial<User>;
  views: number;
  inquiries: number;
  isFeatured: boolean;
  isVerified: boolean;
  isActive: boolean;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Report Types ──────────────────────────────────────────
export type ReportType = 'full_analysis' | 'price_prediction' | 'risk_assessment' | 'comparison' | 'roi_calculator';

export interface Report {
  _id: string;
  user: string | User;
  land?: string | Land;
  type: ReportType;
  title: string;
  data: any;
  status: 'pending' | 'completed' | 'failed';
  aiModel: string;
  creditsUsed: number;
  createdAt: string;
}

// ─── Inquiry Types ─────────────────────────────────────────
export interface Inquiry {
  _id: string;
  land: string | Land;
  user?: string | User;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'buy' | 'lease' | 'info' | 'visit';
  status: 'new' | 'contacted' | 'closed';
  budget?: number;
  notes?: string;
  createdAt: string;
}

// ─── API Response Types ────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
