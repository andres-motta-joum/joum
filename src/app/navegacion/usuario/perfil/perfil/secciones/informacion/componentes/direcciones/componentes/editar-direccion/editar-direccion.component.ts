import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';
import { firstValueFrom } from 'rxjs';
import { ionChevronDown } from '@ng-icons/ionicons';
import { matCheck } from '@ng-icons/material-icons/baseline';
import { Direccion } from 'src/app/interfaces/usuario/subInterfaces/direccion';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { ComprarService } from 'src/app/servicios/comprar/comprar.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-direccion',
  templateUrl: './editar-direccion.component.html',
  styleUrls: ['./editar-direccion.component.scss'],
  providers: [provideIcons({ionClose, ionChevronDown, matCheck})]
})
export class EditarDireccionComponent {
  @Input() direccion!: Direccion | undefined;
  @Input() direccionIndex!: number | undefined;
  @Output() cerrar = new EventEmitter<void>();

  constructor(private zone: NgZone, private router: Router, private fb: FormBuilder, private comprarService: ComprarService, private auth: Auth, private authService: AuthService, private firestore: Firestore){}
  private usuario!: Usuario;
  cargando = false;
  actualizacionExitosa = false;
  form!: FormGroup;
  async ngOnInit(): Promise<void> {
    await this.obtenerUsuario();
    if(this.direccion){
      this.direccion.direccionPredeterminada = true;
      this.asignarFormulario(this.direccion);
    }else{
      this.asignarFormulario();
    }
    
  }
  async obtenerUsuario(){
    const usuario$ = this.authService.getUsuarioId(this.auth.currentUser?.uid!);
    const usuario = await firstValueFrom(usuario$);
    this.usuario = usuario;
  }

  asignarFormulario(direccion?: any){
    this.form = this.fb.group({
      nombresApellidos: [ direccion ? direccion.nombresApellidos : '', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$'), Validators.pattern('^.*\\s.*$')] ],
      telefono: [ direccion ? direccion.telefono : '', [Validators.required, Validators.pattern('^[0-9]{10}$')] ],
      tipoIdentidad: [ direccion ? direccion.tipoIdentidad : '', [Validators.required] ],
      numeroIdentificacion: [ direccion ? direccion.numeroIdentificacion : '', [Validators.required, Validators.pattern('^\\d{10}$')] ],
      municipioLocalidad: [ direccion ? direccion.municipioLocalidad : '', [Validators.required] ],
      barrio: [ direccion ? direccion.barrio : '', [Validators.required, Validators.minLength(4), Validators.maxLength(30)] ],
      tipoCalle: [ direccion ? direccion.direccion[0] : '', [Validators.required] ],
      calle: [ direccion ? direccion.direccion[1] : '', [Validators.required, Validators.maxLength(10)]],
      numero: [ direccion ? direccion.direccion[2] : '', [Validators.required, Validators.maxLength(10)]],
      guion: [ direccion ? direccion.direccion[3] : '', [Validators.maxLength(10)]],
      detalle: [ direccion ? direccion.detalle : '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)] ],
      indicaciones: [ direccion ? direccion.indicaciones : '', [Validators.maxLength(100)]]
    });      
}


  invalid(field: string) {
    return this.form.controls[field].invalid && this.form.controls[field].touched;
  }

  async submit(){
    Object.values(this.form.controls).forEach(control => {
      if (typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
      control.markAsTouched();
    });
    if (this.form.valid) {
      this.cargando = true;
      const { tipoCalle, calle, numero, guion, ...rest } = this.form.value;
      const direccion = [tipoCalle, calle, numero, guion];
      let newValues = { ...rest, direccion };
      newValues.direccionPredeterminada = true;

      if(this.direccion){ //Modificar
        const usuarioRef = doc(this.firestore, '/usuarios/' + this.auth.currentUser!.uid);
        const direcciones = this.usuario.direcciones!;
        for(let dir of direcciones){
          dir.direccionPredeterminada = false;
        }
        direcciones[this.direccionIndex!] = newValues;
        await setDoc(usuarioRef, {direcciones: direcciones}, {merge: true});
      }else{ //Agregar
        await this.comprarService.agregarDireccion(this.usuario, newValues);
      }
      this.actualizacionExitosa = true;
      setTimeout(()=>{
        this.cerrarContenido();
      }, 1600)
    }
  }

  navegar(ruta : any[], event:Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      scroll(0,0)
    })
  }

  cerrarContenido(){
    this.cerrar.emit();
  }

  ngOnDestroy(): void {
    this.comprarService.agregarDir = false;
    this.comprarService.modificarDir = false;
  }
}
