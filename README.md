[![UserGroup Pipeline](https://github.com/leonardomelgarejo/usergroup/actions/workflows/cucumber-playwright.yml/badge.svg)](https://github.com/leonardomelgarejo/usergroup/actions/workflows/cucumber-playwright.yml)

# Exemplo de projeto MVP para automação de testes WEB para o grupo de usuários Outsystems

## Descrição

Este projeto contempla um MVP de automação de testes WEB para o grupo de usuários Outsystems, com a composição de core Node.js + frameworks Cucumber-JS/Playwright + linguagem Typescript

# Pré-requisitos

* Instalar [Node.js 22.10.0](https://nodejs.org/pt/blog/release/v22.10.0)
* Instalar [Cucumber-JS 11.1.1](https://github.com/cucumber/cucumber-js)
* Instalar [Playwright 1.49](https://playwright.dev/docs/intro)
* Clone o repositório: ```git clone https://github.com/leonardomelgarejo/usergroup```
* [Ajustes para Execução Local](#ajustes-para-execucao-local)

## Como rodar os testes

### Execução local

A execução dos testes é orquestrada pelo Cucumber-JS, ou seja, via tags relacionadas a específicos cenários de testes, que possuem o padrão @ + objetivo (exemplo: @smoke-test). Para este projeto, rodar os comandos a seguir:

  * Rodar todos os testes (não é necessário informar uma tag): 
  ``npm test``

  * Rodar o grupo de cenários de testes desejado (Informe a tag desejada): 
  ``npm test --TAGS="@smoke-test"``

  * Rodar o grupo de cenários de testes desejado e ignorar o grupo não desejado (Informe as tags desejadas): 
  ``npm test --TAGS="@smoke-test and not @skip"``

  * Rodar os grupos de cenários de testes A ou B (Informe as tags desejadas): 
  ``npm test --TAGS="@smoke-test or @funcional-test"``

  * Rodar os grupos de cenários de testes A e B (Informe as tags desejadas): 
  ``npm test --TAGS="@smoke-test and @funcional-test"``

### Execução Remota por Tags (GitHub Actions)

Com a inclusão do `workflow_dispatch`, é agora possível rodar o workflow remotamente por tags, utilizando os parâmetros de entrada. Siga os passos abaixo:

1. Acesse a aba de **Actions** do repositório no GitHub.
2. Selecione o workflow **UserGroup Pipeline**.
3. Clique no botão **Run workflow**.
4. No campo de entrada `tags`, insira as tags desejadas para rodar os testes, por exemplo: `@smoke-test`. Caso nada seja preenchido, todos os cenários de testes serão executados.
5. Clique em **Run workflow** para iniciar a execução.
6. Após a conclusão deste workflow, o workflow de pages build and deployment é automaticamente acionado, resultando na geração do relatório de testes acessível em: [Cucumber Report HTML](https://leonardomelgarejo.github.io/usergroup/).

Este recurso permite que você execute os testes remotamente sem precisar modificar o código localmente, apenas configurando as tags através da interface do GitHub Actions.

### 📊 Relatório de Testes  

Os relatórios de testes são gerados pelo **Cucumber-JS** de duas formas:

#### 📍 Execução Local  
Ao rodar os testes (conforme tópico anterior), dois arquivos são criados na pasta `test-result`:  

- **`cucumber-report.json`** – Contém a estrutura base e os metadados do relatório.  
- **`cucumber-report.html`** – Relatório HTML detalhado com:  
  - Testes bem-sucedidos e falhos.  
  - Percentual de sucesso das execuções.  
  - Data e duração da última execução.  
  - Sistema operacional utilizado.  
  - Versões do **Node.js** e **Cucumber-JS**.  
  - Lista detalhada das **features** e **cenários** executados.  

Para visualizar o relatório HTML, basta abrir o arquivo `cucumber-report.html` no navegador. 🚀

#### 📍 Execução Remota   
A geração de relatórios para execuções remotas está em fase de manutenção e será integrada à pipeline CI/CD. O objetivo é disponibilizá-los via GitHub Actions.

O relatório gerado pode ser acessado em [Cucumber Report HTML](https://leonardomelgarejo.github.io/usergroup/).  

O JSON do relatório pode ser acessado diretamente em: [Cucumber Report JSON](https://leonardomelgarejo.github.io/usergroup/report.json).  

### 🛠 Como Gerar o Relatório HTML a partir do JSON  
Se você quiser gerar o relatório HTML localmente, siga estes passos usando o **Cucumber HTML Formatter**:  

1. **Instale a ferramenta (caso ainda não tenha)**:
   ```bash
   npm install --save-dev @cucumber/html-formatter
   ```

2. **Baixe o JSON do relatório**:
   ```bash
   wget -O report.json https://leonardomelgarejo.github.io/usergroup/report.json
   ```

3. **Gere o relatório HTML**:
   ```bash
   npx @cucumber/html-formatter report.json > cucumber-report.html
   ``` 

4. **Abra o relatório no navegador**:
   
   No macOS:
   ```bash
   open cucumber-report.html
   ```

   No Linux:
   ```bash
   xdg-open cucumber-report.html
   ```

   No Windows (CMD ou PowerShell):
   ```bash
   start cucumber-report.html
   ```

## Estrutura do projeto

```plaintext
├── .github
│   ├── workflows
│   │   └── cucumber-playwright.yml
│   config
|   ├── cucumber.js
|   helper
|   ├── browsers
|   ├── env
|   |   ├── .env.dev
|   |   ├── .env.test
|   |   report
|   |   ├── init.ts
|   |   types
|   |   ├── env.d.ts
|   |   util
|   |   ├── logger.ts
|   |   wrapper
|   |   ├── assert.ts
|   |   ├── playwrightWrappers.ts
|   |   globalConfig.ts 
|   hooks
|   ├── hooks.ts
|   ├── pageFixture.ts
|   pages
|   ├── LoginPage.ts
|   test
|   ├── features
|   |   ├── telaDeLogin.feature
|   ├── steps
|   |   └── telaDeLogin.ts
|   .gitignore
|   .package-lock.json
|   README.md
└── tsconfig.json
```

## Sobre a estrutura do projeto

### .github/workflows/playwright.yml

Arquivo de configuração para execução da pipeline do Github Actions.

### config/cucumber.js

Arquivo de configuração do Cucumber-JS.

### helper/env

Centraliza as váriaveis utilizadas no ambiente e o recurso para acessa-lás para execução dos testes.

### helper/report

Recursos de apoio para a geração do relatório de testes

### helper/types

Recurso com função de declarar tipos globais para as variáveis de ambiente (process.env) no contexto do Node.js.

### helper/util

Recursos de apoio geral para a execução dos testes.

### helper/wrapper

Recurso para otimizar os recursos do Playwright

### hooks

Recursos para gestão centralizada de pré-condições e pós-condições na execução dos testes.

### pages

Recursos para gestão centralizada e mapeamento de elementos estáticos e dinâmicos nas páginas html utilizadas no ciclo de vida do software durante a execução dos testes.

### test

Contém as features e seus steps, ou seja, o arquivo no padrão gherkin organizados em cenários de testes(scenarios) que por sua vez são implementados tecnicamente por um arquivo Typescript que usa as dependências do Playwright para execução dos testes.

### package-lock.json

O arquivo package-lock.json tem um papel fundamental no gerenciamento de dependências em projetos Node.js. Ele é gerado automaticamente pelo npm (Node Package Manager) sempre que você instala, atualiza ou remove pacotes

### package.json

O package.json é o arquivo de configuração principal de um projeto Node.js.

### tsconfig.json

O arquivo tsconfig.json é usado para configurar o compilador TypeScript (tsc).

## Padrões de projetos aplicados:

* Data Provider
* Page Objects

## Pipeline

Atualmente, a pipeline CI inclui os seguintes steps:
- **test**: Execução dos testes automatizados.
- **deploy-report**: Deploy do relatório de testes para o GitHub Pages.

### 📦 Dependências Principais  

| Pacote | Versão | Função |
|--------|--------|--------|
| `@cucumber/cucumber` | 11.1.1 | Framework BDD para automação de testes |
| `@playwright/test` | 1.49.1 | Automação de testes Web e API |
| `dotenv` | 16.4.7 | Gerenciamento de variáveis de ambiente |
| `ts-node` | 10.9.2 | Permite rodar TypeScript sem necessidade de compilar para JavaScript |


## Ajustes para Execucao Local

Ajustes para o Arquivo .env.test:
Certifique-se de criar o arquivo .env.dev no diretório helper/env com as seguintes variáveis de ambiente:

```bash
   mkdir -p helper/env
   echo "USER_NAME=User example" > helper/env/.env.test
   echo "PASSWORD=Password example" > helper/env/.env.test
   echo "BASEURL=http://example.com" > helper/env/.env.test
   echo "ENV=test" >> helper/env/.env.test
```