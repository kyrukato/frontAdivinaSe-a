import { Component, computed, inject } from '@angular/core';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-detalles-partida',
  standalone: true,
  imports: [],
  templateUrl: './detalles-partida.component.html',
  styleUrl: './detalles-partida.component.scss'
})
export class DetallesPartidaComponent {
  salaServices = inject(SalaService);
  /*vidasP1 = computed(() => new Array(this.salaServices.jugador1().vidas));
  vidasP2 = computed(() => new Array(this.salaServices.jugador2().vidas));*/
}
