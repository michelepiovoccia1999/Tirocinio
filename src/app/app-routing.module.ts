import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProvaComponent } from './prova/prova.component';

const routes: Routes = [
 {path: '',component:ProvaComponent },
 {path: 'home',component: HomePageComponent },
 {path: 'nav',component: NavbarComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

