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

var slider = (function(slider) {

    slider.settings = {
        id          : null,
        container   : null,
        slider      : null,
        item        : null,
        image       : null,
        count       : 1,
        speed       : 3000,
        animate     : true,
        active      : 0
    }

    slider.toggle = function(event) {

        var direction = (event === undefined) ? "right" : event.target.dataset.direction;
        var width     = tools.get( slider.settings.container + ' ' + slider.settings.item )[0].offsetWidth;

        if (direction == "left") {
            slider.settings.active = (slider.settings.active == 0) ? slider.settings.count : slider.settings.active - 1;
        } else {
            slider.settings.active = (slider.settings.active == slider.settings.count) ? 0 : slider.settings.active + 1;
        }

        slider.rotate('-' + slider.settings.active * width + 'px, 0px');
    }

    slider.resize = function() {

        var slider_c    = tools.get( slider.settings.slider );
        var item        = tools.get( slider.settings.container + ' ' + slider.settings.item );
            width       = item[0].offsetWidth;

        for (var i = 0; i < item.length; i++) {
            item[i].style.width = width + 'px';
        }

        slider_c.style.width = (slider.settings.count + 1)  *  width + 'px';
    }

    slider.start = function() {

        slider.settings.id = setInterval(function(){

            slider.toggle();

        }, slider.settings.speed);
    }

    slider.stop = function() {
        clearTimeout(slider.settings.id );
    }

    slider.rotate = function(coordinates) {
        var container = tools.get(slider.settings.slider);
        container.style.transform = "translate(" + coordinates + ")";
    }

    slider.setAnimate = function(classname = "animate") {
        if ( slider.settings.animate === true ) {
            tools.get(slider.settings.container).classList.add(classname);
        }
    }

    slider.init = function(container, slider_container, slider_item, image) {

        if (slider.settings.container === null) {
            slider.settings.container = container;
        }

        if (slider.settings.slider === null) {
            slider.settings.slider = slider_container;
        }

        if (slider.settings.item === null) {
            slider.settings.item = slider_item;
        }

        if (slider.settings.image === null) {
            slider.settings.image = image;
        }

        slider.settings.count = tools.get(slider_item).length - 1;

        slider.resize();
        slider.setAnimate();
        slider.start();

        tools.addListener('mouseover', slider.settings.container, slider.stop); 
        tools.addListener('mouseout',  slider.settings.container, slider.start);
    }

    return slider;

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
    tools.addListener('click', '.slider-toggle', slider.toggle); 
    
    // console.log(tools.storageSupports());
    document.documentElement.className = 
       document.documentElement.className.replace("no-js","js");

    if (tools.isMobile()) {
        document.documentElement.className = 
            document.documentElement.classList.add('mobile');
    }

    slider.init('.slider-container', '.slider', '.slider-item', '.slider-bg');

});