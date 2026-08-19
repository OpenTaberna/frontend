import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './core/auth.service';

const signedIn = async () => {
  const auth = inject(AuthService);
  if (auth.authenticated()) return true;
  await auth.login(location.href);
  return false;
};

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent) },
  { path: 'shop', loadComponent: () => import('./pages/shop.component').then(m => m.ShopComponent) },
  { path: 'shop/:id', loadComponent: () => import('./pages/product.component').then(m => m.ProductComponent) },
  { path: 'cart', loadComponent: () => import('./pages/cart.component').then(m => m.CartComponent) },
  { path: 'checkout', canActivate: [signedIn], loadComponent: () => import('./pages/checkout.component').then(m => m.CheckoutComponent) },
  { path: 'account', canActivate: [signedIn], loadComponent: () => import('./pages/account.component').then(m => m.AccountComponent) },
  { path: '**', redirectTo: '' },
];
