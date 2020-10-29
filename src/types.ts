export type LocaleString =
  | 'sk'
  | 'cs'
  | 'rue'
  | 'en-us'
  | 'de-de'

export interface LocaleOptions {
  quotes: {
    leftDoubleQuote: string
    rightDoubleQuote: string
    leftSingleQuote: string
    rightSingleQuote: string
  }
	numbers: {
    ordinalIndicator: string
	  romanOrdinalIndicator: string
  }
	singleWordAbbreviations: string[]
	multipleWordAbbreviations: string[]
}

export interface Locale {
  locale: LocaleString
	nonLatinLowercase: string
	nonLatinUppercase: string
	nonLatinChars: string
	lowercaseChars: string
	uppercaseChars: string
	allChars: string
	singleQuoteAdepts: string
	leftSingleQuote: string
	rightSingleQuote: string
	apostrophe: string
	singlePrime: string
	doubleQuoteAdepts: string
	leftDoubleQuote: string
	rightDoubleQuote: string
	doublePrime: string
	space: string
	nbsp: string
	hairSpace: string
	narrowNbsp: string
	spaces: string
	terminalPunctuation: string
	terminalQuotes: string
	sentencePausePunctuation: string
	sentencePunctuation: string
	openingBrackets: string
	closingBrackets: string
	ellipsis: string
	hyphen: string
	enDash: string
	emDash: string
	slash: string
	degree: string
	multiplicationSign: string
	ampersand: string
	sectionSign: string
	copyright: string
	registeredTrademark: string
	soundRecordingCopyright: string
	trademark: string
	plus: string
	minus: string
	plusMinus: string
	percent: string
	permille: string
	permyriad: string
	numberSign: string
	webUrlPattern: string
	emailAddressPattern: string
	cardinalNumber: string
	ordinalIndicator: string
	romanNumerals: string
	romanOrdinalIndicator: string
	singleWordAbbreviations: string[]
	multipleWordAbbreviations: string[]
}