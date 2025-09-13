import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './features/home/home.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isloggedGuard } from './core/guards/islogged-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Auth layout (login/register/forgot)
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isloggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(c => c.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(c => c.RegisterComponent),
        title: 'Register',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./core/auth/forgotpassword/forgotpassword.component').then(c => c.ForgotpasswordComponent),
        title: 'Forgot Password',
      },
    ],
  },


  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' }, // Home مش lazy

      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then(c => c.CartComponent),
        title: 'Cart',
      },
      {
        path: 'wischlist',
        loadComponent: () =>
          import('./features/wischlist/wischlist.component').then(c => c.WischlistComponent),
        title: 'Wishlist',
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./features/product/product.component').then(c => c.ProductComponent),
        title: 'Product',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(c => c.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component').then(c => c.ContactComponent),
        title: 'Contact',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then(c => c.AllordersComponent),
        title: 'All Orders',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(c => c.DetailsComponent),
        title: 'Details',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(c => c.DetailsComponent),
        title: 'Details',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(c => c.CheckoutComponent),
        title: 'Checkout',
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./shared/components/user/user.component').then(c => c.UserComponent),
        title: 'User',
      },
    ],
  },

  { path: '**', component: NotfoundComponent, title: 'Notfound' },
];
