import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeFormCzPaymentComponent } from './qr-code-form-cz-payment.component';

describe('QrCodeCzPaymentComponent', () => {
  let component: QrCodeFormCzPaymentComponent;
  let fixture: ComponentFixture<QrCodeFormCzPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeFormCzPaymentComponent]
    });
    fixture = TestBed.createComponent(QrCodeFormCzPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
