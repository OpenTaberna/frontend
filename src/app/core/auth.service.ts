import { Injectable, computed, signal } from '@angular/core';
import Keycloak, { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { storefrontConfig } from '../storefront.config';

interface Claims extends KeycloakTokenParsed { email?: string; given_name?: string; family_name?: string; preferred_username?: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly keycloak = new Keycloak(storefrontConfig.keycloak);
  private readonly authenticatedState = signal(false);
  private readonly profileState = signal<KeycloakProfile | null>(null);
  readonly authenticated = this.authenticatedState.asReadonly();
  readonly profile = this.profileState.asReadonly();
  readonly claims = computed(() => (this.keycloak.tokenParsed as Claims | undefined) ?? null);
  readonly displayName = computed(() => {
    const profile = this.profileState();
    return profile?.firstName || profile?.username || 'Account';
  });

  async init(): Promise<void> {
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      checkLoginIframe: false,
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
    });
    this.authenticatedState.set(authenticated);
    if (authenticated) await this.loadProfile();
    this.keycloak.onAuthSuccess = () => { this.authenticatedState.set(true); void this.loadProfile(); };
    this.keycloak.onAuthLogout = () => { this.authenticatedState.set(false); this.profileState.set(null); };
    this.keycloak.onTokenExpired = () => { void this.keycloak.updateToken(30); };
  }

  login(returnUrl = location.href): Promise<void> { return this.keycloak.login({ redirectUri: returnUrl }); }
  register(): Promise<void> { return this.keycloak.register({ redirectUri: `${location.origin}/account` }); }
  logout(): Promise<void> { return this.keycloak.logout({ redirectUri: location.origin }); }
  accountManagement(): Promise<void> { return this.keycloak.accountManagement(); }

  async token(): Promise<string | null> {
    if (!this.keycloak.authenticated) return null;
    try { await this.keycloak.updateToken(30); } catch { await this.login(); return null; }
    return this.keycloak.token ?? null;
  }

  private async loadProfile(): Promise<void> {
    try { this.profileState.set(await this.keycloak.loadUserProfile()); }
    catch { this.profileState.set(null); }
  }
}
