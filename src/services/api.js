import { Movies } from "../../script.js";
import { Display, FindPosById } from "./serieService.js";

const url = "https://seriescope-api.vercel.app/api";

async function BaseApi() {
    let Base = await axios.create({
        baseURL: url,
        headers: {
            "X-Learner":"b.jannane",
        }
    });
    return Base;
}
export async function GetAllMovies(config) {
    try {
        let base = await BaseApi();
        const res = await base.get("/series",{params: {
            name: config.name,
            genre: config.genre,
            language: config.language,
        }});
            return res.data
            
    }catch(err){
        error_event(err);
    }
}
export async function GetAllGenres() {
    try {
        let once = [];
        let base = await BaseApi();
        const res = await base.get("/series");
        for(let i = 0; i < res.data.length;i++){
            for(let k = 0; k < res.data[i].genres.length;k++){
                if(!once.includes(res.data[i].genres[k])){
                    once.push(res.data[i].genres[k]);
                }
            }
        }
        return once;
    }catch(err){
        error_event(err);
    }
}
export async function CreateMovie(ConfigAjoute) {
    try{
        let base = await BaseApi();
        const res = await base.post("/series", {
            name:ConfigAjoute.name,
            language:"Francais",
            genres:ConfigAjoute.genre,
            summary:ConfigAjoute.summary
        });
        Movies.push(res.data)
    }catch(err){
        console.log(err);
    }
}
export async function SupprimerById(id) {
    try {
        let base = await BaseApi();
        const res = await base.delete("/series/"+id);
        Movies.splice(FindPosById(id),1);
        await Display(Movies);
        return res.data;
    }catch(err){
        console.log(err);
    }
}
export async function EditeMovieById(id,MovieObj) {
    try{
        console.log(MovieObj);
        
        let base = await BaseApi();
        let res = await base.patch("/series/"+id, {
            name:MovieObj.name,
            genres:MovieObj.genre,
            summary:MovieObj.summary,
        });
        Movies[FindPosById(id)] = res.data;
        await Display(Movies);
        
    }catch(err){
        console.log(err);
        
    }
}