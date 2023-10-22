import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, DocumentReference, getDoc } from '@angular/fire/firestore';
import { DespachoDemorado, Reclamo, Venta } from 'src/app/interfaces/venta';
import { MetricasService } from 'src/app/servicios/perfil/metricas/metricas.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-atencion-compradores',
  templateUrl: './atencion-compradores.component.html',
  styleUrls: ['./atencion-compradores.component.scss']
})
export class AtencionCompradoresComponent {
  constructor(private auth: Auth, private authService: AuthService, private renderer: Renderer2, private el: ElementRef, private metricasService: MetricasService) {}
  periodoTiempo!: string;
  fechasString: string[] = [];
  fechas: Date[] = [];
  fechasMensualStringSubGrupos: string[][] = [];
  fechasMensualString: string[] = [];
  fechasMensual: Date[] = [];

  despachosDemoradosSegunFecha: number[] = [];
  porcentajesDespachosDemorados!: number[];
  despachosDemoradosHoy!: number;
  divicionesDespachosDemorados: number[] = [];

  despachosDemoradosTotalesMensual: number[][] = [];
  despachosDemoradosSegunFechaMensual: number[] = [];
  porcentajesDespachosDemoradosMensual!: number[];
  despachosDemoradosHoyMensual!: number;
  divicionesDespachosDemoradosMensual: number[] = [];

  reclamos!: number;
  cancelaciones!: number;
  devoluciones!: number;
  cancelacionesPorcentaje!: number;
  devolucionesPorcentaje!: number;

  reclamosMensual!: number;
  cancelacionesMensual!: number;
  devolucionesMensual!: number;
  cancelacionesPorcentajeMensual!: number;
  devolucionesPorcentajeMensual!: number;

  sinReclamos = true;

  ngOnInit(): void {
    this.metricasService.periodoTiempo.subscribe(valor => this.periodoTiempo = valor);
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.obtenerFechas();
        this.obtenerFechasMensual()
        this.obtenerUsuario();
      }
    })
  }

  obtenerFechas(){
    let hoy = new Date();
    let meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    for(let i=6; i>=0; i--) {
      let fecha = new Date();
      fecha.setDate(hoy.getDate() - i);
      this.fechas.push(fecha);
      this.fechasString.push(`${fecha.getDate()} ${meses[fecha.getMonth()]}`);
    }
  }
  obtenerFechasMensual(){
    let hoy = new Date();
    let meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    let subGrupos = [];
    for(let i = 0; i < 28; i++) {
      let fecha = new Date();
      fecha.setDate(hoy.getDate() - i);
      this.fechasMensual.unshift(fecha);
      subGrupos.unshift(`${fecha.getDate()} ${meses[fecha.getMonth()]}`);
      if((i + 1) % 4 == 0){
        this.fechasMensualStringSubGrupos.unshift([...subGrupos]);
        this.fechasMensualString.unshift(subGrupos[0]);
        subGrupos = [];
      }
    }
  }

//-------------------------------------------------------------

  async obtenerUsuario(){
    if(this.auth.currentUser){
      const usuario = await this.authService.getUsuarioIdPromise(this.auth.currentUser.uid);
      const ventasRef = usuario.ventas;
      if(ventasRef){
        this.obtenerVentas(ventasRef);
      }
    }
  }

  async obtenerVentas(ventasRef: DocumentReference<DocumentData>[]) {
    let despachosDemorados: DespachoDemorado[] = [];
    let reclamos: Reclamo[] = [];
    const ventasSnapshots = await Promise.all(ventasRef.map((ref:any) => getDoc(ref)));
    ventasSnapshots.forEach(productSnapshot => {
      const vnta = productSnapshot.data() as Venta;
      if(vnta.despachosDemorados){
        despachosDemorados = vnta.despachosDemorados;
      }
      if(vnta.reclamos){
        reclamos = vnta.reclamos
      }
    });
    this.obtenerDatosDespachosDem(despachosDemorados);
    this.obtenerDatosDespachosDemMensual(despachosDemorados);
    this.obtenerReclamos(reclamos);
    this.obtenerReclamosMensual(reclamos);
  }


//----------------------- DESPACHOS (Semana) ---------------------------------

  obtenerDatosDespachosDem(despachos: DespachoDemorado[]){
    for(let fecha of this.fechas){
      let cantidadDespachosDemorados = 0;
      despachos.forEach((despacho)=>{
        const timestamp = despacho.fecha;
        const fechaFirestore = new Date(timestamp.seconds * 1000);
        if(this.sonMismoDia(fechaFirestore, fecha)){
          cantidadDespachosDemorados++
        }
      })
      this.despachosDemoradosSegunFecha.push(cantidadDespachosDemorados);
    }
    this.despachosDemoradosHoy = this.despachosDemoradosSegunFecha[this.despachosDemoradosSegunFecha.length - 1];
    this.obtenerPorcentajesDespachosDem();
  }

  obtenerPorcentajesDespachosDem(){
    let numeroMayor = Math.max(...this.despachosDemoradosSegunFecha);
    while (numeroMayor % 5 !== 0) {
      numeroMayor++;
    }
    this.porcentajesDespachosDemorados = ( this.despachosDemoradosSegunFecha.map(num => (num / numeroMayor)));

    const multiplo = numeroMayor / 5;
    for(let i = 5; i > 0; i--) {
        this.divicionesDespachosDemorados.push(multiplo * i);
    }
  }
//----------------------- DESPACHOS (Mes) ---------------------------------

  obtenerDatosDespachosDemMensual(despachos: DespachoDemorado[]){
    let cantidadDespachosDemorados = 0;
    let cantidadDespachosDemoradosPorDia = 0;
    let grupoDespachos = [];
    for(let i = 0; i < this.fechasMensual.length; i++){
      let fecha = this.fechasMensual[i];
      despachos.forEach((despacho)=>{
        const timestamp = despacho.fecha;
        const fechaFirestore = new Date(timestamp.seconds * 1000);
        if(this.sonMismoDia(fechaFirestore, fecha)){
          cantidadDespachosDemorados++
          cantidadDespachosDemoradosPorDia++
        }
      })
      grupoDespachos.push(cantidadDespachosDemoradosPorDia);
      cantidadDespachosDemoradosPorDia = 0;
      if((i + 1) % 4 == 0){ // Si hemos procesado un grupo de 4 Dias
        this.despachosDemoradosTotalesMensual.push([...grupoDespachos]);
        grupoDespachos = [];
        this.despachosDemoradosSegunFechaMensual.push(cantidadDespachosDemorados);
        cantidadDespachosDemorados = 0; // Reseteamos la cuenta para el próximo grupo de 4 Dias
      }
    }
    this.despachosDemoradosHoyMensual = this.despachosDemoradosSegunFechaMensual[this.despachosDemoradosSegunFechaMensual.length - 1];
    this.obtenerPorcentajesDespachosDemMensual();
  }

  obtenerPorcentajesDespachosDemMensual(){
    let numeroMayor = Math.max(...this.despachosDemoradosSegunFechaMensual);
    while (numeroMayor % 5 !== 0) {
      numeroMayor++;
    }
    this.porcentajesDespachosDemoradosMensual = ( this.despachosDemoradosSegunFechaMensual.map(num => (num / numeroMayor)));

    const multiplo = numeroMayor / 5;
    for(let i = 5; i > 0; i--) {
        this.divicionesDespachosDemoradosMensual.push(multiplo * i);
    }
  }

//----------------------- RECLAMOS (Semana) --------------------------

  obtenerReclamos(reclamos: Reclamo[]){
    let cantidadReclamos = 0;
    let reclamosCancelacion = 0;
    let reclamosDevolucion = 0;
    for(let fecha of this.fechas){
      reclamos.forEach((reclamo)=>{
        const timestamp = reclamo.fecha;
        const fechaFirestore = new Date(timestamp.seconds * 1000);
        if(this.sonMismoDia(fechaFirestore, fecha)){
          cantidadReclamos++
          if(reclamo.accion == 'cancelacion'){
            reclamosCancelacion++
          }else{
            reclamosDevolucion++
          }
        }
      })
    }
    this.reclamos = cantidadReclamos;
    this.cancelaciones = reclamosCancelacion;
    this.devoluciones = reclamosDevolucion;
    this.obtenerPorcentajesReclamos();
  }

  obtenerPorcentajesReclamos(){
    if(this.cancelaciones == 0 && this.devoluciones == 0){
      this.sinReclamos = true;
      return;
    }
    this.sinReclamos = false;
    this.cancelacionesPorcentaje = (this.cancelaciones / (this.cancelaciones + this.devoluciones)) * 100;
    this.devolucionesPorcentaje = (this.devoluciones / (this.cancelaciones + this.devoluciones)) * 100;
  }

//----------------------- RECLAMOS (mes) --------------------------

  obtenerReclamosMensual(reclamos: Reclamo[]){
    let cantidadReclamos = 0;
    let reclamosCancelacion = 0;
    let reclamosDevolucion = 0;
    for(let fecha of this.fechasMensual){
      reclamos.forEach((reclamo)=>{
        const timestamp = reclamo.fecha;
        const fechaFirestore = new Date(timestamp.seconds * 1000);
        if(this.sonMismoDia(fechaFirestore, fecha)){
          cantidadReclamos++
          if(reclamo.accion == 'cancelacion'){
            reclamosCancelacion++
          }else{
            reclamosDevolucion++
          }
        }
      })
    }
    this.reclamosMensual = cantidadReclamos;
    this.cancelacionesMensual = reclamosCancelacion;
    this.devolucionesMensual = reclamosDevolucion;
    this.obtenerPorcentajesReclamosMensual();
  }

  obtenerPorcentajesReclamosMensual(){
    if(this.cancelacionesMensual == 0 && this.devolucionesMensual == 0){
      this.sinReclamos = true;
      return;
    }
    this.sinReclamos = false;
    this.cancelacionesPorcentajeMensual = (this.cancelacionesMensual / (this.cancelacionesMensual + this.devolucionesMensual)) * 100;
    this.devolucionesPorcentajeMensual = (this.devolucionesMensual / (this.cancelacionesMensual + this.devolucionesMensual)) * 100;
  }


//-----------------------------------------

  sonMismoDia(fecha1: Date, fecha2: Date) {
    return fecha1.getFullYear() === fecha2.getFullYear() && fecha1.getMonth() === fecha2.getMonth() && fecha1.getDate() === fecha2.getDate();
  }

  texto!: number;

  total!: number;
  fechasDiv!: string[];
  cantidadDia!: number[];
  showTooltip = false;
  x = 0;
  y = 0;

  onMouseOver(event: MouseEvent, index: number) {
    if(this.periodoTiempo == 'semanal'){
      this.texto = this.despachosDemoradosSegunFecha[index];
    }
    if(this.periodoTiempo == 'mensual'){
      this.total = this.despachosDemoradosTotalesMensual[index].reduce((acumulador, valorActual) => acumulador + valorActual, 0);
      this.fechasDiv = this.fechasMensualStringSubGrupos[index];
      this.cantidadDia = this.despachosDemoradosTotalesMensual[index];
    }
    this.showTooltip = true;
    this.updateTooltipPosition(event);
  }

  onMouseMove(event: MouseEvent) {
    this.updateTooltipPosition(event);
  }

  onMouseOut() {
    this.showTooltip = false;
  }

  updateTooltipPosition(event: MouseEvent) {
    this.x = event.clientX + 16;
    this.y = event.clientY + 5;
  }
}
