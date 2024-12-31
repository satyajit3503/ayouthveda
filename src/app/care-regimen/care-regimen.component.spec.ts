import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareRegimenComponent } from './care-regimen.component';

describe('CareRegimenComponent', () => {
  let component: CareRegimenComponent;
  let fixture: ComponentFixture<CareRegimenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareRegimenComponent]
    });
    fixture = TestBed.createComponent(CareRegimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
