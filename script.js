let celulaSelecionada = null;

// Selecionar célula ao clicar
function selecionarCelula(event) {
  event.stopPropagation();

  // Remover a edição de todas as células antes de ativar a nova
  document.querySelectorAll("#tabelaEmail td").forEach(td => {
    td.removeAttribute("contenteditable");
  });

  celulaSelecionada = event.target;
  celulaSelecionada.classList.add("selecionado");
  celulaSelecionada.setAttribute("contenteditable", "true");

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
    celula.removeAttribute("contenteditable"); // Remove contenteditable globalmente
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
    novaCelula.textContent = ``;
  }

  atualizarEventosDeClique();
}

function adicionarColuna() {
  const tabela = document.getElementById("tabelaEmail");

  for (let i = 0; i < tabela.rows.length; i++) {
    const novaCelula = tabela.rows[i].insertCell();
    novaCelula.textContent = ``;
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
  
  // Remover a edição antes de capturar o HTML
  tabela.querySelectorAll("td").forEach(td => {
    td.removeAttribute("contenteditable");
  });

  const codigoHTML = tabela.outerHTML;
  document.getElementById("codigoHTML").value = codigoHTML;

  // Restaurar a edição para uso normal
  atualizarEventosDeClique();
}


// Gerar HTML final
function gerarHTML() {
  const tabela = document.getElementById("tabelaEmail").outerHTML;
  const versaoSelecionada = document.getElementById("versaoSelect").value;


  
  let htmlGerado = "";

  // Versão Desktop
  if (versaoSelecionada === "desktop" || versaoSelecionada === "ambos") {
    htmlGerado += `
      <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>document</title>


    <style>
        @media screen and (max-width: 480px) {
            .mobile-hide {
                display: none;
            }

            .mobile-show {
                display: inline-table !important;
            }

            .emkt-table {
                max-width: 280px !important;
                width: 100% !important;
                overflow-wrap: break-word;
            }

            .responsive td {
                width: 100% !important;
                display: block !important;
                padding: 0 !important;
            }
        }
    </style>
</head>

<body>
    <div style="font-size:0; line-height:0;"><img
            src="http://click.online.terra.com.br/open.aspx?ffcb10-fe901c787160077975-fdf6157576630d7977167576-fe981370756407787d-ff64117477-fe3516727563047f751c75-ffce15&d=60181&bmt=0"
            width="1" height="1" alt=""></div>
    <table align="center" style="max-width: 600px;" width="100%">
        <tr>
            <td style="FONT-FAMILY: Arial; WHITE-SPACE: normal; FONT-SIZE: 11px" valign="middle" align="center">
                <font color="#444444">Caso
                    n&atilde;o esteja visualizando corretamente esta mensagem,
                    <a style="COLOR: #0000ff; TEXT-DECORATION: underline" title="esse link"
                        href="%%view_email_url%%">acesse aqui</a>.
                </font>
            </td>
        </tr>
    </table>

    <table border="0" align="center" cellspacing="" cellpadding="" width="100%" style="margin: auto;max-width: 600px;">
        <tr align="center">
            <td align="center">
                <!--Container-->
                <table width="600" style="max-width:600px; width:100%; display:block;">
        <tr align="center"><td align="center">
          ${tabela.replace('<table', '<table style="width:100%; max-width:600px; display:block;"')}
        </td></tr>
      </table>
            </td>
        </tr>
    </table>

        <!--Footer-->
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">
                    <tr align="center">
                        <td align="center">

                            <p
                                style="font-family: 'Nunito', sans-serif;font-weight: 400;font-size: 16px;line-height: 25.6px;color: #444141;text-align: left;">
                                Um grande abraço,<br><span style="font-weight: 700;">Equipe
                                    Terra</span>
                            </p>

                        </td>
                    </tr>
                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">

                    <tr align="center">
                        <td align="center">
                            <hr>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 160px;">

                    <tr align="center">
                        <td align="center">

                            <a href="https://www.terraempresas.com.br/" target="_blank"><img
                                    src="https://image.online.terra.com.br/lib/fe981370756407787d/m/1/73aea5f1-c030-4661-9b4e-b7968ded4395.png"
                                    alt=""></a>

                        </td>
                        <td align="center">

                            <a href="https://www.facebook.com/TerraBrasil/" target="_blank"><img
                                    src="https://image.online.terra.com.br/lib/fe981370756407787d/m/1/b2e289e1-5f95-43de-a109-b9a969fe81ea.png"
                                    alt=""></a>

                        </td>
                        <td align="center">

                            <a href="https://www.instagram.com/terrabrasil/" target="_blank"><img
                                    src="https://image.online.terra.com.br/lib/fe981370756407787d/m/1/e3a2181b-47b6-45ff-9d7d-a9d239c2582f.png"
                                    alt=""></a>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">

                    <tr align="center">
                        <td align="center">
                            <hr>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="responsive" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">
                    <tr align="center">
                        <td style="margin: 8px auto; text-align: center;">

                            <a href="https://central.terra.com.br/boleto-simplificado" target="_blank"
                                style="font-family: 'Nunito', sans-serif;font-size: 13px;line-height: 17.73px;font-weight: 400;color: #444141;text-align: center;text-decoration: none;">

                                2º via boleto

                            </a>
                        </td>
                        <td style="margin: 0 auto; text-align: center; ">
                            <a href="https://central.terra.com.br" target="_blank"
                                style="font-family: 'Nunito', sans-serif;font-size: 13px;line-height: 17.73px;font-weight: 400;color: #444141;text-align: center;text-decoration: none;">

                                Central do Assinante

                            </a>

                        </td>
                        <td style="margin: 8px auto; text-align: center; ">
                            <a href="https://central.terra.com.br/atendimento?utm_source=terra&utm_medium=email&utm_campaign=email&utm_content=fale%20com%20o%20terra&utm_term=central%20do%20assinante&cdConvenio=CVTR00001804"
                                target="_blank"
                                style="font-family: 'Nunito', sans-serif;font-size: 13px;line-height: 17.73px;font-weight: 400;color: #444141;text-align: center;text-decoration: none;">

                                Fale com o Terra

                            </a>

                        </td>
                        <td style="margin: 0 auto; text-align: center;">
                            <a href="https://servicos.terra.com.br/?utm_source=email&utm_medium=cp&utm_campaign=onl_relacionamento_email_email_cp_emailrel_emailrel&cdConvenio=CVTR00001804"
                                target="_blank"
                                style="font-family: 'Nunito', sans-serif;font-size: 13px;line-height: 17.73px;font-weight: 400;color: #444141;text-align: center;text-decoration: none;">

                                Produtos Terra

                            </a>

                        </td>
                    </tr>
                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">
                    <tr align="center">

                        <td
                            style="font-size: 9px;color: #1B1B1D;font-family: Arial;text-align: center;line-height: 16px;">
                            <p style="margin: 24px auto 0px auto;">© COPYRIGHT %%xtyear%%, TERRA
                                NETWORKS BRASIL LTDA.<br>
                                Avenida Engenheiro Luís Carlos Berrini, 1.376 - 13º andar -
                                Cidade Monções - São Paulo - SP<br>
                                CNPJ 91.088.328/0001-67 |
                                <a href="http://click.online.terra.com.br/?qs=0746474c903276fc2ac4d0bde358574349c41dd4d2629ce627403420a67e6bc9b9d540e4cc0af2eca3d4f90e525019598c201631c7ea9be9"
                                    target="_blank" style="color: #6d6d6d;text-decoration:none;">www.terra.com.br</a>
                                <br /><br />
                            </p>
                        </td>

                    </tr>
                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">

                    <tr align="center">
                        <td align="center">
                            <hr>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">
                    <tr align="center">

                        <td
                            style="font-size: 9px;color: #444141;font-family: Arial;text-align: center;line-height: 16px;">
                            <p style="margin: 24px auto;">
                                Caso seja do seu interesse interromper o recebimento de e-mails
                                com este conteúdo, <a style="color: #1D5B71" href="%%unsub_center_url%%"
                                    target="_blank">acesse aqui</a>
                                e remova seu endereço das nossas listas de envios.</p>
                        </td>

                    </tr>
                </table>

            </td>
        </tr>

        <img src="http://click.online.terra.com.br/open.aspx?ffcb10-fe901c787160077975-fdf6157576630d7977167576-fe981370756407787d-ff64117477-fe3516727563047f751c75-ffce15&d=60181&bmt=0"
            width="1" height="1" alt="">

        <custom name="opencounter" type="tracking" />
        <div style="display:none; white-space:nowrap; font:15px courier; color:#ffffff; line-height:0;">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp;</div>

    </table>

</body>

</html>
    `;
  }

  // Versão Mobile
  if (versaoSelecionada === "mobile" || versaoSelecionada === "ambos") {
    htmlGerado += `

    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>document</title>


    <style>
    @media screen and (max-width: 480px) {
            .mobile-hide {
                display: none;
            }

            .mobile-show {
                display: inline-table !important;
            }

            .emkt-table {
                max-width: 280px !important;
                width: 100% !important;
                overflow-wrap: break-word;
            }

            .responsive td {
                width: 100% !important;
                display: block !important;
                padding: 0 !important;
            }
        }
      @media (max-width: 600px) {
        table[width="600"] { display: none !important; }
        table[width="360"] { display: block !important; }
      }
    </style>
</head>

<body>
    <div style="font-size:0; line-height:0;"><img
            src="http://click.online.terra.com.br/open.aspx?ffcb10-fe901c787160077975-fdf6157576630d7977167576-fe981370756407787d-ff64117477-fe3516727563047f751c75-ffce15&d=60181&bmt=0"
            width="1" height="1" alt=""></div>
    <table align="center" style="max-width: 600px;" width="100%">
        <tr>
            <td style="FONT-FAMILY: Arial; WHITE-SPACE: normal; FONT-SIZE: 11px" valign="middle" align="center">
                <font color="#444444">Caso
                    n&atilde;o esteja visualizando corretamente esta mensagem,
                    <a style="COLOR: #0000ff; TEXT-DECORATION: underline" title="esse link"
                        href="%%view_email_url%%">acesse aqui</a>.
                </font>
            </td>
        </tr>
    </table>

    <table border="0" align="center" cellspacing="" cellpadding="" width="100%" style="margin: auto;max-width: 600px;">
        <tr align="center">
            <td align="center">
                <!--Container-->
                

      <table width="360" style="max-width:360px; width:100%; display:none;">
        <tr align="center"><td align="center">
          ${tabela.replace('<table', '<table style="width:100%; max-width:360px; display:none;"')}
        </td></tr>
      </table>
            </td>
        </tr>
    </table>

        <!--Footer-->
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">
                    <tr align="center">
                        <td align="center">

                            <p
                                style="font-family: 'Nunito', sans-serif;font-weight: 400;font-size: 16px;line-height: 25.6px;color: #444141;text-align: left;">
                                Um grande abraço,<br><span style="font-weight: 700;">Equipe
                                    Terra</span>
                            </p>

                        </td>
                    </tr>
                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">

                    <tr align="center">
                        <td align="center">
                            <hr>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 160px;">

                    <tr align="center">
                        <td align="center">

                            <a href="https://www.terraempresas.com.br/" target="_blank"><img
                                    src="https://image.online.terra.com.br/lib/fe981370756407787d/m/1/73aea5f1-c030-4661-9b4e-b7968ded4395.png"
                                    alt=""></a>

                        </td>
                        <td align="center">

                            <a href="https://www.facebook.com/TerraBrasil/" target="_blank"><img
                                    src="https://image.online.terra.com.br/lib/fe981370756407787d/m/1/b2e289e1-5f95-43de-a109-b9a969fe81ea.png"
                                    alt=""></a>

                        </td>
                        <td align="center">

                            <a href="https://www.instagram.com/terrabrasil/" target="_blank"><img
                                    src="https://image.online.terra.com.br/lib/fe981370756407787d/m/1/e3a2181b-47b6-45ff-9d7d-a9d239c2582f.png"
                                    alt=""></a>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">

                    <tr align="center">
                        <td align="center">
                            <hr>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="responsive" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">
                    <tr align="center">
                        <td style="margin: 8px auto; text-align: center;">

                            <a href="https://central.terra.com.br/boleto-simplificado" target="_blank"
                                style="font-family: 'Nunito', sans-serif;font-size: 13px;line-height: 17.73px;font-weight: 400;color: #444141;text-align: center;text-decoration: none;">

                                2º via boleto

                            </a>
                        </td>
                        <td style="margin: 0 auto; text-align: center; ">
                            <a href="https://central.terra.com.br" target="_blank"
                                style="font-family: 'Nunito', sans-serif;font-size: 13px;line-height: 17.73px;font-weight: 400;color: #444141;text-align: center;text-decoration: none;">

                                Central do Assinante

                            </a>

                        </td>
                        <td style="margin: 8px auto; text-align: center; ">
                            <a href="https://central.terra.com.br/atendimento?utm_source=terra&utm_medium=email&utm_campaign=email&utm_content=fale%20com%20o%20terra&utm_term=central%20do%20assinante&cdConvenio=CVTR00001804"
                                target="_blank"
                                style="font-family: 'Nunito', sans-serif;font-size: 13px;line-height: 17.73px;font-weight: 400;color: #444141;text-align: center;text-decoration: none;">

                                Fale com o Terra

                            </a>

                        </td>
                        <td style="margin: 0 auto; text-align: center;">
                            <a href="https://servicos.terra.com.br/?utm_source=email&utm_medium=cp&utm_campaign=onl_relacionamento_email_email_cp_emailrel_emailrel&cdConvenio=CVTR00001804"
                                target="_blank"
                                style="font-family: 'Nunito', sans-serif;font-size: 13px;line-height: 17.73px;font-weight: 400;color: #444141;text-align: center;text-decoration: none;">

                                Produtos Terra

                            </a>

                        </td>
                    </tr>
                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">
                    <tr align="center">

                        <td
                            style="font-size: 9px;color: #1B1B1D;font-family: Arial;text-align: center;line-height: 16px;">
                            <p style="margin: 24px auto 0px auto;">© COPYRIGHT %%xtyear%%, TERRA
                                NETWORKS BRASIL LTDA.<br>
                                Avenida Engenheiro Luís Carlos Berrini, 1.376 - 13º andar -
                                Cidade Monções - São Paulo - SP<br>
                                CNPJ 91.088.328/0001-67 |
                                <a href="http://click.online.terra.com.br/?qs=0746474c903276fc2ac4d0bde358574349c41dd4d2629ce627403420a67e6bc9b9d540e4cc0af2eca3d4f90e525019598c201631c7ea9be9"
                                    target="_blank" style="color: #6d6d6d;text-decoration:none;">www.terra.com.br</a>
                                <br /><br />
                            </p>
                        </td>

                    </tr>
                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">

                    <tr align="center">
                        <td align="center">
                            <hr>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
        <tr align="center">
            <td align="center">

                <!--Agradecimento-->
                <table class="emkt-table" border="0" align="center" cellspacing="" cellpadding="" width="100%"
                    style="margin: auto;max-width: 520px;">
                    <tr align="center">

                        <td
                            style="font-size: 9px;color: #444141;font-family: Arial;text-align: center;line-height: 16px;">
                            <p style="margin: 24px auto;">
                                Caso seja do seu interesse interromper o recebimento de e-mails
                                com este conteúdo, <a style="color: #1D5B71" href="%%unsub_center_url%%"
                                    target="_blank">acesse aqui</a>
                                e remova seu endereço das nossas listas de envios.</p>
                        </td>

                    </tr>
                </table>

            </td>
        </tr>

        <img src="http://click.online.terra.com.br/open.aspx?ffcb10-fe901c787160077975-fdf6157576630d7977167576-fe981370756407787d-ff64117477-fe3516727563047f751c75-ffce15&d=60181&bmt=0"
            width="1" height="1" alt="">

        <custom name="opencounter" type="tracking" />
        <div style="display:none; white-space:nowrap; font:15px courier; color:#ffffff; line-height:0;">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp;</div>

    </table>

</body>

</html>
    `;
  }

  // Estilos de media query
  htmlGerado += `
    <style>
    @media screen and (max-width: 480px) {
            .mobile-hide {
                display: none;
            }

            .mobile-show {
                display: inline-table !important;
            }

            .emkt-table {
                max-width: 280px !important;
                width: 100% !important;
                overflow-wrap: break-word;
            }

            .responsive td {
                width: 100% !important;
                display: block !important;
                padding: 0 !important;
            }
        }
      @media (max-width: 600px) {
        table[width="600"] { display: none !important; }
        table[width="360"] { display: block !important; }
      }
    </style>
  `;

  document.getElementById("codigoHTML").value = htmlGerado;
}
