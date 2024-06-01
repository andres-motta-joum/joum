import {  Component, AfterViewInit,ElementRef, EventEmitter, OnInit, Output, ViewChild, NgZone } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { aspectsSocialFacebook } from '@ng-icons/ux-aspects';
import { aspectsSocialTwitter } from '@ng-icons/ux-aspects';
import { aspectsSocialInstagram } from '@ng-icons/ux-aspects';
import { ionLogoYoutube } from '@ng-icons/ionicons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  viewProviders : [provideIcons({aspectsSocialFacebook,aspectsSocialTwitter,aspectsSocialInstagram, ionLogoYoutube})]
})
export class FooterComponent implements OnInit, AfterViewInit{

  @Output() footer = new EventEmitter<any>();
  @Output() footerHeight = new EventEmitter<any>();

  @ViewChild('footer') footerEl!: ElementRef;
  @ViewChild('footer') footerHeightEl!: ElementRef;

  constructor(private zone: NgZone, private router: Router) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.footer.emit(this.footerEl);
    this.footerHeight.emit(this.footerHeightEl);
  }

  navegar(ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }


}
