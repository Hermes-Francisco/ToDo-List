var count=0;
var orderId=0;

function toOrder(id){
    orderId = id;

    $.getJSON("/count", function(data){
        count = data;
    })

    $(".numberform").hide();
    $(".number").show();
    $("#number"+id).hide();
    $("#form"+id).show();
    $("#"+id).attr("max", count)
}

function ordenar(){
    var xhr = new XMLHttpRequest();
    xhr.open("put", '/order', true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        ToDo_index();
    };
    
    xhr.send(JSON.stringify({
        "id": orderId,
        "newOrder":$("#"+orderId).val()
    }));
}