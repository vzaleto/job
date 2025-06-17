'use client';
import Link from 'next/link';
import {Job, LikedJob} from '@/types';
import {useLikedJobs} from '@/context/LikedJobContext';

export const JobCard = ({job, likedJobs, toggleJobAction, isLikedAction}: { job: Job; likedJobs: LikedJob[]; toggleJobAction: (job: Job) => void; isLikedAction: (jobId: string) => boolean}) => {

    console.log('likedJobs - JobCard', likedJobs)

    // const isLiked = likedJobs.some(likedJob => likedJob.job_id === job.job_id);

    const handleClick = (job: Job) => {
        toggleJobAction(job)
        console.log('Текущий job_id:', job.job_id);
        console.log('Сохраненные ID:', likedJobs.map((elem) => elem.job_id));
    }

    return (
        <div className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{job.job_title}</h3>
                <button
                    onClick={() => handleClick(job)}

                    className="text-red-500"
                >
                    {isLikedAction(job.job_id) ? '❤️' : '🤍'}
                </button>
            </div>
            <p className="text-gray-600">{job.employer_name}</p>
            <p className="text-gray-500 text-sm">{job.job_country}</p>
            <p className="text-gray-500 text-sm">{job.job_city}</p>
            <Link href={`/job-details/${encodeURIComponent(job.job_id)}`} className="mt-2 inline-block text-blue-500">
                Подробности
            </Link>
            {/* Отладка */}
            <div className="mt-2 text-xs text-gray-500">
                <p>ID: {job.job_id}</p>
                <p>Сохранено: {likedJobs.length}</p>
            </div>
        </div>
    )

}
