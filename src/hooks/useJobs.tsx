import {useQuery} from "@tanstack/react-query";
import {apiSearch} from "@/utils/api";

export const useSearchJobs = (query : string,page = 1)=>{
return useQuery({
    queryKey: ['jobs', query, page],
    queryFn: async () => {
        const response = await apiSearch.get(`/search`,{
            params: {
                query: query,
                page: page,
                num_pages: '1',
                country: 'us',
                date_posted: 'all'
            }
        });
        return response.data
    },
    enabled: !!query
})
}

export const useJobDetails = (id:string)=>{

    return useQuery({
        queryKey: ['job',id],
        queryFn: async () => {
            const decodedId = decodeURIComponent(id);
            const response = await apiSearch.get(`/job-details`,{
                params: {
                    job_id: decodedId
                }
            });
            return response.data
        },
      //  enabled: !!id
    })
}