import { Component } from '@angular/core';
import { Movieslist } from '../services/movieslist';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie } from '../models/movie.model';
import { Favorites } from '../services/favorites';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchBar],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css',
})
export class MoviesList {
  listOfMovies: Movie[] = [];
  filteredMovies: Movie[] = [];
  paginatedMovies: Movie[] = [];
  favorites = new Set<number>();
  favoriteMovies: Movie[] = [];

  totalPages = 1;
  currentPage = 1;
  limit = 12;
  pageNumbers: number[] = [];
  currentQuery: string = '';

  constructor(
    private movServObj: Movieslist,
    private favoritesService: Favorites
  ) {}

  ngOnInit() {
    console.log('MoviesList component initialized');
    console.log('Current route:', window.location.pathname);
    
    // Subscribe to favorites changes
    this.favoritesService.getFavorites().subscribe((favorites) => {
      this.favorites = favorites;
      this.updateFavoriteMovies();
    });

    this.movServObj.getMovies().subscribe({
      next: (data) => {
        console.log('Raw API response:', data);
        console.log('Data type:', typeof data);
        console.log('Data length:', Array.isArray(data) ? data.length : 'Not an array');
        
        if (!Array.isArray(data)) {
          console.error('API did not return an array:', data);
          return;
        }
        
        this.listOfMovies = data.map((movie: any) => {
          console.log('Processing movie:', movie);
          const originalUrl: string = movie.imgURL || '';
          const isAbsolute = /^https?:\/\//i.test(originalUrl);
          const isAsset = originalUrl.startsWith('assets/');
          const imgURL = isAbsolute || isAsset
            ? originalUrl
            : `/${originalUrl}`;

          const dateStr: string = movie.date || '';
          const normalizedDate = dateStr.includes('/')
            ? new Date(dateStr.split('/').reverse().join('-'))
            : new Date(dateStr);

          return {
            ...movie,
            imgURL,
            date: normalizedDate,
          };
        });
        console.log('Fetched movies:', this.listOfMovies.length);
        console.log('First movie:', this.listOfMovies[0]);
        this.applyFilterAndPaginate();
        this.updateFavoriteMovies();
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        console.error('Error details:', err.message, err.status, err.statusText);
      },
    });
  }

  updatePage() {
    console.log('updatePage called');
    console.log('currentPage:', this.currentPage);
    console.log('limit:', this.limit);
    console.log('filteredMovies length:', this.filteredMovies.length);
    
    const start = (this.currentPage - 1) * this.limit;
    const end = this.currentPage * this.limit;
    this.paginatedMovies = this.filteredMovies.slice(start, end);
    
    console.log('start:', start, 'end:', end);
    console.log('paginatedMovies length:', this.paginatedMovies.length);
    console.log('paginatedMovies:', this.paginatedMovies);
  }
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  /**  favorite */
  Fav(movieId: number, event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();

    // Use the favorites service to toggle favorite status
    this.favoritesService.toggleFavorite(movieId);
  }

  isFavorite(movieId: number): boolean {
    return this.favoritesService.isFavorite(movieId);
  }

  // Update favorite movies list
  updateFavoriteMovies() {
    this.favoriteMovies = this.listOfMovies.filter((movie) =>
      this.favorites.has(movie.id)
    );
  }

  onSearch(query: string): void {
    this.currentQuery = query || '';
    this.currentPage = 1;
    this.applyFilterAndPaginate();
  }

  private applyFilterAndPaginate(): void {
    console.log('applyFilterAndPaginate called');
    console.log('listOfMovies length:', this.listOfMovies.length);
    console.log('currentQuery:', this.currentQuery);
    
    const q = this.currentQuery.toLowerCase();
    this.filteredMovies = q
      ? this.listOfMovies.filter((m) =>
          (m.name || '').toLowerCase().includes(q)
        )
      : [...this.listOfMovies];

    console.log('filteredMovies length:', this.filteredMovies.length);
    this.totalPages = Math.max(1, Math.ceil(this.filteredMovies.length / this.limit));
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    console.log('totalPages:', this.totalPages);
    console.log('pageNumbers:', this.pageNumbers);
    this.updatePage();
  }

  // Get class for rating circle
  getRatingClass(watchRate: number): string {
    if (watchRate >= 80) return 'good';
    if (watchRate >= 50) return 'medium';
    return 'bad';
  }
}
