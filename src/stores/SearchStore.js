import { defineStore } from "pinia";
import { useMovieStore } from './MovieStore'
import {ref} from 'vue'
import axios from 'axios';


export const useSearchStore = defineStore('searchStore', ()=>{
const loader = ref(false)
const movies = ref([])

const getMovies = async(search)=>{
    loader.value = true
    const apiKey = '674WTCV-RVGMBQF-PR4M8DF-AH4G1ZQ';
    const url = `https://api.kinopoisk.dev/v1.3/movie`;

    try {
        const response = await axios.get(url, {
            params: {
                token: apiKey,
                field: 'alternativeName',
                search: search,
            }
        });

        movies.value = response.data.docs.map(movie => ({
            id: movie.id,
            original_title: movie.alternativeName,
            overview: movie.description,
            poster_path: movie.poster.url,
            release_date: movie.year
        }));

        console.log(response.data);
    } catch (error) {
        console.error('Ошибка запроса:', error);
    } finally {
        loader.value = false;
    }
}
const addToUserMovies = (obj) => {
    const movieStore = useMovieStore();
    movieStore.movies.push({...obj,isWatched:false})
    movieStore.activeTab = 1;
    console.log(obj)
}
return{
    loader,
    movies,
    getMovies,
    addToUserMovies
}
})
