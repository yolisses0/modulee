import prisma from '$lib/prisma';
import type { ProjectData } from './data/ProjectData';

export async function getProjects(userId: string) {
	const projectsData = await prisma.project.findMany({
		where: { userId },
		orderBy: { updatedAt: 'desc' },
	});
	return projectsData as unknown as ProjectData[];
}
