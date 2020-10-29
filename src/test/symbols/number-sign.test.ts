import {
	removeExtraSpacesAfterNumberSign,
	fixNumberSign,
} from '../../lib/symbols/number-sign'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Remove extra space before number sign\n', () => {
	const testCase = {
		'# 9': '#9',
		'#    9': '#9',
		'# 9': '#9', //nbsp
		'# 9': '#9', //hairSpace
		'# 9': '#9', //narrowNbsp
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				removeExtraSpacesAfterNumberSign(key, generateLocale('en-us')),
				value
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNumberSign(key, generateLocale('en-us')), value)
		})
	})
})
