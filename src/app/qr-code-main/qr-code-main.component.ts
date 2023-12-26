import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-qr-code-main',
  templateUrl: './qr-code-main.component.html',
  styleUrls: ['./qr-code-main.component.scss']
})
export class QrCodeMainComponent implements OnInit {
  routeData!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Access the custom data from the route
    this.routeData = this.route.snapshot.data['tag'];
  }

  getVisible(name: string) {
    return name == this.route.snapshot.data['tag'];
  }
}