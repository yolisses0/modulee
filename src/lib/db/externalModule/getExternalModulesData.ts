import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { set, Types, type PipelineStage } from 'mongoose';
import { ExternalModuleModel } from './ExternalModuleModel';
import { getStrategy } from './getStrategy';
import type { PaginationResult } from './PaginationResult';

type Params = {
	text?: string;
	sort?: string;
	cursor?: string;
};

export async function getExternalModulesData(
	params: Params,
): Promise<PaginationResult<ExternalModuleData>> {
	const { cursor, sort, text } = params;

	const strategy = getStrategy(sort, text);
	const cursorData = cursor ? JSON.parse(cursor) : null;

	const pipelineStages: PipelineStage[] = [];

	if (text) {
		pipelineStages.push(
			{ $match: { $text: { $search: text } } },
			{ $addFields: { score: { $meta: 'textScore' } } },
		);
	}

	if (cursorData) {
		pipelineStages.push({
			$match: {
				$or: [
					{ score: { $lt: cursorData.score } },
					{ score: cursorData.score, _id: { $lte: new Types.ObjectId(cursorData._id) } },
				],
			},
		});
	}

	pipelineStages.push({ $sort: { score: -1 } });

	const pageLimit = 3;
	const limit = pageLimit + 1;

	pipelineStages.push({ $limit: limit });

	set('debug', true);
	const documents = await ExternalModuleModel.aggregate(pipelineStages);
	set('debug', false);

	const items = documents;
	console.log(items.map((item) => item.name));

	let nextCursor: null | string = null;
	const hasNext = items.length === limit;
	if (hasNext) {
		const lastItem = items.at(-1)!;
		nextCursor = strategy.getNextCursorString(lastItem);
	}

	return { nextCursor, items: items.slice(0, pageLimit) };
}
