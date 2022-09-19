/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { CreditResponse, Cast } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[]
}

export const useMovieDetails = (movieId :number) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    })

    const getMovieDetails = async ()=>{
        const movieDetailsPromise = await movieDB.get<MovieFull>(`/${movieId}`)
        const castPromise = await movieDB.get<CreditResponse>(`/${movieId}/credits`)

        const [movieDetailsResp, castResponse] = await Promise.all([movieDetailsPromise,castPromise])
    
        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castResponse.data.cast,
        })
    
    }

    useEffect(() => {
        getMovieDetails()
    }, [])
    

    return {
        ...state
    }

}
