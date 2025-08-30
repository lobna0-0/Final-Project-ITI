import { Component } from '@angular/core';
import { Movieslist } from '../services/movieslist';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Movie } from '../models/movie.model';
import { Favorites } from '../services/favorites';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist {
  listOfMovies: Movie[] = [];
  favorites = new Set<number>();
  favoriteMovies: Movie[] = [];

  constructor(
    private movServObj: Movieslist,
    private favoritesService: Favorites,
    private router: Router
  ) {}

  ngOnInit() {
    this.favoritesService.getFavorites().subscribe((favorites) => {
      this.favorites = favorites;
      this.updateFavoriteMovies();
    });

    this.movServObj.getMovies().subscribe({
      next: (data) => {
        console.log(data)
        this.listOfMovies = data.map((movie: any) => ({
          ...movie,
          imgURL: `http://localhost:3000/${movie.imgURL}`,
          date: new Date(movie.date.split('/').reverse().join('-'))
        }));
        this.updateFavoriteMovies();
      },
      error: (err) => console.error('Error fetching movies:', err)
    });
  }

  removeFromWatchlist(movieId: number, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.favoritesService.toggleFavorite(movieId);
  }

  isFavorite(movieId: number): boolean {
    return this.favoritesService.isFavorite(movieId);
  }

  updateFavoriteMovies() {
    this.favoriteMovies = this.listOfMovies.filter((movie) =>
      this.favorites.has(movie.id)
    );
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movies', movieId]);
  }
}
