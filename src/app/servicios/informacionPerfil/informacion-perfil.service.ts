import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformacionPerfilService {
  constructor() { }

  selected!: string | null;

}
