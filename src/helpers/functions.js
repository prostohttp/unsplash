export const getDateDiff = (now, before) => {
	const date1 = new Date(before);
	const date2 = new Date(now);
	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
	const res = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return res ? `${res}д.` : "сегодня";
};

export const numWord = (value, words = ["лайк", "лайка", "лайков"]) => {
	value = Math.abs(value) % 100;
	const num = value % 10;
	if (value > 10 && value < 20) return words[2];
	if (num > 1 && num < 5) return words[1];
	if (num === 1) return words[0];
	return words[2];
};
