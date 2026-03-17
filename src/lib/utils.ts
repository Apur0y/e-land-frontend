import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = '৳'): string {
  if (amount >= 10000000) return `${currency}${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `${currency}${(amount / 100000).toFixed(2)} L`;
  return `${currency}${amount.toLocaleString()}`;
}

export function formatArea(area: number, unit: string): string {
  return `${area.toLocaleString()} ${unit}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-brand-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
}

export function getScoreBg(score: number): string {
  if (score >= 80) return 'bg-brand-950 border-brand-900';
  if (score >= 60) return 'bg-yellow-950 border-yellow-900';
  if (score >= 40) return 'bg-orange-950 border-orange-900';
  return 'bg-red-950 border-red-900';
}

export function getRiskColor(level: string): string {
  const map: Record<string, string> = {
    low: 'text-brand-400',
    medium: 'text-yellow-400',
    high: 'text-orange-400',
    very_high: 'text-red-400',
  };
  return map[level?.toLowerCase()] || 'text-gray-400';
}

export function timeAgo(date: string | Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

export const LAND_TYPES = ['residential', 'commercial', 'agricultural', 'industrial', 'mixed', 'plot'] as const;
export const AREA_UNITS = ['katha', 'decimal', 'bigha', 'sqft', 'sqm', 'acre', 'hectare'] as const;
export const FACING_DIRECTIONS = ['north', 'south', 'east', 'west', 'north-east', 'north-west', 'south-east', 'south-west'] as const;
export const BD_DISTRICTS = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
  'Gazipur', 'Narayanganj', 'Comilla', "Cox's Bazar", 'Jessore', 'Bogra', 'Dinajpur',
  'Tangail', 'Faridpur', 'Pabna', 'Sirajganj', 'Narsingdi', 'Munshiganj', 'Manikganj',
  'Kishoreganj', 'Netrokona', 'Jamalpur', 'Sherpur', 'Sunamganj', 'Moulvibazar', 'Habiganj',
  'Noakhali', 'Feni', 'Lakshmipur', 'Chandpur', 'Brahmanbaria', 'Khagrachhari', 'Rangamati',
  'Bandarban', 'Chuadanga', 'Meherpur', 'Kushtia', 'Magura', 'Narail', 'Satkhira',
  'Bagerhat', 'Pirojpur', 'Jhalakathi', 'Barguna', 'Patuakhali', 'Bhola', 'Shariatpur',
  'Madaripur', 'Gopalganj', 'Rajbari', 'Natore', 'Naogaon', 'Chapainawabganj', 'Joypurhat',
  'Nawabganj', 'Thakurgaon', 'Panchagarh', 'Nilphamari', 'Lalmonirhat', 'Kurigram',
  'Gaibandha', 'Jaipurhat',
] as const;
