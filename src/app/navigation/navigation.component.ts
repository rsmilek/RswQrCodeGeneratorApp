import { Component, inject, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Data } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AppState } from '../state/app.state';
import { appRoutesQrCode } from '../app-routing.module';
import { AppPageActions } from '../state/app.actions';
import { darkModeSelector } from '../state/app.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Input() title!: string;

  @ViewChild('drawer') drawer!: MatSidenav; // Gets navigation drawer component

  private breakpointObserver = inject(BreakpointObserver);
  private isHandsetSubscription!: Subscription;
  private isHandset!: boolean; // True if page width is for 'small devices' and side navigation is in 'side' mode

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public isDarkMode = this.store.selectSignal(darkModeSelector);
  public navigationItems = appRoutesQrCode.map(x => ({ routerLink: `/${x.path}`, linkName: (x.data as Data)['tag'] }));

  constructor(private store: Store<AppState>) { }

  public ngOnInit() {
    this.isHandsetSubscription = this.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }
  
  public ngOnDestroy() {
    this.isHandsetSubscription.unsubscribe();
  }

  public onMenuItemRouterLinkClick() {
    this.drawerClose();
  }

  public onDarkModeChange({ checked }: MatSlideToggleChange) {
    this.store.dispatch(AppPageActions.setDarkMode({ isDarkMode: checked }));
    this.drawerClose();
  }

  private drawerClose() {
    if (this.isHandset) {
      this.drawer.close();
    }
  }
}
