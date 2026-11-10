import { movie_card, movie_container } from "./comp.js";

let url = "https://api.tvmaze.com/shows?page=0";
let movies_data = new Promise((res,rej) => {
    fetch(url).then((suc)=>{res(suc.json())}).catch((err)=>{rej("ERROR URL" + err)});
});
let display_config = {
    showMin:5,
    filterGenre:null,
    filterName:null,
};

let movies_obj = [];

let utility_methods = {
    remouve_balise(text) {
        return text.replace(/<[^>]*>/g, "");
    }
}
let display_methods = {

    display_movies(){
        movie_container.textContent = "";
        movies_obj.forEach((movie)=> {
            movie_card(movie.movie_img,movie.movie_name,movie.movie_genres,movie.movie_desc);
        })
    },
    show_more(){
        display_config.showMin += 5;
    },
    load_sorted_movies(){
        console.log("loading...");      
        movies_data.then((movies) => {
            for(let i = 0; i < display_config.showMin;i++){
                movies_obj.push({
                    movie_name:movies[i].name,
                    movie_desc:utility_methods.remouve_balise(movies[i].summary),
                    movie_genres:movies[i].genres,
                    movie_img:movies[i].image.medium,
                })
            }

            display_methods.display_movies();  
        }).catch((err)=> {
            //html comp error
        });
    }
}
display_methods.load_sorted_movies();


