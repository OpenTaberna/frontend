export function money(amount: number, currency = 'EUR'): string { return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(amount / 100); }
export function errorMessage(error: unknown): string {
  const candidate = error as { error?: { message?: string; validation_errors?: Array<{msg?:string}> }; message?: string };
  return candidate.error?.validation_errors?.[0]?.msg ?? candidate.error?.message ?? candidate.message ?? 'Something went wrong. Please try again.';
}
