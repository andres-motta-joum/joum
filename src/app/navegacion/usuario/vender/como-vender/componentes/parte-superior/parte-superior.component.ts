import { Component } from '@angular/core';

@Component({
  selector: 'app-parte-superior',
  templateUrl: './parte-superior.component.html',
  styleUrls: ['./parte-superior.component.scss']
})
export class ParteSuperiorComponent {

  restartScroll(){
    window.scroll(0,0)
  }

}
