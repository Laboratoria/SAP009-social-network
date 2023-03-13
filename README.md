# Criando uma Rede Social

## Índice

* [1. Início e protótipos](#1-protótipos)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Objetivos de aprendizagem](#3-objetivos-de-aprendizagem)
* [4. Considerações gerais](#4-considerações-gerais)
* [5. Critérios de aceitação mínimos do
  projeto](#5-criterios-de-aceitação-mínimos-do-projeto)
* [6. Hacker edition](#6-hacker-edition)
* [7. Entrega](#7-entrega)
* [8. Guias, dicas e leituras
  complementares](#8-guias-dicas-e-leituras-complementares)

***

## 1. Início e protótipos

As redes sociais invadiram nossas vidas. Há redes sociais de todo tipo para todos os tipos de interesse. Essa é uma rede social criada para mães que desejam falar de maternidade real e para dicas e impressões sobre vinhos. Porque não há nada melhor que uma conversa franca e sincera acompanhada de uma taça de um bom vinho. Esse é um espaço para trocas reais.

  - ### Esses são os protótipos de alta fidelidade 

<img width="200px" src="src\imagens\print login mobile.PNG">
<img width="200px" src="src\imagens\print cadastro mobile.PNG">
<img width="200px" src="src\imagens\print post mobile.PNG">


## 2. Resumo do projeto

Sua Rede Social terá que permitir à qualquer usuário criar uma conta de acesso,
logar-se com ela, criar, editar, deletar e dar _likes_ em publicações.

O objetivo principal de aprendizagem deste projeto é construir uma Single-page
Application (SPA) 
Responsiva
é possível **ler e escrever dados**.

## 3. Objetivos de aprendizagem

Reflita e depois enumere os objetivos que quer alcançar e aplique no seu projeto. Pense nisso para decidir sua estratégia de trabalho.

### HTML

- [ ] **Uso de HTML semântico**

### CSS

- [ ] **Uso de seletores de CSS**
 
- [ ] **Modelo de caixa (box model): borda, margem, preenchimento**

- [ ] **Uso de flexbox em CSS**

- [ ] **Uso de CSS Grid Layout**

### Web APIs

- [ ] **Uso de seletores de DOM**

  <details><summary>Links</summary><p>

- [ ] **Manipulação de eventos de DOM (listeners, propagação, delegação)**

- [ ] **Manipulação dinâmica de DOM**

- [ ] **Routing (History API, evento hashchange, window.location)**


### JavaScript

- [ ] **Arrays (arranjos)**

- [ ] **Objetos (key, value)**

- [ ] **Diferenciar entre tipos de dados primitivos e não primitivos**

- [ ] **Variáveis (declaração, atribuição, escopo)**

- [ ] **Uso de condicionais (if-else, switch, operador ternário, lógica booleana)**

- [ ] **Uso de laços (while, for, for..of)**

- [ ] **Funções (params, args, return)**

- [ ] **Testes unitários (unit tests)**

- [ ] **Testes assíncronos**

- [ ] **Uso de mocks e espiões**

- [ ] **Módulos de ECMAScript (ES modules)**

- [ ] **Uso de linter (ESLINT)**

- [ ] **Uso de identificadores descritivos (Nomenclatura e Semântica)**

- [ ] **Diferença entre expressões (expressions) e declarações (statements)**

- [ ] **Callbacks**

- [ ] **Promessas**


### Controle de Versões (Git e GitHub)

- [ ] **Git: Instalação e configuração**

- [ ] **Git: Controle de versão com git (init, clone, add, commit, status, push, pull, remote)**

- [ ] **Git: Integração de mudanças entre ramos (branch, checkout, fetch, merge, reset, rebase, tag)**

- [ ] **GitHub: Criação de contas e repositórios, configuração de chave SSH**

- [ ] **GitHub: Implantação com GitHub Pages**

- [ ] **GitHub: Colaboração pelo Github (branches | forks | pull requests | code review | tags)**

- [ ] **GitHub: Organização pelo Github (projects | issues | labels | milestones | releases)**

### Centrado no usuário

- [ ok ] **Desenhar e desenvolver um produto ou serviço colocando as usuárias no centro**

### Design de produto

- [ ok ] **Criar protótipos para obter feedback e iterar**

- [ ok ] **Aplicar os princípios de desenho visual (contraste, alinhamento, hierarquia)**

### Pesquisa

- [ ok ] **Planejar e executar testes de usabilidade**

### Firebase

- [ ] **Firebase Auth**

- [ ] **Firestore**


## 4. Considerações gerais

* Este projeto deve ser desenvolvido em trios.

* O intervalo de tempo estimado para concluir o projeto é de 4 a 5 Sprints.

* A lógica do projeto deve estar implementada completamente em JavaScript
  (ES6+), HTML e CSS :smiley:. Para este projeto **não está permitido** o uso de
  _frameworks_ ou bibliotecas de CSS e JS.

* A divisão e organização do trabalho deve permitir, sem exceção, que **cada
  integrante** da equipe pratique a aprendizagem de tudo que está envolvido em
  **cada história**. _Não dividam o trabalho como em uma fábrica._

* Está avançando em seus projetos com alguma fluidez e sem grandes problemas?
  Seja generosa com suas parceiras, deixe-as aprender e praticar sem restrições,
  mesmo que demore um pouco mais. Aproveite para _mentorá-las_, para fazer _pair
  programming_. Uma das melhores formas de aprender é explicar verbalmente.

* Está sentindo dificuldade e para você é mais difícil de avançar? Não fique com
  as partes "fáceis" do projeto. Converse, negocie, busque sua oportunidade de
  praticar e aprender o que é mais difícil para você.

* Vocês apenas poderão trabalhar em uma história por vez. Não avancem para a
  próxima sem completar a anterior. As histórias apenas são concluídas quando se
  completam **todos** os critérios de aceitação + **toda** sua definição de
  pronto.

Para começar, você precisará criar um _fork_ e _clone_ deste repositório.

## 5. Critérios de aceitação mínimos do projeto

### 5.1 Boilerplate

Este projeto não inclui um _boilerplate_, portanto você terá que definir a
estrutura de pastas e escrever seus próprios testes unitários (_tests_). Para
isso, você pode guiar-se por meio de projetos anteriores.
Este projeto não inclui um _boilerplate_ completo, apenas alguns arquivos de
configuração básica, então você terá que definir a estrutura de pastas e
escrever seus próprios testes de unidade (_tests_). Para isso, você pode ser guiado
por projetos anteriores e/ou organizar os arquivos seguindo uma estrutura de
[Model-View-Controller](https://developer.mozilla.org/es/docs/Glossary/MVC).

Neste projeto vamos utilizar uma ferramenta chamada
[Vite](https://vitejs.dev/) para empacotar nossos módulos e iniciar o servidor de desenvolvimento, que disponibiliza nossos arquivos usando a estratégia `Hot Module Replacement` (HMR) isso significa que quando você faz alterações em arquivos que estão sendo hosteados, o navegador será atualizado automaticamente sem a necessidade de fazê-lo manualmente para recarregar todo o site. Você deve ter um
cuidado especial para não ter nenhuma _dependência circular_ em seu código já que pode causar problemas com o HMR.
O `eslint-plugin-import` tem a regra import/no-cycle que notificará se os tiver.

### 5.2 Definição do produto

No `README.md`, conte-nos brevemente como você mapeou as necessidades dos seus usuários e como você chegou à definição final do seu produto. É importante que detalhe:

* Quem são os principais usuários do produto.
* Qual problema o produto resolve/para que ele serve para esses usuários.

### 5.3 Histórias de usuário

<!-- colocar cards com cada história -->

Depois de entender as necessidades de seus usuários, escreva as Histórias de Usuário. Elas representam tudo o que ele precisa fazer/ver na Rede Social.
Cada uma de suas histórias de usuário deve possuir:

* **Critérios de aceitação:** tudo o que deve acontecer para satisfazer as necessidades do usuário.

* **Definição de pronto:** todos os aspectos técnicos que devem ser atendidos para que, como equipe, saibam que essa história está finalizada e pronta para ser publicada. **Todas** suas histórias de usuário (com exceções), devem
  incluir esses aspectos em sua definição de pronto (além de tudo o que precisa adicionar):

  - Ser uma SPA.
  - Ser _responsivo_.
  - Receber _code review_ de pelo menos uma parceira de outra equipe.
  - Fazer _tests_ unitários.
  - Fazer testes manuais buscando erros e imperfeições simples.
  - Fazer testes de usabilidade e incorporar o _feedback_ dos usuários como melhorias.
  - Fazer deploy do aplicativo e marcar a versão (git tag).

### 5.4 Desenho da Interface de Usuário (protótipo de baixa fidelidade)

Você deve definir qual será o fluxo que o usuário seguirá dentro do seu aplicativo e, com isso, criar a interface do usuário (UI) que siga este fluxo.

### 5.5 Responsivo

Deve funcionar bem em dispositivos de tela grande (computadores, laptops etc.) e pequena (_tablets_, telefones celulares etc.). Sugerimos seguir a técnica [_`mobile first`_](#mobile-first) (mais detalhes sobre essa técnica ao final).

### 5.6 Considerações sobre o comportamento da Interface do Usuário (UI)

Essas considerações ajudarão você a escrever as definições de pronto de sua H.U.:

#### Criação e login de conta de usuário

* _Login_ com Firebase:
  - Para o _login_ e postagens na timeline, você pode usar o
    [Firebase](https://firebase.google.com/products/database/)
  - O usuário deve poder criar uma conta de acesso ou autenticar-se com conta de e-mail e senha e também com uma conta do Google.
* Validações:
  - Somente usuários com contas válidas têm acesso permitido.
  - Não haver usuários repetidos.
  - O que o usuário digita no campo de senha (_input_) deve ser secreto.
* Comportamento:
  - Quando o formulário de registro ou login é enviado, ele deve ser validado.
  - Se houver erros, mensagens descritivas devem ser exibidas para ajudar o usuário.

#### Timeline/linha do tempo

* Validações:
  - Ao publicar, deve ser validado se há conteúdo no _input_.
* Comportamento:
  - Ao recarregar o aplicativo, é necessário verificar se o usuário está _logado_ antes de exibir o conteúdo,
  - Conseguir publicar um _post_.
  - Poder dar e remover _likes_ em uma publicação. Máximo de um por usuário.
  - Visualizar contagem de _likes_.
  - Poder excluir uma postagem específica.
  - Solicitar confirmação antes de excluir um _post_.
  - Ao clicar em editar um _post_, você deve alterar o texto para um _input_ que
    permite editar o texto e salvar as alterações.
  - Ao salvar as alterações, você deve voltar ao texto normal, mas com a informação editada.
  - Ao recarregar a página, poder ver os textos editados.

### 5.7 Considerações técnicas sobre front-end

* Separar a manipulação do DOM da lógica (separação de responsabilidades).
* Ter várias telas. Para isso, seu aplicativo deve ser um [Single Page
  Application
  (SPA)](https://pt.wikipedia.org/wiki/Aplicativo_de_p%C3%A1gina_%C3%BAnica)
* Alterar e persistir dados. Os dados que você adiciona ou modifica devem
  persistir por todo o aplicativo. Recomendamos que você use o
  [Firebase](https://firebase.google.com/) para isso também.

#### Testes unitários

* Lembre-se de que não há _setup_ de **testes** definido, isso dependerá da
  estrutura do seu projeto. Você não deve esquecer de pensar sobre os testes.
  Eles podem ajudar a definir a estrutura e sua lógica.

* Os testes de unidade devem cobrir no mínimo 70% de _statements_, _functions_,
  _lines_ e _branches_.

### 5.8 Considerações técnicas UX

* Faça pelo menos 2 entrevistas com os usuários.
* Faça um protótipo de baixa e alta fidelidade.
* Verifique se a implementação do código segue as diretrizes do protótipo.
* Faça sessões de teste de usabilidade com o produto em HTML.

## 6. Hacker Edition

As seções chamadas _Hacker Edition_ são **opcionais**. Se **você terminou** e
cumpriu todos os requisitos acima e sobrou tempo, tente concluí-las. Dessa
forma, você pode aprofundar e/ou exercitar mais os objetivos de aprendizagem do
projeto.

* Criar posts com imagens.
* Procurar usuários, adicionar e excluir "amigos".
* Definir a privacidade de _posts_ (público ou apenas para amigos).
* Permitir ver na linha do tempo de usuários "não amigos" apenas os posts
  públicos.
* Permitir comentar ou responder a uma postagem.
* Editar perfil.

## 7. Entrega

O projeto será entregue subindo seu código no GitHub (`commit` /`push`) e a
interface será exibida usando páginas do GitHub ou outro serviço de hospedagem
(Firebase, Netlify, Vercel, etc) que você pode ter encontrado pelo caminho.
Verifica a [Documentação Vite](https://vitejs.dev/guide/static-deploy.html)
para orientá-lo sobre isso.

***

## 8. Guias, dicas e leituras complementares

### Mobile first

O conceito de [_mobile
first_](https://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/) faz
referência a um processo de desenho e desenvolvimento que parte de como se vê e
como funciona uma aplicação primeiro em um dispositivo móvel e mais adiante se
analisa como adaptar a aplicação à telas progressivamente maiores. Esta é uma
contraposição ao modelo tradicional, no qual primeiro se desenha os websites (ou
webapps) para desktops e depois os adaptam para telas menores.

A motivação aqui é se assegurar que desde o começo sejam desenhadas telas
_responsivas_. Dessa forma, começamos com a aparência e o comportamento do
aplicativo em uma tela e ambiente móvel.

### Múltiplas telas

Em projetos anteriores, nossas aplicações eram compostas de apenas uma tela
_principal_ (uma só _página_). Neste projeto, precisaremos dividir nossa
interface em várias _views_ ou _pages_ e oferecer uma maneira de navegar entre
essas telas. Esse problema pode ser resolvido de várias maneiras: com arquivos
HTML independentes (cada um com seu próprio URL) e links tradicionais; mantendo
na memória e renderizando condicionalmente (sem atualizar a página);
[manipulando o histórico do
navegador](https://developer.mozilla.org/pt-BR/docs/Web/API/History_API)
com
[`window.history`](https://developer.mozilla.org/es/docs/Web/API/Window/history).
Neste projeto, convidamos você a explorar opções e decidir sobre uma opção de
implementação.

### Gravação de dados

Nos projetos anteriores, consumimos dados, mas ainda não tínhamos escrito dados
(salvar alterações, criar dados, excluir, etc). Neste projeto, você precisará
criar (salvar) novos dados, além de ler, atualizar e modificar os dados
existentes. Esses dados podem ser salvos remotamente usando o
[Firebase](https://firebase.google.com/).

Para usar o Firebase, você deve criar um projeto no [console](https://console.firebase.google.com/) do Firebase e
instale a dependência `firebase` usando `npm`.
Leia [instruções passo a passo aqui](https://firebase.google.com/docs/web/setup).

Outras:

* [Evento hashchange ](https://developer.mozilla.org/es/docs/Web/API/Window/hashchange_event)
* [Mobile
  First](https://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/)
* [Mobile First Is NOT Mobile Only - Nielsen Norman
  Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)
* [Flexbox - CSS
  Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Módulos:
  Export](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/export)
* [Módulos:
  Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)
