(function() {

    var win = window;
    var doc = win.document;

    function createNode(tagName, param) {
        var node = doc.createElement(tagName);
        var key;
        for(key in param) {
            node.setAttribute(key, param[key]);
        }
        return node;
    }

    var currentSlideIndex = 0;
    function calcCurrentIndex() {}

    function keydownEventHandler(e) {
        if(e.which == 37) {
            currentSlideIndex = calcCurrentIndex();
            slideTo(--currentSlideIndex);
        } else if(e.which == 39) {
            currentSlideIndex = calcCurrentIndex();
            slideTo(++currentSlideIndex);
        }
    }

    function slideTo() {}

    (function() {
        //create link node
        var css = createNode("link", {
            rel: "stylesheet",
            href: "https://raw.github.com/1000ch/gistdeck/master/src/css/gistdeck.css"
        });

        //create script node
        var js = craeteNode("script", {
            src: "https://raw.github.com/1000ch/gistdeck/master/src/js/gistdeck.js"
        });

        //insert nodes into head tail
        var head = doc.querySelector("head");
        head.appendChild(css);
        head.appendChild(js);

        //listen keydown event
        doc.addEventListener("keydown", keydownEventHandler);
    })();

})();
