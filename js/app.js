SC.initialize({
    client_id: "b17b79b20e5c687a994a0d517dabe98a",
    redirect_uri: "http://192.168.3.100:8080/callback.html"
});

$(function(){

    SC.connect().then(function(){
        return SC.get("/me");
    }).then(function(me){
        alert("Hello, " + me.username + "!");
    });
});