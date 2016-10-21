function r(f) {/in/.test(document.readyState) ? setTimeout(r,9,f) : f();}

var tools = (function(tools) {

    tools.isMobile = function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
            return true;
        else
            return false;
    }

    tools.addListener = function (action, element, func){
        
        el = tools.get(element);

        if (typeof el.length != 'undefined') {

            for (var i = el.length - 1; i >= 0; i--) {
                el[i].addEventListener(action, func, false);
            }
        } else {
            el.addEventListener(action, func, false);
        }
        
    }

    tools.get = function(element) {
        var type = (element.indexOf("#") === -1) ? "class" : "id";

        switch (type) {
            case "class":
                var el = document.querySelectorAll(element);
                break;

            case "id":
                var el = document.querySelector(element);
                break;
        }

        return el.length == 1 ? el[0] : el;

        // return el;
    }

    tools.storageSupports = function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    return tools;
})({});

var ui = (function(ui) {

    ui.toggleActive = function(event) {

        var el = event.currentTarget;

        if (event.target.parentNode.classList.contains('accordion')) {
            event.target.parentNode.classList.toggle('active');
        }
        else {
            el.classList.toggle('active');
        }
        
    }

    return ui;
})({});

r(function(){

    tools.addListener('click', '.submenu', ui.toggleActive); 
    tools.addListener('click', '.accordion .title', ui.toggleActive); 
    
    // console.log(tools.storageSupports());
    document.documentElement.className = 
       document.documentElement.className.replace("no-js","js");

    if (tools.isMobile()) {
        document.documentElement.className = 
            document.documentElement.classList.add('mobile');
    }

});