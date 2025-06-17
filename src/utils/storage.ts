
import {LikedJob} from "@/types";

export const saveProfileToStorage = (key: string,  value: LikedJob[]) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getProfileFromStorage = (key: string, value: (value: LikedJob[]) => void) => {
    const saved = localStorage.getItem(key);
    if (saved) {
        try {
            value(JSON.parse(saved));
        } catch (e) {
            console.error('Ошибка чтения likedJobs из localStorage');
        }
    }
};