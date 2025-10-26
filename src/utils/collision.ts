import { CanvasElement } from '@/types/game';

interface ElementDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Check if two elements are colliding based on bounding box overlap
 * Returns true if overlap is >10% of smaller element
 */
export function checkCollision(
  el1: ElementDimensions,
  el2: ElementDimensions
): boolean {
  // Calculate overlap in x direction
  const xOverlapStart = Math.max(el1.x, el2.x);
  const xOverlapEnd = Math.min(el1.x + el1.width, el2.x + el2.width);
  const xOverlap = Math.max(0, xOverlapEnd - xOverlapStart);

  // Calculate overlap in y direction
  const yOverlapStart = Math.max(el1.y, el2.y);
  const yOverlapEnd = Math.min(el1.y + el1.height, el2.y + el2.height);
  const yOverlap = Math.max(0, yOverlapEnd - yOverlapStart);

  // No overlap
  if (xOverlap === 0 || yOverlap === 0) {
    return false;
  }

  // Calculate overlap area
  const overlapArea = xOverlap * yOverlap;

  // Calculate areas of both elements
  const el1Area = el1.width * el1.height;
  const el2Area = el2.width * el2.height;

  // Get smaller element area
  const smallerArea = Math.min(el1Area, el2Area);

  // Check if overlap is >50% of smaller element
  const overlapPercentage = overlapArea / smallerArea;

  return overlapPercentage > 0.5;
}

/**
 * Calculate midpoint between two elements
 */
export function getMidpoint(
  el1: { x: number; y: number },
  el2: { x: number; y: number }
): { x: number; y: number } {
  return {
    x: (el1.x + el2.x) / 2,
    y: (el1.y + el2.y) / 2,
  };
}
