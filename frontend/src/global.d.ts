/// <reference types="@sveltejs/kit" />

interface User {
    username: string
}

interface Message {
    username: string;
    message: string;
    attached: boolean;
    date?: Date;
}
