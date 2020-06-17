var ajax_base = "https://ondarru.larrabeiti.com";

var app = {}

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

    });

    $('#menu-button').on('click',function(){
        $('#menu').show();
        $('#menu-area').animate({
            left:["0px","swing"]
        },350);
    });
    
    $('#menu').on('click',function(){
        $('#menu-area').animate({
            left:["-70%","swing"]
        },350,function(){
            $('#menu').hide();
        });
        
    });
    
    $('#menu-area').on('click',function(event){
        event.stopPropagation();
    });

};


(()=>{
    app.init();
})();