import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeCzPaymentComponent } from './qr-code-cz-payment.component';

describe('QrCodeCzPaymentComponent', () => {
  let component: QrCodeCzPaymentComponent;
  let fixture: ComponentFixture<QrCodeCzPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeCzPaymentComponent]
    });
    fixture = TestBed.createComponent(QrCodeCzPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
