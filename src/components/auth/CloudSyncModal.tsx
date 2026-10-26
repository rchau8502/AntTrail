import React, { useState } from 'react'
import {
  X,
  Cloud,
  UploadCloud,
  DownloadCloud,
  LogOut,
  CheckCircle2,
  Loader2,
  FolderLock,
  Key,
  Copy,
  Check,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import { GoogleUser, SyncStatus } from '../../services/drive/types'
import {
  getEffectiveGoogleClientId,
  setCustomGoogleClientId,
  isCustomClientIdConfigured
} from '../../services/drive/googleAuth'

interface CloudSyncModalProps {
  isOpen: boolean
  onClose: () => void
  user: GoogleUser | null
  syncStatus: SyncStatus
  lastSyncedTime: number | null
  onBackupNow: () => void
  onRestoreFromDrive: () => void
  onDisconnect: () => void
  onConnectLive?: () => void
  onConnectDemo?: () => void
  isSyncing: boolean
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  isOpen,
  onClose,
  user,
  syncStatus,
  lastSyncedTime,
  onBackupNow,
  onRestoreFromDrive,
  onDisconnect,
  onConnectLive,
  onConnectDemo,
  isSyncing
}) => {
  const [showSettings, setShowSettings] = useState(false)
  const [clientIdInput, setClientIdInput] = useState(() => getEffectiveGoogleClientId())
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [copiedOrigin, setCopiedOrigin] = useState<string | null>(null)

  if (!isOpen) return null

  const isLiveMode = user && !user.id.includes('demo') && user.id !== 'anteater_demo_user'
  const isCustomConfigured = isCustomClientIdConfigured()

  const formatLastSync = (ts: number | null) => {
    if (!ts) return 'Never'
    const diff = Math.floor((Date.now() - ts) / 1000)
    if (diff < 10) return 'Just now'
    if (diff < 60) return `${diff} seconds ago`
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
    return new Date(ts).toLocaleString()
  }

  const handleSaveClientId = (e: React.FormEvent) => {
    e.preventDefault()
    setCustomGoogleClientId(clientIdInput.trim())
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  const handleResetDefaultClientId = () => {
    setCustomGoogleClientId(null)
    setClientIdInput(getEffectiveGoogleClientId())
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedOrigin(label)
    setTimeout(() => setCopiedOrigin(null), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative flex w-full max-w-lg max-h-[90vh] flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-400">
                <span>Phase 5</span>
                <span>•</span>
                <span>Private Cloud Sync</span>
              </div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                Google Drive Storage
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Account Profile Card if connected */}
          {user ? (
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-3">
                {user.picture ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-10 w-10 rounded-full ring-2 ring-slate-800"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-base">
                    {user.name[0] || 'U'}
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-bold text-white">{user.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-2.5 py-1 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{isLiveMode ? 'Live Google Cloud' : 'Peter Sandbox'}</span>
              </div>
            </div>
          ) : (
            /* Connect Options if not connected */
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-sm font-bold text-white">Connect Google Drive</h3>
              <p className="text-xs text-slate-400">
                Synchronize your course history and multi-quarter graduation roadmaps across devices without any centralized database.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={onConnectLive}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/30"
                >
                  <Cloud className="h-4 w-4" />
                  <span>Connect Google Account</span>
                </button>

                <button
                  onClick={onConnectDemo}
                  className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-950/20 px-4 py-3 text-xs font-bold text-amber-300 hover:bg-amber-950/40 transition-colors"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Peter Anteater Demo</span>
                </button>
              </div>
            </div>
          )}

          {/* Privacy & Scope Architecture */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <FolderLock className="h-4 w-4 text-emerald-400" />
              <span>Hidden App Container (`drive.appdata` scope)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              AntTrail writes directly to your private Google Drive application container. AntTrail has zero server backend and cannot read, list, or access any other files in your Google Drive.
            </p>
          </div>

          {/* Sync Status & Info (when connected) */}
          {user && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Sync Status:</span>
                <span className="font-mono font-bold text-sky-400 uppercase">
                  {syncStatus}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Last Cloud Backup:</span>
                <span className="font-mono text-slate-200">
                  {formatLastSync(lastSyncedTime)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Storage Target:</span>
                <span className="font-mono text-slate-400">
                  appDataFolder/anttrail_user_backup.json
                </span>
              </div>
            </div>
          )}

          {/* Sync Actions (when connected) */}
          {user && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={onBackupNow}
                disabled={isSyncing}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 p-3 text-xs font-bold text-white hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-lg shadow-blue-900/30"
              >
                {isSyncing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UploadCloud className="h-4 w-4" />
                )}
                <span>Back Up to Drive</span>
              </button>

              <button
                onClick={onRestoreFromDrive}
                disabled={isSyncing}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white disabled:opacity-50 transition-colors"
              >
                <DownloadCloud className="h-4 w-4 text-sky-400" />
                <span>Restore from Drive</span>
              </button>
            </div>
          )}

          {/* Collapsible Google Cloud Credentials Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 overflow-hidden">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-800/40 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
                <Key className="h-4 w-4 text-sky-400" />
                <div className="flex items-center gap-2">
                  <span>Google Cloud OAuth 2.0 Client ID Settings</span>
                  {isCustomConfigured && (
                    <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[9px] font-bold text-sky-300 border border-sky-500/30">
                      Custom ID
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {showSettings ? 'Hide' : 'Configure'}
              </span>
            </button>

            {showSettings && (
              <div className="p-4 pt-1 border-t border-slate-800/80 space-y-4 text-xs">
                <p className="text-slate-400 leading-relaxed">
                  To authenticate against real Google Accounts (<span className="text-slate-200 font-mono">@uci.edu</span>), provide your Web OAuth Client ID created in the{' '}
                  <a
                    href="https://console.cloud.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline inline-flex items-center gap-0.5"
                  >
                    Google Cloud Console <ExternalLink className="h-3 w-3" />
                  </a>.
                </p>

                <form onSubmit={handleSaveClientId} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      OAuth 2.0 Web Client ID:
                    </label>
                    <input
                      type="text"
                      value={clientIdInput}
                      onChange={(e) => setClientIdInput(e.target.value)}
                      placeholder="e.g. 123456789-abcdef.apps.googleusercontent.com"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={handleResetDefaultClientId}
                      className="text-[11px] text-slate-400 hover:text-slate-300 underline"
                    >
                      Reset Default
                    </button>

                    <div className="flex items-center gap-2">
                      {savedSuccess && (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                          <Check className="h-3 w-3" /> Saved!
                        </span>
                      )}
                      <button
                        type="submit"
                        className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-500 transition-colors"
                      >
                        Save Client ID
                      </button>
                    </div>
                  </div>
                </form>

                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <div className="font-bold text-slate-300 text-[11px]">Authorized JavaScript Origins to add in Google Cloud:</div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    {[
                      'https://anttrail-app.vercel.app',
                      'https://anttrail-uci.vercel.app',
                      'http://localhost:5173'
                    ].map((origin) => (
                      <div
                        key={origin}
                        className="flex items-center justify-between rounded-lg bg-slate-900/80 px-2.5 py-1.5 border border-slate-800 text-slate-300"
                      >
                        <span className="truncate">{origin}</span>
                        <button
                          onClick={() => copyToClipboard(origin, origin)}
                          className="ml-2 text-slate-400 hover:text-white shrink-0"
                          title="Copy origin"
                        >
                          {copiedOrigin === origin ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Required OAuth Scope:</span>{' '}
                    <code className="text-[10px] text-sky-300 bg-sky-950/40 px-1 py-0.5 rounded">
                      https://www.googleapis.com/auth/drive.appdata
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-slate-950/80">
          {user ? (
            <button
              onClick={() => {
                onDisconnect()
                onClose()
              }}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Disconnect Account</span>
            </button>
          ) : (
            <div className="text-[11px] text-slate-500">No account connected</div>
          )}

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
