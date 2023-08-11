import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchResultsPageComponent} from "./pages/search-results-page/search-results-page.component";
import {SignUpPageComponent} from "./pages/sign-up-page/sign-up-page.component";
import {SearchHomePageComponent} from "./pages/search-home-page/search-home-page.component";

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
    path: 'search',
    component: SearchResultsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
