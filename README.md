# Site - William Franco Carneiro

Site estático (HTML/CSS/JS, sem framework) com informações de ensino, pesquisa e
materiais didáticos. Publicado via GitHub Pages.

## Estrutura

```text
professor-site/
├── index.html              página inicial
├── sobre.html              formação e áreas de atuação
├── disciplinas.html        índice das disciplinas
├── aquicultura.html        Aquicultura (graduação)
├── aquicultura-pos.html    Aquicultura (pós-graduação)
├── bioinformatica.html     Bioinformática e ômicas (pós-graduação)
├── precisao.html           Zootecnia de precisão e IA (graduação)
├── recursos.html           Material didático
├── dados.html              apoio: R e bioestatística
├── metodos.html            apoio: análise reprodutível
├── pesquisa.html           linhas e projetos
├── extensao.html           extensão
├── assets/                 CSS, JS e imagens usadas pelo site
├── materiais/              arquivos para download (ver materiais/LEIA-ME.md)
└── _arquivo/               mídias guardadas, fora do Git (ver _arquivo/LEIA-ME.md)
```

## Como adicionar materiais para download

Ver [materiais/LEIA-ME.md](materiais/LEIA-ME.md) - inclui o HTML pronto para copiar.

Resumo: coloque o arquivo na subpasta da disciplina, troque o cartão de `<article>`
para `<a href="..." download>` e adicione a classe `material-card--download`.

## Visualização local

```powershell
python -m http.server 5500
```

Abra `http://localhost:5500` no navegador.

## Cache dos assets

`styles.css` e `main.js` são referenciados com `?v=N` em todas as páginas. **Ao editar
qualquer um dos dois, incremente o número em todos os HTML** - sem isso o navegador
dos visitantes continua servindo a versão antiga.

## Convenções

- Nomes de arquivo sem acento e sem espaço (espaço vira `%20` na URL).
- Nomes científicos em itálico (`<em>`).
- Notas, entregas e dados pessoais de alunos **não** devem ser publicados aqui.
  Use o ambiente institucional para esses dados.
- Todo o conteúdo do repositório é público.
