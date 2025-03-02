import { type ZoomContext } from '$lib/ui/zoomContext';
import type { Command } from './command';

type Contexts = { zoomContext: ZoomContext };

export class ResetZoomCommand implements Command {
	constructor(private contexts: Contexts) {}

	execute() {
		this.contexts.zoomContext.zoom = 20;
	}
}
