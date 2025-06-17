'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";

interface AuthContextType {
    user: any;
    setUser: (user: any) => void;
    isLoading: boolean;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: { children: ReactNode }) => {

    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

        const fetchUser = async () => {

            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null)
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.status === 200) {
                    console.log(res.data)
                    setUser(res.data?.user ?? null);
                } else {
                    setUser(null);
                }

            } catch (err) {
                console.log(`Filed to fetch uer profile ${err}`)
                setUser(null)
            } finally {
                setIsLoading(false);
            }
        }

    useEffect(() => {
        void fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, isLoading,fetchUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthContextProvider');
    }
    return context;
}