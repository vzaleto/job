'use client';

import {JobCard} from "@/components/JobCard/JobCard";
import {useLikedJobs} from "@/context/LikedJobContext";
import {LikedJob} from "@/types";
import {useEffect} from "react";
import {router} from "next/client";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

    export default function likedJobPage() {

        const {user, isLoading} = useAuth();
    const { likedJobs, toggleJobAction, isLikedAction } = useLikedJobs();

    const router = useRouter();

        useEffect(() => {
            if (isLoading) return; // ждём окончания загрузки
            if (!user) {
                router.push('/login');
            }
        }, [user, isLoading]);

        if (isLoading || !user) return null;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Liked Jobs</h1>

            {likedJobs.length === 0  ? (
                <p>No liked jobs</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {likedJobs.map(job => (

                        <div key={job.job_id} className="relative">

                            <JobCard job={job}  likedJobs={likedJobs} toggleJobAction={toggleJobAction} isLikedAction={isLikedAction}/>

                            <button onClick={() => toggleJobAction(job)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                delete
                            </button>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );

}
