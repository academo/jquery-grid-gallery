(function($) {
    test("init", function() {
        ok($.fn.gridGallery, 'Plugin is defined');
    });
    test("chainable", function() {
        ok($("#grid-gallery").gridGallery().addClass("testing"));
        ok($("#grid-gallery").hasClass("testing"), "It is chainable");
    });
}(jQuery));
