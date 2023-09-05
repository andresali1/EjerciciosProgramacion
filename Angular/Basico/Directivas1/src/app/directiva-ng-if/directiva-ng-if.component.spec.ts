import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivaNgIfComponent } from './directiva-ng-if.component';

describe('DirectivaNgIfComponent', () => {
  let component: DirectivaNgIfComponent;
  let fixture: ComponentFixture<DirectivaNgIfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectivaNgIfComponent]
    });
    fixture = TestBed.createComponent(DirectivaNgIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
