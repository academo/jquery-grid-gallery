jQuery Grid Gallery
===================

jQuery Grid Gallery is a jQuery plugin which convert a simple list into an expandible grid with inner content and next/prev/close controls.

Usage
-----
* Include jQuery
* Include jQuery Grid Gallery

```html
<script src="js/jquery.gridgallery.js"></script>
```

* Include base CSS in your head tag

```
<link rel="stylesheet" href="jquery.gridgallery.css">
```

* Call it in your document ready.

```
<script type="text/javascript">
    jQuery(document).ready(function($) {
        $("#grid-gallery").gridGallery();
    });
</script>
```

TODO
----

* Refactor some long functions
* Custom template for each control
* Callbacks for show/hide/next/prev/close
* Unit testing
* Add HTML example in README file