import React from 'react'
import { Cloud, Check, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { GoogleUser, SyncStatus } from '../../services/drive/types'

interface GoogleAuthButtonProps {
  user: GoogleUser | null
  syncStatus: SyncStatus
  onConnect: () => void
  onOpenSyncModal: () => void
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  user,
  syncStatus,
  onConnect,
  onOpenSyncModal
}) => {
  if (!user) {
    return (
      <button
        onClick={onConnect}
        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-colors"
        title="Connect Google Drive appDataFolder for private cloud sync"
      >
        <Cloud className="h-3.5 w-3.5 text-sky-400" />
        <span className="hidden md:inline">Sync Drive</span>
      </button>
    )
  }

  // Status icon / pill
  const renderStatusBadge = () => {
    switch (syncStatus) {
      case 'SYNCING':
        return <Loader2 className="h-3 w-3 animate-spin text-sky-400" />
      case 'SYNCED':
        return <Check className="h-3 w-3 text-emerald-400" />
      case 'ERROR':
        return <AlertCircle className="h-3 w-3 text-rose-400" />
      case 'CONFLICT':
        return <RefreshCw className="h-3 w-3 text-amber-400" />
      default:
        return <Cloud className="h-3 w-3 text-slate-400" />
    }
  }

  return (
    <button
      onClick={onOpenSyncModal}
      className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 hover:border-slate-700 transition-all group"
      title={`Connected as ${user.email}. Click for sync settings.`}
    >
      {user.picture ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={user.picture}
          alt={user.name}
          className="h-4 w-4 rounded-full ring-1 ring-slate-700"
        />
      ) : (
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
          {user.name[0] || 'U'}
        </div>
      )}

      <span className="hidden lg:inline max-w-[100px] truncate font-medium">
        {user.name.split(' ')[0]}
      </span>

      <div className="flex items-center">{renderStatusBadge()}</div>
    </button>
  )
}
