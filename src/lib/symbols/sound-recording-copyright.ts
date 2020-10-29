import { addSpaceBeforeSymbol } from '../whitespace/spaces'
import {
	addNbspAfterSymbol,
	replaceSpacesWithNbspAfterSymbol,
} from '../whitespace/nbsp'
import { Locale } from '../../types'

function replaceCwithCopyright(string: string, locale: Locale) {
	let pattern =
		'(\\(p\\))([' + locale.spaces + ']?)(' + locale.cardinalNumber + ')'
	let re = new RegExp(pattern, 'gi')
	let replacement = locale.soundRecordingCopyright + '$2$3'

	return string.replace(re, replacement)
}

export function fixSoundRecordingCopyright(string: string, locale: Locale) {
	string = replaceCwithCopyright(string, locale)
	string = addSpaceBeforeSymbol(string, locale, locale.soundRecordingCopyright)
	string = addNbspAfterSymbol(string, locale, locale.soundRecordingCopyright)
	string = replaceSpacesWithNbspAfterSymbol(
		string,
		locale,
		locale.soundRecordingCopyright
	)

	return string
}
