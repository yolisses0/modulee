import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { Types } from 'mongoose';
import { PaginationStrategy } from './PaginationStrategy';

type CursorData = { _id: string; likeCount: number };

export class LikeCountSortStrategy extends PaginationStrategy {
	getSortStage() {
		return { $sort: { likeCount: -1, _id: -1 } } as const;
	}

	getFilterStage(cursorData: CursorData) {
		return {
			$match: {
				$or: [
					{ likeCount: { $lt: cursorData.likeCount } },
					{ likeCount: cursorData.likeCount, _id: { $lte: new Types.ObjectId(cursorData._id) } },
				],
			},
		};
	}

	getNextCursor(lastItem: ExternalModuleData): CursorData {
		return {
			_id: lastItem._id,
			likeCount: lastItem.likeCount,
		};
	}
}
