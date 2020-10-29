import { fixSectionSign } from '../../lib/symbols/section-sign'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Fix section sign (§)\n', () => {
	const testCase = {
		'under Law§1782': 'under Law § 1782',
		'(e.g.§§13–21)': '(e.g. §§ 13–21)',
		'(§§13–21)': '(§§ 13–21)',
		'(§13–21)': '(§ 13–21)',
		'under Law §1782': 'under Law § 1782',
		'(e.g. §§13–21)': '(e.g. §§ 13–21)',
		'under Law § 1782': 'under Law § 1782',
		'(e.g. §§ 13–21)': '(e.g. §§ 13–21)',
		'(e.g. §§ 13–21)': '(e.g. §§ 13–21)', // hairSpace
		'(e.g. §§ 13–21)': '(e.g. §§ 13–21)', // narrowNbsp
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('', () => {
			assert.strictEqual(
				fixSectionSign(key, generateLocale('en-us')),
				value
			)
		})
	})
})
