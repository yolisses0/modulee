import { getProjectsRepository } from '$lib/project/getProjectsRepository';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const projectsRepository = getProjectsRepository();
	await projectsRepository.initialize();
};
