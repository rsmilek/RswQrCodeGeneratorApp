import { Component, inject, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Data } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { appRoutesQrCode } from '../../app-routing.module';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: false
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
  public navigationItems = appRoutesQrCode.map(x => ({ routerLink: `/${x.path}`, linkName: (x.data as Data)['tag'] }));

  constructor() { }

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

  private drawerClose() {
    if (this.isHandset) {
      this.drawer.close();
    }
  }
}
