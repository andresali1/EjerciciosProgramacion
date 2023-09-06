import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionComponentComponent } from './edicion-component.component';

describe('EdicionComponentComponent', () => {
  let component: EdicionComponentComponent;
  let fixture: ComponentFixture<EdicionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdicionComponentComponent]
    });
    fixture = TestBed.createComponent(EdicionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
