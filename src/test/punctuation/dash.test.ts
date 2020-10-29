import {
	replaceThreeHyphensWithEmDash,
	replaceTwoHyphensWithEnDash,
	replaceSpacedHyphenWithDash,
	consolidateSpacedDashes,
	fixDashSpacesBetweenWords,
	fixHyphenBetweenWordAndPunctuation,
	fixDashBetweenCardinalNumbers,
	fixDashBetweenPercentageRange,
	fixDashBetweenOrdinalNumbers,
	fixDash,
} from '../../lib/punctuation/dash'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Replace 3 hyphens with an em dash\n', () => {
	const testCase = {
		'and --- she said': 'and — she said',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceThreeHyphensWithEmDash(key),
				value
			)
		})
	})
})

describe('Replace 2 hyphens with an en dash\n', () => {
	const testCase = {
		'and -- she said': 'and – she said',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceTwoHyphensWithEnDash(key),
				value
			)
		})
	})
})

describe('Replace spaced hyphen with an em dash (en-us, sk, cs, rue)\n', () => {
	const testCase = {
		'and - she said': 'and — she said',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceSpacedHyphenWithDash(key, generateLocale('en-us')),
				value
			)
			assert.strictEqual(
				replaceSpacedHyphenWithDash(key, generateLocale('cs')),
				value
			)
		})
	})
})

describe('Replace spaced hyphen with an en dash (de-de)\n', () => {
	const testCase = {
		'und - er sagte': 'und – er sagte',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceSpacedHyphenWithDash(key, generateLocale('de-de')),
				value
			)
		})
	})
})

describe('Replace spaced en dash with an em dash (en-us, sk, cs, rue)\n', () => {
	const testCase = {
		'and – she said': 'and — she said',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				consolidateSpacedDashes(key, generateLocale('en-us')),
				value
			)
			assert.strictEqual(
				consolidateSpacedDashes(key, generateLocale('sk')),
				value
			)
		})
	})
})

describe('Replace spaced em dash with an en dash (de-de)\n', () => {
	const testCase = {
		'und — sie sagte': 'und – sie sagte',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				consolidateSpacedDashes(key, generateLocale('de-de')),
				value
			)
		})
	})
})

describe('Fix dash spaces between words (en-us)\n', () => {
	const testCase = {
		'and — she said': 'and—she said',
		'and — she said': 'and—she said', //mixed spaces
		'and— she said': 'and—she said',
		'and —she said': 'and—she said',
		'and—she said': 'and—she said',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, generateLocale('en-us')),
				value
			)
		})
	})
})

describe('Fix dash spaces between words (rue, sk)\n', () => {
	const testCase = {
		'and — she said': 'and — she said',
		'and—she said': 'and — she said',
		'and —she said': 'and — she said',
		'and —čadič': 'and — čadič',
		'and —Čadič': 'and — Čadič',
		'Радостна комната —': 'Радостна комната —', //false positive
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, generateLocale('rue')),
				value
			)
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, generateLocale('sk')),
				value
			)
		})
	})
})

describe('Fix dash spaces between words (cs)\n', () => {
	const testCase = {
		'and — she said': 'and – she said',
		'and—she said': 'and – she said',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, generateLocale('cs')),
				value
			)
		})
	})
})

describe('Fix dash spaces between words (de-de) \n', () => {
	const testCase = {
		'und –sie sagte': 'und – sie sagte',
		'und– sie sagte': 'und – sie sagte',
		'und – sie sagte': 'und – sie sagte', //mixed spaces
		'und–sie sagte': 'und – sie sagte',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, generateLocale('de-de')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, generateLocale('de-de')), value)
		})
	})
})

describe('Fix hyphen between word and punctuation (en-us)\n', () => {
	const testCase = {
		'so there is a dash -,': 'so there is a dash—,',
		'so there is a dash-,': 'so there is a dash—,',
		'so there is a dash -:': 'so there is a dash—:',
		'so there is a dash -;': 'so there is a dash—;',
		'so there is a dash -.': 'so there is a dash—.',
		'so there is a dash -?': 'so there is a dash—?',
		'so there is a dash -!': 'so there is a dash—!',
		'so there is a dash -\n': 'so there is a dash—\n',

		//false positives
		'e-shop': 'e-shop',
		'e- shop': 'e- shop', // this individual method shouldn't catch that
		'+-': '+-',
		'{{test-variable}}': '{{test-variable}}',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix hyphen between word and punctuation (sk, rue)\n', () => {
	const testCase = {
		'so there is a dash -,': 'so there is a dash —,', //hairSpace
		'so there is a dash -.': 'so there is a dash —.',
		'so there is a dash -\n': 'so there is a dash —\n',

		//false positives
		'e-shop': 'e-shop',
		'e- shop': 'e- shop', // this individual method shouldn't catch that
		'+-': '+-',
		'{{test-variable}}': '{{test-variable}}',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, generateLocale('sk')),
				value
			)
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, generateLocale('rue')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, generateLocale('sk')), value)
			assert.strictEqual(fixDash(key, generateLocale('rue')), value)
		})
	})
})

describe('Fix hyphen between word and punctuation (cs)\n', () => {
	const testCase = {
		'so there is a dash -,': 'so there is a dash –,', //nbsp + enDash
		'so there is a dash -.': 'so there is a dash –.',
		'so there is a dash -\n': 'so there is a dash –\n',

		//false positives
		'e-shop': 'e-shop',
		'e- shop': 'e- shop', // this individual method shouldn't catch that
		'+-': '+-',
		'{{test-variable}}': '{{test-variable}}',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, generateLocale('cs')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, generateLocale('cs')), value)
		})
	})
})

describe('Fix hyphen between word and punctuation (de-de)\n', () => {
	const testCase = {
		'so there is a dash -,': 'so there is a dash –,', //hairSpace + enDash
		'so there is a dash -.': 'so there is a dash –.',
		'so there is a dash -\n': 'so there is a dash –\n',

		//false positives
		'e-shop': 'e-shop',
		'e- shop': 'e- shop', // this individual method shouldn't catch that
		'+-': '+-',
		'{{test-variable}}': '{{test-variable}}',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, generateLocale('de-de')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, generateLocale('de-de')), value)
		})
	})
})

describe('Fix dash between cardinal numbers\n', () => {
	const testCase = {
		'5-6 eggs': '5–6 eggs',
		'15-16 eggs': '15–16 eggs',
		'5 -6 eggs': '5–6 eggs',
		'5- 6 eggs': '5–6 eggs',
		'5 - 6 eggs': '5–6 eggs',
		'5—6 eggs': '5–6 eggs',
		'5-12″ long': '5–12″ long',
		'In 5.25-10.75 range': 'In 5.25–10.75 range',
		'In 5,000.25-10,000.75 range': 'In 5,000.25–10,000.75 range',
		'v rozmedzí 5,25-10,75': 'v rozmedzí 5,25–10,75',
		'v rozmedzí 5 000,25-10 000,75': 'v rozmedzí 5 000,25–10 000,75',
		'2-3 Eier': '2–3 Eier',
		'2 -3 Eier': '2–3 Eier',
		'2- 3 Eier': '2–3 Eier',
		'2 - 3 Eier': '2–3 Eier',
		'2—3 Eier': '2–3 Eier',
		'im Bereich von 5.000,25-10.000,75': 'im Bereich von 5.000,25–10.000,75',

		// date formats
		'2019-02-03': '2019–02–03',
		'2019 - 02 - 03': '2019–02–03',
		'2019- 02 -03': '2019–02–03',
		'2019-02': '2019–02',
		'2019 -02': '2019–02',
		'2019 - 02': '2019–02',
		'2019- 02': '2019–02',
		'19 - 02 - 03': '19–02–03',
		'19- 02 -03': '19–02–03',

		//telephone numbers
		'1–2–3': '1–2–3', // correct
		'1 – 2 – 3': '1–2–3',
		'1– 2 –3': '1–2–3',

		'1-2-3': '1–2–3',
		'1 - 2 - 3': '1–2–3',
		'1- 2 -3': '1–2–3',

		'1—2—3': '1–2–3',
		'1 — 2 — 3': '1–2–3',
		'1— 2 —3': '1–2–3',

		'154-123-4567': '154–123–4567',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashBetweenCardinalNumbers(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix dash between percentage range\n', () => {
	const testCase = {
		'20%-30%': '20%–30%',
		'20% -30%': '20%–30%',
		'20% - 30%': '20%–30%',

		'20%–30%': '20%–30%',
		'20%—30%': '20%–30%',

		'20 %-30 %': '20 %–30 %',
		'20 % -30 %': '20 %–30 %',
		'20 % - 30 %': '20 %–30 %',
		'20 %- 30 %': '20 %–30 %',

		'20 ‰ - 30 ‰': '20 ‰–30 ‰',
		'20 ‱ - 30 ‱': '20 ‱–30 ‱',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashBetweenPercentageRange(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix dash between ordinal numbers (en-us)\n', () => {
	const testCase = {
		'1st-5th August': '1st–5th August',
		'1st -5th August': '1st–5th August',
		'1st- 5th August': '1st–5th August',
		'1st - 5th August': '1st–5th August',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix dash between ordinal numbers (rue, sk, cs, de)\n', () => {
	const testCase = {
		'1.-5. augusta': '1.–5. augusta',
		'1. -5. augusta': '1.–5. augusta',
		'1.- 5. augusta': '1.–5. augusta',
		'1. - 5. augusta': '1.–5. augusta',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, generateLocale('rue')),
				value
			)
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, generateLocale('sk')),
				value
			)
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, generateLocale('cs')),
				value
			)
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, generateLocale('de-de')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, generateLocale('rue')), value)
			assert.strictEqual(fixDash(key, generateLocale('sk')), value)
			assert.strictEqual(fixDash(key, generateLocale('cs')), value)
			assert.strictEqual(fixDash(key, generateLocale('de-de')), value)
		})
	})
})
