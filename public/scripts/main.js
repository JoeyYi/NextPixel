function loadLikes(){
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        document.getElementById("like").innerHTML=xmlhttp.responseText;
    }
    }
    var url = window.location.href;
    xmlhttp.open("GET", url + "/like", true);
    xmlhttp.send();
    
}

function like(){
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        document.getElementById("like").innerHTML=xmlhttp.responseText;
    }
    }
    var url = window.location.href;
    xmlhttp.open("POST", url + "/like", true);
    xmlhttp.send();
}

window.onload = loadLikes;