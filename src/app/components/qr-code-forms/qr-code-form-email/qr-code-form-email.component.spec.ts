import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeFormEmailComponent } from './qr-code-form-email.component';

describe('QrCodeEmailComponent', () => {
  let component: QrCodeFormEmailComponent;
  let fixture: ComponentFixture<QrCodeFormEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeFormEmailComponent]
    });
    fixture = TestBed.createComponent(QrCodeFormEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
