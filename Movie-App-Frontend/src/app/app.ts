import { Component, signal, OnInit } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('first_app');
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    console.log('App component initialized');
    console.log('Current URL:', window.location.href);
    console.log('Router URL:', this.router.url);
  }
}
