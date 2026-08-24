import { Injectable } from '@angular/core';

const STORAGE_KEY = 'recipeRatings';

// Demo star ratings shown until the user rates recipes themselves.
const DEFAULT_RATINGS: { [name: string]: number } = {
  Pancakes: 5,
  'Beef pho': 4,
  Lasagne: 5,
  Sushi: 4,
};

@Injectable({ providedIn: 'root' })
export class RatingService {
  private ratings: { [name: string]: number } = this.load();

  getRating(name: string): number {
    return this.ratings[name] || 0;
  }

  setRating(name: string, stars: number) {
    this.ratings[name] = stars;
    this.save();
  }

  private load(): { [name: string]: number } {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return { ...DEFAULT_RATINGS };
    }
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ratings));
  }
}
