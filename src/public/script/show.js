// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Cria uma instância do serviço de filmes
    const filmeService = new FilmeService();

    // Seleciona elementos do DOM (Document Object Model) para interação
    const movieName = document.getElementById("movie-name"); // Nome do filme
    const originalTitle = document.getElementById("original-title"); // Título original
    const yearRuntime = document.getElementById("year-runtime"); // Ano, classificação e duração
    const description = document.getElementById("description"); // Descrição do filme
    const director = document.getElementById("director"); // Diretor
    const writer = document.getElementById("writer"); // Escritor
    const castList = document.getElementById("cast"); // Lista de elenco
    const rottenTomatoes = document.getElementById("rotten-tomatoes"); // Avaliação do Rotten Tomatoes
    const movieBanner = document.getElementById("movie-banner"); // Banner do filme
    const backButton = document.getElementById("backbutton"); // Botão de voltar
    const markWatchedButton = document.querySelector(".mark-watched"); // Botão "Marcar como Assistido"
    const favoriteButton = document.querySelector(".favorite"); // Botão "Favoritar"
    const deleteButton = document.querySelector(".delete"); // Botão "Deletar"
    const confirmationModal = document.getElementById("confirmation-modal"); // Modal de confirmação de exclusão
    const confirmDeleteButton = document.getElementById("confirm-delete"); // Botão de confirmação de exclusão
    const cancelDeleteButton = document.getElementById("cancel-delete"); // Botão de cancelar exclusão

    let filmeId; // Variável para armazenar o ID do filme

    // Função para carregar os detalhes do filme
    function loadFilmDetails() {
        // Obtém o ID do filme da URL (parâmetro "id")
        const urlParams = new URLSearchParams(window.location.search);
        filmeId = parseInt(urlParams.get("id"), 10);

        // Verifica se o ID do filme é válido
        if (!filmeId) {
            alert("Filme não encontrado."); // Exibe um alerta
            window.location.href = "index.html"; // Redireciona para a página inicial
            return;
        }

        // Recupera a lista de filmes do localStorage
        const filmes = filmeService.getFilmes();
        // Encontra o filme com o ID correspondente
        const filme = filmes.find((f) => f.id === filmeId);

        // Verifica se o filme foi encontrado
        if (!filme) {
            alert("Filme não encontrado."); // Exibe um alerta
            window.location.href = "index.html"; // Redireciona para a página inicial
            return;
        }

        // Preenche os detalhes do filme nos elementos do DOM
        movieName.textContent = filme.name; // Nome do filme
        originalTitle.textContent = `Título original: ${filme.originalTitle}`; // Título original
        yearRuntime.textContent = `${filme.year} - ${filme.ageIndication} - ${filme.duration}`; // Ano, classificação e duração
        description.textContent = filme.description; // Descrição
        director.textContent = filme.director; // Diretor
        writer.textContent = filme.writer; // Escritor
        rottenTomatoes.textContent = filme.rottenTomatoes; // Avaliação do Rotten Tomatoes

        // Preenche a lista de artistas (elenco)
        castList.innerHTML = filme.cast
            .split(",") // Divide a string do elenco em um array
            .map((artist) => `<li>${artist.trim()}</li>`) // Cria um item de lista para cada artista
            .join(""); // Junta os itens em uma única string

        // Define a imagem do banner do filme
        movieBanner.src = filme.image;
        movieBanner.alt = `Banner do Filme ${filme.name}`;

        // Verifica se o filme está marcado como assistido
        const assistidos = filmeService.getAssistidos();
        if (assistidos.includes(filmeId)) {
            markWatchedButton.classList.add("active"); // Adiciona a classe "active" ao botão
            markWatchedButton.textContent = "Assistido"; // Altera o texto do botão
        } else {
            markWatchedButton.classList.remove("active"); // Remove a classe "active" do botão
            markWatchedButton.textContent = "Marcar como Assistido"; // Altera o texto do botão
        }

        // Verifica se o filme está favoritado
        const favoritos = filmeService.getFavoritos();
        if (favoritos.includes(filmeId)) {
            favoriteButton.classList.add("active"); // Adiciona a classe "active" ao botão
            favoriteButton.textContent = "Favoritado"; // Altera o texto do botão
        } else {
            favoriteButton.classList.remove("active"); // Remove a classe "active" do botão
            favoriteButton.textContent = "Favoritar"; // Altera o texto do botão
        }
    }

    // Evento para marcar/desmarcar como assistido
    markWatchedButton.addEventListener("click", () => {
        const assistidos = filmeService.getAssistidos();

        if (assistidos.includes(filmeId)) {
            // Se o filme já está marcado como assistido, remove da lista
            filmeService.removerAssistido(filmeId);
            markWatchedButton.classList.remove("active");
            markWatchedButton.textContent = "Marcar como Assistido";
        } else {
            // Se o filme não está marcado como assistido, adiciona à lista
            filmeService.marcarComoAssistido(filmeId);
            markWatchedButton.classList.add("active");
            markWatchedButton.textContent = "Assistido";
        }
    });

    // Evento para favoritar/desfavoritar
    favoriteButton.addEventListener("click", () => {
        const favoritos = filmeService.getFavoritos();

        if (favoritos.includes(filmeId)) {
            // Se o filme já está favoritado, remove da lista
            filmeService.removeFavorito(filmeId);
            favoriteButton.classList.remove("active");
            favoriteButton.textContent = "Favoritar";
        } else {
            // Se o filme não está favoritado, adiciona à lista
            filmeService.addFavorito(filmeId);
            favoriteButton.classList.add("active");
            favoriteButton.textContent = "Favoritado";
        }
    });

    // Evento para abrir o modal de confirmação de exclusão
    deleteButton.addEventListener("click", () => {
        confirmationModal.classList.add("active"); // Mostra o modal
    });

    // Evento para confirmar a exclusão do filme
    confirmDeleteButton.addEventListener("click", () => {
        filmeService.deletarFilme(filmeId); // Deleta o filme
        window.location.href = "index.html"; // Redireciona para a página inicial
    });

    // Evento para cancelar a exclusão do filme
    cancelDeleteButton.addEventListener("click", () => {
        confirmationModal.classList.remove("active"); // Oculta o modal
    });

    // Evento para voltar à página anterior
    backButton.addEventListener("click", () => {
        window.history.back(); // Navega para a página anterior no histórico
    });

    // Carrega os detalhes do filme ao carregar a página
    loadFilmDetails();
});