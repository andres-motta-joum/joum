import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sin-tickets',
  templateUrl: './sin-tickets.component.html',
  styleUrls: ['./sin-tickets.component.scss']
})
export class SinTicketsComponent {
  @Input() texto!: string;
}
