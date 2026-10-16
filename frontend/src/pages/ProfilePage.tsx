import { motion } from 'framer-motion'
import type { Page } from '../App'
import { useTheme } from '../context/ThemeContext'
import FusionLoader from '../components/FusionLoader/FusionLoader'

interface Props {
  navigate: (p: Page) => void
  displayName: string
  email: string
  credits: number | null
  onSignOut: () => void
}


export default function ProfilePage({ navigate, displayName, email, credits, onSignOut }: Props) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const accountName = displayName || email.split('@')[0] || 'Créateur'
  const initials = accountName
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 20px 16px' }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Profil</span>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
          style={{
            background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            width: 72,
            height: 36,
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
            transition: 'background 0.25s',
          }}
        >
          {/* Track icons */}
          <span style={{ position: 'absolute', left: 9, fontSize: 13, opacity: isDark ? 0.4 : 1, transition: 'opacity 0.25s' }}>☀️</span>
          <span style={{ position: 'absolute', right: 9, fontSize: 13, opacity: isDark ? 1 : 0.4, transition: 'opacity 0.25s' }}>🌙</span>
          {/* Thumb */}
          <span style={{
            display: 'block',
            width: 28,
            height: 28,
            borderRadius: 9,
            background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)',
            boxShadow: '0 2px 8px rgba(124,58,237,0.4)',
            transform: isDark ? 'translateX(36px)' : 'translateX(0)',
            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }} />
        </button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 40 }}>
        {/* User info */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 18,
            background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#fff',
            position: 'relative',
          }}>
            {initials || 'IA'}
            <div style={{
              position: 'absolute', bottom: -3, right: -3,
              width: 18, height: 18, borderRadius: '50%',
              background: '#10B981',
              border: '2px solid var(--bg-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: '#fff',
            }}>✓</div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{accountName}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{email}</div>
            <div style={{ marginTop: 4 }}>
              <span style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '2px 10px', fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>FREE</span>
            </div>
          </div>
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, #1E1040, #16162E)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 18,
            padding: '18px 20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#6060A0', letterSpacing: '1.5px', marginBottom: 4 }}>CRÉDITS RESTANTS</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#A78BFA', lineHeight: 1 }}>
                {credits === null ? '—' : credits.toLocaleString('fr-FR')}
                <span style={{ fontSize: 18, color: 'var(--text-muted)', fontWeight: 400 }}> crédits</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Solde du compte</div>
              <button style={{
                background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)',
                borderRadius: 10, padding: '7px 14px',
                color: '#A78BFA', fontSize: 12, fontWeight: 700,
              }} onClick={() => navigate('plans')}>+ Crédits</button>
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Le solde affiché est synchronisé avec votre compte Firebase.
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[{ v: '24', l: 'Vidéos' }, { v: '8', l: 'Projets' }, { v: '67', l: 'Scènes' }].map((s, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#A78BFA' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Appearance */}
        <SettingsGroup label="APPARENCE">
          <div style={{ padding: '16px 16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{isDark ? '🌙' : '☀️'}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>
                  {isDark ? 'Thème sombre' : 'Thème clair'}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                style={{
                  background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  width: 72,
                  height: 36,
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 4px',
                }}
              >
                <span style={{ position: 'absolute', left: 9, fontSize: 13, opacity: isDark ? 0.4 : 1, transition: 'opacity 0.25s' }}>☀️</span>
                <span style={{ position: 'absolute', right: 9, fontSize: 13, opacity: isDark ? 1 : 0.4, transition: 'opacity 0.25s' }}>🌙</span>
                <span style={{
                  display: 'block', width: 28, height: 28, borderRadius: 9,
                  background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)',
                  boxShadow: '0 2px 8px rgba(124,58,237,0.4)',
                  transform: isDark ? 'translateX(36px)' : 'translateX(0)',
                  transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }} />
              </button>
            </div>
            {/* FusionLoader live preview */}
            <div style={{
              background: 'var(--bg-primary)',
              borderRadius: 12,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1.5px', marginBottom: 4 }}>ANIMATION FUSIONCORE</div>
              <FusionLoader size="md" label="FusionCore réfléchit…" />
            </div>
          </div>
        </SettingsGroup>

        {/* Account settings */}
        <SettingsGroup label="COMPTE">
          <SettingsItem icon="🔑" label="Sécurité & mot de passe" />
          <SettingsItem icon="✉️" label="Notifications email" />
          <SettingsItem icon="🌐" label="Langue & région" />
        </SettingsGroup>

        {/* Subscription */}
        <SettingsGroup label="ABONNEMENT">
          <SettingsItem icon="💎" label="Voir les plans & tarifs" color="#A78BFA" onClick={() => navigate('plans')} />
          <SettingsItem icon="⚡" label="Acheter des crédits" color="#F59E0B" />
          <SettingsItem icon="📄" label="Historique de facturation" />
        </SettingsGroup>

        <button
          onClick={onSignOut}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 14,
            background: 'rgba(236,72,153,0.08)',
            border: '1px solid rgba(236,72,153,0.2)',
            color: '#F9A8D4',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  )
}

function SettingsGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: 10 }}>{label}</div>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

function SettingsItem({ icon, label, color, onClick }: { icon: string; label: string; color?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '16px',
      background: 'none', border: 'none',
      borderBottom: '1px solid var(--border)',
      color: color ?? 'var(--text-primary)',
      display: 'flex', alignItems: 'center', gap: 14,
      fontSize: 14, fontWeight: 500,
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{icon}</span>
      <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
      <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>›</span>
    </button>
  )
}
