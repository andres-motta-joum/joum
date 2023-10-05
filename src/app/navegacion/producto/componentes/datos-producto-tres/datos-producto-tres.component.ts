import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DetallesIluminacion } from 'src/app/interfaces/producto/categorias/detalles-iluminacion';
import { Producto } from 'src/app/interfaces/producto/producto';

@Component({
  selector: 'app-datos-producto-tres',
  templateUrl: './datos-producto-tres.component.html',
  styleUrls: ['./datos-producto-tres.component.scss']
})
export class DatosProductoTresComponent {
  @Input() producto!: Producto;
  public detalles!: string[][]; // se guardan los datos de todos los detalles en formato de string[][]
  public detallesDimensiones!: string[][]; // se guardan los detalles de las dimensiones en formato de string[][]
  ordenDeseado = [
    'Altura', 'Unidad medida altura',
    'Ancho', 'Unidad medida ancho',
    'Largo', 'Unidad medida largo',
    'Diametro boca', 'Unidad medida diametro boca',
    'Diametro base', 'Unidad medida diametro base',
    'Volumen', 'Unidad medida volumen',
    'Peso', 'Unidad medida peso',
    'Profundidad', 'Unidad medida profundidad',
    'Diametro', 'Unidad medida diametro'
  ];
  
  //-------------- ASIGNACIÓN DE VARIABLES ------------
  ngOnInit(){
    const detalles = this.producto.detalles;
    this.detalles = this.convertircontrasenasTexto(this.convertirArray(detalles));
    this.detallesDimensiones = this.convertircontrasenasTexto(this.organizarDimensiones());
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['producto']) {
      const detalles = this.producto.detalles;
      this.detalles = this.convertircontrasenasTexto(this.convertirArray(detalles));
      this.detallesDimensiones = this.convertircontrasenasTexto(this.organizarDimensiones());
    }
  }
  //----------------------------------------------- FUNCIONES -------------------------

  convertirArray(obj: any): string[][] {
    const result: string[][] = [];
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        result.push([prop, obj[prop]]);
      }
    }
    return result;
  }

  ValoresAEvitar(valor: string): boolean {
    const valoresAEvitar = ['Altura', 'Unidad medida altura', 'Ancho', 'Unidad medida ancho', 'Largo', 'Unidad medida largo', 'Diametro boca', 'Unidad medida diametro boca', 'Diametro base', 'Unidad medida diametro base', 'Volumen', 'Unidad medida volumen', 'Peso', 'Unidad medida peso','Profundidad', 'Unidad medida profundidad', 'Diametro', 'Unidad medida diametro'];
    return valoresAEvitar.includes(valor);
  }

  organizarDimensiones(){
    const nuevoArray: string[][] = []; // aquí se guarda el array de medidas, donde se combina la unidad de medida con las dimensiones
    const datos: string[][] = []; //Aquí se asigna todos los datos que son sobre medidas
    for( let detalle of this.detalles){
      if(this.ValoresAEvitar(detalle[0]) && detalle[0] !== 'Fotos' && detalle[0] !== 'Sub categoria'){
        datos.push([detalle[0],detalle[1]]);
      }
    }
    datos.sort((a, b) => {
      const indexA = this.ordenDeseado.indexOf(a[0]);
      const indexB = this.ordenDeseado.indexOf(b[0]);
      return indexA - indexB;
    });
    for (let i = 0; i < datos.length; i += 2) {
      const medida = datos[i][1];
      const unidadMedida = datos[i + 1][1];
      nuevoArray.push([datos[i][0], `${medida} ${unidadMedida}`]);
    }
    
    return nuevoArray
  }

  obtenerDimensionesSubCategoria(){
    const nuevoArray: string[][] = []; // aquí se guarda el array de medidas, donde se combina la unidad de medida con las dimensiones
    const datos: string[][] = []; //Aquí se asigna todos los datos que son sobre medidas
    
    for (let i = 0; i < datos.length; i += 2) {
      const medida = datos[i][1];
      const unidadMedida = datos[i + 1][1];
      nuevoArray.push([datos[i][0], `${medida} ${unidadMedida}`]);
    }
    
    return nuevoArray
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  convertircontrasenasTexto(array: string[][]): string[][] { // Corregimos y quitamos el tipo de texto camel case, a tecto normal
    return array.map(detalle => {
      const words = detalle[0].split(/(?=[A-Z])/);
      const formattedWords = words.map((word, index) => {
        let formattedWord = index === 0 ? this.capitalize(word) : word.toLowerCase();
        formattedWord = formattedWord.replace('Diametro base', 'Diámetro de la base').replace('Diametro boca', 'Diámetro de la boca')
        .replace('Tematica', 'Temática')
        .replace('Cantidad', 'Cantidad de').replace('Kit', 'Kit de')
        .replace('Tecnologia', 'Tecnología de')
        .replace('de', '').replace('Molo', 'Modelo')
        .replace('Autoria', 'Autoría').replace('Agujeros', 'Agujeros de').replace('Sistema', 'Sistema de').replace('Unidades', 'Unidades por').replace('Formato', 'Formato de'); //Macetas
        return formattedWord;
      });
    
      let value = detalle[1];
      if (typeof value === 'boolean') {
        value = value ? 'Sí' : 'No';
      }
    
      return [formattedWords.join(' '), value];
    });
  }
}
