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

var counter = (function(counter) {

    counter.date = {
        y : null,
        mo : null,
        d : null,
        h : null,
        mi : null,
        s : null
    }

    counter.init = function(c_year, c_month, c_day, c_hour, c_minute, c_second) {

        minute = 1000 * 60;
        hour = minute * 60;
        day = hour * 24;
    
        counter.date.y  = c_year;
        counter.date.mo = c_month - 1;
        counter.date.d  = c_day;
        counter.date.h  = c_hour;
        counter.date.mi = c_minute;
        counter.date.s  = c_second;

        html_day = tools.get('.counter-day');
        html_hour = tools.get('.counter-hour');
        html_minute = tools.get('.counter-minute');
        html_second = tools.get('.counter-second');

        setTimeout(function() {
            setInterval(function() {
                counter.swap();
            }, 1000);
        });
    }

    counter.swap = function() {

        var now = new Date();
        var date = new Date(
            counter.date.y,
            counter.date.mo, 
            counter.date.d, 
            counter.date.h, 
            counter.date.mi, 
            counter.date.s, 
            0
        );
        
        if (date.getTime() > now.getTime()) {
            timeDiff = Math.abs( date.getTime() - now.getTime() );
        } else {
            timeDiff = Math.abs( now.getTime() - date.getTime() );
        }

        var d = Math.ceil(  timeDiff / day) - 1; 
        var h = Math.ceil( (timeDiff - d * day) / hour ) - 1;
        var m = Math.ceil( (timeDiff - d * day - h * hour) / minute) - 1;
        var s = Math.ceil( (timeDiff - d * day - h * hour - m * minute) / 1000) - 1;

        html_day.innerHTML = d;
        html_hour.innerHTML = h;
        html_minute.innerHTML = m;
        html_second.innerHTML = s;
    }

    return counter;
})({});

r(function(){

    tools.addListener('click', '.submenu', ui.toggleActive); 
    
    // console.log(tools.storageSupports());
    document.documentElement.className = 
       document.documentElement.className.replace("no-js","js");

    if (tools.isMobile()) {
        document.documentElement.className = 
            document.documentElement.classList.add('mobile');
    }
});