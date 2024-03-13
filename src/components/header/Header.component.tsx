import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AddMovie from "../addMovie/AddMovie.component";
import { Movie } from "../../interfaces/movies";

interface Props {
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
    setSearch: React.Dispatch<React.SetStateAction<string>>
}
export const Header = ({ setMovies, setSearch }: Props) => {
    const [open, setOpen] = React.useState(false);
    return (
        <header>
            <div className="flex justify-between py-5" >
                <img src="https://i.ibb.co/ncsRFdV/videotube.png" alt="logo" />
                <div className="flex items-center">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className="py-1 px-2 outline-none w-64 border-2 border-solid border-[#373737] border-r-0 bg-[#181818] text-[#A3A3A3] rounded-tl-[5px] rounded-bl-[5px]"
                        placeholder="Buscar películas"
                        type="text"
                    />
                    <button className="bg-[#373737] border-0 p-[3.4px] h-9 w-10 rounded-t-none rounded-tr-[5px] rounded-e-[5px] cursor-pointer flex items-center justify-center">
                        <img src="https://i.ibb.co/f1ZJFqb/search.png" alt="icon search" />
                    </button>
                    <button onClick={() => setOpen(!open)} className="ml-8 bg-[#373737] w-9 h-9 rounded-full">
                        <FontAwesomeIcon icon={faPlus} color="#DDD" />
                    </button>
                </div>
            </div>
            <AddMovie open={open} setOpen={setOpen} setMovies={setMovies} />
        </header>
    );
};
