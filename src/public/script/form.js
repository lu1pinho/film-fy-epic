// Expor a classe FilmeService e uma instância no escopo global (window)
// Isso permite que a classe e a instância sejam acessadas em outros scripts ou no console do navegador
window.FilmeService = FilmeService; // Torna a classe FilmeService global
window.filmeService = new FilmeService(); // Cria uma instância global de FilmeService

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona elementos do DOM (Document Object Model) para interação
    const form = document.getElementById("movie-form"); // Formulário de cadastro de filme
    const urlInput = document.getElementById("movie-image"); // Campo de entrada para a URL da imagem
    const previewImg = document.getElementById("preview"); // Elemento de imagem para pré-visualização
    const noImageText = document.getElementById("no-image-text"); // Texto exibido quando não há imagem
    const backButton = document.getElementById("backbutton"); // Botão de voltar

    // Cria uma instância do serviço de filmes
    const filmeService = new FilmeService();

    // Função para exibir a imagem a partir da URL fornecida
    urlInput.addEventListener("input", function () {
        const url = this.value.trim(); // Obtém a URL e remove espaços em branco

        if (url) {
            // Se a URL não estiver vazia, tenta carregar a imagem
            previewImg.src = url; // Define a URL da imagem no elemento <img>
            previewImg.style.display = "block"; // Exibe a imagem
            noImageText.style.display = "none"; // Oculta o texto "Nenhuma imagem"

            // Verifica se a imagem foi carregada com sucesso
            previewImg.onload = function () {
                console.log("Imagem carregada com sucesso!"); // Mensagem no console
            };

            // Verifica se houve erro ao carregar a imagem
            previewImg.onerror = function () {
                console.log("Erro ao carregar a imagem."); // Mensagem no console
                previewImg.style.display = "none"; // Oculta a imagem
                noImageText.style.display = "block"; // Exibe o texto "Nenhuma imagem"
            };
        } else {
            // Se a URL estiver vazia, esconde a imagem e exibe o texto
            previewImg.style.display = "none";
            noImageText.style.display = "block";
        }
    });

    // Evento para voltar à página anterior
    backButton.addEventListener("click", () => {
        window.history.back(); // Navega para a página anterior no histórico
    });

    // Manipulação do formulário de envio
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede o comportamento padrão de enviar o formulário

        // Cria o objeto do novo filme (sem o ID, pois será gerado automaticamente)
        const newMovie = {
            name: document.getElementById("movie-name").value.trim(), // Nome do filme
            originalTitle: document.getElementById("original-title").value.trim(), // Título original
            ageIndication: document.getElementById("ageindication").value.trim(), // Classificação indicativa
            duration: document.getElementById("duration").value.trim(), // Duração
            year: document.getElementById("year").value.trim(), // Ano de lançamento
            description: document.getElementById("description").value.trim(), // Descrição
            director: document.getElementById("director").value.trim(), // Diretor
            writer: document.getElementById("writer").value.trim(), // Escritor
            cast: document.getElementById("cast").value.trim(), // Elenco
            rottenTomatoes: document.getElementById("rotten-tomatoes").value.trim(), // Avaliação do Rotten Tomatoes
            image: urlInput.value.trim(), // URL da imagem
        };

        // Tenta adicionar o filme usando o serviço de filmes
        const result = filmeService.addFilme(newMovie);

        // Exibe o resultado (toast notification)
        if (result.success) {
            showToast(result.message, "Sucesso"); // Exibe mensagem de sucesso
            form.reset(); // Limpa todos os campos do formulário
            urlInput.value = ""; // Limpa manualmente o campo da URL
            previewImg.style.display = "none"; // Oculta a imagem
            noImageText.style.display = "block"; // Exibe o texto "Nenhuma imagem"
        } else {
            showToast(result.message, "Erro"); // Exibe mensagem de erro
        }
    });

    // Função para exibir uma notificação toast
    function showToast(message, title) {
        const toast = document.getElementById("toast"); // Seleciona o elemento toast
        const toastTitle = toast.querySelector(".toast-title"); // Título do toast
        const toastMessage = toast.querySelector(".toast-message"); // Mensagem do toast

        toastTitle.textContent = title; // Define o título
        toastMessage.textContent = message; // Define a mensagem

        toast.classList.add("show"); // Exibe o toast
        setTimeout(() => hideToast(), 10000); // Esconde o toast após 10 segundos
    }

    // Função para esconder a notificação toast
    function hideToast() {
        const toast = document.getElementById("toast"); // Seleciona o elemento toast
        toast.classList.remove("show"); // Oculta o toast
    }

    // Fechar o toast ao clicar no botão de fechar
    document.getElementById("closeToast").addEventListener("click", hideToast);
});