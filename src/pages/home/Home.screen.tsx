import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/header/Header.component";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/card/Card.component";
import { Movie, Movies } from "../../interfaces/movies";
import axios from 'axios';

export default function Home() {
    if (!localStorage.getItem('movies')) localStorage.setItem('movies', JSON.stringify([]))
    const [ movies, setMovies ] = React.useState<Movie[]>(JSON.parse(localStorage.getItem('movies') ?? '[]'));
    const [search, setSearch] = React.useState<string>("");

    const getMovies = () => {
        const options = {
            params: {
                api_key: import.meta.env.VITE_API_KEY,
                query: search
            }
        }
        return axios.get(`${import.meta.env.VITE_API_URL}/${search ? 'search' : 'discover'}/movie?language=es-ES`, options)
        .then( resp => resp.data as Movies)
    };

    const { isPending, isFetched, data } = useQuery({
        queryKey: ['getMovies', search],
        queryFn: () => getMovies()
    });

    return (
        <>
            <Header setSearch={setSearch} setMovies={setMovies} />
            {
                isPending && <div className="flex items-center justify-center h-[90vh]"><FontAwesomeIcon icon={faSpinner} spin size="3x" /></div>
            }
            <div className="flex flex-wrap gap-14 justify-center">
            {
                isFetched &&
                    data?.results.concat(movies)?.map((movie, idx) =>
                        <div key={`${movie.title}-${idx}`}>
                            <Card movie={movie} />
                        </div>
                    )
            }
            </div>
        </>
    )
}