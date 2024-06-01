import { Component, ViewChild } from '@angular/core';
import { FormularioAgendamientoComponent } from './componentes/formulario-agendamiento/formulario-agendamiento.component';
import { AgendaDisponibleComponent } from './componentes/agenda-disponible/agenda-disponible.component'; 

@Component({
  selector: 'app-agendar-llamada',
  templateUrl: './agendar-llamada.component.html',
  styleUrls: ['./agendar-llamada.component.scss']
})
export class AgendarLlamadaComponent {
  @ViewChild(FormularioAgendamientoComponent) formulario!: FormularioAgendamientoComponent;
  @ViewChild(AgendaDisponibleComponent) agenda!: AgendaDisponibleComponent;
  mostrarFormulario = true;
  fechaAgendada = false;

  agendar(horario: any){
    this.formulario.submit(horario);
  }
  success(){
    this.agenda.success();
    setTimeout(()=>{
      this.fechaAgendada = true;
      setTimeout(()=>{
        this.mostrarFormulario = false;
      },2000)
    },1200)
  }
}
