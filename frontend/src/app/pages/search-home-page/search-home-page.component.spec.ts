import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomePageComponent } from './search-home-page.component';

describe('SearchHomePageComponent', () => {
  let component: SearchHomePageComponent;
  let fixture: ComponentFixture<SearchHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchHomePageComponent]
    });
    fixture = TestBed.createComponent(SearchHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
