// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Cria uma instância do serviço de filmes
    const filmeService = new FilmeService();

    // Seleciona elementos do DOM (Document Object Model) para interação
    const filmCardsContainer = document.getElementById("film-cards"); // Container para os cards de filmes
    const favoriteCardsContainer = document.getElementById("favorite-cards"); // Container para os cards de favoritos
    const searchBar = document.getElementById("search-bar"); // Campo de busca
    const searchResults = document.getElementById("search-results"); // Lista de resultados da busca

    // Função para criar um card de filme
    function createFilmCard(filme) {
        // Cria um elemento <div> para representar o card do filme
        const filmCard = document.createElement("div");
        filmCard.classList.add("film"); // Adiciona a classe "film" ao card

        // Define o conteúdo HTML do card
        filmCard.innerHTML = `
            <img src="${filme.image}" alt="${filme.name}"> <!-- Imagem do filme -->
            <div class="overlay">
                <h3>${filme.name}</h3> <!-- Nome do filme -->
            </div>
        `;

        // Adiciona um evento de clique ao card para redirecionar para a página de detalhes do filme
        filmCard.addEventListener("click", () => {
            window.location.href = `show.html?id=${filme.id}`; // Redireciona com o ID do filme na URL
        });

        return filmCard; // Retorna o card criado
    }

    // Função para carregar os filmes na página
    function loadFilms() {
        const filmes = filmeService.getFilmes(); // Recupera a lista de filmes do localStorage
        filmCardsContainer.innerHTML = ""; // Limpa o conteúdo anterior do container

        // Verifica se há filmes cadastrados
        if (filmes.length === 0) {
            filmCardsContainer.innerHTML = "<p>Nenhum filme cadastrado.</p>"; // Exibe uma mensagem se não houver filmes
            return;
        }

        // Para cada filme, cria um card e adiciona ao container
        filmes.forEach((filme) => {
            const card = createFilmCard(filme); // Cria o card do filme
            filmCardsContainer.appendChild(card); // Adiciona o card ao container
        });
    }

    // Função para carregar os filmes favoritos na página
    function loadFavorites() {
        const favoritos = filmeService.getFavoritos(); // Recupera a lista de favoritos do localStorage
        const filmes = filmeService.getFilmes(); // Recupera a lista de filmes

        favoriteCardsContainer.innerHTML = ""; // Limpa o conteúdo anterior do container

        // Verifica se há filmes favoritados
        if (favoritos.length === 0) {
            favoriteCardsContainer.innerHTML = "<p>Nenhum filme favoritado.</p>"; // Exibe uma mensagem se não houver favoritos
            return;
        }

        // Para cada filme favoritado, cria um card e adiciona ao container
        favoritos.forEach((filmeId) => {
            const filme = filmes.find((f) => f.id === filmeId); // Encontra o filme pelo ID
            if (filme) {
                const card = createFilmCard(filme); // Cria o card do filme
                favoriteCardsContainer.appendChild(card); // Adiciona o card ao container
            }
        });
    }

    // Função para buscar filmes com base em uma consulta
    function searchFilms(query) {
        const filmes = filmeService.getFilmes(); // Recupera a lista de filmes

        // Filtra os filmes cujos nomes correspondem à consulta (ignorando maiúsculas/minúsculas)
        const results = filmes.filter((filme) =>
            filme.name.toLowerCase().includes(query.toLowerCase())
        );

        searchResults.innerHTML = ""; // Limpa os resultados anteriores

        // Verifica se há resultados
        if (results.length === 0) {
            searchResults.innerHTML = "<div>Nenhum filme encontrado.</div>"; // Exibe uma mensagem se não houver resultados
            searchResults.style.display = "block"; // Exibe a lista de resultados
            return;
        }

        // Para cada filme encontrado, cria um item de resultado e adiciona à lista
        results.forEach((filme) => {
            const resultItem = document.createElement("div");
            resultItem.textContent = filme.name; // Define o texto do item como o nome do filme
            resultItem.addEventListener("click", () => {
                window.location.href = `show.html?id=${filme.id}`; // Redireciona para a página de detalhes do filme
            });
            searchResults.appendChild(resultItem); // Adiciona o item à lista de resultados
        });

        searchResults.style.display = "block"; // Exibe a lista de resultados
    }

    // Evento de input no campo de busca
    searchBar.addEventListener("input", (event) => {
        const query = event.target.value.trim(); // Obtém o valor digitado no campo de busca

        // Se o campo estiver vazio, esconde a lista de resultados
        if (query === "") {
            searchResults.style.display = "none";
            return;
        }

        searchFilms(query); // Realiza a busca com o valor digitado
    });

    // Esconde a lista de resultados ao clicar fora do campo de busca
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".searchbar")) {
            searchResults.style.display = "none";
        }
    });

    // Carrega os filmes e favoritos ao carregar a página
    loadFilms();
    loadFavorites();
});