import { Component, inject, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { CrearSalaArgs } from '../../interface/crearSala';
import { UsuarioService } from '../../services/usuario.service';
import { TableroComponent } from '../../components/tablero/tablero.component';
import { DetallesPartidaComponent } from '../../components/detalles-partida/detalles-partida.component';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-jugar',
  standalone: true,
  imports: [RouterModule, TableroComponent, DetallesPartidaComponent],
  templateUrl: './jugar.component.html',
  styleUrl: './jugar.component.scss'
})
export class JugarComponent implements OnInit {
  serverService = inject(ServerService);
  usuarioService = inject(UsuarioService);
  salaService = inject(SalaService);
  esPrivada = input();
  id = input<string>()

  ngOnInit(): void {
    if(!this.esPrivada() && !this.id()){
      this.salaService.crearSala();
    }
    else if(this.id()){
      this.salaService.unirseASala(parseInt(this.id()!));
    } else{
      this.salaService.crearSala(true);
    }
  }
}
