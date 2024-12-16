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
  imageURL = signal<string[]>([]);
  estado = signal<EstadoJuego> ("ESPERANDO_JUGADOR");
  name = signal<string[]>([]);
  respuesta = signal<statusRespuesta>('ESPERANDO_RESPUESTA');
  numeroJugador = signal<1|2|undefined>(undefined);
  id = signal<number|undefined>(undefined);
  conteo = signal<number>(0);
  respuestasJugador: string[] = [];

  
  desestructurarSala(salaBack:SalaBackend){
    console.log('desestructurando: ',salaBack);
    this.id.set(salaBack.roomID);
    this.jugador1.set(salaBack.players[0]);
    this.jugador2.set(salaBack.players[1]);
    this.estado.set(salaBack.status);
    this.imageURL.set(salaBack.imageURL);
    this.name.set(salaBack.signal);
    this.conteo.set(0);
  }

  crearSala(esPrivada:boolean = false){
    console.log('Creando sala para jugador',this.usuarioService.nombre());
    const args:CrearSalaArgs={
      publica: !esPrivada,
      userID: this.usuarioService.nombre(),
    }
    this.conteo.set(0);
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
    this.conteo.set(0);
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
  jugar(){
    let numeroRespuestas = 0;
    for (let i = 0; i < this.name().length; i++) {
      if(this.respuestasJugador[i] !== this.name()[i]){
        this.respuesta.set('INCORRECTA');
        break;
      }
      numeroRespuestas = i;
    }
    console.log('numero respuestas ',numeroRespuestas)
    if(numeroRespuestas === (this.name().length -1)){
      this.respuesta.set('CORRECTA');
    }
    console.log("Estado de la respuesta",this.respuesta())
    this.respuestasJugador = [];
    this.serverService.server.emit("jugar",{
      salaId: this.id(),
      jugador: this.numeroJugador(),
      status: this.respuesta(),
      secuenciaRecordada: numeroRespuestas,
    })
  }

  recibirRespuesta(respuesta:string){
    this.respuestasJugador.push(respuesta);
    console.log('REspuestas del jugador', this.respuestasJugador);
    console.log('cantidad de señas ',this.name().length)
    console.log('Nimero de respuestas ingresadas por el usuario', this.conteo());
    if((this.name().length -1) === this.conteo()){
      this.conteo.set(0);
      console.log('reseteo de contador ',this.conteo)
      this.jugar()
    }
    this.conteo.set(this.conteo() +1);
  }
}
