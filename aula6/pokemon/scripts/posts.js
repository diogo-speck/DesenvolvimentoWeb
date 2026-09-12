const getPosts = function () {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=50')
        .then(response => response.json())
        .then(posts => {

            const cards = document.getElementById('posts');

            posts.results.forEach(post => {

                fetch(post.url)
                    .then(response => response.json())
                    .then(pokemon => {

                        fetch(`https://pokeapi.co/api/v2/pokemon-form/${pokemon.id}/`)
                            .then(response => response.json())
                            .then(form => {

                                // cria um objeto DOM para um elemento HTML
                                const card = document.createElement('div');

                                card.className = 'card';

                                card.innerHTML = `
                                    <img src="${form.sprites.front_default}">
                                    <div class="card-body">
                                        <h2 class="card-title">${pokemon.name}</h2>
                                        <p class="card-text">
                                            Altura: ${pokemon.height}<br>
                                            Peso: ${pokemon.weight}
                                        </p>
                                    </div>
                                    <div class="card-footer">Pokémon ID: ${pokemon.id}</div>
                                `;

                                // cria dinamicamente uma div com uma classe para cada card
                                cards.appendChild(card);

                                let mensagem = `ID: ${pokemon.id}
                                \nNome: ${pokemon.name}
                                \nAltura: ${pokemon.height}
                                \nPeso: ${pokemon.weight}`;

                                console.log(mensagem);
                            });
                    });
            });
        });
}

document.addEventListener('DOMContentLoaded', getPosts);