import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: 'https://dashboard.heroku.com/apps/travel-backpack/api/'
})