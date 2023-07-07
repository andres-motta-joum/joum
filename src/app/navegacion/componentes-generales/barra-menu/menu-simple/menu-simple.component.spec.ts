import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSimpleComponent } from './menu-simple.component';

describe('MenuSimpleComponent', () => {
  let component: MenuSimpleComponent;
  let fixture: ComponentFixture<MenuSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuSimpleComponent]
    });
    fixture = TestBed.createComponent(MenuSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
