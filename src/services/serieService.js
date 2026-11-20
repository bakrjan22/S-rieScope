//Affichage Dynamique Etc

import {Movies, startAsyncEvent } from "../../script.js";
import { ConfigRecherche, PageShow } from "../data/store.js";
import { movie_card, movie_container } from "../ui/cards.js";
import { GetAllMovies } from "./api.js";

export function FindPosById(id){
    for(let i = 0; i < Movies.length;i++){
        if(Movies[i].id == id){
            return i;
        }
    }
}

export async function Display(Movies){    
    movie_container.textContent = "";
    let i = 0;
    Movies.forEach(movie => {
        if(i == PageShow.ShowMin){return 0;}
        movie_card(movie.image?.medium || "",movie.name,movie.genres,movie.summary,movie.id);
        i++;
    })
}