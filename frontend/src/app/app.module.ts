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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavBarLinkComponent,
    SearchHomePageComponent,
    SearchInputComponent,
    SearchComponentComponent,
    ConfirmButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
