import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss'],
  providers: [provideIcons({heroStarSolid})]
})
export class OpinionesComponent {

}
