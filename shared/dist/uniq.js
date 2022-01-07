"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const ulidx_1 = require("ulidx");
const adamId = 'adam';
const markId = 'john';
const privateId = (0, uuid_1.v5)(adamId + markId, uuid_1.v5.URL);
const timeId = (0, ulidx_1.ulid)();
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
