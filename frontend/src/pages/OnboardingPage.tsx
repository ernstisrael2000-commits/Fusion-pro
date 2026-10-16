import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
  onComplete: () => void
}

type Step = 'name' | 'profile' | 'source' | 'goal'

const STEPS: Step[] = ['name', 'profile', 'source', 'goal']

const PROFILES = [
  { id: 'creator',      icon: '🎬', label: 'Créateur de contenu',  desc: 'YouTube, TikTok, Instagram…' },
  { id: 'entrepreneur', icon: '🚀', label: 'Entrepreneur',          desc: 'Startup, business en ligne' },
  { id: 'marketer',     icon: '📣', label: 'Marketeur / Agence',    desc: 'Campagnes, publicités, branding' },
  { id: 'filmmaker',    icon: '🎥', label: 'Réalisateur / Artiste', desc: 'Courts-métrages, films, clips' },
  { id: 'other',        icon: '✨', label: 'Autre',                 desc: 'Dites-nous en plus !' },
]

const SOURCES = [
  { id: 'social',   icon: '📱', label: 'Réseaux sociaux' },
  { id: 'yt',       icon: '▶️', label: 'YouTube' },
  { id: 'friend',   icon: '🤝', label: 'Bouche à oreille' },
  { id: 'google',   icon: '🔍', label: 'Google / Recherche' },
  { id: 'press',    icon: '📰', label: 'Presse / Newsletter' },
  { id: 'other',    icon: '💡', label: 'Autre' },
]

const GOALS = [
  { id: 'content',  icon: '📲', label: 'Créer du contenu régulier',   desc: 'Réseaux sociaux, chaînes vidéo' },
  { id: 'ads',      icon: '🎯', label: 'Publicités et marketing',     desc: 'Convertir et engager mon audience' },
  { id: 'story',    icon: '🎭', label: 'Raconter des histoires',      desc: 'Narration, films, séries' },
  { id: 'explore',  icon: '🔭', label: 'Explorer la créativité IA',   desc: 'Curiosité, expérimentation' },
  { id: 'business', icon: '💼', label: 'Accélérer mon business',      desc: 'Productivité, automatisation' },
]

export default function OnboardingPage({ navigate: _navigate, onComplete }: Props) {
  const [step, setStep] = useState<Step>('name')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profile, setProfile] = useState('')
  const [source, setSource] = useState('')
  const [goal, setGoal] = useState('')
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

  const stepIndex = STEPS.indexOf(step)
  const progress = ((stepIndex + 1) / STEPS.length) * 100

  const goNext = () => {
    if (step === 'goal') { onComplete(); return }
    setDirection(1)
    setStep(STEPS[stepIndex + 1])
  }

  const goBack = () => {
    if (stepIndex === 0) return
    setDirection(-1)
    setStep(STEPS[stepIndex - 1])
  }

  const canProceed =
    (step === 'name'    && firstName.trim().length > 0) ||
    (step === 'profile' && profile !== '') ||
    (step === 'source'  && source !== '') ||
    (step === 'goal'    && goal !== '')

  return (
    <div className="stars-bg" style={{
      minHeight: '100dvh',
      background: '#080818',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 24px 48px',
    }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: 440, paddingTop: 56, paddingBottom: 28 }}>
        {/* Logo + back */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/logo.png" alt="Fusion AI" style={{ width: 36, height: 36, objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(124,58,237,0.5))' }} />
            <span style={{ fontSize: 16, fontWeight: 800 }}>Fusion AI</span>
          </div>
          {stepIndex > 0 && (
            <button
              onClick={goBack}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                color: '#A0A0C0',
                fontSize: 13,
                fontWeight: 500,
                padding: '7px 12px',
              }}
            >
              ← Retour
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: 3,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 99,
          overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #7C3AED, #0EA5E9)',
              borderRadius: 99,
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: '#6060A0' }}>Étape {stepIndex + 1} / {STEPS.length}</span>
        </div>
      </div>

      {/* Step content */}
      <div style={{ width: '100%', maxWidth: 440, flex: 1 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit:  (d: number) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {step === 'name'    && <StepName firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName} />}
            {step === 'profile' && <StepProfile selected={profile} setSelected={setProfile} />}
            {step === 'source'  && <StepSource selected={source} setSelected={setSource} />}
            {step === 'goal'    && <StepGoal selected={goal} setSelected={setGoal} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div style={{ width: '100%', maxWidth: 440, marginTop: 32 }}>
        <motion.button
          onClick={goNext}
          disabled={!canProceed}
          animate={{ opacity: canProceed ? 1 : 0.4 }}
          transition={{ duration: 0.2 }}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            boxShadow: canProceed ? '0 0 28px rgba(124,58,237,0.4)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'box-shadow 0.3s',
          }}
        >
          {step === 'goal' ? '✦ Lancer Fusion AI' : 'Continuer →'}
        </motion.button>

        {/* Skip */}
        {step !== 'name' && (
          <button
            onClick={goNext}
            style={{
              width: '100%',
              background: 'none',
              color: '#6060A0',
              fontSize: 13,
              fontWeight: 500,
              marginTop: 14,
              textAlign: 'center',
            }}
          >
            Passer cette étape
          </button>
        )}
      </div>
    </div>
  )
}

/* ── Steps ──────────────────────────────────────────────────────── */

function StepName({ firstName, lastName, setFirstName, setLastName }: {
  firstName: string; lastName: string
  setFirstName: (v: string) => void; setLastName: (v: string) => void
}) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#7C3AED', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>
        Votre identité
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#F1F0FF', lineHeight: 1.25, marginBottom: 10 }}>
        Comment vous appelle-t-on ?
      </h2>
      <p style={{ fontSize: 14, color: '#6060A0', lineHeight: 1.6, marginBottom: 32 }}>
        Votre prénom sera visible dans votre espace et personnalisera votre expérience.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <OnboardingInput
          label="Prénom *"
          placeholder="Ex : Sarah"
          value={firstName}
          onChange={setFirstName}
          autoFocus
        />
        <OnboardingInput
          label="Nom (optionnel)"
          placeholder="Ex : Martin"
          value={lastName}
          onChange={setLastName}
        />
      </div>
    </div>
  )
}

function StepProfile({ selected, setSelected }: { selected: string; setSelected: (v: string) => void }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#7C3AED', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>
        Votre profil
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#F1F0FF', lineHeight: 1.25, marginBottom: 10 }}>
        Qui êtes-vous ?
      </h2>
      <p style={{ fontSize: 14, color: '#6060A0', lineHeight: 1.6, marginBottom: 28 }}>
        Ça nous aide à personnaliser votre expérience et les suggestions de l'IA.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PROFILES.map(p => (
          <SelectCard
            key={p.id}
            icon={p.icon}
            label={p.label}
            desc={p.desc}
            selected={selected === p.id}
            onSelect={() => setSelected(p.id)}
          />
        ))}
      </div>
    </div>
  )
}

function StepSource({ selected, setSelected }: { selected: string; setSelected: (v: string) => void }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#7C3AED', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>
        Découverte
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#F1F0FF', lineHeight: 1.25, marginBottom: 10 }}>
        Comment nous avez-vous trouvés ?
      </h2>
      <p style={{ fontSize: 14, color: '#6060A0', lineHeight: 1.6, marginBottom: 28 }}>
        Une seule réponse suffit, choisissez la plus proche.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {SOURCES.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              padding: '16px 12px',
              borderRadius: 16,
              background: selected === s.id
                ? 'rgba(124,58,237,0.18)'
                : 'rgba(255,255,255,0.03)',
              border: `1.5px solid ${selected === s.id ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.07)'}`,
              color: '#F1F0FF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.18s',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, textAlign: 'center', lineHeight: 1.3 }}>{s.label}</span>
            {selected === s.id && (
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: '#7C3AED',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: '#fff',
              }}>✓</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepGoal({ selected, setSelected }: { selected: string; setSelected: (v: string) => void }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#7C3AED', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>
        Objectif
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#F1F0FF', lineHeight: 1.25, marginBottom: 10 }}>
        Pourquoi utilisez-vous Fusion AI ?
      </h2>
      <p style={{ fontSize: 14, color: '#6060A0', lineHeight: 1.6, marginBottom: 28 }}>
        Votre objectif principal. Cela guidera les recommandations du Master Brain.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {GOALS.map(g => (
          <SelectCard
            key={g.id}
            icon={g.icon}
            label={g.label}
            desc={g.desc}
            selected={selected === g.id}
            onSelect={() => setSelected(g.id)}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Shared sub-components ──────────────────────────────────────── */

function OnboardingInput({ label, placeholder, value, onChange, autoFocus }: {
  label: string; placeholder: string; value: string
  onChange: (v: string) => void; autoFocus?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: focused ? '#9F7AEA' : '#A0A0C0', marginBottom: 8, display: 'block', transition: 'color 0.2s' }}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus={autoFocus}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: 14,
          background: focused ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.04)',
          border: `1.5px solid ${focused ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.08)'}`,
          color: '#F1F0FF',
          fontSize: 16,
          transition: 'all 0.2s',
        }}
      />
    </div>
  )
}

function SelectCard({ icon, label, desc, selected, onSelect }: {
  icon: string; label: string; desc: string; selected: boolean; onSelect: () => void
}) {
  return (
    <motion.button
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      style={{
        width: '100%',
        padding: '15px 16px',
        borderRadius: 16,
        background: selected ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
        border: `1.5px solid ${selected ? 'rgba(124,58,237,0.55)' : 'rgba(255,255,255,0.07)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.18s',
      }}
    >
      <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: selected ? '#D4BBFF' : '#F1F0FF' }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: '#6060A0', marginTop: 2 }}>{desc}</div>}
      </div>
      <div style={{
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
        background: selected ? '#7C3AED' : 'rgba(255,255,255,0.05)',
        border: `2px solid ${selected ? '#7C3AED' : 'rgba(255,255,255,0.12)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, color: '#fff',
        transition: 'all 0.18s',
      }}>
        {selected && '✓'}
      </div>
    </motion.button>
  )
}
