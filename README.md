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

* Include base CSS in your head tag (less version available too)

```
<link rel="stylesheet" href="css/jquery.gridgallery.css">
```

* Add the base list html (not the .content div will be expanded)

```
<ul id="grid-gallery">
    <li>
        <a href="#">Link</a>
        <div class="content">
            Lorem ipsum dolor sit amet, consectetur 
            adipisicing elit. Ipsum, blanditiis.
        </div>
    </li>
    <li>
        <a href="#">Link</a>
        <div class="content">
            Recusandae, perspiciatis repellat 
            asperiores odit cumque earum at fugiat reprehenderit.
        </div>
    </li>
    <li>
        <a href="#">Link</a>
        <div class="content">
            Quos, eius sapiente quod maiores ducimus 
            dicta praesentium molestias quasi!
        </div>
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
Check the [online working example](http://plnkr.co/rjBkwF29GdvQCE4NNRL3)

OPTIONS
-----

| Option          | Type     | Default                      | Description                                                                                                                                  |
|-----------------|----------|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| showControllers | String   | true                         | Enable/Disable the Close Next/Prev and Indicator controllers in the grid                                                                     |
| nextTpl         | String   | &lt;a href="#"&gt;&lt;/a&gt; | HTML Template for next element controller                                                                                                    |
| prevTpl         | String   | &lt;a href="#"&lt;/a&gt;     | HTML Template for previous element controller</span>                                                       |
| closeTpl        | String   | &lt;a href="#"&lt;/a&gt;     | HTML Template for close element controller</span>                                                          |
| indicatorTpl    | String   | &lt;i&gt;&lt;/i&gt;          | HTML Template for position indicator                                                                                                         |
| onShowElement   | Function |                              | Callback when any element is show (including first shown). Called after animations.                                                                |
| onCloseElement  | Function |                              | Callback when any element is closed (including last closed). Called after animations.                                                               |
|                 |          |                              |                                                                                                                                              |
|                 |          |                              |                                                                                                                                              |
| onShow          | Function |                              | Callback when an element is shown and any other element is expanded. Called after animations                                                 |
| onClose         | Function |                              | Callback when current visible element is closed and any other element is shown. Called after animations                                      |
| onNext          | Function |                              | Callback when next controller is clicked and the next element is shown. Called after animations. Not called if not next element.             |
| onPrev          | Function |                              | Callback when previous controller is clicked and the previous element is shown. Called after animations. Not called if not previous element. |


**Arguments** 

onShow, onShowElement, onNext and onPrev recieves shown element as first parameter and closed element as second parameter.

onClose and onCloseElement recieves closed element as first parameter.

**Note**
* onShow and onShowElement are executed when first shown element is shown
* onShowElement and onCloseElement are both executed when two elements are switched (next, prev, user click).
* onClose and onCloseElement are executed when last closed element is closed
Currently working in adding more options

TODO
----

* Fix indicator position
* Expand documentation
