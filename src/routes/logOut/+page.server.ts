import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		console.log(event);
	},
} satisfies Actions;
