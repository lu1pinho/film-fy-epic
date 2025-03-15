# Film-Fy EPIC

Projeto desenvolvido como parte do minicurso de **Desenvolvimento Web** para a EPIC. 
<br>O **Film-Fy** é uma aplicação web que permite aos usuários gerenciar uma lista de filmes, favoritar filmes, marcar filmes como assistidos e buscar filmes de forma dinâmica.

---

## Funcionalidades

- **Cadastro de Filmes**:
    - Adicione novos filmes com detalhes como nome, título original, ano, duração, descrição, diretor, elenco, avaliação e imagem.
    - Validação para evitar filmes duplicados e garantir que todos os campos obrigatórios sejam preenchidos.

- **Listagem de Filmes**:
    - Visualize todos os filmes cadastrados em cards interativos.
    - Clique em um filme para ver detalhes adicionais.

- **Favoritos**:
    - Marque filmes como favoritos e visualize-os em uma seção separada.

- **Assistidos**:
    - Marque filmes como assistidos para acompanhar o que já foi visto.

- **Busca Dinâmica**:
    - Busque filmes pelo nome em tempo real enquanto digita no campo de busca.

- **Pré-visualização de Imagem**:
    - Ao adicionar uma URL de imagem, o sistema exibe uma pré-visualização antes de salvar o filme.

- **Notificações (Toast)**:
    - Receba feedback visual ao adicionar, favoritar ou remover filmes.

- **Semi Responsivo**:
    - Interface semi adaptada para diferentes tamanhos de tela.

---

## Tecnologias Utilizadas

- **HTML5**: Estrutura da aplicação.
- **CSS3**: Estilização e layout responsivo.
- **JavaScript (ES6+)**: Lógica e interatividade.
- **LocalStorage**: Armazenamento de dados no navegador (filmes, favoritos e assistidos).

---

## Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/film-fy-epic.git

2. **Acesse a pasta do projeto:**
   ```bash
   cd film-fy-epic

3. **Acesse a página index.html**

## Estrutura do Projeto
``` 
film-fy-epic/
│
├── index.html          # Página principal com a listagem de filmes e busca
├── show.html           # Página de detalhes de um filme
├── add.html            # Página para adicionar um novo filme
├── css/
│   ├── styles.css      # Estilos globais
│   └── toast.css       # Estilos para as notificações toast
├── js/
│   ├── main.js         # Lógica principal da aplicação
│   ├── show.js         # Lógica da página de detalhes do filme
│   ├── add.js          # Lógica da página de adicionar filme
│   └── FilmeService.js # Classe para gerenciar filmes, favoritos e assistidos
└── README.md           # Documentação do projeto
```

## Informações
* Autor: [lu1pinho](https://github.com/lu1pinho)
* Email: oluisgustavoalves@icloud.com
* EPIC: https://epicteam.dev

## Galeria do Projeto
![localhost_63342_FILMFY_src_pages_index html](https://github.com/user-attachments/assets/5270b015-fc3a-45ae-8854-a619f2ab2b4b)
![localhost_63342_FILMFY_src_pages_show html_id=7](https://github.com/user-attachments/assets/39559e34-ffe3-4b06-81ce-7e0a5228de10)
![localhost_63342_FILMFY_src_pages_show html_id=9](https://github.com/user-attachments/assets/6b550ff4-3d58-40a2-a61c-323bebe74e60)
![localhost_63342_FILMFY_src_pages_create html](https://github.com/user-attachments/assets/5182dfd9-0176-4427-aedc-84578efb2669)


