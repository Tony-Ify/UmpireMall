import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {
searchValue: string = '';
  @Output() search = new EventEmitter<string>();
  
  onSearchChange(): void {
    this.search.emit(this.searchValue);
  }
}