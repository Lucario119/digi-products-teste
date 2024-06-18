import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchText: string = '';

  constructor(private searchService: SearchService) {}

  onSearchChange(): void {
    this.searchService.setSearchText(this.searchText);
  }
}
