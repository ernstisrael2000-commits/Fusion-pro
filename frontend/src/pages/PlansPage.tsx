import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Page } from '../App'

interface Props { navigate: (p: Page) => void }

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    label: 'Gratuit',
    color: '#6060A0',
    glow: 'rgba(96,96,160,0.3)',
    gradient: 'linear-gradient(135deg, #3D3D6B, #2A2A4A)',
    badge: null,
    description: 'Pour découvrir Fusion AI',
    features: [
      '5 générations / mois',
      'Résolution SD (480p)',
      'Accès aux modèles de base',
      'Filigrane Fusion AI',
      'Support communautaire',
    ],
    missing: ['HD / 4K', 'Suppression du filigrane', 'Agents avancés', 'Priorité de file'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 7,
    label: '7 $ / mois',
    color: '#0EA5E9',
    glow: 'rgba(14,165,233,0.3)',
    gradient: 'linear-gradient(135deg, #0C4A6E, #0369A1)',
    badge: null,
    description: 'Pour commencer à créer',
    features: [
      '30 générations / mois',
      'Résolution HD (720p)',
      'Accès aux modèles standards',
      'Sans filigrane',
      'Support e-mail',
    ],
    missing: ['4K Ultra HD', 'Agents avancés', 'Priorité de file'],
  },
  {
    id: 'creator',
    name: 'Creator',
    price: 20,
    label: '20 $ / mois',
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.4)',
    gradient: 'linear-gradient(135deg, #4C1D95, #7C3AED)',
    badge: 'Populaire',
    description: 'Pour les créateurs actifs',
    features: [
      '150 générations / mois',
      'Résolution Full HD (1080p)',
      'Tous les modèles IA',
      'Sans filigrane',
      'Story Brain & Image Brain',
      'Bibliothèque de projets',
      'Support prioritaire',
    ],
    missing: ['4K Ultra HD', 'File prioritaire'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 50,
    label: '50 $ / mois',
    color: '#EC4899',
    glow: 'rgba(236,72,153,0.35)',
    gradient: 'linear-gradient(135deg, #831843, #EC4899)',
    badge: 'Pro',
    description: 'Pour les professionnels',
    features: [
      '500 générations / mois',
      '4K Ultra HD',
      'Tous les agents IA actifs',
      'Sans filigrane',
      'File de génération prioritaire',
      'API Access (bêta)',
      'Mémoire utilisateur avancée',
      'Support dédié 24h',
    ],
    missing: [],
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 100,
    label: '100 $ / mois',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.4)',
    gradient: 'linear-gradient(135deg, #78350F, #D97706)',
    badge: 'VIP',
    description: 'Pour les studios & agences',
    features: [
      'Générations illimitées',
      '4K Ultra HD + export RAW',
      'Tous les agents IA + accès bêta',
      'Sans filigrane',
      'File ultra-prioritaire',
      'API Access complet',
      'Workspace équipe (5 sièges)',
      'Onboarding personnalisé',
      'Account manager dédié',
    ],
    missing: [],
  },
]

const BILLING_TOGGLE = ['Mensuel', 'Annuel']

export default function PlansPage({ navigate }: Props) {
  const [billing, setBilling] = useState<0 | 1>(0)
  const [selected, setSelected] = useState<string | null>(null)

  const getPrice = (base: number) => {
    if (base === 0) return 0
    return billing === 1 ? Math.round(base * 0.8) : base
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', paddingBottom: 48 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 20px 0' }}>
        <button
          onClick={() => navigate('profile')}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            color: '#A0A0C0',
            fontSize: 13,
            fontWeight: 500,
            padding: '8px 14px',
          }}
        >
          ← Retour
        </button>
        <img src="/logo.png" alt="Fusion AI" style={{ width: 36, height: 36, objectFit: 'contain' }} />
        <div style={{ width: 72 }} />
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ textAlign: 'center', padding: '32px 24px 0' }}
      >
        <div style={{
          display: 'inline-block',
          background: 'rgba(124,58,237,0.12)',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: 99,
          padding: '5px 14px',
          fontSize: 12,
          fontWeight: 600,
          color: '#9F7AEA',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: 14,
        }}>
          ✦ Choisissez votre plan
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 10 }}>
          Libérez votre créativité
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 320, margin: '0 auto 28px' }}>
          Des plans pour tous les créateurs — du débutant au studio professionnel.
        </p>

        {/* Billing toggle */}
        <div style={{
          display: 'inline-flex',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: 4,
          gap: 4,
          marginBottom: 32,
        }}>
          {BILLING_TOGGLE.map((t, i) => (
            <button
              key={t}
              onClick={() => setBilling(i as 0 | 1)}
              style={{
                padding: '8px 18px',
                borderRadius: 9,
                fontSize: 13,
                fontWeight: 600,
                background: billing === i ? 'linear-gradient(135deg, #7C3AED, #5B21B6)' : 'transparent',
                color: billing === i ? '#fff' : '#6060A0',
                boxShadow: billing === i ? '0 2px 10px rgba(124,58,237,0.3)' : 'none',
                transition: 'all 0.2s',
                position: 'relative',
              }}
            >
              {t}
              {i === 1 && (
                <span style={{
                  position: 'absolute', top: -8, right: -4,
                  background: '#059669',
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '2px 5px',
                  borderRadius: 6,
                  letterSpacing: '0.5px',
                }}>-20%</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Plan cards */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {PLANS.map((plan, idx) => {
          const price = getPrice(plan.price)
          const isSelected = selected === plan.id
          const isPopular = plan.badge === 'Populaire'

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.07 }}
              onClick={() => setSelected(plan.id)}
              style={{
                borderRadius: 20,
                border: isSelected
                  ? `2px solid ${plan.color}`
                  : isPopular
                    ? '2px solid rgba(124,58,237,0.5)'
                    : '1.5px solid rgba(255,255,255,0.07)',
                background: isSelected
                  ? `linear-gradient(160deg, rgba(16,16,36,0.95), rgba(16,16,36,0.8))`
                  : 'rgba(16,16,36,0.7)',
                boxShadow: isSelected ? `0 0 32px ${plan.glow}` : 'none',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.25s',
                position: 'relative',
              }}
            >
              {/* Top accent bar */}
              {(isSelected || isPopular) && (
                <div style={{
                  height: 3,
                  background: plan.gradient,
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                }} />
              )}

              <div style={{ padding: '20px 20px 24px' }}>
                {/* Title row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 10,
                      background: plan.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 12px ${plan.glow}`,
                      fontSize: 16,
                    }}>
                      {plan.id === 'free'    && '🌱'}
                      {plan.id === 'starter' && '⚡'}
                      {plan.id === 'creator' && '🎬'}
                      {plan.id === 'pro'     && '🚀'}
                      {plan.id === 'vip'     && '👑'}
                    </div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>{plan.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{plan.description}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {plan.badge && (
                      <div style={{
                        display: 'inline-block',
                        background: isPopular ? 'linear-gradient(135deg, #7C3AED, #5B21B6)' : plan.gradient,
                        borderRadius: 8,
                        padding: '3px 9px',
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#fff',
                        letterSpacing: '0.5px',
                        marginBottom: 4,
                      }}>
                        {plan.badge}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, justifyContent: 'flex-end' }}>
                      {price === 0 ? (
                        <span style={{ fontSize: 22, fontWeight: 800, color: plan.color }}>Gratuit</span>
                      ) : (
                        <>
                          <span style={{ fontSize: 22, fontWeight: 800, color: plan.color }}>{price}$</span>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>/mois</span>
                        </>
                      )}
                    </div>
                    {billing === 1 && price > 0 && (
                      <div style={{ fontSize: 10, color: '#059669', fontWeight: 600 }}>
                        économisez {Math.round(plan.price * 0.2 * 12)}$ / an
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '16px 0' }} />

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                        background: `linear-gradient(135deg, ${plan.color}40, ${plan.color}20)`,
                        border: `1px solid ${plan.color}60`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: plan.color,
                      }}>✓</div>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{f}</span>
                    </div>
                  ))}
                  {plan.missing.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.35 }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: '#6060A0',
                      }}>—</div>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'line-through' }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%',
                    marginTop: 20,
                    padding: '13px',
                    borderRadius: 14,
                    background: isSelected ? plan.gradient : 'rgba(255,255,255,0.05)',
                    border: isSelected ? 'none' : '1.5px solid rgba(255,255,255,0.09)',
                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                    fontSize: 14,
                    fontWeight: 700,
                    boxShadow: isSelected ? `0 4px 20px ${plan.glow}` : 'none',
                    transition: 'all 0.25s',
                    cursor: 'pointer',
                  }}
                >
                  {isSelected
                    ? plan.price === 0 ? '✓ Plan actuel' : `✦ Choisir ${plan.name}`
                    : plan.price === 0 ? 'Plan actuel (gratuit)' : `Passer à ${plan.name}`}
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 28, padding: '0 24px', lineHeight: 1.6 }}
      >
        Annulez à tout moment. Pas d'engagement. Paiement sécurisé via Stripe.
      </motion.p>
    </div>
  )
}
