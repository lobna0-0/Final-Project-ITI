import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class Movieslist {
  url = '/api/movies';
  constructor(private http: HttpClient) {}
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url);
  }
}
