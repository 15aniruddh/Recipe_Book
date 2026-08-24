import { Injectable } from '@angular/core';

const STORAGE_KEY = 'recipeSearchHistory';
const MAX_ENTRIES = 5;

@Injectable({ providedIn: 'root' })
export class SearchHistoryService {
  private history: string[] = this.load();

  add(term: string) {
    const trimmed = term.trim();
    if (!trimmed) {
      return;
    }
    this.history = [
      trimmed,
      ...this.history.filter((t) => t.toLowerCase() !== trimmed.toLowerCase()),
    ].slice(0, MAX_ENTRIES);
    this.save();
  }

  list(): string[] {
    return [...this.history];
  }

  private load(): string[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
  }
}
