import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
  @Output() cerrar = new EventEmitter<void>();
  
}
