import {Movies, our_movies_genres, SetMovies, startAsyncEvent } from "../../script.js";
import { ConfigAjoute, ConfigRecherche, PageShow } from "../data/store.js";
import { CreateMovie, GetAllMovies } from "../services/api.js";
import { Display } from "../services/serieService.js";
import { loading_event, more, set_genres_option } from "./cards.js";
const ajouter_movie = document.getElementById("ajouter_movie");
const add_movie_name = document.getElementById("add_movie_name");
const add_movie_genres = document.getElementById("add_movie_genres");
const add_movie_desc = document.getElementById("add_movie_desc");

const recherche = document.getElementById("recherche");
const genres_select = document.getElementById("genres_select");

//Event Button ETC
more.addEventListener("click",(e) => {
    PageShow.ShowMore();
})

ajouter_movie.addEventListener("click",()=> {
    ConfigAjoute.name = add_movie_name.value;
    ConfigAjoute.genre = add_movie_genres.value.split(",");
    ConfigAjoute.summary = add_movie_desc.value;

    startAsyncEvent([CreateMovie(ConfigAjoute)],"Ajout en Cour");
    Display(Movies);
    
    ConfigAjoute.genre.forEach(element => {
        if(!our_movies_genres.includes(element)){
            our_movies_genres.push(element);
        }
    });
    set_genres_option();

    
})

recherche.addEventListener("keyup",() => {
    ConfigRecherche.name = recherche.value;
    console.log(ConfigRecherche.name);
    SetMovies();
    
})

genres_select.addEventListener("change", () => {
    if(genres_select.value == "All"){
        ConfigRecherche.genre = "";
    }else{
        ConfigRecherche.genre = genres_select.value;
    }
    SetMovies();
})

