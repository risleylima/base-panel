import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../utils/utils.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Session } from 'src/app/classes';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private session?: Session;

  public atualizacao = new EventEmitter();

  constructor(
    private http: HttpClient,
    private utils: UtilsService
  ) { }

  getSession(): Observable<Session> {
    if (!this.session) {
      return this.getPayload();
    } else {
      return new Observable((subscriber) => {
        this.atualizacao.emit(this.session);
        subscriber.next(this.session);
        subscriber.complete();
      });
    }
  }


  getPayload(): Observable<Session> {
    return this.http.get<Session>(`${environment.apiUrl}/sessions`)
      .pipe(catchError(err => this.utils.catchError(err)), map((data) => {
        this.session = data;
        this.atualizacao.emit(data);
        return data;
      }));
  }

  atualizaSession(dados: Session): Observable<Session> {
    const session = Object.assign({}, this.session, dados);
    return this.http.put<Session>(`${environment.apiUrl}/sessions/`, session)
      .pipe(catchError(err => this.utils.catchError(err)), map((retorno: Session) => {
        this.session = retorno;
        this.atualizacao.next(retorno);
        return retorno;
      }));
  }

  destroy(): void {
    this.session = undefined;
  }
}
