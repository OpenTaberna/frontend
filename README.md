# OpenTaberna Storefront

Angular 22 storefront with Tailwind CSS 4, Keycloak OIDC/PKCE authentication, customer profiles and addresses, cart, resumable checkout, and Stripe Elements.

## Configuration

The defaults match the OpenTaberna development stack:

- Storefront: `http://localhost:4300`
- API: proxied from `/api` to `http://host.docker.internal:8000`
- Keycloak: `http://localhost:8080`, realm `opentaberna`, client `opentaberna-store-ui`

Set `stripePublishableKey` in `src/app/storefront.config.ts` before testing payment.

## Run with Docker

```bash
docker compose up --build -d
```

Open `http://localhost:4300`. The Keycloak realm must contain the storefront redirect/web origin for this exact port, as provided by the backend realm import.

Product images come from the API as paths relative to its root (`/v1/items/{uuid}/image`); `ApiService` resolves them against `apiUrl`, so they load through the same `/api` proxy as every other call.

The item-store inventory fields are displayed as catalogue metadata. The checkout endpoint is responsible for validating and reserving authoritative stock from the separate inventory service.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).

## Licence

Apache License 2.0 — see [LICENSE](LICENSE).
