import { motion } from 'framer-motion'
import type { Page } from '../App'

interface Props { navigate: (p: Page) => void }

const scenes = [
  { title: 'Scène 1 — Tokyo Rain',  model: 'Veo 3', duration: '8s' },
  { title: 'Scène 2 — Neon Street', model: 'Veo 3', duration: '8s' },
  { title: 'Scène 3 — Rain Close',  model: 'Veo 3', duration: '8s' },
]

export default function ResultsPage({ navigate }: Props) {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 20px 16px' }}>
        <button onClick={() => navigate('create')} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: 10, fontSize: 16 }}>‹</button>
        <span style={{ fontSize: 16, fontWeight: 600 }}>Résultats</span>
        <button style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: 10, fontSize: 18 }}>≡</button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Success banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 14,
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#10B981',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 16, fontWeight: 700, flexShrink: 0,
          }}>✓</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Génération terminée</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>3 vidéos prêtes · 120 crédits utilisés</div>
          </div>
        </motion.div>

        {/* Scene cards */}
        {scenes.map((scene, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            {/* Video preview */}
            <div style={{
              height: 160,
              background: `linear-gradient(135deg, hsl(${240 + i * 30}, 70%, 20%), hsl(${260 + i * 20}, 80%, 30%))`,
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <span style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{scene.model}</span>
              </div>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                fontSize: 20,
              }}>▶</div>
              <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                <span style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 6, padding: '3px 8px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                  ⏱ {scene.duration}
                </span>
              </div>
            </div>

            {/* Scene info */}
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{scene.title}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
                {[
                  { icon: '▶', label: 'Lecture',      color: '#4B5563' },
                  { icon: '⬇', label: 'Télécharger',  color: '#1E3A5F' },
                  { icon: '↗', label: 'Partager',      color: '#7C3AED', filled: true },
                  { icon: '↺', label: 'Régénérer',     color: '#4B5563' },
                ].map((btn, j) => (
                  <button key={j} style={{
                    padding: '10px 4px',
                    borderRadius: 10,
                    background: btn.filled ? 'linear-gradient(135deg,#7C3AED,#5B21B6)' : `${btn.color}55`,
                    border: 'none',
                    color: '#F1F0FF',
                    fontSize: 10, fontWeight: 600,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}>
                    <span style={{ fontSize: 14 }}>{btn.icon}</span>
                    {btn.label}
                  </button>
                ))}
              </div>
              <button style={{
                width: '100%', marginTop: 10,
                padding: '10px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.1)',
                color: 'var(--text-muted)',
                fontSize: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                🎬 Continuer cette scène
                <span style={{ background: '#10B981', borderRadius: 4, padding: '1px 6px', fontSize: 9, fontWeight: 700, color: '#fff' }}>BIENTÔT</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
