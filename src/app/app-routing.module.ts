import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'reserva',
    loadChildren: () => import('./reserva/reserva.module').then( m => m.ReservaPageModule)
  },
  {
    path: 'aforo',
    loadChildren: () => import('./aforo/aforo.module').then( m => m.AforoPageModule)
  },
  {
    path: 'mod-aforo',
    loadChildren: () => import('./mod-aforo/mod-aforo.module').then( m => m.ModAforoPageModule)
  },
  {
    path: 'mis-reservas',
    loadChildren: () => import('./mis-reservas/mis-reservas.module').then( m => m.MisReservasPageModule)
  },
  {
    path: 'historial-reservas',
    loadChildren: () => import('./historial-reservas/historial-reservas.module').then( m => m.HistorialReservasPageModule)
  },
  {
    path: 'home-alumno',
    loadChildren: () => import('./home-alumno/home-alumno.module').then( m => m.HomeAlumnoPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'mod-reserva',
    loadChildren: () => import('./mod-reserva/mod-reserva.module').then( m => m.ModReservaPageModule)
  },
  {
    path: 'gestiona-reserva',
    loadChildren: () => import('./gestiona-reserva/gestiona-reserva.module').then( m => m.GestionaReservaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
