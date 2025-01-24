import type { ProjectData } from '$lib/project/ProjectData';
import type { CommandData } from 'modulee-nodes-editor';

export interface ProjectsRepository {
	initialize(): Promise<void>;
	getProjects(): Promise<ProjectData[]>;
	getProject(id: string): Promise<ProjectData>;
	addCommand(commandData: CommandData): Promise<void>;
	createProject(projectData: ProjectData): Promise<void>;
}
