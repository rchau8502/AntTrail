import { GoogleUser } from './types'

export const CUSTOM_CLIENT_ID_KEY = 'anttrail_custom_google_client_id'

export function getEffectiveGoogleClientId(): string {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem(CUSTOM_CLIENT_ID_KEY)
    if (custom && custom.trim().length > 0) return custom.trim()
  }
  return (
    (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID ||
    '628172948291-anttrail-uci-placeholder.apps.googleusercontent.com'
  )
}

export function setCustomGoogleClientId(clientId: string | null): void {
  if (typeof window === 'undefined') return
  if (!clientId || clientId.trim() === '') {
    localStorage.removeItem(CUSTOM_CLIENT_ID_KEY)
  } else {
    localStorage.setItem(CUSTOM_CLIENT_ID_KEY, clientId.trim())
  }
}

export function isCustomClientIdConfigured(): boolean {
  if (typeof window === 'undefined') return false
  const custom = localStorage.getItem(CUSTOM_CLIENT_ID_KEY)
  const envVar = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID
  return Boolean((custom && custom.trim().length > 0) || (envVar && !envVar.includes('placeholder')))
}

export const GOOGLE_CLIENT_ID = getEffectiveGoogleClientId()

export const DRIVE_APPDATA_SCOPE = 'https://www.googleapis.com/auth/drive.appdata'
const USERINFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/userinfo'

/**
 * Checks if the Google Identity Services library is loaded on window.
 */
export function isGisLoaded(): boolean {
  return typeof window !== 'undefined' && Boolean(window.google?.accounts?.oauth2)
}

/**
 * Loads the official Google Identity Services script asynchronously if not already present.
 */
export function loadGisScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isGisLoaded()) {
      resolve()
      return
    }

    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve())
      existingScript.addEventListener('error', (e) => reject(e))
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.head.appendChild(script)
  })
}

/**
 * Fetches basic public profile information (name, email, picture) for display.
 */
export async function fetchGoogleUserInfo(accessToken: string): Promise<GoogleUser> {
  const res = await fetch(USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch user profile: ${res.status}`)
  }

  const data = await res.json()
  return {
    id: data.sub || data.id,
    name: data.name || data.email,
    email: data.email,
    picture: data.picture
  }
}
