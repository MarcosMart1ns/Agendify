import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsPageComponent } from './search-results-page.component';

describe('SearchResultsPageComponent', () => {
  let component: SearchResultsPageComponent;
  let fixture: ComponentFixture<SearchResultsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsPageComponent]
    });
    fixture = TestBed.createComponent(SearchResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
