/**
 * Created by jiangsizhi on 2016/9/13.
 */
$(function(){
    if(location.href.indexOf("list.html") != -1){
        initPageList();
    }
    else if(location.href.indexOf("item.html") != -1){
        initPageItem();
    }

});

function initPageList(){
    $.get("assets/data.txt", function(data){
        data = JSON.parse(data);
        new Vue({
            el: ".good-list",
            data:{
                list: data.slice(0, 20)
            },
            methods: {
                jump: function(item, index){
                    location.href = "item.html?corder=" + item.corder + "&cprice=" + item.cprice + "&curl=" + item.curl + "&index=" + index;
                }
            }
        })
    });

    $(".mask").click(function(){
        $(".mask").hide();
    });
    $(".icon").click(function(){
        $(".mask").show();
    });
    var qrcode = new QRCode($(".code")[0], {width: 200, height: 200});
    qrcode.makeCode(location.href);
}

function initPageItem(){
    var corder = getURLParameter("corder");
    var cprice = getURLParameter("cprice");
    var curl = getURLParameter("curl");
    var index = getURLParameter("index");
    new Vue({
        el: ".good",
        data: {
            corder: corder,
            cprice: cprice,
            curl: curl,
            index: index
        }
    });
    var qrcode = new QRCode($(".code")[0], {width: 300, height: 300});
    qrcode.makeCode(curl);

    $(".pay-btn").click(function(){
        var dia = $.dialog({
            title: "提示",
            content: "请确认是否完成支付！",
            button: ["完成", "去支付"]
        });
        dia.on("dialog:action", function (e) {
            if (e.index == 0) {
                alert("完成");
            }
            else if(e.index == 1){
                alert("去支付");
            }
        });
    });
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}