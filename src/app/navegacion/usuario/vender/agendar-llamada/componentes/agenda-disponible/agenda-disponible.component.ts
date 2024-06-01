import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';
import { matCheck } from '@ng-icons/material-icons/baseline';

interface diasAgendimientos {
  [key: string]: string[];
  dom: string[];
  lun: string[];
  mar: string[];
  mie: string[];
  jue: string[];
  vie: string[];
  sab: string[];
}

@Component({
  selector: 'app-agenda-disponible',
  templateUrl: './agenda-disponible.component.html',
  styleUrls: ['./agenda-disponible.component.scss'],
  providers: [provideIcons({ionClose, matCheck})]
})
export class AgendaDisponibleComponent implements OnInit{
  constructor(private firestore: Firestore){}
  @Output() agendamiento =  new EventEmitter<any>()
  agendamientos!: diasAgendimientos;
  fechaDias: string[][] = [];
  horas: string[] = [];
  actualizacionExitosa = false;

  dias!: string[];
  fechaSeleccionada: number = 0;
  horaSeleccionada: number = 0;

  anchoPagina: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.anchoPagina = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  async obtenerDatos(){
    const agendamientosRef = doc(this.firestore, "agendamientos/dias");
    const snapshot =  await getDoc(agendamientosRef);
    this.agendamientos = snapshot.data() as diasAgendimientos;
    this.fechaDias = [];
    this.obtenerFechas();
  }

  obtenerFechas(){
    let hoy = new Date();
    this.dias = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
    let mesesCortos = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    for(let i = 0; i <= 6; i++){
      let fecha = new Date();
      fecha.setDate(hoy.getDate() + i);
      if(this.obtenerHoras(fecha.getDay(), false)){
        this.fechaDias.push([`${this.dias[fecha.getDay()]}`, `${fecha.getDate()}`, `${mesesCortos[fecha.getMonth()]}`]);
      }
    }

    let primerosHorarios = false;
    if(this.obtenerHoras(hoy.getDay(), true)){
      primerosHorarios = true;
    }else{
      this.fechaDias.splice(0, 1); //Eliminar el día actual, se paso de las horas limite
      for(let i = 1; i <= 6; i++){
        if(!primerosHorarios){
          let fecha = new Date();
          fecha.setDate(hoy.getDate() + i);
          if( this.obtenerHoras(fecha.getDay(), false)){
            primerosHorarios = true;
          }else{
            this.fechaDias.splice(i, 1);
          }
        }
      }
    }
  }

  obtenerHoras(indexSemana: number, hoy: boolean): any{
    if (indexSemana === 0) {
      this.horas = ['3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm']; // Domingo
    } else if (indexSemana >= 1 && indexSemana <= 5) {
      this.horas = ['2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm']; // Lunes a Viernes
    } else if (indexSemana === 6) {
      this.horas = ['3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm']; // Sábado
    }

    const dia = this.dias[indexSemana];
    const agendados = this.agendamientos[dia];
    if(agendados.length !== 0){
      agendados.forEach(horaAgendada => {
        const indexHora = this.horas.findIndex((hora)=> hora == horaAgendada);
        this.horas.splice(indexHora, 1);
      });
    }
    if(hoy){
      this.eliminarHorasPasadas()
    }

    //Verificar disponibilidad
    if(this.horas.length == 0){
      return false
    }else{
      return true
    }
  }

  eliminarHorasPasadas() {
    const horaActual = new Date().getHours(); // Obtiene la hora actual
    const minutosActuales = new Date().getMinutes(); // Obtiene los minutos actuales
    const horasFiltradas = this.horas.filter(hora => {
      let horaActualMasUna = horaActual + 1; // Calcula la hora actual más una hora
      const horaArray = parseInt(hora.split(':')[0]); 
      const minutosArray = parseInt(hora.split(':')[1].substring(0, 2)); 
      const amPm = hora.split(':')[1].substring(2); 
      if (amPm === 'pm') {
        if (horaActualMasUna < 12) {
          return true;
        } else if(horaActualMasUna !== 12){
          horaActualMasUna = horaActualMasUna % 12
        }
      }
      if (horaArray === horaActualMasUna) {
        return minutosArray >= minutosActuales;
      } else {
        return horaArray > horaActualMasUna;
      }
    });

    this.horas = horasFiltradas;
  }

  seleccionarFecha(index: number){
    this.fechaSeleccionada = index;
    this.horaSeleccionada = 0;
    const diaSemana = this.dias.findIndex((dia)=> dia == this.fechaDias[index][0]);
    this.obtenerHoras(diaSemana, false);
  }
  seleccionarHora(index: number){
    this.horaSeleccionada = index;
  }

  submit(){
    let dia = this.fechaDias[this.fechaSeleccionada];
    let hora = this.horas[this.horaSeleccionada];
    this.agendamiento.emit({dia: dia, hora: hora});
  }
  
  success(){
    this.actualizacionExitosa = true;
    this.horas.splice(this.horaSeleccionada, 1);
    if(this.horas.length == 0){
      this.fechaDias.splice(this.fechaSeleccionada, 1);
      this.fechaSeleccionada = 0;
      this.horaSeleccionada = 0;
      const diaSemana = this.dias.findIndex((dia)=> dia == this.fechaDias[0][0]);
      this.obtenerHoras(diaSemana, false);
    }
  }
}
