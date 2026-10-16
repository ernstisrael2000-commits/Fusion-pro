import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type Auth,
} from 'firebase/auth'
import {
  getFirestore,
  type Firestore,
} from 'firebase/firestore'

const clean = (value?: string) => value?.trim() ?? ''
const requiredFirebaseEnv = {
  VITE_FIREBASE_API_KEY: clean(import.meta.env.VITE_FIREBASE_API_KEY),
  VITE_FIREBASE_AUTH_DOMAIN: clean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  VITE_FIREBASE_PROJECT_ID: clean(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  VITE_FIREBASE_APP_ID: clean(import.meta.env.VITE_FIREBASE_APP_ID),
}

const optionalFirebaseEnv = {
  storageBucket: clean(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) || undefined,
  messagingSenderId: clean(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || undefined,
}

export const firebaseDatabaseId = clean(import.meta.env.VITE_FIREBASE_DATABASE_ID) || '(default)'

export const missingFirebaseConfig = Object.entries(requiredFirebaseEnv)
  .filter(([, value]) => !value)
  .map(([key]) => key)

export const isFirebaseConfigured = missingFirebaseConfig.length === 0

let firebaseApp: FirebaseApp | null = null
let auth: Auth | null = null
let database: Firestore | null = null
let initError = ''

if (isFirebaseConfigured) {
  try {
    firebaseApp = getApps().length > 0
      ? getApp()
      : initializeApp({
          apiKey: requiredFirebaseEnv.VITE_FIREBASE_API_KEY,
          authDomain: requiredFirebaseEnv.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: requiredFirebaseEnv.VITE_FIREBASE_PROJECT_ID,
          appId: requiredFirebaseEnv.VITE_FIREBASE_APP_ID,
          ...optionalFirebaseEnv,
        })
    auth = getAuth(firebaseApp)
    database = getFirestore(firebaseApp, firebaseDatabaseId)
  } catch (error) {
    const code = (error as { code?: string })?.code
    initError = code === 'auth/invalid-api-key'
      ? 'La clé API Web a été refusée. Vérifiez VITE_FIREBASE_API_KEY dans la configuration de votre application Firebase.'
      : 'La configuration Firebase a été refusée. Vérifiez les identifiants et les domaines autorisés dans la console Firebase.'
  }
}

export const firebaseInitError = initError
export const isFirebaseReady = isFirebaseConfigured && !firebaseInitError && Boolean(auth && database)
export const firebaseAuth = auth
export const firestoreDb = database
export const googleProvider = new GoogleAuthProvider()

export async function createEmailAccount(email: string, password: string) {
  if (!firebaseAuth) throw new Error('firebase/not-configured')
  return createUserWithEmailAndPassword(firebaseAuth, email.trim(), password)
}

export async function signInWithEmail(email: string, password: string) {
  if (!firebaseAuth) throw new Error('firebase/not-configured')
  return signInWithEmailAndPassword(firebaseAuth, email.trim(), password)
}

export async function signInWithGoogle() {
  if (!firebaseAuth) throw new Error('firebase/not-configured')
  return signInWithPopup(firebaseAuth, googleProvider)
}

export async function sendPasswordReset(email: string) {
  if (!firebaseAuth) throw new Error('firebase/not-configured')
  return sendPasswordResetEmail(firebaseAuth, email.trim())
}

export async function logOut() {
  if (!firebaseAuth) throw new Error('firebase/not-configured')
  return signOut(firebaseAuth)
}

