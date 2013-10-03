;
(function($, window, document, undefined) {

    // Create tshe defaults once
    var pluginName = "gridExpander",
        defaults = {
            template: '<i class="indicator"></i><a href="#" class="control close"></a><a href="#" class="control prev"></a><a href="#" class="control next"></a>'
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init(element, options);
    }

    Plugin.prototype = {
        init: function(el) {
            this.element.addClass("expand-grid");
            this.element.on("click", "li > a", this.expandContent.bind(this));
            this.element.on("click", "li > .content > a.control", this.managetControl.bind(this));
        },
        expandContent: function(e) {
            //prevent any click link
            e.preventDefault();
            //parent li object
            var li = $(e.currentTarget).parent();
            //set original height if not already
            this.toggleElement(li);
        },
        toggleElement: function(li) {
            li.data("original-height", li.data("original-height") || li.height())

            if (li.hasClass("expanded")) {
                this.hideElement(li);
            } else {
                //this.hideElement(, false);
                this.showElement(li, $("li.expanded", this.element).removeClass("expanded"));
            }
            li.toggleClass('expanded');
        },
        hideElement: function(li, effect) {
            li.animate({
                height: li.data("original-height"),
            });
            $(".content", li).slideUp();
        },
        showElement: function(li, old) {
            //hide old text
            //var changeLine = ;

            var content = $(".content", li);
            var offset = $("li:first", this.element).offset();
            

            content.css({
                "left": -offset.left,
                "padding-left": offset.left,
                "padding-right": offset.left,
                "width": $(document).outerWidth()
            });

            

            if(!content.hasClass('expanded-elements')){
                content.append(this.settings.template).addClass("expanded-elements");
            }
            var indicator = $(".indicator", li);
            indicator.css({
                "left": (li.offset().left + li.outerHeight()/2) + "px"
            });

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
        managetControl: function(e){
            e.preventDefault();
            var a = $(e.currentTarget);
            var li = a.closest('li.expanded');
            if(a.hasClass('close')){
                this.toggleElement(li);
                return;
            }
            if(a.hasClass('prev')){
                var newElement = li.prev('li');
            }
            if(a.hasClass('next')){
                var newElement = li.next('li');
            }
             if(newElement.length > 0 ){
                this.toggleElement(newElement);
            }
        }
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
