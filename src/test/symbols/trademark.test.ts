import { fixTrademark } from '../../lib/symbols/trademark'
import { fixTypos } from '../../typopo'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Fix trademark ™\n', () => {
	const testCase = {
		'(tm)': '™',
		'(TM)': '™',
		'Company (tm)': 'Company™',
		'Company ™': 'Company™',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('', () => {
			assert.strictEqual(fixTrademark(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix trademark ™\n', () => {
	const testCase = {
		'( tm )': '™',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('integration test', () => {
			assert.strictEqual(fixTypos(key, 'en-us'), value)
		})
	})
})
