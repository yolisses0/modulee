<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ProjectData } from '../data/ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	let form: HTMLFormElement;
	const { projectData }: Props = $props();

	function handleChange() {
		form.requestSubmit();
	}
</script>

<form
	method="post"
	class="contents"
	action="?/patch"
	bind:this={form}
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<label class="flex flex-col">
		Name
		<input
			required
			type="text"
			name="name"
			maxlength="100"
			onchange={handleChange}
			value={projectData.name}
			class="rounded border border-white/10 bg-transparent p-2"
		/>
	</label>
	<div>
		Type
		<div class="flex flex-row gap-2" onchange={handleChange}>
			<label class="common-button">
				<input
					required
					id="effect"
					type="radio"
					value="effect"
					name="moduleType"
					checked={projectData.moduleType === 'effect'}
				/>
				Effect
			</label>
			<label class="common-button">
				<input
					required
					type="radio"
					id="instrument"
					name="moduleType"
					value="instrument"
					checked={projectData.moduleType === 'instrument'}
				/>
				Instrument
			</label>
			<label class="common-button">
				<input
					required
					type="radio"
					id="utility"
					value="utility"
					name="moduleType"
					checked={projectData.moduleType === 'utility'}
				/>
				Utility
			</label>
		</div>
	</div>
	<label class="flex flex-col">
		Description
		<textarea
			name="description"
			onchange={handleChange}
			value={projectData.description}
			class="rounded border border-white/10 bg-transparent p-2"
		></textarea>
	</label>
</form>
