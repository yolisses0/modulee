import { getZoomContext } from '$lib/ui/zoomContext';

export class ZoomInContextualCommand {
	zoomContext = getZoomContext();

	execute() {
		this.zoomContext.zoom += 1;
	}
}
