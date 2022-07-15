import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://travel-backpack.herokuapp.com/api/'
});