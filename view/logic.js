function main(show){
    if(show){
        $("#navcontent").show();
        $("#corpo").show();
        
        $("#detalhes").hide();
        $("#editar").hide();
        $("#criar").hide();
        $("#carregando").hide();
        $("#mensagem").hide();
        $("#conf_excluir").hide();
        return;
    }
    $("#navcontent").hide();
    $("#corpo").hide();
    return;
}
main(true);

$(".tab").click(function(i){
    $(".tab").removeClass("selected_tab");
    $(this).addClass("selected_tab");
});

$("#todo_tab").click(()=>{
    ToDo_index();
    $("#adicionar").show();
})

$("#done_tab").click(()=>{
    done_index();
    $("#adicionar").hide();
})

function ToDo_index(){
    $("#corpo").empty();
    $.getJSON("/todo/false", function(data){
        if(data[0]){
            for(i = 0; i < data.length; i++){
                $("#corpo").append(
                '<div class="task">'+
                    '<div class = "task_header">'+
                        '<div class="task_number" id="number'+i+'">'+
                            '<a href="#">'+data[i].order+'</a>'+
                        '</div>'+
                        '<div class="task_title">'+
                            '<h1>'+data[i].taskName+'</h1>'+
                        '</div>'+
                    '</div>'+
                    '<hr>'+
                    '<div class="details_button">'+
                        '<a href="#" onclick=seeMore('+data[i].id+')>Ver detalhes</a>'+
                    '</div>'+
                '</div>')
            }
        }else{
            $("#corpo").append(
                '<div class="task">'+
                    '<div class = "task_header">'+
                        '<div class="task_title">'+
                            '<h1 style="margin-left:20px">Não há tarefas a fazer</h1>'+
                        '</div>'+
                    '</div>'+
                    '<hr>'+
                    '<h3 style="display:inline-block;margin-left:20px; margin-right:20px; margin-bottom:20px">Clique em "adicionar" (no canto superior direito da tela) para criar uma tarefa</h3>'+
                    
                '</div>')
        }
    })
}

function done_index(){
    $("#corpo").empty();
    $.getJSON("/todo/true", function(data){

        if(data[0]){


            $("#corpo").append(
                '<div class = "task message">'+
                '<div class="options">'+
                    '<button id="excluir_tudo" class="op_button excluir">Excluir todas tarefas cumpridas</button>'+
                '</div>'+
                '</div>')


            for(i = 0; i < data.length; i++){
                $("#corpo").append(
                '<div class="task">'+
                    '<div class = "task_header">'+
                        '<div class="task_number" id="number'+i+'">'+
                            '<img src="/view/pronto.png" height="30px"/>'+
                        '</div>'+
                        '<div class="task_title">'+
                            '<h1>'+data[i].taskName+'</h1>'+
                        '</div>'+
                    '</div>'+
                    '<hr>'+
                    '<div class="details_button">'+
                        '<a href="#" onclick=seeMore('+data[i].id+')>Ver detalhes</a>'+
                    '</div>'+
                '</div>')
            }
        }else{
            $("#corpo").append(
                '<div class="task">'+
                    '<div class = "task_header">'+
                        '<div class="task_title">'+
                            '<h1 style="margin-left:20px">Não há tarefas cumpridas</h1>'+
                        '</div>'+
                    '</div>'+
                '</div>')
        }
    })
}

ToDo_index();