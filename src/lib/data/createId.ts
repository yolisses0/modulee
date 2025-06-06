import { ID_LENGTH } from '$lib/data/ID_LENGTH';
import { customAlphabet } from 'nanoid';
import { ID_VALID_CHARACTERS } from './ID_VALID_CHARACTERS';

const generator = customAlphabet(ID_VALID_CHARACTERS);

export function createId() {
	return generator(ID_LENGTH);
}
