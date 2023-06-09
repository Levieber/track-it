export const timerFormatter = (timeInSeconds: number) => {
	const hours = Math.floor(timeInSeconds / 3600);
	const minutes = Math.floor((timeInSeconds % 3600) / 60);
	const seconds = timeInSeconds % 60;

	return [hours, minutes, seconds]
		.map((v) => v.toString().padStart(2, "0"))
		.join(":");
};
