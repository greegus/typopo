import { Locale } from '../../types'

function replaceRwithRegisteredTrademark(string: string, locale: Locale) {
	let pattern =
		'([^0-9]|^)([' +
		locale.spaces +
		']*)(\\(r\\)|' +
		locale.registeredTrademark +
		')'
	let re = new RegExp(pattern, 'gi')
	let replacement = '$1' + locale.registeredTrademark

	return string.replace(re, replacement)
}

export function fixRegisteredTrademark(string: string, locale: Locale) {
	string = replaceRwithRegisteredTrademark(string, locale)

	return string
}
