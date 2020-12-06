class SandTicker {
	/** 
	 * @param {string} wrapper a string of the selector for the ticker's wrapper
	 * @param {string} ticker a string of the selector for the ticker
	 * @param {string} items a string of the selector for the ticker's items
	 * @param {number} loopDuration the time it takes for one loop to finish (see the animations in the CSS file)
	 */
	constructor(wrapper, ticker, items, loopDuration = 20) {
		this.wrapper = document.querySelector(wrapper)
		this.ticker = document.querySelector(ticker)
		this.items = document.querySelectorAll(items)
		this.loopDuration = loopDuration
		this.screenWidth = this.getScreenWidth()

		// Binding this:
		this.initTheTicker = this.initTheTicker.bind(this)
		this.fillScreenWithItems = this.fillScreenWithItems.bind(this)
	}

	/**
	 * Initiates the ticker
	 */
	initTheTicker() {
		const { wrapper, ticker, items, loopDuration } = this
		const markupIsValid = this.markupIsValid({wrapper: wrapper, ticker: ticker, items: items})

		if (markupIsValid) {
			this.fillScreenWithItems()
	
			ticker.style.animationDuration = loopDuration + 's';
			ticker.className += ' animate loop-left'
			wrapper.style.height = `${ticker.offsetHeight}px`
		}
	}


	/**
	 * Fills the ticker with copies of it's content untill
	 * its length is at least two times the width of the screen 
	 */
	fillScreenWithItems() {
		const { ticker, items, screenWidth } = this
		const assetsWrapperWidth = ticker.offsetWidth
		let index = 0

		while (ticker.offsetWidth < screenWidth + assetsWrapperWidth) {
			ticker.appendChild(items[index].cloneNode(true))

			index = index < items.length - 1 ? index + 1 : 0
		}

		// Ticker's content has to overflow
		ticker.style.width = `${assetsWrapperWidth}px`
	}


	/**
	 * Checks if markup element exists
	 * 
	 * @param {Object} elements
	 * @returns {Boolean} nodeExists
	 */
	markupIsValid(elements) {
		for (const nodeName in elements) {
			if (!elements[nodeName]) {
				console.warn(`Sand Ticker couldn't find: ${nodeName}`)
				return false
			}
		}

		return true
	}


	/**
	 * Gets the screen width
	 */
	getScreenWidth() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
	}
}