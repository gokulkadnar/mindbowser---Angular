import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helper/auth.guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes =
  [
    {
      path: '',
      loadChildren: () => import('../app/manager/manager.module').then(m => m.ManagerModule)
    },

    {
      path: 'employeelist',
      loadChildren: () => import('../app/home/home.module').then(m => m.HomeModule),
      canActivate: [AuthGuard]
    },


    // Page not found component
    {
      path: '**', component : PagenotfoundComponent, canActivate: [AuthGuard]
    },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
