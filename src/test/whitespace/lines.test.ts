import { removeEmptyLines } from '../../lib/whitespace/lines'
import assert from 'assert'

describe('Remove empty lines\n', () => {
	const testCase = {
		// Remove excessive empty lines between paragraphs
		'something here\nand over there\n\nand over there\n\n\nand over there':
			'something here\nand over there\nand over there\nand over there',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('should remove excessive empty lines', () => {
			assert.strictEqual(removeEmptyLines(key), value)
		})
	})
})
