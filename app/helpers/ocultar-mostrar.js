

export default function ocultar_mostrar( opcion ){

    const $element = document.querySelector(`input[id="${opcion}"]`);

    if($element.checked)
    {
        const $pokemons = document.querySelectorAll(`li[data-gen="${opcion}"]`);
        
        $pokemons.forEach( $pokeLi => {
            $pokeLi.classList.remove("hidden");
        })

    }
    else
    {

        const $pokemons = document.querySelectorAll(`li[data-gen="${opcion}"]`);
        
        $pokemons.forEach( $pokeLi => {
            $pokeLi.classList.add("hidden");
        })

    }

}