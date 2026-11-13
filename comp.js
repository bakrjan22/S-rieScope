import { our_movies_genres,get_detail_with_id } from "./script.js";

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

export function movie_card(pic_url,movie_name,genres,desc,id){
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

    detail.addEventListener("click", () => {
        let movie_detail = get_detail_with_id(id);
        console.log(movie_detail);
    })

    const title = document.createElement("h3");
    title.id = "movie-name";
    title.textContent = movie_name;

    const theme = document.createElement("div");
    theme.classList.add("theme");



    for(let i = 0;i < genres.length;i++){
        const span1 = document.createElement("span");
        span1.textContent = genres[i];
        theme.append(span1);
    }

    const description = document.createElement("p");
    description.textContent = desc;
    
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