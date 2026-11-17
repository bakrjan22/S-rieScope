import { our_movies_genres } from "../../script.js";

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
    
    info.append(title, theme, description);

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