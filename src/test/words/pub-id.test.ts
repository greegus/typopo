import {
	fixPubId,
	fixISSN,
	fixISBN10,
	fixISBN13,
	fixISBNnumber,
} from '../../lib/words/pub-id'
import assert from 'assert'
import { generateLocale } from '../../locale/locale'

describe('Fix ISSN format\n', () => {
	const testCase = {
		'ISSN 0000 - 0000': 'ISSN 0000-0000',
		'Issn 0000 - 0000': 'ISSN 0000-0000',
		'issn 0000 - 0000': 'ISSN 0000-0000',
		'ISSN 0000—0000': 'ISSN 0000-0000',
		'ISSN: 0000 - 0000': 'ISSN: 0000-0000',
		'ISSN:0000 - 0000': 'ISSN: 0000-0000',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(fixISSN(key, generateLocale('en-us')), value)
		})
		it('module test', () => {
			assert.strictEqual(fixPubId(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix ISBN10 format\n', () => {
	const testCase = {
		'ISBN 80 - 902734 - 1 - 6': 'ISBN 80-902734-1-6',
		'Isbn 80 - 902734 - 1 - 6': 'ISBN 80-902734-1-6',
		'isbn 80 - 902734 - 1 - 6': 'ISBN 80-902734-1-6',
		'ISBN 80—902734—1—6': 'ISBN 80-902734-1-6',
		'ISBN: 80 - 902734 - 1 - 6': 'ISBN: 80-902734-1-6',
		'ISBN:80 - 902734 - 1 - 6': 'ISBN: 80-902734-1-6',
		'ISBN:0-9752298-0-X': 'ISBN: 0-9752298-0-X',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(fixISBN10(key, generateLocale('en-us')), value)
		})
		it('module test', () => {
			assert.strictEqual(fixPubId(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix ISBN13 format\n', () => {
	const testCase = {
		'ISBN 978 - 80 - 902734 - 1 - 6': 'ISBN 978-80-902734-1-6',
		'Isbn 978 - 80 - 902734 - 1 - 6': 'ISBN 978-80-902734-1-6',
		'isbn 978 - 80 - 902734 - 1 - 6': 'ISBN 978-80-902734-1-6',
		'ISBN 978 - 80—902734—1—6': 'ISBN 978-80-902734-1-6',
		'ISBN: 978 - 80 - 902734 - 1 - 6': 'ISBN: 978-80-902734-1-6',
		'ISBN:978 - 80 - 902734 - 1 - 6': 'ISBN: 978-80-902734-1-6',
		'ISBN:978 - 0-9752298-0-X': 'ISBN: 978-0-9752298-0-X',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(fixISBN13(key, generateLocale('en-us')), value)
		})
		it('module test', () => {
			assert.strictEqual(fixPubId(key, generateLocale('en-us')), value)
		})
	})
})

describe('Fix ISBN number\n', () => {
	const testCase = {
		'978 - 80 - 902734 - 1 - 6': '978-80-902734-1-6',
		'978 - 80—902734—1—6': '978-80-902734-1-6',
		'978 - 0-9752298-0-X': '978-0-9752298-0-X',
		'978 - 99921 - 58 - 10 - 7': '978-99921-58-10-7',
		'978 - 9971 - 5 - 0210 - 0': '978-9971-5-0210-0',
		'978 - 960 - 425 - 059 - 0': '978-960-425-059-0',
		'978 - 85 - 359 - 0277 - 5': '978-85-359-0277-5',
		'978 - 1 - 84356 - 028 - 3': '978-1-84356-028-3',
		'978 - 0 - 684 - 84328 - 5': '978-0-684-84328-5',
		'978 - 0 - 8044 - 2957 - X': '978-0-8044-2957-X',
		'978 - 0 - 85131 - 041 - 9': '978-0-85131-041-9',
		'978 - 93 - 86954 - 21 - 4': '978-93-86954-21-4',
		'978 - 0 - 943396 - 04 - 2': '978-0-943396-04-2',
		'978 - 0 - 9752298 - 0 - X': '978-0-9752298-0-X',
	}

	Object.entries(testCase).forEach(([key, value]) => {
		it('unit test', () => {
			assert.strictEqual(fixISBNnumber(key, generateLocale('en-us')), value)
		})
		it('module test', () => {
			assert.strictEqual(fixPubId(key, generateLocale('en-us')), value)
		})
	})
})
