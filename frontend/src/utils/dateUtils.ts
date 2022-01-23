export function parseDate(date: Date): string {
	const currentDate = new Date();

	if (currentDate.getDay() > date.getDay()) {
		return date.toLocaleDateString();
	}

	return "Today at " + date.toLocaleTimeString("en-US", { timeStyle: "short" });
}

export const parseTime = (date: Date): string => {
	const time = date.toLocaleTimeString("en-US", { timeStyle: "short" }).split(" ")[0].toString();

	return time;
};
