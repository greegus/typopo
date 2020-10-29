import { Locale } from '../../types'

function fixExponent(string: string, locale: Locale, originalExponent: string, fixedExponent: string) {
	let metrePrefixes =
		'm|dam|hm|km|Mm|Gm|Tm|Pm|Em|Zm|Ym|m|dm|cm|mm|µm|nm|pm|fm|am|zm|ym'
	let pattern =
		'([' +
		locale.spaces +
		locale.slash +
		'])(' +
		metrePrefixes +
		')(' +
		originalExponent +
		')'
	let re = new RegExp(pattern, 'g')
	let replacement = '$1$2' + fixedExponent
	return string.replace(re, replacement)
}

export function fixSquares(string: string, locale: Locale) {
	return fixExponent(string, locale, '2', '²')
}

export function fixCubes(string: string, locale: Locale) {
	return fixExponent(string, locale, '3', '³')
}

export function fixExponents(string: string, locale: Locale) {
	string = fixSquares(string, locale)
	string = fixCubes(string, locale)
	return string
}
