
import { ItemList } from './item-list/item-list';
import { ItemsDetail } from './items-detail/items-detail';
import { Cart } from './cart/cart';
import { NotFound } from './not-found/not-found';
import { Routes, ROUTES } from '@angular/router';

export const routes: Routes = [
  { path: '', component: ItemList },
  { path: 'products', component: ItemList },
  { path: 'product/:id', component: ItemsDetail },
  { path: 'cart', component: Cart },
  { path: '**', component: NotFound }
];