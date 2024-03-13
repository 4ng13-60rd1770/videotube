export interface Movies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
export interface Movie {
    id: string;
    title: string;
    poster_path: string;
    vote_avegare: number;
    release_date: string;
    addByUser: boolean;
    trailer_path: string;
    overview: string;
}