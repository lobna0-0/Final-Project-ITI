import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();

  searchQuery: string = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query) => this.emitSearch(query));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.emitSearch(this.searchQuery);
    }
  }

  onClick(): void {
    this.emitSearch(this.searchQuery);
  }

  private emitSearch(query: string): void {
    this.search.emit(query.trim());
  }
}



