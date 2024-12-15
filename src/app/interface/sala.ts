import { Jugador } from "./Jugador";

export type EstadoJuego = "ESPERANDO_JUGADOR" | "VICTORIA_P1" | "VICTORIA_P2" | "JUGAR" | "ABANDONADO" 

export interface SalaBackend{
    publica: boolean;
    //jugadores: [Jugador,Jugador];
    players: [Jugador,Jugador];
    //id: number;
    roomID: number;
    //estado: EstadoJuego;
    status: EstadoJuego;
    imageURL: string;
    signal: string;
    //tablero: Tablero;
}
export type statusRespuesta = 'INCORRECTA' | 'CORRECTA' | 'TIEMPO_AGOTADO' | 'ESPERANDO_RESPUESTA'