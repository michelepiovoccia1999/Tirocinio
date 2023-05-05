import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FormRegComponent } from './form-reg/form-reg.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewComponent } from './view/view.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
 {path: '',component:HomePageComponent },
 {path: 'formReg',component: FormRegComponent },
 {path: 'adminPage',component: AdminPageComponent },
 {path: 'view',component: ViewComponent},
 {path: 'home',component: HomePageComponent },
 {path: 'user',component: UserComponent },
 {path: 'nav',component: NavbarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
