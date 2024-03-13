import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Movie } from "../../interfaces/movies";
import ReactPlayer from 'react-player/youtube'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    trailer_path: string;
    movie: Movie;
    info: any
}

export default function Trailer({ open, setOpen, movie, trailer_path, info }: Props) {
    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setOpen(false)}
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
                    <Dialog.Panel >
                        <div className="bg-[#181818] p-6">
                            <div className="flex justify-between items-center mb-6">
                                <p className="font-bold text-xl">{ movie.title }</p>
                                <FontAwesomeIcon className="cursor-pointer" onClick={() => setOpen(false)} icon={faXmark} size="2xl" />
                            </div>
                            <ReactPlayer url={movie.addByUser ?  movie.trailer_path : `https://www.youtube.com/embed/${trailer_path}`} controls  />
                            <p className="mt-6 font-semibold max-w-[650px]">{ movie.addByUser ? movie.overview : info.overview }</p>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}