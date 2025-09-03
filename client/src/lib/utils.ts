import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function convertFieldSize(size: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) return size
  
  // Convert to hectares first
  const hectares = fromUnit === 'acre' ? size * 0.404686 : size
  
  // Convert to target unit
  return toUnit === 'acre' ? hectares / 0.404686 : hectares
}