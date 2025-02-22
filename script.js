document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("cont-pelis").style.display = "none";
    document.getElementById("btn-buscar").addEventListener("click", function(){
        const serInput = document.getElementById("peli-buscada").value;

        fetch(`https://api.tvmaze.com/search/shows?q=${serInput}`)  //Para poner algo dentro de una URL ${la variable}
            .then(response => response.json()) //se pasa la respuesta al formato json
            .then(data =>{

                if(data.length===0){

                    document.getElementById("cont-pelis").style.display = "none";
                    document.getElementById("texto-no-peli").textContent = `La pelicula/serie ${serInput} no existe, pruebe con otra`;
                    document.getElementById("texto-no-peli").style.display = "block";
                }

                else{

                    document.getElementById("cont-pelis").style.display = "block"
                    document.getElementById("texto-no-peli").style.display = "none";
                    document.getElementById("imgPeli").src = data[0].show.image.medium; //Con algo. accedo a cada clave del json, y como de breaking bad me da muchos resultado pues hago data[0]

                    document.getElementById("title").textContent = data[0].show.name;
                    document.getElementById("resume").textContent = data[0].show.summary;
                    document.getElementById("name").textContent = data[0].show.name;
                    document.getElementById("rating").textContent = data[0].show.rating.average;
                    document.getElementById("genres").textContent = data[0].show.genres;
                }

            })
            .catch(error=>console.error("Error:", error));

    })


})








