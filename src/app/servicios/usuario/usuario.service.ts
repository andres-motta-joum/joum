import { Injectable } from '@angular/core';
import { Venta } from 'src/app/interfaces/usuario/subInterfaces/venta';
import { Usuario } from 'src/app/interfaces/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios:Usuario[] = [
    {
      id: "1",
      usuario: "MOTTAANDRES20221130093921",
      nombre: "Andres Yesid",
      apellido: "Motta Sarmiento",
      correo: "andres.motta.ibm@gmail.com",
      documento: 100320938,
        tipoDocumento: "CC",
      telefono: 3205459435,
      direcciones: ['calle 127 #87a 24'],
        direccionPrincipal: "calle 127 #87a 24",
      seguidores: 101,
      diasComoVendedor: 515,
      //-------------------------
      dinero: {
        disponible: 200000,
        aLiberar: 56000,
        transacciones: [
          {
            numMovimiento: 12,
            estado: 'exitosa',
            tipo: 'transaccion',
            nombreDestinatario: 'Andres Yesid Motta',
            fecha: new Date(),
            valor: 50000,
            disponible: 10000
          },
          {
            numMovimiento: 13,
            estado: 'exitosa',
            tipo: 'pago',
            fecha: new Date(),
            valor: 50000,
            disponible: 10000
          },
        ],
      },
      reportesreclamos: [],
      //-------------------------
      ventas: [
        {
          numVenta: 1,
          productos: [
            {
              id: '1'
            },
            {
              id: '2'
            },
          ],
          unidades: [1,2],
          fechaVenta: new Date(),
          fechaEnCamino: new Date(),
          enCamino: true,
          fechaEntrega: new Date(),
          entregado: true,
          aproxEntrega: '',
          idCliente: '2',
          datosEnvio: '',
          cancelada: false,
        },
        {
          numVenta: 2,
          productos: [
            {
              id: '5'
            },
          ],
          unidades: [3],
          fechaVenta: new Date(),
          fechaEnCamino: new Date(),
          enCamino: true,
          fechaEntrega: new Date(),
          entregado: true,
          aproxEntrega: '',
          idCliente: '2',
          datosEnvio: '',
          cancelada: false,
        },
      ],   
      //-------------------------
      compras: [
        {
          numVenta: 3,
        },
        {
          numVenta: 4,
        },
      ],  
      favoritos: [
        {
          id: '1'
        },
        {
          id: '18'
        },
        {
          id: '16'
        },
        {
          id: '9'
        },
      ],  
      opiniones: [
        {
          idProducto: '15',
          calificacion: 3,
          fecha: new Date(2023, 3, 4),
          contenido: 'Quedarón geniales en mi cuarto, recomiendo usar cinta doble faz o doble cara para cuadros ya que con tornillos se ven raros los cuadros y no asegura que queden simétricamente como en la imagen, la cinta pega muy fuerte pero si quieres reacomodar con un secador de cabello le aplicas calor unos minutos y se despega sola.',
          numVenta: 3,
          check: true, //Si el usuario subió su opinión
        },
        {
          idProducto: '16',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Quedarón geniales en mi cuarto, recomiendo usar cinta doble faz o doble cara para cuadros ya que con tornillos se ven raros los cuadros y no asegura que queden simétricamente como en la imagen, la cinta pega muy fuerte pero si quieres reacomodar con un secador de cabello le aplicas calor unos minutos y se despega sola.',
          numVenta: 4,
          check: true, //Si el usuario subió su opinión
        },
        {
          idProducto: '19',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Quedarón geniales en mi cuarto, recomiendo usar cinta doble faz o doble cara para cuadros ya que con tornillos se ven raros los cuadros y no asegura que queden simétricamente como en la imagen, la cinta pega muy fuerte pero si quieres reacomodar con un secador de cabello le aplicas calor unos minutos y se despega sola.',
          numVenta: 4,
          check: true, //Si el usuario subió su opinión
        }
      ],  
      publicaciones: [
        {
          id: '1'
        },
        {
          id: '2'
        },
        {
          id: '3'
        },
        {
          id: '4'
        },
        {
          id: '5'
        },
        {
          id: '6'
        },
        {
          id: '7'
        },
        {
          id: '8'
        },
        {
          id: '9'
        }
      ],  
      facturacion: {},
      notificaciones: [
        {
          foto: '',
          titulo: '',
          contenido: '',
          fecha: new Date(),
          tipo: '',
        },
        {
          foto: '',
          titulo: '',
          contenido: '',
          fecha: new Date(),
          tipo: '',
        },
        {
          foto: '',
          titulo: '',
          contenido: '',
          fecha: new Date(),
          tipo: '',
        },
      ],
      notificacionesRecibidas: 
      {
        ofertasDecuentos: true,
        ventas: true,
        publicaciones: true,
        reclamos: true,
        mensajes: true
      },
      atencionCliente: [],
      carrito: [ //buscamos el id producto y lo asignamos
        {
          producto: {id:'7'},
          cantidad: 1
        },
        {
          producto: {id:'14'},
          cantidad: 2
        },
        {
          producto: {id:'17'},
          cantidad: 1
        },
        {
          producto: {id:'3'},
          cantidad: 4
        },
      ],
      guardados: [ //buscamos el id producto y lo asignamos
      {
        producto: {id:'4'},
        cantidad: 2
      },
      {
        producto: {id:'14'},
        cantidad: 4
      }
      ],
      historial: [ //buscamos el id producto y lo asignamos
        {
          id: '1'
        },
        {
          id: '4'
        },
        {
          id: '5'
        },
        {
          id: '9'
        }, {
          id: '8'
        },
        {
          id: '19'
        },
        {
          id: '18'
        }
      ],
      correoVerificado: true,
      planJoum: "Gratuito",
    },

    
    //------------------------------------------------------------------------------------------------------------------
    {
      id: "2",
      usuario: "ORTEGAJENIFER20221130093921",
      nombre: "Jenifer Fernanda",
      apellido: "Cuervo Ortega",
      correo: "jeni@gmail.com",
      documento: 1022424538,
        tipoDocumento: "TI",
      telefono: 3205459423,
      direcciones: ['calle 127 #87a 24'],
        direccionPrincipal: "calle 127 #87a 24",
      seguidores: 45,
      diasComoVendedor: 58,
      //-------------------------
      dinero: {
        disponible: 200000,
        aLiberar: 56000,
        transacciones: [
          {
            numMovimiento: 12,
            estado: '',
            tipo: '',
            nombreDestinatario: '',
            fecha: new Date(),
            valor: 50000,
            disponible: 10000
          }
        ],
      },
      reportesreclamos: [],
      //-------------------------
      ventas: [
        {
          numVenta: 3,
          productos: [
            {
              id: '15'
            }
          ],
          unidades: [1],
          fechaVenta: new Date(),
          fechaEnCamino: new Date(),
          enCamino: true,
          fechaEntrega: new Date(),
          entregado: true,
          aproxEntrega: '14 de junio',
          idCliente: '1',
          datosEnvio: 'calle 127a #87a - 24 | Casas de San Jorge 2',
          cancelada: false,
        },
        {
          numVenta: 4,
          productos: [
            {
              id: '16'
            },
            {
              id: '19'
            },
          ],
          unidades: [2,1],
          fechaVenta: new Date(),
          fechaEnCamino: new Date(),
          enCamino: false,
          fechaEntrega: new Date(),
          entregado: false,
          aproxEntrega: '17 de junio',
          idCliente: '1',
          datosEnvio: 'calle 127a #87a - 24 | Casas de San Jorge 2',
          cancelada: false,
        },
      ],   
      //-------------------------
      compras: [
        {
          numVenta: 1
        },
        {
          numVenta: 2
        },
      ],  
      favoritos: [
        {
          id: '1' //buscamos el id producto y lo asignamos
        }
      ],  
      opiniones: [
        {
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Quedarón geniales en mi cuarto, recomiendo usar cinta doble faz o doble cara para cuadros ya que con tornillos se ven raros los cuadros y no asegura que queden simétricamente como en la imagen, la cinta pega muy fuerte pero si quieres reacomodar con un secador de cabello le aplicas calor unos minutos y se despega sola.',
          numVenta: 1,
          check: true, //Si el usuario subió su opinión
        },
        {
          idProducto: '2',
          calificacion: 3,
          fecha: new Date(2023, 3, 4),
          contenido: 'Quedarón geniales en mi cuarto, recomiendo usar cinta doble faz o doble cara para cuadros ya que con tornillos se ven raros los cuadros y no asegura que queden simétricamente como en la imagen, la cinta pega muy fuerte pero si quieres reacomodar con un secador de cabello le aplicas calor unos minutos y se despega sola.',
          numVenta: 1,
          check: true, //Si el usuario subió su opinión
        },
        {
          idProducto: '5',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Quedarón geniales en mi cuarto, recomiendo usar cinta doble faz o doble cara para cuadros ya que con tornillos se ven raros los cuadros y no asegura que queden simétricamente como en la imagen, la cinta pega muy fuerte pero si quieres reacomodar con un secador de cabello le aplicas calor unos minutos y se despega sola.',
          numVenta: 2,
          check: true, //Si el usuario subió su opinión
        }
      ],  
      publicaciones: [
        {
          id: '10'
        },
        {
          id: '11'
        },
        {
          id: '12'
        },
        {
          id: '13'
        },
        {
          id: '14'
        },
        {
          id: '15'
        },
        {
          id: '16'
        },
        {
          id: '17'
        },
        {
          id: '18'
        },
        {
          id: '19'
        },
      ],  
      facturacion: {},
      notificaciones: [
        {
          foto: '',
          titulo: '',
          contenido: '',
          fecha: new Date(),
          tipo: '',
        }
      ],
      notificacionesRecibidas: 
      {
        ofertasDecuentos: true,
        ventas: true,
        publicaciones: true,
        reclamos: true,
        mensajes: true
      },
      atencionCliente: [],
      carrito: [ //buscamos el id producto y lo asignamos
        {
          producto: {id:'7'},
          cantidad: 1
        }
      ],
      guardados: [ //buscamos el id producto y lo asignamos
        {
          producto: {id:'7'},
          cantidad: 1
        },
      ],
      historial: [ //buscamos el id producto y lo asignamos
        {
          id: '1'
        }
      ],
      correoVerificado: true,
      planJoum: "Gratuito",
    },


  ]

  getAllUsers(): Usuario[] {
    return this.usuarios;
  }

  getUserUsuario(dato: string): Usuario | undefined{
    return this.usuarios.find(usuario => usuario.usuario!.toLowerCase() === dato.toLowerCase());
  }
  getUserId(dato: string): Usuario | undefined{
    return this.usuarios.find(usuario => usuario.id!.toLowerCase() === dato.toLowerCase());
  }
  getVenta(dato: number): Venta | undefined{
    let ventaFound = undefined; 
    for(const usuario of this.usuarios){
      for(const venta of usuario.ventas!){
        if(venta.numVenta === dato){
          ventaFound = venta;
        }
      }
    }
    return ventaFound
  }
}
