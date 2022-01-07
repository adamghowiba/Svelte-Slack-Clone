// type StateTypes<T> = T extends 'ui' ? UIState : T extends 'channel' ? ChannelState : never;


// function getStateData<Type extends StateOptions>(state: Type): StateTypes<Type> {
// 	const stateData = JSON.parse(localStorage.getItem(stateOptions[state]));

// 	return stateData;
// }

// function setState<Type>(state: Type, value: { [P in keyof Type]: Type[P] }): Type {
// 	const stateData = JSON.parse(localStorage.getItem(stateOptions['channel']));

// 	return stateData;
// }

// function setStateData(state: StateOptions, key: any, value: any): void {
// 	const channelData = getStateData('channel');
// 	channelData[key] = value;

// 	localStorage.setItem(stateOptions[state], JSON.stringify(channelData));
// }

// export const fetchUsersList = async (updateCache = false): Promise<User[]> => {
// 	const url = `http://localhost:5000/user`;
// 	const cstore = await caches.open('cstore');
// 	const cacheResponse = await cstore.match(url);

// 	if (cacheResponse) {
// 		if (!updateCache) {
// 			const data = await cacheResponse.json();
// 			return data;
// 		}
// 		cstore.delete(url);
// 	}

// 	const response = await fetch(url, {
// 		method: 'GET',
// 		credentials: 'include'
// 	});

// 	if (!response.ok) throw new Error('Error retriving friends...');

// 	await cstore.put(url, response.clone());
// 	return await response.json();
// };

export {}