import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/interfaces/novedad';
import { Input } from '@angular/core';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.scss']
})
export class NovedadComponent implements OnInit{
  @Input() novedad: Novedad = {fecha: new Date("")};
  public day = '';
  public month = '';
  public year = 0;
  public fecha = ``;

  ngOnInit(): void {
    if(this.novedad.fecha){
      this.day = this.novedad.fecha.getDate().toString();
      this.month = (this.novedad.fecha.getMonth() + 1).toString().padStart(2, '0');
      this.year = this.novedad.fecha.getFullYear();
    }
    this.fecha = `${this.day} de ${this.month} del ${this.year}`;
  }
}
