# Baby On Screen — legado Electron e demonstração web

O **Baby On Screen 0.0.1** é um protótipo histórico de mascote virtual. A interface de navegador foi adaptada para GitHub Pages e funciona sem instalar o Electron.

## Demonstração web
- Alimente, troque, deixe dormir e brinque com o personagem.
- Visualize quatro indicadores com atualização em tempo real.
- Progresso guardado somente no navegador via `localStorage`, com reinício confirmado.
- Áudio opcional e foco no teclado; responsivo e sem banco de dados.
- Navegue em `https://helioconde.github.io/baby_On_Screen_Electron/` após a publicação do GitHub Pages.

## Preservação do Electron
O `index.html` original foi copiado para `desktop-legacy.html` e o `main.js` foi ajustado para abrir o arquivo legado. O restante do código jQuery e Electron continua no repositório e na branch `archive/electron-original-20261027`.

Para rodar o Electron original em estudo:
```bash
npm install
npm start
```
Compatibilidade da versão antiga Electron 9 com máquinas atuais **não homologada**. Para o aplicativo mais novo, procure [babyOnScreen](https://github.com/HelioConde/babyOnScreen).

## QA
O GitHub Actions valida scripts e Playwright em múltiplas resoluções com screenshots. Não reproduz overlay transparente, atualização automática ou integração com desktop na versão web.

Documentação em [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).
