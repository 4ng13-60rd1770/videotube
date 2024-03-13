import React from "react";
import { Movie } from "../../interfaces/movies"
import Trailer from "../trailer/Trailer.component";
import axios from "axios";

interface Props {
    movie: Movie;
}

export default function Card({ movie }: Props) {
    const [ open, setOpen ] = React.useState<boolean>(false);
    const [ trailer, setTrailer] = React.useState<string>("");
    const [ info, setInfo] = React.useState({})
    const handleClick = async(movie: Movie) => {
        const options = {
            params: {
                api_key: import.meta.env.VITE_API_KEY
            }
        }
        try {
            if (!movie.addByUser) {
                let fetchInfo = await axios.get(`${import.meta.env.VITE_API_URL}/movie/${movie.id}?language=es-ES`, options);
                setInfo(fetchInfo.data)
            }
            setOpen(true);
            let trailers = await axios.get(`${import.meta.env.VITE_API_URL}/movie/${movie.id}/videos`, options)
            setTrailer(trailers?.data?.results?.[0].key ?? "")
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div onClick={() => handleClick(movie)} className="max-w-[300px] cursor-pointer">
            <img
                className="rounded-lg"
                src={movie.addByUser ? movie.poster_path : `${ "https://image.tmdb.org/t/p/w500" + movie.poster_path })`}
                alt="poster"
                width={ 300 }
                height={ 400 }
            />
            <div>
                <div>
                    <p className="font-bold text-lg mt-2">{ movie.title }</p>
                    <p>{ movie.release_date }</p>
                </div>
            </div>
            <Trailer open={open} setOpen={setOpen} trailer_path={trailer} movie={movie} info={info} />
        </div>
    )
}