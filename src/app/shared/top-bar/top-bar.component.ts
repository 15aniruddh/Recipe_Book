import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  @Input() title: string;
  @Input() backLink: any[] | null = null;
  @Input() light = false;

  constructor(private location: Location, private router: Router) {}

  onBack() {
    if (this.backLink) {
      this.router.navigate(this.backLink);
    } else {
      this.location.back();
    }
  }
}
