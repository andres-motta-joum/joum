import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';
import { provideIcons } from '@ng-icons/core';
import { heroArrowSmallLeft } from '@ng-icons/heroicons/outline';
import { ionCheckmarkSharp } from '@ng-icons/ionicons';
import { ionInformationCircleOutline } from '@ng-icons/ionicons';
import { aspectsInformation } from '@ng-icons/ux-aspects';
import { Producto } from 'src/app/interfaces/producto/producto';
import { DocumentData, DocumentReference, Firestore, addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ref, uploadBytes, Storage, getDownloadURL } from '@angular/fire/storage';
import { Auth, user } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { listAll } from 'firebase/storage';

@Component({
  selector: 'app-paso-diez',
  templateUrl: './paso-diez.component.html',
  styleUrls: ['./paso-diez.component.scss'],
  providers: [provideIcons({heroArrowSmallLeft, ionCheckmarkSharp, ionInformationCircleOutline, aspectsInformation})]
})
export class PasoDiezComponent implements OnInit{
  constructor( private pasos: PasosVenderService, private router: Router, private firestore: Firestore, private storage: Storage, private auth: Auth) {}
  submitValue = false;
  gratuito = false;
  basico = false;
  premium = false;

  precioBasico!: number;
  precioPremium!: number;

  cargando = false; //Barra de carga

  gratuita = true;
  verDetalles = false;

  ngOnInit(): void {
    this.pasos.paso7 ? this.definirPrecios() : this.router.navigate(['/vender', 'formulario', 'paso6']);
  }

  definirPrecios(){
    const estilos = this.pasos.producto.estilos;
    if(estilos.length > 1 || estilos[0].unidades > 1){
      this.gratuita = false;
    }
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

  capitalizarNombreProducto(nombre: string): string {
    const nombreTrim = nombre.trim();
    const nombreLower = nombreTrim.toLowerCase();
    const palabras = nombreLower.split(' ');

    const palabrasCapitalizadas = palabras.map((palabra) => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    });

    const resultado = palabrasCapitalizadas.join(' ');
  
    return resultado;
  }

  tipoPublicacionSeleccionada(){
    if(this.gratuito){
      this.pasos.producto.tipoPublicacion = 'gratuita'
    }else if(this.basico){
      this.pasos.producto.tipoPublicacion = 'basica'
    }else if(this.premium = true){
      this.pasos.producto.tipoPublicacion = 'premium'
    }
  }

  estructurarDetalles(detalles: any): any {
    const unidadesMedida = ['altura', 'ancho', 'diametro', 'diametroBase','diametroBoca', 'largo', 'peso', 'profundidad','volumen', 'potencia', 'temperaturaColor'];
    const bombillos = ['forma', 'sistemasOperativosCompatibles','apliacionesCompatibles', 'giratorio', 'tipoRosca'];
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
        if (estilo.fotos[i] === '') {
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

  definirDetalles(){
    const producto = this.pasos.producto;
    producto.nombre = this.capitalizarNombreProducto(producto.nombre); // Corregir nombre ingresado para mejorar motor de busqueda
    const detalles = this.estructurarDetalles(producto.detalles); //Modificar, eliminar o agregar datos importantes a los detalles
    producto.detalles = detalles;
    //----- Detalles secundarios -----
    producto.idUsuario = this.auth.currentUser?.uid;
    producto.vistas = 0;
    producto.opiniones = [];
    producto.ventas = 0;
    producto.estado = true;
    producto.fecha = new Date();
    producto.precioEnvio = 10000;
  }

  get $excluirFotosProducto(): Producto { //Excluir fotos en Firestore
    const productoCopy = JSON.parse(JSON.stringify(this.pasos.producto));
    productoCopy.estilos.forEach((estilo: any) => { 
      delete estilo.fotos;
    });
    return productoCopy;
  }

  async subirProductoFirestore(producto: Producto): Promise<void>{
    this.cargando = true;
    const productoRef = await addDoc(collection(this.firestore, "productos"), producto);
    const userRef = doc(this.firestore, "usuarios", this.auth.currentUser?.uid!);
    // Obtén el documento actual
    const snapshot = await getDoc(userRef);
    const usuario = snapshot.data() as Usuario;

    if (!usuario.diasComoVendedor) { //Si no existe agregarla más publicaciones
      await updateDoc(userRef, {
        diasComoVendedor: 0,
        publicaciones: arrayUnion(productoRef)
      });
    } else { //Si existe agregar solo publicaciones
      await updateDoc(userRef, {
        publicaciones: arrayUnion(productoRef)
      });
    }
    
    await this.subirFotos(productoRef.id);
    await this.agregarNotificacion(userRef, productoRef.id);
    this.cargando = false;
  }

  async subirFotos(idProducto: string){
    await this.pasos.producto.estilos.forEach((estilo: any, i: any) => {
      estilo.fotos.forEach((foto: any, index: any) => {
        const storageRef = ref(this.storage, `${idProducto}/${i + 1}:${estilo.nombre}/${index + 1}`);
        uploadBytes(storageRef, foto);
      });
    });
  }

  async agregarNotificacion(usuarioRef: DocumentReference<DocumentData>, productoId: string){
    const productoRef = ref(this.storage, `${productoId}`);
    const response = await listAll(productoRef);
    let url = '';
    if (response.prefixes.length > 0) {
      const firstFolderRef = response.prefixes[0];
      const firstFolderResponse = await listAll(firstFolderRef);
      url = await getDownloadURL(firstFolderResponse.items[0]);
    }
    
    await updateDoc(usuarioRef, {
      notificaciones: arrayUnion({
        foto: url,
        titulo: 'Felicidades',
        contenido: `Has publicado un nuevo producto`,
        fecha: new Date(),
        tipo: 'ofertasDecuentos',
        link: `prod/${productoId}`,
        visto: false,
      })
    })
  }

  async submit(): Promise<any> {
    this.tipoPublicacionSeleccionada();
    this.definirDetalles();
    await this.subirProductoFirestore(this.$excluirFotosProducto);
    this.pasos.restablecerDatos();
    this.router.navigate(['']);
  }

  atras(): void {
    this.tipoPublicacionSeleccionada();
    this.router.navigate(['/vender', 'formulario', 'paso9']);
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event: any): void {
      $event.returnValue = true;
  }
}
