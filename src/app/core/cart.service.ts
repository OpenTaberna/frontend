import { Injectable, computed, inject, signal } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { CartLine, Item } from '../models';

const CART_KEY = 'opentaberna-cart-v2';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly analytics = inject(AnalyticsService);
  private readonly linesState = signal<CartLine[]>(this.restore());
  readonly lines = this.linesState.asReadonly();
  readonly count = computed(() => this.linesState().reduce((sum, line) => sum + line.quantity, 0));
  readonly total = computed(() => this.linesState().reduce((sum, line) => sum + line.item.price.amount * line.quantity, 0));

  add(item: Item, quantity = 1): void {
    // Instrumented here rather than at the button, so every route into the
    // cart is counted and a new one cannot silently skip reporting.
    this.analytics.track('add_to_cart', { sku: item.sku });
    const lines = [...this.linesState()];
    const existing = lines.find(line => line.item.uuid === item.uuid);
    if (existing) existing.quantity += quantity; else lines.push({ item, quantity });
    this.save(lines);
  }
  quantity(id: string, quantity: number): void { this.save(this.linesState().map(line => line.item.uuid === id ? {...line, quantity} : line).filter(line => line.quantity > 0)); }
  remove(id: string): void { this.save(this.linesState().filter(line => line.item.uuid !== id)); }
  clear(): void { this.save([]); }
  private save(lines: CartLine[]): void { this.linesState.set(lines); localStorage.setItem(CART_KEY, JSON.stringify(lines)); }
  private restore(): CartLine[] { try { return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]') as CartLine[]; } catch { return []; } }
}
