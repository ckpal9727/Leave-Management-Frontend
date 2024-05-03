import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppyleaveComponent } from './appyleave.component';

describe('AppyleaveComponent', () => {
  let component: AppyleaveComponent;
  let fixture: ComponentFixture<AppyleaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppyleaveComponent]
    });
    fixture = TestBed.createComponent(AppyleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
