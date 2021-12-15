export function parseDate(date: Date): string {
    const currentDate = new Date();

    if (currentDate.getDay() > date.getDay()) {
        return date.toLocaleDateString();
    }

    return "Today at " + date.toLocaleTimeString('en-us', { timeStyle: "short" });
}