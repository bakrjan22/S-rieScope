let url = "https://api.tvmaze.com/shows?page=0";
let movies_data = new Promise((res,rej) => {
    fetch(url).then((suc)=>{res(suc.json())}).catch((err)=>{rej("ERROR URL" + err)});
});
