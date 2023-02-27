import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';
import socketIO from 'socket.io';
import * as sockect from '../sockets/sockets'
import { mensaje } from '../sockets/sockets';

export default class Server {

    private static _instance: Server;
    public app: express.Application ;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app )
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this()  )
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets')
        this.io.on('connection', client => {
            console.log('cliente conectado')

            //Sockets
            sockect.mensaje(client, this.io);

            //Desconectar
            sockect.desconectar(client)
        })
        //on para escuchar algun evento
    }

    start(callback: Function){
        this.httpServer.listen(this.port, callback);
    }
}