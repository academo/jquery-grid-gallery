var chai = require("chai"),
    jsdom = require("jsdom"),
    jQuery = require("jquery"),
    fs = require("fs"),
    sinon = require("sinon");

var assert = chai.assert

var fixture = fs.readFileSync("test/fixture.html", "utf-8");
var window = jsdom.jsdom(fixture).createWindow();
var document = window.document;
var $ = global.jQuery = jQuery.create(window);
require("../dist/jquery.gridgallery");


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
        var showCallback = sinon.spy();

        $("#grid-gallery").gridGallery({
            onShow: showCallback
        });
        $("#grid-gallery > li:first > a:first").trigger("click");
        setTimeout(function() {
            assert.ok(showCallback.calledOnce, "on Show Callback");
            done();
        }, 500);
    });
    it('Expand Element show callback', function(done) {
        var showCallback = sinon.spy();

        $("#grid-gallery").gridGallery({
            onShowElement: showCallback
        });
        $("#grid-gallery > li:first > a:first").trigger("click");
        setTimeout(function() {
            assert.ok(showCallback.calledOnce, "on Show Element Callback");
            $("#grid-gallery > li:first a.next").trigger("click");
            setTimeout(function() {
                assert.equal(showCallback.callCount, 2, "on Show Next Element Callback");
                $("#grid-gallery > li:nth-child(2) a.prev").trigger("click");
                setTimeout(function() {
                    assert.equal(showCallback.callCount, 3, "on Show Previous Element Callback");
                    done();
                }, 500);
            }, 500);
        }, 500);
    });
    it('Close Element show callback', function(done) {
        var closeCallback = sinon.spy();

        $("#grid-gallery").gridGallery({
            onCloseElement: closeCallback
        });
        $("#grid-gallery > li:first > a:first").trigger("click");
        setTimeout(function() {
            $("#grid-gallery > li:first a.next").trigger("click");
            setTimeout(function() {
                assert.equal(closeCallback.callCount, 1, "on Close Current Element Callback 1");
                $("#grid-gallery > li:nth-child(2) a.prev").trigger("click");
                setTimeout(function() {
                    assert.equal(closeCallback.callCount, 2, "on Close Current Element Callback 2");
                    $("#grid-gallery > li:first a.close").trigger("click");
                    setTimeout(function() {
                        assert.equal(closeCallback.callCount, 3, "on Close Current Element Callback 3");
                        done();
                    }, 300);
                }, 300);
            }, 300);
        }, 300);
    });

    it('Close Element show callback', function(done) {
        var closeCallback = sinon.spy();

        $("#grid-gallery").gridGallery({
            onClose: closeCallback
        });
        $("#grid-gallery > li:first > a:first").trigger("click");
        setTimeout(function() {
            $("#grid-gallery > li:first a.close").trigger("click");
            setTimeout(function() {
                assert.equal(closeCallback.callCount, 1, "on Close Element Callback");
                done();
            }, 300);
        }, 300);
    });
});
