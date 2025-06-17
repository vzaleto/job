'use client';
import { useEffect, useState, createContext, useContext } from "react";
import {LOCAL_STORAGE_PROFILE} from "@/utils/constants";
import {ProfileContextType, Profile} from "@/types";



const ProfileContext = createContext<ProfileContextType>({
    profile: null,
    saveProfile: () => {},
    isLoading: true,
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProfile = () => {
            try {
                const stored = localStorage.getItem(LOCAL_STORAGE_PROFILE);
                if (stored) {
                    const parsed = JSON.parse(stored) as Profile;
                    if (parsed.name && parsed.desiredPosition && parsed.city) {
                        setProfile(parsed);
                    }
                }
            } catch (error) {
                console.error('Failed to load profile:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProfile();
    }, []);

    const saveProfile = (newProfile: Profile) => {
        try {
            setProfile(newProfile);
            localStorage.setItem(LOCAL_STORAGE_PROFILE, JSON.stringify(newProfile));
        } catch (error) {
            console.error('Failed to save profile:', error);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, saveProfile, isLoading }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile должен использоваться внутри ProfileProvider');
    }
    return context;

}