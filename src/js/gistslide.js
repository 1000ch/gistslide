(function() {

	//cache external variable
	var win = window;
	var doc = win.document;

	//native alias
	var forEach = [].forEach;
	var slice = [].slice;
	var map = [].map;
	var filter = [].filter;

	//constant
	var KEYCODE_LEFT = 37;
	var KEYCODE_UP = 38;
	var KEYCODE_RIGHT = 39;
	var KEYCODE_BOTTOM = 40;

	/**
	 * querySelector alias
	 * @param {string} selector
	 * @param {HTMLElement} context
	 * @returns {Node}
	 */
	var qs = function(selector, context) {
		return (context || doc).querySelector(selector);
	};

	/**
	 * document.querySelectorAll alias
	 * @param {string} selector
	 * @param {HTMLElement} context
	 * @returns {NodeList}
	 */
	var qsa = function(selector, context) {
		return (context || doc).querySelectorAll(selector);
	};

	/**
	 * document.getElementById alias
	 * @param {string} selector
	 * @param {HTMLElement} context
	 * @returns {NodeList}
	 */
	var byId = function(id) {
		return document.getElementById(id);
	};

/**
	 * getElementsByClassName alias
	 * @param {string} selector
	 * @param {HTMLElement} context
	 * @returns {Node}
	 */
	var byClassName = function(className, context) {
		return (context || document).getElementsByClassName(className);
	};

	/**
	 * getElementsByTagName alias
	 * @param {string} tagName
	 * @param {HTMLElement} context
	 * @returns {Node}
	 */
	var byTagName = function(tagName, context) {
		return (context || document).getElementsByTagName(tagName);
	};

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
	 * @param {HTMLElement} destNode
	 */
	function wrapNode(targetNode, destNode) {
		//append clone of targetNode to wrapNode
		destNode.appendChild(targetNode.cloneNode(true));
		//append cloned node and remove before node
		var parentNode = targetNode.parentNode;
		parentNode.insertBefore(destNode, targetNode);
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
		removeNode(targetNode);
	}

	/**
	 * remove node
	 * @param {HTMLElement} targetNode
	 */
	function removeNode(targetNode) {
		if(targetNode && targetNode.parentNode) {
			targetNode.parentNode.removeChild(targetNode);
		}
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
		this.limitIndex = this.elementList.length - 1;
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

		var start = Date.now();
		console.log("[gistslide]start:" + (Date.now() - start));

		//add .gs-theme to body
		addClass(document.body, "gs-theme");

		//add .gs-slide to article.markdown-body
		addClass(qs(".markdown-body"), "gs-slide");

		//remove classes
		removeClass(qs(".gs-slide"), "markdown-body js-file js-task-list-container is-task-list-enabled");

		//move article.markdown-body to body
		moveNode(qs(".gs-slide"), document.body);

		//hide elements
		addClass(byId("wrapper"), "is-hidden");
		addClass(byId("ajax-error-message"), "is-hidden");
		addClass(qs(".js-task-list-field"), "is-hidden");
		addClass(qs("footer"), "is-hidden");

		//get headers under .gs-slide
		var slideParent = qs(".gs-slide");
		var header1 = slice.call(byTagName('h1', slideParent));
		var header2 = slice.call(byTagName('h2', slideParent));
		var headers = header1.concat(header2);
		//filter element which has secret class
		headers = filter.call(headers, function(header) {
			return !header.classList.contains("secret");
		});

		//wrap headers with section.gs-slide-content
		forEach.call(headers, function(header) {
			//wrap header with section.gs-slide-content
			wrapNode(header, createNode("section", {
				class: "gs-slide-content"
			}));
		});

		//move following elements to section.gs-slide-content
		var slides = byClassName("gs-slide-content", qs(".gs-slide"));
		forEach.call(slides, function(slide) {
			var moveNodeList = [];
			var element = getSibling(slide);
			while(element && !element.classList.contains("gs-slide-content")) {
				moveNodeList.push(element);
				element = getSibling(element);
			}
			forEach.call(moveNodeList, function(node) {
				moveNode(node, slide);
			});
		});

		//get hash string
		var cssFile;
		var hashValue = win.location.hash.replace('#', '');
		if(hashValue !== "") {
			cssFile = hashValue;
		} else if(win.gistSlideTheme !== undefined) {
			cssFile = win.gistSlideTheme;
		}
		if(!cssFile) {
			cssFile = "default";
		}

		//create link node
		var linkNode = createNode('link', {
			rel: 'stylesheet',
			type: 'text/css',
			href: 'https://gistslide.herokuapp.com/src/css/themes/' + cssFile + '.css'
		});

		linkNode.addEventListener("load", function() {
			//wait for reflow completion
			window.setTimeout(function() {
				//after repaint
				var container = new SlideContainer(byClassName("gs-slide-content", qs(".gs-slide")));

				//listen keydown event
				doc.addEventListener('keydown', function(e) {
					if(e.keyCode == KEYCODE_LEFT) {
						container.prev();
					} else if(e.keyCode == KEYCODE_RIGHT) {
						container.next();
					}
				});
			}, 1000);
		});

		//insert nodes into head tail
		qs('head').appendChild(linkNode);
		console.log("[gistslide]end:" + (Date.now() - start));
	})();
})();
