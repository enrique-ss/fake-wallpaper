# Fake Wallpaper

Transforma vídeos em wallpapers animados falsos para computadores que não permitem personalizar a tela de fundo. A ideia é simples: navegador em tela cheia parece wallpaper animado.

Acesse em: [enrique-ss.github.io/fake-wallpaper](https://enrique-ss.github.io/fake-wallpaper)

## Como usar

Abra o `index.html` no navegador, escolha um dos 17 vídeos da grade e ele entra em loop em tela cheia. No Windows tem um arquivo `.bat` que abre tudo automaticamente já em tela cheia, basta ajustar o caminho do projeto dentro dele.

## O que tem dentro

17 vídeos prontos com paisagens, espaço e abstratos. Miniatura automática gerada a partir de um frame de cada vídeo. Suporte a WebM e MP4. Opção de adicionar vídeos do computador direto pela interface. Atalhos ESC ou M para voltar ao menu e F11 para alternar tela cheia.

## Como adicionar seus vídeos

Para uso temporário, clique em adicionar vídeo na grade e escolha o arquivo. Para uso permanente, coloque o vídeo na pasta do projeto e adicione o nome dele no array `videoFiles` dentro do `script.js`.

## Limitações

Precisa deixar o navegador aberto. Consome mais bateria que um wallpaper nativo. Vídeos ficam sem áudio para não fazer barulho. Minimizar o navegador desfaz a ilusão.

## Stack

HTML, CSS e JavaScript puro. HTML5 Video API para o player, Canvas API para gerar as miniaturas e Fetch API para detectar qual formato de vídeo está disponível.

---

Desenvolvido por Luiz Enrique.
