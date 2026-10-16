import { motion } from 'framer-motion'

interface Props { onLogin: () => void }

const FLOAT_ITEMS = [
  { icon: '🎬', x: '6%',   y: '10%', size: 38, delay: 0,    dur: 7 },
  { icon: '✨', x: '87%',  y: '8%',  size: 34, delay: 0.9,  dur: 6 },
  { icon: '🎥', x: '80%',  y: '30%', size: 40, delay: 1.5,  dur: 8 },
  { icon: '🎭', x: '4%',   y: '42%', size: 32, delay: 0.4,  dur: 9 },
  { icon: '⚡', x: '90%',  y: '55%', size: 30, delay: 2.1,  dur: 6.5 },
  { icon: '🎨', x: '8%',   y: '72%', size: 36, delay: 1.1,  dur: 7.5 },
  { icon: '🌟', x: '82%',  y: '78%', size: 28, delay: 0.6,  dur: 5.5 },
  { icon: '🎞️', x: '46%',  y: '5%',  size: 26, delay: 1.8,  dur: 9 },
  { icon: '🤖', x: '3%',   y: '22%', size: 30, delay: 2.5,  dur: 8 },
  { icon: '🚀', x: '88%',  y: '18%', size: 28, delay: 0.3,  dur: 7 },
  { icon: '🎙️', x: '75%',  y: '65%', size: 32, delay: 1.3,  dur: 6 },
  { icon: '🖼️', x: '12%',  y: '88%', size: 28, delay: 2.8,  dur: 8.5 },
  { icon: '💫', x: '60%',  y: '92%', size: 26, delay: 0.7,  dur: 7 },
  { icon: '🎯', x: '92%',  y: '88%', size: 24, delay: 1.9,  dur: 6 },
]

function FloatingIcons() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {FLOAT_ITEMS.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            y: [12, 0, -16, -28],
          }}
          transition={{
            delay: item.delay,
            duration: item.dur,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            fontSize: item.size,
            filter: 'blur(0.2px)',
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  )
}

export default function SplashPage({ onLogin }: Props) {
  return (
    <div className="stars-bg" style={{
      minHeight: '100dvh',
      background: '#080818',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '60px 28px 48px',
      position: 'relative',
    }}>
      <FloatingIcons />

      {/* Top: logo + tagline */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <img
            src="/logo.png"
            alt="Fusion AI"
            style={{ width: 130, height: 130, objectFit: 'contain', filter: 'drop-shadow(0 0 32px rgba(124,58,237,0.55))' }}
          />
          <div style={{ textAlign: 'center', marginTop: -8 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#6060A0', letterSpacing: '3px', textTransform: 'uppercase' }}>Video Creation Studio</div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', lineHeight: 1.3, color: '#F1F0FF' }}
        >
          Transformez vos idées en<br />vidéos grâce à l'IA
        </motion.h2>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 360 }}
        >
          {[
            { icon: '🎬', title: 'Génération vidéo intelligente', desc: "L'IA transforme votre texte en vidéos cinématiques en quelques secondes." },
            { icon: '🤖', title: 'Multi-modèles IA',              desc: "Veo 3, Seedance et plus encore — choisissez le modèle adapté à votre vision." },
            { icon: '⚡', title: 'Création rapide',               desc: "De l'idée au rendu final en moins d'une minute." },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'rgba(22,22,46,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: '14px 16px',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: '#6060A0', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1 }}
      >
        <button
          onClick={onLogin}
          style={{
            width: '100%', padding: '16px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
            color: '#fff', fontSize: 16, fontWeight: 700,
            boxShadow: '0 0 24px rgba(124,58,237,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          ✦ Commencer gratuitement
        </button>
        <button
          onClick={onLogin}
          style={{
            width: '100%', padding: '16px',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F1F0FF', fontSize: 16, fontWeight: 600,
          }}
        >
          Se connecter
        </button>
      </motion.div>
    </div>
  )
}
