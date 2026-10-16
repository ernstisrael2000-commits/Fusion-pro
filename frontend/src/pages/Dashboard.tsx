import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
  displayName: string
  email: string
  credits: number | null
}

const recentProjects = [
  { title: 'Tokyo Night Drive',  model: 'Veo 3',    when: 'Hier',      color: '#3730A3' },
  { title: 'Product Launch Ad', model: 'Seedance', when: 'Il y a 2j', color: '#1E3A5F' },
  { title: 'Coastal Sunset',    model: 'Veo 3',    when: 'Il y a 4j', color: '#065F46' },
]

const MENU_ITEMS = [
  { icon: '🏠', label: 'Accueil',          page: 'dashboard' as Page },
  { icon: '🎬', label: 'Créer',            page: 'create'    as Page },
  { icon: '📚', label: 'Bibliothèque',     page: 'library'   as Page },
  { icon: '👤', label: 'Profil',           page: 'profile'   as Page },
  { icon: '💎', label: 'Plans & tarifs',   page: 'plans'     as Page },
  { icon: '⚙️', label: 'Paramètres',       page: 'profile'   as Page },
]

export default function Dashboard({ navigate, displayName, email, credits }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const greetingName = displayName || email.split('@')[0] || 'Créateur'
  const initials = greetingName
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', padding: '0 0 16px' }}>

      {/* Burger drawer overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 50,
                width: '78%', maxWidth: 300,
                background: '#0D0D24',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', flexDirection: 'column',
                padding: '0 0 32px',
              }}
            >
              {/* Drawer header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '56px 20px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src="/logo.png" alt="Fusion AI" style={{ width: 32, height: 32, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.5))' }} />
                  <span style={{ fontSize: 16, fontWeight: 800 }}>Fusion AI</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10, width: 36, height: 36,
                    color: '#A0A0C0', fontSize: 18, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* User info */}
              <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 800, color: '#fff',
                  }}>MA</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Marie Aubrun</div>
                    <div style={{ fontSize: 12, color: '#6060A0' }}>marie@example.com</div>
                    <div style={{ marginTop: 4 }}>
                      <span style={{
                        background: 'rgba(124,58,237,0.15)',
                        border: '1px solid rgba(124,58,237,0.3)',
                        borderRadius: 8, padding: '2px 8px',
                        fontSize: 10, fontWeight: 700, color: '#A78BFA',
                      }}>FREE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nav items */}
              <div style={{ flex: 1, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { navigate(item.page); setMenuOpen(false) }}
                    style={{
                      width: '100%', padding: '13px 14px',
                      background: 'transparent',
                      border: 'none', borderRadius: 12,
                      color: 'var(--text-primary)',
                      fontSize: 15, fontWeight: 500,
                      display: 'flex', alignItems: 'center', gap: 14,
                      textAlign: 'left', cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ fontSize: 20, width: 26, textAlign: 'center' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Upgrade CTA */}
              <div style={{ padding: '0 16px' }}>
                <button
                  onClick={() => { navigate('plans'); setMenuOpen(false) }}
                  style={{
                    width: '100%', padding: '14px',
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                    color: '#fff', fontSize: 14, fontWeight: 700,
                    boxShadow: '0 0 20px rgba(124,58,237,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  ✦ Passer à Pro
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '56px 20px 16px',
      }}>
        <img src="/logo.png" alt="Fusion AI" style={{ width: 32, height: 32, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.4))' }} />
        <span style={{ fontSize: 16, fontWeight: 600 }}>Fusion AI</span>
        <button
          onClick={() => setMenuOpen(true)}
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', width: 36, height: 36, borderRadius: 10, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          ≡
        </button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: '#fff',
            }}>{initials || 'IA'}</div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Bonjour,</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{greetingName}</div>
            </div>
          </div>
          <div style={{
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 20, padding: '6px 14px',
            fontSize: 13, fontWeight: 600, color: '#A78BFA',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A78BFA', display: 'inline-block' }} />
            {credits === null ? '—' : credits.toLocaleString('fr-FR')} crédits
          </div>
        </motion.div>

        {/* Studio IA card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, #1E1040, #16162E)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 20,
            padding: '20px',
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 600, color: '#7C3AED', letterSpacing: '2px', marginBottom: 8 }}>STUDIO IA</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>Que voulez-vous<br />créer aujourd'hui ?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: '🎬', label: 'Générer une vidéo', action: 'create' as Page },
              { icon: '🖼️', label: 'Image → Vidéo',     action: 'create' as Page },
              { icon: '✨', label: 'Améliorer un prompt', action: 'create' as Page },
              { icon: '📁', label: 'Mes projets',         action: 'library' as Page },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.action)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14,
                  padding: '14px 12px',
                  color: '#F1F0FF',
                  fontSize: 13, fontWeight: 500,
                  textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 8,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}
        >
          {[
            { value: '24', label: 'Vidéos créées' },
            { value: '8',  label: 'Ce mois' },
            { value: '67', label: 'Scènes' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '14px 12px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#A78BFA' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Recent projects */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Projets récents</div>
            <button onClick={() => navigate('library')} style={{ background: 'none', color: '#7C3AED', fontSize: 13, fontWeight: 600 }}>Voir tout</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentProjects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: p.color,
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>🎬</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, display: 'flex', gap: 8 }}>
                    <span style={{
                      background: 'rgba(124,58,237,0.15)', color: '#A78BFA',
                      borderRadius: 6, padding: '1px 6px', fontSize: 11, fontWeight: 600,
                    }}>{p.model}</span>
                    <span>{p.when}</span>
                  </div>
                </div>
                <button style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: 8, fontSize: 14 }}>▶</button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
