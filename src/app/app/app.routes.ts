
import { ItemList } from '../item-list/item-list';
import { ItemsDetail } from '../items-detail/items-detail';
import { Cart } from '../cart/cart';
import { Routes} from '@angular/router';

export const routes: Routes = [
 { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ItemList },
  { path: 'product/:id', component: ItemsDetail },
  { path: 'cart', component: Cart },
  { path: '**', redirectTo: '/products' } 
];