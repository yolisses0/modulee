<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
	import { faFileAlt, faProjectDiagram, faSlidersH } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { projectNavbarSelectionContextKey } from '../projectNavbarSelectionContext';
	import { projectDataContextKey } from './projectDataContext';

	const projectDataContext = getRequiredContext(projectDataContextKey);
	const projectNavbarSelectionContext = getRequiredContext(projectNavbarSelectionContextKey);
	const baseUrl = $derived('/projects/' + projectDataContext.projectData.id);
	const internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);
</script>

<div
	class="flex flex-row border-black/50 max-md:justify-around max-md:border-t-2 md:order-1 md:flex-col md:border-r-2"
>
	<a
		class="max-md:horizontal-tab md:vertical-tab"
		href="{baseUrl}/internalModules/{internalModuleIdContext.internalModuleId}/graph"
		data-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'graph'}
	>
		<Fa fw icon={faProjectDiagram} flip="horizontal" />
		<div class="max-md:hidden">Graph</div>
	</a>
	<a
		class="max-md:horizontal-tab md:vertical-tab"
		href="{baseUrl}/rack"
		data-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'rack'}
	>
		<Fa fw icon={faSlidersH} />
		<div class="max-md:hidden">Rack</div>
	</a>
	<a
		href={baseUrl}
		class="max-md:horizontal-tab md:vertical-tab"
		data-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'project'}
	>
		<Fa fw icon={faFileAlt} />
		<div class="max-md:hidden">Project</div>
	</a>
	<div class="flex-1 max-md:hidden"></div>
	<a
		href="/projects"
		aria-label="Home"
		title="Go to projects page"
		class="max-md:horizontal-tab md:vertical-tab"
	>
		<picture>
			<source media="(max-width: 48rem)" srcset="/logo.svg" />
			<source media="(min-width: 48.0625rem)" srcset="/logo-with-name-beta.svg" />
			<img height="16" alt="Modulee logo" style="height: 1rem;" src="/logo.svg" />
		</picture>
	</a>
</div>
