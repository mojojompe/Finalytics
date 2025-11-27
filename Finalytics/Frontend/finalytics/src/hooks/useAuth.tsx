import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useUserStore from '../stores/useUserStore';

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const { setUser, clearUser } = useUserStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    if (userDoc.exists()) {
                        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userDoc.data() } as any);
                    } else {
                        setUser({ uid: firebaseUser.uid, email: firebaseUser.email } as any);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                clearUser();
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, clearUser]);

    const login = async (email: string, password: string): Promise<any> => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email: string, password: string, fullName: string): Promise<any> => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            fullName,
            email,
            createdAt: new Date().toISOString(),
            settings: { theme: 'dark' }
        });

        return user;
    };

    const logout = (): Promise<void> => {
        return signOut(auth);
    };

    const resetPassword = (email: string): Promise<void> => {
        return sendPasswordResetEmail(auth, email);
    };

    const googleLogin = async (): Promise<any> => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        // Check if user exists, if not create doc
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                fullName: user.displayName || 'User',
                email: user.email,
                createdAt: new Date().toISOString(),
                settings: { theme: 'dark' }
            });
        }

        return user;
    };

    return { loading, login, signup, logout, resetPassword, googleLogin };
};
