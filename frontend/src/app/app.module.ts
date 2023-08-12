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
    LogoComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }