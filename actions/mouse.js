export const SCROLL_UP = 'SCROLL_UP'
export const SCROLL_DOWN = 'SCROLL_DOWN'

export function scrollUp(amount) {
	console.log('scrollin up');
	return {
		type: SCROLL_UP,
		amount
	}
}

export function scrollDown(amount) {
	return {
		type: SCROLL_DOWN,
		amount
	}
}