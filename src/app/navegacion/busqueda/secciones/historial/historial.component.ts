import { Component, NgZone } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { DocumentData, DocumentSnapshot, Firestore, deleteField, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {

  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute,private prdsService: ProductosService, private authService: AuthService, private auth: Auth, private firestore: Firestore){}

  private routeSubscription!: Subscription;
  public usuario!: Usuario | undefined;
  registroHistorial: boolean = true;
  productos: Producto[] = [];

  public url!: string;
  ngOnInit() {
    this.auth.onAuthStateChanged(async (usuario)=>{
      if(usuario){
        const url = (this.router.url).split('/')[1]; //obtener usuario en url para comparar con usuario en auth
        const miUsuario = await this.authService.getUsuarioIdPromise(usuario.uid);
        if(miUsuario.usuario == url){
          this.usuario = miUsuario;
          this.registroHistorial = miUsuario.registroHistorial!;
          this.obtenerProductos();
        }else{
          this.router.navigate(['']); //Existe, pero no es mi historial
        }
      }else{
        this.router.navigate(['cuenta/crear-cuenta']); //Fuera de usuario
      }
    })
  }

  async obtenerProductos() {
    if (this.usuario?.historial) {
      const productosRef = await Promise.all(this.usuario?.historial.map((ref:any) => getDoc(ref) as Promise<DocumentSnapshot<DocumentData>>));
      productosRef.forEach(productSnapshot => {
        const prd = productSnapshot.data() as Producto;
        prd.id = productSnapshot.id;
        this.productos.unshift(prd);
      });
    }
  }

  navegar( ruta: any[], event: Event): void{
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      window.scroll(0,0)
    })
  }
  async onButtonClick(): Promise<void> {
    this.registroHistorial = !this.registroHistorial;
    const usaurioRef = doc(this.firestore, `usuarios/${this.usuario!.id}`);
    await updateDoc(usaurioRef, {registroHistorial: this.registroHistorial});
  }

  async eliminarHistorial(){
    this.productos = [];
    const usaurioRef = doc(this.firestore, `usuarios/${this.usuario!.id}`);
    await updateDoc(usaurioRef, {historial: deleteField()});
  }

  async eliminarProductoHistorial(index: number){
    const indexInverso = this.productos.length - 1 - index;
    this.productos.splice(indexInverso, 1);
    this.usuario!.historial!.splice(index, 1);
    const usaurioRef = doc(this.firestore, `usuarios/${this.usuario!.id}`);
    await setDoc(usaurioRef, {historial: this.usuario!.historial}, {merge: true});
  }
}
