function setupPageJump(){
    const VID = "JUMP_PAGE";
    const TYPE_TOP = "▲";
    const TYPE_BOTTOM = "▼";

    if(!document.querySelector(VID)){
        addDiv(TYPE_TOP);
        addDiv(TYPE_BOTTOM);
    }

    function addDiv(type){
        var div = document.createElement("div");
        div.className = VID;
        document.body.appendChild(div);
        div.style.display = "block";
        div.style.color = "#ffffff";
        div.style.textAlign = "center";
        div.style.lineHeight = "40px";
        div.style.width = "40px";
        div.style.height = "40px";
        div.style.position = "fixed";
        div.style.bottom = type == TYPE_BOTTOM ? "20px" : "70px";
        div.style.right = "20px";
        div.style.zIndex = "3000";
        div.style.background = "rgba(0, 0, 0, 0.4)";
        div.style.borderRadius = "8px";
        div.style.cursor = "pointer";
        div.innerHTML = type;

        div.onclick = function(){
            if(type == TYPE_BOTTOM){
                document.documentElement.scrollTop = document.documentElement.scrollHeight;
            }
            else{
                document.documentElement.scrollTop = 0;
            }
            
        }
    }

}