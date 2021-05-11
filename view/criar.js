$("#adicionar").click(()=>{
    main(false);
    $("#criar").show();
});

$("#criar_cancela").click(()=>{
    $("#title_create").val("");
    $("#details_create").val("");
    main(true);
})

function create(){
    $("#criar").hide();
    $("#carregando").show();

    var xhr = new XMLHttpRequest();
        xhr.open("post", '/', true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            $("#title_create").val("");
            $("#details_create").val("");
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
			"taskName": $("#title_create").val(),
			"details": $("#details_create").val(),
        }));

}