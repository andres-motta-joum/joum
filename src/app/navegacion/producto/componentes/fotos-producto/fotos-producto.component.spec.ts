import { ComponentFixture, TestBed } from '@angular/core/testing';

import { fotosProductoComponent } from './fotos-producto.component';

describe('fotosProductoComponent', () => {
  let component: fotosProductoComponent;
  let fixture: ComponentFixture<fotosProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [fotosProductoComponent]
    });
    fixture = TestBed.createComponent(fotosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
