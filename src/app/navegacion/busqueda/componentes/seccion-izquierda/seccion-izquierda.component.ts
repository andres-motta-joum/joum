import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seccion-izquierda',
  templateUrl: './seccion-izquierda.component.html',
  styleUrls: ['./seccion-izquierda.component.scss']
})
export class SeccionIzquierdaComponent {
  public ultimoDatoUrl!: string;
  private routeSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(() => {
      const url = this.router.url;
      const decodedUrl = decodeURIComponent(url);
      const segments = decodedUrl.split('/');
      this.ultimoDatoUrl = segments[segments.length - 1];
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  envioGratis: boolean = false;
  onButtonClick(): void {
    this.envioGratis = !this.envioGratis;
  }
}
