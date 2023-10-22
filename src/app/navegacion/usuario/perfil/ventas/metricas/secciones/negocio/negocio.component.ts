import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, DocumentReference, getDoc } from '@angular/fire/firestore';
import { Producto } from 'src/app/interfaces/producto/producto';
import { Venta } from 'src/app/interfaces/venta';
import { MetricasService } from 'src/app/servicios/perfil/metricas/metricas.service';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss']
})
export class NegocioComponent implements OnInit{
  constructor(private auth: Auth, private authService: AuthService, private renderer: Renderer2, private el: ElementRef, private metricasService: MetricasService) {}
  periodoTiempo!: string;
  fechasString: string[] = [];
  fechas: Date[] = [];
  fechasMensualStringSubGrupos: string[][] = [];
  fechasMensualString: string[] = [];
  fechasMensual: Date[] = [];

//----------------- Ventas brutas
  ventasBrutasSegunFecha: number[] = [];
  porcentajesVentasBrutas!: number[];
  ventasBrutasHoy!: number;
  divicionesVentasBrutas: number[] = [];

  ventasBrutasTotalesMensual: number[][] = [];
  ventasBrutasSegunFechaMensual: number[] = [];
  porcentajesVentasBrutasMensual!: number[];
  ventasBrutasHoyMensual!: number;
  divicionesVentasBrutasMensual: number[] = [];

//----------------- Ventas

  ventasSegunFecha: number[] = [];
  porcentajesVentas!: number[];
  ventasHoy!: number;
  divicionesVentas: number[] = [];

  ventasTotalesMensual: number[][] = [];
  ventasSegunFechaMensual: number[] = [];
  porcentajesVentasMensual!: number[];
  ventasHoyMensual!: number;
  divicionesVentasMensual: number[] = [];

//----------------- Vistas

  vistasSegunFecha: number[] = [];
  porcentajesVistas!: number[];
  vistasHoy!: number;
  divicionesVistas: number[] = [];

  vistasTotalesMensual: number[][] = [];
  vistasSegunFechaMensual: number[] = [];
  porcentajesVistasMensual!: number[];
  vistasHoyMensual!: number;
  divicionesVistasMensual: number[] = [];


  ngOnInit(): void {
    this.metricasService.periodoTiempo.subscribe(valor => this.periodoTiempo = valor);
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.obtenerFechas();
        this.obtenerFechasMensual();
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
      const productosRef = usuario.publicaciones;
      const ventasRef = usuario.ventas;
      if(productosRef){
        this.obtenerProductos(productosRef);
      }
      if(ventasRef){
        this.obtenerVentas(ventasRef);
      }
    }
  }

  //---------------------------------------------------------------------------

  async obtenerProductos(productosRef: DocumentReference<DocumentData>[]) {
    let productos: Producto[] = [];
    const publicacionesSnapshots = await Promise.all(productosRef.map((ref:any) => getDoc(ref)));
    publicacionesSnapshots.forEach(productSnapshot => {
      const prd = productSnapshot.data() as Producto;
      prd.id = productSnapshot.id;
      productos.push(prd);
    });
    this.obtenerVistas(productos);
    this.obtenerVistasMensual(productos);
  }

  async obtenerVentas(ventasRef: DocumentReference<DocumentData>[]) {
    let ventas: Venta[] = [];
    const ventasSnapshots = await Promise.all(ventasRef.map((ref:any) => getDoc(ref)));
    ventasSnapshots.forEach(productSnapshot => {
      const vnta = productSnapshot.data() as Venta;
      ventas.push(vnta);
    });
    this.obtenerDatosVentas(ventas);
    this.obtenerDatosVentasMensual(ventas);
    this.obtenerDatosVentasBrutas(ventas);
    this.obtenerDatosVentasBrutasMensual(ventas);
  }

//----------------------------------- VENTAS BRUTAS -----------------------------------------
    //-------------------------------------------------(Semanal)
    async obtenerDatosVentasBrutas(ventas: Venta[]){
      for(let fecha of this.fechas){
        let cantidadVentasBrutas = 0;
        for (const venta of ventas) {
          const timestamp = venta.fechaVenta;
          const fechaFirestore = new Date(timestamp.seconds * 1000);
          if(this.sonMismoDia(fechaFirestore, fecha)){
              const productosSnapshot = await Promise.all(venta.referencias.map((ref:any) => getDoc(ref.producto)));
              productosSnapshot.forEach(productSnapshot => {
                  const prd = productSnapshot.data() as Producto;
                  cantidadVentasBrutas += prd.precio;
              });
          }
      }
      this.ventasBrutasSegunFecha.push(cantidadVentasBrutas);
      }
      this.ventasBrutasHoy = this.ventasBrutasSegunFecha[this.ventasBrutasSegunFecha.length - 1];
      this.obtenerPorcentajesVentasBrutas();
    }

    obtenerPorcentajesVentasBrutas(){
      let numeroMayor = Math.max(...this.ventasBrutasSegunFecha);
      numeroMayor = this.redondearNumero(numeroMayor);
      this.porcentajesVentasBrutas = ( this.ventasBrutasSegunFecha.map(num => (num / numeroMayor)));

      const multiplo = numeroMayor / 5;
      for(let i = 5; i > 0; i--) {
          this.divicionesVentasBrutas.push(multiplo * i);
      }
    }

    //-------------------------------------------------(Mensual)
    async obtenerDatosVentasBrutasMensual(ventas: Venta[]){
      let cantidadVentasBrutas = 0;
      let cantidadVentasBrutasPorDia = 0;
      let grupoVentas = [];
      for(let i = 0; i < this.fechasMensual.length; i++){
        let fecha = this.fechasMensual[i];
        for (const venta of ventas) {
          const timestamp = venta.fechaVenta;
          const fechaFirestore = new Date(timestamp.seconds * 1000);
          if(this.sonMismoDia(fechaFirestore, fecha)){
              const productosSnapshot = await Promise.all(venta.referencias.map((ref:any) => getDoc(ref.producto)));
              productosSnapshot.forEach(productSnapshot => {
                  const prd = productSnapshot.data() as Producto;
                  cantidadVentasBrutas += prd.precio;
                  cantidadVentasBrutasPorDia += prd.precio;
              });
          }
        }
        grupoVentas.push(cantidadVentasBrutasPorDia);
        cantidadVentasBrutasPorDia = 0;
        if((i + 1) % 4 == 0){ // Si hemos procesado un grupo de 4 días
          this.ventasBrutasTotalesMensual.push([...grupoVentas]);
          grupoVentas = [];
          this.ventasBrutasSegunFechaMensual.push(cantidadVentasBrutas);
          cantidadVentasBrutas = 0; // Reseteamos la cuenta para el próximo grupo de 4 días
        }
      }
      this.ventasBrutasHoyMensual = this.ventasBrutasSegunFechaMensual[this.ventasBrutasSegunFechaMensual.length - 1];
      this.obtenerPorcentajesVentasBrutasMensual();
    }

    obtenerPorcentajesVentasBrutasMensual(){
      let numeroMayor = Math.max(...this.ventasBrutasSegunFechaMensual);
      numeroMayor = this.redondearNumero(numeroMayor);
      this.porcentajesVentasBrutasMensual = ( this.ventasBrutasSegunFechaMensual.map(num => (num / numeroMayor)));

      const multiplo = numeroMayor / 5;
      for(let i = 5; i > 0; i--) {
          this.divicionesVentasBrutasMensual.push(multiplo * i);
      }
    }

    //----- General
    redondearNumero(num: number) {
      let longitud = num.toString().length;
      let factor = Math.pow(10, longitud - 1);
      return Math.ceil(num / factor) * factor;
    }
//----------------------------------- VENTAS -----------------------------------------
    //-------------------------------------------------(Semanal)
    obtenerDatosVentas(ventas: Venta[]){
      
      for(let fecha of this.fechas){
        let cantidadVentas = 0;
        ventas.forEach((venta)=>{
          const timestamp = venta.fechaVenta;
          const fechaFirestore = new Date(timestamp.seconds * 1000);
          if(this.sonMismoDia(fechaFirestore, fecha)){
            venta.referencias.forEach((ref)=>{
              cantidadVentas += ref.unidades;
            })
          }
        })
        this.ventasSegunFecha.push(cantidadVentas);
      }
      this.ventasHoy = this.ventasSegunFecha[this.ventasSegunFecha.length - 1];
      this.obtenerPorcentajesVentas();
    }

    obtenerPorcentajesVentas(){
      let numeroMayor = Math.max(...this.ventasSegunFecha);
      while (numeroMayor % 5 !== 0) {
        numeroMayor++;
      }
      this.porcentajesVentas = ( this.ventasSegunFecha.map(num => (num / numeroMayor)));

      const multiplo = numeroMayor / 5;
      for(let i = 5; i > 0; i--) {
          this.divicionesVentas.push(multiplo * i);
      }
    }

    //-------------------------------------------------(Mensual)

    obtenerDatosVentasMensual(ventas: Venta[]){
      let cantidadVentas = 0;
      let cantidadVentasPorDia = 0;
      let grupoVentas = [];
      for(let i = 0; i < this.fechasMensual.length; i++){
        let fecha = this.fechasMensual[i];
        ventas.forEach((venta)=>{
          const timestamp = venta.fechaVenta;
          const fechaFirestore = new Date(timestamp.seconds * 1000);
          if(this.sonMismoDia(fechaFirestore, fecha)){
            venta.referencias.forEach((ref)=>{
              cantidadVentas += ref.unidades;
              cantidadVentasPorDia += ref.unidades;
            })
          }
        })
        grupoVentas.push(cantidadVentasPorDia);
        cantidadVentasPorDia = 0;
        if((i + 1) % 4 == 0){ // Si hemos procesado un grupo de 4 días
          this.ventasTotalesMensual.push([...grupoVentas]);
          grupoVentas = [];
          this.ventasSegunFechaMensual.push(cantidadVentas);
          cantidadVentas = 0; // Reseteamos la cuenta para el próximo grupo de 4 días
        }
      }
      this.ventasHoyMensual = this.ventasSegunFechaMensual[this.ventasSegunFechaMensual.length - 1];
      this.obtenerPorcentajesVentasMensual();
    }

    obtenerPorcentajesVentasMensual(){
      let numeroMayor = Math.max(...this.ventasSegunFechaMensual);
      while (numeroMayor % 5 !== 0) {
        numeroMayor++;
      }
      this.porcentajesVentasMensual = ( this.ventasSegunFechaMensual.map(num => (num / numeroMayor)));

      const multiplo = numeroMayor / 5;
      for(let i = 5; i > 0; i--) {
          this.divicionesVentasMensual.push(multiplo * i);
      }
    }

//----------------------------------- VISTAS -----------------------------------------
    //-------------------------------------------------(Semanal)
    obtenerVistas(productos: Producto[]){
      for(let fecha of this.fechas){
        let cantidadVistas = 0;
        productos.forEach((producto)=>{
          if(producto.vistas){
            producto.vistas.forEach((vista)=>{
              const timestamp = vista.fecha;
              const fechaFirestore = new Date(timestamp.seconds * 1000);
              if(this.sonMismoDia(fechaFirestore, fecha)){
                cantidadVistas += vista.cantidad;
              }
            })
          }
        })
        this.vistasSegunFecha.push(cantidadVistas);
      }
      this.vistasHoy = this.vistasSegunFecha[this.vistasSegunFecha.length - 1];
      this.obtenerPorcentajesVistas();
    }

    obtenerPorcentajesVistas(){
      let numeroMayor = Math.max(...this.vistasSegunFecha);
      while (numeroMayor % 5 !== 0) {
        numeroMayor++;
      }
      this.porcentajesVistas = ( this.vistasSegunFecha.map(num => (num / numeroMayor)));

      const multiplo = numeroMayor / 5;
      for(let i = 5; i > 0; i--) {
          this.divicionesVistas.push(multiplo * i);
      }
    }
    //-------------------------------------------------(Mensual)
    obtenerVistasMensual(productos: Producto[]){
      let cantidadVistas = 0;
      let cantidadVistasPorDia = 0;
      let grupoVistas = [];

      for(let i = 0; i < this.fechasMensual.length; i++){
        let fecha = this.fechasMensual[i];
        productos.forEach((producto)=>{
          if(producto.vistas){
            producto.vistas.forEach((vista)=>{
              const timestamp = vista.fecha;
              const fechaFirestore = new Date(timestamp.seconds * 1000);
              if(this.sonMismoDia(fechaFirestore, fecha)){
                cantidadVistas += vista.cantidad;
                cantidadVistasPorDia += vista.cantidad;
              }
            })
          }
        })
        grupoVistas.push(cantidadVistasPorDia);
        cantidadVistasPorDia = 0;
        if((i + 1) % 4 == 0){ // Si hemos procesado un grupo de 4 días
          this.vistasTotalesMensual.push([...grupoVistas]);
          grupoVistas = [];
          this.vistasSegunFechaMensual.push(cantidadVistas);
          cantidadVistas = 0; // Reseteamos la cuenta para el próximo grupo de 4 días
        }
      }
      this.vistasHoyMensual = this.vistasSegunFechaMensual[this.vistasSegunFechaMensual.length - 1];
      this.obtenerPorcentajesVistasMensual();
    }

    obtenerPorcentajesVistasMensual(){
      let numeroMayor = Math.max(...this.vistasSegunFechaMensual);
      while (numeroMayor % 5 !== 0) {
        numeroMayor++;
      }
      this.porcentajesVistasMensual = ( this.vistasSegunFechaMensual.map(num => (num / numeroMayor)));

      const multiplo = numeroMayor / 5;
      for(let i = 5; i > 0; i--) {
          this.divicionesVistasMensual.push(multiplo * i);
      }
    }
//------------------------------------------------------------------
  sonMismoDia(fecha1: Date, fecha2: Date) {
    return fecha1.getFullYear() === fecha2.getFullYear() && fecha1.getMonth() === fecha2.getMonth() && fecha1.getDate() === fecha2.getDate();
  }

  precio!: boolean;
  cantidad!: number;
  showTooltip = false;

  total!: number;
  fechasDiv!: string[];
  cantidadDia!: number[];
  x = 0;
  y = 0;

  onMouseOver(event: MouseEvent, index: number, diagrama: number) {
    if(this.periodoTiempo == 'semanal'){
      switch (diagrama) {
        case 1: this.cantidad = this.ventasBrutasSegunFecha[index];this.precio = true; break
        case 2: this.cantidad = this.ventasSegunFecha[index];this.precio = false; break
        case 3: this.cantidad = this.vistasSegunFecha[index];this.precio = false; break
      }
    }
    if(this.periodoTiempo == 'mensual'){
      switch (diagrama) {
        case 1: {
          this.total = this.ventasBrutasTotalesMensual[index].reduce((acumulador, valorActual) => acumulador + valorActual, 0);
          this.fechasDiv = this.fechasMensualStringSubGrupos[index];
          this.cantidadDia = this.ventasBrutasTotalesMensual[index];
          this.precio = true;
          break
        }
        case 2: {
          this.total = this.ventasTotalesMensual[index].reduce((acumulador, valorActual) => acumulador + valorActual, 0);
          this.fechasDiv = this.fechasMensualStringSubGrupos[index];
          this.cantidadDia = this.ventasTotalesMensual[index];
          this.precio = false;
          break
        }
        case 3: {
          this.total = this.vistasTotalesMensual[index].reduce((acumulador, valorActual) => acumulador + valorActual, 0);
          this.fechasDiv = this.fechasMensualStringSubGrupos[index];
          this.cantidadDia = this.vistasTotalesMensual[index];
          this.precio = false;
          break
        }
      }
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
