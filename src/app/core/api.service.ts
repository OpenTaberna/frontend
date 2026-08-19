import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Address, AddressInput, CheckoutResponse, Customer, Item, ItemPage, Order } from '../models';
import { storefrontConfig } from '../storefront.config';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = storefrontConfig.apiUrl;

  items(skip = 0, limit = 50) { return this.http.get<ItemPage>(`${this.base}/items/`, { params: new HttpParams().set('skip', skip).set('limit', limit).set('status', 'active') }); }
  item(id: string) { return this.http.get<Item>(`${this.base}/items/${encodeURIComponent(id)}`); }
  me() { return this.http.get<Customer>(`${this.base}/customers/me`); }
  updateMe(body: Partial<Pick<Customer, 'email'|'first_name'|'last_name'>>) { return this.http.patch<Customer>(`${this.base}/customers/me`, body); }
  addresses() { return this.http.get<Address[]>(`${this.base}/customers/me/addresses`); }
  createAddress(body: AddressInput) { return this.http.post<Address>(`${this.base}/customers/me/addresses`, body); }
  updateAddress(id: string, body: Partial<AddressInput>) { return this.http.patch<Address>(`${this.base}/customers/me/addresses/${id}`, body); }
  deleteAddress(id: string) { return this.http.delete<void>(`${this.base}/customers/me/addresses/${id}`); }
  createOrder(customerId: string, lines: Array<{sku:string;quantity:number}>) { return this.http.post<Order>(`${this.base}/orders/`, { items: lines, currency: 'EUR' }, { headers: { 'X-Customer-ID': customerId } }); }
  order(customerId: string, orderId: string) { return this.http.get<Order>(`${this.base}/orders/${orderId}`, { headers: { 'X-Customer-ID': customerId } }); }
  checkout(customerId: string, orderId: string) { return this.http.post<CheckoutResponse>(`${this.base}/orders/${orderId}/checkout`, {}, { headers: { 'X-Customer-ID': customerId } }); }
  cancelOrder(customerId: string, orderId: string) { return this.http.delete<void>(`${this.base}/orders/${orderId}`, { headers: { 'X-Customer-ID': customerId } }); }
}
