<div align="center">
  <h1>👶 Baby On Screen — Protótipo Electron</h1>
  <p><strong>A primeira experiência de mascote virtual que acompanha a área de trabalho e precisa de cuidados.</strong></p>
  <p><img alt="Electron" src="https://img.shields.io/badge/Electron-9.x-47848F?logo=electron&logoColor=white"> <img alt="Status" src="https://img.shields.io/badge/status-vers%C3%A3o%20hist%C3%B3rica-64748b"></p>
  <p><a href="https://github.com/HelioConde/babyOnScreen"><strong>Projeto atual</strong></a> · <a href="https://github.com/HelioConde/babyOnScreen/releases/latest"><strong>Baixar versão recente</strong></a></p>
</div>

## Sobre esta versão

Este repositório representa o **Baby On Screen 0.0.1**, construído com Electron, JavaScript e jQuery. A ideia já era criar uma presença virtual na tela do usuário, com animações, interações e uma janela de desktop.

É um **protótipo legado**, não a edição estável mais recente. Para jogar, instalar e conhecer as funcionalidades atuais, prefira [**Baby On Screen**](https://github.com/HelioConde/babyOnScreen).

## Arquivos principais

| Caminho | Conteúdo |
| --- | --- |
| `main.js` | Processo principal Electron |
| `index.html` | Interface |
| `demo.js` / `demo.css` | Experiências de tela |
| `electron-transparency-mouse-fix*.js` | Recurso histórico de transparência e interação |
| `sprits/` | Sprites |
| `som/` | Áudio |
| `package.json` | Dependências e comandos originais |

## Executar para estudo

Requer Node.js/npm compatíveis com a versão histórica do Electron:

```bash
git clone https://github.com/HelioConde/baby_On_Screen_Electron.git
cd baby_On_Screen_Electron
npm install
npm start
```

O comando `npm start` invoca `electron .`. O `package.json` inclui `npm run build` para Windows, mas **a construção e a compatibilidade atual não foram verificadas nesta revisão**.

**O script `npm test` é apenas um placeholder que encerra com erro; não há suíte de testes implementada nele.**

## Por que preservar o histórico?

Esta versão registra as primeiras escolhas de interface, animação e comportamento da janela. Ela ajuda a acompanhar a evolução do produto, mas **não deve ser instalada como alternativa à versão moderna**, principalmente sem auditar suas dependências antigas.

**[Acessar a versão atual](https://github.com/HelioConde/babyOnScreen)**

Desenvolvido por [Hélio Conde](https://github.com/HelioConde).
