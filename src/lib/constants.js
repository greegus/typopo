import loc from "../locale/locale";

export default class Constants {
	constructor(locale) {
		/* Letters */
		this.nonLatinLowercase = "áäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
		this.nonLatinUppercase = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ";
		this.nonLatinChars = this.nonLatinLowercase + this.nonLatinUppercase;
		this.lowercaseChars = "a-z" + this.nonLatinLowercase;
		this.uppercaseChars = "A-Z" + this.nonLatinUppercase;
		this.allChars = this.lowercaseChars + this.uppercaseChars;

		/* Quotes, primes, apostrophes */
		/*
			(39)			dumb single quote
			(8216)		left single quotation mark
			(8217)		right single quotation mark
			(700)		modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe
			(8219)		single high-reversed-9 quotation mark
			(8242)		prime
			(8249)		single left-pointing angle quotation mark
			(8250)		single right-pointing angle quotation mark
		 */
		this.singleQuoteAdepts = "‚|'|‘|’|ʼ|‛|′|‹|›";
		this.leftSingleQuote = loc.locale[locale].quotes.leftSingleQuote;
		this.rightSingleQuote = loc.locale[locale].quotes.rightSingleQuote;
		this.apostrophe = "’";
		this.singlePrime = "′";
		this.doubleQuoteAdepts = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}";
		this.leftDoubleQuote = loc.locale[locale].quotes.leftDoubleQuote;
		this.rightDoubleQuote = loc.locale[locale].quotes.rightDoubleQuote;
		this.doublePrime = "″";

		/* Spaces */
		this.space = " ";
		this.nbsp = " ";
		this.hairSpace = " "; //&#8202;
		this.narrowNbsp = " "; //&#8239;
		this.spaces = this.space + this.nbsp + this.hairSpace + this.narrowNbsp;

		/* Punctuation*/
		this.terminalPunctuation = "\.\!\?";
		this.sentencePunctuation = "\,\:\;" + this.terminalPunctuation; // there is no ellipsis in the set as it is being used throughout a sentence in the middle. Rethink this group to split it into end-sentence punctuation and middle sentence punctuation
		this.openingBrackets = "\\(\\[\\{";
		this.closingBrackets = "\\)\\]\\}";
		this.ellipsis = "…";

		/* Symbols*/
		this.degree = "°";
		this.multiplicationSign = "×";
		this.ampersand = "&";

		/*
			Source for webUrlPattern, emailAddressPattern
			http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
		*/
		this.webUrlPattern = "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)" +
			"\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_" +
			"\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?" +
			"((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+" +  // named host
			"(?:" + // plus top level domain
			"(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])" +
			"|(?:biz|b[abdefghijmnorstvwyz])" +
			"|(?:cat|com|coop|c[acdfghiklmnoruvxyz])" +
			"|d[ejkmoz]" +
			"|(?:edu|e[cegrstu])" +
			"|f[ijkmor]" +
			"|(?:gov|g[abdefghilmnpqrstuwy])" +
			"|h[kmnrtu]" +
			"|(?:info|int|i[delmnoqrst])" +
			"|(?:jobs|j[emop])" +
			"|k[eghimnrwyz]" +
			"|l[abcikrstuvy]" +
			"|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])" +
			"|(?:name|net|n[acefgilopruz])" +
			"|(?:org|om)" +
			"|(?:pro|p[aefghklmnrstwy])" +
			"|qa" +
			"|r[eouw]" +
			"|s[abcdeghijklmnortuvyz]" +
			"|(?:tel|travel|t[cdfghjklmnoprtvwz])" +
			"|u[agkmsyz]" +
			"|v[aceginu]" +
			"|w[fs]" +
			"|y[etu]" +
			"|z[amw]))" +
			"|(?:(?:25[0-5]|2[0-4]" + // or ip address
			"[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]" +
			"|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]" +
			"[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}" +
			"|[1-9][0-9]|[0-9])))" +
			"(?:\\:\\d{1,5})?)" + // plus option port number +
			"(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~" + // plus option query params
			"\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?" +
			"(?:\\b|$)"; // and finally, a word boundary or end of
		// input.  This is to stop foo.sure from
		// matching as foo.su

		/* Email pattern */
		this.emailAddressPattern = "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}" +
			"\\@" +
			"[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
			"(" +
			"\\." +
			"[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
			")+";


		/* Numbers */
		this.cardinalNumber = "\\d+";
		this.ordinalIndicator = loc.locale[locale].numbers.ordinalIndicator;
		this.romanNumerals = "IVXLCDM";
		this.romanOrdinalIndicator = loc.locale[locale].numbers.romanOrdinalIndicator;
	}
}
