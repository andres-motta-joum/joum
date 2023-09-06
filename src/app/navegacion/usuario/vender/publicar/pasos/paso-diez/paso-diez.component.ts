import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';
import { provideIcons } from '@ng-icons/core';
import { heroArrowSmallLeft } from '@ng-icons/heroicons/outline';
import { ionCheckmarkSharp } from '@ng-icons/ionicons';
import { ionInformationCircleOutline } from '@ng-icons/ionicons';
import { aspectsInformation } from '@ng-icons/ux-aspects';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-paso-diez',
  templateUrl: './paso-diez.component.html',
  styleUrls: ['./paso-diez.component.scss'],
  providers: [provideIcons({heroArrowSmallLeft, ionCheckmarkSharp, ionInformationCircleOutline, aspectsInformation})]
})
export class PasoDiezComponent {
  constructor( private pasos: PasosVenderService, private router: Router, private firestore: Firestore) {}
  submitValue = false;

  gratuito = false;
  basico = false;
  premium = false;

  precioBasico!: number;
  precioPremium!: number;
  producto!: string;


  ngOnInit(): void {
    this.pasos.paso7 ? this.definirPrecios() : this.router.navigate(['/vender', 'formulario', 'paso6']);
  }

  definirPrecios(){
    if(this.pasos.producto){
      if(this.pasos.producto.tipoPublicacion){
        if(this.pasos.producto.tipoPublicacion == 'gratuita'){
          this.gratuito = true;
        }else if(this.pasos.producto.tipoPublicacion == 'basica'){
          this.basico = true;
        }else if(this.pasos.producto.tipoPublicacion == 'premium'){
          this.premium = true;
        }
        this.submitValue = true;
      }
    }
    this.precioBasico = this.pasos.producto.precio * 0.07;
    this.precioPremium = this.pasos.producto.precio * 0.11;
  }

  cambiarPlan(plan: string){
    if(plan === "gratuito"){
      this.gratuito = true;
      this.basico = false;
      this.premium = false;
    }else if(plan === "basico"){
      this.gratuito = false;
      this.basico = true;
      this.premium = false;
    }else if(plan === "premium"){
      this.gratuito = false;
      this.basico = false;
      this.premium = true;
    }
    this.submitValue = true;
  }

  estructurarDetalles(detalles: any): any {
    const unidadesMedida = ['altura', 'ancho', 'diametro', 'diametroBase','diametroBoca', 'largo', 'peso', 'profundidad','volumen', 'potencia'];
    const bombillos = ['temperaturaColor', 'forma', 'sistemasOperativosCompatibles','apliacionesCompatibles', 'giratorio', 'tipoRosca'];
    const lamparas = ['tipo', 'estilo', 'material', 'inalambrico', 'autoadhesiva', 'regulable', 'controlRemoto', 'sistemaDePresion'];
    const letrerosLed = ['diseño', 'altura', 'ancho', 'tipoMensaje','fuenteAlimentacion', 'montaje', 'control', 'tipoControl'];

    //----------------------------------- Eliminar propiedades Vacias ----------------------- //
    for (const clave in detalles) {
      if (detalles.hasOwnProperty(clave) && detalles[clave] === '') {
        delete detalles[clave];
      }
    }
    for (const estilo of this.pasos.producto.estilos) {
      for (const clave in estilo) {
        if (estilo.hasOwnProperty(clave) && estilo[clave] === '') {
          delete estilo[clave];
        }
      }
    }
    this.pasos.producto.estilos.forEach((estilo: any, index: any) => {
      for (let i = estilo.fotos.length - 1; i >= 0; i--) {
        if (estilo.fotos[i].trim() === '') {
          this.pasos.producto.estilos[index].fotos.splice(i, 1);
        }
      }
    });

    //----------------------------------- estructurar datos subCategoría ILUMINACIÓN ----------------------- //
    if(detalles.subCategoria === 'Bombillos'){
      for (const dato of lamparas) {
          delete detalles[dato];
      }
      for (const dato of letrerosLed) {
        delete detalles[dato];
      }
    } 
    if(detalles.subCategoria === 'Lamparas'){
      for (const dato of bombillos) {
          delete detalles[dato];
      }
      for (const dato of letrerosLed) {
        delete detalles[dato];
      }
    } 
    if(detalles.subCategoria === 'Letreros led'){
      for (const dato of bombillos) {
          delete detalles[dato];
      }
      for (const dato of lamparas) {
        delete detalles[dato];
      }
      delete detalles['potencia'];
      delete detalles['wifi'];
    } 

    for (const unidad of unidadesMedida) {
      if (!detalles[unidad]) {
        delete detalles[`unidadMedida${unidad.charAt(0).toUpperCase() + unidad.slice(1)}`];
      }
    }
    return detalles;
  }

  corregirDetalles(){
    const detalles = this.estructurarDetalles(this.pasos.producto.detalles);
    this.pasos.producto.detalles = detalles;
  }

  async addUserFirestore(producto: Producto): Promise<void>{
    await addDoc(collection(this.firestore, "productos"), producto);
  }

  submit(): any {
    if(this.gratuito){
      this.pasos.producto.tipoPublicacion = 'gratuita'
    }else if(this.basico){
      this.pasos.producto.tipoPublicacion = 'basica'
    }else if(this.premium = true){
      this.pasos.producto.tipoPublicacion = 'premium'
    }
    this.corregirDetalles();
    this.addUserFirestore(this.pasos.producto);
    
  }
  atras(): void {
    if(this.gratuito){
      this.pasos.producto.tipoPublicacion = 'gratuita';
    }else if(this.basico){
      this.pasos.producto.tipoPublicacion = 'basica'
    }else if(this.premium = true){
      this.pasos.producto.tipoPublicacion = 'premium'
    }
    this.router.navigate(['/vender', 'formulario', 'paso9']);
  }
}
