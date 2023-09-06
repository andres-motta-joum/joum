import { ChangeDetectorRef, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';
import { provideIcons } from '@ng-icons/core';
import { heroArrowSmallLeft } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrls: ['./paso-cuatro.component.scss'],
  providers: [provideIcons({heroArrowSmallLeft})]
})
export class PasoCuatroComponent {
  constructor( private pasos: PasosVenderService, private router: Router, private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder, private renderer: Renderer2) {}
  @ViewChildren('estiloInput') estiloInputs!: QueryList<ElementRef>;
  inputs!: string[];
  estilosSubmit!: any[];
  agregar = true;
  btnSubmit!: boolean;
  estilosErrors: boolean[] = [];
  error = false;

  ngOnInit(): void {
    this.pasos.paso4 ? true : this.router.navigate(['/vender', 'formulario', 'paso2']);
    if(this.pasos.producto){
      this.inputs = [];
      this.definirArrays(this.pasos.producto.estilos);
    }
  }

  definirArrays(estiloService: any[]){
    if(estiloService){
      this.estilosSubmit = estiloService;
      for(let estilo of estiloService){
        this.inputs.push('');
      }
      if(estiloService[0]){
        this.modificarestilo(0, estiloService[0].nombre);
      }
    }else{
      this.estilosSubmit = [];
    }
  }

  //---------------------------- Se ejecutan con los inputs del formulario ------------

  agregarestilo() {
    if (this.inputs.length <= 7) {
      this.inputs.push('');
      this.estilosSubmit.push({nombre: ''});
      this.agregar = false;
      this.btnSubmit = false;

      setTimeout(() => {
        const lastInput = this.estiloInputs.last.nativeElement;
        this.renderer.selectRootElement(lastInput).focus();
      });
    }
  }

  eliminarestilo(index: number): void {
    this.inputs.splice(index, 1);
    this.estilosSubmit.splice(index, 1);
    this.estilosErrors[index] = false;
    this.actualizarAgregar();
  }
  //--------------------------

  modificarestilo(index: number, valor: any){
    this.actualizarAgregar();
    if (valor.target) {
      const valorInput = this.corregirValorActual(valor.target.value);
      const valorExistente = this.estilosSubmit.find(estilo => estilo.nombre === valorInput);
      if (valorExistente) {
        this.estilosErrors[index] = true;
      }else{
        this.estilosErrors[index] = false;
      }
      this.estilosSubmit[index].nombre = valorInput;
    }

    if(this.estilosErrors.some(error => error == true)){
      this.error = true;
    }else{
      this.error = false;
    }

    const nombres = this.estilosSubmit.map(estilo => estilo.nombre); // Extraer los nombres en un nuevo arreglo


    const conjuntoNombres = new Set(nombres); // Crear un conjunto de nombres donde no hay repetidos
    if (nombres.length === conjuntoNombres.size) {
      // No hay nombres repetidos entre los objetos
      this.estilosErrors.fill(false);
      this.error = false;
    } else {
      this.error = true;
    }


    this.actualizarAgregar();
  }

  actualizarAgregar(): void {
    if(this.estilosSubmit.every(estilo => estilo.nombre.trim() !== '') && this.estilosSubmit.length <= 7 && this.error !== true){
      this.agregar = true;
      if(this.estilosSubmit.length !== 0){
        this.btnSubmit = true
      }else{
        this.btnSubmit = false
      }
    }else{
      this.agregar = false;
      this.btnSubmit = false;
    }
    
    if(this.estilosSubmit.every(estilo => estilo.nombre.trim() !== '') && this.estilosSubmit.length == 8 && this.error !== true){
      this.btnSubmit = true;
    }
  }

  corregirValorActual(valor: string): string{
    const trim = valor.trim();
    const lowerCased = trim.toLowerCase();
    const valorInput = lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
    return valorInput;
  }

  corregirArray(){
    this.estilosSubmit = this.estilosSubmit.map(item => {
      const trim = item.nombre.trim();
      const lowerCased = trim.toLowerCase();
      const estilosSubmit = lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
      return {nombre: estilosSubmit};
    });
  }

  submit(): any {
    this.pasos.producto.estilos = this.estilosSubmit;
    //------
    this.pasos.paso5 = true;
    this.router.navigate(['/vender', 'formulario', 'paso5']);
  }

  atras(): void {
    this.pasos.producto.estilos = this.estilosSubmit;
    this.router.navigate(['/vender', 'formulario', 'paso3']);
  }
}
