import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule

@Component({
  selector: 'app-ranked-list',
  templateUrl: './ranked-list.component.html',
  styleUrls: ['./ranked-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule, // Importar HttpClientModule para habilitar HttpClient
  ],
})
export class RankedListComponent {
  players: any[] = []; // Lista de jugadores
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.loading = true;

    // Realizar solicitud al endpoint
    this.http.get<any[]>('https://tetones.glitch.me/players').subscribe({
      next: (data) => {
        this.players = data; // Asignar directamente los datos del backend
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching players:', err);
        this.loading = false;
      },
    });
  }
}
