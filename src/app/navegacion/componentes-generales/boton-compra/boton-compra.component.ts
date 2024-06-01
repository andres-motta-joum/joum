import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
declare const ShopifyBuy: any;

@Component({
  selector: 'app-boton-compra',
  templateUrl: './boton-compra.component.html',
  styleUrls: ['./boton-compra.component.scss']
})

export class BotonCompraComponent implements OnChanges {
  @ViewChild('contenedor', { static: true }) contenedor!: ElementRef;
  @Input() id!: string;
  @Input() variante!: string;
  @Input() idDocumento!: string;
  porBorrar: boolean = false;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && changes['id'].currentValue || changes['variante']) {
      if(this.porBorrar){
        const elementoPadre = this.contenedor.nativeElement;
        const primerHijo = elementoPadre.firstChild; // Obtén el primer hijo
        if (primerHijo) {
          elementoPadre.removeChild(primerHijo); // Elimina el primer hijo del DOM
        }
        await this.generarBoton();
      }else{
        await this.generarBoton();
        this.porBorrar = true;
      }
    }
  }

  async generarBoton(){
    this.idDocumento = `product-component-${this.idDocumento}`;
    const client = await ShopifyBuy.buildClient({
      domain: '401991-9d.myshopify.com',
      storefrontAccessToken: '53d479aed268ee05ce56f5bcbcb2bba7',
    });

    let ui: any =  await ShopifyBuy.UI.onReady(client);
    await ui.createComponent('product', {
      id: this.id,
      variantId: this.variante,
      node: document.getElementById(this.idDocumento),
      moneyFormat: '%24%7B%7Bamount_with_comma_separator%7D%7D',
      options: {
        product: {
          styles: {
            button: {
              "width": "1000px",
              "height": "43px",
              "line-height": "15px",
              "font-weight": "510",
              "font-size": "17px",
              "font-family": "verdana",
              "color": "#fff",
              "letter-spacing": ".8px",
              ":hover": {
                "background-color": "#ff9a52"
              },
              "background-color": "#ffa260",
              ":focus": {
                "background-color": "#ff9a52"
              },
              "border-radius": "5px",
            }
          },
          buttonDestination: "checkout",
          contents: {
            "img": false,
            "title": false,
            "price": false
          },
          text: {
            "button": "Comprar ahora"
          }
        },
        option: {
          contents: false
        }
      }
    });
  }
}



