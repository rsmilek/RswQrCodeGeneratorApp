import { Component, inject, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy  {
  @Input() title!: string;
  @Input() isDarkMode = false;
  @Output() readonly darkModeChangeEvent = new EventEmitter<boolean>();

  // Get navigation drawer component
  @ViewChild('drawer') drawer!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);
  private isHandsetSubscription!: Subscription;
  private isHandset!: boolean; // True if page width is for 'small devices' and side navigation is in 'side' mode

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    ngOnInit(){
      this.isHandsetSubscription = this.isHandset$.subscribe((isHandset: boolean) => {
        this.isHandset = isHandset;
      });
    }
    
    ngOnDestroy(){
      this.isHandsetSubscription.unsubscribe();
    }

    onMenuItemRouterLinkClick() {
      if (this.isHandset) this.drawer.close();
    }

    onDarkModeChange({ checked }: MatSlideToggleChange) {
      this.darkModeChangeEvent.emit(checked);
    }
  }
