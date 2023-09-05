import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivaNgForComponent } from './directiva-ng-for.component';

describe('DirectivaNgForComponent', () => {
  let component: DirectivaNgForComponent;
  let fixture: ComponentFixture<DirectivaNgForComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectivaNgForComponent]
    });
    fixture = TestBed.createComponent(DirectivaNgForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
