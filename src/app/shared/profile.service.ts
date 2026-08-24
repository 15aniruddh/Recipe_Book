import { Injectable } from '@angular/core';

const ABOUT_KEY = 'profileAbout';
const LIKES_KEY = 'profileLikes';

const DEFAULT_ABOUT =
  "Combining data, design, and machine learning to build intelligent products and services that improve people's lives.";
const DEFAULT_LIKES = [
  'Yam',
  'Ground Nut',
  'Sausage',
  'Excercise',
  'Giving',
  'Artificial Intelligence',
];

@Injectable({ providedIn: 'root' })
export class ProfileService {
  getAbout(): string {
    return localStorage.getItem(ABOUT_KEY) ?? DEFAULT_ABOUT;
  }

  setAbout(text: string) {
    localStorage.setItem(ABOUT_KEY, text);
  }

  getLikes(): string[] {
    try {
      const raw = localStorage.getItem(LIKES_KEY);
      return raw ? JSON.parse(raw) : [...DEFAULT_LIKES];
    } catch {
      return [...DEFAULT_LIKES];
    }
  }

  setLikes(likes: string[]) {
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  }
}
