import React from 'react'
import {
  X,
  Cloud,
  UploadCloud,
  DownloadCloud,
  LogOut,
  CheckCircle2,
  Loader2,
  FolderLock
} from 'lucide-react'
import { GoogleUser, SyncStatus } from '../../services/drive/types'

interface CloudSyncModalProps {
  isOpen: boolean
  onClose: () => void
  user: GoogleUser | null
  syncStatus: SyncStatus
  lastSyncedTime: number | null
  onBackupNow: () => void
  onRestoreFromDrive: () => void
  onDisconnect: () => void
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
  isSyncing
}) => {
  if (!isOpen || !user) return null

  const formatLastSync = (ts: number | null) => {
    if (!ts) return 'Never'
    const diff = Math.floor((Date.now() - ts) / 1000)
    if (diff < 10) return 'Just now'
    if (diff < 60) return `${diff} seconds ago`
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
    return new Date(ts).toLocaleString()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative flex w-full max-w-lg flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
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

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Account Profile Card */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center gap-3">
              {user.picture ? (
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
              <span>Connected</span>
            </div>
          </div>

          {/* Privacy & Scope Architecture */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <FolderLock className="h-4 w-4 text-emerald-400" />
              <span>Hidden App Container (`drive.appdata` scope)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              AntTrail writes directly to your private Google Drive application container. AntTrail has zero server backend and cannot see or access any other files in your Google Drive.
            </p>
          </div>

          {/* Sync Status Info */}
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
              <span className="text-slate-400">Backup Filename:</span>
              <span className="font-mono text-slate-400">
                anttrail_user_backup.json
              </span>
            </div>
          </div>

          {/* Sync Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
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
        </div>

        {/* Footer Disconnect Option */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-slate-950/80">
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
