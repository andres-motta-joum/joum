import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/servicios/usuarios/data-sharing.service';

@Component({
  selector: 'app-correo-enviado',
  templateUrl: './correo-enviado.component.html',
  styleUrls: ['./correo-enviado.component.scss']
})
export class CorreoEnviadoComponent implements OnInit, OnDestroy{
  constructor(private dataSharingService: DataSharingService, private router: Router){}
  public correo!: string;
  ngOnInit(): void {
    const formData = this.dataSharingService.getFormData();
    if (formData) {
      console.log(formData)
      if(Object.keys(formData).length === 0){
        this.router.navigate(['']);
      }else{
        this.correo = formData.email;
      }
    }
  }

  home(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.dataSharingService.deleteData();
  }

}
