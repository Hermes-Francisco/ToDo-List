$("#excluir_tarefa").click(function(){
    $("#excluir_msg").empty();
    $("#excluir_msg").append('Deseja mesmo excluir a tarefa "'+nome+'"?');
    $("#detalhes").hide();
    $("#conf_excluir").show();
})

$("#sim").click(function(){
    $("#conf_excluir").hide();
    $("#carregando").show();

    var xhr = new XMLHttpRequest();
    xhr.open("delete", '/', true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        $("#msg_text").empty();
        $("#msg_text").append(xhr.response.message);
        $("#carregando").hide();
        $("#mensagem").show();
    };

    xhr.onerror = () =>{
        $("#msg_text").empty();
        $("#msg_text").append("Erro: "+xhr.response.erro);
        $("#carregando").hide();
        $("#mensagem").show();
    }
    
    xhr.send(JSON.stringify({
        "id":id,
    }));
})

$("#nao").click(()=>{
    main(true);
})