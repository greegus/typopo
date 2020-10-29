import { Locale } from '../../types'

export function fixSpaceAroundHyphen(string: string, locale: Locale) {
	let pattern =
		'([' +
		locale.allChars +
		'])(-)([' +
		locale.spaces +
		'])([' +
		locale.allChars +
		'])'
	let re = new RegExp(pattern, 'g')
	string = string.replace(re, '$1-$4')

	pattern =
		'([' +
		locale.allChars +
		'])([' +
		locale.spaces +
		'])(-)([' +
		locale.allChars +
		'])'
	re = new RegExp(pattern, 'g')
	string = string.replace(re, '$1-$4')

	return string
}

export function fixHyphen(string: string, locale: Locale) {
	string = fixSpaceAroundHyphen(string, locale)
	return string
}
