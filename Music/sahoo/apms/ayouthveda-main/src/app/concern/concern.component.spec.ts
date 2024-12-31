import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernComponent } from './concern.component';

describe('ConcernComponent', () => {
  let component: ConcernComponent;
  let fixture: ComponentFixture<ConcernComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcernComponent]
    });
    fixture = TestBed.createComponent(ConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
