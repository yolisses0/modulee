import type { Vector } from 'nodes-editor';
import type { Converter } from './Converter';

export class RoundConverter implements Converter {
	getScreenPosition(dataPosition: Vector): Vector {
		return dataPosition;
	}

	getDataPosition(screenPosition: Vector): Vector {
		return screenPosition.round();
	}
}
