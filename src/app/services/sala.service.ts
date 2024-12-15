import { inject, Injectable, Signal, signal } from '@angular/core';
import { EstadoJuego, SalaBackend, statusRespuesta } from '../interface/sala';
import { Jugador } from '../interface/Jugador';
import { ServerService } from './server.service';
import { CrearSalaArgs } from '../interface/crearSala';
import { unirseASalaArgs } from '../interface/unirseSala';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  serverService = inject(ServerService);
  usuarioService = inject(UsuarioService);

  constructor() { 
    this.serverService.actualizacionDeSala$.subscribe((sala)=> {
      this.desestructurarSala(sala);
    });
  }

  jugador1 = signal<Jugador>({name:''});
  jugador2 = signal<Jugador>({name:''});
  imageURL = signal<string>('');
  estado = signal<EstadoJuego> ("ESPERANDO_JUGADOR");
  name = signal<string>('');
  respuesta = signal<statusRespuesta>('ESPERANDO_RESPUESTA');
  numeroJugador = signal<1|2|undefined>(undefined);
  id = signal<number|undefined>(undefined);

  
  desestructurarSala(salaBack:SalaBackend){
    console.log('desestructurando: ',salaBack);
    this.id.set(salaBack.roomID);
    this.jugador1.set(salaBack.players[0]);
    this.jugador2.set(salaBack.players[1]);
    this.estado.set(salaBack.status);
    this.imageURL.set(salaBack.imageURL);
    this.name.set(salaBack.signal);
  }

  crearSala(esPrivada:boolean = false){
    console.log('Creando sala para jugador',this.usuarioService.nombre());
    const args:CrearSalaArgs={
      publica: !esPrivada,
      userID: this.usuarioService.nombre(),
    }
    this.serverService.server.emitWithAck('crearSala',args).then(res => {
      this.desestructurarSala(res.sala);
      this.numeroJugador.set(1);
      console.log('Crear sala',res);
    })
  }

  unirseASala(id:number){
    const args:unirseASalaArgs = {
      roomID: id,
      userID: this.usuarioService.nombre(),
    }
    this.serverService.server.emitWithAck('unirseASala',args).then(res =>{
      console.log('Resultado de unión a sala',res);
      this.numeroJugador.set(2);
      this.desestructurarSala(res.sala);
    })
  }
  /*
    PENDIENTES POR IMPLEMENTAR
    - Lógica del tiempo
    - Si escribe una respuesta bloquear el input para que no escriba mas
    - Cuando gane el jugador aumentar su puntaje
  */
  jugar(respuestaJugador:string){
    if(respuestaJugador === this.name()){
      this.respuesta.set('CORRECTA');
    }
    else{
      this.respuesta.set('INCORRECTA');
    }
    console.log('Respuesta Jugador',respuestaJugador,' Estado de la respuesta: ',this.respuesta());
    this.serverService.server.emit("jugar",{
      salaId: this.id(),
      jugador: this.numeroJugador(),
      status: this.respuesta(),
    })
  }
}
