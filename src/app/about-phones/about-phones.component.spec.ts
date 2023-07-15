import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPhonesComponent } from './about-phones.component';

describe('AboutPhonesComponent', () => {
  let component: AboutPhonesComponent;
  let fixture: ComponentFixture<AboutPhonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPhonesComponent]
    });
    fixture = TestBed.createComponent(AboutPhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
