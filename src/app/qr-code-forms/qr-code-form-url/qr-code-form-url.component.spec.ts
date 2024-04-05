import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeUrlComponent } from './qr-code-form-url.component';

describe('QrCodeUrlComponent', () => {
  let component: QrCodeUrlComponent;
  let fixture: ComponentFixture<QrCodeUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeUrlComponent]
    });
    fixture = TestBed.createComponent(QrCodeUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
