
const pokemonList = document.getElementById('pokemonList');

async function getPokemons  ( ){
    
    let pokemonCantidad = 20;
    let  pokemons = [];
    let res;
    let data;

    for (let i = 1; i <= pokemonCantidad ; i++) {
        
        res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        data = await res.json();
        
        pokemons = [ ...pokemons, data ];
        
    }
    return pokemons
    
}

const fragment = document.createDocumentFragment();
const pokemonTemplate = document.getElementById('pokemon').content;

async function pintarPokemons (){
    
    const pokemons = await getPokemons();
    
    
    pokemons.forEach(( {name, sprites , id} ) => {
        pokemonTemplate.querySelector('p').textContent = name;
        pokemonTemplate.querySelector('img').alt = name;
        pokemonTemplate.querySelector('img').src = sprites.other['official-artwork'].front_default;
        pokemonTemplate.querySelector('h3').textContent = id;
        const clone = pokemonTemplate.cloneNode(true);
        fragment.appendChild( clone );

    })

    pokemonList.appendChild( fragment );

}

document.addEventListener('DOMContentLoaded', pintarPokemons);