import { inject, Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { UsuarioService } from './usuario.service';
import { CrearSalaArgs } from '../interface/crearSala';
import { unirseASalaArgs } from '../interface/unirseSala';
import { SalaBackend } from '../interface/sala';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  server = io("localhost:3001",{autoConnect:false})
  usuarioService = inject(UsuarioService);
  actualizacionDeSala$ = new Subject<SalaBackend>()
  constructor() { 
    this.server.on('connect', ()=>{
      console.log('conectado al servidor');
    });
    this.server.onAny(event => console.log('onAny: ',event))
    this.server.on("sala",(args) => {
      this.actualizacionDeSala$.next(args);
    });
    this.server.connect();
  }

  

}
