(function() {

    var win = window;
    var doc = win.document;
    var slice = [].slice;

    function createNode(tagName, param) {
        var node = doc.createElement(tagName);
        var key;
        for(key in param) {
            node.setAttribute(key, param[key]);
        }
        return node;
    }

    var headerPosition = [];
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

    function slideTo(index) {
        var position = (headerPosition.length < index) ? 0 : headerPosition[index];
        window.scrollTo(position);
    }

    function initializeGist() {
        //hide left panel
        doc.querySelector(".root-pane").style.display = "none";

        //fix main content
        var column = doc.querySelector(".column");
        column.style.float = "none";
        column.style.width = "100%";

        //hide other content
        doc.querySelector(".js-comment-form").style.display = "none";
        doc.getElementById("header").style.display = "none";
        doc.querySelector(".pagehead").style.display = "none";
        doc.getElementById("footer").style.display = "none";
    }

    (function() {
        //if here is not gist@github
        if(win.location.hostname != "gist.github.com") {
            return;
        }

        //create link node
        var css = createNode('link', {
            rel: 'stylesheet',
            href: 'https://raw.github.com/1000ch/gistdeck/master/src/css/gistslide.css'
        });

        //insert nodes into head tail
        //doc.querySelector('head').appendChild(css);

        initializeGist();

        //cache header positions
        var headerLevel1 = slice.call(doc.getElementsByTagName('h1'));
        var headerLevel2 = slice.call(doc.getElementsByTagName('h2'));
        var headerArray = headerLevel1.concat(headerLevel2);
        for(var i = 0, len = headerArray.length;i < len;i++) {
            headerPosition.push(headerArray[i].offsetTop);
        }
        headerPosition.sort();console.log(headerPosition);

        //listen keydown event
        doc.addEventListener('keydown', keydownEventHandler);
    })();

})();
