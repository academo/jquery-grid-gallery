(function($) {
    test("Plugin is defined", function() {
        ok($.fn.gridGallery, 'Plugin is defined');
    });
    test("Chainable", function() {
        ok($("#grid-gallery").gridGallery().addClass("testing"));
        ok($("#grid-gallery").hasClass("testing"), "It is chainable");
    });
    test("Plugin Init", function(){
        $("#grid-gallery").gridGallery();
        ok($("#grid-gallery").hasClass("grid-gallery"), "Plugins INIT");
    });
    test("Element expand", function(){
        $("#grid-gallery").gridGallery();
        $("#grid-gallery > li:first > a:first").trigger("click");
        stop();
        setTimeout(function(){
            ok($("#grid-gallery > li:first").hasClass('expanded'), 'Element has expanded class');
            start();
        }, 1000)

    });
}(jQuery));