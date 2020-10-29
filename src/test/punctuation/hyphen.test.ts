import { fixHyphen, fixSpaceAroundHyphen } from '../../lib/punctuation/hyphen'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Fix spaces around hyphen\n', () => {
	const testCase = {
		'e-shop': 'e-shop', // correct
		'e- shop': 'e-shop',
		'e- shop': 'e-shop', // nbsp
		'e- shop': 'e-shop', // hairSpace
		'e- shop': 'e-shop', // narrowNbsp
		'e -shop': 'e-shop',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit tests', () => {
			assert.strictEqual(
				fixSpaceAroundHyphen(key, generateLocale('en-us')),
				value
			)
		})
		it('module tests', () => {
			assert.strictEqual(fixHyphen(key, generateLocale('en-us')), value)
		})
	})
})
