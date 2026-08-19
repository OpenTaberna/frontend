export const storefrontConfig = {
  apiUrl: '/api/v1',
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'opentaberna',
    clientId: 'opentaberna-store-ui',
  },
  stripePublishableKey: '',
} as const;
