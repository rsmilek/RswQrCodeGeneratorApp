import { Component, inject, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { Data } from '@angular/router';
import { appRoutesQrCode } from '../app-routing.module';
import { AppPageActions } from '../state/app.actions';
import { darkModeSelector } from '../state/app.selectors';
import { AppState } from '../state/app.state';

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isDarkMode$ = this.store.select(darkModeSelector);
  navigationItems = appRoutesQrCode.map(x => ({ routerLink: `/${x.path}`, linkName: (x.data as Data)['tag'] }));

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.isHandsetSubscription = this.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }
  
  ngOnDestroy() {
    this.isHandsetSubscription.unsubscribe();
  }

  onMenuItemRouterLinkClick() {
    this.drawerClose();
  }

  onDarkModeChange({ checked }: MatSlideToggleChange) {
    this.store.dispatch(AppPageActions.setDarkMode({ isDarkMode: checked }));
    this.drawerClose();
  }

  private drawerClose() {
    if (this.isHandset) {
      this.drawer.close();
    }
  }
}
