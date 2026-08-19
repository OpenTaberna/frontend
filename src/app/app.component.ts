import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { CartService } from './core/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen">
      <header class="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
        <div class="shell flex min-h-18 items-center justify-between gap-5">
          <a routerLink="/" class="font-display text-2xl font-bold tracking-tight">✦ OpenTaberna</a>
          <nav class="flex items-center gap-2 text-sm font-semibold sm:gap-5" aria-label="Main navigation">
            <a routerLink="/" routerLinkActive="text-rust" [routerLinkActiveOptions]="{exact:true}" class="hidden sm:inline">Home</a>
            <a routerLink="/shop" routerLinkActive="text-rust">Shop</a>
            @if (auth.authenticated()) {
              <a routerLink="/account" routerLinkActive="text-rust" class="hidden sm:inline">{{ auth.displayName() }}</a>
            } @else {
              <button type="button" (click)="auth.login()" class="cursor-pointer">Sign in</button>
            }
            <a routerLink="/cart" class="rounded-full border border-ink/20 px-3 py-2">Bag <span class="ml-1 rounded-full bg-ink px-1.5 py-0.5 text-xs text-white">{{ cart.count() }}</span></a>
          </nav>
        </div>
      </header>
      <main><router-outlet /></main>
      <footer class="mt-20 border-t border-ink/15 py-10">
        <div class="shell flex flex-col justify-between gap-4 text-sm sm:flex-row"><div><strong class="font-display text-lg">OpenTaberna</strong><p class="mt-1 text-ink/65">Useful goods, chosen with care.</p></div><p class="text-ink/55">© 2026 OpenTaberna</p></div>
      </footer>
    </div>
  `,
})
export class AppComponent {
  readonly auth = inject(AuthService);
  readonly cart = inject(CartService);
}
