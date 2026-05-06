import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInput } from '../search-input/search-input';
@Component({
  selector: 'app-navbar', // Changed to match app.html usage
  imports: [CommonModule, SearchInput],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  @Input() cartCount: number = 0;
  @Output() search = new EventEmitter<string>();
  
  onSearch(query: string): void {
    this.search.emit(query);
  }
}