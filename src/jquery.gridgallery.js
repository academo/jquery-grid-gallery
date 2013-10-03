if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
(function($, window, document, undefined) {

    // Create the plugins defaults
    var pluginName = "gridGallery",
        defaults = {
            showClose: true,
            showNext: true,
            showPrev: true,
            template: '<i class="indicator"></i><a href="#" class="control close"></a><a href="#" class="control prev"></a><a href="#" class="control next"></a>'
        };

    //Plugin instance
    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init(element, options);
    }

    Plugin.prototype = {
    	//Init function when Plugin is initialized
        init: function(el) {
            this.element.addClass("grid-gallery");
            this.element.on("click", "li > a", this.expandContent.bind(this));
            this.element.on("click", "li > .content > a.control", this.managetControl.bind(this));
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
            li.data("original-height", li.data("original-height") || li.height())

            if (li.hasClass("expanded")) {
                this.hideElement(li);
            } else {
                //this.hideElement(, false);
                this.showElement(li, $("li.expanded", this.element).removeClass("expanded"));
            }
            li.toggleClass('expanded');
        },
        //hide an element
        hideElement: function(li, effect) {
            li.animate({
                height: li.data("original-height"),
            });
            $(".content", li).slideUp();
        },
        //show an element and hide an old one
        //TODO refactor
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
        //When an expanded element control is clicked
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
