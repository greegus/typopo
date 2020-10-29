import { fixPlusMinus } from '../../lib/symbols/plus-minus'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Fix plus-minus symbol ±\n', () => {
	const testCase = {
		'+-': '±',
		'-+': '±',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('', () => {
			assert.strictEqual(fixPlusMinus(key, generateLocale('en-us')), value)
		})
	})
})
