import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-grid-item',
  templateUrl: './card-grid-item.component.html',
  styleUrls: ['./card-grid-item.component.css'],
})
export class CardGridItemComponent {
  @Input() image: string;
  @Input() title: string;
  @Input() link: any[] = [];
  @Input() showHeart = false;
  @Input() favourite = false;
  @Output() heartClick = new EventEmitter<void>();

  onHeartClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.heartClick.emit();
  }
}
