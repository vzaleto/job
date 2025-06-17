'use client';


import {useJobDetails} from "@/hooks/useJobs";
import {useParams} from "next/navigation";
import {useLikedJobs} from "@/context/LikedJobContext";
import {Job} from "@/types";

export default function JobDetailsPage() {

    const {id} = useParams();
    const {data:job, isLoading} = useJobDetails(id as string);
    const { likedJobs, toggleJobAction, isLikedAction} = useLikedJobs();

    const dataLong = job?.data || []

    if(isLoading) return <p>Загрузка...</p>;
    if(!job) return <p>Вакансия не найдена</p>;

    return(
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">{dataLong[0].job_title}</h1>
                    <p className="text-xl"> {dataLong[0].employer_name}</p>
                    <p className="text-gray-600">{dataLong[0].job_country}</p>
                </div>

            <button onClick={() => toggleJobAction(job)} >{isLikedAction(job.job_id) ? '❤️' : '🤍'}</button>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Описание</h2>
                <div dangerouslySetInnerHTML={{ __html: dataLong[0].job_description }} />
            </div>
        </div>

    )
}