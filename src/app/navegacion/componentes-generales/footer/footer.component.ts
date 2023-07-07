import {  Component, AfterViewInit,ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { aspectsSocialFacebook } from '@ng-icons/ux-aspects';
import { aspectsSocialTwitter } from '@ng-icons/ux-aspects';
import { aspectsSocialInstagram } from '@ng-icons/ux-aspects';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  viewProviders : [provideIcons({aspectsSocialFacebook,aspectsSocialTwitter,aspectsSocialInstagram})]
})
export class FooterComponent implements OnInit, AfterViewInit{

  @Output() footer = new EventEmitter<any>();
  @Output() footerHeight = new EventEmitter<any>();

  @ViewChild('footer') footerEl!: ElementRef;
  @ViewChild('footer') footerHeightEl!: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.footer.emit(this.footerEl);
    this.footerHeight.emit(this.footerHeightEl);
  }


}
