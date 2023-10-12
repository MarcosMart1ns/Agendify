import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchResultsPageComponent} from "./pages/search-results-page/search-results-page.component";
import {SignUpPageComponent} from "./pages/sign-up-page/sign-up-page.component";
import {SearchHomePageComponent} from "./pages/search-home-page/search-home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {UserHomeComponent} from "./pages/user-home/user-home.component";
import {ProfileEditPageComponent} from "./pages/profile-edit-page/profile-edit-page.component";
import {CreateAgendamentoPageComponent} from "./pages/create-agendamento-page/create-agendamento-page.component";

const routes: Routes = [
  {
    path: '',
    component: SearchHomePageComponent
  },
  {
    path: 'signup',
    component: SignUpPageComponent
  },
  {
    path: 'search/:query',
    component: SearchResultsPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component: UserHomeComponent
  },
  {
    path: 'profile',
    component: ProfileEditPageComponent
  },
  {
    path: 'agendamento/:estabelecimentoid',
    component: CreateAgendamentoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
