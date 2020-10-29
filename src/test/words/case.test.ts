import assert from 'assert'
import { fixCase } from '../../lib/words/case'
import { generateLocale } from '../../locale/locale'

describe('Corrects accidental uPPERCASE\n', () => {
	const testCase = {
		cAPSLOCK: 'capslock',
		'(cAPSLOCK)': '(capslock)',
		'Central Europe and Cyrillic tests: aĎIÉUБUГ':
			'Central Europe and Cyrillic tests: aďiéuбuг',
		'Hey, JEnnifer!': 'Hey, Jennifer!',

		// false positives
		CMSko: 'CMSko',
		FPs: 'FPs',
		ČSNka: 'ČSNka',
		BigONE: 'BigONE', // specific brand names
		'two Panzer IVs': 'two Panzer IVs',
		'How about ABC?': 'How about ABC?',
		iPhone: 'iPhone',

		iOS: 'iOS',
		macOS: 'macOS',
		kW: 'kW',
		mA: 'mA',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('', () => {
			assert.strictEqual(fixCase(key, generateLocale('en-us')), value)
		})
	})
})
