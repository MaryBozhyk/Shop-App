import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator.service';

export const GeneratorServiceN = new InjectionToken<number>('GeneratorServiceN');

export function GeneratorFactory(take: number) {
  return (data: GeneratorService): string =>
    data.generateCombination(take);
}
