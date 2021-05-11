$("#editar_tarefa").click(function(){
    $("#title_edit").val(nome);
    $("#details_edit").val(texto);
    $("#detalhes").hide();
    $("#editar").show();
});

$("#cancelar").click(()=>{
    $("#title_edit").val("");
    $("#details_edit").val("");
    main(true);
})

function update(){
    $("#editar").hide();
    $("#carregando").show();

    var xhr = new XMLHttpRequest();
    xhr.open("put", '/', true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        $("#title_edit").val(" ");
        $("#details_edit").val(" ");
        $("#msg_text").empty();
        if(xhr.status == 200){           
            $("#msg_text").append(xhr.response.message);
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
        "taskName":$("#title_edit").val(),
        "details":$("#details_edit").val()
    }));
}