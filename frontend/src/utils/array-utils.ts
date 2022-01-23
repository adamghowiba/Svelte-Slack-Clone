export const groupChannelsByKey = <T>(data: T, key: string, ungrouped = 'channel') => {
	let result: unknown;

	if (data instanceof Array) {
		result = data.reduce(function (acc, val) {
			if (!val[key] || val[key] == '') {
				(acc[ungrouped] = acc[ungrouped] || []).push(val);
			} else {
				(acc[val[key]] = acc[val[key]] || []).push(val);
			}
			return acc;
		}, {});
	}

	return result;
};
