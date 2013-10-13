var chai = require("chai"),
    jsdom = require("jsdom"),
    jQuery = require("jquery"),
    fs = require("fs");

var assert = chai.assert

var fixture = fs.readFileSync("test/fixture.html", "utf-8");
var window = jsdom.jsdom(fixture).createWindow();
var document = window.document;
var $ = global.jQuery = jQuery.create(window);
require("../src/jquery.gridgallery");


//Plugin is chainable
describe('jQuery Grid Gallery Basis', function() {
    //Init Fixture
    before(function() {
        $("#grid-gallery").remove();
        $(".fixture").clone().attr("id", "grid-gallery").appendTo("body");
    });
    it('Plugin is defined', function() {
        assert.ok($.fn.gridGallery, 'Plugin is defined');
    });
    it('Plugin is chainable', function() {
        assert.ok($("#grid-gallery").gridGallery().addClass("testing"), 'Add testing class');
        assert.ok($("#grid-gallery").hasClass("testing"), 'Check testing class is defined');
        //assert.ok($("#grid-gallery").hasClass("testing"), "It is chainable");
    });
    it('Plugin Init', function() {
        $("#grid-gallery").gridGallery();
        assert.ok($("#grid-gallery").hasClass("grid-gallery"), "Plugin Init");
    });
    it('Element expand', function(done) {
        $("#grid-gallery > li:first > a:first").trigger("click");
        setTimeout(function() {
            assert.ok($("#grid-gallery > li:first").hasClass('expanded'), 'Element has expanded class');
            done();
        }, 500);
    });
    it('Controllers were defined', function() {
        assert.ok($("#grid-gallery > li:first a.control.close").length);
        assert.ok($("#grid-gallery > li:first a.control.prev").length);
        assert.ok($("#grid-gallery > li:first a.control.next").length);
    });
    it('Move to next element', function(done) {
        $("#grid-gallery > li:first > .content > a.next").trigger("click");
        setTimeout(function() {
            assert.ok($("#grid-gallery > li:nth-child(2)").hasClass('expanded'), 'Next element has expanded class');
            done();
        }, 500);
    });
    it('Move to previous element', function(done) {
        $("#grid-gallery > li:nth-child(2) > .content > a.prev").trigger("click");
        setTimeout(function() {
            assert.ok($("#grid-gallery > li:nth-child(1)").hasClass('expanded'), 'Previous element has expanded class');
            done();
        }, 500);
    });
    it('Close element', function(done) {
        $("#grid-gallery > li:first > .content > a.close").trigger("click");
        setTimeout(function() {
            assert.notOk($("#grid-gallery > li:first").hasClass('expanded'), 'Element doesn\'t have expanded class');
            done();
        }, 500);
    });
});


describe('jQuery Grid Gallery Callbacks', function() {
    //Init Fixture
    beforeEach(function() {
        $("#grid-gallery").remove();
        $(".fixture").clone().attr("id", "grid-gallery").appendTo("body");
    });
    it('Expand show callback', function(done) {

        $("#grid-gallery").gridGallery({
            onShow: function() {
                assert.ok(true, "on Show Callback");
                done();
            }
        });
        $("#grid-gallery > li:first > a:first").trigger("click");
    });

    it('Close Element show callback', function(done) {
        $("#grid-gallery").gridGallery({
            onClose: function() {
                assert.ok(true, "on close Callback");
                done();
            },
            onShow: function() {
                $("#grid-gallery > li:first > a:first").trigger("click");
            }
        });
        $("#grid-gallery > li:first > a:first").trigger("click");
    });

    it('Next Element show callback', function(done) {
        $("#grid-gallery").gridGallery({
            onNext: function() {
                assert.ok(true, "on next Callback");
                done();
            },
            onShow: function() {
                $("#grid-gallery > li:first a.next").trigger("click");
            }
        });
        $("#grid-gallery > li:first > a:first").trigger("click");
    });

    it('Prev Element show callback', function(done) {
        $("#grid-gallery").gridGallery({
            onPrev: function() {
                assert.ok(true, "on prev Callback");
                done();
            },
            onShow: function() {
                $("#grid-gallery > li:nth-child(2) a.prev").trigger("click");
            }
        });
        $("#grid-gallery > li:nth-child(2) > a:first").trigger("click");
    });

    it('Show Element callback', function(done) {
        var count = 3;
        $("#grid-gallery").gridGallery({
            onShowElement: function() {
                if (count == 0) {
                    done();
                } else {
                    count--;
                    assert.ok(true, "on showElement Callback");
                    $("#grid-gallery > li.expanded a.next").trigger("click");
                }
            }
        });
        $("#grid-gallery > li:first > a:first").trigger("click");
    });
    it('Close Element callback', function(done) {
        var count = 1;
        $("#grid-gallery").gridGallery({
            onCloseElement: function() {
                if (count == 0) {
                    done();
                } else {
                    count--;
                    assert.ok(true, "on showElement Callback");
                    $("#grid-gallery > li.expanded a.next").trigger("click");
                }
            },
            onShow: function() {
                $("#grid-gallery > li.expanded a.next").trigger("click");
            }
        });
        $("#grid-gallery > li:first > a:first").trigger("click");
    });
});
