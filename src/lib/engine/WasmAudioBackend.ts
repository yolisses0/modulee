import type { AudioBackend } from './AudioBackend';
import type { GraphEngineData } from './data/GraphEngineData';

type Message = {
	type: string;
	data: object;
};

export class WasmAudioBackend implements AudioBackend {
	audioContext?: AudioContext;
	engineNode?: AudioWorkletNode;
	pendingMessages: Message[] = [];

	constructor() {
		this.initialize();
	}

	async initialize() {
		const wasmFilePath = '/node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.wasm';
		const response = await fetch(wasmFilePath);
		const bytes = await response.arrayBuffer();

		this.audioContext = new AudioContext();
		await this.audioContext.audioWorklet.addModule('/engine-processor.js');

		this.engineNode = new AudioWorkletNode(this.audioContext, 'engine-processor', {
			processorOptions: { bytes },
		});
		this.engineNode.connect(this.audioContext.destination);

		this.pendingMessages.forEach((message) => {
			this.engineNode?.port.postMessage(message);
		});
		this.pendingMessages = [];

		// If the audio context can't start because of the user hasn't
		// interacted with the page
		if (this.audioContext.state !== 'running') {
			window.addEventListener('keydown', this.startAudioContext);
			window.addEventListener('pointerdown', this.startAudioContext);
		}
	}

	destroy(): void {
		this.audioContext?.close();
	}

	startAudioContext = () => {
		this.audioContext?.resume();
		window.removeEventListener('keydown', this.startAudioContext);
		window.removeEventListener('pointerdown', this.startAudioContext);
	};

	postOrSaveMessage(message: Message) {
		if (this.engineNode) {
			this.engineNode.port.postMessage(message);
		} else {
			this.pendingMessages.push(message);
		}
	}

	setGraph(graphEngineData: GraphEngineData): void {
		this.postOrSaveMessage({
			type: 'setGraph',
			data: { graphEngineData },
		});
	}

	setNoteOn(pitch: number): void {
		this.postOrSaveMessage({
			type: 'setNoteOn',
			data: { pitch },
		});
	}

	setNoteOff(pitch: number): void {
		this.postOrSaveMessage({
			type: 'setNoteOff',
			data: { pitch },
		});
	}

	setIsMuted(isMuted: boolean): void {
		this.postOrSaveMessage({
			type: 'setIsMuted',
			data: { isMuted },
		});
	}

	updateControl(id: number, value: number): void {
		this.postOrSaveMessage({
			type: 'updateControl',
			data: { id, value },
		});
	}
}
