// Check how the plugin should be exported
(function(factory)
{
    if(typeof module === 'object' && module.exports)
    {
        // We're in Node or a CommonJS compatable environment
        factory(require('wetfish-basic'));
    }
    else if(typeof define === 'function' && define.amd)
    {
        // We're in a browser being loaded with AMD (Require.js)
        define(['wetfish-basic'], factory);
    }
    else
    {
        // We're in a browser, so assume everything has been loaded as global variables
        factory(basic);
    }
}
(function($)
{
    // Initialize scrollbar
    var Scrollie = function(element)
    {
        this.element = element;
        this.active = false;

        this.bind();
        this.update();
    }

    // Bind scrollbar events
    Scrollie.prototype.bind = function()
    {
        // Preserve scope inside event handlers
        var scroll = this;

        // Update the scrollbar whenever the box is scrolled
        $(scroll.element).find('.scroll-inner').on('scroll', this.update.bind(this));

        $(scroll.element).find('.scrollbar').on('mousedown', function(event)
        {
            $(scroll.element).addClass('active');
            scroll.active = true;

            scroll.lastX = event.clientX;
            scroll.lastY = event.clientY;
        });

        $('html').on('mousemove', function(event)
        {
            if(scroll.active)
            {
                event.preventDefault();
                
                // Find the amount the scrollbar should move
                var barDelta = event.clientY - scroll.lastY;

                // Find the amount the actual scroll area needs to move
                var scrollHeight = $(scroll.element).find('.scroll-inner').height('outer');
                var contentHeight = $(scroll.element).find('.scroll-content').height('outer');

                var scrollDelta = contentHeight / scrollHeight * barDelta;

                $(scroll.element).find('.scroll-inner').elements[0].scrollTop += scrollDelta;

                scroll.lastX = event.clientX;
                scroll.lastY = event.clientY;
            }
        });

        $('html').on('mouseup', function()
        {
            $(scroll.element).removeClass('active');
            scroll.active = false;
        });
    }

    // Update scrollbar size and position
    Scrollie.prototype.update = function()
    {
        var scroll = this;
        var scrollHeight = $(scroll.element).find('.scroll-inner').height('outer');
        var contentHeight = $(scroll.element).find('.scroll-content').height('outer');
        var barHeight = scrollHeight / contentHeight * 100;
        var barPosition = $(scroll.element).find('.scroll-inner').scroll().top / contentHeight * 100;
        $(scroll.element).find('.scrollbar').style({'height': barHeight + "%", 'top': barPosition + "%"});
    }

    // Wetfish basic wrapper
    $.prototype.scrollie = function()
    {
        this.forEach(this.elements, function(element)
        {
            new Scrollie(element);
        });
    }
}));
