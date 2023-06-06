const TIME_INDEX_START = 11;
const TIME_INDEX_END = 19;

export const timerFormatter = (timeInSeconds: number) => {
	const date = new Date(timeInSeconds * 1000);
	return date.toISOString().substring(TIME_INDEX_START, TIME_INDEX_END);
};
