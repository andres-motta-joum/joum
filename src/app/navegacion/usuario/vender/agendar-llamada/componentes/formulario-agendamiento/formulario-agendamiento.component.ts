import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-agendamiento',
  templateUrl: './formulario-agendamiento.component.html',
  styleUrls: ['./formulario-agendamiento.component.scss']
})
export class FormularioAgendamientoComponent {
  constructor(private zone: NgZone, private router: Router, private fb: FormBuilder, private firestore: Firestore){}
  @Output() success =  new EventEmitter<void>()
  private readonly emailattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  private readonly nombreApellidoPattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,20}$/;
  private readonly telefonoPattern = /^\d{7,10}$/;
  form!: FormGroup;
  async ngOnInit(): Promise<void> {
    this.asignarFormulario();
  }

  asignarFormulario(){
    this.form = this.fb.group({
      nombre: [ '', [Validators.required, Validators.minLength(2), Validators.pattern(this.nombreApellidoPattern)] ],
      apellido: [ '', [Validators.required, Validators.minLength(2), Validators.pattern(this.nombreApellidoPattern)] ],
      telefono: [ '', [Validators.required, Validators.pattern(this.telefonoPattern)] ],
      correo: [ '', [Validators.required, Validators.pattern(this.emailattern)] ],
    });      
  }

  invalid(field: string) {
    return this.form.controls[field].invalid && this.form.controls[field].touched;
  }

  async submit(horario: any){
    Object.values(this.form.controls).forEach(control => {
      if (typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
      control.markAsTouched();
    });
    if (this.form.valid) {
      this.success.emit();
      const numDia = Number(horario.dia[1]);
      const agendamiento = {dia: numDia, hora: horario.hora, ...this.form.value};
      const diasRef = doc(this.firestore, 'agendamientos/dias');
      const snapshotDias = await getDoc(diasRef);
      let dias = snapshotDias.data() as any;
      dias[horario.dia[0]].push(horario.hora);
      await setDoc(diasRef, dias, {merge: true});
      await addDoc(collection(this.firestore, 'agendamientos'), agendamiento);
      this.form.reset();
    }
  }

  navegar(ruta : any[], event:Event){
    event.preventDefault();
    this.zone.run(()=>{
      this.router.navigate(ruta);
      scroll(0,0)
    })
  }
}
