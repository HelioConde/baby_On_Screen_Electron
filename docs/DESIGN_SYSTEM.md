# Design System — Baby On Screen (Demonstração web, 2026)

## Arquitetura sem regressão do Electron
O `main.js` continua sendo o processo principal Electron, mas carrega `desktop-legacy.html`: cópia literal do `index.html` original, preservada antes da edição. O index da raiz agora é uma demonstração estática segura para navegador. Backup integral: `archive/electron-original-20261027`. A interface desktop histórica contém APIs Electron e exige a versão antiga de Node/Electron; ela **não** é executada no GitHub Pages.

## Taste Skill
Tokens definidos em `demo-web.css`: `--bg`, `--surface`, `--violet`, `--mint`, `--focus`, raios de 12/20/30px e espaçamento de 4 a 64px. A nova UI preserva os tons roxos e os sprites originais, com apresentação limpa e confortável.

## Web Design Guidelines
- HTML semântico, navegação por âncoras e skip link.
- Quatro ações de cuidado como botões reais, foco visível, labels e indicadores nativos `progress`.
- Anúncio de estado através de `role=status` e `aria-live`.
- Opção de som por checkbox, inicialmente desligado; os áudios só iniciam por interação.
- `prefers-reduced-motion` reduz transições. Responsivo para 320, 390, 768, 1366, 1600px.
- Reset confirmado antes de alterar os dados.

## Image to Code + Awesome Design
As referências são `sprits/char1.png`, `demo.css` e `index.html` da versão Electron de 0.0.1. A arte existente foi reutilizada e exibida em escala com `image-rendering:pixelated` para preservar a linguagem retro. Não existe inferência por IA, rastreamento de máquina, ou assets externos; a experiência foi reconstruída como uma demo própria, não uma cópia exata do overlay desktop.

## Estado e privacidade
Os indicadores fictícios do mascote são salvos no `localStorage` com a chave `baby-on-screen-browser-demo-v1`. Sem usuários, banco, backend, autenticação, contas, pedidos de dados pessoais ou sincronização. Dados podem ser apagados no navegador.

## CI e Pages
`.github/workflows/browser-qa.yml`: checks de sintaxe, verificação de arquivos e Playwright/Chromium com testes de botões, progresso, reset, persistência, console, recursos e screenshot em 5 resoluções.
A fonte de publicação existente, `gh-pages/(root)`, continua válida; o site fica na raiz sem depender de React, build, Node em runtime, API ou banco de dados.
