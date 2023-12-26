import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeMainComponent } from './qr-code-main.component';

describe('QrCodeMainComponent', () => {
  let component: QrCodeMainComponent;
  let fixture: ComponentFixture<QrCodeMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeMainComponent]
    });
    fixture = TestBed.createComponent(QrCodeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
