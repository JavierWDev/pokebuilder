import obtenerPokemons from "../helpers/pokemon_all.js";

export default async function PokemonCard(){

    obtenerPokemons();

    //const data = obtenerPokemons();

    // data.then( pokemonList => createCard(pokemonList))

}

/*
async function createCard( pokemonList ){

    const fragment = document.createDocumentFragment();

    console.log(pokemonList.length)

}
*/
