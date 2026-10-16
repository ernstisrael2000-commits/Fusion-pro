import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Page } from '../App'

interface Props { navigate: (p: Page) => void }

const projects = [
  { title: 'Tokyo Night Drive',   model: 'Veo 3',    scenes: 3, date: '27 juil', color: '#1E1B4B', emoji: '🌆' },
  { title: 'Product Launch Ad',   model: 'Seedance', scenes: 2, date: '25 juil', color: '#1E3A5F', emoji: '📦' },
  { title: 'Coastal Sunset',      model: 'Veo 3',    scenes: 2, date: '23 juil', color: '#14532D', emoji: '🌅' },
  { title: 'Dance Reel TikTok',   model: 'Seedance', scenes: 4, date: '20 juil', color: '#7F1D1D', emoji: '🕺' },
  { title: 'Café Ambiance',       model: 'Wan 2.1',  scenes: 1, date: '15 juil', color: '#1C1917', emoji: '☕' },
  { title: 'Mountain Timelapse',  model: 'Veo 3',    scenes: 3, date: '10 juil', color: '#162032', emoji: '⛰️' },
]

const FILTERS = ['Toutes', 'Vidéos', 'Multi-scènes']

export default function LibraryPage({ navigate: _navigate }: Props) {
  const [filter, setFilter] = useState('Toutes')

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 20px 16px' }}>
        <span style={{ fontSize: 16, fontWeight: 600 }}>Projets</span>
        <button style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: 10, fontSize: 18 }}>≡</button>
      </div>

      <div style={{ padding: '0 20px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Bibliothèque</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>{projects.length} projets</p>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '7px 16px',
                borderRadius: 20,
                background: filter === f ? '#7C3AED' : 'var(--bg-card)',
                border: `1px solid ${filter === f ? 'transparent' : 'var(--border)'}`,
                color: filter === f ? '#fff' : 'var(--text-secondary)',
                fontSize: 13, fontWeight: filter === f ? 700 : 400,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingBottom: 20 }}>
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 18,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div style={{
                height: 110,
                background: p.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36,
              }}>{p.emoji}</div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ background: 'rgba(124,58,237,0.2)', color: '#A78BFA', borderRadius: 6, padding: '1px 6px', fontSize: 10, fontWeight: 600 }}>{p.model}</span>
                  <span style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '1px 6px', fontSize: 10, color: 'var(--text-muted)' }}>{p.scenes} sc.</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
