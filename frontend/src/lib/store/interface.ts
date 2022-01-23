import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const overlay: Writable<boolean> = writable();
