import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeEmailComponent } from './qr-code-email.component';

describe('QrCodeEmailComponent', () => {
  let component: QrCodeEmailComponent;
  let fixture: ComponentFixture<QrCodeEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeEmailComponent]
    });
    fixture = TestBed.createComponent(QrCodeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
