import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { ThemeProvider } from './context/ThemeContext'
import NetworkFeedback from './components/NetworkFeedback'
import { firebaseAuth, firebaseDatabaseId, firestoreDb, logOut } from './firebase/client'
import SplashPage from './pages/SplashPage'
import AuthPage from './pages/AuthPage'
import OnboardingPage from './pages/OnboardingPage'
import Dashboard from './pages/Dashboard'
import CreatePage from './pages/CreatePage'
import GeneratingPage from './pages/GeneratingPage'
import ResultsPage from './pages/ResultsPage'
import LibraryPage from './pages/LibraryPage'
import ProfilePage from './pages/ProfilePage'
import CreatorPage from './pages/CreatorPage'
import PlansPage from './pages/PlansPage'
import BottomNav from './components/BottomNav'

export type Page =
  | 'splash'
  | 'auth'
  | 'onboarding'
  | 'dashboard'
  | 'create'
  | 'generating'
  | 'results'
  | 'library'
  | 'profile'
  | 'creator'
  | 'plans'

export default function App() {
  const [page, setPage] = useState<Page>('splash')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [profileError, setProfileError] = useState('')

  const navigate = (p: Page) => setPage(p)

  useEffect(() => {
    if (!firebaseAuth) return

    let initialAuthState = true
    return onAuthStateChanged(firebaseAuth, user => {
      setCurrentUser(user)
      setIsLoggedIn(Boolean(user))
      if (initialAuthState && user) setPage('dashboard')
      if (!initialAuthState && !user) setPage('splash')
      initialAuthState = false
    })
  }, [])

  useEffect(() => {
    if (!currentUser || !firestoreDb) {
      setCredits(null)
      setDisplayName('')
      setProfileError('')
      return
    }

    const userDocument = doc(firestoreDb, 'users', currentUser.uid)
    let profileCreationStarted = false

    const unsubscribe = onSnapshot(userDocument, snapshot => {
      if (!snapshot.exists()) {
        if (!profileCreationStarted) {
          profileCreationStarted = true
          const name = currentUser.displayName || currentUser.email?.split('@')[0] || 'Créateur'
          void setDoc(userDocument, {
            uid: currentUser.uid,
            email: currentUser.email ?? '',
            displayName: name,
            credits: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }).catch(error => {
            setProfileError(error.code === 'permission-denied'
              ? `Firestore refuse la création du profil. Publiez firebase/firestore.rules sur la base « ${firebaseDatabaseId} ».`
              : 'Le compte est connecté, mais son profil Firestore ne peut pas être créé. Réessayez quand la base sera disponible.')
          })
        }
        return
      }

      const profile = snapshot.data()
      setCredits(typeof profile.credits === 'number' ? profile.credits : null)
      setDisplayName(typeof profile.displayName === 'string' ? profile.displayName : '')
      setProfileError('')
    }, error => {
      if (error.code === 'permission-denied') {
        setProfileError(`Firestore a refusé l’accès au profil. Publiez firebase/firestore.rules sur la base « ${firebaseDatabaseId} ».`)
      } else if (error.code === 'not-found') {
        setProfileError(`La base Firestore « ${firebaseDatabaseId} » est introuvable. Vérifiez son identifiant dans Firebase Console.`)
      } else {
        setProfileError('Impossible de synchroniser le profil. Vérifiez votre connexion, puis réessayez.')
      }
    })

    return unsubscribe
  }, [currentUser])

  const handleAuthSuccess = (isNew: boolean) => {
    setIsLoggedIn(true)
    if (isNew) {
      navigate('onboarding')
    } else {
      navigate('dashboard')
    }
  }

  const handleOnboardingComplete = () => {
    setIsLoggedIn(true)
    navigate('dashboard')
  }

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch {
      setProfileError('La déconnexion a échoué. Vérifiez votre connexion et réessayez.')
    }
  }

  const showNav = isLoggedIn && !['splash', 'auth', 'onboarding', 'generating', 'plans'].includes(page)

  return (
    <ThemeProvider>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <NetworkFeedback />
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: showNav ? 'var(--nav-height)' : 0 }}>
          {page === 'splash' && (
            <SplashPage onLogin={() => navigate('auth')} />
          )}
          {page === 'auth' && (
            <AuthPage navigate={navigate} onAuthSuccess={handleAuthSuccess} />
          )}
          {page === 'onboarding' && (
            <OnboardingPage navigate={navigate} onComplete={handleOnboardingComplete} />
          )}
          {page === 'dashboard'   && (
            <Dashboard
              navigate={navigate}
              displayName={displayName || currentUser?.displayName || ''}
              email={currentUser?.email ?? ''}
              credits={credits}
            />
          )}
          {page === 'create'      && <CreatePage navigate={navigate} />}
          {page === 'generating'  && <GeneratingPage navigate={navigate} />}
          {page === 'results'     && <ResultsPage navigate={navigate} />}
          {page === 'library'     && <LibraryPage navigate={navigate} />}
          {page === 'profile'     && (
            <ProfilePage
              navigate={navigate}
              displayName={displayName || currentUser?.displayName || ''}
              email={currentUser?.email ?? ''}
              credits={credits}
              onSignOut={handleSignOut}
            />
          )}
          {page === 'creator'     && <CreatorPage navigate={navigate} />}
          {page === 'plans'       && <PlansPage navigate={navigate} />}
        </div>

        {showNav && (
          <BottomNav current={page} navigate={navigate} />
        )}
        {profileError && (
          <div
            role="alert"
            style={{
              position: 'fixed',
              left: 12,
              right: 12,
              bottom: showNav ? 'calc(var(--nav-height) + 12px)' : 12,
              zIndex: 260,
              padding: '12px 14px',
              borderRadius: 12,
              background: '#3B1721',
              border: '1px solid rgba(248,113,113,0.35)',
              color: '#FECACA',
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            {profileError}
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}
