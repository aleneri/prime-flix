import axios from "axios";

//URL Base : https://api.themoviedb.org/3/
//URL API: /movie/550?api_key=0dd67f770b95cc2b90de1c5adb72fec8&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;