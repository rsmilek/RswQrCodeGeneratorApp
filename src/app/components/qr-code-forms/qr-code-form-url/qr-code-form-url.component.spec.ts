import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeFormUrlComponent } from './qr-code-form-url.component';

describe('QrCodeUrlComponent', () => {
  let component: QrCodeFormUrlComponent;
  let fixture: ComponentFixture<QrCodeFormUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeFormUrlComponent]
    });
    fixture = TestBed.createComponent(QrCodeFormUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
