import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroCog8ToothSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
  providers: [provideIcons({heroCog8ToothSolid})]
})
export class InformacionComponent {

}
