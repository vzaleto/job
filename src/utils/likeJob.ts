import {Job, LikedJob} from "@/types";

export const createLikedJob = (job: Job): LikedJob => ({
    job_id: job.job_id,
    job_title: job.job_title,
    employer_name: job.employer_name,
    job_city: job.job_city,
    job_country: job.job_country,
    job_description: job.job_description
});