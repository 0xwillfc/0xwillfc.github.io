# Materiais para download

Coloque aqui os arquivos que ficarão disponíveis no site (PDF, XLSX, CSV, ZIP, notebooks).

## Onde colocar

| Pasta | Disciplina / seção |
|---|---|
| `aquicultura/` | Aquicultura (graduação) |
| `aquicultura-pos/` | Aquicultura (pós-graduação) |
| `bioinformatica/` | Bioinformática e ômicas |
| `precisao/` | Zootecnia de precisão e IA |
| `apoio/` | Material transversal (R, bioestatística, análise reprodutível) |

## Como nomear

Use letras minúsculas, sem acento e sem espaço - espaço em nome de arquivo vira `%20` na URL e
atrapalha o compartilhamento do link.

```
qualidade-agua-parte1.pdf        BOM
Qualidade da Água (parte 1).pdf  RUIM
```

Inclua a data ou versão quando for atualizar com frequência: `qualidade-agua-2026-03.pdf`.

## Como publicar no site

Depois de colocar o arquivo na pasta, edite a página da disciplina e troque o cartão
correspondente de `<article>` para `<a>`, apontando para o arquivo:

```html
<!-- ANTES: cartão sem material -->
<article class="material-card">
  <div class="material-card__tab">Material de apoio</div>
  <h3>Limnologia, reprodução e larvicultura</h3>
  <p>Qualidade da água, fundamentos de limnologia, reprodução de peixes e manejo na fase larval.</p>
  <div class="material-card__footer"><span>Slides + roteiros</span><span class="status">Disponível em breve</span></div>
</article>

<!-- DEPOIS: cartão com download -->
<a class="material-card material-card--download" href="materiais/aquicultura/qualidade-agua.pdf" download>
  <div class="material-card__tab">Material de apoio</div>
  <h3>Limnologia, reprodução e larvicultura</h3>
  <p>Qualidade da água, fundamentos de limnologia, reprodução de peixes e manejo na fase larval.</p>
  <div class="material-card__footer"><span>PDF · 2,4 MB</span><span class="status">Baixar</span></div>
</a>
```

Três mudanças: a tag vira `<a>` com `href` e `download`, a classe ganha
`material-card--download` (mostra o ícone de download), e o rodapé passa a informar
o formato/tamanho real e o texto "Baixar".

## Limites do GitHub Pages

- Até 100 MB por arquivo; repositório todo idealmente abaixo de 1 GB.
- Arquivos binários ficam no histórico do Git para sempre - cada nova versão de um PDF
  soma ao tamanho do repositório. Para material atualizado com frequência, considere
  Git LFS ou hospedar em Zenodo/Drive e apenas linkar.
- Todo o conteúdo é público. Não publique material com restrição de direitos autorais.
