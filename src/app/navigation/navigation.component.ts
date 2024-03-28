import { Component, inject, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DarkModeService } from '../services/dark-mode.service';
import { Store } from '@ngrx/store';
import { AppPageActions } from '../state/app.actions';
import { darkModeSelector } from '../state/app.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy  {
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

  constructor(
    private store: Store,
    private darkModeService: DarkModeService
  ) { }

  ngOnInit(){
    this.isHandsetSubscription = this.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });

    // TRICKY: applied to synchronize store with localStorage value :-(
    this.store.dispatch(AppPageActions.setDarkMode({darkMode: this.darkModeService.isDarkMode }));
  }
  
  ngOnDestroy(){
    this.isHandsetSubscription.unsubscribe();
  }

  onMenuItemRouterLinkClick() {
    this.drawerClose();
  }

  onDarkModeChange({ checked }: MatSlideToggleChange) {
    this.store.dispatch(AppPageActions.setDarkMode({ darkMode: checked }));
    this.drawerClose();
  }

  private drawerClose() {
    if (this.isHandset) this.drawer.close();
  }
}
