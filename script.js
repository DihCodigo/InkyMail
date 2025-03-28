let celulaSelecionada = null;

// Selecionar célula ao clicar
function selecionarCelula(event) {
  event.stopPropagation();

  // Remover a seleção de todas as células
  document.querySelectorAll("#tabelaEmail td").forEach(td => td.classList.remove("selecionado"));

  // Selecionar a célula clicada
  celulaSelecionada = event.target;
  celulaSelecionada.classList.add("selecionado");

  // Preencher os controles com os valores da célula selecionada
  preencheCamposComEstilos(celulaSelecionada);
}

function inserirTabelaAninhada() {
  if (!celulaSelecionada) {
    alert("Selecione uma célula para adicionar a nova tabela!");
    return;
  }

  const novaTabela = document.createElement("table");
  novaTabela.border = "1";
  novaTabela.style.width = "100%";

  const novaLinha = document.createElement("tr");
  const novaCelula = document.createElement("td");
  novaCelula.innerHTML = "Nova célula";

  novaLinha.appendChild(novaCelula);
  novaTabela.appendChild(novaLinha);

  celulaSelecionada.appendChild(novaTabela);
}


function preencheCamposComEstilos(celula) {
  // Cor do texto
  document.getElementById("textColor").value = rgbToHex(celula.style.color) || "#000000";
  // Cor de fundo
  document.getElementById("bgColor").value = rgbToHex(celula.style.backgroundColor) || "#ffffff";
  // Alinhamento
  document.getElementById("alignSelect").value = celula.style.textAlign || "left";
  // Largura
  document.getElementById("width").value = celula.style.width || "";
  // Altura
  document.getElementById("height").value = celula.style.height || "";
  // Colspan
  document.getElementById("colspanInput").value = celula.colSpan || "";
}

function aplicarColspan() {
  if (!celulaSelecionada) {
    alert("Selecione uma célula para aplicar o colspan!");
    return;
  }

  const colspan = parseInt(document.getElementById("colspanInput").value);

  if (isNaN(colspan) || colspan < 1) {
    alert("Digite um valor válido para o colspan.");
    return;
  }

  celulaSelecionada.colSpan = colspan;
}

// Converter rgb para hex (caso necessário)
function rgbToHex(rgb) {
  if (!rgb) return "#000000";
  const result = rgb.match(/^rgb\((\d+), (\d+), (\d+)\)$/);
  return result ? `#${((1 << 24) + (parseInt(result[1]) << 16) + (parseInt(result[2]) << 8) + parseInt(result[3])).toString(16).slice(1)}` : rgb;
}

// Atualiza os eventos de clique
function atualizarEventosDeClique() {
  document.querySelectorAll("#tabelaEmail td").forEach((celula) => {
    celula.onclick = selecionarCelula;
    celula.contentEditable = "true";
  });
}

// Carregar eventos ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  atualizarEventosDeClique();
  document.addEventListener("click", desmarcarCelulaSeFora);
});

// Desmarcar célula se o clique for fora da célula selecionada
function desmarcarCelulaSeFora(event) {
  if (celulaSelecionada && !celulaSelecionada.contains(event.target)) {
    desmarcarCelula();
  }
}

// Desmarcar célula selecionada
function desmarcarCelula() {
  if (celulaSelecionada) {
    celulaSelecionada.classList.remove("selecionado");
    celulaSelecionada = null;
  }
}

// Adicionar linha
function adicionarLinha() {
  const tabela = document.getElementById("tabelaEmail");
  const novaLinha = tabela.insertRow();
  const colunas = tabela.rows[0].cells.length;

  for (let i = 0; i < colunas; i++) {
    const novaCelula = novaLinha.insertCell();
    novaCelula.textContent = `Nova Célula ${i + 1}`;
    novaCelula.contentEditable = "true";
  }

  atualizarEventosDeClique();
}

// Adicionar coluna
function adicionarColuna() {
  const tabela = document.getElementById("tabelaEmail");

  for (let i = 0; i < tabela.rows.length; i++) {
    const novaCelula = tabela.rows[i].insertCell();
    novaCelula.textContent = `Nova Célula`;
    novaCelula.contentEditable = "true";
  }

  atualizarEventosDeClique();
}

// Remover célula selecionada
function removerCelula() {
  if (celulaSelecionada) {
    const linha = celulaSelecionada.parentNode;
    linha.removeChild(celulaSelecionada);

    if (linha.cells.length === 0) {
      linha.parentNode.removeChild(linha);
    }

    celulaSelecionada = null;
    atualizarEventosDeClique();
  } else {
    alert("Selecione uma célula para remover!");
  }
}

// Aplicar estilização selecionada
function aplicarEstilizacao() {
  if (!celulaSelecionada) {
    alert("Selecione uma célula para aplicar a estilização!");
    return;
  }

  const estiloSelecionado = document.getElementById("estiloSelect").value;
  const valorEstilo = document.getElementById("valorEstilo").value;

  switch (estiloSelecionado) {
    case "fontWeight":
      celulaSelecionada.style.fontWeight = (valorEstilo.toLowerCase() === "negrito" || valorEstilo.toLowerCase() === "bold") ? "bold" : "normal";
      break;
    case "textAlign":
      celulaSelecionada.style.textAlign = valorEstilo;
      break;
    case "color":
      celulaSelecionada.style.color = valorEstilo;
      break;
    case "backgroundColor":
      celulaSelecionada.style.backgroundColor = valorEstilo;
      break;
    case "width":
      celulaSelecionada.style.width = valorEstilo;
      break;
    case "height":
      celulaSelecionada.style.height = valorEstilo;
      break;
    case "lineHeight":
      celulaSelecionada.style.lineHeight = valorEstilo;
      break;
    case "letterSpacing":
      celulaSelecionada.style.letterSpacing = valorEstilo;
      break;
    case "padding":
      celulaSelecionada.style.padding = valorEstilo;
      break;
    case "margin":
      celulaSelecionada.style.margin = valorEstilo;
      break;
    case "borderRadius":
      celulaSelecionada.style.borderRadius = valorEstilo;
      break;
    case "borderTopLeftRadius":
      celulaSelecionada.style.borderTopLeftRadius = valorEstilo;
      break;
    case "borderTopRightRadius":
      celulaSelecionada.style.borderTopRightRadius = valorEstilo;
      break;
    case "borderBottomLeftRadius":
      celulaSelecionada.style.borderBottomLeftRadius = valorEstilo;
      break;
    case "borderBottomRightRadius":
      celulaSelecionada.style.borderBottomRightRadius = valorEstilo;
      break;

    default:
      alert("Estilo não suportado.");
  }
}

// Função para aplicar bgcolor, align, width e height na célula selecionada
function aplicarEstilosCoresAlign() {
  if (!celulaSelecionada) {
    alert("Selecione uma célula para aplicar as estilizações!");
    return;
  }

  const bgColor = document.getElementById("bgColor").value;
  const align = document.getElementById("alignSelect").value;
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;

  // Aplicar estilos
  celulaSelecionada.style.backgroundColor = bgColor;
  celulaSelecionada.style.textAlign = align;
  celulaSelecionada.style.width = `${width}px`;
  celulaSelecionada.style.height = `${height}px`;
}

// Inserir tag HTML na célula
function inserirTag() {
  if (!celulaSelecionada) {
    alert("Selecione uma célula para inserir a tag!");
    return;
  }

  const tagSelecionada = document.getElementById("tagSelect").value;
  let elementoHTML = "";

  switch (tagSelecionada) {
    case "p":
      elementoHTML = "<p style='margin:0;'>Texto do Parágrafo</p>";
      break;
    case "span":
      elementoHTML = "<span>Texto do Span</span>";
      break;
    case "br":
      elementoHTML = "<br>";
      break;
    case "img":
      elementoHTML = "<img src='https://via.placeholder.com/150' alt='Imagem'>";
      break;
  }

  celulaSelecionada.innerHTML = celulaSelecionada.innerHTML + elementoHTML;
}

// Gerar o HTML final da tabela
function gerarHTML() {
  const tabela = document.getElementById("tabelaEmail");
  const codigoHTML = tabela.outerHTML;
  document.getElementById("codigoHTML").value = codigoHTML;
}

// Gerar HTML final
function gerarHTML() {
  const tabela = document.getElementById("tabelaEmail").outerHTML;
  const versaoSelecionada = document.getElementById("versaoSelect").value;

  let htmlGerado = "";

  // Versão Desktop
  if (versaoSelecionada === "desktop" || versaoSelecionada === "ambos") {
    htmlGerado += `
      <table width="600" style="max-width:600px; width:100%; display:block;">
        <tr align="center"><td align="center">
          ${tabela.replace('<table', '<table style="width:100%; max-width:600px; display:block;"')}
        </td></tr>
      </table>
    `;
  }

  // Versão Mobile
  if (versaoSelecionada === "mobile" || versaoSelecionada === "ambos") {
    htmlGerado += `
      <table width="360" style="max-width:360px; width:100%; display:none;">
        <tr align="center"><td align="center">
          ${tabela.replace('<table', '<table style="width:100%; max-width:360px; display:none;"')}
        </td></tr>
      </table>
    `;
  }

  // Estilos de media query
  htmlGerado += `
    <style>
      @media (max-width: 600px) {
        table[width="600"] { display: none !important; }
        table[width="360"] { display: block !important; }
      }
    </style>
  `;

  document.getElementById("codigoHTML").value = htmlGerado;
}
