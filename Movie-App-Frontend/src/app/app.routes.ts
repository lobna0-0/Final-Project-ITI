import { Routes } from '@angular/router';
import { MoviesList } from './movies-list/movies-list';
import { Watchlist } from './watchlist/watchlist';
import { MovieDetailsComponent } from './movie-details/movie-details';

export const routes: Routes = [ 
    { path: 'movies', component: MoviesList},
    { path: 'movies/:id', component: MovieDetailsComponent},
    { path: 'watchlist', component: Watchlist},
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    { path: '**', redirectTo: '/movies' }
];
