
'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {Job, LikedJob, LikedJobsContextType} from '@/types';
import {createLikedJob} from "@/utils/likeJob";
import {LOCAL_STORAGE_LIKED_JOBS} from "@/utils/constants";
import {getProfileFromStorage, saveProfileToStorage} from "@/utils/storage";


const LikedJobsContext = createContext<LikedJobsContextType | undefined>(undefined);

export const LikedJobsProvider = ({ children }: { children: ReactNode }) => {
    const [likedJobs, setLikedJobs] = useState<LikedJob[]>([]);

    useEffect(() => {
        getProfileFromStorage(LOCAL_STORAGE_LIKED_JOBS, setLikedJobs)
    }, []);

    useEffect(() => {
        saveProfileToStorage(LOCAL_STORAGE_LIKED_JOBS, likedJobs);
    }, [likedJobs]);

    const toggleJobAction = (job: Job) => {
        const likedJob = createLikedJob(job);
        setLikedJobs((prev) => {
            const exists = prev.some(j => j.job_id === likedJob.job_id);
            return exists
                ? prev.filter(j => j.job_id !== likedJob.job_id)
                : [...prev, likedJob];
        });
    };

    const isLikedAction = (jobId: string) => likedJobs.some(j => j.job_id === jobId);

    return (
        <LikedJobsContext.Provider value={{ likedJobs, toggleJobAction, isLikedAction }}>
            {children}
        </LikedJobsContext.Provider>
    );
};

export const useLikedJobs = () => {
    const context = useContext(LikedJobsContext);
    if (!context) {
        throw new Error('useLikedJobs должен использоваться внутри LikedJobsProvider');
    }
    return context;
};
