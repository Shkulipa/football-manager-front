interface ITruncateMiddleProps {
	text: string;
	maxLength: number;
	leftChars: number;
	rightChars: number;
}

export function truncateMiddle({
	text,
	maxLength,
	leftChars,
	rightChars
}: ITruncateMiddleProps) {
	if (text.length <= maxLength) return text;

	const start = text.slice(0, leftChars);
	const end = text.slice(-rightChars);

	return start + '...' + end;
}
