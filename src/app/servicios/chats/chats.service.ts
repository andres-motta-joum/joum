import { Chat } from "src/app/interfaces/chat";

export class ChatsService{
  private chats: Chat[] = [
    {
      numVenta: 1,
      mensajes: [
        {
          fecha: new Date(),
          contenido: 'Hola buen día señor Andresito, como está? Aparte de guapo',
          remitente: 'cliente'
        },
        {
          fecha: new Date(),
          contenido: 'Hola, ¿en qué le puedo ayudar señorita Jeni?',
          remitente: 'vendedor'
        },
        {
          fecha: new Date(),
          contenido: 'El producto que compre, podría llegar hoy?',
          remitente: 'cliente'
        },
        {
          fecha: new Date(),
          contenido: 'Puede que si, puede que no',
          remitente: 'vendedor'
        }
      ],
      bloqueo: false
    },
    {
      numVenta: 2,
      mensajes: [
        {
          fecha: new Date(),
          contenido: 'Hola buen día',
          remitente: 'cliente',
        },
        {
          fecha: new Date(),
          contenido: 'Hola, ¿en qué le puedo ayudar?',
          remitente: 'vendedor'
        }
      ],
      bloqueo: false
    },
    {
      numVenta: 3,
      mensajes: [
        {
          fecha: new Date(),
          contenido: 'Hola buen día',
          remitente: 'cliente'
        },
        {
          fecha: new Date(),
          contenido: 'Hola, ¿en qué le puedo ayudar?',
          remitente: 'vendedor'
        }
      ],
      bloqueo: false
    },
    {
      numVenta: 4,
      mensajes: [
        {
          fecha: new Date(),
          contenido: 'Hola buen día',
          remitente: 'cliente'
        },
        {
          fecha: new Date(),
          contenido: 'Hola, ¿en qué le puedo ayudar?',
          remitente: 'vendedor'
        }
      ],
      bloqueo: false
    }
  ]

  getChats(): Chat[]{
    return this.chats;
  }
  getChatId(id: number): Chat | undefined{
    return this.chats.find(chat => chat.numVenta === id)
  }
}
