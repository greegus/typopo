import { Locale } from '../../types'

export function fixPlusMinus(string: string, locale: Locale) {
	let pattern = '(\\+\\-)|(\\-\\+)'
	let re = new RegExp(pattern, 'g')
	let replacement = locale.plusMinus

	return string.replace(re, replacement)
}
