import {Routes} from '@angular/router';
import {authGuard} from "./services/auth/guard/auth.guard";
import {adminGuard} from "./services/admin/admin-guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog-home/blog-home.component').then(m => m.BlogHomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'blog/detail/:id',
    loadComponent: () => import('./components/blog-item-details/blog-item-details.component').then(m => m.BlogItemDetailsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'user/reset-password',
    loadComponent: () => import('./components/user-reset-password/user-reset-password.component').then(m => m.UserResetPasswordComponent)
  },
  {
    path: 'blog/create',
    loadComponent: () => import('./components/blog-post-create/blog-post-create.component').then(m => m.BlogPostCreateComponent),
    canActivate: [authGuard]
  },
  {
    path: 'blog/favorites',
    loadComponent: () => import('./components/blog-post-favorites/blog-post-favorites.component').then(m => m.BlogPostFavoritesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }

];

