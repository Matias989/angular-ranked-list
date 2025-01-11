import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RiotService {
  private readonly apiKey = 'RGAPI-5240699a-22a2-445d-b554-76031b2e8c62';

  constructor(private http: HttpClient) {}

  getAccountByRiotId(gameName: string, tagLine: string): Observable<any> {
    const url = `/riot-api/americas/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    return this.http.get(url, { headers: { 'X-Riot-Token': this.apiKey } });
  }

  getSummonerByPUUID(puuid: string): Observable<any> {
    const url = `/riot-api/la2/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    return this.http.get(url, { headers: { 'X-Riot-Token': this.apiKey } });
  }

  getRankedInfoBySummonerId(summonerId: string): Observable<any> {
    const url = `/riot-api/la2/lol/league/v4/entries/by-summoner/${summonerId}`;
    return this.http.get(url, { headers: { 'X-Riot-Token': this.apiKey } });
  }
}