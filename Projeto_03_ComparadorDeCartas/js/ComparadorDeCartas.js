/*
*   Author: Igor Silva Bento
*/


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


// Funcao que exibe todos os itens TODOs
function atualizar_tela(response){
    document.getElementById("titulo").innerHTML = "Baby Dragon";

    let carta_objeto = JSON.parse(response);
    console.log(carta_objeto);
    document.getElementById("texto").innerHTML = "ID: " + carta_objeto.data[0].id + " - Nome: " + carta_objeto.data[0].name + " ATK: " + carta_objeto.data[0].atk;


}

function atualizar_menu(){
    xhttpAssincrono(montar_select, 0, null);
}

let objeto_carta;
const quantidade_cartas = 20;

function montar_select(response){
    objeto_carta = JSON.parse(response);
    for(i=0; i<quantidade_cartas; i++){
        let nome = objeto_carta.data[i].name;
        let id = objeto_carta.data[i].id;
        console.log("Nome: "+nome+" ID: "+id);
        let nova_opcao = new Option(nome, id);
        let nova_opcao_2 = new Option(nome, id);
        document.getElementById("select_1").appendChild(nova_opcao);
        document.getElementById("select_2").appendChild(nova_opcao_2);
    }
} 

function exibir_carta_1(id_selecionado){
    //document.getElementById("imagem_carta_1").src = objeto_carta.data[id_selecionado-1].card_images[0].image_url;
    fechar_board_1();
    var imagem = document.createElement("img");
    imagem.setAttribute('src', objeto_carta.data[id_selecionado-1].card_images[0].image_url);
    imagem.width = 250;
    imagem.height = 350;
    document.getElementById("imagem_carta_1").appendChild(imagem);
    exibir_botao_desfavoritar(objeto_carta.data[id_selecionado-1].id, 1);
}

function exibir_carta_2(id_selecionado){
    //document.getElementById("imagem_carta_2").src = objeto_carta.data[id_selecionado-1].card_images[0].image_url;
    fechar_board_2();
    var imagem = document.createElement("img");
    imagem.setAttribute('src', objeto_carta.data[id_selecionado-1].card_images[0].image_url);
    imagem.width = 250;
    imagem.height = 350;
    document.getElementById("imagem_carta_2").appendChild(imagem);
    exibir_botao_desfavoritar(objeto_carta.data[id_selecionado-1].id, 2);
}


function exibir_botao_desfavoritar(id_selecionado, select){

    for(i=0; i<localStorage.length; i++){
        var id_carta = localStorage.getItem(localStorage.key(i));
        var objeto = JSON.parse(id_carta);
        if(objeto.id == id_selecionado){
            if(select == 1)
                document.getElementById("botao_1_desfavoritar").disabled = false;
            else if(select == 2)
                document.getElementById("botao_2_desfavoritar").disabled = false;
        }
    }
}

function deletar_favorito(id_selecionado, select){
    console.log("deletar: " + id_selecionado);
    for(i=0; i<quantidade_cartas; i++){
        if(objeto_carta.data[i].id == objeto_carta.data[id_selecionado-1].id){
            localStorage.removeItem(objeto_carta.data[i].id);
            if(select == 1)
                document.getElementById("botao_1_desfavoritar").disabled = true;
            else if(select == 2)
                document.getElementById("botao_2_desfavoritar").disabled = true;
        }
    }
}



function armazenar_favorito(id_selecionado, select){
    localStorage.setItem(objeto_carta.data[id_selecionado-1].id, JSON.stringify(objeto_carta.data[id_selecionado-1] ));
    if(select == 1)
        document.getElementById("botao_1_desfavoritar").disabled = false;
    else if(select == 2)
        document.getElementById("botao_2_desfavoritar").disabled = false;
}

function exibir_favoritos(){
    //Limpando a tela enquanto tiver cartas sendo exibidas no Favoritos
    fechar_favoritos();
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
function fechar_board_1(){
    let Node = document.getElementById("imagem_carta_1");
    while(Node.firstChild){
        Node.removeChild(Node.lastChild);
    } 
}
function fechar_board_2(){
    let Node = document.getElementById("imagem_carta_2");
    while(Node.firstChild){
        Node.removeChild(Node.lastChild);
    } 
}

function fechar_favoritos(){
    let Node = document.getElementById("favoritos");
    while(Node.firstChild){
        Node.removeChild(Node.lastChild);
    } 
}


function drawVisualization(id_selecionado_1, id_selecionado_2) {
    // Some raw data (not necessarily accurate)
    let carta_1 = null;
    let carta_2 = null;

    for(i=0; i<quantidade_cartas; i++){
       if(objeto_carta.data[i].id == objeto_carta.data[id_selecionado_1].id){
            carta_1 = objeto_carta.data[i-1];
        }
    }
    for(i=0; i<quantidade_cartas; i++){
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