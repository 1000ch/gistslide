(function() {

    var win = window;
    var doc = win.document;
    var slice = [].slice;

    var qs = function(selector) {
        return doc.querySelector(selector);
    };
    var qsa = function(selector) {
        return doc.querySelectorAll(selector);
    };

    var KEYCODE_LEFT = 37;
    var KEYCODE_UP = 38;
    var KEYCODE_RIGHT = 39;
    var KEYCODE_BOTTOM = 40;

    function createNode(tagName, param) {
        var node = doc.createElement(tagName);
        var key;
        for(key in param) {
            node.setAttribute(key, param[key]);
        }
        return node;
    }

    function SlideContainer(headerElements) {
        this.headerElements = headerElements;
        this.headerOffsets = [];
        for(var i = 0, len = this.headerElements.length;i < len;i++) {
            this.headerOffsets.push(this.headerElements[i].offsetTop);
        }
        this.headerOffsets.sort(function(x, y) {
            return (x > y);
        });
        this.limitIndex = this.headerElements.length;
        this.currentIndex = 0;
        this.slideTo = function(index) {
            if(index < 0) {
                window.scrollTo(0, 0);
            } else if(this.limitIndex < index) {
                window.scrollTo(0, this.headerOffsets[this.limitIndex]);
            } else {
                window.scrollTo(0, this.headerOffsets[index]);
            }
        };
        this.prev = function() {
            this.currentIndex--;
            if(this.currentIndex < 0) {
                this.currentIndex = 0;
            }
            this.slideTo(this.currentIndex);
        };
        this.next = function() {
            this.currentIndex++;
            if(this.limitIndex < this.currentIndex) {
                this.currentIndex = this.limitIndex;
            }
            this.slideTo(this.currentIndex);
        };
    }

    function initializeGist() {
        //hide left panel
        qs(".root-pane").style.display = "none";

        //fix main content
        var column = qs(".column");
        column.style.float = "none";
        column.style.width = "100%";

        //hide other content
        qs(".js-comment-form").style.display = "none";
        qs("#header").style.display = "none";
        qs(".pagehead").style.display = "none";
        qs("#footer").style.display = "none";
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
        //qs('head').appendChild(css);

        initializeGist();

        //cache header positions
        var header1 = slice.call(qsa('h1'));
        var header2 = slice.call(qsa('h2'));
        var container = new SlideContainer(header1.concat(header2));

        //listen keydown event
        doc.addEventListener('keydown', function(e) {
            if(e.keyCode == KEYCODE_LEFT) {
                container.prev();
            } else if(e.keyCode == KEYCODE_RIGHT) {
                container.next();
            }
        });
    })();

})();
