/**
 * Current user. Placeholder until authentication is wired in: replace the
 * body with the real session (e.g. a generated `useGetMe()` query).
 */
export interface CurrentUser {
  fullName: string
  initials: string
  role: string
}

export function useCurrentUser(): CurrentUser {
  return {
    fullName: 'Mario Rossi',
    initials: 'MR',
    role: 'Direzione · Ufficio tecnico',
  }
}
