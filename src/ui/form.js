import {Movies, our_movies_genres, SetMovies, startAsyncEvent } from "../../script.js";
import { ConfigAjoute, ConfigRecherche, FormType, PageShow, SaveLatestFilter } from "../data/store.js";
import { CreateMovie, EditeMovieById, GetAllGenres, GetAllMovies } from "../services/api.js";
import { Display } from "../services/serieService.js";
import { loading_event, more, set_genres_option } from "./cards.js";
const ajouter_movie = document.getElementById("ajouter_movie");
const add_movie_name = document.getElementById("add_movie_name");
const add_movie_genres = document.getElementById("add_movie_genres");
const add_movie_desc = document.getElementById("add_movie_desc");
const reset = document.getElementById("reset");
const recherche = document.getElementById("recherche");
const genres_select = document.getElementById("genres_select");

//Event Button ETC
more.addEventListener("click",(e) => {
    PageShow.ShowMore();
})

ajouter_movie.addEventListener("click",()=> {
    
    if(FormType.Type == "Ajoute") {
        
        if(add_movie_name.value == "" || add_movie_genres.value == ""){
            alert("Veuiller saisir le nom de du film et saisir les genres au minimum");
            return 0;
        }

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
        add_movie_genres.value = "";
        add_movie_name.value = "";
        add_movie_desc.value = "";
        set_genres_option();
        FormType.EditeForId = -1;
    }else{

        console.log("Type Modification en cours");
        let edition_value = {
            name:add_movie_name.value,
            genre:add_movie_genres.value.split(","),
            summary:add_movie_desc.value,
        }

        startAsyncEvent([EditeMovieById(FormType.EditeForId,edition_value),Display(Movies)],"Editing a Movies Wait ...");
        
        FormType.EditeForId = -1;

        add_movie_name.value = "";
        add_movie_genres.value = "";
        add_movie_desc.value = "";

        add_movie_genres.value.split(",").forEach(element => {
        if(!our_movies_genres.includes(element)){
            our_movies_genres.push(element);
        }
        });
        set_genres_option();

        ajouter_movie.textContent = "＋ Ajouter la série"
    }

    
})

recherche.addEventListener("keyup",() => {
    ConfigRecherche.name = recherche.value;
    console.log(ConfigRecherche.name);
    SetMovies();
    SaveLatestFilter();
})

genres_select.addEventListener("change", () => {
    if(genres_select.value == "All"){
        ConfigRecherche.genre = "";
    }else{
        ConfigRecherche.genre = genres_select.value;
    }
    SetMovies();
    SaveLatestFilter();
})

reset.addEventListener("click",() => {
    genres_select.value = "All"
    ConfigRecherche.genre = "";
    ConfigRecherche.name = "";
    recherche.value = "";
    SetMovies();
})