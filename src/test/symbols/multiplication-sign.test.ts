import {
	fixMultiplicationSignBetweenNumbers,
	fixMultiplicationSignBetweenWords,
	fixMultiplicationSignBetweenNumberAndWord,
	fixNbspAroundMultiplicationSign,
	fixMultiplicationSign,
} from '../../lib/symbols/multiplication-sign'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Fix multiplication sign between numbers\n', () => {
	const testCase = {
		'5 x 4': '5 × 4',
		'5 X 4': '5 × 4',
		'5″ x 4″': '5″ × 4″',
		'5′ x 4′': '5′ × 4′',

		'5 mm x 5 mm': '5 mm × 5 mm',
		'5 žien X 5 žien': '5 žien × 5 žien',
		'5cm x 5cm': '5cm × 5cm',

		'5 x 4 x 3': '5 × 4 × 3',
		'5″ x 4″ x 3″': '5″ × 4″ × 3″',
		'5 mm x 5 mm x 5 mm': '5 mm × 5 mm × 5 mm',

		'4xenographs': '4xenographs', // false positive
		'0xd': '0xd', //false positive, hex number
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixMultiplicationSignBetweenNumbers(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(
				fixMultiplicationSign(key, generateLocale('en-us')),
				value
			)
		})
	})
})

describe('Fix multiplication sign between words\n', () => {
	const testCase = {
		'š x v x h': 'š × v × h',
		'mm x mm': 'mm × mm',
		'Marciano x Clay': 'Marciano × Clay',
		'žena x žena': 'žena × žena',

		'light xenons': 'light xenons', // false positive
		'František X Šalda': 'František X Šalda', // false positive; noun abbr. in en-us
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixMultiplicationSignBetweenWords(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(
				fixMultiplicationSign(key, generateLocale('en-us')),
				value
			)
		})
	})
})

describe('Fix multiplication sign between a number and a word\n', () => {
	const testCase = {
		'4 x object': '4 × object',
		'4x object': '4× object',
		'4X object': '4× object',
		'4X žena': '4× žena',
		'4 xenographs': '4 xenographs', // false positive
		'4xenographs': '4xenographs', // false positive
		'0xd': '0xd', //false positive, hex number
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixMultiplicationSignBetweenNumberAndWord(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(
				fixMultiplicationSign(key, generateLocale('en-us')),
				value
			)
		})
	})
})

describe('Fix nbsp around multiplication sign\n', () => {
	const testCase = {
		'12x3': '12 × 3',
		'12×3': '12 × 3',
		'12″×3″': '12″ × 3″',
		'12′×3′': '12′ × 3′',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixNbspAroundMultiplicationSign(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(
				fixMultiplicationSign(key, generateLocale('en-us')),
				value
			)
		})
	})
})
