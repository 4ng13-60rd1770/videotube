import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form"
import { Movie } from "../../interfaces/movies";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
}
type formData = {
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    id: string;
    addByUser: boolean;
    trailer_path: string;
    overview: string;
}

export default function AddMovie({ open, setOpen, setMovies }: Props) {
    const cancelButtonRef = React.useRef(null);
    const { register, handleSubmit } = useForm<formData>({ defaultValues: { addByUser: true, id: Math.random().toString(30).substring(2) }})

    const onSubmit: SubmitHandler<formData> = (data) => {
        const movies: any[] = JSON.parse(localStorage.getItem("movies") ?? "[]") ?? [];
        movies.push(data)
        localStorage.setItem('movies', JSON.stringify(movies));
        setOpen(false);
        setMovies(movies)
    }
    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-white bg-[#181818] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-[#181818] p-6">
                            <div className="flex justify-between items-center">
                                <img src="../../../public/videotube.png" alt="logo" />
                                <button className="border px-3 py-2 rounded-lg font-semibold" onClick={() => setOpen(false)}>
                                    Cerrar
                                </button>
                            </div>
                            <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col">
                                    <label htmlFor="title" className="font-bold text-xl">Titulo *</label>
                                    <input required className="mt-1 border-2 px-2 py-1 outline-none rounded-md bg-[#181818] border-[#373737] text-[#A3A3A3]" type="text" id="title" placeholder="Pobres criaturas" { ...register("title") } />

                                    <label htmlFor="overview" className="font-bold text-xl">Descripcion *</label>
                                    <textarea required className="mt-1 border-2 px-2 py-1 outline-none rounded-md bg-[#181818] border-[#373737] text-[#A3A3A3]" id="overview" placeholder="Sinopsis" { ...register("overview") } />

                                    <label htmlFor="poster_path" className="font-bold text-xl">Poster *</label>
                                    <input required className="mt-1 border-2 px-2 py-1 outline-none rounded-md bg-[#181818] border-[#373737] text-[#A3A3A3]" type="text" id="poster_path" { ...register("poster_path") } />

                                    <label htmlFor="trailer_path" className="font-bold text-xl">Trailer *</label>
                                    <input required className="mt-1 border-2 px-2 py-1 outline-none rounded-md bg-[#181818] border-[#373737] text-[#A3A3A3]" type="text" id="trailer_path" { ...register("trailer_path") } />


                                    <label htmlFor="vote_average" className="font-bold text-xl">Puntuacion *</label>
                                    <input required className="mt-1 border-2 px-2 py-1 outline-none rounded-md bg-[#181818] border-[#373737] text-[#A3A3A3]" min={1} max={100} type="number" id="vote_average" placeholder="74" { ...register("vote_average") } />

                                    <label htmlFor="release_date" className="font-bold text-xl">Fecha de lanzamiento *</label>
                                    <input required className="mt-1 border-2 px-2 py-1 outline-none rounded-md bg-[#181818] border-[#373737] text-[#A3A3A3]" type="date" id="release_date" placeholder="74" { ...register("release_date") } />
                                </div>
                                <button className="px-3 rounded-lg font-semibold mt-8 w-full text-xl py-1 bg-green-500">
                                    Añadir
                                </button>
                            </form>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
