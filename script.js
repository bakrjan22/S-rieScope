import {add_movie_desc, add_movie_genres, add_movie_name, ajouter_movie, genre_select, movie_card, movie_container, recherche, reset, set_genres_option,totale_displayed } from "./comp.js";

let url = "https://api.tvmaze.com/shows?page=0";
let movies_data = new Promise((res,rej) => {
    fetch(url).then((suc)=>{res(suc.json())}).catch((err)=>{rej("ERROR URL" + err)});
});

let load_more = document.getElementById("show_more");

let display_config = {
    showMin:5,
    filterGenre:"",
    filterName:"",
};
let totale_displayed_val = display_config.showMin;
totale_displayed.textContent = totale_displayed_val;
let movies_obj = [];
let our_movies = [];
let added_genres = [];
export let our_movies_genres = added_genres;
let utility_methods = {
    remouve_balise(text) {
        return text.replace(/<[^>]*>/g, "");
    },
    add_genre_once(genres){
        for(let i = 0; i < genres.length;i++){
            if(our_movies_genres.indexOf(genres[i]) == -1){
                our_movies_genres.push(genres[i]);
            }
        }
    },
    get_firts_str(chain,limit){
        if(chain.length < limit){return chain};
        let new_chain = "";
        for(let i = 0; i < limit;i++){
            new_chain += chain[i]
        }
        new_chain += "...";
        return new_chain;
    }
}
function get_all_genres() {
    movies_data.then((movies) => {
        for(let i = 0; i < movies.length;i++)
            {
                utility_methods.add_genre_once(movies[i].genres);
            }
            set_genres_option();
    }).catch((err)=> {
        alert("Error fetching genres error : " + err);
    });
}
get_all_genres();
let display_methods = {
    display_movies(){
        movie_container.textContent = "";
        totale_displayed_val = 0;
        if(display_config.filterName == "" && display_config.filterGenre == ""){
            for(let i = 0;i < display_config.showMin;i++){
                movie_card(movies_obj[i].movie_img,movies_obj[i].movie_name,movies_obj[i].movie_genres,movies_obj[i].movie_desc);
            }
        }else{
            movies_obj = movies_obj.filter(n=>n.movie_name.includes(recherche.value));
            if(display_config.filterGenre !== "" && display_config.filterGenre != "All"){
                movies_obj = movies_obj.filter(n=>n.movie_genres.includes(display_config.filterGenre));
            }
            if(recherche.value != "" && movie_container.innerHTML == ""){
                totale_displayed.textContent = 0;
                console.log("fff");    
            }else{
                return;
            }
            for(let i = 0;i < display_config.showMin;i++){                
                movie_card(movies_obj[i].movie_img,movies_obj[i].movie_name,movies_obj[i].movie_genres,movies_obj[i].movie_desc);
                totale_displayed.textContent = i + 1;
            }
           // console.log("Movie in Object : ",movies_obj);
        }
        
        
        
        
    },
    show_more(){
        display_config.showMin += 5;
    },
    load_all_movies(){
        movies_obj = [];
        movies_data.then((movies) => {
            for(let i = 0; i < movies.length;i++){
                movies_obj.push({
                    movie_name:movies[i].name,
                    movie_desc:utility_methods.remouve_balise(utility_methods.get_firts_str(movies[i].summary,100)),
                    movie_genres:movies[i].genres,
                    movie_img:movies[i].image.medium,
                })
            }
            movies_obj.unshift(...our_movies);            
            
        }).catch((err)=> {
            //alert("Error fetching movies error : " + err);
        });
    },
    load_sorted_movies(){
        this.load_all_movies();
        movies_data.then((movies) => {
            display_methods.display_movies();
            
        }).catch((err)=> {
           // alert("Error fetching movies error : " + err);
        });
    }
}
display_methods.load_sorted_movies();

//action
load_more.addEventListener("click", () => {
    display_methods.show_more();
    display_methods.load_sorted_movies();
    totale_displayed_val = display_config.showMin;
    totale_displayed.textContent = totale_displayed_val;
    
});
recherche.addEventListener('keyup',()=> {
    display_config.filterName = recherche.value;
    display_methods.load_sorted_movies();
})
genre_select.addEventListener('change',()=> {
    display_config.filterGenre = genre_select.value;
    display_methods.load_sorted_movies();    
})
reset.addEventListener("click",()=> {
    display_config.filterName = "";
    display_config.filterGenre = "";
    recherche.value = ""
    set_genres_option()    
    display_methods.load_sorted_movies(); 
});
ajouter_movie.addEventListener('click',(e)=>{
    e.preventDefault();
    if(add_movie_name.value == "" || add_movie_desc.value == "" || add_movie_genres.value == ""){
        alert("saisir toute les input");
    }else{
        our_movies.unshift({
            movie_name:add_movie_name.value,
            movie_desc:utility_methods.get_firts_str(add_movie_desc.value,50),
            movie_genres:add_movie_genres.value.split(","),
            movie_img:"https://th.bing.com/th/id/OIP.FAu3UB2l6V8b4IcM5aYCKQHaE8?w=261&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        });
    }
    display_methods.load_sorted_movies(); 
    let added_g = add_movie_genres.value.split(",");
    for(let i = 0;i < added_g.length;i++){
        if(!our_movies_genres.includes(added_g[i])){
            our_movies_genres.push(added_g[i]);
        }
    }
    
    set_genres_option();
})
