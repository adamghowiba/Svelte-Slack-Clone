export function parseDate(date: Date): string {
	const currentDate = new Date();

	if (currentDate.getDay() > date.getDay()) {
		return date.toLocaleDateString();
	}

	return 'Today at ' + date.toLocaleTimeString('en-us', { timeStyle: 'short' });
}

export const groupByKey = <T>(array: any[], key: keyof T, uncatogrized = 'none') => {
    const temp = array;
	const grouped = temp.reduce((prev, curr) => {
		prev[curr[key] || uncatogrized] = prev[curr[key] || uncatogrized] || [];
		prev[curr[key] || uncatogrized].push(curr);
		return prev;
	}, []);
    return grouped
};
