import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let searchService: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService]
    });

    searchService = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(searchService).toBeTruthy();
  });

  it('should emit search text', () => {
    const mockSearchText = 'test';
    searchService.setSearchText('test')
    searchService.searchText$.subscribe((searchText) => {
      expect(searchText).toEqual(mockSearchText);
    });

    searchService.setSearchText(mockSearchText);
  });
});
