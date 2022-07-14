import * as moment from 'moment';

export interface User {
  id?: number;
  nome: string;
  email: string;
  login: string;
  password?: string;
  newPassword?: string;
  confNewPassword?: string;
  status: boolean;
  pessoaId?: number;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
  deletedAt?: moment.Moment;
}

export class User implements User {
  private _avatar?: string;

  constructor(dados: Partial<User>) {
    // DATAS
    dados.createdAt = moment(dados.createdAt);
    dados.updatedAt = moment(dados.updatedAt);
    dados.deletedAt = dados.deletedAt ? moment(dados.updatedAt) : undefined;

    Object.assign(this, dados);
  }

  set avatar(data: string) {
    this._avatar = data;
  }

  get avatar(): string {
    return this._avatar ? this._avatar : 'assets/img/null-Avatar.png';
  };
}

export interface ListaUser {
  count: number;
  rows: User[];
};