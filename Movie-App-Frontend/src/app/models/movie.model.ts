export interface Movie {
  id: number;
  name: string;
  imgURL: string;
  date: string;
  rate: number;
  description: string;
  isRecommended: boolean;
  duration?: string;
  language?: string;
  watches?: number;
  category?: string | string[];
  categories?: string[];
  watchRate?: number;
}