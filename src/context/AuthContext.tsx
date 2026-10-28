import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../firebase/config';
import { AppUser } from '../types';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isFirebaseActive: boolean;
  signUp: (
    email: string, 
    password: string, 
    displayName: string, 
    role: 'student' | 'owner', 
    phone?: string, 
    college?: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          try {
            let role: 'student' | 'owner' = 'student';
            let phone = '';
            let college = '';

            if (db) {
              const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
              if (userDoc.exists()) {
                const data = userDoc.data();
                role = data.role || 'student';
                phone = data.phone || '';
                college = data.college || '';
              }
            }

            const appUser: AppUser = {
              uid: fbUser.uid,
              email: fbUser.email || '',
              displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Student',
              role,
              phone,
              college,
              createdAt: fbUser.metadata.creationTime,
            };

            setUser(appUser);
            localStorage.setItem('apnaroom_current_user', JSON.stringify(appUser));
          } catch (e) {
            console.error('Error fetching user profile:', e);
          }
        } else {
          setUser(null);
          localStorage.removeItem('apnaroom_current_user');
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Local fallback auth
      const savedUser = localStorage.getItem('apnaroom_current_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          // ignore
        }
      }
      setLoading(false);
    }
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    displayName: string, 
    role: 'student' | 'owner' = 'student', 
    phone: string = '', 
    college: string = ''
  ) => {
    if (isFirebaseConfigured && auth) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      if (displayName) {
        await updateProfile(fbUser, { displayName });
      }

      const newUserData: AppUser = {
        uid: fbUser.uid,
        email: fbUser.email || email,
        displayName: displayName || email.split('@')[0],
        role,
        phone,
        college,
        createdAt: new Date().toISOString(),
      };

      if (db) {
        await setDoc(doc(db, 'users', fbUser.uid), {
          uid: fbUser.uid,
          email,
          displayName: newUserData.displayName,
          role,
          phone,
          college,
          createdAt: newUserData.createdAt,
        });
      }

      setUser(newUserData);
      localStorage.setItem('apnaroom_current_user', JSON.stringify(newUserData));
    } else {
      // Offline/Local Simulated Auth
      const mockUid = `local-usr-${Date.now()}`;
      const newUserData: AppUser = {
        uid: mockUid,
        email,
        displayName: displayName || email.split('@')[0],
        role,
        phone,
        college,
        createdAt: new Date().toISOString(),
      };

      // Save user to registered local users list
      const existing = localStorage.getItem('apnaroom_local_users');
      const usersList = existing ? JSON.parse(existing) : [];
      usersList.push({ ...newUserData, password });
      localStorage.setItem('apnaroom_local_users', JSON.stringify(usersList));

      setUser(newUserData);
      localStorage.setItem('apnaroom_current_user', JSON.stringify(newUserData));
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isFirebaseConfigured && auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      let role: 'student' | 'owner' = 'student';
      let phone = '';
      let college = '';

      if (db) {
        const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          role = data.role || 'student';
          phone = data.phone || '';
          college = data.college || '';
        }
      }

      const appUser: AppUser = {
        uid: fbUser.uid,
        email: fbUser.email || email,
        displayName: fbUser.displayName || email.split('@')[0],
        role,
        phone,
        college,
        createdAt: fbUser.metadata.creationTime,
      };

      setUser(appUser);
      localStorage.setItem('apnaroom_current_user', JSON.stringify(appUser));
    } else {
      // Local fallback sign in
      const existing = localStorage.getItem('apnaroom_local_users');
      const usersList = existing ? JSON.parse(existing) : [];
      const found = usersList.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (found && found.password === password) {
        const { password: _, ...userData } = found;
        setUser(userData);
        localStorage.setItem('apnaroom_current_user', JSON.stringify(userData));
      } else {
        // Allow instant sign-in for demonstration or sample credentials
        const sampleUser: AppUser = {
          uid: `demo-usr-${Date.now()}`,
          email,
          displayName: email.split('@')[0].toUpperCase(),
          role: email.includes('owner') || email.includes('landlord') ? 'owner' : 'student',
          phone: '+91 98765 43210',
          college: 'Delhi University',
          createdAt: new Date().toISOString(),
        };
        setUser(sampleUser);
        localStorage.setItem('apnaroom_current_user', JSON.stringify(sampleUser));
      }
    }
  };

  const signOut = async () => {
    if (isFirebaseConfigured && auth) {
      await firebaseSignOut(auth);
    }
    setUser(null);
    localStorage.removeItem('apnaroom_current_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseActive: isFirebaseConfigured,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
