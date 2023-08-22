import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasosVenderService } from '../../../../../../servicios/vender/vender.service';

@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrls: ['./paso-cuatro.component.scss']
})
export class PasoCuatroComponent {
  public form!: FormGroup;

  public formControls!: string[];

  public categoria!: any[];

  constructor(
    private pasos: PasosVenderService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
    if (this.pasos.producto !== undefined) {
      this.buildArray(this.pasos.producto.categoria).then( async (lista: any[]) => {
        if (this.pasos.producto.codigoUniversal !== undefined) {
          for (const key in lista[1]) {
            if (Object.prototype.hasOwnProperty.call(lista[1], key)) {
              lista[1][key][0] = this.pasos.producto[key];
            }
          }
        }
        this.buildForm(lista[1]);
        this.categoria = lista;
        this.formControls = Object.keys(lista[1]);
      });
    } else {
      this.router.navigate(['/vender', 'formulario', 'paso1']);
    }
  }

  private buildArray(categoria: string): any {
    return new Promise((res) => {
      switch (categoria) {
        case 'Cuadros':
          res(
            [[
                'Código universal',
                'Cantidad',
                'Color marco',
                'Temática',
                'Ancho',
                'Altura'
              ],
              {
                codigoUniversal: [''],
                cantidad: ['', [Validators.required]],
                colorMarco: ['', [Validators.required]],
                tematica: ['', [Validators.required]],
                ancho: ['', [Validators.required]],
                altura: ['', [Validators.required]]
              }
            ]
          );
          break;
        case 'repisas':
          res([[
                'Código universal',
                'Cantidad',
                'Color',
                'SKU',
                'Acabado',
                'Largo',
                'Altura',
                'Profundidad',
                'Espesor',
                'Tipo',
                'Material',
                'Ensamblado',
                'kit de instalación'
              ],
              {
                codigoUniversal: [''],
                cantidad: ['', [Validators.required]],
                color: ['', [Validators.required]],
                sku: ['', [Validators.required]],
                acabado: ['', [Validators.required]],
                largo: ['', [Validators.required]],
                altura: ['', [Validators.required]],
                profundidad: ['', [Validators.required]],
                espesor: ['', [Validators.required]],
                tipo: ['', [Validators.required]],
                material: ['', [Validators.required]],
                ensamblado: ['', [Validators.required]],
                kitInstalacion: ['', [Validators.required]]
              }
          ]);
          break;
        case 'Iluminación':
          res([[
              'Código universal',
              'Cantidad',
              'Color de la base',
              'SKU',
              'Ancho',
              'Diámetro',
              'Altura',
              'Material',
              'Material de la pantalla'
            ],
            {
              codigoUniversal: [''],
              cantidad: ['', [Validators.required]],
              colorBase: ['', [Validators.required]],
              sku: ['', [Validators.required]],
              ancho: ['', [Validators.required]],
              diametro: ['', [Validators.required]],
              altura: ['', [Validators.required]],
              material: ['', [Validators.required]],
              materialPantalla: ['', [Validators.required]]
            }
          ]);
          break;
        case 'Macetas':
          res([[
              'Código universal',
              'Cantidad',
              'Nombre del diseño',
              'Diámetro de Boca',
              'Altura',
              'Largo',
              'Ancho',
              'Unidades por envase',
              'Forma',
              'Material',
              'Capacidad en volumen'
            ],
            {
              codigoUniversal: [''],
              cantidad: ['', [Validators.required]],
              nombreDiseño: ['', [Validators.required]],
              diametroBoca: ['', [Validators.required]],
              altura: ['', [Validators.required]],
              largo: ['', [Validators.required]],
              ancho: ['', [Validators.required]],
              unidadesPorEnvase: ['', [Validators.required]],
              forma: ['', [Validators.required]],
              material: ['', [Validators.required]],
              capacidadEnVolumen: ['', [Validators.required]]
            }
          ]);
          break;
        case 'Relojes de Pared':
          res([[
              'Código universal',
              'Cantidad',
              'Tipo',
              'SKU',
              'Color de fondo',
              'Material',
              'Diámetro',
              'Diseño'
            ],
            {
              codigoUniversal: [''],
              cantidad: ['', [Validators.required]],
              tipo: ['', [Validators.required]],
              sku: ['', [Validators.required]],
              colorFondo: ['', [Validators.required]],
              material: ['', [Validators.required]],
              diametro: ['', [Validators.required]],
              diseño: ['', [Validators.required]]
            }
          ]);
          break;
        case 'Difusores':
          res([[
              'Código universal',
              'Cantidad',
              'Diseño de tela',
              'SKU',
              'Largo',
              'Ancho',
              'Material',
              'Ambiente recomendado',
              '¿Es artesanal?'
            ],
            {
              codigoUniversal: [''],
              cantidad: ['', [Validators.required]],
              diseñoTela: ['', [Validators.required]],
              sku: ['', [Validators.required]],
              largo: ['', [Validators.required]],
              ancho: ['', [Validators.required]],
              material: ['', [Validators.required]],
              ambienteRecomendado: ['', [Validators.required]],
              esArtesanal: ['', [Validators.required]]
            }
          ]);
          break;
        case 'Vinilos':
          res([[
              'Código universal',
              'Cantidad',
              'Color',
              'SKU',
              'Unidades por envase',
              'Diseño',
              'Superficies recomendadas',
              'Ambientes recomendables',
              '¿Apto para pared?',
              '¿Apto para autos?',
              '¿Apto para heladera?',
              '¿Es fluorecente?',
              '¿Es 3D?'
            ],
            {
              codigoUniversal: [''],
              cantidad: ['', [Validators.required]],
              color: ['', [Validators.required]],
              sku: ['', [Validators.required]],
              unidadesPorEnvase: ['', [Validators.required]],
              diseño: ['', [Validators.required]],
              superficiesRecomendadas: ['', [Validators.required]],
              ambientesRecomendables: ['', [Validators.required]],
              aptoParaPared: ['', [Validators.required]],
              aptoParaAutos: ['', [Validators.required]],
              aptoParaHeladera: ['', [Validators.required]],
              esFluorecente: ['', [Validators.required]],
              es3D: ['', [Validators.required]]
            }
          ]);
          break;
        case 'adornos':
          res([[
              'Código universal',
              'Cantidad',
              'SKU'
            ],
            {
              codigoUniversal: [''],
              cantidad: ['', [Validators.required]],
              sku: ['', [Validators.required]]
            }
          ]);
          break;
        default:
          res([
            ['Código universal', 'Cantidad'],
            {
              codigoUniversal: ['', [Validators.required]],
              cantidad: ['', [Validators.required]]
            }
          ]);
          break;
      }
    });
  }

  private buildForm(ob: any): void {
    this.form = this.formBuilder.group(ob);
  }

  ngOnInit(): void {
    if (!this.pasos.paso4) {
      this.router.navigate(['/vender', 'formulario', 'paso3']);
    }
  }

  irPaso3(): void {
    this.router.navigate(['/vender', 'formulario', 'paso3']);
  }

  irPaso5(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.pasos.paso5 = true;
      this.pasos.producto = {
        ...this.pasos.producto,
        ...this.form.value
      };
      this.router.navigate(['/vender', 'formulario', 'paso5']);
    }
  }
}
