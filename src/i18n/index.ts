import { es, type Dictionary } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';
export type { Dictionary };

export const dictionaries: Record<Lang, Dictionary> = { es, en };
export const languages: Lang[] = ['es', 'en'];
