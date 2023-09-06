import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service'; 
import { provideIcons } from '@ng-icons/core';
import { heroArrowSmallLeft } from '@ng-icons/heroicons/outline';
import { matAddAPhotoRound } from '@ng-icons/material-icons/round';
import { ionCloseCircleSharp } from '@ng-icons/ionicons';
import { ionCloseCircleOutline } from '@ng-icons/ionicons'; 

@Component({
  selector: 'app-paso-cinco',
  templateUrl: './paso-cinco.component.html',
  styleUrls: ['./paso-cinco.component.scss'],
  providers: [provideIcons({heroArrowSmallLeft, matAddAPhotoRound, ionCloseCircleSharp, ionCloseCircleOutline})]
})
export class PasoCincoComponent {
  constructor( private pasos: PasosVenderService, private router: Router, private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder) {}
  submitValue = false;
  estilos!: any;

  ngOnInit(): void {
    this.pasos.paso5 ? true : this.router.navigate(['/vender', 'formulario', 'paso4']);
    if(this.pasos.producto){
      this.estilos = [];
      if(this.pasos.producto.estilos[0].fotos){
        this.estilos = this.pasos.producto.estilos;
        this.estilos.forEach((element: any) => {
          if(!element.fotos){
            element.fotos = ['','','','',''];
            element.unidades = '';
            element.sku = '';
          }
        });
        this.validarCampos();
      }else{
        this.definirEstilos(this.pasos.producto.estilos);
      }
    }
  }
  definirEstilos(estilos: any){
    estilos.forEach((element: any) => {
      this.estilos.push({
        nombre: element.nombre, 
        fotos: ['','','','',''],
        unidades: '',
        sku: ''
      })
    });
  }

  subirFoto(event: any, i: number, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        this.estilos[i].fotos[index] = imageDataUrl;
        if(index >= 4 && index < 7){
          this.estilos[i].fotos.push('');
        }
      };
    }
    setTimeout(()=>{
      this.validarCampos();
    },10)
  }

  eliminarFoto(i: number, index: number){
    this.estilos[i].fotos.splice(index, 1);
    if(this.estilos[i].fotos.length <= 4){
      this.estilos[i].fotos.push('');
    }
    this.validarCampos();
  }

  actualizarDatosInputs(event: Event, i: number, tipo: string){
    const input = event.target as HTMLInputElement;
    if(tipo === 'unidades'){
      this.estilos[i].unidades = input.value;
    }else{
      this.estilos[i].sku = input.value;
    }
    this.validarCampos();
  }

  validadCampo(key: KeyboardEvent, event: Event) {
    const input = event.target as HTMLInputElement;
    if (key.key?.toLowerCase() === 'e' || (input.value.length === 3 && key.key !== 'Backspace')) {
      key.preventDefault(); 
    }
  }

  validarCampos(){
    let error = false;
    this.estilos.forEach((element: any)=>{
      if(element.fotos[0] === ''){
        error = true;
      }
      if(!element.unidades){
        error = true;
      }
    })
    error ? this.submitValue = false : this.submitValue = true;
  }

  submit(): any {
      this.pasos.paso6 = true;
      this.pasos.producto.estilos = this.estilos;
      this.router.navigate(['/vender', 'formulario', 'paso6']);
  }

  atras(): void {
    this.pasos.producto.estilos = this.estilos;
    this.router.navigate(['/vender', 'formulario', 'paso4']);
  }
}
