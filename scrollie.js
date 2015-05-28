(function($)
{
    // Initialize scrollbar
    var Scrollie = function(element)
    {
        this.element = element;
        this.bind();
        
    }

    // Bind scrollbar events
    Scrollie.prototype.bind = function()
    {
        // Update the scrollbar whenever the box is scrolled
        $('.scroll-inner').on('scroll', this.update);

        // Initialze the scrollbar on page load
        this.update();

        var scroll = {active: false};

        $('.scrollbar').on('mousedown', function(event)
        {
            $('.scroll-outer').addClass('active');
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
                var scrollHeight = $('.scroll-inner').size().height.outer;
                var contentHeight = $('.scroll-content').size().height.outer;

                var scrollDelta = contentHeight / scrollHeight * barDelta;

                $('.scroll-inner').elements[0].scrollTop += scrollDelta;

                scroll.lastX = event.clientX;
                scroll.lastY = event.clientY;
            }
        });

        $('html').on('mouseup', function()
        {
            $('.scroll-outer').removeClass('active');
            scroll.active = false;
        });
    }

    // Update scrollbar size and position
    Scrollie.prototype.update = function()
    {
        var scrollHeight = $('.scroll-inner').size().height.outer;
        var contentHeight = $('.scroll-content').size().height.outer;
        var barHeight = scrollHeight / contentHeight * 100;
        var barPosition = $('.scroll-inner').elements[0].scrollTop / contentHeight * 100;
        
        $('.scrollbar').elements[0].style.height = barHeight + "%";
        $('.scrollbar').elements[0].style.top = barPosition + "%";
    }

    // Wetfish basic wrapper
    $.prototype.scrollie = function()
    {
        for(var i = 0, l = this.elements.length; i < l; i++)
        {
            var element = this.elements[i];
            new Scrollie(element);
        }
    }
}(basic));
