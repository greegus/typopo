import {
	removeNbspBetweenMultiCharWords,
	addNbspAfterPreposition,
	addNbspAfterAmpersand,
	addNbspAfterCardinalNumber,
	addNbspAfterOrdinalNumber,
	addNbspWithinOrdinalDate,
	addNbspAfterRomanNumeral,
	fixNbspForNameWithRegnalNumber,
	addNbspBeforePercent,
	addNbspAfterSymbol,
	replaceSpacesWithNbspAfterSymbol,
	fixNbsp,
} from '../../lib/whitespace/nbsp'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Remove non-breaking space between multi-letter words\n', () => {
	const testCase = {
		'vo dvore': 'vo dvore',
		'Ku komore': 'Ku komore',
		'vo vo vo vo': 'vo vo vo vo',
		'vo vo vo': 'vo vo vo',
		'ňa moja': 'ňa moja',
		'Ťa tvoja': 'Ťa tvoja',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				removeNbspBetweenMultiCharWords(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('en-us')), value)
		})
	})
})

describe('Add non-breaking spaces after single-character prepositions\n', () => {
	const testCase = {
		'Koniec. V potoku': 'Koniec. V potoku',
		'Skáče o tyči': 'Skáče o tyči',
		'v obchode a v hospode': 'v obchode a v hospode',
		'v a v a v': 'v a v a v',
		'a з коминів': 'a з коминів',
		'a я іду здоїти': 'a я іду здоїти',
		'a в хырбетї': 'a в хырбетї',
		'што є му вытыкане': 'што є му вытыкане',
		'ся ї не': 'ся ї не',

		// false positives
		'client’s customer': 'client’s customer',
		'Ctrl+I and Ctrl+B or pasting an image.':
			'Ctrl+I and Ctrl+B or pasting an image.',
		'Ctrl-I and Ctrl-B or pasting an image.':
			'Ctrl-I and Ctrl-B or pasting an image.',
		'získává investici $25M na něco': 'získává investici $25M na něco', //no nbsp after $25M
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterPreposition(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('en-us')), value)
		})
	})
})

describe('Add non-breaking space after ampersand\n', () => {
	const testCase = {
		'Bed & Breakfast': 'Bed & Breakfast',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterAmpersand(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('en-us')), value)
		})
	})
})

describe('Add non-breaking space after cardinal number\n', () => {
	const testCase = {
		'5 mm': '5 mm',
		'5 Kč': '5 Kč',
		/* eslint-disable no-irregular-whitespace */
		/* false positives, when number is already bound with abbreviation
		 * Na str.⎵5 je obsah → Na str.⎵5 je obsah
		 * 									 !→ Na str. 5⎵je obsah
		 */
		/* eslint-enable no-irregular-whitespace */
		'Na str. 5 je obsah': 'Na str. 5 je obsah',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterCardinalNumber(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('en-us')), value)
		})
	})
})

describe('Add non-breaking space after ordinal number (en)\n', () => {
	const testCase = {
		'1st amendment': '1st amendment',
		'2nd amendment': '2nd amendment',
		'3rd amendment': '3rd amendment',
		'4th amendment': '4th amendment',
		'18th amendment': '18th amendment',
		'15th March': '15th March',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('en-us')), value)
		})
	})
})

describe('Add non-breaking space after ordinal number (sk, cs, rue, de-de)\n', () => {
	const testCase = {
		'1. dodatok': '1. dodatok',
		'1.dodatok': '1. dodatok',
		'1.štava': '1. štava',
		'10.00': '10.00', // false positive for the example above
		'12. dodatok': '12. dodatok',
		'12. január': '12. január',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, generateLocale('sk')),
				value
			)
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, generateLocale('cs')),
				value
			)
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, generateLocale('de-de')),
				value
			)
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, generateLocale('rue')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('sk')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('cs')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('de-de')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('rue')), value)
		})
	})
})

describe('Add non-breaking space within ordinal date (sk, cs, rue)\n', () => {
	const testCase = {
		'12. 1. 2017': '12. 1. 2017',
		'12.1.2017': '12. 1. 2017',
		'10.00': '10.00', // false positive for the example above
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspWithinOrdinalDate(key, generateLocale('sk')),
				value
			)
			assert.strictEqual(
				addNbspWithinOrdinalDate(key, generateLocale('cs')),
				value
			)
			assert.strictEqual(
				addNbspWithinOrdinalDate(key, generateLocale('rue')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('sk')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('cs')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('rue')), value)
		})
	})
})

describe('Add non-breaking space within ordinal date (de-de)\n', () => {
	const testCase = {
		/*  German standard orthography (Duden) recommends
				only one nbsp (or narrowNbsp) after the day
				and a regular interword space following the month*/
		'12.1.2019': '12. 1. 2019',
		'12. 1. 2019': '12. 1. 2019',
		'10.00': '10.00', // false positive for the example above
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspWithinOrdinalDate(key, generateLocale('de-de')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('de-de')), value)
		})
	})
})

describe('Add non-breaking space after roman numeral (sk, cs, de-de, rue)\n', () => {
	const testCase = {
		'I. kapitola': 'I. kapitola',
		'bola to I. kapitola': 'bola to I. kapitola',
		'III. kapitola': 'III. kapitola',
		'III.kapitola': 'III. kapitola',
		'X. ročník': 'X. ročník',
		'Bol to X. ročník.': 'Bol to X. ročník.',
		'V. ročník': 'V. ročník',
		'L. ročník': 'L. ročník',
		'D. ročník': 'D. ročník',
		'8. V. 1945': '8. V. 1945',
		'8. V.1945': '8. V. 1945',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, generateLocale('sk')),
				value
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, generateLocale('cs')),
				value
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, generateLocale('de-de')),
				value
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, generateLocale('rue')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('sk')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('cs')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('de-de')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('rue')), value)
		})
	})
})

describe('Add non-breaking space after roman numeral (sk, cs, de-de, rue)\nExtra false positive', () => {
	const testCase = {
		// false positive
		'Karel IV.': 'Karel IV.',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, generateLocale('sk')),
				value
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, generateLocale('cs')),
				value
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, generateLocale('de-de')),
				value
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, generateLocale('rue')),
				value
			)
		})
	})
})

describe('Fix non-breaking space around name with regnal number (sk, cs, de-de, rue)\n', () => {
	const testCase = {
		// Place non-breaking space between name and roman numeral
		'Karel IV. byl římsko-německý král.': 'Karel IV. byl římsko-německý král.',
		'Karel IV. byl římsko-německý král.': 'Karel IV. byl římsko-německý král.',
		'Karel IV.': 'Karel IV.',
		//false positive
		'je to IV. cenová skupina': 'je to IV. cenová skupina',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, generateLocale('sk')),
				value
			)
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, generateLocale('cs')),
				value
			)
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, generateLocale('de-de')),
				value
			)
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, generateLocale('rue')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('sk')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('cs')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('de-de')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('rue')), value)
		})
	})
})

describe('Fix non-breaking space around name with regnal number (sk, cs, de-de, rue)\n', () => {
	const testCase = {
		// This example is false positive for English language.
		// This is extra module test to double-check that nbsp is placed correctly around “I” in other languages
		'When I talk to emerging product designers':
			'When I talk to emerging product designers',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('sk')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('cs')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('de-de')), value)
			assert.strictEqual(fixNbsp(key, generateLocale('rue')), value)
		})
	})
})

describe('Fix non-breaking space around name with regnal number (en-us)\n', () => {
	const testCase = {
		// Place non-breaking space between name and roman numeral
		'Charles IV was an emperor.': 'Charles IV was an emperor.',
		'Charles IV was an emperor.': 'Charles IV was an emperor.', // swapped nbsp
		'Charles IV': 'Charles IV',
		'Charles X': 'Charles X',

		// False positives
		'When I talk to emerging product designers':
			'When I talk to emerging product designers',
		'Try Ctrl+I': 'Try Ctrl+I',
		'Sequoia Capital': 'Sequoia Capital',

		// Unsupported
		/* eslint-disable no-irregular-whitespace */
		// It’s more common to use “I + verb” in text than citing regnal names so this case is unsupported for now
		/* eslint-enable no-irregular-whitespace */
		'Charles I': 'Charles I',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('en-us')), value)
		})
	})
})

describe('Add nbsp before percent, permille, permyriad\n', () => {
	const testCase = {
		'20 %': '20 %',
		'20 %–30 %': '20 %–30 %',
		'20 ‰': '20 ‰',
		'20 ‰–30 ‰': '20 ‰–30 ‰',
		'20 ‱': '20 ‱',
		'20 ‱–30 ‱': '20 ‱–30 ‱',

		/* false positives
			 we won't include nbsp, if there was no space in the first place.
			 some languages distinguish when percent is used
			 * as a noun → 20 %
			 * as an adjective → 20%
			 we cannot fix that without additional context
		*/
		'20%': '20%',
		'20%–30%': '20%–30%',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspBeforePercent(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, generateLocale('en-us')), value)
		})
	})
})

describe('Add space after symbol, e.g. ©\n', () => {
	const testCase = {
		'©2017': '© 2017',
		'Company ©2017': 'Company © 2017',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('just unit tests', () => {
			assert.strictEqual(
				addNbspAfterSymbol(key, generateLocale('en-us'), '©'),
				value
			)
		})
	})
})

describe('Replaces various spaces with non-breaking space after symbol, e.g. ©\n', () => {
	const testCase = {
		'Company © 2017': 'Company © 2017',
		'Company © 2017': 'Company © 2017', // hairSpace
		'Company © 2017': 'Company © 2017', // narrowNbsp
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('just unit tests', () => {
			assert.strictEqual(
				replaceSpacesWithNbspAfterSymbol(key, generateLocale('en-us'), '©'),
				value
			)
		})
	})
})
