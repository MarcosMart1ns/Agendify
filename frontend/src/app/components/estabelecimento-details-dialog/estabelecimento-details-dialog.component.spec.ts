import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoDetailsDialogComponent } from './estabelecimento-details-dialog.component';

describe('EstabelecimentoDetailsDialogComponent', () => {
  let component: EstabelecimentoDetailsDialogComponent;
  let fixture: ComponentFixture<EstabelecimentoDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstabelecimentoDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(EstabelecimentoDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
