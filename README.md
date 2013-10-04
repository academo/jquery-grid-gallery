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

* Add the base list html (not the .content div will be expanded)

```
<ul id="grid-gallery">
    <li>
        <a href="#">Link</a>
        <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, blanditiis.</div>
    </li>
    <li>
        <a href="#">Link</a>
        <div class="content">Recusandae, perspiciatis repellat asperiores odit cumque earum at fugiat reprehenderit.</div>
    </li>
    <li>
        <a href="#">Link</a>
        <div class="content">Quos, eius sapiente quod maiores ducimus dicta praesentium molestias quasi!</div>
    </li>
</ul>
```

* Call it in your document ready.

```
<script type="text/javascript">
    jQuery(document).ready(function($) {
        $("#grid-gallery").gridGallery();
    });
</script>
```

DEMO
----
Check the [online working example](http://run.plnkr.co/jJqegTjWQ6m8rBF7/)

TODO
----

* Refactor some long functions
* Callbacks for show/hide/next/prev/close
* Unit testing
* Fix indicator position