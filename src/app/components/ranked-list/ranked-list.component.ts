import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RiotService } from '../../services/riot.service';

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
  ],
})
export class RankedListComponent {
  players: any[] = []; // Lista de jugadores
  loading: boolean = false;

  constructor(private riotService: RiotService) {}

  ngOnInit(): void {
    this.loadPlayers([
      { gameName: 'Raziel', tagLine: 'NET' },
      { gameName: 'Agutito', tagLine: 'LAS' },
      { gameName: 'Arieel ito', tagLine: 'LAS' },
      { gameName: 'LOLA MONTERO', tagLine: '2004' },
      { gameName: 'Kënny', tagLine: 'VLLC' },
    ]);
  }

  async loadPlayers(users: { gameName: string; tagLine: string }[]): Promise<void> {
    this.loading = true;

    const results = [];
    for (const user of users) {
      try {
        const account = await this.riotService.getAccountByRiotId(user.gameName, user.tagLine).toPromise();
        if (!account) continue;

        const summoner = await this.riotService.getSummonerByPUUID(account.puuid).toPromise();
        if (!summoner) continue;

        const rankedInfo = await this.riotService.getRankedInfoBySummonerId(summoner.id).toPromise();
        const ranked = rankedInfo.find((entry: any) => entry.queueType === 'RANKED_SOLO_5x5') || null;

        results.push({
          gameName: user.gameName,
          tagLine: user.tagLine,
          ranked,
        });
      } catch (error) {
        console.error(`Error fetching data for user: ${user.gameName}`, error);
      }
    }

    this.players = results
      .filter((player) => player && player.ranked)
      .sort((a, b) => {
        const tierOrder = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];
        const rankOrder = ['IV', 'III', 'II', 'I'];

        const tierComparison = tierOrder.indexOf(b.ranked?.tier) - tierOrder.indexOf(a.ranked?.tier);
        if (tierComparison !== 0) return tierComparison;

        const rankComparison = rankOrder.indexOf(b.ranked?.rank) - rankOrder.indexOf(a.ranked?.rank);
        if (rankComparison !== 0) return rankComparison;

        return (b.ranked?.leaguePoints || 0) - (a.ranked?.leaguePoints || 0);
      });

    this.loading = false;
  }
}
