import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorResponseComponent } from './error-response.component';

describe('ErrorResponseComponent', () => {
  let component: ErrorResponseComponent;
  let fixture: ComponentFixture<ErrorResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorResponseComponent]
    });
    fixture = TestBed.createComponent(ErrorResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
