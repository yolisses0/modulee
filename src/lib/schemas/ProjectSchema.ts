import z from 'zod/v4';
import { ModuleTypeSchema } from '../db/externalModule/ModuleTypeSchema';
import { GraphSchema } from './GraphSchema';

export const ProjectSchema = z.object({
	createdAt: z.string(),
	createdAutomatically: z.boolean(),
	description: z.string().nullish(),
	graph: GraphSchema,
	id: z.uuidv4(),
	moduleType: ModuleTypeSchema,
	name: z.string(),
	updatedAt: z.string(),
	userId: z.uuidv4(),
});
