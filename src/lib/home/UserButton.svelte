<script lang="ts">
	import { getUserDataContext } from '$lib/user/userDataContext';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		route: string;
	}

	const { route }: Props = $props();
	const userDataContext = getUserDataContext();
	const isSelected = $derived(
		route.startsWith('/(home)/account') ||
			route.startsWith('/(home)/users') ||
			route.startsWith('/(home)/signIn'),
	);
</script>

<a
	class="vertical-tab"
	class:vertical-tab-selected={isSelected}
	href={userDataContext.userData ? '/users/' + userDataContext.userData.id : '/signIn'}
>
	<Fa fw icon={faUser} />
	{userDataContext.userData.name}
</a>
