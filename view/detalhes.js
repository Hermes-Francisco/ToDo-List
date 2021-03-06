var id=null;
var nome=null;
var texto = null;

function seeMore(taskId){

    id = taskId;

    main(false);
    $("#detalhes").show();
    $.getJSON("/show/"+taskId, function(data){
        $("#detalhes_titulo").empty();
        $("#detalhes_titulo").append(data.taskName);
        nome = data.taskName;
        $("#detalhes_texto").empty();
        $("#detalhes_texto").append(data.details);
        texto = data.details;

        if(data.completed){
            $("#concluir").hide();
            $("#desconcluir").show();
        }else{
            $("#concluir").show();
            $("#desconcluir").hide();
        }
    });
}

$("#fechar_detalhes").click(()=>{
    main(true);
});

$("#concluir").click(function(){

    $("#detalhes").hide();
    $("#carregando").show();

    var xhr = new XMLHttpRequest();
    xhr.open("put", '/', true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        $("#msg_text").empty();
        if(xhr.status == 200){           
            $("#msg_text").append('Tarefa marcada como "cumprida"');
            $("#carregando").hide();
            $("#mensagem").show();
        }else{
            $("#msg_text").append("Erro: "+xhr.response.erro);
            $("#carregando").hide();
            $("#mensagem").show();
        }
    };
    
    xhr.send(JSON.stringify({
        "id":id,
        "completed":true
    }));
});

$("#desconcluir").click(function(){

    $("#detalhes").hide();
    $("#carregando").show();

    var xhr = new XMLHttpRequest();
    xhr.open("put", '/', true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        $("#msg_text").empty();
            if(xhr.status == 200){           
                $("#msg_text").append('Tarefa colocada no fim da lista "A fazer"');
                $("#carregando").hide();
                $("#mensagem").show();
            }else{
                $("#msg_text").append("Erro: "+xhr.response.erro);
                $("#carregando").hide();
                $("#mensagem").show();
            }
		};
    
    xhr.send(JSON.stringify({
        "id":id,
        "completed":false
    }));
});