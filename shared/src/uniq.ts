import { v5 as uuidv5 } from 'uuid';
import { ulid, decodeTime } from 'ulidx';

const adamId = 'adam';
const markId = 'john';
const privateId = uuidv5(adamId + markId, uuidv5.URL);

const timeId = ulid();

console.log(timeId);


// Discord just sends the receipments involved
const response = {
	id: '928753070089838612',
	type: 1,
	last_message_id: null,
	recipients: [
		{ id: '871435283701334036', username: 'rifathms', avatar: 'd6f5b15e662a025e65cabf3fc3ac75dd', discriminator: '9391', public_flags: 0 }
	]
};
