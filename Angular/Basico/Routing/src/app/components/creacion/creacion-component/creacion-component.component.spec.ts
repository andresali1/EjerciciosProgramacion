import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionComponentComponent } from './creacion-component.component';

describe('CreacionComponentComponent', () => {
  let component: CreacionComponentComponent;
  let fixture: ComponentFixture<CreacionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreacionComponentComponent]
    });
    fixture = TestBed.createComponent(CreacionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
