import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAdditionalUserInfo } from 'firebase/auth'
import type { Page } from '../App'
import {
  createEmailAccount,
  firebaseInitError,
  isFirebaseConfigured,
  isFirebaseReady,
  sendPasswordReset,
  signInWithEmail,
  signInWithGoogle,
} from '../firebase/client'

interface Props {
  navigate: (p: Page) => void
  onAuthSuccess: (isNew: boolean) => void
}

export default function AuthPage({ navigate, onAuthSuccess }: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [protoNotice, setProtoNotice] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const _showProto = () => {
    setProtoNotice(true)
    setTimeout(() => setProtoNotice(false), 3500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('Veuillez remplir tous les champs.'); return }
    if (password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères.'); return }
    if (!isFirebaseReady) {
      setError('Firebase n’est pas encore configuré pour cette application. Ajoutez les variables VITE_FIREBASE_* dans Replit.')
      return
    }
    setError('')
    setNotice('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        await createEmailAccount(email, password)
        onAuthSuccess(true)
      } else {
        await signInWithEmail(email, password)
        onAuthSuccess(false)
      }
    } catch (authError) {
      setError(getAuthErrorMessage(authError))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    if (!isFirebaseReady) {
      setError('Firebase n’est pas encore configuré pour cette application.')
      return
    }
    setError('')
    setNotice('')
    setGoogleLoading(true)
    try {
      const credential = await signInWithGoogle()
      onAuthSuccess(getAdditionalUserInfo(credential)?.isNewUser ?? false)
    } catch (authError) {
      setError(getAuthErrorMessage(authError))
    } finally {
      setGoogleLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setError('Saisissez votre adresse e-mail pour recevoir le lien de réinitialisation.')
      setNotice('')
      return
    }
    setError('')
    setNotice('')
    try {
      await sendPasswordReset(email)
      setNotice('Si un compte correspond à cette adresse, un lien de réinitialisation vient d’être envoyé.')
    } catch (authError) {
      setError(getAuthErrorMessage(authError))
    }
  }

  const switchMode = () => {
    setError('')
    setNotice('')
    setMode(m => m === 'login' ? 'signup' : 'login')
  }

  return (
    <div className="stars-bg" style={{
      minHeight: '100dvh',
      background: '#080818',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 24px 48px',
    }}>
      {/* Back button */}
      <div style={{ width: '100%', maxWidth: 400, paddingTop: 56 }}>
        <button
          onClick={() => navigate('splash')}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            color: '#A0A0C0',
            fontSize: 14,
            fontWeight: 500,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ← Retour
        </button>
      </div>

      {/* Prototype notice toast */}
      <AnimatePresence>
        {protoNotice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(22,22,46,0.95)',
              border: '1px solid rgba(124,58,237,0.4)',
              borderRadius: 14,
              padding: '12px 20px',
              display: 'flex', alignItems: 'center', gap: 10,
              zIndex: 100,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: 18 }}>🔧</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F0FF' }}>Mode prototype</div>
              <div style={{ fontSize: 11, color: '#6060A0' }}>Backend non connecté — Firebase à venir</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating ambient icons */}
      <FloatingIcons />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 32, marginBottom: 28, position: 'relative', zIndex: 1 }}
      >
        <img
          src="/logo.png"
          alt="Fusion AI"
          style={{ width: 90, height: 90, objectFit: 'contain', filter: 'drop-shadow(0 0 24px rgba(124,58,237,0.5))' }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'rgba(16,16,36,0.85)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 24,
          padding: '32px 28px',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12,
          padding: 4,
          marginBottom: 28,
        }}>
          {(['signup', 'login'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 9,
                fontSize: 14,
                fontWeight: 600,
                transition: 'all 0.2s',
                background: mode === m ? 'linear-gradient(135deg, #7C3AED, #5B21B6)' : 'transparent',
                color: mode === m ? '#fff' : '#6060A0',
                boxShadow: mode === m ? '0 2px 12px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              {m === 'signup' ? 'Créer un compte' : 'Se connecter'}
            </button>
          ))}
        </div>

        {!isFirebaseReady && (
          <div
            role="status"
            style={{
              background: 'rgba(251,191,36,0.08)',
              border: '1px solid rgba(251,191,36,0.24)',
              borderRadius: 12,
              padding: '11px 13px',
              marginBottom: 18,
              color: '#FDE68A',
              fontSize: 12,
              lineHeight: 1.55,
            }}
          >
            {firebaseInitError
              ? firebaseInitError
              : isFirebaseConfigured
                ? 'Firebase a reçu ses paramètres, mais le service ne les accepte pas encore.'
                : 'Firebase n’est pas encore relié. Les boutons de connexion seront activés après la configuration du projet.'}
          </div>
        )}

        {/* Heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            style={{ marginBottom: 24 }}
          >
            <h1 style={{ fontSize: 20, fontWeight: 700, color: '#F1F0FF', marginBottom: 6 }}>
              {mode === 'signup' ? 'Commencez gratuitement' : 'Bon retour 👋'}
            </h1>
            <p style={{ fontSize: 13, color: '#6060A0', lineHeight: 1.5 }}>
              {mode === 'signup'
                ? 'Créez votre compte et transformez vos idées en vidéos IA.'
                : 'Connectez-vous pour reprendre vos créations.'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Google button */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading || loading || !isFirebaseReady}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#F1F0FF',
            fontSize: 15,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 20,
            opacity: googleLoading || loading || !isFirebaseReady ? 0.55 : 1,
            transition: 'opacity 0.2s, transform 0.1s',
          }}
        >
          {googleLoading ? (
            <LoadingSpinner size={18} />
          ) : (
            <GoogleIcon />
          )}
          {googleLoading
            ? 'Connexion en cours…'
            : (mode === 'signup' ? 'Continuer avec Google' : 'Se connecter avec Google')}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize: 12, color: '#6060A0', fontWeight: 500 }}>ou</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FieldWrapper label="Adresse e-mail" focused={focusedField === 'email'}>
            <input
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={inputStyle}
              autoComplete="email"
            />
          </FieldWrapper>

          <FieldWrapper label="Mot de passe" focused={focusedField === 'password'}>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={mode === 'signup' ? 'Minimum 6 caractères' : '••••••••'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle, paddingRight: 44 }}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', color: '#6060A0', fontSize: 16, padding: 4,
                }}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </FieldWrapper>

          {/* Forgot password */}
          {mode === 'login' && (
            <div style={{ textAlign: 'right', marginTop: -6 }}>
              <button type="button" onClick={handlePasswordReset} style={{ background: 'none', color: '#7C3AED', fontSize: 13, fontWeight: 500 }}>
                Mot de passe oublié ?
              </button>
            </div>
          )}

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  background: 'rgba(236,72,153,0.1)',
                  border: '1px solid rgba(236,72,153,0.25)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 13,
                  color: '#EC4899',
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {notice && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 13,
                  color: '#6EE7B7',
                }}
              >
                {notice}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || googleLoading || !isFirebaseReady}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: 14,
              background: loading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg, #7C3AED, #5B21B6)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              boxShadow: loading ? 'none' : '0 0 24px rgba(124,58,237,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 4,
              transition: 'all 0.2s',
            }}
          >
            {loading ? <LoadingSpinner size={20} /> : null}
            {loading ? 'Chargement…' : (mode === 'signup' ? '✦ Créer mon compte' : 'Se connecter')}
          </button>
        </form>

        {/* Switch mode */}
        <p style={{ textAlign: 'center', fontSize: 13, color: '#6060A0', marginTop: 20 }}>
          {mode === 'signup' ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
          <button
            type="button"
            onClick={switchMode}
            style={{ background: 'none', color: '#9F7AEA', fontWeight: 600, fontSize: 13 }}
          >
            {mode === 'signup' ? 'Se connecter' : 'Créer un compte'}
          </button>
        </p>

        {/* Legal */}
        {mode === 'signup' && (
          <p style={{ textAlign: 'center', fontSize: 11, color: '#6060A0', marginTop: 16, lineHeight: 1.6 }}>
            En créant un compte, vous acceptez nos{' '}
            <span style={{ color: '#7C3AED', cursor: 'pointer' }}>CGU</span>
            {' '}et notre{' '}
            <span style={{ color: '#7C3AED', cursor: 'pointer' }}>Politique de confidentialité</span>.
          </p>
        )}
      </motion.div>
    </div>
  )
}

function getAuthErrorMessage(error: unknown) {
  const code = (error as { code?: string })?.code
  switch (code) {
    case 'firebase/not-configured':
      return 'Firebase n’est pas encore configuré. Ajoutez les paramètres du projet dans Replit.'
    case 'auth/email-already-in-use':
      return 'Cette adresse e-mail possède déjà un compte. Essayez de vous connecter.'
    case 'auth/invalid-email':
      return 'Cette adresse e-mail n’est pas valide.'
    case 'auth/weak-password':
      return 'Choisissez un mot de passe plus robuste (au moins 6 caractères).'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Adresse e-mail ou mot de passe incorrect.'
    case 'auth/user-disabled':
      return 'Ce compte est temporairement désactivé. Contactez l’assistance.'
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Patientez quelques minutes avant de réessayer.'
    case 'auth/network-request-failed':
    case 'unavailable':
      return 'La connexion a échoué. Vérifiez votre réseau et réessayez.'
    case 'auth/popup-closed-by-user':
      return 'La fenêtre Google a été fermée avant la fin de la connexion.'
    case 'auth/popup-blocked':
      return 'Votre navigateur a bloqué la fenêtre Google. Autorisez les fenêtres pop-up puis réessayez.'
    case 'auth/operation-not-allowed':
      return 'Cette méthode de connexion n’est pas activée dans les paramètres Firebase.'
    case 'auth/unauthorized-domain':
      return 'Ce domaine n’est pas autorisé par Firebase Authentication. Ajoutez le domaine Replit dans les domaines autorisés du projet.'
    default:
      return 'Une erreur est survenue. Vérifiez votre connexion, puis réessayez.'
  }
}

/* ── Floating ambient icons ───────────────────────────────────── */

const FLOAT_ITEMS = [
  { icon: '🎬', x: '8%',  y: '18%', size: 28, delay: 0,    dur: 6 },
  { icon: '✨', x: '88%', y: '12%', size: 22, delay: 0.8,  dur: 7 },
  { icon: '🎥', x: '82%', y: '38%', size: 26, delay: 1.6,  dur: 5.5 },
  { icon: '🎭', x: '5%',  y: '55%', size: 24, delay: 0.4,  dur: 8 },
  { icon: '⚡', x: '90%', y: '68%', size: 20, delay: 2,    dur: 6.5 },
  { icon: '🎨', x: '12%', y: '78%', size: 22, delay: 1.2,  dur: 7.5 },
  { icon: '🌟', x: '78%', y: '82%', size: 20, delay: 0.6,  dur: 5 },
  { icon: '🎞️', x: '50%', y: '8%',  size: 18, delay: 1.8,  dur: 9 },
]

function FloatingIcons() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {FLOAT_ITEMS.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 0.55, 0.55, 0],
            y: [10, 0, -14, -24],
          }}
          transition={{
            delay: item.delay,
            duration: item.dur,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            fontSize: item.size,
            filter: 'blur(0.3px)',
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  )
}

/* ── Helpers ──────────────────────────────────────────────────── */

function FieldWrapper({ label, focused, children }: { label: string; focused: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: focused ? '#9F7AEA' : '#A0A0C0', marginBottom: 8, display: 'block', transition: 'color 0.2s' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 14px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#F1F0FF',
  fontSize: 15,
}

function LoadingSpinner({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
      <path d="M12 2 a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
