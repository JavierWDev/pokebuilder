
export default function ImprimirEquipo (){

    const equipo = JSON.parse(localStorage.getItem("pokeTeam"));
    const $pokeTeam = document.querySelectorAll(".pokeTeam");

    equipo.forEach( (pokemon, index) => {

        // Children 0 = Button
        // Children 0 . Children 0 = Imagen Pokemon
        // Children 1 = Nombre Pokemon
        // Children 2 = Div de Tipos 

        $pokeTeam[index].children[0].setAttribute("class", "");
        $pokeTeam[index].children[0].classList.add(pokemon.color);

        /* *** Asigno la Imagen al Pokemon *** */
        $pokeTeam[index].children[0].children[0].src = pokemon.frontImg;
        
        /* *** Asigno el Nombre al Pokemon *** */
        $pokeTeam[index].children[1].textContent = pokemon.name;

        /* *** Asigno los tipos al Pokemon *** */
        //1.- Limpio los tipos que esten previamente escritos
        $pokeTeam[index].children[2].innerHTML = "";

        //2.- Creo un fragmento que almacenara el o los tipos del pokemon
        const fragment = document.createDocumentFragment();

        //3.- Creo y Asigno el primer tipo
        const $p_type1 = document.createElement("P");
        $p_type1.textContent = pokemon.type1;
        $p_type1.classList.add(`${pokemon.type1}`);
        fragment.appendChild($p_type1);

        //4.- Si tiene otro tipo, verifico y lo agrego
        if(pokemon.multitype){
            if(pokemon.type2 !== undefined){
                const $p_type2 = document.createElement("P");
                $p_type2.textContent = pokemon.type2;
                $p_type2.classList.add(`${pokemon.type2}`);
                fragment.appendChild($p_type2);
            }
        }

        $pokeTeam[index].children[2].appendChild(fragment);

    })

}
