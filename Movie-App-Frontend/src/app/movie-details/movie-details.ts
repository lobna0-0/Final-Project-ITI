import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Movieslist } from '../services/movieslist';
import { Favorites } from '../services/favorites';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  recommendations: any[] = [];
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private moviesService: Movieslist,
    private favoritesService: Favorites
  ) {}

  ngOnInit(): void {
    console.log('MovieDetails component initialized');
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Movie ID from route:', id);
      if (!id) return;

      // Fetch movie details
      this.http.get(`/api/movies/${id}`).subscribe({
        next: (data: any) => {
          console.log('Raw movie data:', data);
          this.movie = data;
          
          // Check if movie is in favorites
          this.favoritesService.getFavorites().subscribe(favorites => {
            this.isFavorite = favorites.has(this.movie.id);
            // Update isRecommended to match favorites status
            this.movie.isRecommended = this.isFavorite;
          });

          // Handle categories
          if (!this.movie.categories) {
            if (typeof this.movie.category === 'string') {
              this.movie.categories = this.movie.category.split(',').map((c: string) => c.trim());
            } else if (Array.isArray(this.movie.category)) {
              this.movie.categories = this.movie.category;
            } else {
              this.movie.categories = []; // fallback
            }
          }

          console.log('Processed categories:', this.movie.categories);

          // Fetch recommendations after getting details
          this.http.get('/api/movies').subscribe({
            next: (recs: any) => {
              this.recommendations = recs
                .filter((rec: any) => rec.id !== this.movie.id)
                .slice(0, 4);
            },
            error: (err) => console.error(err)
          });
        },
        error: (err) => console.error(err)
      });
    });
  }

  // Toggle favourite using the Favorites service
  toggleFavourite() {
    if (!this.movie) return;
    
    this.favoritesService.toggleFavorite(this.movie.id);
    
    // Update local state to reflect changes
    this.favoritesService.getFavorites().subscribe(favorites => {
      this.isFavorite = favorites.has(this.movie.id);
      this.movie.isRecommended = this.isFavorite;
    });
  }

  // Get class for rating circle
  getRatingClass(watchRate: number): string {
    if (watchRate >= 80) return 'good';
    if (watchRate >= 50) return 'medium';
    return 'bad';
  }
}