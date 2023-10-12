import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavBarLinkComponent } from './components/nav-bar-link/nav-bar-link.component';
import { SearchHomePageComponent } from './pages/search-home-page/search-home-page.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { ConfirmButtonComponent } from './components/confirm-button/confirm-button.component';
import { SearchResultsPageComponent } from './pages/search-results-page/search-results-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LogoComponentComponent } from './components/logo-component/logo-component.component';
import { FormComponentComponent } from './components/form-component/form-component.component';
import { FormInputComponentComponent } from './components/form-input-component/form-input-component.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { LoggedUserNavBarComponent } from './components/logged-user-nav-bar/logged-user-nav-bar.component';
import { CardAgendamentoClienteComponent } from './components/card-agendamento-cliente/card-agendamento-cliente.component';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';
import { SucessDialogComponent } from './components/sucess-dialog/sucess-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {AsyncPipe, NgFor} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import { ListaAgendamentosClienteComponentComponent } from './components/lista-agendamentos-cliente-component/lista-agendamentos-cliente-component.component';
import { ListaAgendamentosEstabelecimentoComponentComponent } from './components/lista-agendamentos-estabelecimento-component/lista-agendamentos-estabelecimento-component.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from "@angular/material/card";
import {MatRippleModule} from "@angular/material/core";
import { EstabelecimentoDetailsDialogComponent } from './components/estabelecimento-details-dialog/estabelecimento-details-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavBarLinkComponent,
    SearchHomePageComponent,
    SearchInputComponent,
    SearchComponentComponent,
    ConfirmButtonComponent,
    SearchResultsPageComponent,
    SignUpPageComponent,
    LogoComponentComponent,
    FormComponentComponent,
    FormInputComponentComponent,
    ErrorDialogComponent,
    LoginPageComponent,
    UserHomeComponent,
    LoggedUserNavBarComponent,
    CardAgendamentoClienteComponent,
    ProfileEditPageComponent,
    SucessDialogComponent,
    ConfirmDialogComponent,
    ListaAgendamentosClienteComponentComponent,
    ListaAgendamentosEstabelecimentoComponentComponent
    EstabelecimentoDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatRippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
