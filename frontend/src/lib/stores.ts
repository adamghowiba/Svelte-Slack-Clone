import { writable, get, derived } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Notifcation } from "./types";

export const notifcations: Writable<Notifcation[]> = writable([]);

/* 
	Cache strat
	- Cache the data client side with a last updated time.

	- When the user views there friends use a worker to make a request to the database

	- if the last updated time in the database is the same send the cached results from the backend
	- if different make query & update cahce through web worker. 

	ISSUE: When is it determined when a user views there friends?

	ISSUE: Using websockets doesn't update if they're offline.

	Sol: Add custom que events attached to a user in the database. such as
	- NewFriend
	- NewMessages

	Than when the apap loads use web worker to check if that user has any unseen events. 
	If they do run a task specfic to that event to update the client side cache.  
	*/
