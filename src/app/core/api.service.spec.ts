import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Item } from '../models';

/**
 * The API answers media as paths relative to its own root ("/v1/items/…/image").
 * The browser resolves those against the storefront, which is not where the API
 * lives, so every image broke. These pin the rewrite onto the configured API.
 */
describe('ApiService media URLs', () => {
  let api: ApiService;
  let http: HttpTestingController;

  const item = (media: Item['media']) => ({ uuid: 'u1', name: 'Barolo', media }) as Item;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('resolves API-relative images of a single item against the API', () => {
    let result: Item | undefined;
    api.item('u1').subscribe((i) => (result = i));
    http
      .expectOne('/api/v1/items/u1')
      .flush(item({ main_image: '/v1/items/u1/image', gallery: ['/v1/items/u1/image'] }));

    expect(result?.media.main_image).toBe('/api/v1/items/u1/image');
    expect(result?.media.gallery).toEqual(['/api/v1/items/u1/image']);
  });

  it('resolves images in a catalogue page and leaves absolute or missing ones alone', () => {
    let result: Item[] = [];
    api.items().subscribe((page) => (result = page.items));
    http
      .expectOne((r) => r.url === '/api/v1/items/')
      .flush({
        items: [
          item({ main_image: '/v1/items/u1/image', gallery: [] }),
          item({ main_image: 'https://cdn.example/p.png', gallery: [] }),
          item({ main_image: null, gallery: [] }),
        ],
      });

    expect(result.map((i) => i.media.main_image)).toEqual([
      '/api/v1/items/u1/image',
      'https://cdn.example/p.png',
      null,
    ]);
  });
});
