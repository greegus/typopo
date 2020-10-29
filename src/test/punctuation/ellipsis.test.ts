import {
	replaceThreeCharsWithEllipsis,
	replaceTwoCharsWithEllipsis,
	replaceTwoPeriodsWithEllipsis,
	fixEllipsisSpacingAroundCommas,
	fixAposiopesisStartingParagraph,
	fixAposiopesisStartingSentence,
	fixAposiopesisBetweenSentences,
	fixAposiopesisBetweenWords,
	fixEllipsisBetweenSentences,
	fixAposiopesisEndingParagraph,
	fixEllipsis,
} from '../../lib/punctuation/ellipsis'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Replace periods/ellipses with a single ellipsis:\n', () => {
	const testCase = {
		/* [1] replace 3 and more dots/ellipses with an ellipsis */
		'Sentence ... another sentence': 'Sentence … another sentence',
		'Sentence .... another sentence': 'Sentence … another sentence',
		'Sentence ..... another sentence': 'Sentence … another sentence',
		'Sentence ending...': 'Sentence ending…',
		'Sentence ending....': 'Sentence ending…',
		'Sentence ending.....': 'Sentence ending…',
		'Sentence ending….....': 'Sentence ending…',
		'Sentence ending….…': 'Sentence ending…',
		'Sentence ending.….....': 'Sentence ending…',

		/* false positives */
		'Sentence ending.': 'Sentence ending.',
		'Sentence ending..': 'Sentence ending..',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceThreeCharsWithEllipsis(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})

describe('Replace combination of period/ellipsis with an ellipsis:\n', () => {
	const testCase = {
		'Sentence ending…': 'Sentence ending…',
		'Sentence ending……': 'Sentence ending…',
		'Sentence ending….': 'Sentence ending…',
		'Sentence ending.…': 'Sentence ending…',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceTwoCharsWithEllipsis(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})

describe('Replace two periods between words (spaces) with an ellipsis:\n', () => {
	const testCase = {
		'Sentence .. another sentence': 'Sentence … another sentence',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceTwoPeriodsWithEllipsis(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix spacing, when ellipsis is used around commas:\n', () => {
	const testCase = {
		'We sell apples, oranges, …, pens.': 'We sell apples, oranges, …, pens.', // neutral
		'We sell apples, oranges,…, pens.': 'We sell apples, oranges, …, pens.',
		'We sell apples, oranges,… , pens.': 'We sell apples, oranges, …, pens.',
		'We sell apples, oranges, … , pens.': 'We sell apples, oranges, …, pens.',
		'We sell apples, oranges, … , pens.': 'We sell apples, oranges, …, pens.', // nbsp
		'We sell apples, oranges, … , pens.': 'We sell apples, oranges, …, pens.', // hair_space
		'We sell apples, oranges, … , pens.': 'We sell apples, oranges, …, pens.', // narrow_nbsp
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixEllipsisSpacingAroundCommas(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix spacing, when aposiopesis is starting a paragraph:\n', () => {
	const testCase = {
		'…да святить ся': '…да святить ся', // correct
		'… да святить ся': '…да святить ся',
		'… да святить ся\n… multiline test': '…да святить ся\n…multiline test',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixAposiopesisStartingParagraph(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix spacing, when aposiopesis is starting a sentence:\n', () => {
	const testCase = {
		'Sentence ended. …and we were there.':
			'Sentence ended. …and we were there.', // neutral
		'Sentence ended. … and we were there.':
			'Sentence ended. …and we were there.',
		'Sentence ended.… and we were there.':
			'Sentence ended. …and we were there.',
		'Sentence ended! …and we were there.':
			'Sentence ended! …and we were there.',
		'Sentence ended! … and we were there.':
			'Sentence ended! …and we were there.',
		'Sentence ended!… and we were there.':
			'Sentence ended! …and we were there.',
		'Sentence ended? … and we were there.':
			'Sentence ended? …and we were there.',
		'Sentence ended?’ … and we were there.':
			'Sentence ended?’ …and we were there.',
		'Sentence ended?’… and we were there.':
			'Sentence ended?’ …and we were there.',
		'Sentence ended?”… and we were there.':
			'Sentence ended?” …and we were there.',
		'We sell apples, oranges, …, pens.': 'We sell apples, oranges, …, pens.', // false positive
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixAposiopesisStartingSentence(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix spacing, when aposiopesis is between sentences:\n', () => {
	const testCase = {
		'Sentence ending… And another starting':
			'Sentence ending… And another starting',
		'Sentence ending … And another starting':
			'Sentence ending… And another starting',
		'Sentence ending …And another starting':
			'Sentence ending… And another starting',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixAposiopesisBetweenSentences(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix spacing, when aposiopesis is between words:\n', () => {
	const testCase = {
		'word… word': 'word… word',
		'word…word': 'word… word',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixAposiopesisBetweenWords(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix spacing, when ellipsis is between sentences:\n', () => {
	const testCase = {
		'What are you saying. … She did not answer.':
			'What are you saying. … She did not answer.',
		'What are you saying. …She did not answer.':
			'What are you saying. … She did not answer.',
		'What are you saying.…She did not answer.':
			'What are you saying. … She did not answer.',

		'What are you saying! … She did not answer.':
			'What are you saying! … She did not answer.',
		'What are you saying! …She did not answer.':
			'What are you saying! … She did not answer.',
		'What are you saying!…She did not answer.':
			'What are you saying! … She did not answer.',

		'What are you saying? … She did not answer.':
			'What are you saying? … She did not answer.',
		'What are you saying? …She did not answer.':
			'What are you saying? … She did not answer.',
		'What are you saying?…She did not answer.':
			'What are you saying? … She did not answer.',

		'‘What are you saying?’ … She did not answer.':
			'‘What are you saying?’ … She did not answer.',
		'‘What are you saying?’ …She did not answer.':
			'‘What are you saying?’ … She did not answer.',
		'‘What are you saying?’…She did not answer.':
			'‘What are you saying?’ … She did not answer.',
		'“What are you saying?”…She did not answer.':
			'“What are you saying?” … She did not answer.',

		/* false positive: keep spaces around aposiopesis, that is used in the middle of a sentence */
		'Sentence using … aposiopesis in the middle of a sentence.':
			'Sentence using … aposiopesis in the middle of a sentence.',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixEllipsisBetweenSentences(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix spacing, when aposiopesis is ending a paragraph:\n', () => {
	const testCase = {
		'Sentence ending…': 'Sentence ending…',
		'Sentence ending …': 'Sentence ending…',
		'Sentence ending …\nSentence ending …':
			'Sentence ending…\nSentence ending…',

		/* false positive
			 keep the space after the sentence punctuation,
			 where … is an ellipsis for other words */
		'Give me some example, e.g. apples, oranges, …':
			'Give me some example, e.g. apples, oranges, …',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixAposiopesisEndingParagraph(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixEllipsis(key, generateLocale('en-us')), value)
		})
	})
})
