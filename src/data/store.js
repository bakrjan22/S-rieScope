import { Movies, our_movies_genres, startAsyncEvent } from "../../script.js";
import { GetAllMovies } from "../services/api.js";
import { Display } from "../services/serieService.js";
import { recherche } from "../ui/cards.js";

export let ConfigAjoute = {
    name:null,
    genre:null,
    summary:null,
};
export let ConfigRecherche = {
    name:null,
    genre:null,
    language:null
};
//check if localS is full if yes set ConfigRecherche with the localS object value and call display
function SaveLatestFilter() {
    if(!localStorage.getItem("filter")){
        localStorage.setItem("filter",JSON.stringify(ConfigRecherche));
    }

}

export let PageShow = {
    ShowMin:5,
    ShowMore(){
        this.ShowMin += 5;
        Display(Movies);
    }
}
