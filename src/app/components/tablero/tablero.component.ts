import { Component, computed, inject } from '@angular/core';
import { SalaService } from '../../services/sala.service';
import { FormsModule } from '@angular/forms';
//import { posicionTablero } from '../../interface/sala';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.scss'
})
export class TableroComponent {
  salaServices = inject(SalaService);
  jugar(respuesta: string){
    this.salaServices.recibirRespuesta(respuesta)
  }
}
