import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import useUserStore from '../stores/useUserStore';

export const useWatchlist = () => {
    const { user } = useUserStore();
    const [watchlist, setWatchlist] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            setWatchlist([]);
            return;
        }

        const fetchWatchlist = async () => {
            setLoading(true);
            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setWatchlist(userDoc.data().watchlist || []);
                }
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlist();
    }, [user]);

    const addToWatchlist = async (ticker: string) => {
        if (!user) return;
        try {
            await updateDoc(doc(db, "users", user.uid), {
                watchlist: arrayUnion(ticker)
            });
            setWatchlist(prev => [...prev, ticker]);
        } catch (error) {
            console.error("Error adding to watchlist:", error);
        }
    };

    const removeFromWatchlist = async (ticker: string) => {
        if (!user) return;
        try {
            await updateDoc(doc(db, "users", user.uid), {
                watchlist: arrayRemove(ticker)
            });
            setWatchlist(prev => prev.filter(t => t !== ticker));
        } catch (error) {
            console.error("Error removing from watchlist:", error);
        }
    };

    return { watchlist, loading, addToWatchlist, removeFromWatchlist };
};
