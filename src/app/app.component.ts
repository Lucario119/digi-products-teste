import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'digi-frontend-teste';
  searchText: string = '';

  onSearch(searchText: string): void {
    this.searchText = searchText;
  }
}
