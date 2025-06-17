'use client';

import {useEffect, useState} from 'react';
import {useProfile} from '@/context/ProfileContext';
import {useSearchJobs} from '@/hooks/useJobs';
import {JobCard} from '@/components/JobCard/JobCard';
import {SearchBar} from '@/components/SearchBar/SearchBar';
import {Job} from "@/types";
import {useLikedJobs} from "@/context/LikedJobContext";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";


export default function Jobs() {
     const {profile} = useProfile()
    const {user, fetchUser} = useAuth()
    const [searchQuery, setSearchQuery] = useState('');
    const {data:jobsData, isLoading} = useSearchJobs(searchQuery);
    const { likedJobs, toggleJobAction, isLikedAction } = useLikedJobs();
    const jobsAll = jobsData?.data || [];

    useEffect(() => {
        if (!isLoading && user && profile?.desiredPosition && profile?.city) {
            setSearchQuery(profile?.desiredPosition + ' in ' + profile?.city);
        }
    }, [isLoading, user, profile?.desiredPosition, profile?.city]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Поиск вакансий</h1>
            <SearchBar initialValue={searchQuery} onSearch={setSearchQuery}/>
            {isLoading && <p>... Loading</p>}
            <div>
                {jobsAll.length ?
                    jobsAll.map((elem: Job) => <JobCard key={elem.job_id} job={elem} likedJobs={likedJobs} toggleJobAction={toggleJobAction} isLikedAction={isLikedAction} />
                ) : (
                    <p>No jobs found</p>
                )}
            </div>

        </div>
    );
}