// Classe FilmeService: Responsável por gerir filmes, favoritos e assistidos.
class FilmeService {
    // Construtor da classe: Inicializa as chaves usadas para armazenar dados no localStorage.
    constructor() {
        this.key = "filmes"; // Chave para armazenar a lista de filmes no localStorage
        this.favoritosKey = "favoritos"; // Chave para armazenar a lista de filmes favoritos
        this.assistidosKey = "assistidos"; // Chave para armazenar a lista de filmes assistidos
        this.lastIdKey = "lastFilmId"; // Chave para armazenar o último ID usado para um filme
    }

    // Método getLastId: Recupera o último ID usado ou retorna 0 se não houver nenhum ID salvo.
    getLastId() {
        const lastId = localStorage.getItem(this.lastIdKey); // Busca o último ID no localStorage
        return lastId ? parseInt(lastId, 10) : 0; // Converte o ID para número ou retorna 0
    }

    // Método updateLastId: Atualiza o último ID usado no localStorage.
    updateLastId(id) {
        localStorage.setItem(this.lastIdKey, id.toString()); // Salva o novo ID como string
    }

    // Método getFilmes: Recupera a lista de filmes do localStorage.
    getFilmes() {
        return JSON.parse(localStorage.getItem(this.key)) || []; // Converte a string JSON de volta para um array ou retorna um array vazio
    }

    // Método saveFilmes: Salva a lista de filmes no localStorage.
    saveFilmes(filmes) {
        localStorage.setItem(this.key, JSON.stringify(filmes)); // Converte o array de filmes para uma string JSON e salva
    }

    // Método addFilme: Adiciona um novo filme à lista com um ID sequencial.
    addFilme(novoFilme) {
        const filmes = this.getFilmes(); // Recupera a lista atual de filmes

        // Verifica se já existe um filme com o mesmo nome (ignorando maiúsculas/minúsculas)
        const filmeExistente = filmes.some(
            (filme) => filme.name.toLowerCase() === novoFilme.name.toLowerCase()
        );

        if (filmeExistente) {
            return { success: false, message: "Filme já cadastrado!" }; // Retorna uma mensagem de erro se o filme já existir
        }

        if(novoFilme.image === "") {
            return { success: false, message: "Requer uma imagem!" }; // Retorna uma mensagem de erro se a imagem estiver vazia
        }

        // Gera o próximo ID baseado no último ID usado
        const lastId = this.getLastId();
        const nextId = lastId + 1;

        // Atribui o novo ID ao filme
        novoFilme.id = nextId;

        // Adiciona o novo filme à lista de filmes
        filmes.push(novoFilme);
        this.saveFilmes(filmes); // Salva a lista atualizada no localStorage

        // Atualiza o último ID usado
        this.updateLastId(nextId);

        return { success: true, message: "Filme adicionado com sucesso!" }; // Retorna uma mensagem de sucesso
    }

    // Método getFavoritos: Recupera a lista de IDs dos filmes favoritos.
    getFavoritos() {
        return JSON.parse(localStorage.getItem(this.favoritosKey)) || []; // Converte a string JSON de volta para um array ou retorna um array vazio
    }

    // Método addFavorito: Adiciona um filme à lista de favoritos.
    addFavorito(filmeId) {
        const favoritos = this.getFavoritos(); // Recupera a lista atual de favoritos
        if (!favoritos.includes(filmeId)) { // Verifica se o filme já está na lista
            favoritos.push(filmeId); // Adiciona o ID do filme à lista
            localStorage.setItem(this.favoritosKey, JSON.stringify(favoritos)); // Salva a lista atualizada no localStorage
        }
    }

    // Método removeFavorito: Remove um filme da lista de favoritos.
    removeFavorito(filmeId) {
        const favoritos = this.getFavoritos(); // Recupera a lista atual de favoritos
        const updatedFavoritos = favoritos.filter((id) => id !== filmeId); // Filtra o ID do filme a ser removido
        localStorage.setItem(this.favoritosKey, JSON.stringify(updatedFavoritos)); // Salva a lista atualizada no localStorage
    }

    // Método getAssistidos: Recupera a lista de IDs dos filmes assistidos.
    getAssistidos() {
        return JSON.parse(localStorage.getItem(this.assistidosKey)) || []; // Converte a string JSON de volta para um array ou retorna um array vazio
    }

    // Método marcarComoAssistido: Adiciona um filme à lista de assistidos.
    marcarComoAssistido(filmeId) {
        const assistidos = this.getAssistidos(); // Recupera a lista atual de assistidos
        if (!assistidos.includes(filmeId)) { // Verifica se o filme já está na lista
            assistidos.push(filmeId); // Adiciona o ID do filme à lista
            localStorage.setItem(this.assistidosKey, JSON.stringify(assistidos)); // Salva a lista atualizada no localStorage
        }
    }

    // Método removerAssistido: Remove um filme da lista de assistidos.
    removerAssistido(filmeId) {
        const assistidos = this.getAssistidos(); // Recupera a lista atual de assistidos
        const updatedAssistidos = assistidos.filter((id) => id !== filmeId); // Filtra o ID do filme a ser removido
        localStorage.setItem(this.assistidosKey, JSON.stringify(updatedAssistidos)); // Salva a lista atualizada no localStorage
    }

    // Método deletarFilme: Remove um filme completamente (da lista de filmes, favoritos e assistidos).
    deletarFilme(filmeId) {
        // Remove o filme da lista de filmes
        const filmes = this.getFilmes();
        const updatedFilmes = filmes.filter((f) => f.id !== filmeId); // Filtra o filme a ser removido
        this.saveFilmes(updatedFilmes); // Salva a lista atualizada no localStorage

        // Remove o filme da lista de favoritos
        this.removeFavorito(filmeId);

        // Remove o filme da lista de assistidos
        this.removerAssistido(filmeId);
    }
}