import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type IsMutedContext = {
	isMuted: boolean;
};

const isMutedContextKey = Symbol('isMutedContextKey');

export function setIsMutedContext(isMutedContext: IsMutedContext) {
	setContext(isMutedContextKey, isMutedContext);
}

export function getIsMutedContext() {
	return getContextOrThrow<IsMutedContext>(isMutedContextKey);
}
