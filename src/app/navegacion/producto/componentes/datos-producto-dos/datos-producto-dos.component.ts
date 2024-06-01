import { Component} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { ionInformationCircleOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'app-datos-producto-dos',
  templateUrl: './datos-producto-dos.component.html',
  styleUrls: ['./datos-producto-dos.component.scss'],
  providers: [provideIcons({ionInformationCircleOutline})]
})
export class DatosProductoDosComponent {
}
