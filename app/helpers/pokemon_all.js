/* 
<option>Kanto</option> = 1
<option>Johto</option> = 2
<option>Hoenh</option> = 15
<option>Sinnoh</option> = 4
<option>Unova</option> = 7
<option>Kalos</option> = No hay
<option>Alola</option> = 14
<option>Galar</option> = 25
<option>Paldea</option> = 29
<option>Nacional</option> = 0 -- Demora demasiado
*/

const URL = "https://pokeapi.co/api/v2/";
const POKEDEX = "pokedex/";
const POKEMON = "pokemon/";
const SPECIES = "pokemon-species/";
const POKEMON_NUM = 1260;
let Pokemon_List = [];

export default async function obtenerPokemons(){

    //Creo la URL de request dependiendo de la dex solicitada
    let request = `${URL}${POKEDEX}`;
    request += `1/`;

    //Obtengo la lista de los pokemon
    // const response = await fetch(request);
    // const data = await response.json();
    // const pokemons = await obtenerPokemon(data);

    fetch(request)
        .then( response => response.json())
        .then( pokemons => {
            document.querySelector("#overlay .message").textContent  = "Obteniendo lista de todos los Pokemon";            
            obtenerPokemon(pokemons)
        })
}


// Este metodo me permite iterar sobre cada pokemon y poder obtener más informacion
function obtenerPokemon ( {pokemon_entries} ){
    pokemon_entries.forEach( pokemon => {
        const { pokemon_species } = pokemon;
        const { url } = pokemon_species;

        fetch(url)
            .then( response => response.json())
            .then( data => {
                document.querySelector("#overlay .message").textContent = "Obteniendo más información sobre cada pokemon"; 
                masInfoPokemon(data)
            })
    });

}

function masInfoPokemon(data){

    const { id, color, generation, name, order } = data;
    

    fetch(`${URL}${POKEMON}${id}`)
        .then( response => response.json())
        .then( pokeInfo => {

            document.querySelector("#overlay .message").textContent  = "Obteniendo diferentes formas del pokemon"; 

            const { sprites, types } = pokeInfo;

            const Pokemon = {
                id,
                name,
                generation,
                order,
                color,
                sprites,
                types
            }

            masFormasPokemon(Pokemon);
        })
}

function masFormasPokemon( poke ){

    const { id } = poke;

    fetch(`${URL}${SPECIES}${id}/`)
        .then( response => response.json())
        .then( data => {
            const { varieties } = data;

            if(varieties.length > 1){
                varieties.forEach( variedad => {
                obtenerFormasPokemon(variedad.pokemon.url, id);
                document.querySelector("#overlay .message").textContent  = "Obteniendo Sprites del pokemon"; 
            })
            }else{
                Pokemon_List.push(poke);
                obtenerFormasPokemon();
            }
        });
}

function obtenerFormasPokemon( url_forma = "" ,id_org = ""){

    if(url_forma !== ""){
        fetch(url_forma)
            .then( response => response.json())
            .then( data =>  {
                const { name, order,  sprites, types } = data;

                if(sprites.front_default !== null){

                    const Pokemon = {
                        id : id_org,
                        name,
                        generation : { name : "alt-form"},
                        order,
                        color : {name : "none"},
                        sprites,
                        types
                    }

                    Pokemon_List.push(Pokemon);
                }

                document.querySelector("#overlay .message").textContent = `Cargando Pokemon: ${Pokemon_List.length} / ${POKEMON_NUM}`;  
                ordenarPokemon_Id();

            }); 
    }
}

function ordenarPokemon_Id(){

    const orden = [...Pokemon_List];

    orden.sort( (prv, nxt)  => {

        const id_prv = prv.id;
        const id_nxt = nxt.id;
    
        if (id_prv < id_nxt) {
          return -1;
        }
        if (id_prv > id_nxt) {
          return 1;
        }
          
        // names must be equal
        return 0;
    });
    
    Pokemon_List = orden;

    if(Pokemon_List.length >= POKEMON_NUM){
        
        imprimirPokemon();

        setTimeout(() => {
                document.querySelector("body").classList.remove("stop--scroll");
                document.getElementById("overlay").classList.remove("overlay");
                document.getElementById("overlay").classList.add("hidden");
        }, 1000);
            
    }
     
}

function imprimirPokemon(){



    const fragment = document.createDocumentFragment();

    Pokemon_List.forEach( pokemon => {

        const { id, name, generation, order, sprites, types, color } = pokemon;

        const pokeName = name.split("-").join(" "); 

        const genName = generation.name;
        const colorName = color.name;
        const normalSprite = sprites.front_default;
        const shinySprite = sprites.front_shiny;

        //Creamos los pokemon en pantalla
        const $li = document.createElement("LI");
        $li.setAttribute("data-gen", genName);
        $li.setAttribute("data-color", colorName);
        $li.setAttribute("data-id", id);
        $li.setAttribute("data-order", order);
        $li.setAttribute("data-name", pokeName);
        $li.setAttribute("data-shiny", shinySprite);
        $li.setAttribute("data-img", normalSprite);
        $li.setAttribute("data-type1", types[0].type.name);
        $li.setAttribute("multitype", false);

        if(types.length > 1){
            $li.setAttribute("data-type2", types[1].type.name);
            $li.setAttribute("multitype", true);
        }

        const $button = document.createElement("BUTTON");
        $button.classList.add("pokemon");
        // $button.style.backgroundColor = colorName;

        const $img = document.createElement("IMG");
        $img.src = normalSprite;

        $button.appendChild($img);
        $li.appendChild($button)
        fragment.appendChild($li);
    }); 

    document.getElementById("pokemons").innerHTML = "";
    document.getElementById("pokemons").appendChild(fragment);
}

/*
json.pokemon_entries.forEach( async pokemon => {

    const { entry_number } = pokemon;
    const { url, name } = pokemon.pokemon_species;

    // console.log( name, entry_number);

    const POKE_URL = `${URL}${POKEMON}${entry_number}`;

    //Tengo 2 promises:
    //response 1: Información de la Imagen y Tipos del pokemon
    //response 2: Información de la generación a la que pertenece
    const response1 = await fetch(POKE_URL);
    const response2 = await fetch(url);

    Promise.all([response1, response2])
        .then(async responses => {
            const json1 = await responses[0].json();
            const json2 = await responses[1].json();

            const pokeId = json1.id;
            const pokeName = json1.name;
            const pokeImg = json1.sprites.front_default;
            const pokeTypes = json1.types;
            const pokeGen = json2.generation.name;

            //Creo mi obj de pokemon con la información requerida
            const pokemon = {
                pokeId,
                pokeName,
                pokeImg,
                pokeTypes,
                pokeGen,
            }

            //Agrego el pokemon a mi arreglo de data
            data.push( pokemon );

        })
        .catch(error => {
            console.error("Error: "+error); 
        });

});

setTimeout( () => {
     ordenarPokemon_Id(data);
}, 6000);

*/