import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Page } from '../App'

interface Props { navigate: (p: Page) => void }

const MODELS = [
  { id: 'veo3',     name: 'Veo 3',    badge: 'CINÉMA',  badgeColor: '#7C3AED', desc: 'Cinéma réaliste HD',     icon: '🎬' },
  { id: 'seedance', name: 'Seedance', badge: 'FLUIDE',  badgeColor: '#0EA5E9', desc: 'Mouvement ultra-fluide', icon: '🔥' },
  { id: 'wan',      name: 'Wan 2.1',  badge: 'NOUVEAU', badgeColor: '#10B981', desc: 'Style artistique unique', icon: '🎨' },
]

export default function CreatePage({ navigate }: Props) {
  const [mode, setMode]         = useState<'simple' | 'multi'>('simple')
  const [model, setModel]       = useState('seedance')
  const [duration, setDuration] = useState('8s')
  const [format, setFormat]     = useState('9:16')
  const [style, setStyle]       = useState('Cinématique')
  const [prompt, setPrompt]     = useState('')

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 20px 16px' }}>
        <span style={{ fontSize: 16, fontWeight: 600 }}>Créer</span>
        <button style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: 10, fontSize: 18 }}>≡</button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Créer une vidéo</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Décrivez votre vision, l'IA fait le reste</p>
        </div>

        {/* Prompt */}
        <Section label="PROMPT">
          <div style={{ position: 'relative' }}>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Décrivez votre scène... Une rue de Tokyo sous la pluie, lumières néon qui se reflètent sur l'asphalte mouillé, caméra en travelling avant..."
              style={{
                width: '100%', minHeight: 100,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '14px 14px 40px',
                color: '#F1F0FF',
                fontSize: 13,
                lineHeight: 1.6,
                resize: 'none',
              }}
            />
            <button style={{
              position: 'absolute', bottom: 10, right: 10,
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(124,58,237,0.4)',
              borderRadius: 10, padding: '5px 10px',
              color: '#A78BFA', fontSize: 12, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>✨ IA Prompt</button>
          </div>
        </Section>

        {/* Image de référence */}
        <Section label="IMAGE DE RÉFÉRENCE">
          <div style={{
            border: '2px dashed rgba(124,58,237,0.3)',
            borderRadius: 14,
            padding: '28px 20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⬆</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Ajouter une image de référence</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Utilisez une image pour guider l'apparence de votre vidéo</div>
          </div>
        </Section>

        {/* Mode */}
        <Section label="MODE DE CRÉATION">
          <div style={{ display: 'flex', background: 'var(--bg-card)', borderRadius: 12, padding: 4 }}>
            {(['simple', 'multi'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: '10px 8px', borderRadius: 10,
                  background: mode === m ? 'linear-gradient(135deg,#7C3AED,#5B21B6)' : 'none',
                  color: mode === m ? '#fff' : 'var(--text-muted)',
                  fontSize: 13, fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                {m === 'simple' ? '◉ Mode simple' : '📹 Multi-vidéos'}
              </button>
            ))}
          </div>
        </Section>

        {/* Multi-scene mode */}
        {mode === 'multi' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Section label="SCÈNES">
              {[1, 2, 3].map(n => (
                <div key={n} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: 16,
                  marginBottom: 12,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#A78BFA' }}>Scène {n}</span>
                    <span style={{ background: 'rgba(124,58,237,0.2)', borderRadius: 8, padding: '2px 8px', fontSize: 11, color: '#A78BFA' }}>8s</span>
                  </div>
                  <div style={{ border: '2px dashed rgba(255,255,255,0.08)', borderRadius: 10, padding: '16px', textAlign: 'center', marginBottom: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                    ⬆ Image de scène {n}
                  </div>
                  <textarea
                    placeholder={`Prompt scène ${n}...`}
                    style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px', color: '#F1F0FF', fontSize: 13, minHeight: 60, resize: 'none' }}
                  />
                </div>
              ))}
            </Section>
          </motion.div>
        )}

        {/* Model IA */}
        <Section label="MODÈLE IA">
          {MODELS.map(m => (
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              style={{
                width: '100%',
                background: model === m.id ? 'rgba(124,58,237,0.1)' : 'var(--bg-card)',
                border: `1px solid ${model === m.id ? 'rgba(124,58,237,0.5)' : 'var(--border)'}`,
                borderRadius: 14,
                padding: '14px 16px',
                marginBottom: 8,
                display: 'flex', alignItems: 'center', gap: 12,
                color: '#F1F0FF',
              }}
            >
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</span>
                  <span style={{ background: `${m.badgeColor}33`, color: m.badgeColor, borderRadius: 6, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>{m.badge}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.desc}</div>
              </div>
              {model === m.id && <span style={{ color: '#7C3AED', fontSize: 18 }}>✓</span>}
            </button>
          ))}
        </Section>

        {/* Options */}
        <Section label="OPTIONS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <OptionGroup label="Durée" options={['5s', '8s', '10s']} value={duration} onChange={setDuration} />
            <OptionGroup label="Format" options={['9:16', '16:9', '1:1']} value={format} onChange={setFormat} />
            <OptionGroup label="Style" options={['Cinématique', 'Réaliste', 'Animation']} value={style} onChange={setStyle} />
          </div>
        </Section>

        {/* IA Analyzer */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>IA Analyzer</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Optimisation avant génération</div>
          </div>
          <button style={{
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 10, padding: '8px 16px',
            color: '#A78BFA', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>⊙ Analyser</button>
        </div>

        {/* Generate CTA */}
        <button
          onClick={() => navigate('generating')}
          style={{
            width: '100%', padding: '18px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
            color: '#fff', fontSize: 17, fontWeight: 700,
            boxShadow: '0 0 30px rgba(124,58,237,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          ✦ Générer les vidéos
        </button>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#A78BFA', marginTop: -8 }}>Coût estimé : 120 crédits</p>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '2px', marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  )
}

function OptionGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map(o => (
          <button
            key={o}
            onClick={() => onChange(o)}
            style={{
              flex: 1, padding: '10px 8px', borderRadius: 10,
              background: value === o ? 'linear-gradient(135deg,#7C3AED,#5B21B6)' : 'var(--bg-card)',
              border: `1px solid ${value === o ? 'transparent' : 'var(--border)'}`,
              color: value === o ? '#fff' : 'var(--text-secondary)',
              fontSize: 13, fontWeight: value === o ? 700 : 400,
              transition: 'all 0.2s',
            }}
          >{o}</button>
        ))}
      </div>
    </div>
  )
}
