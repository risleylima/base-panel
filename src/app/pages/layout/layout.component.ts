import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NbIconLibraries, NbMenuItem, NbSidebarComponent } from '@nebular/theme';
import * as moment from 'moment';
import { User } from 'src/app/classes/user';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Menu } from './menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidebarComponent', { static: false }) private _sidebarComponent?: NbSidebarComponent;

  public ano: number = new Date().getFullYear();

  public user: User = new User({
    nome: "Risley Lima",
    email: "risley@rlimainfo.com.br",
    login: "risley",
    status: true,
    createdAt: moment(),
    updatedAt: moment(),
  });

  public items = [
    { title: 'Atualizar' },
    { title: 'Fechar' },
    { title: 'Trocar Usuário' },
  ];

  public menuItems: NbMenuItem[] = [
    ...Menu.cabecalho
  ];

  constructor(
    public utils: UtilsService,
    private _iconLibraries: NbIconLibraries,
  ) {
    this._iconLibraries.registerFontPack('font-awesome-solid', { packClass: 'fas', iconClassPrefix: 'fa' });
    this._iconLibraries.registerFontPack('font-awesome-regular', { packClass: 'far', iconClassPrefix: 'fa' });
    this._iconLibraries.registerFontPack('font-awesome-brands', { packClass: 'fab', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
  }

  collapseSidebar(): void {
    const size = this.utils.getViewport()
    if (this._sidebarComponent && (size === 'sm' || size === 'xs')) {
      this._sidebarComponent.collapse()
    }
  }

}
