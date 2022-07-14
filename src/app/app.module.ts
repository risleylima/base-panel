import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbMomentDateModule } from '@nebular/moment';

import { environment } from 'src/environments/environment';

import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from './interceptors';
import { AuthGuardService } from './services/auth/auth-guard.service';

export class RlimaJWTToken extends NbAuthJWTToken {
  constructor(token: any, ownerStrategyName: string, createdAt?: Date | undefined) {
    super(token, ownerStrategyName, createdAt)
  }

  override getTokenExpDate(): Date {
    const date = new Date(0);

    const decoded = this.getPayload();
    if (decoded && decoded.hasOwnProperty('exp')) {
      date.setUTCSeconds(decoded.exp - 10); // 'cause jwt token are set in seconds
    }
    return date;
  }
}

import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken
} from '@nebular/auth';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbMomentDateModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'username',
          token: {
            key: 'token',
            class: RlimaJWTToken,
          },
          baseEndpoint: environment.apiUrl,
          login: {
            endpoint: '/auth/login',
            method: 'post',
            defaultErrors: ['Erro de comunicação com o servidor!']
          },
          logout: {
            endpoint: '/auth/logout',
            method: 'delete',
            defaultErrors: ['Erro de comunicação com o servidor!']
          },
          refreshToken: {
            endpoint: '/auth/refreshToken',
            method: 'get',
            defaultErrors: ['Erro de comunicação com o servidor!'],
            redirect: {
              success: null,
              failure: null,
            },
          },
          requestPass: {
            endpoint: '/auth/requestPassword',
            method: 'post',
            defaultErrors: ['Erro de comunicação com o servidor!'],
            redirect: {
              success: '/',
              failure: null
            }
          },
          resetPass: {
            endpoint: '/auth/resetPassword',
            method: 'post',
            defaultErrors: ['Erro de comunicação com o servidor!'],
            redirect: {
              success: '/',
              failure: null
            }
          },
          errors: {
            key: 'erro'
          },
          messages: {
            key: 'msg'
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 1500,
          strategy: 'username',
          rememberMe: false,
          showMessages: {
            success: true,
            error: true,
          },
          socialLinks: null,
          redirect: {
            success: '/',
            failure: null,
          },
        },
        logout: {
          redirectDelay: 500,
          strategy: 'username'
        },
        requestPassword: {
          redirectDelay: 500,
          strategy: 'username'
        },
        resetPassword: {
          redirectDelay: 500,
          strategy: 'username'
        },
        validation: {
          username: {
            required: true
          },
          password: {
            required: true,
            minLength: 8,
            maxLength: null
          }
        }
      },
    }),
    FontAwesomeModule,
    ServiceWorkerModule.register('my-service-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    httpInterceptorProviders,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
