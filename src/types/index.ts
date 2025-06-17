export  interface Job{
    job_id: string,
    job_title: string,
    employer_name: string,
    job_city: string
    job_country: string,
    job_description: string,
}

export interface FormDataState{
    name: string;
    desiredPosition: string;
    about: string
}
export interface LikedJob {
    job_id: string;
    job_title: string;
    employer_name: string;
    job_city?: string;
    job_country?: string;
    job_description: string
}

export interface LikedJobsContextType {
    likedJobs: LikedJob[];
    toggleJobAction: (job: Job) => void;
    isLikedAction: (jobId: string) => boolean;
}

export interface Profile {
    name: string;
    desiredPosition: string;
    about: string;
    city?: string;
}

export interface ProfileContextType {
    profile: Profile | null;
    saveProfile: (profile: Profile) => void;
    isLoading: boolean; // Добавим индикатор загрузки
}