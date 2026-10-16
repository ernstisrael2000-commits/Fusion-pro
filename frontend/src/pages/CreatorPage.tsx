import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Page } from '../App'
import FusionLoader from '../components/FusionLoader/FusionLoader'
import './CreatorPage.css'

interface Props { navigate: (p: Page) => void }

/* ── Types ── */
interface Message {
  id: number
  from: 'ai' | 'user'
  text: string
  timestamp: Date
  action?: Page
  actionLabel?: string
}

/* ── Quick chips ── */
const chips = [
  { icon: '💡', label: 'Idées TikTok virales',    prompt: 'Donne-moi 5 idées de vidéos TikTok virales pour créer du contenu percutant.' },
  { icon: '✨', label: 'Améliorer mon prompt',     prompt: 'Améliore ce prompt pour une vidéo cinématique : un coucher de soleil sur la mer.' },
  { icon: '🎬', label: 'Prompt cinématique',       prompt: 'Crée un prompt cinématique professionnel pour une publicité de luxe.' },
  { icon: '🎨', label: 'Direction artistique',     prompt: 'Quelle direction artistique recommandes-tu pour une marque de mode premium ?' },
  { icon: '🚀', label: 'Idée originale',           prompt: 'Génère une idée de vidéo vraiment originale et surprenante.' },
  { icon: '📱', label: 'Format Shorts / Reels',   prompt: 'Adapte mon concept pour un format vertical 9:16 YouTube Shorts ou Instagram Reels.' },
]

/* ── Pre-computed AI responses ── */
const aiResponses: Record<string, string> = {
  'Donne-moi 5 idées de vidéos TikTok virales pour créer du contenu percutant.':
    `Voici 5 idées TikTok à fort potentiel viral 🚀\n\n• **Transformation Before/After** — montrez une ville sous la pluie puis en plein soleil, montage ultra-rapide\n• **POV immersif** — caméra à la hauteur des yeux d'un robot qui découvre la nature\n• **Time-lapse émotionnel** — une fleur qui éclot en 3 secondes, musique épique\n• **Duet avec la nature** — vous face à face avec une cascade, synchronisation parfaite\n• **Mystère en 7 secondes** — plan mystérieux qui ne se révèle qu'à la toute fin\n\nQuel concept vous inspire le plus ? 🎬`,

  'Améliore ce prompt pour une vidéo cinématique : un coucher de soleil sur la mer.':
    `Voici votre prompt enrichi ✨\n\n*"Golden hour sur l'Atlantique — caméra en tracking lent vers l'horizon, lumière ambrée rasante qui effleure les vagues, reflets dorés oscillants, ciel en dégradé orange-rose-violet, silhouette d'un voilier en contre-jour, atmosphère mélancolique et grandiose, rendu cinéma 4K, ratio 2.39:1"*\n\nCe prompt intègre : la lumière, le mouvement de caméra, l'ambiance émotionnelle et les specs techniques. Voulez-vous que je l'envoie directement en création ? 🎥`,

  'Crée un prompt cinématique professionnel pour une publicité de luxe.':
    `Prompt publicitaire luxe — niveau agence 👑\n\n*"Mains féminines délicates saisissant un flacon de parfum en cristal, macro extrême avec bokeh profond, lumière directionnelle froide et bleue avec touches de champagne, surface en marbre noir, gouttes d'eau en suspension gelées par la vitesse, mouvement de caméra orbital ultra-fluide, score orchestral minimaliste, palette désaturée avec unique éclat doré sur le produit, format 16:9 cinéma"*\n\n3 modèles recommandés pour ce style : **Veo 3**, **Runway Gen-3**, **Kling 1.5** ⚡`,

  'Quelle direction artistique recommandes-tu pour une marque de mode premium ?':
    `Direction artistique mode premium 🎨\n\nPour une marque haut de gamme, je recommande :\n\n**Palette** → Noir profond + blanc cassé + une seule couleur signature (bordeaux, cobalt ou or)\n\n**Lumière** → Chiaroscuro (clair-obscur) — contrastes forts, ombres dramatiques\n\n**Mouvement** → Slow-motion sur tissus, micro-détails en macro, poses statuaires\n\n**Références** → Maison Margiela, Bottega Veneta, The Row\n\n**Modèle IA conseillé** → Veo 3 pour les tissus en mouvement\n\nJe peux générer un moodboard visuel de référence — voulez-vous ? ✨`,

  'Génère une idée de vidéo vraiment originale et surprenante.':
    `Une idée qui va surprendre 🌀\n\n**"Le monde vu de l'intérieur d'une bulle de savon"**\n\nConception : caméra ultra-grand angle fisheye en POV depuis l'intérieur d'une bulle géante. La ville, la forêt, ou l'espace se déforment dans les reflets irisés. La bulle tremble, le monde se distord, puis — juste avant d'éclater — un moment de silence parfait.\n\nDurée idéale : 15 secondes\nModèle recommandé : **Sora** ou **Veo 3**\nStyle : surréaliste poétique\n\nIdée prête pour la génération ? 🎬`,

  'Adapte mon concept pour un format vertical 9:16 YouTube Shorts ou Instagram Reels.':
    `Adaptation format vertical 📱\n\nVoici les règles d'or pour un contenu 9:16 :\n\n• **Zone sûre** → gardez le sujet principal entre 20% et 80% de hauteur (éviter les zones de l'UI)\n• **Texte** → taille minimum 32px, centré, dans les 2/3 supérieurs\n• **Action dès la 1ère seconde** — pas d'intro, accroche immédiate\n• **Sous-titres auto** → Fusion AI les génère automatiquement\n• **Durée optimale** → 7–15s pour Reels, 15–30s pour Shorts\n\nQuel est votre concept de base ? Je l'adapte au format vertical 🎯`,
}

const WELCOME: Message = {
  id: 0,
  from: 'ai',
  text: `Bonjour ! Je suis **Fusion Créateur**, votre IA créative. 🎬\n\nJe peux vous aider à :\n• Générer des prompts vidéo percutants\n• Trouver des idées de contenu viral\n• Améliorer vos descriptions de scènes\n• Définir une direction artistique\n\nQue souhaitez-vous créer aujourd'hui ?`,
  timestamp: new Date(),
}

let nextId = 1

export default function CreatorPage({ navigate }: Props) {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  /* Auto-scroll on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const sendMessage = (text: string) => {
    if (!text.trim() || thinking) return

    const userMsg: Message = { id: nextId++, from: 'user', text: text.trim(), timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setThinking(true)

    /* Simulate AI thinking delay */
    const delay = 1400 + Math.random() * 800
    setTimeout(() => {
      const responseText =
        aiResponses[text.trim()] ??
        `Je travaille sur votre demande : *"${text.trim()}"*\n\nVoici mon analyse créative — je vais enrichir ce concept avec une direction artistique précise, des paramètres de caméra cinématiques et les meilleurs modèles IA adaptés à votre vision. Voulez-vous lancer la génération directement ? 🚀`

      const aiMsg: Message = {
        id: nextId++,
        from: 'ai',
        text: responseText,
        timestamp: new Date(),
        action: 'create',
        actionLabel: '🎬 Lancer la création',
      }
      setThinking(false)
      setMessages(prev => [...prev, aiMsg])
    }, delay)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  /* Render markdown-ish bold + line breaks */
  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1
              ? <strong key={j} style={{ color: '#C4B5FD', fontWeight: 700 }}>{part}</strong>
              : <span key={j}>{part}</span>
          )}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <div className="creator-page">

      {/* ── Header ── */}
      <div className="creator-header">
        <span />
        <span className="creator-header__title">Créateur</span>
        <button className="creator-header__menu">
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── AI Identity bar ── */}
      <div className="creator-identity">
        <div className="creator-identity__avatar">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5L11 2Z" fill="white" opacity="0.9"/>
            <circle cx="17" cy="5" r="1.5" fill="white" opacity="0.6"/>
            <circle cx="5" cy="17" r="1" fill="white" opacity="0.4"/>
          </svg>
          <div className="creator-identity__avatar-ring" />
        </div>
        <div className="creator-identity__info">
          <span className="creator-identity__name">Fusion Créateur</span>
          <span className="creator-identity__status">
            <span className="creator-identity__dot" />
            En ligne · IA créative
          </span>
        </div>
      </div>

      {/* ── Quick chips ── */}
      <div className="creator-chips">
        {chips.map((c, i) => (
          <button
            key={i}
            className="creator-chip"
            onClick={() => sendMessage(c.prompt)}
            disabled={thinking}
          >
            <span>{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Messages ── */}
      <div className="creator-messages">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              className={`creator-bubble-wrap creator-bubble-wrap--${msg.from}`}
            >
              {msg.from === 'ai' && (
                <div className="creator-bubble-avatar">
                  <svg width="12" height="12" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5L11 2Z" fill="white"/>
                  </svg>
                </div>
              )}
              <div className={`creator-bubble creator-bubble--${msg.from}`}>
                <p className="creator-bubble__text">
                  {renderText(msg.text)}
                </p>
                {msg.action && msg.actionLabel && (
                  <button
                    className="creator-bubble__cta"
                    onClick={() => navigate(msg.action!)}
                  >
                    {msg.actionLabel}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Thinking indicator */}
        <AnimatePresence>
          {thinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="creator-bubble-wrap creator-bubble-wrap--ai"
            >
              <div className="creator-bubble-avatar">
                <svg width="12" height="12" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5L11 2Z" fill="white"/>
                </svg>
              </div>
              <div className="creator-bubble creator-bubble--thinking">
                <FusionLoader inline size="sm" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div className="creator-input-bar">
        <div className="creator-input-wrap">
          <textarea
            ref={inputRef}
            className="creator-input"
            placeholder="Décrivez votre idée créative…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={thinking}
          />
          <button
            className={`creator-send ${input.trim() && !thinking ? 'creator-send--active' : ''}`}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || thinking}
            aria-label="Envoyer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}
