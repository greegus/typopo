import localeCs from './cs'
import localeEnUs from './en-us'
import localeRue from './rue'
import localeSk from './sk'
import localeDeDe from './de-de'

import { LocaleOptions, LocaleString, Locale } from '../types'

const typopoLocale: {[key in LocaleString]: LocaleOptions} = {
	'cs': localeCs,
	'en-us': localeEnUs,
	'rue': localeRue,
	'sk': localeSk,
	'de-de': localeDeDe
}

export function generateLocale(locale: LocaleString): Locale {
	const localeOptions = typopoLocale[locale]

	/* Letters */
	const nonLatinLowercase =
	'áäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях'
	const nonLatinUppercase =
		'ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ'
	const nonLatinChars = nonLatinLowercase + nonLatinUppercase
	const lowercaseChars = 'a-z' + nonLatinLowercase
	const uppercaseChars = 'A-Z' + nonLatinUppercase
	const allChars = lowercaseChars + uppercaseChars

	/* Quotes, primes, apostrophes */
	/*
		(39)			dumb single quote
		(8216)		left single quotation mark
		(8217)		right single quotation mark
		(700)		modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe
		(8219)		single high-reversed-9 quotation mark
		(8242)		prime
		(8249)		single left-pointing angle quotation mark
		(8250)		single right-pointing angle quotation mark
	*/
	const singleQuoteAdepts = "‚|'|‘|’|ʼ|‛|′|`|‹|›"
	const leftSingleQuote = localeOptions.quotes.leftSingleQuote
	const rightSingleQuote = localeOptions.quotes.rightSingleQuote
	const apostrophe = '’'
	const singlePrime = '′'
	const doubleQuoteAdepts =
		'„|“|”|"|«|»|″|,{2,}|‘{2,}|’{2,}|\'{2,}|‹{2,}|›{2,}|′{2,}'
	const leftDoubleQuote = localeOptions.quotes.leftDoubleQuote
	const rightDoubleQuote = localeOptions.quotes.rightDoubleQuote
	const doublePrime = '″'

	/* Spaces */
	const space = ' '
	const nbsp = ' '
	const hairSpace = ' ' //&#8202;
	const narrowNbsp = ' ' //&#8239;
	const spaces = space + nbsp + hairSpace + narrowNbsp

	/* Punctuation*/
	const terminalPunctuation = '\\.\\!\\?'
	const terminalQuotes = rightSingleQuote + rightDoubleQuote
	const sentencePausePunctuation = '\\,\\:\\;'
	const sentencePunctuation = sentencePausePunctuation + terminalPunctuation // there is no ellipsis in the set as it is being used throughout a sentence in the middle. Rethink this group to split it into end-sentence punctuation and middle sentence punctuation
	const openingBrackets = '\\(\\[\\{'
	const closingBrackets = '\\)\\]\\}'
	const ellipsis = '…'
	const hyphen = '-'
	const enDash = '–'
	const emDash = '—'
	const slash = '/'

	/* Symbols*/
	const degree = '°'
	const multiplicationSign = '×'
	const ampersand = '&'
	const sectionSign = '§'
	const copyright = '©'
	const registeredTrademark = '®'
	const soundRecordingCopyright = '℗'
	const trademark = '™'
	const plus = '+'
	const minus = '−'
	const plusMinus = '±'
	const percent = '%'
	const permille = '‰'
	const permyriad = '‱'
	const numberSign = '#'

	/*
		Source for webUrlPattern, emailAddressPattern
		http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
	*/
	const webUrlPattern =
		"((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)" +
		'\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_' +
		"\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?" +
		'((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+' + // named host
		'(?:' + // plus top level domain
		'(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])' +
		'|(?:biz|b[abdefghijmnorstvwyz])' +
		'|(?:cat|com|coop|c[acdfghiklmnoruvxyz])' +
		'|d[ejkmoz]' +
		'|(?:edu|e[cegrstu])' +
		'|f[ijkmor]' +
		'|(?:gov|g[abdefghilmnpqrstuwy])' +
		'|h[kmnrtu]' +
		'|(?:info|int|i[delmnoqrst])' +
		'|(?:jobs|j[emop])' +
		'|k[eghimnrwyz]' +
		'|l[abcikrstuvy]' +
		'|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])' +
		'|(?:name|net|n[acefgilopruz])' +
		'|(?:org|om)' +
		'|(?:pro|p[aefghklmnrstwy])' +
		'|qa' +
		'|r[eouw]' +
		'|s[abcdeghijklmnortuvyz]' +
		'|(?:tel|travel|t[cdfghjklmnoprtvwz])' +
		'|u[agkmsyz]' +
		'|v[aceginu]' +
		'|w[fs]' +
		'|y[etu]' +
		'|z[amw]))' +
		'|(?:(?:25[0-5]|2[0-4]' + // or ip address
		'[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]' +
		'|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]' +
		'[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}' +
		'|[1-9][0-9]|[0-9])))' +
		'(?:\\:\\d{1,5})?)' + // plus option port number +
		'(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~' + // plus option query params
		"\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?" +
		'(?:\\b|$)' // and finally, a word boundary or end of
	// input.  This is to stop foo.sure from
	// matching as foo.su

	/* Email pattern */
	const emailAddressPattern =
		'[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}' +
		'\\@' +
		'[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}' +
		'(' +
		'\\.' +
		'[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}' +
		')+'

	/* Numbers */
	const cardinalNumber = '\\d'
	const ordinalIndicator = localeOptions.numbers.ordinalIndicator
	const romanNumerals = 'IVXLCDM'
	const romanOrdinalIndicator =
		localeOptions.numbers.romanOrdinalIndicator

	/* Single-word abbreviations from all locales

		Make a list of Single-word abbreviations from all locales
	*/
	const singleWordAbbreviations = [ ...localeOptions?.singleWordAbbreviations || [] ]

	/* multiple-word abbreviations from all locales

		Make a list of multiple-word abbreviations from all locales
	*/
	const multipleWordAbbreviations = [...localeOptions?.multipleWordAbbreviations || []]


	return {
		locale,
		nonLatinLowercase,
		nonLatinUppercase,
		nonLatinChars,
		lowercaseChars,
		uppercaseChars,
		allChars,
		singleQuoteAdepts,
		leftSingleQuote,
		rightSingleQuote,
		apostrophe,
		singlePrime,
		doubleQuoteAdepts,
		leftDoubleQuote,
		rightDoubleQuote,
		doublePrime,
		space,
		nbsp,
		hairSpace,
		narrowNbsp,
		spaces,
		terminalPunctuation,
		terminalQuotes,
		sentencePausePunctuation,
		sentencePunctuation,
		openingBrackets,
		closingBrackets,
		ellipsis,
		hyphen,
		enDash,
		emDash,
		slash,
		degree,
		multiplicationSign,
		ampersand,
		sectionSign,
		copyright,
		registeredTrademark,
		soundRecordingCopyright,
		trademark,
		plus,
		minus,
		plusMinus,
		percent,
		permille,
		permyriad,
		numberSign,
		webUrlPattern,
		emailAddressPattern,
		cardinalNumber,
		ordinalIndicator,
		romanNumerals,
		romanOrdinalIndicator,
		singleWordAbbreviations,
		multipleWordAbbreviations,
	}
}
