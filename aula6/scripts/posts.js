const getPosts = function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {

            const cards = document.getElementById('posts');

            posts.forEach(post => {

                // cria um objeto DOM para um elemento HTML
                const card = document.createElement('div');

                card.className = 'card';

                card.innerHTML = `
                    <img src="https://images.unsplash.com/1/type-away.jpg">
                    <div class="card-body">
                    <h2 class="card-title">${post.title}</h2>
                    <p class="card-text">${post.body}</p>
                    </div>
                    <div class="card-footer">Post ID: ${post.id}</div>
                `;
                // cria dinamicamente uma div com uma classe para cada card
                cards.appendChild(card);


                let mensagem = `ID: ${card.id}
                \nTítulo: ${card.titulo}
                \nConteúdo: ${card.body}
                \nUsuário: ${card.userId};`
                console.log(mensagem)
            });

        });

}

document.addEventListener('DOMContentLoaded', getPosts);