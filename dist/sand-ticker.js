'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SandTicker = function () {
	/** 
  * @param {string} wrapper a string of the selector for the ticker's wrapper
  * @param {string} ticker a string of the selector for the ticker
  * @param {string} items a string of the selector for the ticker's items
  * @param {number} loopDuration the time it takes for one loop to finish (see the animations in the CSS file)
  */
	function SandTicker(wrapper, ticker, items) {
		var loopDuration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;

		_classCallCheck(this, SandTicker);

		this.wrapper = document.querySelector(wrapper);
		this.ticker = document.querySelector(ticker);
		this.items = document.querySelectorAll(items);
		this.loopDuration = loopDuration;
		this.screenWidth = this.getScreenWidth();

		// Binding this:
		this.initTheTicker = this.initTheTicker.bind(this);
		this.fillScreenWithItems = this.fillScreenWithItems.bind(this);
	}

	/**
  * Initiates the ticker
  */


	_createClass(SandTicker, [{
		key: 'initTheTicker',
		value: function initTheTicker() {
			var wrapper = this.wrapper,
			    ticker = this.ticker,
			    items = this.items,
			    loopDuration = this.loopDuration;

			var markupIsValid = this.markupIsValid({ wrapper: wrapper, ticker: ticker, items: items });

			if (markupIsValid) {
				this.fillScreenWithItems();

				ticker.style.animationDuration = loopDuration + 's';
				ticker.className += ' animate loop-left';
				wrapper.style.height = ticker.offsetHeight + 'px';
			}
		}

		/**
   * Fills the ticker with copies of it's content untill
   * its length is at least two times the width of the screen 
   */

	}, {
		key: 'fillScreenWithItems',
		value: function fillScreenWithItems() {
			var ticker = this.ticker,
			    items = this.items,
			    screenWidth = this.screenWidth;

			var assetsWrapperWidth = ticker.offsetWidth;
			var index = 0;

			while (ticker.offsetWidth < screenWidth + assetsWrapperWidth) {
				ticker.appendChild(items[index].cloneNode(true));

				index = index < items.length - 1 ? index + 1 : 0;
			}

			// Ticker's content has to overflow
			ticker.style.width = assetsWrapperWidth + 'px';
		}

		/**
   * Checks if markup element exists
   * 
   * @param {Object} elements
   * @returns {Boolean} nodeExists
   */

	}, {
		key: 'markupIsValid',
		value: function markupIsValid(elements) {
			for (var nodeName in elements) {
				if (!elements[nodeName]) {
					console.warn('Sand Ticker couldn\'t find: ' + nodeName);
					return false;
				}
			}

			return true;
		}

		/**
   * Gets the screen width
   */

	}, {
		key: 'getScreenWidth',
		value: function getScreenWidth() {
			return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		}
	}]);

	return SandTicker;
}();