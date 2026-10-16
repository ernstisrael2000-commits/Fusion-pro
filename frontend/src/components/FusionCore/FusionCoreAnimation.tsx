import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './FusionCoreAnimation.css'

type Phase = 1 | 2 | 3 | 4

interface PhaseConfig {
  label: string
  text: string
  duration: number
}

const PHASES: Record<Phase, PhaseConfig> = {
  1: { label: 'Analyse',       text: 'Analyse de votre idée...',            duration: 3000 },
  2: { label: 'Organisation',  text: 'Organisation du processus créatif...', duration: 3000 },
  3: { label: 'Création',      text: 'Création en cours...',                 duration: 3000 },
  4: { label: 'Finalisation',  text: 'Votre création est prête.',            duration: 2000 },
}

const BRAIN_NODES = [
  { id: 'story',  label: 'Story',  icon: '✍️',  angle: 0   },
  { id: 'image',  label: 'Image',  icon: '🖼️',  angle: 90  },
  { id: 'video',  label: 'Video',  icon: '🎬',  angle: 180 },
  { id: 'memory', label: 'Memory', icon: '🧠',  angle: 270 },
]

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  angle: (360 / 16) * i,
  radius: 60 + (i % 3) * 20,
  speed: 4 + (i % 4) * 1.5,
  size: 2 + (i % 3),
  delay: i * 0.15,
}))

interface Props {
  onComplete?: () => void
  steps?: string[]
}

export default function FusionCoreAnimation({ onComplete, steps }: Props) {
  const [phase, setPhase] = useState<Phase>(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [progress, setProgress] = useState(0)

  const defaultSteps = steps ?? [
    'Analyse globale',
    'Optimisation des prompts',
    'Génération vidéo 1',
    'Génération vidéo 2',
    'Génération vidéo 3',
    'Finalisation',
  ]

  useEffect(() => {
    let elapsed = 0
    const total = Object.values(PHASES).reduce((s, p) => s + p.duration, 0)
    const interval = setInterval(() => {
      elapsed += 100
      setProgress(Math.min((elapsed / total) * 100, 99))
    }, 100)

    const t1 = setTimeout(() => setPhase(2), PHASES[1].duration)
    const t2 = setTimeout(() => setPhase(3), PHASES[1].duration + PHASES[2].duration)
    const t3 = setTimeout(() => setPhase(4), PHASES[1].duration + PHASES[2].duration + PHASES[3].duration)
    const t4 = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      onComplete?.()
    }, total)

    // Simulate step completion
    defaultSteps.forEach((_, i) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, i])
      }, (total / defaultSteps.length) * (i + 0.8))
    })

    return () => {
      clearInterval(interval)
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
    }
  }, [])

  const isPhase4 = phase === 4
  const speedMultiplier = phase === 3 ? 0.5 : phase === 4 ? 2 : 1
  const glowIntensity = phase === 3 ? '0 0 60px rgba(124,58,237,0.9), 0 0 120px rgba(124,58,237,0.4)' :
                        phase === 4 ? '0 0 60px rgba(16,185,129,0.8), 0 0 120px rgba(16,185,129,0.3)' :
                        '0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(124,58,237,0.2)'

  return (
    <div className="fusion-core-wrapper">
      {/* Stars background */}
      <div className="fusion-stars" />

      {/* Central Animation */}
      <div className="fusion-stage">
        <div className="fusion-core-container">

          {/* Outer ambient rings */}
          <div className="ambient-ring ambient-ring-1" style={{ animationDuration: `${8 * speedMultiplier}s` }} />
          <div className="ambient-ring ambient-ring-2" style={{ animationDuration: `${12 * speedMultiplier}s` }} />
          <div className="ambient-ring ambient-ring-3" style={{ animationDuration: `${6 * speedMultiplier}s` }} />

          {/* SVG Neural connections (Phase 2+) */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.svg
                className="neural-svg"
                viewBox="-120 -120 240 240"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {BRAIN_NODES.map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180
                  const x = Math.cos(rad) * 95
                  const y = Math.sin(rad) * 95
                  return (
                    <motion.line
                      key={node.id}
                      x1="0" y1="0" x2={x} y2={y}
                      stroke="url(#neuralGrad)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ delay: i * 0.2, duration: 0.8 }}
                    />
                  )
                })}
                <defs>
                  <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Orbiting particles */}
          {PARTICLES.map(p => (
            <div
              key={p.id}
              className="particle"
              style={{
                '--angle': `${p.angle}deg`,
                '--radius': `${p.radius}px`,
                '--speed': `${p.speed * speedMultiplier}s`,
                '--size': `${p.size}px`,
                '--delay': `${p.delay}s`,
                animationPlayState: phase === 1 ? 'running' : 'running',
              } as React.CSSProperties}
            />
          ))}

          {/* Brain nodes (Phase 2+) */}
          <AnimatePresence>
            {phase >= 2 && BRAIN_NODES.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180
              const r = 95
              return (
                <motion.div
                  key={node.id}
                  className="brain-node"
                  style={{
                    left: `calc(50% + ${Math.cos(rad) * r}px)`,
                    top: `calc(50% + ${Math.sin(rad) * r}px)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
                >
                  <span className="brain-node-icon">{node.icon}</span>
                  <span className="brain-node-label">{node.label}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Core sphere */}
          <div
            className={`fusion-core-sphere ${phase === 3 ? 'phase-creation' : ''} ${isPhase4 ? 'phase-done' : ''}`}
            style={{ boxShadow: glowIntensity }}
          >
            <div className="core-inner-ring" style={{ animationDuration: `${2 * speedMultiplier}s` }} />
            <div className="core-inner-ring core-inner-ring-2" style={{ animationDuration: `${3 * speedMultiplier}s` }} />
            <div className="core-nucleus">
              <AnimatePresence mode="wait">
                {isPhase4 ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="core-check"
                  >✓</motion.span>
                ) : (
                  <motion.div
                    key="pulse"
                    className="core-pulse"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 * speedMultiplier }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Phase text */}
      <div className="fusion-text-zone">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            className="fusion-main-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {PHASES[phase].text}
          </motion.p>
        </AnimatePresence>
        <p className="fusion-sub-text">L'IA analyse et optimise chaque scène</p>
      </div>

      {/* Steps checklist */}
      <div className="fusion-steps">
        {defaultSteps.map((step, i) => {
          const isDone = completedSteps.includes(i)
          const isActive = !isDone && completedSteps.length === i
          return (
            <motion.div
              key={step}
              className={`fusion-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="step-icon">
                {isDone ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="step-check"
                  >✓</motion.span>
                ) : isActive ? (
                  <motion.div
                    className="step-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  />
                ) : (
                  <div className="step-dot" />
                )}
              </div>
              <span className="step-label">{step}</span>
              {isActive && <div className="step-active-dot" />}
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="fusion-progress-bar-track">
        <motion.div
          className="fusion-progress-bar-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
        <span className="fusion-progress-label">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}
