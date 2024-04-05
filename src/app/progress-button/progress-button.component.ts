import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrl: './progress-button.component.scss'
})
export class ProgressButtonComponent {
  @Input() caption: string = 'ProgressButton';
  @Input() icon!: string;
  @Input() disabled: boolean = false;
  @Input() progress: boolean | null = false;
  @Output() onClickEvent = new EventEmitter<void>();

  onClick() {
    this.onClickEvent.emit();
  }
}
