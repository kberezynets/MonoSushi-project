import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostavkaTaOplataComponent } from './dostavka-ta-oplata.component';

describe('DostavkaTaOplataComponent', () => {
  let component: DostavkaTaOplataComponent;
  let fixture: ComponentFixture<DostavkaTaOplataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DostavkaTaOplataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DostavkaTaOplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
