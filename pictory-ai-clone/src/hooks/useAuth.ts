import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { useAppStore } from '@/stores/useAppStore';
import { User, SignUpForm, SignInForm } from '@/types';

export const useAuth = () => {
  const { user, setUser, setLoading } = useAppStore();
  const [authError, setAuthError] = useState<string | null>(null);

  // Create user document in Firestore
  const createUserDocument = async (firebaseUser: FirebaseUser, additionalData?: Record<string, unknown>) => {
    if (!firebaseUser) return;

    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email, photoURL } = firebaseUser;
      
      const userData: Omit<User, 'uid'> = {
        email: email!,
        displayName: displayName || email!.split('@')[0],
        photoURL: photoURL || undefined,
        subscription: {
          plan: 'free',
          status: 'active',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          currentPeriodEnd: serverTimestamp() as any,
          customerId: '',
        },
        usage: {
          imagesGenerated: 0,
          videosGenerated: 0,
          storageUsed: 0,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          lastReset: serverTimestamp() as any,
        },
        brandKit: {
          colors: [],
          fonts: [],
          templates: [],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createdAt: serverTimestamp() as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updatedAt: serverTimestamp() as any,
        ...additionalData,
      };

      try {
        await setDoc(userRef, userData);
        return { uid: firebaseUser.uid, ...userData } as User;
      } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
      }
    } else {
      // Return existing user data
      const userData = userSnap.data();
      return { uid: firebaseUser.uid, ...userData } as User;
    }
  };

  // Sign up with email and password
  const signUp = async ({ email, password, displayName }: SignUpForm) => {
    try {
      setAuthError(null);
      setLoading(true);

      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(firebaseUser, { displayName });
      
      // Create user document
      const userData = await createUserDocument(firebaseUser, { displayName });
      setUser(userData || null);
      
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage((error as { code: string }).code);
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async ({ email, password }: SignInForm) => {
    try {
      setAuthError(null);
      setLoading(true);

      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user data from Firestore
      const userData = await createUserDocument(firebaseUser);
      setUser(userData || null);
      
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage((error as { code: string }).code);
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      setLoading(true);

      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      const { user: firebaseUser } = await signInWithPopup(auth, provider);
      
      // Create or get user document
      const userData = await createUserDocument(firebaseUser);
      setUser(userData || null);
      
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage((error as { code: string }).code);
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage((error as { code: string }).code);
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setAuthError(null);
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = getAuthErrorMessage((error as { code: string }).code);
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return { success: false, error: 'No user logged in' };

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      
      // Update local state
      setUser({ ...user, ...updates } as User);
      
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message;
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get fresh user data from Firestore
  const refreshUserData = async () => {
    if (!auth.currentUser) return;

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = { uid: auth.currentUser.uid, ...userSnap.data() } as User;
        setUser(userData);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await createUserDocument(firebaseUser);
          setUser(userData || null);
        } catch (error) {
          console.error('Error loading user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser, setLoading]);

  return {
    user,
    isLoading: useAppStore(state => state.isLoading),
    isAuthenticated: useAppStore(state => state.isAuthenticated),
    error: authError,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateUserProfile,
    refreshUserData,
    clearError: () => setAuthError(null),
  };
};

// Helper function to convert Firebase auth error codes to user-friendly messages
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'Another sign-in attempt is in progress.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
};