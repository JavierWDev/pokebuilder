import PokemonCard from "./components/PokemonCard.js";
import ImprimirEquipo from "./components/PokemonTeam.js";
import ocultar_mostrar from "./helpers/ocultar-mostrar.js";

//Creo un arreglo vacio para el equipo que desee crear
let team = [];

export default function initApp() {

    //Entro al local Storage y si hay un equipo anteriormente creado, lo cargo
    if (localStorage.getItem("pokeTeam") !== null) {
        team = JSON.parse(localStorage.getItem("pokeTeam"));
        ImprimirEquipo();
    }

    //Creo las cartas de cada pokemon
    PokemonCard();

    //Agrego el evento para ocultar los pokemon segun la generacion seleccionada
    document.getElementById("generations").addEventListener("click", function (e) {

        let option = "";

        if (e.target.matches("div input")) {

            option = e.target.id;

        }else{
            return;
        }

        ocultar_mostrar(option);
    })

    //Agrego el evento a la seleccion de los pokemon
    
    document.getElementById("pokemons").addEventListener("click", function(e){

        const seleccion = e.target;

        agregarEquipo(seleccion);
    });

    /*
    
    document.addEventListener("click", async function (e){

        let name = "???";
        let img = "app/assets/img/poke_egg.png";
        let types = [""];
        let isPoke = false;
        let dblType = false;

        if(e.target.matches(".pokemon")){
            name = e.target.parentElement.dataset.name;
            img = e.target.children[0].src;

            dblType = e.target.parentElement.getAttribute("multitype");
            
            if(dblType){
                types[0] = e.target.parentElement.getAttribute("data-type1");
                types[1] = e.target.parentElement.getAttribute("data-type2");
            }else{
                types[0] = e.target.parentElement.getAttribute("data-type1");
            }

            isPoke = true;
        }else if(e.target.matches(".pokemon-img")){
            name = e.target.parentElement.parentElement.dataset.name;
            img = e.target.src;

            dblType = e.target.parentElement.parentElement.getAttribute("multitype");

            if(dblType){
                types[0] = e.target.parentElement.parentElement.getAttribute("data-type1");
                types[1] = e.target.parentElement.parentElement.getAttribute("data-type2");
            }else{
                types[0] = e.target.parentElement.parentElement.getAttribute("data-type1");
            }

            isPoke = true;
        }

        if(isPoke){
            if(team.length === 6){
                team[5] = {
                    name, img, types
                };
            }else{
                team.push( {name, img, types} );
            }

            //Agrego el arreglo al localStorage
            localStorage.setItem("pokeTeam", JSON.stringify(team));

        }

        
        const pokeTeam = document.querySelectorAll(".pokeTeam");

        team.forEach( (pokemon, index) => {
            pokeTeam[index].children[0].children[0].src = pokemon.img;
            pokeTeam[index].children[0].children[0].dataset.team = index;
            pokeTeam[index].children[1].textContent = pokemon.name;
        })
        */

}

function agregarEquipo(seleccion){

    //Ver porque no agrega las imagenes o las lee

    if(seleccion.matches(".pokemon img")){

        const $li = seleccion.parentElement.parentElement;

        let id = $li.dataset.id;
        let name = $li.dataset.name;
        let frontImg = $li.getAttribute("data-img");
        let frontShiny = $li.dataset.shiny;
        let multitype  = $li.getAttribute("multitype");

        let color = $li.dataset.color;
        let type1 = $li.getAttribute("data-type1");
        let type2 = "";

        if(multitype){
            type2 = $li.dataset.type2;
            multitype = "true";
        }else{
            multitype = "false";
        }

        const Pokemon = {
            id,
            name,
            frontImg,
            frontShiny,
            color,
            multitype,
            type1,
            type2
        }
    
        if(team.length === 6){
            team[5] = Pokemon;
        }else{
            team.push( Pokemon );
        }
        
        localStorage.setItem("pokeTeam", JSON.stringify(team));
    
        ImprimirEquipo();
    }

}