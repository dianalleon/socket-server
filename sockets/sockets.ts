import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = (client: Socket) => {

    client.on('disconnect', () => {
        console.log('cliente desconectado')
    })
}

export const mensaje = (client: Socket, io: socketIO.Server) => {
    client.on('mensaje', (payload:{de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload)

        io.emit('mensaje-nuevo', payload);


    })
}