(function() {
    var jump = getCookie("jump");
    if(jump == "" || jump == 0){
        setCookie("jump", 1);
        location.href = "jump.html";
    }
    else if(jump == 1){
        setCookie("jump", 2);
    }
})();


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

function setCookie(cname, cvalue, seconds) {
    if(!seconds){
        seconds = 30 * 24 * 60 * 60;
    }
    var d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};