import { Injectable } from '@angular/core';

const STORAGE_KEY = 'favouriteRecipes';

// Pre-favourited demo recipes shown until the user changes their favourites.
const DEFAULT_FAVOURITES = ['Pancakes', 'Spaghetti Bolognese', 'Sushi'];

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private favourites = new Set<string>(this.load());

  isFavourite(name: string): boolean {
    return this.favourites.has(name);
  }

  toggle(name: string): boolean {
    if (this.favourites.has(name)) {
      this.favourites.delete(name);
    } else {
      this.favourites.add(name);
    }
    this.save();
    return this.favourites.has(name);
  }

  list(): string[] {
    return [...this.favourites];
  }

  private load(): string[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return [...DEFAULT_FAVOURITES];
    }
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.favourites]));
  }
}
