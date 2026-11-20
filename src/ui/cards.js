import { Movies, our_movies_genres, startAsyncEvent } from "../../script.js";
import { ConfigAjoute, FormType } from "../data/store.js";
import { EditeMovieById, SupprimerById } from "../services/api.js";
import { Display } from "../services/serieService.js";

export const movie_container = document.getElementById("movie-container");
export const more = document.getElementById("show_more");
export const genre_select = document.getElementById("genres_select");
export const recherche = document.getElementById("recherche");
export const reset = document.getElementById("reset");

export const add_movie_name = document.getElementById("add_movie_name");
export const add_movie_genres = document.getElementById("add_movie_genres");
export const add_movie_desc = document.getElementById("add_movie_desc");
export const ajouter_movie = document.getElementById("ajouter_movie");
export const totale_displayed = document.getElementById("totale_displayed");

export function error_event(error){
    alert(error_event);
}
export function loading_event(request, show) {
    let loading_card = document.querySelector(".loading_card");
    
    if (show === false) {
        if (loading_card) {
            loading_card.remove();
        }
        return;
    }
    if (loading_card) {
        loading_card.remove();
    }

    loading_card = document.createElement("div");
    loading_card.className = "loading_card";

    let h1_text = document.createElement("h1");
    h1_text.textContent = "Loading...";

    let rrequest = document.createElement("h2");
    rrequest.textContent = request + " Wait";

    loading_card.appendChild(h1_text);
    loading_card.appendChild(rrequest);

    document.body.appendChild(loading_card);
}
function cleanText(txt) {
    if (typeof txt !== "string") {
        return "";
    }

    return txt
        .replace(/<[^>]*>/g, "")
        .slice(0, 100) + "...";
}
function toggleValue(current, value1, value2) {
    return current === value1 ? value2 : value1;
}
export function movie_card(pic_url,movie_name,genres,desc,id){
    if(desc == "" || desc == null){
        desc = "This movie dont have any summary"
    }
    console.log(id);
    const card = document.createElement("div");
    card.classList.add("card-movie");

    const img = document.createElement("img");
    img.src = pic_url;
    img.alt = "";


    const info = document.createElement("div");
    info.classList.add("info");

    const detail = document.createElement("i");
    detail.className = "fa-solid fa-circle-info";
    detail.style = "color: rgb(255, 255, 255); cursor:pointer";

    const supprimer = document.createElement("i")
    supprimer.className = "fa-solid fa-trash";
    supprimer.style = "color: rgb(189, 0, 0); padding-right:10px;cursor:pointer";

    supprimer.addEventListener("click",()=> {
        startAsyncEvent([SupprimerById(id)],"Deleting Wait");
        console.log(id);
    })

    const edite = document.createElement("i")
    
    edite.style = "color: rgb(0, 255, 28);padding-right:10px;cursor:pointer";
    edite.className = "fa-solid fa-pen";
    

    edite.addEventListener("click",() => {

        if(FormType.EditeForId == -1 || FormType.EditeForId == id){
            FormType.EditeForId = id;
            edite.style = "color: rgb(255, 0, 0);padding-right:10px;cursor:pointer";
            edite.className = "fa-solid fa-x";
            FormType.StateType = toggleValue(FormType.StateType,true,false);
            if(FormType.StateType == true){
                //fill
                console.log("Fill field");
                add_movie_name.value = movie_name;
                add_movie_genres.value = genres.join(",");
                add_movie_desc.value = desc;
                ConfigAjoute.name = add_movie_name.value;
                ConfigAjoute.genre = add_movie_genres.value.split(",");
                ConfigAjoute.summary = add_movie_desc.value;
                ajouter_movie.textContent = "Modifier"
                FormType.Type = "Modif";
            }else{
                //Clear
                console.log("Clear field");

                ajouter_movie.textContent = "＋ Ajouter la série"
                FormType.Type = "Ajoute";
                edite.style = "color: rgb(0, 255, 28);padding-right:10px;cursor:pointer";
                edite.className = "fa-solid fa-pen";
                FormType.EditeForId = -1;
                add_movie_name.value = "";
                add_movie_genres.value = "";
                add_movie_desc.value = "";

                ConfigAjoute.name = null;
                ConfigAjoute.genre = null;
                ConfigAjoute.summary = null;
                return 0;
            }
        }else{
            alert("Cancel your Editing before continue")
        }
    })

    const title = document.createElement("h3");
    title.id = "movie-name";
    title.textContent = movie_name;

    const theme = document.createElement("div");
    theme.classList.add("theme");
    
    genres.forEach(genre => {
        const span1 = document.createElement("span");
        span1.textContent = genre;
        theme.append(span1);
    });

    const description = document.createElement("p");
    description.textContent = cleanText(desc);
    
    info.append(title, theme, description,supprimer,edite);

    card.append(img, info);
    info.append(detail);
    movie_container.appendChild(card);
}

export function set_genres_option(){
    genre_select.textContent = "";

    let default_option = document.createElement("option");
    default_option.value = "All";
    default_option.textContent = "All";
    default_option.disabled = false;
    default_option.selected = true;
    genre_select.append(default_option);

    for(let i = 0;i < our_movies_genres.length;i++){
        let option = document.createElement("option");
        option.value = our_movies_genres[i];
        option.textContent = our_movies_genres[i];
        genre_select.append(option);
    }
}