import axios from "axios";

// const SEARCH_API_KEY = `bfbb984af9mshc47977489f41f2ap14a026jsn0904d822dd54`;
// const SEARCH_API_KEY = `9efb6f3467mshcb86d013a0d560dp1b29c4jsnd7594beea75d`

const SEARCH_API_KEY = `e4194cc3a5mshe34d1afdef9ddb7p17abcdjsnbffa0ad693f7`

export const apiSearch = axios.create({
    baseURL: `https://jsearch.p.rapidapi.com`,
    headers:{
        'x-rapidapi-key': SEARCH_API_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
})

export const apiAuth = axios.create({
    baseURL: '/api/auth/',
    headers: { 'Content-Type': 'application/json' }
})