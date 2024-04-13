import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly action: string = 'X';

  constructor(private snackBar: MatSnackBar) { }

  public openErrorNotification(message: string) {
    this.snackBar.open(message, this.action, this.createConfig(5000, 'snack-bar-error'));
  }

  private createConfig(duration: number, panelClass: string): MatSnackBarConfig {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = duration;
    config.panelClass = panelClass;
    return config;
  }

}
