<script lang="ts">
	import UserPage from '$lib/user/UserPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
</script>

<UserPage userData={data.userData} />
