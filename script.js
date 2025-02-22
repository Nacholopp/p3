    document.addEventListener("DOMContentLoaded", function(){

        document.getElementById("cont-pelis").style.display = "none";

        function buscarpelicula(){
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
                        var contPelis = document.getElementById("cont-pelis"); //Voy a añadir tantos div como pelis a este contenedor

                        contPelis.innerHTML = ""; //Para ir borrando cada vez que cambie lo que hay dentro

                        for (let i=0; i<data.length;i++){
                            //creo div
                            const movieDetails = document.createElement("div");


                            const img = document.createElement("img");
                            img.src = data[i].show.image.medium;
                            img.alt = data[i].show.name || "Imagen de la película";



                            img.addEventListener("click", function () {
                                window.open(data[i].show.url, "_blank");  // Redirige a la página de la serie
                            });

                            movieDetails.appendChild(img);

                            const title = document.createElement("h2")
                            title.textContent = data[i].show.name;
                            movieDetails.appendChild(title);

                            const genres = document.createElement("p");
                            genres.textContent = data[i].show.genres;
                            movieDetails.appendChild(genres);

                            const rating = document.createElement("p");
                            rating.textContent = data[i].show.rating.average;
                            movieDetails.appendChild(rating);

                            const resume = document.createElement("p");
                            resume.textContent = data[i].show.summary;
                            movieDetails.appendChild(resume);

                            contPelis.appendChild(movieDetails);
                        }
                    }
                })
                .catch(error=>console.error("Error:", error));
            }

        document.getElementById("btn-buscar").addEventListener("click",buscarpelicula);
        document.getElementById("peli-buscada").addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                buscarpelicula();
            }
        });



        document.getElementById("peli-buscada").addEventListener("input", buscarpelicula); //Detecta un input y ejecuta buscar pelicula todo el rato






    })








