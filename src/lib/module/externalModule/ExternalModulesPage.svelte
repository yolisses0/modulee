<script lang="ts" generics="T extends ModuleType">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import type { ModuleType } from '$lib/project/ModuleType';
	import { getProjectDataContextOrUndefined } from '$lib/project/ui/projectDataContext';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import { userDataContextKey } from '$lib/user/userDataContext';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleItem from './ExternalModuleItem.svelte';
	import ExternalModulesFiltersForm from './ExternalModulesFiltersForm.svelte';
	import InfiniteList from './InfiniteList.svelte';
	import { Loader } from './Loader.svelte';

	interface Props {
		title: string;
		moduleType?: T;
		showCloseButton: boolean;
	}

	const loader = new Loader(getPath);
	const userDataContext = getRequiredContext(userDataContextKey);
	const { title, moduleType, showCloseButton }: Props = $props();
	const projectDataContext = getProjectDataContextOrUndefined();
	let filters = $state({ text: '', sort: '', group: '', moduleType: moduleType ?? '' });

	function clearFilters() {
		filters.text = '';
		filters.group = '';
		filters.moduleType = moduleType ?? '';
		loader.resetState();
	}

	function getPath(loader: Loader<ExternalModuleData<T>>) {
		const queryParams = new URLSearchParams();
		const { text, sort, group, moduleType } = filters;

		if (text) {
			queryParams.append('text', text);
		}

		if (sort) {
			queryParams.append('sort', sort);
		}

		if (moduleType) {
			queryParams.append('moduleType', moduleType);
		}

		if (group === 'liked') {
			queryParams.append('likedBy', userDataContext.userData.id);
		}

		if (projectDataContext?.projectData && group === 'used') {
			queryParams.append('usedIn', projectDataContext.projectData.id);
		}

		if (loader.cursor) queryParams.append('cursor', loader.cursor);

		let path = '/api/externalModules';
		if (queryParams.size > 0) {
			path += '?' + queryParams.toString();
		}
		return path;
	}
</script>

<ListPageLayout {title} {showCloseButton}>
	{#snippet sideBar()}
		<ExternalModulesFiltersForm bind:values={filters} {loader} {moduleType} />
	{/snippet}

	<InfiniteList {loader}>
		{#snippet children(externalModuleData: ExternalModuleData<T>)}
			<ExternalModuleItem {externalModuleData} />
		{/snippet}
		{#snippet emptyStateButtons()}
			<button class="common-button" onclick={clearFilters}> Clear filters </button>
		{/snippet}
	</InfiniteList>
</ListPageLayout>
