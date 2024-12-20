import type { Range } from '../types';

export const randRangeInt = (min: number, max: number): number => {
  const randomValue = Math.random() * (max - min + 1) + min;
  return Math.floor(randomValue);
};

export const randRangeFloat = (min: number, max: number): number => {
  const randomValue = Math.random() * (max - min) + min;
  return randomValue;
};

export const mapRange = (value: number, [inMin, inMax]: Range<number>, [outMin, outMax]: Range<number>) => {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}