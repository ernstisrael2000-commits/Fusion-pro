import type { Page } from '../App'

interface Props {
  current: Page
  navigate: (p: Page) => void
}

// Nav items defined inline below


export default function BottomNav({ current, navigate }: Props) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 'var(--nav-height)',
      background: 'rgba(10,10,26,0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {/* Left items */}
      <NavItem label="Accueil" icon="⌂" active={current === 'dashboard'} onClick={() => navigate('dashboard')} />
      <NavItem label="Projets" icon="⊞" active={current === 'library'}   onClick={() => navigate('library')} />

      {/* Center FAB */}
      <button
        onClick={() => navigate('create')}
        style={{
          width: 52, height: 52,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
          border: '3px solid rgba(10,10,26,0.9)',
          color: '#fff',
          fontSize: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(124,58,237,0.5)',
          transform: current === 'create' ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.2s',
          marginBottom: 8,
        }}
      >+</button>

      <NavItem label="Créateur" icon="✦" active={current === 'creator'} onClick={() => navigate('creator')} />
      <NavItem label="Profil"   icon="◯" active={current === 'profile'} onClick={() => navigate('profile')} />
    </nav>
  )
}

function NavItem({ label, icon, active, onClick }: { label: string; icon: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        padding: '4px 12px',
        color: active ? '#9F7AEA' : '#6060A0',
        fontSize: 10, fontWeight: active ? 600 : 400,
        transition: 'color 0.2s',
        minWidth: 48,
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span>{label}</span>
    </button>
  )
}
