/*
*   Author: Igor Silva Bento
*/

var objeto_carta;
// >>>>>>>>> PODE REMOVER const quantidade_cartas = 50;

function xhttpAssincrono(callBackFunction, type, value) {
    var xhttp = new XMLHttpRequest();;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Chama a função em callback e passa a resposta da requisição
            callBackFunction(this.responseText);
        }
    };
    // Path para a requisição AJAX.
    var url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=01/01/2000&enddate=08/23/2002&dateregion=tcg_date";//"https://db.ygoprodeck.com/api/v7/cardinfo.php?";
    switch (type) {
        case 1:
            url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + value;
            break;
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}


function atualizar_menu(){
    xhttpAssincrono(montar_select, 0, null);
}


function montar_select(response){
    objeto_carta = JSON.parse(response);
    for(i=0; i<objeto_carta.data.length; i++){
        let nome = objeto_carta.data[i].name;
        let id = objeto_carta.data[i].id;
        //console.log("Nome: "+nome+" ID: "+id);
        let nova_opcao = new Option(nome, id);
        let nova_opcao_2 = new Option(nome, id);
        document.getElementById("select_1").appendChild(nova_opcao);
        document.getElementById("select_2").appendChild(nova_opcao_2);
    }
} 

function exibir_carta(id_selecionado, numero){
    var imagem = document.createElement("img");
    imagem.setAttribute('src', objeto_carta.data[id_selecionado-1].card_images[0].image_url);
    imagem.width = 250;
    imagem.height = 350;

    let texto;

    let nome = document.createElement("div");
    let label_nome = document.createElement("strong");
    let label_conteudo_nome = document.createTextNode("Nome: ");
    label_nome.appendChild(label_conteudo_nome);
    nome.appendChild(label_nome);
    texto = document.createTextNode(objeto_carta.data[id_selecionado-1].name);
    nome.appendChild(texto);

    let tipo = document.createElement("div");
    let label_tipo = document.createElement("strong");
    let label_conteudo_tipo = document.createTextNode("Tipo: ");
    label_tipo.appendChild(label_conteudo_tipo);
    tipo.appendChild(label_tipo);
    texto = document.createTextNode(objeto_carta.data[id_selecionado-1].type);
    tipo.appendChild(texto);

    let nivel = document.createElement("div");
    let label_nivel = document.createElement("strong");
    let label_conteudo_nivel = document.createTextNode("Nível: ");
    label_nivel.appendChild(label_conteudo_nivel);
    nivel.appendChild(label_nivel);
    texto = document.createTextNode(objeto_carta.data[id_selecionado-1].level);
    nivel.appendChild(texto);
   
    let atributo = document.createElement("div");
    let label_atributo = document.createElement("strong");
    let label_conteudo_atributo = document.createTextNode("Atributo: ");
    label_atributo.appendChild(label_conteudo_atributo);
    atributo.appendChild(label_atributo);
    texto = document.createTextNode(objeto_carta.data[id_selecionado-1].attribute);
    atributo.appendChild(texto);

    let ataque = document.createElement("div");
    let label_ataque = document.createElement("strong");
    let label_conteudo_ataque = document.createTextNode("Ataque: ");
    label_ataque.appendChild(label_conteudo_ataque);
    ataque.appendChild(label_ataque);
    texto = document.createTextNode(objeto_carta.data[id_selecionado-1].atk);
    ataque.appendChild(texto);

    let defesa = document.createElement("div");
    let label_defesa = document.createElement("strong");
    let label_conteudo_defesa = document.createTextNode("Defesa: ");
    label_defesa.appendChild(label_conteudo_defesa);
    defesa.appendChild(label_defesa);
    texto = document.createTextNode(objeto_carta.data[id_selecionado-1].def);
    defesa.appendChild(texto);
    
    if(numero == 1){
        fechar_board(1);
        fechar_descricao(1);
        document.getElementById("imagem_carta_1").appendChild(imagem);
        exibir_botao_favoritar(objeto_carta.data[id_selecionado-1].id, 1);
        exibir_botao_desfavoritar(objeto_carta.data[id_selecionado-1].id, 1);
        //document.getElementById("descricao_1").appendChild(descricao);
        document.getElementById("descricao_1").appendChild(nome);
        document.getElementById("descricao_1").appendChild(tipo);
        document.getElementById("descricao_1").appendChild(nivel);
        document.getElementById("descricao_1").appendChild(atributo);
        document.getElementById("descricao_1").appendChild(ataque);
        document.getElementById("descricao_1").appendChild(defesa);

    }else if(numero == 2){
        fechar_board(2);
        fechar_descricao(2);
        document.getElementById("imagem_carta_2").appendChild(imagem);
        exibir_botao_favoritar(objeto_carta.data[id_selecionado-1].id, 2);
        exibir_botao_desfavoritar(objeto_carta.data[id_selecionado-1].id, 2);
        document.getElementById("descricao_2").appendChild(nome);
        document.getElementById("descricao_2").appendChild(tipo);
        document.getElementById("descricao_2").appendChild(nivel);
        document.getElementById("descricao_2").appendChild(atributo);
        document.getElementById("descricao_2").appendChild(ataque);
        document.getElementById("descricao_2").appendChild(defesa);
    }
    
}

function exibir_botao_favoritar(id_selecionado, select){
    for(i=0; i<localStorage.length; i++){
        let id_carta = localStorage.getItem(localStorage.key(i));
        let objeto = JSON.parse(id_carta);
        if(objeto.id == id_selecionado){
            if(select == 1){
                document.getElementById("botao_1_favorito").disabled = true;
                break;
            }
            else if(select == 2){
                document.getElementById("botao_2_favorito").disabled = true;
                break;
            }
                
        }else{
            if(select == 1){
                document.getElementById("botao_1_favorito").disabled = false;
                break;
            }
            else if(select == 2){
                document.getElementById("botao_2_favorito").disabled = false;
                break;
            }
                
        }
    }
}

function exibir_botao_desfavoritar(id_selecionado, select){
    for(i=0; i<localStorage.length; i++){
        let id_carta = localStorage.getItem(localStorage.key(i));
        let objeto = JSON.parse(id_carta);
        if(objeto.id == id_selecionado){
            if(select == 1){
                document.getElementById("botao_1_desfavoritar").disabled = false;
                break;
            }
            else if(select == 2){
                document.getElementById("botao_2_desfavoritar").disabled = false;
                break;
            }
        }else{
            if(select == 1){
                document.getElementById("botao_1_desfavoritar").disabled = true;
                break;
            }
            else if(select == 2){
                document.getElementById("botao_2_desfavoritar").disabled = true;
                break;
            }
                
        }
    }
}

function deletar_favorito(id_selecionado, select){
    for(i=0; i<objeto_carta.data.length; i++){
        if(objeto_carta.data[i].id == objeto_carta.data[id_selecionado-1].id){
            localStorage.removeItem(objeto_carta.data[i].id);
            if(select == 1){
                document.getElementById("botao_1_desfavoritar").disabled = true;
                document.getElementById("botao_1_favorito").disabled = false;
            }
                
            else if(select == 2){
                document.getElementById("botao_2_desfavoritar").disabled = true;
                document.getElementById("botao_2_favorito").disabled = false;
            }
        }
    }
}



function armazenar_favorito(id_selecionado, select){
    localStorage.setItem(objeto_carta.data[id_selecionado-1].id, JSON.stringify(objeto_carta.data[id_selecionado-1] ));
    if(select == 1){
        document.getElementById("botao_1_desfavoritar").disabled = false;
        document.getElementById("botao_1_favorito").disabled = true;
    }
        
    else if(select == 2){
        document.getElementById("botao_2_desfavoritar").disabled = false;
        document.getElementById("botao_2_favorito").disabled = true;
    }
        
}

function exibir_favoritos(){
    fechar_favoritos();
    document.getElementById("fechar_favoritos").disabled = false;
    for(i=0; i<localStorage.length; i++){
        var id_carta = localStorage.getItem(localStorage.key(i));
        var objeto = JSON.parse(id_carta);
        try{
            var imagem = document.createElement("img");
            imagem.setAttribute('src', objeto.card_images[0].image_url);
            imagem.width = 250;
            imagem.height = 350;
            document.getElementById("favoritos").appendChild(imagem);
        }catch(e){
            console.log(e);
        }
    }
}

function fechar_favoritos(){
    let Node = document.getElementById("favoritos");
    while(Node.firstChild){
        Node.removeChild(Node.lastChild);
    }
    document.getElementById("fechar_favoritos").disabled = true;
}

function fechar_board(numero){
    let Node;
    if(numero == 1){
        Node = document.getElementById("imagem_carta_1");
    }else if(numero == 2){
        Node = document.getElementById("imagem_carta_2");
    }
    while(Node.firstChild){
        Node.removeChild(Node.lastChild);
    } 
}

function fechar_descricao(numero){
    let Node;
    if(numero == 1){
        Node = document.getElementById("descricao_1");
    }else if(numero == 2){
        Node = document.getElementById("descricao_2");
    }
    while(Node.firstChild){
        Node.removeChild(Node.lastChild);
    } 
}




function drawVisualization(id_selecionado_1, id_selecionado_2) {
    // Some raw data (not necessarily accurate)
    let carta_1 = null;
    let carta_2 = null;

    for(i=0; i<objeto_carta.data.length; i++){
       if(objeto_carta.data[i].id == objeto_carta.data[id_selecionado_1].id){
            carta_1 = objeto_carta.data[i-1];
        }
    }
    for(i=0; i<objeto_carta.data.length; i++){
        if(objeto_carta.data[i].id == objeto_carta.data[id_selecionado_2].id){
            carta_2 = objeto_carta.data[i-1];
        }
    }
    var data = google.visualization.arrayToDataTable([
        ['Níveis de ATK e DEF', 'ATK', 'DEF'],
        [carta_1.name,  carta_1.atk,      carta_1.def],
        [carta_2.name,  carta_2.atk,      carta_2.def]
      ]);

      var options = {
        title : 'Comparação das Cartas por Nível de Poder',
        vAxis: {title: 'Pontuação'},
        hAxis: {title: 'Nomes das Cartas'},
        seriesType: 'bars',
        series: {2: {type: 'line'}}
      };

      var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
      chart.draw(data, options);
  }