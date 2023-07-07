import {AfterViewInit, ChangeDetectorRef,Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, Renderer2,ViewChild, } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid'; 

/*---------- Iconos Compras ---------*/
import { heroShoppingCartSolid } from '@ng-icons/heroicons/solid';
import { heroShoppingCart } from '@ng-icons/heroicons/outline';
import { heroStar } from '@ng-icons/heroicons/outline'; 
import { heroDocumentCheck } from '@ng-icons/heroicons/outline';
import { heroChatBubbleBottomCenterText } from '@ng-icons/heroicons/outline';
import { heroBanknotes } from '@ng-icons/heroicons/outline';

/*----------- Iconos Ventas ----------*/
import { heroRectangleGroup } from '@ng-icons/heroicons/outline'; 
import { heroBell } from '@ng-icons/heroicons/outline';
import { heroBuildingStorefront } from '@ng-icons/heroicons/outline';
import { heroChatBubbleLeftRight } from '@ng-icons/heroicons/outline';
import { heroBanknotesMini } from '@ng-icons/heroicons/mini';
import { heroCurrencyDollarSolid } from '@ng-icons/heroicons/solid';
import { heroCurrencyDollar } from '@ng-icons/heroicons/outline';
import { heroArrowTrendingUp } from '@ng-icons/heroicons/outline';
import { heroChartPie } from '@ng-icons/heroicons/outline';

import { heroDocumentTextSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  animations: [
    trigger('subMenu', [
      state('active', style({
        maxHeight: '460px'
      })),
      state('inactive', style({
        maxHeight: '0'
      })),
      transition('inactive => active', animate('300ms')),
      transition('active => inactive', animate('300ms'))
    ]),
    trigger('fotoShow', [
      state('active', style({
        opacity: '100%'
      })),
      state('inactive', style({
        opacity: '0%'
      })),
      transition('inactive => active', animate('150ms'))
    ])
  ],
  providers: [provideIcons({heroChevronDown, heroShoppingCartSolid, heroUserCircleSolid, heroShoppingCart, heroStar, heroDocumentCheck, heroChatBubbleBottomCenterText, heroBanknotesMini,heroRectangleGroup, heroBell,heroBuildingStorefront, heroChatBubbleLeftRight, heroCurrencyDollar, heroCurrencyDollarSolid, heroArrowTrendingUp, heroChartPie, heroDocumentTextSolid})]
})
export class PerfilComponent implements AfterViewInit, OnDestroy, OnInit{

  public footer: any;
  public footerHeight: any;
  public footerSlide!: number;
  public fotoSombra!: boolean;
  public mouseInMenu = false;
  public screenWidth: number = window.innerWidth;
  public screenHeight: number = window.innerHeight;
  public interruptor = true;
  public photoText = 'Arrastra aquí tu foto';
  public stateSubMenu: string[] = ['inactive', 'inactive', 'inactive'];
  public stateFoto = 'inactive';

  private subscripciones: Subscription[] = [];
  private subsCliente!: Subscription;
  private listenMouseEnterMenu!: () => void;
  private listenMouseLeaveMenu!: () => void;
  private listenFooterSlide!: () => void;

  @ViewChild('principalUL') principalUL!: ElementRef;
  @ViewChild('body') body1!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone
  ) {
  }

  desplegarSubmenu(i: number): any {
    this.stateSubMenu[i] = this.stateSubMenu[i] === 'active' ? 'inactive' : 'active';
  }


  getFoto(fileInput: HTMLInputElement): void {
    if (fileInput.files !== null) {
      this.photoText = fileInput.files[0].name;
    }
  }


  getFooter(element: any): any {
    this.footer = element;
  }

  getFooterHeight(element: any): any {
    this.footerHeight = element;
  }

  navegar(ruta: any[], event: Event): any {
    event.preventDefault();
    this.zone.run(() => {
      try {
        this.router.navigate(ruta);
        window.scroll(0,0);

      } catch (error) {
        this.router.navigate(['/noHaySesion']);
      }
    });
  }

  submenuScroll(interruptor: boolean): any {
    let numeroResta = 0;
    const scroll = window.scrollY;
    if (interruptor){
      if (scroll >= 0 && scroll <= 32){
        numeroResta = scroll;
        this.renderer.setStyle(this.principalUL.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.principalUL.nativeElement, 'top', `${91 - numeroResta}px`);
        this.renderer.setStyle(this.principalUL.nativeElement, 'height', `${window.innerHeight - 90 + numeroResta}px`);
      } else if (scroll >= 32){
        this.renderer.setStyle(this.principalUL.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.principalUL.nativeElement, 'top', '57px');
        this.renderer.setStyle(this.principalUL.nativeElement, 'height', `${window.innerHeight - 58 + numeroResta}px`);
      } else if (scroll < 32){
        this.renderer.setStyle(this.principalUL.nativeElement, 'position', 'sticky');
        this.renderer.setStyle(this.principalUL.nativeElement, 'top', '0px');
        this.renderer.setStyle(this.principalUL.nativeElement, 'height', `${window.innerHeight - 90 + numeroResta}px`);
        this.renderer.setStyle(this.principalUL.nativeElement, 'margin-top', '0');
      }
    }

    if (interruptor === false){
      this.renderer.setStyle(this.principalUL.nativeElement, 'position', 'absolute');
      this.renderer.setStyle(this.principalUL.nativeElement, 'height', `${window.innerHeight - 58 + numeroResta}px`);
      const heightMenu = this.principalUL.nativeElement.offsetHeight;
      const footerHeight = this.footerHeight.nativeElement.offsetHeight;
      const pageHeight = this.body1.nativeElement.offsetHeight;
      const resultado = pageHeight - (footerHeight + heightMenu );
      this.renderer.setStyle(this.principalUL.nativeElement, 'top', `${resultado}px`);
    }
    
  }

  ngOnInit(): any { 
    const idVisited = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    this.listenMouseEnterMenu = this.renderer.listen(this.principalUL.nativeElement, 'mouseenter', () => {
      this.mouseInMenu = true;
      this.changeDetector.detectChanges();
    });
    this.listenMouseLeaveMenu = this.renderer.listen(this.principalUL.nativeElement, 'mouseleave', () => {
      this.mouseInMenu = false;
      this.changeDetector.detectChanges();
    });
    this.listenFooterSlide = this.renderer.listen('window', 'load', () => {
      this.footerSlide = (this.footer.nativeElement.getBoundingClientRect().top) - this.screenHeight;
      this.interruptor = this.footerSlide > 0 ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.listenMouseEnterMenu();
    this.listenMouseLeaveMenu();
    this.listenFooterSlide();
    this.subscripciones.forEach(subs => subs.unsubscribe());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.footerSlide = (this.footer.nativeElement.getBoundingClientRect().top) - this.screenHeight;
    this.interruptor = this.footerSlide > 0 ? true : false;
    this.submenuScroll(this.interruptor);
  }

  @HostListener('window:scroll', ['$event']) onScroll(event: any): void {
    this.scroll();
  }

  scroll(): void{
    this.footerSlide = (this.footer.nativeElement.getBoundingClientRect().top) - this.screenHeight;
    this.interruptor = this.footerSlide > 0 ? true : false;
    this.submenuScroll(this.interruptor);
  }


}
