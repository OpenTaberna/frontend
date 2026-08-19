import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="overflow-hidden border-b border-ink/10">
      <div class="shell grid min-h-[72vh] items-center gap-10 py-16 lg:grid-cols-[1.2fr_.8fr]">
        <div><p class="eyebrow text-rust">The considered general store</p><h1 class="mt-5 max-w-4xl font-display text-6xl font-bold leading-[.94] tracking-tight sm:text-8xl">Less clutter.<br><span class="italic text-moss">Better things.</span></h1><p class="mt-7 max-w-xl text-lg leading-8 text-ink/70">A small collection of lasting objects for home and daily life—picked for utility, character, and honest making.</p><div class="mt-9 flex flex-wrap gap-3"><a routerLink="/shop" class="btn btn-primary">Explore the shop →</a><a href="#approach" class="btn btn-secondary">Our approach</a></div></div>
        <div class="relative mx-auto aspect-[4/5] w-full max-w-md rounded-[2.5rem] bg-moss p-7 text-cream shadow-soft"><div class="flex h-full flex-col justify-between rounded-[1.8rem] border border-cream/25 p-7"><span class="font-display text-6xl">✦</span><div><p class="eyebrow text-sand">Edition 01</p><p class="mt-3 font-display text-4xl italic">Objects with a reason to remain.</p></div><p class="text-sm text-cream/70">Sourced slowly · Shipped carefully</p></div></div>
      </div>
    </section>
    <section id="approach" class="shell py-24"><div class="max-w-2xl"><p class="eyebrow text-rust">The OpenTaberna promise</p><h2 class="mt-4 font-display text-5xl font-bold">Made for everyday life.</h2></div><div class="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">@for (point of points; track point.number) {<article class="bg-paper p-8"><span class="font-display text-4xl text-rust">{{ point.number }}</span><h3 class="mt-10 font-display text-2xl font-bold">{{ point.title }}</h3><p class="mt-3 leading-7 text-ink/65">{{ point.copy }}</p></article>}</div></section>
  `,
})
export class HomeComponent { readonly points = [{number:'01',title:'Chosen slowly',copy:'Every object earns its place through usefulness, material quality, and enduring design.'},{number:'02',title:'Made to be used',copy:'No precious shelf pieces. These are goods that become better through everyday use.'},{number:'03',title:'Sent with care',copy:'Thoughtful packaging and clear delivery information from our door to yours.'}]; }
