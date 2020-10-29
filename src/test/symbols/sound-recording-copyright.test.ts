import { fixSoundRecordingCopyright } from '../../lib/symbols/sound-recording-copyright'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Fix copyright ©\n', () => {
	const testCase = {
		'(p)2017': '℗ 2017',
		'Company (p)2017': 'Company ℗ 2017',
		'Company (P)2017': 'Company ℗ 2017',
		'Company ℗2017': 'Company ℗ 2017',
		'Company ℗ 2017': 'Company ℗ 2017',
		'Company(p) 2017': 'Company ℗ 2017',
		'Company(P) 2017': 'Company ℗ 2017',
		'Company℗ 2017': 'Company ℗ 2017',
		'Sec­tion 7(p)': 'Sec­tion 7(p)',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('', () => {
			assert.strictEqual(
				fixSoundRecordingCopyright(key, generateLocale('en-us')),
				value
			)
		})
	})
})
