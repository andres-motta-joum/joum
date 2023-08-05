import { Component, ElementRef, OnInit, Renderer2, ViewChild, Input} from '@angular/core';
import { provideIcons } from '@ng-icons/core';

import { heroChevronLeftSolid } from '@ng-icons/heroicons/solid';
import { heroChevronRightSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  viewProviders: provideIcons({heroChevronLeftSolid, heroChevronRightSolid})
})
export class SliderComponent implements OnInit {
  @Input() elements: Array<any> = [{img: '', name: ''}];

  @ViewChild('track') track!: ElementRef;
  @ViewChild('slickList') slickList!: ElementRef;

  public slickWidth!: number;

  public leftPosition!: number;

  constructor( 
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.slickWidth = 100;
  }

  Move(value: number): void {
    const trackWidth = this.track.nativeElement.offsetWidth;
    const listWidth = this.slickList.nativeElement.offsetWidth;

    this.leftPosition = this.track.nativeElement.style.left === '' ? 0 : (parseFloat(this.track.nativeElement.style.left) * -1);

    if (this.leftPosition < (200) && value === 2) {
      this.renderer.setStyle(this.track.nativeElement, 'left', `${-1 * (this.leftPosition + this.slickWidth)}%`);
    } else if (this.leftPosition > 0 && value === 1) {
      this.renderer.setStyle(this.track.nativeElement, 'left', `${-1 * (this.leftPosition - this.slickWidth)}%`);
    }
    console.log(trackWidth);
    console.log(listWidth);
  }
}
