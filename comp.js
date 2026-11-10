
export const movie_container = document.getElementById("movie-container");
export const more = document.getElementById("show_more");
export function movie_card(pic_url,movie_name,genres,desc){
    const card = document.createElement("div");
    card.classList.add("card-movie");

    const img = document.createElement("img");
    img.src = pic_url;
    img.alt = "";


    const info = document.createElement("div");
    info.classList.add("info");

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

    movie_container.appendChild(card);
}