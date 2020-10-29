import { fixCopyright } from '../../lib/symbols/copyright'
import { fixTypos } from '../../typopo'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Fix copyright ©\n', () => {
	const testCase = {
		'(c)2017': '© 2017',
		'Company (c)2017': 'Company © 2017',
		'Company (C)2017': 'Company © 2017',
		'Company ©2017': 'Company © 2017',
		'Company © 2017': 'Company © 2017',
		'Company(c) 2017': 'Company © 2017',
		'Company(C) 2017': 'Company © 2017',
		'Company© 2017': 'Company © 2017',
		'Sec­tion 7(c)': 'Sec­tion 7(c)',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(fixCopyright(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix copyright ©\n', () => {
	const testCase = {
		'( c ) 2017': '© 2017',
		'( c     ) 2017': '© 2017',
		'( c )2017': '© 2017',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('integration test', () => {
			assert.strictEqual(fixTypos(key, 'en-us'), value)
		})
	})
})
