import { useEffect, useState } from 'react'

type NetworkState = 'online' | 'weak' | 'offline'

type NetworkInformation = EventTarget & {
  effectiveType?: string
  downlink?: number
  addEventListener: (type: string, listener: EventListener) => void
  removeEventListener: (type: string, listener: EventListener) => void
}

function readNetworkState(): NetworkState {
  if (!navigator.onLine) return 'offline'

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return 'weak'
  if (typeof connection?.downlink === 'number' && connection.downlink < 0.5) return 'weak'
  return 'online'
}

export default function NetworkFeedback() {
  const [state, setState] = useState<NetworkState>(() => readNetworkState())
  const [offlineScreenDismissed, setOfflineScreenDismissed] = useState(false)
  const [retryMessage, setRetryMessage] = useState('')

  useEffect(() => {
    const update = () => {
      const nextState = readNetworkState()
      setState(nextState)
      if (nextState !== 'offline') {
        setOfflineScreenDismissed(false)
        setRetryMessage('')
      }
    }
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    connection?.addEventListener('change', update)

    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
      connection?.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (state !== 'online') return
    const timeout = window.setTimeout(() => setRetryMessage(''), 4500)
    return () => window.clearTimeout(timeout)
  }, [state])

  const retry = () => {
    const nextState = readNetworkState()
    setState(nextState)
    setRetryMessage(nextState === 'offline'
      ? 'Toujours hors ligne. Vérifiez le Wi-Fi ou les données mobiles.'
      : '')
  }

  if (state === 'offline' && !offlineScreenDismissed) {
    return (
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="offline-title"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          display: 'grid',
          placeItems: 'center',
          padding: 24,
          background: 'rgba(8,8,24,0.97)',
          color: '#F1F0FF',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 380 }}>
          <div aria-hidden="true" style={{ fontSize: 54, marginBottom: 16 }}>📡</div>
          <h2 id="offline-title" style={{ fontSize: 23, marginBottom: 10 }}>Vous êtes hors ligne</h2>
          <p style={{ color: '#A0A0C0', fontSize: 14, lineHeight: 1.6 }}>
            La connexion Internet est interrompue. La connexion au compte et la synchronisation sont suspendues; réessayez quand le réseau sera revenu.
          </p>
          {retryMessage && (
            <p role="status" style={{ color: '#FCA5A5', fontSize: 13, marginTop: 14 }}>{retryMessage}</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
            <button
              onClick={retry}
              style={{
                padding: '13px 18px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                color: 'white',
                fontWeight: 700,
              }}
            >
              Réessayer
            </button>
            <button
              onClick={() => setOfflineScreenDismissed(true)}
              style={{
                padding: '12px 18px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#D1D1E5',
                fontWeight: 600,
              }}
            >
              Continuer hors ligne
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (state === 'offline') {
    return (
      <div
        role="status"
        style={{
          position: 'fixed',
          top: 10,
          left: 12,
          right: 12,
          zIndex: 250,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          padding: '10px 12px',
          borderRadius: 12,
          background: '#3B1721',
          border: '1px solid rgba(248,113,113,0.35)',
          color: '#FECACA',
          fontSize: 12,
        }}
      >
        <span>Hors ligne — les données ne sont pas synchronisées.</span>
        <button onClick={() => setOfflineScreenDismissed(false)} style={{ color: 'white', background: 'none', fontWeight: 700 }}>
          Détails
        </button>
      </div>
    )
  }

  if (state === 'weak') {
    return (
      <div
        role="status"
        style={{
          position: 'fixed',
          top: 10,
          left: 12,
          right: 12,
          zIndex: 250,
          padding: '10px 14px',
          borderRadius: 12,
          background: '#3A2D13',
          border: '1px solid rgba(251,191,36,0.35)',
          color: '#FDE68A',
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        Connexion faible — certaines actions peuvent prendre plus de temps.
      </div>
    )
  }

  return null
}
