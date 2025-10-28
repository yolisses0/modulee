import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { addAutoNodes } from './autoNodes/addAutoNodes';
import { cloneGraphRegistry } from './cloneGraphRegistry';
import { addControlNodes } from './fallbackNodes/addControlNodes';
import { removeConnectionsToMissingNodes } from './fallbackNodes/removeConnectionsToMissingNodes';
import { flattenModuleNodes } from './flattenModuleNodes/flattenModuleNodes';
import { internalizeModules } from './internalizeModules/internalizeModules';
import { removeReferencesToMissingModules } from './removeReferencesToMissingModules/removeReferencesToMissingModules';
import { replaceAudioInputNodes } from './replaceAudioInputNodes/replaceAudioInputNodes';

export function getProcessedGraphRegistry(graphRegistry: GraphRegistry) {
	// Uses clones since graphRegistry is mutated
	graphRegistry = cloneGraphRegistry(graphRegistry);

	internalizeModules(graphRegistry);
	removeReferencesToMissingModules(graphRegistry);
	removeConnectionsToMissingNodes(graphRegistry);
	replaceAudioInputNodes(graphRegistry);
	addAutoNodes(graphRegistry);
	addControlNodes(graphRegistry);
	flattenModuleNodes(graphRegistry);
	// makeStereo(graphRegistry);

	// downloadJson(getGraphData(graphRegistry), 'graphData.json');

	return graphRegistry;
}
