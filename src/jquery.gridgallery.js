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
            indicatorTpl: '<i></i>',
            onShowElement: function() {},
            onCloseElement: function() {},
            onShow: function() {},
            onClose: function() {},
            onNext: function() {},
            onPrev: function() {}
        };

    //Plugin instance

    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init(element, options);
        this.trigger = [];
    }

    //plugin methods
    Plugin.prototype = {
        //Init function when Plugin is initialized
        init: function(el) {
            this.element.addClass("grid-gallery");
            //handle expand or collapse element
            this.element.on("click", "li > a", $.proxy(this.expandContent, this));
            //handle controls
            if (this.settings.showControllers) {
                this.element.on("click", "li > .content > .control", $.proxy(this.manageControl, this));
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
        toggleElement: function(li, callback) {
            //save original-height
            li.data("original-height", li.data("original-height") || li.height())

            //check if expanded to hide or show
            if (li.hasClass("expanded")) {
                return this.hideElement(li).then($.proxy(this.settings.onClose, this, li));
            } else {
                //this.hideElement(, false);
                return this.showElement(li, $("li.expanded", this.element).removeClass("expanded"));
            }
        },
        //hide an element with animation
        hideElement: function(li) {
            li.removeClass("expanded");
            return $.when(li.animate({
                height: li.data("original-height"),
            }), $(".content", li).slideUp()).then($.proxy(this.settings.onCloseElement, this, li));
        },
        //show an element and hide an old one
        //TODO refactor
        showElement: function(li, old) {
            var self = this;
            //cach elements
            var content = $(".content", li);
            var offset = $("li:first", this.element).offset();

            li.addClass("expanded");
            //set new content width
            content.css({
                "width": li.parent().width()
            });
            //initialize controllers
            if (this.settings.showControllers && !content.hasClass('expanded-controls')) {
                this.initializeControllers(content, li);
            }
            //calculate new height and show element hide old
            var newHeight = li.outerHeight() + $(".content", li).outerHeight();
            //if old doesn't exist or the row had changed
            if (old.length == 0 || old.offset().top != li.offset().top) {
                //hide old element if exist
                if (old.length > 0 && old.offset().top != li.offset().top) {
                    this.hideElement(old);
                }
                //wait to finish all animations to callback
                return $.when(
                    li.animate({
                        height: newHeight,
                    }),
                    content.slideToggle()
                ).then($.proxy(function() {
                    if (old.length == 0) {
                        this.settings.onShow.call(this, li);
                        this.settings.onShowElement.call(this, li);
                    }
                }, this, old));
            } else {
                //old element is in same row not need to animate height
                $(".content", old).fadeOut(300);
                li.height(newHeight);
                this.hideElement(old);
                return content.fadeIn(300).promise().then($.proxy(this.settings.onShowElement,this, li, old));
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
        manageControl: function(e) {
            e.preventDefault();
            //console.log("aca");
            var newElement, callback;
            var a = $(e.currentTarget);
            var li = a.closest('li.expanded');

            if (a.hasClass('close')) {
                this.toggleElement(li).then(this.settings.onClose);
                return;
            }
            if (a.hasClass('prev')) {
                newElement = li.prev('li');
                callback = $.proxy(this.settings.onPrev, this, newElement, li);
            }
            if (a.hasClass('next')) {
                newElement = li.next('li');
                callback = $.proxy(this.settings.onNext, this, newElement, li);
            }

            if (newElement.length > 0) {
                //toggle element returns a promise of when then showEffect is done
                this.toggleElement(newElement).then(callback);
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

})(jQuery);
