export const SCROLL_UP = 'SCROLL_UP'
export const SCROLL_DOWN = 'SCROLL_DOWN'

export function scrollUp() {
	return {
		type: SCROLL_UP
	}
}

export function scrollDown() {
	return {
		type: SCROLL_DOWN
	}
}