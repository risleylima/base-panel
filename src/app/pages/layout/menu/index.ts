'use strict';
import { NbMenuItem } from '@nebular/theme';

interface Menu extends Record<string, any> {
  cabecalho: NbMenuItem[];
  agentes?: NbMenuItem[];
  clientes?: NbMenuItem[];
  comum?: NbMenuItem[];
  fornecedores?: NbMenuItem[];
  funcionarios?: NbMenuItem[];
  lojas?: NbMenuItem[];
  transportadoras?: NbMenuItem[];
}

export const Menu: Menu = {
  cabecalho: [
    {
      title: 'Inicio',
      icon: {
        icon: 'home',
        pack: 'font-awesome-solid'
      },
      pathMatch: 'prefix',
      link: '/pages/start'
    }
  ]
};