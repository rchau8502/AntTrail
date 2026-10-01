import {
  DriveStorageProvider,
  DriveUserInfo,
  RemoteFileMetadata,
  AntTrailCloudBackup
} from '../types'
import { validateBackupPayload } from '../checksum'

const BACKUP_FILENAME = 'anttrail_academic_backup.json'
const DRIVE_SCOPE =
  'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'

export class GoogleDriveProvider implements DriveStorageProvider {
  private clientId: string
  private accessToken: string | null = null
  private currentUser: DriveUserInfo | null = null

  constructor(clientId = '') {
    this.clientId = clientId || (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || ''
  }

  setClientId(clientId: string): void {
    this.clientId = clientId
  }

  getClientId(): string {
    return this.clientId
  }

  async init(clientId?: string): Promise<boolean> {
    if (clientId) {
      this.clientId = clientId
    }

    if (typeof window === 'undefined') {
      return false
    }

    if (window.google?.accounts?.oauth2) {
      return true
    }

    return new Promise((resolve) => {
      // Check if script element already exists
      const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
      if (existing) {
        existing.addEventListener('load', () => {
          resolve(true)
        })
        existing.addEventListener('error', () => resolve(false))
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.head.appendChild(script)
    })
  }

  async signIn(): Promise<DriveUserInfo> {
    await this.init()

    if (!this.clientId) {
      throw new Error('Google Client ID is required for live Google Drive sync.')
    }

    return new Promise((resolve, reject) => {
      try {
        const client = window.google!.accounts!.oauth2!.initTokenClient({
          client_id: this.clientId,
          scope: DRIVE_SCOPE,
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              reject(
                new Error(
                  `Google Sign-In failed: ${tokenResponse.error_description || tokenResponse.error}`
                )
              )
              return
            }

            if (!tokenResponse.access_token) {
              reject(new Error('Google Sign-In failed: No access token received.'))
              return
            }

            this.accessToken = tokenResponse.access_token

            try {
              const userInfo = await this.fetchUserInfo()
              this.currentUser = userInfo
              resolve(userInfo)
            } catch (err) {
              reject(err)
            }
          },
          error_callback: (err) => {
            reject(new Error(`OAuth Token Error: ${String(err)}`))
          }
        })

        client.requestAccessToken({ prompt: 'consent' })
      } catch (err) {
        reject(err)
      }
    })
  }

  private async fetchUserInfo(): Promise<DriveUserInfo> {
    if (!this.accessToken) {
      throw new Error('No active Google access token')
    }

    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch user profile info (${res.status})`)
    }

    const data = await res.json()
    return {
      email: data.email || 'student@uci.edu',
      name: data.name || data.email || 'Anteater User',
      pictureUrl: data.picture
    }
  }

  async signOut(): Promise<void> {
    if (this.accessToken && window.google?.accounts?.oauth2?.revoke) {
      try {
        window.google.accounts.oauth2.revoke(this.accessToken)
      } catch {
        // ignore
      }
    }
    this.accessToken = null
    this.currentUser = null
  }

  async getCurrentUser(): Promise<DriveUserInfo | null> {
    return this.currentUser
  }

  async getRemoteMetadata(): Promise<RemoteFileMetadata | null> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google')
    }

    const query = encodeURIComponent(`name = '${BACKUP_FILENAME}' and trashed = false`)
    const url = `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${query}&fields=files(id,name,modifiedTime,size)`

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${this.accessToken}` }
    })

    if (!res.ok) {
      throw new Error(`Failed to query Google Drive appDataFolder (${res.status})`)
    }

    const data = await res.json()
    const files = data.files as Array<{ id: string; name: string; modifiedTime: string; size: string }>

    if (!files || files.length === 0) {
      return null
    }

    const file = files[0]
    return {
      fileId: file.id,
      modifiedTime: file.modifiedTime,
      size: parseInt(file.size || '0', 10)
    }
  }

  async downloadBackup(fileId: string): Promise<AntTrailCloudBackup> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google')
    }

    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: { Authorization: `Bearer ${this.accessToken}` }
    })

    if (!res.ok) {
      throw new Error(`Failed to download backup file (${res.status})`)
    }

    const json = await res.json()
    const validated = validateBackupPayload(json)
    if (!validated) {
      throw new Error('Invalid or corrupted AntTrail backup data in Google Drive')
    }

    return validated
  }

  async uploadBackup(
    backup: AntTrailCloudBackup,
    existingFileId?: string
  ): Promise<{ fileId: string; modifiedTime: string }> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google')
    }

    const payloadString = JSON.stringify(backup)

    if (existingFileId) {
      // Update existing file using PATCH upload endpoint
      const updateUrl = `https://www.googleapis.com/upload/drive/v3/files/${existingFileId}?uploadType=media`
      const res = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: payloadString
      })

      if (!res.ok) {
        throw new Error(`Failed to update backup file in Google Drive (${res.status})`)
      }

      const data = await res.json()
      return {
        fileId: existingFileId,
        modifiedTime: data.modifiedTime || new Date().toISOString()
      }
    } else {
      // Create new file via multipart upload
      const boundary = 'anttrail_multipart_boundary_' + Date.now()
      const metadata = JSON.stringify({
        name: BACKUP_FILENAME,
        parents: ['appDataFolder']
      })

      const multipartBody =
        `--${boundary}\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        `${metadata}\r\n` +
        `--${boundary}\r\n` +
        `Content-Type: application/json\r\n\r\n` +
        `${payloadString}\r\n` +
        `--${boundary}--`

      const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: multipartBody
      })

      if (!res.ok) {
        throw new Error(`Failed to create backup in Google Drive appDataFolder (${res.status})`)
      }

      const data = await res.json()
      return {
        fileId: data.id,
        modifiedTime: data.modifiedTime || new Date().toISOString()
      }
    }
  }

  async deleteBackup(fileId: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google')
    }

    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.accessToken}` }
    })

    if (!res.ok && res.status !== 404) {
      throw new Error(`Failed to delete backup file (${res.status})`)
    }
  }
}
