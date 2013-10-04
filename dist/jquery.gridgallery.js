// jQuery GridGallery
// v0.2
// created by academo
// https://github.com/academo/jquery-grid-gallery
(function($, window, document, undefined) {

    // Create the plugins defaults
    var pluginName = "gridGallery",
        defaults = {
            showControllers: true,
            nextTpl: '<a href="#"></a>',
            prevTpl: '<a href="#"</a>',
            closeTpl: '<a href="#"></a>',
            indicatorTpl: '<i></i>'
        };

    //Plugin instance

    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init(element, options);
    }

    //plugin methods
    Plugin.prototype = {
        //Init function when Plugin is initialized
        init: function(el) {
            this.element.addClass("grid-gallery");
            //handle expand or collapse element
            this.element.on("click", "li > a", this.expandContent.bind(this));
            //handle controls
            if (this.settings.showControllers) {
                this.element.on("click", "li > .content > a.control", this.managetControl.bind(this));
            }
        },
        //When an element is clicked
        expandContent: function(e) {
            //prevent any click link
            e.preventDefault();
            //parent li object
            var li = $(e.currentTarget).parent();
            //set original height if not already
            this.toggleElement(li);
        },
        //toggle element expanding status
        toggleElement: function(li) {
            //save original-height
            li.data("original-height", li.data("original-height") || li.height())

            //check if expanded to hide or show
            if (li.hasClass("expanded")) {
                this.hideElement(li);
            } else {
                //this.hideElement(, false);
                this.showElement(li, $("li.expanded", this.element).removeClass("expanded"));
            }
            li.toggleClass('expanded');
        },
        //hide an element with animation
        hideElement: function(li, effect) {
            li.animate({
                height: li.data("original-height"),
            });
            $(".content", li).slideUp();
        },
        //show an element and hide an old one
        //TODO refactor
        showElement: function(li, old) {
            var content = $(".content", li);
            var offset = $("li:first", this.element).offset();

            content.css({
                "width": li.parent().width()
            });

            if (this.settings.showControllers && !content.hasClass('expanded-controls')) {
                this.initializeControllers(content, li);
            }
            var newHeight = li.outerHeight() + $(".content", li).outerHeight();

            if (old.length == 0) {
                li.animate({
                    height: newHeight,
                });
                content.slideToggle();
            } else {
                if (old.length == 0 || old.offset().top != li.offset().top) {
                    this.hideElement(old);
                    this.showElement(li, $("li.expanded", this.element));
                } else {
                    $(".content", old).fadeOut(300);
                    li.height(newHeight);
                    old.height(old.data("original-height"));
                    content.fadeIn(300);
                }
            }
        },
        initializeControllers: function(content, li) {
            $(this.settings.nextTpl).addClass('control next').appendTo(content);
            $(this.settings.prevTpl).addClass('control prev').appendTo(content);
            $(this.settings.closeTpl).addClass('control close').appendTo(content);
            $(this.settings.indicatorTpl).addClass('indicator').appendTo(content);
            $(".indicator", content).css({
                "left": (li.offset().left + li.outerHeight() / 2) + "px"
            });
            content.addClass('expanded-controls');
        },
        //When an expanded element control is clicked
        managetControl: function(e) {
            e.preventDefault();
            console.log("aca");
            var a = $(e.currentTarget);
            var li = a.closest('li.expanded');
            if (a.hasClass('close')) {
                this.toggleElement(li);
                return;
            }
            if (a.hasClass('prev')) {
                var newElement = li.prev('li');
            }
            if (a.hasClass('next')) {
                var newElement = li.next('li');
            }
            if (newElement.length > 0) {
                this.toggleElement(newElement);
            }
        }
    };

    //add plugin to jQuery
    $.fn[pluginName] = function(options) {
        //for each element in selector instance plugin if not previous instance
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

//if browser doesn't support bind add it.
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
