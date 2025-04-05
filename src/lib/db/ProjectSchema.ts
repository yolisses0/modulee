import { Schema } from 'mongoose';

export const ProjectSchema = new Schema(
	{
		name: { type: String, required: true, maxlength: 255 },
	},
	{
		timestamps: true,
	},
);
