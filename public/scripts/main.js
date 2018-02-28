function loadLatest(){
    var request;
    if (window.XMLHttpRequest){
        request = new XMLHttpRequest();
    } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
            document.getElementById("latest").innerHTML=request.responseText;
        }
    }
    var url = window.location.href;
    request.open("GET", "/posts/latest", true);
    request.send();
}

function loadFavs() {
    var request;
    if (window.XMLHttpRequest){
        request = new XMLHttpRequest();
    } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
            document.getElementById("fav").innerHTML=request.responseText;
        }
    }
    var url = window.location.href;
    request.open("GET", url + "/fav", true);
    request.send();
}

function addFavs() {
    var request;
    var num = document.getElementById("fav").innerHTML.replace(/[^0-9]/ig,"");
    if (window.XMLHttpRequest){
        request = new XMLHttpRequest();
    } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){  
            document.getElementById("fav").innerHTML = request.responseText;
        }
    }
    var url = window.location.href;
    request.open("POST", url + "/fav", true);
    request.send();
}


window.onload = function(){
    if(document.getElementById("latest")){loadLatest()};
    if(document.getElementById("fav")){loadFavs()};
}
