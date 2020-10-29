import { fixPeriod } from '../../lib/punctuation/period'
import assert from 'assert'

describe('Replace 2 periods at the end of the sentecne with a single period\n', () => {
	const testCase = {
		'Sentence ending..': 'Sentence ending.',
		'He is a vice president at Apple Inc..':
			'He is a vice president at Apple Inc.',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('', () => {
			assert.strictEqual(fixPeriod(key), value)
		})
	})
})
