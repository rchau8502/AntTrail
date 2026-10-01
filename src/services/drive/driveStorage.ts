import { CloudSyncPayload, DriveFileMetadata } from './types'

export const BACKUP_FILENAME = 'anttrail_user_backup.json'
const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3'
const DRIVE_UPLOAD_BASE = 'https://www.googleapis.com/upload/drive/v3'

/**
 * Searches the private appDataFolder for an existing backup file.
 */
export async function findBackupFile(accessToken: string): Promise<DriveFileMetadata | null> {
  const query = encodeURIComponent(`name='${BACKUP_FILENAME}' and trashed=false`)
  const url = `${DRIVE_API_BASE}/files?spaces=appDataFolder&q=${query}&fields=files(id,name,modifiedTime,size)`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Google authorization expired or invalid.')
    }
    throw new Error(`Failed to query Google Drive: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  if (data.files && data.files.length > 0) {
    return data.files[0] as DriveFileMetadata
  }

  return null
}

/**
 * Downloads and parses the CloudSyncPayload from Google Drive appDataFolder.
 */
export async function downloadBackupFile(
  accessToken: string,
  fileId: string
): Promise<CloudSyncPayload | null> {
  const url = `${DRIVE_API_BASE}/files/${fileId}?alt=media`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error(`Failed to download backup from Google Drive: ${res.status}`)
  }

  const data = await res.json()
  // Validate schema version
  if (!data || data.version !== 2) {
    throw new Error('Incompatible backup format found in Google Drive.')
  }

  return data as CloudSyncPayload
}

/**
 * Creates or updates the backup file in the Google Drive appDataFolder.
 */
export async function uploadBackupFile(
  accessToken: string,
  payload: CloudSyncPayload,
  existingFileId?: string
): Promise<{ id: string; modifiedTime: string }> {
  const content = JSON.stringify(payload, null, 2)

  // Update existing file
  if (existingFileId) {
    const url = `${DRIVE_UPLOAD_BASE}/files/${existingFileId}?uploadType=media`
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: content
    })

    if (!res.ok) {
      throw new Error(`Failed to update backup file in Google Drive: ${res.status}`)
    }

    const data = await res.json()
    return {
      id: data.id || existingFileId,
      modifiedTime: data.modifiedTime || new Date().toISOString()
    }
  }

  // Create new file with multipart upload inside appDataFolder
  const boundary = '-------314159265358979323846'
  const delimiter = `\r\n--${boundary}\r\n`
  const closeDelimiter = `\r\n--${boundary}--`

  const metadata = {
    name: BACKUP_FILENAME,
    parents: ['appDataFolder'],
    mimeType: 'application/json'
  }

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    content +
    closeDelimiter

  const url = `${DRIVE_UPLOAD_BASE}/files?uploadType=multipart`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartRequestBody
  })

  if (!res.ok) {
    throw new Error(`Failed to create backup file in Google Drive: ${res.status}`)
  }

  const data = await res.json()
  return {
    id: data.id,
    modifiedTime: data.modifiedTime || new Date().toISOString()
  }
}
