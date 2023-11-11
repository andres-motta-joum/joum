import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/interfaces/ticket';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsEmpleadoComponent {
  constructor(private router: Router, private auth: Auth, private authService: AuthService, private firestore: Firestore){}
  subscription!: Subscription;
  tickets!: Ticket[] | undefined;
  filtroTickets!: Ticket[];
  datosCargados = false;
  idUsuarioInterno!: string;

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user =>{
      if(user){
        this.idUsuarioInterno = user.uid;
        this.subscription = this.authService.getUsuarioInternoId(user.uid).subscribe(async (usuario)=>{
          if(usuario.tickets && usuario.tickets.length !== 0){
            const ticketsSnapshot = await Promise.all(usuario.tickets.map( ref => getDoc(ref)));
            this.tickets = ticketsSnapshot.map((ticketSnapshot)=>{
              let ticket = ticketSnapshot.data() as Ticket;
              ticket.fecha = this.formatDate(ticket.fecha);
              if (ticket.descripcion.length > 70) {
                ticket.descripcion = ticket.descripcion.substring(0, 80) + '...';
              }
              ticket.id = ticketSnapshot.id;
              return ticket;
            });
          }else{
            this.tickets = [];
          }
          this.filtroTickets = this.tickets;
          this.datosCargados = true;
        });
      }
    })
  }

  buscarTicketPorTipo(event: any){
    const eleccion = event.target.value;
    if(eleccion == 'Todos'){
      this.filtroTickets = this.tickets!;
    }else{
      this.filtroTickets = this.tickets!.filter(ticket => ticket.tipo == eleccion)
    }
  }

  formatDate(timestamp: any) {
    const date = timestamp.toDate();
  
    const now = new Date();
  
    if (date.toDateString() === now.toDateString()) {
      return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
    } else if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() > now.getDate() - 7) {
      return date.toLocaleString('es-ES', { weekday: 'long' }) + ', ' + date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
    } else {
      return date.toLocaleDateString();
    }
  }

  navegar(ruta: string){
    this.router.navigate([ruta]);
    window.scroll(0,0)
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
