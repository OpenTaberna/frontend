export const storefrontConfig = {
  apiUrl: '/api/v1',
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'opentaberna',
    clientId: 'opentaberna-store-ui',
  },
  stripePublishableKey: '',

  /**
   * Anonymous shopper telemetry.
   *
   * Off by default: cloning this repository must not start collecting anything.
   * Turning it on also requires STOREFRONT_ANALYTICS_ENABLED on the API, which
   * otherwise answers the ingest endpoint with a 404.
   *
   * Nothing collected identifies a person and nothing persists beyond the tab,
   * so no consent banner is required. Point `endpoint` elsewhere to use a
   * different backend — no page imports an analytics library directly.
   */
  analytics: {
    enabled: false,
    endpoint: '/api/v1/analytics/events',
  },

  /**
   * Uncaught error reporting.
   *
   * Off by default, like analytics. Requires FRONTEND_ERRORS_ENABLED on the
   * API, which otherwise answers the endpoint with a 404.
   */
  errorReporting: {
    enabled: false,
    endpoint: '/api/v1/telemetry/errors',
  },
} as const;
