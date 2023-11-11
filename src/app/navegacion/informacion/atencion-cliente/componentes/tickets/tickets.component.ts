import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Ticket } from 'src/app/interfaces/ticket';
import { AuthService } from 'src/app/servicios/usuarios/auth.service';
import { provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { matDelete } from '@ng-icons/material-icons/baseline'; 
import { matEmail } from '@ng-icons/material-icons/baseline';
import { Firestore, arrayRemove, doc, getDoc, runTransaction } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [provideIcons({heroAdjustmentsHorizontal, matDelete, matEmail})]
})
export class TicketsComponent implements OnInit, OnDestroy{
  constructor(private router: Router, private auth: Auth, private authService: AuthService, private firestore: Firestore){}
  subscription!: Subscription;
  tickets!: Ticket[] | undefined;
  filtroTickets!: Ticket[];
  datosCargados = false;

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user =>{
      if(user){
        this.subscription = this.authService.getUsuarioId(user.uid).subscribe(async (usuario)=>{
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
            this.tickets = this.tickets.reverse();
            this.filtroTickets = this.tickets;
          }
          this.datosCargados = true;
        });
      }
    })
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

  buscarTicketPorTipo(event: any){
    const eleccion = event.target.value;
    if(eleccion == 'Todos'){
      this.filtroTickets = this.tickets!;
    }else{
      this.filtroTickets = this.tickets!.filter(ticket => ticket.tipo == eleccion)
    }
  }

  async eliminarTicket(ticket: Ticket, index: number){
    this.filtroTickets.splice(index, 1);
    await runTransaction(this.firestore, async (transaction) => {
      const ticketRef = doc(this.firestore, `/informacion/atencion-cliente/tickets/${ticket.id}`);
      const usuarioRef = doc(this.firestore, `usuarios/${ticket.idUsuario}`);
      const usuarioInternoRef = doc(this.firestore, `usuarios-internos/${ticket.idUsuarioInterno}`);
      
      transaction.update(usuarioRef, {
        tickets: arrayRemove(ticketRef)
      });

      transaction.update(usuarioInternoRef, {
        tickets: arrayRemove(ticketRef)
      });
    
      transaction.delete(ticketRef);
    });
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
