import { Injectable } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    {
      id: '1',
      idUsuario: '1',
      verificado: true,
      categoria: 'cuadros',            
      nombre: 'Conjunto de cuadros decorativos para sala...',
      precio: 110000,
      descripcion: 'HERMOSOS CUADROS DECORATIVOS\n\nLindos cuadros con imágenes y acabados de excelente calidad. \n Nuestros cuadros son hermosos y transforman cualquier entorno, seducen enamoran y conquistan a sus visitantes.\nAdemás de su belleza, están hechos de material de la más alta calidad, y la aplicación de los mejores terminados dando como resultado imágenes nítidas Brillantes con colores vivos y acabados de excelente Calidad.\n\nNo pierdas el tiempo y elige tus modelo favorito\n\nImpresión en la mas alta resoluciónTerminado laminado brillante permite limpiar',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Neutros'],
        fotos: [['assets/img/categoria/cuadros/21.jpg']],
        tematica: 'paisaje',
        autoria: 'Hecho por mi',
        altura: 50,
        unidadMedidaAltura: 'cm',
        ancho: 90,
        unidadMedidaAncho: 'cm',
        tipoPanel: 'vidrio',
        marco: true,
          materialMarco: 'madera',
        frase: false,
        formatoVenta: 'unidades'
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 2,

      vistas: 43,
      descuento: true,
        porcentajeDescuento: 14,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '1',
          idUsuario: '11',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Quedarón geniales en mi cuarto, recomiendo usar cinta doble faz o doble cara para cuadros ya que con tornillos se ven raros los cuadros y no asegura que queden simétricamente como en la imagen, la cinta pega muy fuerte pero si quieres reacomodar con un secador de cabello le aplicas calor unos minutos y se despega sola.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 3, 5),
          contenido: 'Muy bien tal como lo muestran.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 3, 7),
          contenido: 'Tiene buen tamaño y la impresión es de muy buena calidad, lo recomiendo 100%.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 3,
          fecha: new Date(2023, 3, 6),
          contenido: 'Con el tiempo los cuadros se van doblando.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 3, 8),
          contenido: 'Buen producto, buen tamaño, de acuerdo a los que esta en la descripción.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 3, 9),
          contenido: 'Los cuadros estan muy bonitos, si me parecio curioso verlos en otras plataformas a un menor costo, pero puede ser por las comisiones de Joum, recibes lo esperado.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 2,
          fecha: new Date(2023, 3, 4),
          contenido: 'Los herrajes para colgar los cuadros de una puntilla no están bien centrados y los cuadros de van hacia un lado.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 3, 12),
          contenido: 'Excelente, producto se ve muy bonito en la sala, venía muy bien empacado.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'gratis',
      ventas: 22,
      estado: true
    },
//---------------------------------------------
    {
      id: '2',
      idUsuario: '1',
      verificado: true,
      categoria: 'repisas',            
      nombre: 'Repisas Flotantes Modernas Set X 4 Un Decoracion Moderna',
      precio: 37000,
      descripcion: 'HERMOSOS CUADROS DECORATIVOS\n\nLindos cuadros con imágenes y acabados de excelente calidad.\nNuestros cuadros son hermosos y transforman cualquier entorno, seducen enamoran y conquistan a sus visitantes.\nAdemás de su belleza, están hechos de material de la más alta calidad, y la aplicación de los mejores terminados dando como resultado imágenes nítidas Brillantes con colores vivos y acabados de excelente Calidad.\n\nNo pierdas el tiempo y elige tus modelo favorito\n\nImpresión en la mas alta resoluciónTerminado laminado brillante permite limpiar',
      detalles: {
        marca: 'Industria Colombiana',
        modelo: 'Lineal',
        colores: ['Café claro'],
        fotos: [['assets/img/categoria/repisas/13.jpg', 'assets/img/categoria/repisas/12.jpg']],
        cantidadPiezas: 1,
        forma: 'rectangular',
        material: 'madera',
        autoria: 'Hecho por mi',
        altura: 8,
        unidadMedidaAltura: 'cm',
        ancho: 40,
        unidadMedidaAncho: 'cm',
        profundidad: 30,
        unidadMedidaProfundidad: 'cm',
        peso: 1,
        unidadMedidaPeso: 'kilo',
        kitInstalacion: true,
        formatoVenta: 'Unidades',
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 25,

      vistas: 106,
      descuento: false,
      opiniones: [
        {
          id: '3',
          idUsuario: '11',
          idProducto: '2',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Buen material las repisas son tal muestra la foto. Buenos acabado. Cliente satisfecho.'
        },
        {
          id: '5',
          idUsuario: '12',
          idProducto: '2',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Buen producto, fácil de instalar. Viene con las instrucciones. Tal cual lo ofrecen.'
        },
        {
          id: '4',
          idUsuario: '12',
          idProducto: '2',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Cumplio mis expectativas.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'premium',
      ventas: 13,
      estado: true
    },
//---------------------------------------------
    {
      id: '3',
      idUsuario: '1',
      verificado: true,
      categoria: 'iluminacion',            
      nombre: 'Lamparas colgantes para comedor ',
      precio: 75000,
      descripcion: 'HERMOSOS CUADROS DECORATIVOS\n\nLindos cuadros con imágenes y acabados de excelente calidad.\nNuestros cuadros son hermosos y transforman cualquier entorno, seducen enamoran y conquistan a sus visitantes.\nAdemás de su belleza, están hechos de material de la más alta calidad, y la aplicación de los mejores terminados dando como resultado imágenes nítidas Brillantes con colores vivos y acabados de excelente Calidad.\n\nNo pierdas el tiempo y elige tus modelo favorito\n\nImpresión en la mas alta resoluciónTerminado laminado brillante permite limpiar',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Negro',],
        fotos: [['assets/img/categoria/iluminacion/15.jpg', 'assets/img/categoria/iluminacion/16.jpg']],
        autoria: 'Hecho por mi',
        subCategoria: {
          tipo: 'Pared',
          estilo: 'Elegante',
          material: 'Aluminio',
          potencia: 6,
          inalambrico: false,
          autoadhesiva: false,
          controlRemoto: false,
          sistemaDePresion: false,
          wifi: false
        },
        formatoVenta: 'pack',
        unidadesPack: 3,
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 54,

      vistas: 236,
      descuento: true,
        porcentajeDescuento: 10,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '5',
          idUsuario: '11',
          idProducto: '3',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Buen producto hay que armar con cuidado.'
        },
        {
          id: '6',
          idUsuario: '12',
          idProducto: '3',
          calificacion: 2,
          fecha: new Date(2023, 3, 4),
          contenido: 'Este producto tiene una dificultad para armar y es increíble que no traiga instrucciones, tuve que buscar un video en youtube para poder armarla y aún así me paso que no me funciona la iluminacion.'
        },
        {
          id: '5',
          idUsuario: '11',
          idProducto: '3',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Excelente producto muy. Bonita y económica.'
        },
        {
          id: '5',
          idUsuario: '11',
          idProducto: '3',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Se ve bien me gusto bastante precio justo contento.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'premium',
      ventas: 97,
      estado: true
    },
//---------------------------------------------
    {
      id: '4',
      idUsuario: '1',
      verificado: true,
      categoria: 'macetas',            
      nombre: 'Maceta decorativda elegante y económica',
      precio: 24000,
      descripcion: 'HERMOSOS CUADROS DECORATIVOS\n\nLindos cuadros con imágenes y acabados de excelente calidad.\n Nuestros cuadros son hermosos y transforman cualquier entorno, seducen enamoran y conquistan a sus visitantes.\nAdemás de su belleza, están hechos de material de la más alta calidad, y la aplicación de los mejores terminados dando como resultado imágenes nítidas Brillantes con colores vivos y acabados de excelente Calidad.\n\nNo pierdas el tiempo y elige tus modelo favorito\n\nImpresión en la mas alta resoluciónTerminado laminado brillante permite limpiar',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Piedra con morado'],
        fotos: [['assets/img/categoria/macetas/18.jpg', 'assets/img/categoria/macetas/19.jpg'],['assets/img/categoria/cuadros/21.jpg']],
        estilo: 'Minimalista',
        tipo: 'Macetero',
        autoria: 'Hecho por mi',
        diametroBoca: 10,
        unidadMedidaDiametroBoca: 'cm',
        diametroBase: 13,
        unidadMedidaDiametroBase: 'cm',
        altura: 30,
        unidadMedidaAltura: 'cm',
        ancho: 20,
        unidadMedidaAncho: 'cm',
        largo: 10,
        unidadMedidaLargo: 'cm',
        forma: 'circular',
        material: 'arsilla',
        capacidadVolumen: 3,
        unidadMedidaVolumen: 'litros',
        sistemaAutorriego: false, 
        colgante: false,
        incluyePlato: false,
        agujerosDrenaje: false,
        aptoParaHuerta: false,
        conPlanta: true,
            tipoPlanta: 'cactus',

        formatoVenta: 'pack',
        unidadesPack: 2,
      },
      precioEnvio: 8000,
      envioGratis: true,
      unidades: 2,

      vistas: 26,
      descuento: true,
        porcentajeDescuento: 20,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '7',
          idUsuario: '11',
          idProducto: '4',
          calificacion: 5,
          fecha: new Date(2023, 11, 6),
          contenido: 'Hermosas!!! muy linda. Muy puntuales.'
        },
        {
          id: '8',
          idUsuario: '12',
          idProducto: '4',
          calificacion: 5,
          fecha: new Date(2023, 0, 23),
          contenido: 'Hermoso, tal como lo esperaba, buen terminado y muy lindo.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'premium',
      ventas: 6,
      estado: true
    },
//---------------------------------------------
    {
      id: '5',
      idUsuario: '1',
      verificado: true,
      categoria: 'relojes',            
      nombre: 'Reloj de pared artesanal',
      precio: 65000,
      descripcion: 'Reloj de parec elegante',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Café claro', ' Negro'],
        fotos: [['assets/img/categoria/relojes/11.jpg', 'assets/img/categoria/relojes/10.jpg'],['assets/img/categoria/cuadros/21.jpg']],
        tipo: 'Pared',
        estilo: 'Silver',
        material: 'Madera',
        panel: false,
        alimentacion: 'Baterias',
        montaje: 'Cinta doble fas',
        autoria: 'Garzon',
        figura: 'Cuadrada',
        altura: 30,
        unidadMedidaAltura: 'cm',
        ancho: 15,
        unidadMedidaAncho: 'cm',
        formatoVenta: 'Unidades',
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 7,

      vistas: 26,
      descuento: true,
        porcentajeDescuento: 20,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '9',
          idUsuario: '11',
          idProducto: '5',
          calificacion: 5,
          fecha: new Date(2023, 5, 12),
          contenido: 'Excelente producto, recomendado al 100%.'
        },
        {
          id: '10',
          idUsuario: '12',
          idProducto: '5',
          calificacion: 5,
          fecha: new Date(2023, 7, 25),
          contenido: 'Muy buen producto'
        },
        {
          id: '10',
          idUsuario: '12',
          idProducto: '5',
          calificacion: 4,
          fecha: new Date(2023, 7, 22),
          contenido: 'Funciona bien está bueno y muy lindo.'
        },
      ],
      calificacion: 3.5,
      tipoPublicacion: 'premium',
      ventas: 6,
      estado: true
    },
//---------------------------------------------
    {
      id: '6',
      idUsuario: '1',
      verificado: true,
      categoria: 'difusores',            
      nombre: 'Humificador Led Difusor Usb 7 Colores Oficina + Esencia',
      precio: 47000,
      descripcion: '****** EL COLOR SE ENCUENTRA SUJETO A CAMBIOS DE INVENTARIO, PUEDE LLEGARTE MARRON CLARO, OSCURO o BLANCO ASI COMO EL DISEÑO SUJETO A DISPONIBILidAD , SE CUENTA CON DIFERENTES DISEÑOS COMO SE COMO SE OBSERVA EN IMAGENES***',
      detalles: {
        marca: 'HUMidIFIER',
        modelo: 'Spartan',
        colores: ['Negro', ' Blanco'],
        fotos: [['assets/img/categoria/difusores/13.jpg', 'assets/img/categoria/difusores/12.jpg']],
        tipo: 'Humificador difusor',
        tecnologiaDifusion: 'Electrónica',
        materia: 'Aluminio',
        temporizador: false,
        lucesLed: false,
        apagadoAutomatico: true,
        instruccionesUso: 'Conectar a tpca corriente, y precionar el boton de enscendido.',
        formatoVenta: 'Unidades',
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 2,

      vistas: 26,
      descuento: false,
      opiniones: [
        {
          id: '11',
          idUsuario: '11',
          idProducto: '6',
          calificacion: 1,
          fecha: new Date(2023, 6, 26),
          contenido: 'Salio defectuoso y no me respondieron.'
        },
        {
          id: '12',
          idUsuario: '12',
          idProducto: '6',
          calificacion: 5,
          fecha: new Date(2023, 5, 5),
          contenido: 'Buen producto, funciona si se siguen correctamente las instrucciones. La función de lámpara es útil e independiente.'
        },
        {
          id: '12',
          idUsuario: '12',
          idProducto: '6',
          calificacion: 4,
          fecha: new Date(2023, 7, 14),
          contenido: 'Me parece que está bien para un cuarto mas o menos pequeño. Para espacios mas grandes puede que se quede un poco corto. Pero en general es un buen producto.'
        },
        {
          id: '12',
          idUsuario: '12',
          idProducto: '6',
          calificacion: 4,
          fecha: new Date(2023, 6, 23),
          contenido: 'pariencia muy buena pero le falta al difusor mas potencia.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'gratuita',
      ventas: 18,
      estado: true
    },
//---------------------------------------------
    {
      id: '7',
      idUsuario: '1',
      verificado: true,
      categoria: 'vinilos',            
      nombre: 'Sticker Vinilo Frase 80 X 60 Cm',
      precio: 44000,
      descripcion: 'STICKER EN VINILO - PARED DECORACIÓN HOGAR - PUERTAS - HABITACIONES - SALAS - NEGOCIOS Hermoso vinilo decorativo que da un toque único y personalizado a tus espacios.',
      detalles: {
        marca: 'Vinilos indigo',
        modelo: 'Frase motivacionas',
        colores: ['Negro'],
        fotos: [['assets/img/categoria/vinilos/12.jpg', 'assets/img/categoria/vinilos/3.jpg']],
        autoria: 'Hecho por mi',
        diseño: 'Frase',
        material: 'plastico',
        tematica: 'Inspiración',
        altura: 1,
        unidadMedidaAltura: 'm',
        ancho: 1.5,
        unidadMedidaAncho: 'm',
        formatoVenta: 'Unidades',
      },
      precioEnvio: 8000,
      envioGratis: true,
      unidades: 14,

      vistas: 76,
      descuento: false,
      opiniones: [
        {
          id: '13',
          idUsuario: '11',
          idProducto: '7',
          calificacion: 4,
          fecha: new Date(2023, 8, 20),
          contenido: 'Le di 4 estrellas en instalación porque es de bastante cuidado, pero ya el resultado es súper genial !.'
        },
        {
          id: '14',
          idUsuario: '12',
          idProducto: '7',
          calificacion: 3,
          fecha: new Date(2023, 7, 8),
          contenido: 'Me encanto. Muy buenos acabados.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'gratuita',
      ventas: 4,
      estado: true
    },
//---------------------------------------------
    {
      id: '8',
      idUsuario: '1',
      verificado: true,
      categoria: 'adornos',            
      nombre: 'Figura Iron Man Marvel Cabeza Oscilante Repisa Y Automóvil',
      precio: 35000,
      descripcion: 'PREGUNTAR POR LA DISPONIBILidAD DEL PRODUCTO ANTES DE LA COMPRA @@@@@@@@ TIENDA VIRTUAL @@@@@@@@ ########## DUCKSHOP91 ######### Tenemos Experiencia Mercadolider Platinum, La medalla mas alta de mercadolibre caracterizados por calidad y cumplimiento. Favor PREGUNTAR ANTES DE OFERTAR. Esperamos a que te animes. Hacemos grandes ofertas para nuestros clientes, Pregunta por ellas.',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Naranja con planeado'],
        fotos: [['assets/img/categoria/adornos/18.jpg', 'assets/img/categoria/adornos/17.jpg']],
        autoria: 'Funk Pop',
        materia: 'plastico, resina',
        tema: 'Figura de acción',
        linea: 'Cabezaones',
        personaje: 'Aironman',
        significado: 'N/A',
        altura: 20,
        unidadMedidaAltura: 'cm',
        ancho:10,
        unidadMedidaAncho: 'cm',
        profundidad: 10,
        unidadMedidaProfundidad: 'cm',
        coleccionable: true,
          coleccion: 'Marvel',
        incluyeAccesorios: false,
        articulada: false,
        piezasIntercambiables: false,
        formatoVenta: 'Pack',
        unidadesPack: 2,
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 2,

      vistas: 73,
      descuento: true,
        porcentajeDescuento: 10,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '15',
          idUsuario: '11',
          idProducto: '8',
          calificacion: 5,
          fecha: new Date(2023, 7, 8),
          contenido: 'Muy bacano.'
        },
        {
          id: '16',
          idUsuario: '12',
          idProducto: '8',
          calificacion: 5,
          fecha: new Date(2023, 8, 25),
          contenido: 'Es lo que esperaba, es igual a lo que se ve en las imagenes, vino en buenas condiciones.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'buena',
      ventas: 26,
      estado: true
    },
//---------------------------------------------
    {
      id: '9',
      idUsuario: '2',
      verificado: true,
      categoria: 'iluminacion',            
      nombre: '6w Lampara Led Exterior Recargable Aplique De Pared',
      precio: 95000,
      descripcion: 'Características del producto 1.Ángulo de haz ajustable Nuestro aplique de pared LED para interiores tiene un diseño simple y elegante, y la luz cálida crea una atmósfera romántica. Puedes crear diferentes formas de luz. Proporciona hermosos efectos de luz para iluminación o decoración.',
      detalles: {
        marca: 'NeoName',
        modelo: 'Led',
        colores: ['Amarillo',],
        fotos: [['assets/img/categoria/iluminacion/17.jpg', 'assets/img/categoria/iluminacion/7.jpg', 'assets/img/categoria/iluminacion/8.jpg', 'assets/img/categoria/iluminacion/18.jpg', 'assets/img/categoria/iluminacion/17.jpg', 'assets/img/categoria/iluminacion/18.jpg', 'assets/img/categoria/iluminacion/7.jpg']],
        autoria: 'NeonName',
        
        subCategoria: {
          diseño: 'astronauta',
          altura: 10,
          unidadMedidaAltura: 'cm',
          ancho: 10,
          unidadMedidaAncho: 'cm',
          fuenteAlimentacion: 'cable',
          montaje: 'cinta',

          control: true,
              tipoControl: 'bluetooth',
        },

        formatoVenta: 'Pack',
        unidadesPack: 3,
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 54,

      vistas: 236,
      descuento: true,
        porcentajeDescuento: 10,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '5',
          idUsuario: '11',
          idProducto: '3',
          calificacion: 5,
          fecha: new Date(2023, 8, 12),
          contenido: 'Tiene mínimos imperfectos en sus acabados, pero cumple la función el letrerito. Buena compra.'
        },
        {
          id: '6',
          idUsuario: '12',
          idProducto: '3',
          calificacion: 5,
          fecha: new Date(2023, 8, 16),
          contenido: 'Excelente producto me encanto.'
        },
        {
          id: '6',
          idUsuario: '12',
          idProducto: '3',
          calificacion: 5,
          fecha: new Date(2023, 7, 28),
          contenido: 'Me parece que el producto está excelente, ilumina bastante bien. En general cumple con su función de una muy buena manera. Si lo recomiendo..'
        },
        {
          id: '6',
          idUsuario: '12',
          idProducto: '3',
          calificacion: 5,
          fecha: new Date(2023, 8, 2),
          contenido: 'Excelente, lastima que no tenga un punto para conexion electrica.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'premium',
      ventas: 97,
      estado: true
    },
    {
      id: '10',
      idUsuario: '2',
      verificado: true,
      categoria: 'cuadros',            
      nombre: 'Conjunto de cuadros decorativos para sala...',
      precio: 110000,
      descripcion: 'HERMOSOS CUADROS DECORATIVOS\n\nLindos cuadros con imágenes y acabados de excelente calidad. \n Nuestros cuadros son hermosos y transforman cualquier entorno, seducen enamoran y conquistan a sus visitantes.\nAdemás de su belleza, están hechos de material de la más alta calidad, y la aplicación de los mejores terminados dando como resultado imágenes nítidas Brillantes con colores vivos y acabados de excelente Calidad.\n\nNo pierdas el tiempo y elige tus modelo favorito\n\nImpresión en la mas alta resoluciónTerminado laminado brillante permite limpiar',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Neutros'],
        fotos: [['assets/img/categoria/cuadros/12.jpg', 'assets/img/categoria/cuadros/15.jpg', 'assets/img/categoria/cuadros/16.jpg', 'assets/img/categoria/cuadros/17.jpg', 'assets/img/categoria/cuadros/18.jpg', 'assets/img/categoria/cuadros/14.jpg']],
        tematica: 'paisaje',
        autoria: 'Hecho por mi',
        altura: 50,
        unidadMedidaAltura: 'cm',
        ancho: 90,
        unidadMedidaAncho: 'cm',
        tipoPanel: 'vidrio',
        marco: true,
          materialMarco: 'madera',
        frase: false,
        formatoVenta: 'unidades'
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 2,

      vistas: 43,
      descuento: true,
        porcentajeDescuento: 14,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '1',
          idUsuario: '11',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Quedarón geniales en mi cuarto, recomiendo usar cinta doble faz o doble cara para cuadros ya que con tornillos se ven raros los cuadros y no asegura que queden simétricamente como en la imagen, la cinta pega muy fuerte pero si quieres reacomodar con un secador de cabello le aplicas calor unos minutos y se despega sola.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Muy bien tal como lo muestran.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Tiene buen tamaño y la impresión es de muy buena calidad, lo recomiendo 100%.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 3,
          fecha: new Date(2023, 3, 4),
          contenido: 'Con el tiempo los cuadros se van doblando.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Buen producto, buen tamaño, de acuerdo a los que esta en la descripción.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Los cuadros estan muy bonitos, si me parecio curioso verlos en otras plataformas a un menor costo, pero puede ser por las comisiones de Joum, recibes lo esperado.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 2,
          fecha: new Date(2023, 3, 4),
          contenido: 'Los herrajes para colgar los cuadros de una puntilla no están bien centrados y los cuadros de van hacia un lado.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Excelente, producto se ve muy bonito en la sala, venía muy bien empacado.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'gratis',
      ventas: 22,
      estado: true
    },
//---------------------------------------------
    {
      id: '11',
      idUsuario: '2',
      verificado: true,
      categoria: 'repisas',            
      nombre: 'Repisas Flotantes Modernas Set X 4 Un Decoracion Moderna',
      precio: 37000,
      descripcion: 'HERMOSOS CUADROS DECORATIVOS\n\nLindos cuadros con imágenes y acabados de excelente calidad.\nNuestros cuadros son hermosos y transforman cualquier entorno, seducen enamoran y conquistan a sus visitantes.\nAdemás de su belleza, están hechos de material de la más alta calidad, y la aplicación de los mejores terminados dando como resultado imágenes nítidas Brillantes con colores vivos y acabados de excelente Calidad.\n\nNo pierdas el tiempo y elige tus modelo favorito\n\nImpresión en la mas alta resoluciónTerminado laminado brillante permite limpiar',
      detalles: {
        marca: 'Industria Colombiana',
        modelo: 'Lineal',
        colores: ['Café claro'],
        fotos: [['assets/img/categoria/repisas/4.jpg', 'assets/img/categoria/repisas/6.jpg']],
        cantidadPiezas: 1,
        forma: 'rectangular',
        material: 'madera',
        autoria: 'Hecho por mi',
        altura: 8,
        unidadMedidaAltura: 'cm',
        ancho: 40,
        unidadMedidaAncho: 'cm',
        profundidad: 30,
        unidadMedidaProfundidad: 'cm',
        peso: 1,
        unidadMedidaPeso: 'kilo',
        kitInstalacion: true,
        formatoVenta: 'Unidades',
      },
      precioEnvio: 8000,
      envioGratis: true,
      unidades: 25,

      vistas: 106,
      descuento: false,
      opiniones: [
        {
          id: '3',
          idUsuario: '11',
          idProducto: '2',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Buen material las repisas son tal muestra la foto. Buenos acabado. Cliente satisfecho.'
        },
        {
          id: '5',
          idUsuario: '12',
          idProducto: '2',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Buen producto, fácil de instalar. Viene con las instrucciones. Tal cual lo ofrecen.'
        },
        {
          id: '4',
          idUsuario: '12',
          idProducto: '2',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Cumplio mis expectativas.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'premium',
      ventas: 13,
      estado: true
    },
//---------------------------------------------
    {
      id: '12',
      idUsuario: '2',
      verificado: true,
      categoria: 'iluminacion',            
      nombre: 'Lamparas colgantes para comedor ',
      precio: 75000,
      descripcion: 'HERMOSOS CUADROS DECORATIVOS\n\nLindos cuadros con imágenes y acabados de excelente calidad.\nNuestros cuadros son hermosos y transforman cualquier entorno, seducen enamoran y conquistan a sus visitantes.\nAdemás de su belleza, están hechos de material de la más alta calidad, y la aplicación de los mejores terminados dando como resultado imágenes nítidas Brillantes con colores vivos y acabados de excelente Calidad.\n\nNo pierdas el tiempo y elige tus modelo favorito\n\nImpresión en la mas alta resoluciónTerminado laminado brillante permite limpiar',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Negro',],
        fotos: [['assets/img/categoria/iluminacion/3.jpg', 'assets/img/categoria/iluminacion/4.jpg']],
        autoria: 'Hecho por mi',
        subCategoria: {
          tipo: 'Pared',
          estilo: 'Elegante',
          material: 'Aluminio',
          potencia: 6,
          inalambrico: false,
          autoadhesiva: false,
          controlRemoto: false,
          sistemaDePresion: false,
          wifi: false
        },
        formatoVenta: 'pack',
        unidadesPack: 3,
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 54,

      vistas: 236,
      descuento: true,
        porcentajeDescuento: 10,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '5',
          idUsuario: '11',
          idProducto: '3',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Buen producto hay que armar con cuidado.'
        },
        {
          id: '6',
          idUsuario: '12',
          idProducto: '3',
          calificacion: 2,
          fecha: new Date(2023, 3, 4),
          contenido: 'Este producto tiene una dificultad para armar y es increíble que no traiga instrucciones, tuve que buscar un video en youtube para poder armarla y aún así me paso que no me funciona la iluminacion.'
        },
        {
          id: '5',
          idUsuario: '11',
          idProducto: '3',
          calificacion: 5,
          fecha: new Date(2023, 3, 4),
          contenido: 'Excelente producto muy. Bonita y económica.'
        },
        {
          id: '5',
          idUsuario: '11',
          idProducto: '3',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Se ve bien me gusto bastante precio justo contento.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'premium',
      ventas: 97,
      estado: true
    },
//---------------------------------------------
    {
      id: '13',
      idUsuario: '2',
      verificado: true,
      categoria: 'macetas',            
      nombre: 'Maceta decorativda elegante y económica',
      precio: 24000,
      descripcion: 'HERMOSOS CUADROS DECORATIVOS\n\nLindos cuadros con imágenes y acabados de excelente calidad.\n Nuestros cuadros son hermosos y transforman cualquier entorno, seducen enamoran y conquistan a sus visitantes.\nAdemás de su belleza, están hechos de material de la más alta calidad, y la aplicación de los mejores terminados dando como resultado imágenes nítidas Brillantes con colores vivos y acabados de excelente Calidad.\n\nNo pierdas el tiempo y elige tus modelo favorito\n\nImpresión en la mas alta resoluciónTerminado laminado brillante permite limpiar',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Piedra con morado'],
        fotos: [['assets/img/categoria/macetas/14.jpg', 'assets/img/categoria/macetas/9.jpg'],['assets/img/categoria/cuadros/21.jpg']],
        estilo: 'Minimalista',
        tipo: 'Macetero',
        autoria: 'Hecho por mi',
        diametroBoca: 10,
        unidadMedidaDiametroBoca: 'cm',
        diametroBase: 13,
        unidadMedidaDiametroBase: 'cm',
        altura: 30,
        unidadMedidaAltura: 'cm',
        ancho: 20,
        unidadMedidaAncho: 'cm',
        largo: 10,
        unidadMedidaLargo: 'cm',
        forma: 'circular',
        material: 'arsilla',
        capacidadVolumen: 3,
        unidadMedidaVolumen: 'litros',
        sistemaAutorriego: false, 
        colgante: false,
        incluyePlato: false,
        agujerosDrenaje: false,
        aptoParaHuerta: false,
        conPlanta: true,
            tipoPlanta: 'cactus',

        formatoVenta: 'pack',
        unidadesPack: 2,
      },
      precioEnvio: 8000,
      envioGratis: true,
      unidades: 2,

      vistas: 26,
      descuento: true,
        porcentajeDescuento: 20,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '7',
          idUsuario: '11',
          idProducto: '4',
          calificacion: 5,
          fecha: new Date(2023, 11, 6),
          contenido: 'Hermosas!!! muy linda. Muy puntuales.'
        },
        {
          id: '8',
          idUsuario: '12',
          idProducto: '4',
          calificacion: 5,
          fecha: new Date(2023, 0, 23),
          contenido: 'Hermoso, tal como lo esperaba, buen terminado y muy lindo.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'premium',
      ventas: 6,
      estado: true
    },
//---------------------------------------------
    {
      id: '14',
      idUsuario: '2',
      verificado: true,
      categoria: 'relojes',            
      nombre: 'Reloj de pared artesanal',
      precio: 65000,
      descripcion: 'Reloj de parec elegante',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Café claro', ' Negro'],
        fotos: [['assets/img/categoria/relojes/1.jpg', 'assets/img/categoria/relojes/5.jpg'],['assets/img/categoria/cuadros/21.jpg']],
        tipo: 'Pared',
        estilo: 'Silver',
        material: 'Madera',
        panel: false,
        alimentacion: 'Baterias',
        montaje: 'Cinta doble fas',
        autoria: 'Garzon',
        figura: 'Cuadrada',
        altura: 30,
        unidadMedidaAltura: 'cm',
        ancho: 15,
        unidadMedidaAncho: 'cm',
        formatoVenta: 'Unidades',
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 7,

      vistas: 26,
      descuento: true,
        porcentajeDescuento: 20,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '9',
          idUsuario: '11',
          idProducto: '5',
          calificacion: 5,
          fecha: new Date(2023, 5, 12),
          contenido: 'Excelente producto, recomendado al 100%.'
        },
        {
          id: '10',
          idUsuario: '12',
          idProducto: '5',
          calificacion: 5,
          fecha: new Date(2023, 7, 25),
          contenido: 'Muy buen producto'
        },
        {
          id: '10',
          idUsuario: '12',
          idProducto: '5',
          calificacion: 4,
          fecha: new Date(2023, 7, 22),
          contenido: 'Funciona bien está bueno y muy lindo.'
        },
      ],
      calificacion: 3.5,
      tipoPublicacion: 'premium',
      ventas: 6,
      estado: true
    },
//---------------------------------------------
    {
      id: '15',
      idUsuario: '2',
      verificado: true,
      categoria: 'difusores',            
      nombre: 'Humificador Led Difusor Usb 7 Colores Oficina + Esencia',
      precio: 47000,
      descripcion: '****** EL COLOR SE ENCUENTRA SUJETO A CAMBIOS DE INVENTARIO, PUEDE LLEGARTE MARRON CLARO, OSCURO o BLANCO ASI COMO EL DISEÑO SUJETO A DISPONIBILidAD , SE CUENTA CON DIFERENTES DISEÑOS COMO SE COMO SE OBSERVA EN IMAGENES***',
      detalles: {
        marca: 'HUMidIFIER',
        modelo: 'Spartan',
        colores: ['Negro', ' Blanco'],
        fotos: [['assets/img/categoria/difusores/3.jpg', 'assets/img/categoria/difusores/5.jpg']],
        tipo: 'Humificador difusor',
        tecnologiaDifusion: 'Electrónica',
        materia: 'Aluminio',
        temporizador: false,
        lucesLed: false,
        apagadoAutomatico: true,
        instruccionesUso: 'Conectar a tpca corriente, y precionar el boton de enscendido.',
        formatoVenta: 'Unidades',
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 2,

      vistas: 26,
      descuento: false,
      opiniones: [
        {
          id: '11',
          idUsuario: '11',
          idProducto: '6',
          calificacion: 1,
          fecha: new Date(2023, 6, 26),
          contenido: 'Salio defectuoso y no me respondieron.'
        },
        {
          id: '12',
          idUsuario: '12',
          idProducto: '6',
          calificacion: 5,
          fecha: new Date(2023, 5, 5),
          contenido: 'Buen producto, funciona si se siguen correctamente las instrucciones. La función de lámpara es útil e independiente.'
        },
        {
          id: '12',
          idUsuario: '12',
          idProducto: '6',
          calificacion: 4,
          fecha: new Date(2023, 7, 14),
          contenido: 'Me parece que está bien para un cuarto mas o menos pequeño. Para espacios mas grandes puede que se quede un poco corto. Pero en general es un buen producto.'
        },
        {
          id: '12',
          idUsuario: '12',
          idProducto: '6',
          calificacion: 4,
          fecha: new Date(2023, 6, 23),
          contenido: 'pariencia muy buena pero le falta al difusor mas potencia.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'gratuita',
      ventas: 18,
      estado: true
    },
//---------------------------------------------
    {
      id: '16',
      idUsuario: '2',
      verificado: true,
      categoria: 'vinilos',            
      nombre: 'Sticker Vinilo Frase 80 X 60 Cm',
      precio: 44000,
      descripcion: 'STICKER EN VINILO - PARED DECORACIÓN HOGAR - PUERTAS - HABITACIONES - SALAS - NEGOCIOS Hermoso vinilo decorativo que da un toque único y personalizado a tus espacios.',
      detalles: {
        marca: 'Vinilos indigo',
        modelo: 'Frase motivacionas',
        colores: ['Negro'],
        fotos: [['assets/img/categoria/vinilos/2.jpg', 'assets/img/categoria/vinilos/9.jpg']],
        autoria: 'Hecho por mi',
        diseño: 'Frase',
        material: 'plastico',
        tematica: 'Inspiración',
        altura: 1,
        unidadMedidaAltura: 'm',
        ancho: 1.5,
        unidadMedidaAncho: 'm',
        formatoVenta: 'Unidades',
      },
      precioEnvio: 8000,
      envioGratis: true,
      unidades: 14,

      vistas: 76,
      descuento: false,
      opiniones: [
        {
          id: '13',
          idUsuario: '11',
          idProducto: '7',
          calificacion: 4,
          fecha: new Date(2023, 8, 20),
          contenido: 'Le di 4 estrellas en instalación porque es de bastante cuidado, pero ya el resultado es súper genial !.'
        },
        {
          id: '14',
          idUsuario: '12',
          idProducto: '7',
          calificacion: 3,
          fecha: new Date(2023, 7, 8),
          contenido: 'Me encanto. Muy buenos acabados.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'gratuita',
      ventas: 4,
      estado: true
    },
//---------------------------------------------
    {
      id: '17',
      idUsuario: '2',
      verificado: true,
      categoria: 'adornos',            
      nombre: 'Figura Iron Man Marvel Cabeza Oscilante Repisa Y Automóvil',
      precio: 35000,
      descripcion: 'PREGUNTAR POR LA DISPONIBILidAD DEL PRODUCTO ANTES DE LA COMPRA @@@@@@@@ TIENDA VIRTUAL @@@@@@@@ ########## DUCKSHOP91 ######### Tenemos Experiencia Mercadolider Platinum, La medalla mas alta de mercadolibre caracterizados por calidad y cumplimiento. Favor PREGUNTAR ANTES DE OFERTAR. Esperamos a que te animes. Hacemos grandes ofertas para nuestros clientes, Pregunta por ellas.',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Naranja con planeado'],
        fotos: [['assets/img/categoria/adornos/7.jpg', 'assets/img/categoria/adornos/6.jpg']],
        autoria: 'Funk Pop',
        materia: 'plastico, resina',
        tema: 'Figura de acción',
        linea: 'Cabezaones',
        personaje: 'Aironman',
        significado: 'N/A',
        altura: 20,
        unidadMedidaAltura: 'cm',
        ancho:10,
        unidadMedidaAncho: 'cm',
        profundidad: 10,
        unidadMedidaProfundidad: 'cm',
        coleccionable: true,
          coleccion: 'Marvel',
        incluyeAccesorios: false,
        articulada: false,
        piezasIntercambiables: false,
        formatoVenta: 'Pack',
        unidadesPack: 2,
      },
      precioEnvio: 8000,
      envioGratis: false,
      unidades: 2,

      vistas: 73,
      descuento: true,
        porcentajeDescuento: 10,
        diasDescuento: 20,
        fechaDescuento: new Date(17/4/2003),
      opiniones: [
        {
          id: '15',
          idUsuario: '11',
          idProducto: '8',
          calificacion: 5,
          fecha: new Date(2023, 7, 8),
          contenido: 'Muy bacano.'
        },
        {
          id: '16',
          idUsuario: '12',
          idProducto: '8',
          calificacion: 5,
          fecha: new Date(2023, 8, 25),
          contenido: 'Es lo que esperaba, es igual a lo que se ve en las imagenes, vino en buenas condiciones.'
        }
      ],
      calificacion: 3.5,
      tipoPublicacion: 'buena',
      ventas: 26,
      estado: true
    },
    //---------------------------------------------
    {
      id: '18',
      idUsuario: '2',
      verificado: true,
      categoria: 'cuadros',            
      nombre: 'Cuadro Tríptico Plumas Geométricas',
      precio: 45000,
      descripcion: 'Cuadro Tríptico Plumas Geométricas no solo es una obra de arte, sino también una declaración de estilo y creatividad\n\nEsta cautivadora obra de arte contemporánea combina la belleza de las plumas naturales con la precisión de las formas geométricas, creando una fusión única entre lo orgánico y lo abstracto.\nCada uno de los tres paneles presenta una pluma estilizada, meticulosamente diseñada con líneas nítidas y ángulos precisos que resaltan su esencia natural de manera moderna con una medición de 120 cm de altura y 30 de ancho. Agrega un toque de serenidad y elegancia a cualquier espacio en el que se exhiba.\n\nYa sea que lo coloques en tu sala de estar, dormitorio o espacio de trabajo, este cuadro tríptico se convierte en un punto focal que captura la atención y estimula la conversación. Su diseño versátil se adapta perfectamente a una variedad de estilos decorativos, desde lo minimalista hasta lo ecléctico.',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Negro'],
        fotos: [['assets/img/categoria/cuadros/23.jpg', 'assets/img/categoria/cuadros/24.jpg']],
        tematica: 'naturaleza',
        autoria: 'Hecho por mi',
        altura: 120,
        unidadMedidaAltura: 'cm',
        ancho: 30,
        unidadMedidaAncho: 'cm',
        marco: false,
        frase: false,
        formatoVenta: 'unidades'
      },
      precioEnvio: 9200,
      envioGratis: true,
      unidades: 10,

      vistas: 36,
      descuento: true,
        porcentajeDescuento: 20,
        diasDescuento: 30,
        fechaDescuento: new Date(17/1/2006),
      opiniones: [
        {
          id: '1',
          idUsuario: '11',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 13, 8),
          contenido: 'Este cuadro tríptico de plumas geométricas es una maravillosa combinación de la naturaleza y el arte abstracto. Me encanta cómo las formas geométricas dan vida a las plumas de manera única. Definitivamente es una pieza que añadiría un toque moderno y sofisticado a cualquier espacio'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 11, 7),
          contenido: 'La fusión de las plumas con las formas geométricas en este cuadro tríptico es impresionante. La precisión en los detalles hacen que esta obra sea hipnotizante.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 15, 7),
          contenido: 'Este cuadro tríptico es genial, la calidad es muy buena ¡las plumas parecen cobrar vida con las formas geométricas!'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 2,
          fecha: new Date(2023, 3, 8),
          contenido: 'No me transmite ninguna emoción y siento que simplemente está ahí sin un propósito claro. Además, el precio no me parece tan justo para el producto.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 3,
          fecha: new Date(2023, 6, 5),
          contenido: 'Me encanta la idea detrás del cuadro, pero tal vez podría haber una mejor elección de colores para las formas geométricas.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Adquirí el cuadro tríptico Plumas Geométricas y me sorprendió lo bien que encaja con mi estilo moderno. La calidad del producto y el color muestran un nivel de atención al detalle.',
        },
      ],
      tipoPublicacion: 'gratis',
      ventas: 14,
      estado: true
    },
    //---------------------------------------------
    {
      id: '19',
      idUsuario: '2',
      verificado: true,
      categoria: 'cuadros',            
      nombre: 'Cuadros de hojas verde con decoración nórdica',
      precio: 70000,
      descripcion: 'Cuadros de planta con decoración nórdica sería una pieza de arte que encapsula la estética minimalista y funcional característica de este estilo.\nSon cuadros que generan un entorno tranquilo y sereno. Los colores predominantes son tonos neutros, como blanco, gris, plateados, verdes o beige, con posibles acentos de colores suaves y naturales.\n Nuestros cuadros son hermosos y transforman cualquier entorno, seducen enamoran y conquistan a sus visitantes.\nEstos cuadros proporciona un toque de calma y naturalidad a cualquier espacio, siguiendo la esencia característica de la decoración nórdica',
      detalles: {
        marca: 'Generica',
        modelo: 'N/A',
        colores: ['Neutros'],
        fotos: [['assets/img/categoria/cuadros/25.jpg', 'assets/img/categoria/cuadros/26.jpg','assets/img/categoria/cuadros/27.jpg']],
        tematica: 'Naturaleza',
       autoria: 'Hecho por nordic',
        altura: 55,
        unidadMedidaAltura: 'cm',
        ancho: 40,
        unidadMedidaAncho: 'cm',
        tipoPanel: 'Triptico',
        marco: true,
        frase: false,
        formatoVenta: 'unidades'
      },
      precioEnvio: 7000,
      envioGratis: true, 
      unidades: 12,

      vistas: 56,
      descuento: false,
      opiniones: [
        {
          id: '1',
          idUsuario: '11',
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 5, 9),

          contenido: 'La elección de colores y detalles en estos cuadros de hojas es encantadora. Aportan un toque de elegancia y serenidad a mi hogar.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 6, 2),
          contenido: 'Me encanta cómo estos cuadros de hojas añaden un toque de frescura y naturaleza a mi espacio. Son perfectos para crear un ambiente relajante en cualquier habitación. Además, la calidad es muy buena.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 8, 12),
          contenido: 'Sería genial ver una mayor variedad de colores en los cuadros de hojas para agregar un toque más vibrante y dinámico a la colección.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 3,
          fecha: new Date(2023, 5, 11),
          contenido: 'Me parece que los cuadros están muy bien diseñados. Sin embargo me decepciona un poco el materia, calidad-precio no esta del todo bien.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 3, 9),
          contenido: 'Los cuadros estan muy bonitos, si me parecio curioso verlos en otras plataformas a un menor costo, pero puede ser por las comisiones de Joum, recibes lo esperado.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 3, 4),
          contenido: 'Me gusta mucho el detalle y las paletas de colores. Me parece que le da un toque bonito a sitios con luz. De igual manera cuenta con buen tamaño y su calidad es buena.'
        },
      ],
      tipoPublicacion: 'gratis',
      ventas: 9,
      estado: true
    },
    {
      id: '20',
      idUsuario: '1',
      verificado: true,
      categoria: 'repisas',            
      nombre: 'Repisa de madera para pared',
      precio: 68000,
      descripcion: 'REPISA DE MADERA\n\n Es una repisa de madera para la pared y se utiliza como un accesorio de decoración. Esta repisa consta de una plataforma plana hecha de madera que sobresale de la pared y se utiliza para exhibir objetos decorativos, libros u otros artículos. \n Estas repisas tienen una medición de 20 cm de largo y 15 cm de ancho con excelente, estilo y acabados. Se adapta a diferentes estilos de decoración y necesidades de almacenamiento. La calidad de la madera y el sistema de montaje de la repisa puede asegurar que cumple con tus expectativas y necesidades.\nSi tienes alguna preocupación específica sobre la repisa de madera que has adquirido, estaré encantado de ayudarte a resolverla.',
      detalles: {
        marca: 'Monaco',  
        modelo: 'Repisa flotante',
        colores: ['Madera'], 
        fotos: [['assets/img/categoria/cuadros/25.jpg', 'assets/img/categoria/cuadros/26.jpg','assets/img/categoria/cuadros/27.jpg']],
        cantidadPiezas: 2,
        forma: 'Rectangular',
        materia: 'Madera',
        autoria: 'Hecho por mi',

        altura: 20,      /*--- medición ---*/
        unidadMedidaAltura: 'cm',
        ancho: 15,
        unidadMedidaAncho: 'cm',
        profundidad: 2,
        unidadMedidaProfundidad: 'cm',
        peso: 5,
        unidadMedidaPeso: 'kg',

        kitInstalacion: true,

        formatoVenta: 'unidades',
      },
      precioEnvio: 10500, 
      envioGratis: false,
      unidades: 11,

      vistas: 25,
      descuento: true,
        porcentajeDescuento: 10,
        diasDescuento: 60,
        fechaDescuento: new Date(15/6/2023),
        opiniones: [
        {
          id: '1',
          idUsuario: '11',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 5, 9),         
         contenido: 'Me encanta cómo la repisa flotante de madera añadió un toque de elegancia a mi espacio. Su diseño minimalista y la madera es alta calidad.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 5,
          fecha: new Date(2023, 5, 9),
          contenido: 'Esta repisa flotante de madera es un excelente espacio de almacenamiento adicional. Pude exhibir cualquier libro, piezas de arte. Su instalación fue sencilla y el resultado final es impresionante.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 4,
          fecha: new Date(2023, 7, 23),
          contenido: 'La repisa flotante de madera no solo es funcional, sino que también aporta calidez a la habitación. El color y la textura de la madera natural sigue estando en buenas condiciones sin importar el tiempo de uso.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 3,
          fecha: new Date(2023, 17, 6),
          contenido: 'Sería genial si se incluyera un sistema de instalación más robusto. Aunque la repisa flotante encaja bien en la pared, un sistema de montaje que brinde mayor estabilidad y facilidad de ajuste sería una mejora bienvenida.'
        },
        {
          id: '2',
          idUsuario: '12',
          idProducto: '1',
          calificacion: 3,
          fecha: new Date(2023, 3, 8),
          contenido: 'Me gustaría ver más opciones de tamaños disponibles. Si hubiera una gama más amplia de dimensiones para elegir, sería más fácil encontrar una repisa flotante que se adapte perfectamente a mi espacio, evitando la necesidad de ajustes adicionales.'
        },
      ],
      tipoPublicacion: 'gratis',
      ventas: 16,
      estado: true
    },

  ]
  
  getProducts(): Producto[] {
    return this.productos;
  }
  
  getProductsId(dato: string): Producto | undefined{
    return this.productos.find(producto =>  producto.id === dato);
  }
}
