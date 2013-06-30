(function() {

	//cache external variable
	var win = window;
	var doc = win.document;
	var forEach = [].forEach;
	var slice = [].slice;
	var map = [].map;
	var filter = [].filter;

	/**
	 * alias for document.querySelector
	 * @param {string} selector
	 * @param {HTMLElement} context
	 * @returns {Node}
	 */
	var qs = function(selector, context) {
		return (context || doc).querySelector(selector);
	};

	/**
	 * alias for document.querySelectorAll
	 * @param {string} selector
	 * @param {HTMLElement} context
	 * @returns {NodeList}
	 */
	var qsa = function(selector, context) {
		return (context || doc).querySelectorAll(selector);
	};

	//constant
	var KEYCODE_LEFT = 37;
	var KEYCODE_UP = 38;
	var KEYCODE_RIGHT = 39;
	var KEYCODE_BOTTOM = 40;

	/**
	 * create node
	 * @param {string} tagName
	 * @param {object} param
	 * @returns {HTMLElement}
	 */
	function createNode(tagName, param) {
		var node = doc.createElement(tagName);
		var key;
		for(key in param) {
			node.setAttribute(key, param[key]);
		}
		return node;
	}

	/**
	 * wrap node
	 * @param {HTMLElement} targetNode
	 * @param {HTMLElement} wrapNode
	 */
	function wrapNode(targetNode, wrapNode) {
		//append clone of targetNode to wrapNode
		wrapNode.appendChild(targetNode.cloneNode(true));
		var parentNode = targetNode.parentNode;
		parentNode.insertBefore(wrapNode, targetNode);
		parentNode.removeChild(targetNode);
	}

	/**
	 * move node
	 * @param {HTMLElement} targetNode
	 * @param {HTMLElement} destNode
	 */
	function moveNode(targetNode, destNode) {
		//append clone of targetNode to destNode
		destNode.appendChild(targetNode.cloneNode(true));
		//remove itself
		targetNode.parentNode.removeChild(targetNode);
	}

	/**
	 * get sibling
	 * @param {HTMLElement} targetNode
	 * @returns {HTMLElement}
	 */
	function getSibling(targetNode) {
		var node = targetNode;
		while ( (node = node.nextSibling) && node.nodeType !== 1 ) {}
		return node;
	}

	/**
	 * add class to node
	 * @param {HTMLElement} targetNode
	 * @param {string} className
	 */
	function addClass(targetNode, className) {
		if(targetNode) {
			var classArray = className.split(" ");
			forEach.call(classArray, function(name) {
				targetNode.classList.add(name);
			});
		}
	}

	/**
	 * remove class from node
	 * @param {HTMLElement} targetNode
	 * @param {string} className
	 */
	function removeClass(targetNode, className) {
		if(targetNode) {
			var classArray = className.split(" ");
			forEach.call(classArray, function(name) {
				targetNode.classList.remove(name);
			});
		}
	}

	/**
	 * slide container
	 * @param elementList
	 * @constructor
	 */
	function SlideContainer(elementList) {
		this.elementList = slice.call(elementList);
		this.elementList.sort(function(x, y) {
			return parseInt(x.offsetTop, 10) > parseInt(y.offsetTop, 10);
		});
		this.offsetList = map.call(this.elementList, function(element) {
			return element.offsetTop;
		});
		this.offsetList.sort(function(x, y) {
			return parseInt(x, 10) - parseInt(y, 10);
		});
		this.limitIndex = this.elementList.length;
		this.currentIndex = 0;
		/**
		 * slide to index
		 * @param {number} index
		 */
		this.slideTo = function(index) {
			if(index < 0) {
				window.scrollTo(0, 0);
			} else if(this.limitIndex < index) {
				window.scrollTo(0, this.offsetList[this.limitIndex]);
			} else {
				window.scrollTo(0, this.offsetList[index]);
			}
		};
		/**
		 * slide to prev
		 */
		this.prev = function() {
			this.currentIndex--;
			if(this.currentIndex < 0) {
				this.currentIndex = 0;
			}
			this.slideTo(this.currentIndex);
		};
		/**
		 * slide to prev
		 */
		this.next = function() {
			this.currentIndex++;
			if(this.limitIndex < this.currentIndex) {
				this.currentIndex = this.limitIndex;
			}
			this.slideTo(this.currentIndex);
		};
	}

	(function() {
		//if here is not gist@github
		if(win.location.hostname != 'gist.github.com') {
			return;
		}
		//get hash string
		var cssFile = win.location.hash.replace('#', '');
		if(!cssFile) {
			cssFile = "default";
		}

		//create link node
		var linkNode = createNode('link', {
			rel: 'stylesheet',
			type: 'text/css',
			href: 'https://gistslide.herokuapp.com/src/css/themes/' + cssFile + '.css'
		});

		//insert nodes into head tail
		qs('head').appendChild(linkNode);

		//add .gs-theme to body
		addClass(document.body, "gs-theme");

		//add .gs-slide to article.markdown-body
		addClass(qs(".markdown-body"), "gs-slide");

		//remove classes
		removeClass(qs(".gs-slide"), "markdown-body js-file js-task-list-container is-task-list-enabled");

		//move article.markdown-body to body
		moveNode(qs(".gs-slide"), document.body);

		//hide elements
		qs("#wrapper").style.display = "none";
		qs("#ajax-error-message").style.display = "none";
		qs("footer").style.display = "none";

		//cache header positions
		var slideParent = qs(".gs-slide");
		var header1 = slice.call(qsa('h1', slideParent));
		var header2 = slice.call(qsa('h2', slideParent));
		var headers = header1.concat(header2);
		headers = filter.call(headers, function(header) {
			return !header.classList.contains("secret");
		});
		forEach.call(headers, function(header) {
			//wrap header with section.gs-slide-content
			wrapNode(header, createNode("section", {
				class: "gs-slide-content"
			}));
		});
		var slideContainers = qsa(".gs-slide-content", qs(".gs-slide"));
		forEach.call(slideContainers, function(slideContainer) {
			var moveNodeList = [];
			var element = getSibling(slideContainer);
			while(element && !element.classList.contains("gs-slide-content")) {
				moveNodeList.push(element);
				element = getSibling(element);
			}
			forEach.call(moveNodeList, function(node) {
				moveNode(node, slideContainer);
			});
		});

		var container = new SlideContainer(qsa(".gs-slide-content",  qs(".gs-slide")));
		console.log("elementList");
		console.log(container.elementList);
		console.log("offsetList");
		console.log(container.offsetList);

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
