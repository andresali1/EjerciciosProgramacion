import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivasStyleClassComponent } from './directivas-style-class.component';

describe('DirectivasStyleClassComponent', () => {
  let component: DirectivasStyleClassComponent;
  let fixture: ComponentFixture<DirectivasStyleClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectivasStyleClassComponent]
    });
    fixture = TestBed.createComponent(DirectivasStyleClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
