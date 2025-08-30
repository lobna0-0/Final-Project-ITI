import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Favorites } from '../services/favorites';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  favoriteCount: number = 0;
  
  constructor(private favoritesService: Favorites) {}
  
  ngOnInit(): void {
    this.favoritesService.getFavorites().subscribe(favorites => {
      this.favoriteCount = favorites.size;
    });
  }
}
