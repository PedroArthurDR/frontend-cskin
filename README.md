
<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://nextjs.org/static/favicon/favicon-32x32.png" width="100" alt="Next.js Logo" /></a>
</p>

<p align="center">Frontend da aplicação <strong>CSkinStore</strong>, desenvolvido com <a href="https://nextjs.org/" target="_blank">Next.js</a>, <a href="https://chakra-ui.com/" target="_blank">Chakra UI</a>, <a href="https://axios-http.com/" target="_blank">Axios</a> e <a href="https://react-awesome-reveal.com/" target="_blank">React Awesome Reveal</a>, oferecendo uma interface responsiva e interativa para a listagem de skins de CS:GO.</p>

<p align="center">
<a href="https://www.npmjs.com/package/next" target="_blank"><img src="https://img.shields.io/npm/v/next.svg" alt="Next.js Version" /></a>
<a href="https://www.npmjs.com/package/next" target="_blank"><img src="https://img.shields.io/npm/l/next.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/next" target="_blank"><img src="https://img.shields.io/npm/dm/next.svg" alt="NPM Downloads" /></a>
</p>

## Descrição

Este projeto fornece o frontend da aplicação **CSkinStore**. Ele foi construído utilizando **Next.js** para renderização do lado do cliente/servidor, **Chakra UI** para componentes estilizados, **Axios** para integração com a API do backend e **React Awesome Reveal** para animações elegantes na interface. A interface permite listar, filtrar e ordenar skins de CS:GO com base em parâmetros como nome, categoria, preço e float.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização de páginas do lado do cliente e servidor.
- **Chakra UI**: Biblioteca de componentes para interfaces modernas e acessíveis.
- **Axios**: Biblioteca para realizar requisições HTTP à API do backend.
- **React Awesome Reveal**: Biblioteca para animações e transições elegantes.
- **TypeScript**: Adição de tipagem estática ao projeto.

## Instalação

```bash
$ npm install
```

## Executando a Aplicação

```bash
# desenvolvimento
$ npm run dev

# produção
$ npm run build
$ npm run start
```

A aplicação estará disponível localmente em [http://localhost:3000](http://localhost:3000).

## Funcionalidades

- **Filtros Locais**: A aplicação permite que os usuários filtrem skins localmente, buscando por nome, categoria e ordenando por preço ou float.
- **Filtros pela API**: A aplicação também permite filtrar diretamente via chamadas à API, ajustando parâmetros como float, preço e categoria.
- **Scroll Infinito**: A página principal apresenta diferentes seções, e o conteúdo adicional pode ser acessado à medida que o usuário desce pela página.

## Componentes Importantes

### `MainPage.tsx`

A página principal do frontend, onde as skins são exibidas e os filtros são aplicados.

### `AllItems.tsx`

Um componente responsável por exibir a lista de skins, permitindo a aplicação de filtros locais e via API. Inclui integração com Axios para buscar os itens no backend.

### `Filtros Locais`

Permite filtrar itens no frontend por nome, categoria e ordenação (preço ou float).

### `Filtros pela API`

Envia requisições à API para filtrar os itens diretamente no backend, retornando apenas as skins que correspondem aos filtros aplicados.

## Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto para configurar a URL da API:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Isso permite que o frontend se comunique com o backend da aplicação.
