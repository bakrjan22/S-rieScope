import {add_movie_desc, add_movie_genres, add_movie_name, ajouter_movie, error_event, genre_select, loading_event, movie_card, movie_container, recherche, reset, set_genres_option,totale_displayed } from "./src/ui/cards.js";
import { GetAllGenres, GetAllMovies } from "./src/services/api.js";
import { ConfigAjoute,ConfigRecherche, PageShow, SaveLatestFilter} from "./src/data/store.js";
import { Display } from "./src/services/serieService.js";

export let our_movies_genres = [];
export let Movies = [];



export async function startAsyncEvent(actions,expected_action){
    try {
        loading_event(expected_action,true);

        let get = await Promise.all(actions);

        return get;

    }catch(err){
        error_event("Cant load movies")
        throw err;

    }finally {
        loading_event(expected_action,false);
    }
}

SaveLatestFilter();

export async function SetMovies(){
    startAsyncEvent(
        [GetAllMovies(ConfigRecherche)],
        "Filter Wait"
    ).then(r => {
        Movies = r[0];
        Display(Movies);
    });
}

[Movies,our_movies_genres] = await startAsyncEvent(
    [GetAllMovies(ConfigRecherche),GetAllGenres()],
    "Loading fetching Movies, and genres"
);
set_genres_option();



console.log(Movies);
console.log(our_movies_genres);


await Display(Movies);

