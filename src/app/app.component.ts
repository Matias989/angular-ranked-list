import { Component } from '@angular/core';
import { RankedListComponent } from './components/ranked-list/ranked-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RankedListComponent, // Importa tu componente standalone
  ],
})
export class AppComponent {
  title = 'tetones';
}
