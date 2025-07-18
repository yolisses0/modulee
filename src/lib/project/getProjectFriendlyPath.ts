import type { ProjectData } from './data/ProjectData';

export function getProjectFriendlyPath(projectData: ProjectData) {
	const { mainInternalModuleId } = projectData.graph;
	return `/projects/${projectData.id}/internalModules/${mainInternalModuleId}/graph`;
}
