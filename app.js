var app = {}

app.urlBase = "https://ondarru.larrabeiti.com";

app.debug = true;

app.log = (...arguments)=>{if(app.debug)console.log(arguments[0]);};

app.get = (...arguments) => {
    let gurl = app.urlBase + arguments[0];
    let gdata = {};
    let gsuccess = false;
    switch(arguments.length){
        case 2 : {
            app.log("2 PARAMETRO");
            gsuccess = arguments[1];
        }break;
        case 3 : {
            app.log("3 PARAMETRO");
            gdata = arguments[1];
            gsuccess = arguments[2];
        }break;
        default:{
            app.log("Parametro kopurua ez da zuzena");
        }
    }
    $.ajax(gurl,{
        data:gdata,
        success:function(data){
            if(gsuccess && data.code == "ok"){
                gsuccess(data.response)
            }
        }
    });
}

app.init = ()=>{
    $('#app-title').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
        $.when($('#app-title').fadeOut()).done(function() {
            $('#app-search').fadeIn();
        });        
    });
    
    $('#app-title').addClass('io-title-animation');

    $('#az-button').on('click',function(event){
        $('#az-area').slideToggle();
        $('#az-area b').removeClass("selected");
    });
    
    $('#az-area b').on('click',function(){
        $(this).addClass("selected").siblings().removeClass("selected");
    });

    $('#app-search').on('search',function(){
        $(this).blur();
        app.get('/search/'+$(this).val(), response => {

        })
    });

    $('#menu-button').on('click',function(){
        $('#menu').show();
        $('#menu-area').animate({
            left:["0px","swing"]
        },350);
    });
    
    $('#menu').on('click',function(){
        $('#menu-area').animate({
            left:["-280px","swing"]
        },350,function(){
            $('#menu').hide();
        });
        
    });
    
    $('#menu-area').on('click',function(event){
        event.stopPropagation();
    });

    app.get('/get/random/4',response =>{
        html = ``;
        for(let item of response){
            html += /*html*/`
                <div class="io-berba-card">
                    <div class="io-berba-name">${item.name}</div>
                    <div class="io-berba-definizio">${item.definizio.replace(/<([a-z][a-z0-9]*)[^>]*?(\/?)>/g,'<$1$2>').trim()}</div>
                </div>
            `;
        }
        $('main').html(html);
    });
};


(()=>{
    app.init();
})();