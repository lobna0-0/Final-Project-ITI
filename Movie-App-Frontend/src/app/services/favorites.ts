import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class Favorites {
  private favorites = new Set<number>();
  private favoritesSubject = new BehaviorSubject<Set<number>>(new Set<number>());
  
  constructor() {
    this.loadFavoritesFromLocalStorage();
  }
  
  // Get favorites as an observable
  getFavorites(): Observable<Set<number>> {
    return this.favoritesSubject.asObservable();
  }
  
  // Toggle favorite status
  toggleFavorite(movieId: number): void {
    if (this.favorites.has(movieId)) {
      this.favorites.delete(movieId);
    } else {
      this.favorites.add(movieId);
    }
    
    this.saveFavoritesToLocalStorage();
    this.favoritesSubject.next(new Set(this.favorites));
  }
  
  // Check if a movie is a favorite
  isFavorite(movieId: number): boolean {
    return this.favorites.has(movieId);
  }
  
  // Save favorites to local storage
  private saveFavoritesToLocalStorage(): void {
    const favoritesArray = Array.from(this.favorites);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }
  
  // Load favorites from local storage
  private loadFavoritesFromLocalStorage(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favoritesArray = JSON.parse(storedFavorites) as number[];
      this.favorites = new Set<number>(favoritesArray);
      this.favoritesSubject.next(new Set(this.favorites));
    }
  }
}
