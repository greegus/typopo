/* replace 2 periods at the end of the sentence with a single period */
export function removeExtraPeriod(string: string) {
	return string.replace(/\.{2}/g, '.')
}

export function fixPeriod(string: string) {
	return removeExtraPeriod(string)
}
