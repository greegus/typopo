import { fixRegisteredTrademark } from '../../lib/symbols/registered-trademark'
import { fixTypos } from '../../typopo'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Fix registered trademark ®\n', () => {
	const testCase = {
		'(r)': '®',
		'(R)': '®',
		'Company (r)': 'Company®',
		'Company ®': 'Company®',
		'Section 7(r)': 'Section 7(r)',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(
				fixRegisteredTrademark(key, generateLocale('en-us')),
				value
			)
		})
	})
})

describe('Fix registered trademark ®\n', () => {
	const testCase = {
		'( r )': '®',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('integration test', () => {
			assert.strictEqual(fixTypos(key, 'en-us'), value)
		})
	})
})
