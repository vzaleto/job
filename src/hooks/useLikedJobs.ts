// 'use client';
// import {useState, useEffect} from 'react';
// import {Job, LikedJob} from '@/types';
//
// const createLikedJob = (job: Job): LikedJob => ({
//     job_id: job.job_id,
//     job_title: job.job_title,
//     employer_name: job.employer_name,
//     job_city: job.job_city,
//     job_country: job.job_country
//     // Добавьте другие нужные поля
// });
//
// export const useLikedJobs = () => {
//
//     const [jobs, setJobs] = useState<LikedJob[]>([]);
//
//     console.log("jobs", jobs)
//
//     const compareIds = (id1: string, id2: string) => {
//         return String(id1).trim() === String(id2).trim();
//     };
//
//     const toggleJob = (job: Job) => {
//
//         const likedJob = createLikedJob(job);
//
//       setJobs((prev)=> {
//
//           const exists = prev.some(j => compareIds (j.job_id, likedJob.job_id));
//
//           console.log('Exists:', exists);
//           console.log('Current ID:', job.job_id);
//           console.log('All IDs:', prev.map(j => j.job_id));
//
//           return exists ?
//               prev.filter(j => !compareIds(j.job_id,likedJob.job_id))
//               : [...prev, likedJob];
//
//       })
//
//     };
//
//     const isLiked = (jobId: string) => {
//         return jobs.some(j => j.job_id === jobId);
//     };
//
//     return {likedJobs: jobs, toggleJob, isLiked};
// };